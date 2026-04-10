import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "How It Works", href: "/how-it-works" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Industries", href: "/industries" },
  { name: "Resources", href: "/resources" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 sm:px-6 lg:px-8",
        isScrolled || mobileMenuOpen ? "py-3 bg-white/95 backdrop-blur-md border-b border-border/40 shadow-sm" : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2 z-50">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white group-hover:scale-105 transition-transform">
            <Shield size={16} strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground">
            Core<span className="text-primary">ser</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                location === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              data-testid={`nav-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/trial">
            <Button
              className="rounded-full px-5 py-2 h-9 bg-primary hover:bg-accent text-white transition-all duration-300 text-sm"
              data-testid="button-cta-navbar"
            >
              Start Free Trial
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden z-50 p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div
          className={cn(
            "fixed inset-0 bg-white z-40 md:hidden flex flex-col items-center justify-center gap-8 transition-all duration-300",
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-2xl font-display font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/trial" onClick={() => setMobileMenuOpen(false)}>
            <Button className="mt-4 rounded-full px-8 py-6 text-lg bg-primary hover:bg-accent text-white">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
