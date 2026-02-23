import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-cinzel text-xl tracking-[0.3em] text-primary mb-4">NOVER NOIR</h3>
            <p className="text-muted-foreground text-sm leading-relaxed font-cormorant text-lg">
              Luxury in Every Drop. Premium fragrances crafted for those who appreciate the finer things.
            </p>
          </div>
          <div>
            <h4 className="font-cinzel text-sm tracking-[0.2em] uppercase text-foreground mb-4">Quick Links</h4>
            <div className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/shop", label: "Shop" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-cinzel text-sm tracking-[0.2em] uppercase text-foreground mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>novernoir@gmail.com</p>
              <p>+91 79833 39080</p>
              <div className="flex gap-4 pt-2">
                <a href="https://www.instagram.com/novernoir/" className="hover:text-primary transition-colors">Instagram</a>
                <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                <a href="#" className="hover:text-primary transition-colors">Facebook</a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-xs text-muted-foreground tracking-widest">
            © 2026 NOVER NOIR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
