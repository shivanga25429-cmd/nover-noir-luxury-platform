import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, Menu, X, UserCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { AuthDialog } from "@/components/AuthDialog";
import { UserDashboard } from "@/components/UserDashboard";

const Navbar = () => {
  const { totalItems } = useCart();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleCartClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setAuthDialogOpen(true);
    }
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    ...(user ? [{ to: "/orders", label: "My Orders" }] : []),
  ];

  const navShellClassName =
    isHomePage && !isScrolled
      ? "bg-transparent border-transparent backdrop-blur-0"
      : "bg-background/90 border-border backdrop-blur-md";

  const navTextClassName =
    isHomePage && !isScrolled ? "text-white/80 hover:text-primary" : "text-foreground/70 hover:text-primary";

  const navIconClassName =
    isHomePage && !isScrolled ? "text-white/80 group-hover:text-primary" : "text-foreground/70 group-hover:text-primary";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${navShellClassName}`}>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 font-cinzel text-2xl font-medium tracking-[0.3em] text-primary">
          <img src="/logo.svg" alt="Nover Noir logo" className="h-7 w-7 object-contain" />
          <span className="mt-1">NOVER NOIR</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm tracking-[0.15em] uppercase transition-colors duration-300 ${
                location.pathname === link.to ? "text-primary" : navTextClassName
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              if (user) {
                setDashboardOpen(true);
              } else {
                setAuthDialogOpen(true);
              }
            }}
            className="relative group"
          >
            <UserCircle className={`w-5 h-5 transition-colors ${navIconClassName}`} />
          </button>
          <Link to="/cart" onClick={handleCartClick} className="relative group">
            <ShoppingBag className={`w-5 h-5 transition-colors ${navIconClassName}`} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile - Icons and Menu */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => {
              if (user) {
                setDashboardOpen(true);
              } else {
                setAuthDialogOpen(true);
              }
            }}
            className="relative group"
          >
            <UserCircle className={`w-5 h-5 transition-colors ${navIconClassName}`} />
          </button>
          <Link to="/cart" onClick={handleCartClick} className="relative group">
            <ShoppingBag className={`w-5 h-5 transition-colors ${navIconClassName}`} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            className={isHomePage && !isScrolled ? "text-white" : "text-foreground"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 py-6 space-y-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block text-sm tracking-[0.15em] uppercase text-foreground/70 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* Auth Dialog */}
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
      
      {/* User Dashboard */}
      <UserDashboard open={dashboardOpen} onOpenChange={setDashboardOpen} />
    </nav>
  );
};

export default Navbar;
