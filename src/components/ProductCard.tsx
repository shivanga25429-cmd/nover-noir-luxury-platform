import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { toast } from "@/components/ui/sonner";
import { Product } from "@/data/products";
import { ShoppingBag, Minus, Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [qty, setQty] = useState<number>(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden aspect-[3/4] bg-secondary rounded-sm mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>
      <div className="space-y-2">
        <h3 className="font-cinzel text-sm tracking-[0.15em] uppercase">{product.name}</h3>
        <p className="text-primary font-cinzel text-lg">₹{product.price}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-8 h-8 grid place-items-center border border-border rounded-sm"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            className="w-12 text-center bg-secondary border border-border rounded-sm h-8"
          />
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-8 h-8 grid place-items-center border border-border rounded-sm"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <button
          onClick={() => {
            addToCart(product, qty);
            toast.success("Added to cart", { description: `${qty} × ${product.name} added to your cart.` });
          }}
          className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-all duration-300 group/btn"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
