import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash, ArrowLeft } from "lucide-react";
import { useMemo, useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { AuthDialog } from "@/components/AuthDialog";
import { supabase } from "@/lib/supabase";

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const { user, loading } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [shippingCost, setShippingCost] = useState(99);
  const [shippingThreshold, setShippingThreshold] = useState(2000);
  const navigate = useNavigate();

  // Fetch shipping config from API
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
  }, []);

  const subtotal = useMemo(() => totalPrice, [totalPrice]);
  const shipping = useMemo(
    () => (subtotal === 0 ? 0 : subtotal >= shippingThreshold ? 0 : shippingCost),
    [subtotal, shippingCost, shippingThreshold]
  );
  const total = useMemo(() => Number((subtotal + shipping).toFixed(2)), [subtotal, shipping]);

  // Show auth dialog only after loading is complete and user is not authenticated
  useEffect(() => {
    if (!loading && !user) {
      // Small delay to ensure auth state has fully settled after a page refresh
      const timer = setTimeout(() => {
        if (!user) setAuthDialogOpen(true);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [user, loading]);

  // Sync cart to Supabase when user is authenticated
  useEffect(() => {
    if (user && items.length > 0 && !isSyncing) {
      syncCartToSupabase();
    }
  }, [user, items]);

  const syncCartToSupabase = async () => {
    if (!user || items.length === 0) return;

    setIsSyncing(true);
    try {
      // Expand product IDs based on quantity
      // If quantity is 2, add the product ID twice: ["id", "id"]
      const productIds = items.flatMap((item) => 
        Array(item.quantity).fill(item.product.id)
      );
      
      // Check if user has an active cart
      const { data: existingCarts } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_cleared', false)
        .order('created_at', { ascending: false })
        .limit(1);

      if (existingCarts && existingCarts.length > 0) {
        // Update existing cart
        await supabase
          .from('cart')
          .update({
            items: productIds,
            total: total,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingCarts[0].id);
      } else {
        // Create new cart
        await supabase.from('cart').insert({
          user_id: user.id,
          items: productIds,
          total: total,
          is_cleared: false,
        });
      }
    } catch (error) {
      console.error('Error syncing cart:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      setAuthDialogOpen(true);
      return;
    }
    // Navigate to dedicated checkout page with address selection + Razorpay
    navigate('/checkout');
  };

  return (
    <main className="pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm mb-6">
          <ArrowLeft className="w-4 h-4" /> Continue shopping
        </Link>

        <h1 className="font-cinzel text-3xl mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-24 border border-border rounded-sm">
            <p className="mb-4">Your cart is empty.</p>
            <Link to="/shop" className="text-primary underline">Browse products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 items-center border border-border p-4 rounded-sm">
                  <img src={item.product.image} alt={item.product.name} className="w-24 h-28 object-cover rounded-sm" />
                  <div className="flex-1">
                    <h3 className="font-cinzel text-lg">{item.product.name}</h3>
                    <p className="text-muted-foreground">₹{item.product.price}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 grid place-items-center border border-border rounded-sm"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="px-3 py-1 border border-border rounded-sm">{item.quantity}</div>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 grid place-items-center border border-border rounded-sm"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button onClick={() => removeFromCart(item.product.id)} className="ml-4 text-red-500 flex items-center gap-2">
                        <Trash className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-cinzel">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center mt-4">
                <button onClick={() => clearCart()} className="text-sm text-red-500">Clear cart</button>
                <Link to="/shop" className="text-sm text-primary underline">Continue shopping</Link>
              </div>
            </div>

            <aside className="border border-border p-6 rounded-sm h-fit">
              <h4 className="font-cinzel text-lg mb-4">Order summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
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

              <button disabled={!user} onClick={handleCheckout} className="mt-6 w-full bg-primary text-primary-foreground py-3 rounded-sm font-cinzel text-sm tracking-[0.15em] disabled:opacity-50" title={!user ? "Please sign in to checkout" : ""}>
                Proceed to Checkout
              </button>
              {!user && (
                <p className="text-center text-xs text-muted-foreground mt-2">
                  Please sign in to continue
                </p>
              )}
            </aside>
          </div>
        )}
      </div>

      {/* Auth Dialog - Non-dismissable when user is not authenticated */}
      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={(open) => {
          // Only allow closing if user is authenticated
          if (!open && !user) {
            // Redirect to home if user tries to close without signing in
            navigate('/');
          } else {
            setAuthDialogOpen(open);
          }
        }}
        dismissable={false}
      />
    </main>
  );
};

export default Cart;
