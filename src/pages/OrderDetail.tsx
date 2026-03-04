import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { apiClient } from "@/lib/api";
import type { Order, TrackingTimeline } from "@/lib/api";
import { Package, ArrowLeft, MapPin, CheckCircle2, Circle, Clock } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  pending_payment: "text-yellow-600",
  payment_failed: "text-red-500",
  confirmed: "text-blue-600",
  processing: "text-purple-600",
  shipped: "text-indigo-600",
  out_for_delivery: "text-orange-600",
  delivered: "text-green-600",
  cancelled: "text-gray-500",
  refunded: "text-gray-500",
};

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const { user, session } = useAuth();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [timeline, setTimeline] = useState<TrackingTimeline[]>([]);
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !id) return;
    fetchOrder();
  }, [user, id]);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const client = apiClient(session?.access_token ?? "");
      const [orderData, trackData] = await Promise.all([
        client.orders.get(id!),
        client.orders.track(id!),
      ]);
      setOrder(orderData);
      setTimeline(trackData.timeline);
      setTrackingId(trackData.tracking_id);
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <main className="pt-24 pb-20 container mx-auto px-6 max-w-3xl text-center">
        <p>Please sign in to view your order.</p>
        <button onClick={() => navigate("/")} className="mt-3 underline text-primary text-sm">Go Home</button>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="pt-24 pb-20 container mx-auto px-6 max-w-3xl">
        <div className="space-y-4 animate-pulse">
          <div className="h-8 bg-muted rounded w-48" />
          <div className="h-40 bg-muted rounded" />
          <div className="h-60 bg-muted rounded" />
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="pt-24 pb-20 container mx-auto px-6 max-w-3xl text-center">
        <p className="text-red-500">{error ?? "Order not found"}</p>
        <Link to="/orders" className="mt-3 block underline text-primary text-sm">Back to Orders</Link>
      </main>
    );
  }

  const addr = order.addresses;

  return (
    <main className="pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <Link to="/orders" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm mb-6">
          <ArrowLeft className="w-4 h-4" /> All Orders
        </Link>

        {/* ── Header ── */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="font-cinzel text-2xl">
              Order #{order.id.slice(0, 8).toUpperCase()}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Placed on{" "}
              {new Date(order.created_at!).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            {trackingId && (
              <p className="text-sm mt-1">
                Tracking ID:{" "}
                <span className="font-mono font-semibold text-primary">{trackingId}</span>
              </p>
            )}
          </div>
          <span className={`text-sm font-medium px-3 py-1 rounded-full border ${STATUS_COLORS[order.status]}`}>
            {order.status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </span>
        </div>

        {/* ── Tracking Timeline ── */}
        {timeline.length > 0 && order.status !== "payment_failed" && order.status !== "cancelled" && order.status !== "refunded" && (
          <section className="border border-border rounded-sm p-6 mb-6">
            <h2 className="font-cinzel text-base mb-5">Order Tracking</h2>
            <div className="relative">
              {/* vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

              <ol className="space-y-5">
                {timeline
                  .filter((t) => !["payment_failed", "cancelled", "refunded"].includes(t.status))
                  .map((step) => (
                    <li key={step.status} className="flex items-start gap-4 relative">
                      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.active
                          ? "bg-primary text-primary-foreground"
                          : step.completed
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {step.active ? (
                          <Clock className="w-4 h-4" />
                        ) : step.completed ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Circle className="w-4 h-4" />
                        )}
                      </div>
                      <div className="pt-1">
                        <p className={`text-sm font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                          {step.label}
                        </p>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                    </li>
                  ))}
              </ol>
            </div>
          </section>
        )}

        {/* ── Order Items ── */}
        <section className="border border-border rounded-sm p-6 mb-6">
          <h2 className="font-cinzel text-base mb-4 flex items-center gap-2">
            <Package className="w-4 h-4" /> Items Ordered
          </h2>
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-14 h-18 object-cover rounded-sm" />
                )}
                <div className="flex-1">
                  <p className="font-cinzel text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity} × ₹{item.price}</p>
                </div>
                <p className="text-sm font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-border mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span><span>₹{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Tax (18% GST)</span><span>₹{order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Shipping</span><span>{order.shipping === 0 ? "Free" : `₹${order.shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between font-cinzel text-base pt-2 border-t border-border">
              <span>Total Paid</span><span>₹{order.total.toFixed(2)}</span>
            </div>
          </div>
        </section>

        {/* ── Delivery Address ── */}
        {addr && (
          <section className="border border-border rounded-sm p-6">
            <h2 className="font-cinzel text-base mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Delivery Address
            </h2>
            <div className="text-sm text-muted-foreground space-y-0.5">
              <p className="font-medium text-foreground">{addr.full_name}</p>
              <p>{addr.phone}</p>
              <p>{addr.address_line1}{addr.address_line2 ? `, ${addr.address_line2}` : ""}</p>
              <p>{addr.city}, {addr.state} – {addr.pincode}</p>
              <p>{addr.country}</p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
