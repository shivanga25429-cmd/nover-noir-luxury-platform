import { motion } from "framer-motion";

const About = () => {
  return (
    <main className="pt-24 pb-20">
      {/* Hero */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-3 font-cinzel">Our Story</p>
            <h1 className="font-cinzel text-4xl md:text-6xl tracking-[0.1em] mb-8">About NOVER NOIR</h1>
            <p className="font-cormorant text-xl md:text-2xl text-muted-foreground italic leading-relaxed">
              Born from a passion for artisan perfumery and a belief that luxury should be accessible to all.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 px-6 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="font-cinzel text-2xl md:text-3xl tracking-[0.1em] text-center mb-10">The NOVER NOIR Philosophy</h2>
            <p className="text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto">
              At NOVER NOIR, we believe that every person deserves to experience the transformative power of a truly exceptional fragrance. Our perfumers source the finest ingredients from around the world — from the saffron fields of Kashmir to the rose gardens of Bulgaria — crafting compositions that rival the world's most celebrated maisons.
            </p>
            <p className="text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto">
              What sets us apart is our unwavering commitment to quality without the luxury markup. No celebrity endorsements. No overpackaged marketing. Just pure, unadulterated artistry in every bottle. When you wear NOVER NOIR, you wear confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-cinzel text-2xl md:text-3xl tracking-[0.1em] text-center mb-16"
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Craftsmanship", desc: "Every fragrance is meticulously blended by master perfumers with decades of experience." },
              { title: "Accessibility", desc: "Luxury fragrances priced for the modern generation. Premium quality, honest pricing." },
              { title: "Sustainability", desc: "Ethically sourced ingredients, recyclable packaging, and cruelty-free formulations." },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center space-y-4"
              >
                <h3 className="font-cinzel text-lg tracking-[0.1em] text-primary">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
