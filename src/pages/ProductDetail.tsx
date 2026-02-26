import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getProducts, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "@/components/ui/sonner";
import { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import { ShoppingBag, Star, ArrowLeft } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [qty, setQty] = useState<number>(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProducts();
        const found = data.find((p) => p.id === id);
        setProduct(found || null);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 text-center">
        <h1 className="font-cinzel text-2xl">Product not found</h1>
        <Link to="/shop" className="text-primary mt-4 inline-block">Back to Shop</Link>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-20">
      <div className="container mx-auto max-w-6xl px-6">
        <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm mb-10">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="aspect-[3/4] bg-secondary rounded-sm overflow-hidden"
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-3 font-cinzel">{product.fragranceFamily}</p>
            <h1 className="font-cinzel text-4xl md:text-5xl tracking-[0.1em] mb-4">{product.name}</h1>
            <p className="font-cinzel text-3xl text-primary mb-6">₹{product.price}</p>
            <p className="text-muted-foreground leading-relaxed mb-10">{product.description}</p>

            {/* Fragrance Notes */}
            <div className="space-y-6 mb-10">
              <h3 className="font-cinzel text-sm tracking-[0.2em] uppercase text-primary">Fragrance Notes</h3>
              {[
                { label: "Top", notes: product.topNotes },
                { label: "Middle", notes: product.middleNotes },
                { label: "Base", notes: product.baseNotes },
              ].map((tier) => (
                <div key={tier.label} className="flex items-start gap-4">
                  <span className="font-cinzel text-xs tracking-[0.15em] uppercase text-muted-foreground w-16 pt-0.5">{tier.label}</span>
                  <div className="flex flex-wrap gap-2">
                    {tier.notes.map((note) => (
                      <span key={note} className="text-xs border border-border px-3 py-1 text-foreground/70 rounded-sm">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 grid place-items-center border border-border rounded-sm">
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                className="w-16 text-center bg-secondary border border-border rounded-sm h-9"
              />
              <button onClick={() => setQty((q) => q + 1)} className="w-9 h-9 grid place-items-center border border-border rounded-sm">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                addToCart(product, qty);
                toast.success("Added to cart", { description: `${qty} × ${product.name} added to your cart.` });
              }}
              className="flex items-center justify-center gap-3 bg-primary text-primary-foreground font-cinzel text-sm tracking-[0.2em] uppercase px-10 py-4 transition-all duration-500 gold-glow-hover hover:scale-[1.02] w-full lg:w-auto"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
          </motion.div>
        </div>

        {/* Reviews */}
        {product.reviews.length > 0 && (
          <section className="mt-24">
            <h2 className="font-cinzel text-2xl tracking-[0.1em] mb-10">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.reviews.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border border-border p-6 rounded-sm"
                >
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="font-cormorant text-lg italic text-foreground/80 mb-3">"{review.comment}"</p>
                  <p className="font-cinzel text-xs tracking-[0.1em] text-muted-foreground">{review.name}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;
