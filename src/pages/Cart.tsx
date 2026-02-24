import { Link } from "react-router-dom";
import { Minus, Plus, Trash, ArrowLeft } from "lucide-react";
import { useMemo } from "react";
import { useCart } from "@/context/CartContext";

const TAX_RATE = 0.18; // 18% GST
const SHIPPING_THRESHOLD = 2000; // free shipping over this amount
const SHIPPING_COST = 99;

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();

  const subtotal = useMemo(() => totalPrice, [totalPrice]);
  const tax = useMemo(() => Number((subtotal * TAX_RATE).toFixed(2)), [subtotal]);
  const shipping = useMemo(() => (subtotal === 0 ? 0 : subtotal > SHIPPING_THRESHOLD ? 0 : SHIPPING_COST), [subtotal]);
  const total = useMemo(() => Number((subtotal + tax + shipping).toFixed(2)), [subtotal, tax, shipping]);

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
                  <span>Tax (18%)</span>
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

              <button disabled className="mt-6 w-full bg-primary text-primary-foreground py-3 rounded-sm font-cinzel text-sm tracking-[0.15em]" title="Checkout not implemented">
                Proceed to Checkout
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
