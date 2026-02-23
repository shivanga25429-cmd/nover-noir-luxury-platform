import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { products, testimonials } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Star, Clock, Gem, Package } from "lucide-react";

const Index = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/10 blur-[100px]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="font-cinzel text-6xl md:text-8xl lg:text-9xl font-medium tracking-[0.15em] text-gold-gradient mb-6">
              NOVER NOIR
            </h1>
            <p className="font-cormorant text-2xl md:text-3xl text-foreground/70 italic mb-12">
              Luxury in Every Drop.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-primary text-primary-foreground font-cinzel text-sm tracking-[0.2em] uppercase px-12 py-4 transition-all duration-500 hover:gold-glow gold-glow-hover hover:scale-105"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
        </motion.div>
      </section>

      {/* Featured Perfumes */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-3 font-cinzel">Collection</p>
            <h2 className="font-cinzel text-3xl md:text-5xl tracking-[0.1em]">Featured Perfumes</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          <div className="text-center mt-16">
            <Link
              to="/shop"
              className="inline-block border border-primary text-primary font-cinzel text-xs tracking-[0.2em] uppercase px-10 py-3 hover:bg-primary hover:text-primary-foreground transition-all duration-500"
            >
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 bg-secondary">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-3 font-cinzel">Why Us</p>
            <h2 className="font-cinzel text-3xl md:text-4xl tracking-[0.1em]">The NOVER NOIR Difference</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Clock, title: "Long Lasting", desc: "Our fragrances are crafted to endure. 12+ hours of captivating scent that evolves beautifully on your skin." },
              { icon: Gem, title: "Affordable Luxury", desc: "Premium ingredients and expert blending at a fraction of international luxury brand prices. ₹200–₹1000." },
              { icon: Package, title: "Premium Packaging", desc: "Every bottle is a statement piece. Elegant design and unboxing experience worthy of a luxury maison." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-center space-y-4"
              >
                <item.icon className="w-8 h-8 text-primary mx-auto" strokeWidth={1.5} />
                <h3 className="font-cinzel text-lg tracking-[0.1em]">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-3 font-cinzel">Reviews</p>
            <h2 className="font-cinzel text-3xl md:text-4xl tracking-[0.1em]">What Our Clients Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-border p-8 rounded-sm"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="font-cormorant text-lg italic text-foreground/80 mb-4">"{t.comment}"</p>
                <p className="font-cinzel text-xs tracking-[0.15em] text-muted-foreground">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/30 blur-[150px]" />
        </div>
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-cinzel text-3xl md:text-5xl tracking-[0.1em] mb-6">Discover Your Signature Scent</h2>
            <p className="font-cormorant text-xl text-muted-foreground italic mb-10">
              Every fragrance tells a story. What will yours be?
            </p>
            <Link
              to="/shop"
              className="inline-block bg-primary text-primary-foreground font-cinzel text-sm tracking-[0.2em] uppercase px-12 py-4 transition-all duration-500 gold-glow-hover hover:scale-105"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Index;
