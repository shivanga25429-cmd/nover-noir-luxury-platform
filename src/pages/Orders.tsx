import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { apiClient, Order } from "@/lib/api";
import { Package, ChevronRight, ArrowLeft } from "lucide-react";
import { AuthDialog } from "@/components/AuthDialog";

const STATUS_COLORS: Record<string, string> = {
  pending_payment: "text-yellow-600 bg-yellow-50",
  payment_failed: "text-red-600 bg-red-50",
  confirmed: "text-blue-600 bg-blue-50",
  processing: "text-purple-600 bg-purple-50",
  shipped: "text-indigo-600 bg-indigo-50",
  out_for_delivery: "text-orange-600 bg-orange-50",
  delivered: "text-green-600 bg-green-50",
  cancelled: "text-gray-500 bg-gray-100",
  refunded: "text-gray-500 bg-gray-100",
};

const STATUS_LABELS: Record<string, string> = {
  pending_payment: "Payment Pending",
  payment_failed: "Payment Failed",
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

export default function Orders() {
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    if (!user) { setAuthOpen(true); return; }
    fetchOrders();
  }, [user, page]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const result = await apiClient(session?.access_token ?? "").orders.list(page, 10);
      setOrders(result.orders);
      setTotal(result.total);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <h1 className="font-cinzel text-3xl mb-8 flex items-center gap-3">
          <Package className="w-7 h-7" /> My Orders
        </h1>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-border rounded-sm p-5 animate-pulse h-24" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="border border-dashed border-border rounded-sm p-12 text-center">
            <Package className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground mb-3">No orders yet.</p>
            <Link to="/shop" className="text-primary underline text-sm">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <button
                key={order.id}
                onClick={() => navigate(`/orders/${order.id}`)}
                className="w-full border border-border rounded-sm p-5 text-left hover:border-primary/60 transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-cinzel text-sm">Order #{order.id.slice(0, 8).toUpperCase()}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[order.status] ?? "bg-muted"}`}>
                        {STATUS_LABELS[order.status] ?? order.status}
                      </span>
                    </div>
                    {order.tracking_id && (
                      <p className="text-xs text-muted-foreground mb-1">
                        Tracking: <span className="font-mono font-medium text-foreground">{order.tracking_id}</span>
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {order.items.length} item{order.items.length !== 1 ? "s" : ""} ·{" "}
                      {new Date(order.created_at!).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel text-base">₹{order.total.toFixed(2)}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </button>
            ))}

            {/* Pagination */}
            {total > 10 && (
              <div className="flex justify-center gap-3 mt-6">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-4 py-2 border border-border rounded-sm text-sm disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-muted-foreground">Page {page}</span>
                <button
                  disabled={page * 10 >= total}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-4 py-2 border border-border rounded-sm text-sm disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
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
