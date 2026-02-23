import { useState } from "react";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const fragranceFamilies = ["All", "Oriental", "Floral", "Woody", "Fresh"];

const Shop = () => {
  const [selectedFamily, setSelectedFamily] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  let filtered = selectedFamily === "All" ? products : products.filter((p) => p.fragranceFamily === selectedFamily);

  if (sortBy === "price-low") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <main className="pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-xs tracking-[0.4em] uppercase mb-3 font-cinzel">Collection</p>
          <h1 className="font-cinzel text-4xl md:text-5xl tracking-[0.1em]">Our Fragrances</h1>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex flex-wrap gap-3">
            {fragranceFamilies.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFamily(f)}
                className={`text-xs tracking-[0.15em] uppercase px-5 py-2 border transition-all duration-300 font-cinzel ${
                  selectedFamily === f
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-secondary border border-border text-foreground text-xs tracking-[0.1em] uppercase px-4 py-2 rounded-sm focus:outline-none focus:border-primary"
          >
            <option value="default">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Shop;
