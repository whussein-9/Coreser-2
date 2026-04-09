import { Link } from "wouter";
import { Shield, Mail, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  Platform: [
    { name: "How It Works", href: "/how-it-works" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Security Score", href: "/features#score" },
  ],
  Industries: [
    { name: "Healthcare", href: "/industries#healthcare" },
    { name: "Fintech", href: "/industries#fintech" },
    { name: "Retail", href: "/industries#retail" },
    { name: "Manufacturing", href: "/industries#manufacturing" },
    { name: "SaaS Startups", href: "/industries#saas" },
  ],
  Resources: [
    { name: "Blog", href: "/resources#blog" },
    { name: "Security Quiz", href: "/resources#quiz" },
    { name: "Case Studies", href: "/resources#cases" },
    { name: "Employee Survey", href: "/resources#survey" },
  ],
  Company: [
    { name: "About Coreser", href: "/" },
    { name: "Contact", href: "/#contact" },
    { name: "Privacy Policy", href: "/" },
    { name: "Terms of Service", href: "/" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-white py-16">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <Shield size={16} strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-xl">Core<span className="text-primary">ser</span></span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              Enterprise-grade cybersecurity for mid-market businesses. Modular, intelligent, accessible.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-white/40 hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-white/40 hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-white/40 hover:text-primary transition-colors" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white/80 mb-4 tracking-wider uppercase">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-white/40 hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} Coreser, Inc. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            CISA Framework Aligned · SOC 2 Compliant · FedRAMP Ready
          </p>
        </div>
      </div>
    </footer>
  );
}
