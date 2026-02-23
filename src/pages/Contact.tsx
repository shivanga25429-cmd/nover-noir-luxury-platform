import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const { name, email, message } = form;

  const subject = encodeURIComponent(
    `New Contact Message from ${name}`
  );

  const body = encodeURIComponent(
    `Name: ${name}\n` +
    `Email: ${email}\n\n` +
    `Message:\n${message}`
  );

  const mailtoLink = `mailto:novernoir@gmail.com?subject=${subject}&body=${body}`;

  window.location.href = mailtoLink;

  toast.success("Opening your mail app...", {
    description: "Please click send in your email client.",
  });

  setForm({ name: "", email: "", message: "" });
};

  return (
    <main className="pt-24 pb-20">
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="text-center mb-16">
              <p className="text-primary text-xs tracking-[0.4em] uppercase mb-3 font-cinzel">Get in Touch</p>
              <h1 className="font-cinzel text-4xl md:text-5xl tracking-[0.1em] mb-4">Contact Us</h1>
              <p className="text-muted-foreground">We'd love to hear from you. Send us a message and we'll respond promptly.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-cinzel text-xs tracking-[0.15em] uppercase">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="bg-secondary border-border focus:border-primary"
                  placeholder="Your name"
                />
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="email" className="font-cinzel text-xs tracking-[0.15em] uppercase">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="bg-secondary border-border focus:border-primary"
                  placeholder="your@email.com"
                />
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="message" className="font-cinzel text-xs tracking-[0.15em] uppercase">Message</Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={6}
                  className="bg-secondary border-border focus:border-primary resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-cinzel text-sm tracking-[0.2em] uppercase px-10 py-4 transition-all duration-500 gold-glow-hover hover:scale-[1.02]"
              >
                Send Message
              </button>
              
            </form>

            <div className="mt-16 text-center space-y-3 text-sm text-muted-foreground">
              <a href="mailto:novernoir@gmail.com"><p>novernoir@gmail.com</p></a>
              <a href="https://wa.me/917983339080" target="_blank"><p>+91 79833 39080</p></a>
              <div className="flex justify-center gap-6 pt-2">
                <a href="https://www.instagram.com/novernoir/" className="hover:text-primary transition-colors">Instagram</a>
                <a href="" className="hover:text-primary transition-colors">Twitter</a>
                <a href="#" className="hover:text-primary transition-colors">Facebook</a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
