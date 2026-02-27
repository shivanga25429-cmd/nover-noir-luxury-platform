import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-cinzel text-xl tracking-[0.3em] text-primary mb-4">NOVER NOIR</h3>
            <p className="text-muted-foreground text-sm leading-relaxed font-cormorant text-lg">
              Crafted Fragrance, Timeless Elegance. Premium scents designed for those who appreciate sophistication.
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
              <p>support@novernoir.com</p>
              <p>+91 79833 39080</p>
              <div className="flex gap-4 pt-2">
                <a href="https://www.instagram.com/novernoir/" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://x.com/Novernoir" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">X</a>
                <a href="https://www.facebook.com/profile.php?id=61588661760494" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://www.youtube.com/@NoverNoir" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">YouTube</a>
              </div>
              <div className="pt-4 flex flex-col gap-2">
                <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                <Link to="/terms-conditions" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link>
                <Link to="/return-refund-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Return & Refund Policy</Link>
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
