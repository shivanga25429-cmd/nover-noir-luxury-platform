import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { getProducts, testimonials, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Star, Clock, Gem, Package, ArrowRight } from "lucide-react";
import { PropsWithChildren, useEffect, useState, useRef } from "react";

const heroSlides = [
  {
    image: "/hero/1.png",
  },
  {
    image: "/hero/2.png",
  },
  {
    image: "/hero/3.png",
  },
];

const ParallaxSection = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["48px", "-48px"]);

  return (
    <section ref={sectionRef} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </section>
  );
};

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

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

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const featuredProducts = products.slice(0, 4);
  return (
    <main>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-background">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <motion.div
              key={slide.image}
              initial={false}
              animate={{
                opacity: index === activeSlide ? 1 : 0,
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={slide.image}
                // alt={slide.title}
                className="h-full w-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,14,11,0.88)_0%,rgba(4,14,11,0.62)_42%,rgba(4,14,11,0.36)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.18),transparent_30%),linear-gradient(to_top,rgba(4,14,11,0.78),rgba(4,14,11,0.1))]" />

        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, hsl(40 48% 56% / 0.35), hsl(40 48% 56% / 0.35) 1px, transparent 1px, transparent 120px)" }}
        />

        <div className="relative z-10 container mx-auto flex min-h-screen max-w-7xl items-end px-6 py-20 md:items-center md:py-28">
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full max-w-3xl"
          >
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-3">
                <span className="block h-px w-10 bg-primary" />
                <span className="font-cinzel text-[10px] uppercase tracking-[0.45em] text-primary">
                  Luxury Fragrance
                </span>
              </div>

              <h1 className="font-cinzel text-[clamp(3.2rem,9vw,7.5rem)] font-medium leading-[0.9] tracking-[0.08em] text-white">
                <span className="text-gold-gradient block">NOVER</span>
                <span className="block">NOIR</span>
              </h1>

              <p className="mt-6 max-w-xl font-cormorant text-2xl italic leading-relaxed text-white/80 md:text-3xl">
                Command the room before you say a word.
              </p>

              <p className="mt-5 max-w-2xl text-sm leading-7 tracking-[0.08em] text-white/70 md:text-base">
                Layered oud, amber, and musk in a sharper, more cinematic hero moment with premium blends built for presence and longevity.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-3 border border-primary bg-primary px-8 py-4 font-cinzel text-[11px] uppercase tracking-[0.25em] text-primary-foreground transition-all duration-500 gold-glow-hover hover:scale-[1.03]"
                >
                  Explore Collection
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-3 border border-white/20 bg-white/8 px-8 py-4 font-cinzel text-[11px] uppercase tracking-[0.25em] text-white backdrop-blur-sm transition-colors duration-300 hover:border-primary hover:text-primary"
                >
                  Our Story
                </Link>
              </div>
            </div>
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
      <ParallaxSection className="overflow-hidden py-24 px-6">
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
      </ParallaxSection>

      {/* Why Choose Us */}
      <ParallaxSection className="overflow-hidden bg-secondary py-24 px-6">
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
      </ParallaxSection>

      {/* Testimonials */}
      <ParallaxSection className="overflow-hidden py-24 px-6">
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
      </ParallaxSection>

      {/* Final CTA */}
      <ParallaxSection className="relative overflow-hidden bg-secondary py-32 px-6">
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
      </ParallaxSection>
    </main>
  );
};

export default Index;
