import { motion } from "framer-motion";

const About = () => {
  return (
    <main className="pt-24 pb-20">
      {/* Hero */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-3 font-cinzel">ABOUT NOVER NOIR</p>
            <h1 className="font-cinzel text-4xl md:text-6xl tracking-[0.1em] mb-8">ABOUT NOVER NOIR</h1>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-8 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="font-cinzel text-xl tracking-[0.1em] mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              NOVER NOIR is a luxury fragrance house born from a vision to craft timeless elegance through scent. Built on precision, minimalism, and bold sophistication, our creations are designed for individuals who appreciate depth, character, and quiet confidence.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4 italic">
              We believe fragrance is more than an accessory — it is identity in its most refined form.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Proudly Indian */}
      <section className="py-8 px-6 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="font-cinzel text-xl tracking-[0.1em] mb-4">Proudly Indian. Globally Inspired.</h2>
            <p className="text-muted-foreground leading-relaxed">
              NOVER NOIR is a proudly Indian brand, created with a global luxury standard in mind.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We draw inspiration from India’s rich heritage of craftsmanship, rare ingredients, and artistic expression — blending it with modern perfumery techniques to create fragrances that feel both rooted and revolutionary.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">Our mission is to represent Indian excellence in the world of premium perfumery.</p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-8 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="font-cinzel text-xl tracking-[0.1em] mb-4">Our Philosophy</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Elegance in Simplicity</li>
              <li>Strength in Subtlety</li>
              <li>Luxury without Loudness</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Each fragrance is carefully curated to evoke power, mystery, and refinement — designed for those who command presence without speaking loudly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Craft */}
      <section className="py-8 px-6 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="font-cinzel text-xl tracking-[0.1em] mb-4">Our Craft</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Thoughtfully selected ingredients</li>
              <li>Long-lasting performance</li>
              <li>Premium presentation in emerald and gold</li>
              <li>Commitment to quality over quantity</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">We focus on creating signature scents — not mass-market trends.</p>
          </motion.div>
        </div>
      </section>

      {/* Vision + Closing */}
      <section className="py-8 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="font-cinzel text-xl tracking-[0.1em] mb-4">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To build a distinguished Indian fragrance brand that stands alongside global luxury houses — while staying true to our roots, values, and identity.
            </p>
            <p className="font-cinzel text-sm tracking-[0.12em] mt-6 italic">NOVER NOIR is not just a perfume brand. It is a statement of presence.</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;
