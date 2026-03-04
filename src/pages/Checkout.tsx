import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { apiClient, Address, OrderItem } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, MapPin, Plus, Edit2, Trash2, CheckCircle2 } from "lucide-react";
import { AuthDialog } from "@/components/AuthDialog";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: unknown) => void) => void;
    };
  }
}

const TAX_RATE = 0.18;

// ─── Address Form ─────────────────────────────────────────────────────────────

interface AddressFormProps {
  initial?: Partial<Address>;
  onSave: (addr: Omit<Address, "id" | "user_id" | "created_at" | "updated_at">) => void;
  onCancel: () => void;
  saving: boolean;
}

function AddressForm({ initial, onSave, onCancel, saving }: AddressFormProps) {
  const [form, setForm] = useState({
    label: initial?.label ?? "Home",
    full_name: initial?.full_name ?? "",
    phone: initial?.phone ?? "",
    address_line1: initial?.address_line1 ?? "",
    address_line2: initial?.address_line2 ?? "",
    city: initial?.city ?? "",
    state: initial?.state ?? "",
    pincode: initial?.pincode ?? "",
    country: initial?.country ?? "India",
    is_default: initial?.is_default ?? false,
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3 p-4 border border-border rounded-sm bg-card">
      <div className="col-span-2 flex gap-2">
        {["Home", "Work", "Other"].map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setForm((f) => ({ ...f, label: l }))}
            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
              form.label === l ? "bg-primary text-primary-foreground border-primary" : "border-border"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="col-span-2">
        <label className="block text-xs text-muted-foreground mb-1">Full Name *</label>
        <input required value={form.full_name} onChange={set("full_name")} className="w-full px-3 py-2 border border-border rounded-sm text-sm bg-background" placeholder="Arjun Sharma" />
      </div>

      <div className="col-span-2 sm:col-span-1">
        <label className="block text-xs text-muted-foreground mb-1">Phone *</label>
        <input required value={form.phone} onChange={set("phone")} className="w-full px-3 py-2 border border-border rounded-sm text-sm bg-background" placeholder="+91 9876543210" />
      </div>

      <div className="col-span-2">
        <label className="block text-xs text-muted-foreground mb-1">Address Line 1 *</label>
        <input required value={form.address_line1} onChange={set("address_line1")} className="w-full px-3 py-2 border border-border rounded-sm text-sm bg-background" placeholder="Flat / House No, Building, Street" />
      </div>

      <div className="col-span-2">
        <label className="block text-xs text-muted-foreground mb-1">Address Line 2</label>
        <input value={form.address_line2} onChange={set("address_line2")} className="w-full px-3 py-2 border border-border rounded-sm text-sm bg-background" placeholder="Area, Landmark (optional)" />
      </div>

      <div>
        <label className="block text-xs text-muted-foreground mb-1">City *</label>
        <input required value={form.city} onChange={set("city")} className="w-full px-3 py-2 border border-border rounded-sm text-sm bg-background" placeholder="Mumbai" />
      </div>

      <div>
        <label className="block text-xs text-muted-foreground mb-1">State *</label>
        <input required value={form.state} onChange={set("state")} className="w-full px-3 py-2 border border-border rounded-sm text-sm bg-background" placeholder="Maharashtra" />
      </div>

      <div>
        <label className="block text-xs text-muted-foreground mb-1">Pincode *</label>
        <input required value={form.pincode} onChange={set("pincode")} className="w-full px-3 py-2 border border-border rounded-sm text-sm bg-background" placeholder="400001" maxLength={6} />
      </div>

      <div>
        <label className="block text-xs text-muted-foreground mb-1">Country</label>
        <input value={form.country} onChange={set("country")} className="w-full px-3 py-2 border border-border rounded-sm text-sm bg-background" />
      </div>

      <div className="col-span-2 flex items-center gap-2">
        <input type="checkbox" id="is_default" checked={form.is_default} onChange={set("is_default")} className="w-4 h-4" />
        <label htmlFor="is_default" className="text-sm">Set as default address</label>
      </div>

      <div className="col-span-2 flex gap-3 justify-end mt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm border border-border rounded-sm">
          Cancel
        </button>
        <button type="submit" disabled={saving} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-sm disabled:opacity-50">
          {saving ? "Saving…" : "Save Address"}
        </button>
      </div>
    </form>
  );
}

// ─── Main Checkout Page ───────────────────────────────────────────────────────

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user, session } = useAuth();
  const { toast } = useToast();

  const [authOpen, setAuthOpen] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [savingAddress, setSavingAddress] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [shippingCost, setShippingCost] = useState(99);
  const [shippingThreshold, setShippingThreshold] = useState(2000);

  const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

  const subtotal = totalPrice;
  const tax = parseFloat((subtotal * TAX_RATE).toFixed(2));
  const shipping = subtotal === 0 ? 0 : subtotal >= shippingThreshold ? 0 : shippingCost;
  const total = parseFloat((subtotal + tax + shipping).toFixed(2));

  // Fetch dynamic shipping config
  useEffect(() => {
    fetch(`${API_BASE}/api/settings/shipping`)
      .then((r) => r.json())
      .then((j) => {
        if (j.success && j.data) {
          setShippingCost(j.data.cost ?? 99);
          setShippingThreshold(j.data.free_above ?? 2000);
        }
      })
      .catch(() => {/* keep defaults */});
  }, [API_BASE]);

  useEffect(() => {
    if (!user) { setAuthOpen(true); return; }
    loadAddresses();
  }, [user]);

  const client = () => apiClient(session?.access_token ?? "");

  const loadAddresses = async () => {
    try {
      const data = await client().addresses.list();
      setAddresses(data);
      const def = data.find((a) => a.is_default);
      if (def) setSelectedAddressId(def.id);
      else if (data.length > 0) setSelectedAddressId(data[0].id);
    } catch {
      // ignore
    }
  };

  const handleSaveAddress = async (
    form: Omit<Address, "id" | "user_id" | "created_at" | "updated_at">
  ) => {
    setSavingAddress(true);
    try {
      if (editingAddress) {
        const updated = await client().addresses.update(editingAddress.id, form);
        setAddresses((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
        setEditingAddress(null);
      } else {
        const created = await client().addresses.create(form);
        setAddresses((prev) => [...prev, created]);
        setSelectedAddressId(created.id);
      }
      setShowAddForm(false);
      toast({ title: "Address saved" });
    } catch (err: unknown) {
      toast({ title: "Error", description: (err as Error).message, variant: "destructive" });
    } finally {
      setSavingAddress(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      await client().addresses.delete(id);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      if (selectedAddressId === id) setSelectedAddressId(null);
      toast({ title: "Address removed" });
    } catch (err: unknown) {
      toast({ title: "Error", description: (err as Error).message, variant: "destructive" });
    }
  };

  // Load Razorpay script dynamically
  const loadRazorpay = (): Promise<boolean> =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    if (!user || !session) { setAuthOpen(true); return; }
    if (!selectedAddressId) {
      toast({ title: "Please select a delivery address", variant: "destructive" });
      return;
    }
    if (items.length === 0) return;

    setProcessingPayment(true);

    try {
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error("Payment gateway failed to load. Check your internet connection.");

      // Build order items
      const orderItems: OrderItem[] = items.map((i) => ({
        product_id: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image,
      }));

      // Step 1 — Create Razorpay order on server
      const paymentData = await client().orders.createPayment({
        items: orderItems,
        address_id: selectedAddressId,
      });

      // Step 2 — Open Razorpay checkout
      await new Promise<void>((resolve, reject) => {
        const rzp = new window.Razorpay({
          key: paymentData.key_id,
          amount: paymentData.amount,
          currency: paymentData.currency,
          name: "Nover Noir",
          description: "Luxury Fragrances",
          image: "/favicon.ico",
          order_id: paymentData.razorpay_order_id,
          prefill: paymentData.prefill,
          theme: { color: "#000000" },
          handler: async (response: unknown) => {
            try {
              const r = response as {
                razorpay_payment_id: string;
                razorpay_order_id: string;
                razorpay_signature: string;
              };

              // Step 3 — Verify on server
              const verified = await client().orders.verifyPayment({
                razorpay_order_id: r.razorpay_order_id,
                razorpay_payment_id: r.razorpay_payment_id,
                razorpay_signature: r.razorpay_signature,
                order_id: paymentData.order_id,
              });

              clearCart();
              toast({ title: "🎉 Order placed!", description: `Tracking ID: ${verified.tracking_id}` });
              navigate(`/orders/${paymentData.order_id}`);
              resolve();
            } catch (verifyErr: unknown) {
              reject(verifyErr);
            }
          },
          modal: {
            ondismiss: () => reject(new Error("Payment cancelled")),
          },
        });

        rzp.open();
      });
    } catch (err: unknown) {
      const msg = (err as Error).message;
      if (msg !== "Payment cancelled") {
        toast({ title: "Payment failed", description: msg, variant: "destructive" });
      }
    } finally {
      setProcessingPayment(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="pt-24 pb-20 container mx-auto px-6 max-w-5xl text-center">
        <p className="text-muted-foreground">Your cart is empty.</p>
        <button onClick={() => navigate("/shop")} className="mt-4 underline text-primary text-sm">
          Go to Shop
        </button>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <button
          onClick={() => navigate("/cart")}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </button>

        <h1 className="font-cinzel text-3xl mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left: Delivery Address ── */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-cinzel text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Delivery Address
              </h2>
              {!showAddForm && (
                <button
                  onClick={() => { setShowAddForm(true); setEditingAddress(null); }}
                  className="text-sm flex items-center gap-1 text-primary hover:underline"
                >
                  <Plus className="w-4 h-4" /> Add New
                </button>
              )}
            </div>

            {showAddForm && (
              <AddressForm
                initial={editingAddress ?? undefined}
                onSave={handleSaveAddress}
                onCancel={() => { setShowAddForm(false); setEditingAddress(null); }}
                saving={savingAddress}
              />
            )}

            {addresses.length === 0 && !showAddForm && (
              <div className="border border-dashed border-border rounded-sm p-8 text-center text-muted-foreground text-sm">
                No saved addresses. Add one to continue.
              </div>
            )}

            {addresses.map((addr) => (
              <div
                key={addr.id}
                onClick={() => setSelectedAddressId(addr.id)}
                className={`border rounded-sm p-4 cursor-pointer transition-colors ${
                  selectedAddressId === addr.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                      selectedAddressId === addr.id ? "border-primary bg-primary" : "border-muted-foreground"
                    }`} />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-cinzel text-sm">{addr.label}</span>
                        {addr.is_default && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Default</span>
                        )}
                      </div>
                      <p className="text-sm font-medium">{addr.full_name}</p>
                      <p className="text-sm text-muted-foreground">{addr.phone}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {addr.address_line1}
                        {addr.address_line2 ? `, ${addr.address_line2}` : ""}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {addr.city}, {addr.state} – {addr.pincode}
                      </p>
                      <p className="text-sm text-muted-foreground">{addr.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingAddress(addr);
                        setShowAddForm(true);
                      }}
                      className="p-1.5 hover:text-primary transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteAddress(addr.id); }}
                      className="p-1.5 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* ── Order items summary ── */}
            <div className="mt-6">
              <h2 className="font-cinzel text-lg mb-3">Order Items</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center border border-border p-3 rounded-sm">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-20 object-cover rounded-sm" />
                    <div className="flex-1">
                      <p className="font-cinzel text-sm">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-cinzel text-sm">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Order Summary ── */}
          <aside className="border border-border p-6 rounded-sm h-fit sticky top-24">
            <h4 className="font-cinzel text-lg mb-4">Order Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (18% GST)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-cinzel text-lg">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={processingPayment || !selectedAddressId}
              className="mt-6 w-full bg-primary text-primary-foreground py-3 rounded-sm font-cinzel text-sm tracking-[0.15em] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {processingPayment ? (
                <>
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Processing…
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Pay ₹{total.toFixed(2)}
                </>
              )}
            </button>

            <div className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <span>🔒</span>
              Secured Checkout
            </div>
          </aside>
        </div>
      </div>

      <AuthDialog
        open={authOpen}
        onOpenChange={(open) => {
          if (!open && !user) navigate("/");
          else setAuthOpen(open);
        }}
        dismissable={false}
      />
    </main>
  );
}
