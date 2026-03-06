import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { getProducts, testimonials, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Star, Clock, Gem, Package, ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <main>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-background">

        {/* Ambient background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[160px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/8 blur-[140px]" />
        </div>

        {/* Thin horizontal rule lines for luxury grid feel */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, hsl(40 48% 56%), hsl(40 48% 56%) 1px, transparent 1px, transparent 120px)" }}
        />

        <div className="relative z-10 container mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-32">

          {/* Left — Text Content */}
          <motion.div style={{ y: textY }} className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="block w-8 h-px bg-primary" />
              <span className="font-cinzel text-primary text-[10px] tracking-[0.45em] uppercase">
                Luxury Fragrance
              </span>
              <span className="block w-8 h-px bg-primary lg:hidden" />
            </motion.div>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-cinzel text-[clamp(3.5rem,8vw,6.5rem)] font-medium leading-[0.95] tracking-[0.08em] mb-6"
            >
              <span className="text-gold-gradient block">NOVER</span>
              <span className="text-foreground/90 block">NOIR</span>
            </motion.h1>

            {/* Ornament divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-4 mb-8 origin-center lg:origin-left"
            >
              {/* Left line: symmetric on mobile, fades right on desktop */}
              <span className="block h-px flex-1 max-w-[80px] bg-gradient-to-l from-primary/80 to-transparent lg:bg-gradient-to-r lg:from-primary/80 lg:to-transparent" />
              <span className="text-primary text-base">✦</span>
              {/* Right line: always visible, symmetric */}
              <span className="block h-px flex-1 max-w-[80px] bg-gradient-to-r from-primary/80 to-transparent" />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              className="font-cormorant text-xl md:text-2xl text-foreground/55 italic leading-relaxed mb-12 max-w-sm"
            >
              Crafted fragrance.<br />Commanding presence.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-row flex-wrap items-center justify-center gap-6 lg:flex-col lg:items-start lg:gap-4"
            >
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 bg-primary text-primary-foreground font-cinzel text-[11px] tracking-[0.25em] uppercase px-10 py-4 transition-all duration-500 gold-glow-hover hover:scale-[1.03]"
              >
                Explore Collection
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-cinzel text-[11px] tracking-[0.25em] uppercase text-foreground/50 hover:text-primary transition-colors duration-300"
              >
                {/* Left line — shown on mobile for symmetry, hidden on desktop */}
                <span className="block w-5 h-px bg-current transition-all duration-300 lg:hidden" />
                Our Story
                <span className="block w-5 h-px bg-current transition-all duration-300" />
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex items-center justify-center lg:justify-start gap-10 mt-16 pt-10 border-t border-border/40 w-full"
            >
              {[
                
                { value: "6–8hr", label: "Longevity" },
                { value: "₹200", label: "Starting at" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="font-cinzel text-xl text-gold-gradient font-medium tracking-wide">{stat.value}</p>
                  <p className="font-cormorant text-xs text-muted-foreground tracking-[0.2em] uppercase mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Visual */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            {/* Glow ring behind bottle */}
            <div className="absolute w-[340px] h-[340px] rounded-full border border-primary/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute w-[420px] h-[420px] rounded-full border border-primary/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute w-[280px] h-[280px] rounded-full bg-primary/8 blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            {/* Main product image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <img
                src="/output.png"
                alt="Nover Noir Signature Fragrance"
                className="w-full h-[600px] object-contain drop-shadow-2xl shadow-white"
              />
            </div>

            {/* Floating accent badge — hidden on mobile */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="hidden sm:block absolute top-12 right-0 lg:right-4 border border-primary/30 bg-background/80 backdrop-blur-sm px-5 py-3 text-left"
            >
              <p className="font-cinzel text-[9px] tracking-[0.35em] text-primary uppercase mb-0.5">Signature</p>
              <p className="font-cormorant text-sm italic text-foreground/70">Noir Collection</p>
            </motion.div>

            {/* Floating scent note — hidden on mobile */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.15 }}
              className="hidden sm:block absolute bottom-16 left-0 lg:-left-4 border border-border/60 bg-background/80 backdrop-blur-sm px-5 py-3"
            >
              <p className="font-cinzel text-[9px] tracking-[0.35em] text-muted-foreground uppercase mb-1">Top Notes</p>
              <p className="font-cormorant text-sm text-foreground/80">Oud · Amber · Musk</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-cinzel text-[9px] tracking-[0.4em] text-muted-foreground uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent"
          />
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
            {loading ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">Loading products...</div>
            ) : featuredProducts.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">No products found</div>
            ) : (
              featuredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))
            )}
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
              { icon: Clock, title: "Long Lasting", desc: "Our fragrances are crafted to endure. 6–8 hours of captivating scent that evolves beautifully on your skin." },
              { icon: Gem, title: "Affordable Luxury", desc: "Premium ingredients and expert blending at a fraction of international luxury brand prices." },
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
