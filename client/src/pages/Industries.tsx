import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Heart, DollarSign, ShoppingCart, Cog, Rocket,
  ArrowRight, CheckCircle, Shield, AlertTriangle
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const industries = [
  {
    id: "healthcare",
    icon: Heart,
    name: "Healthcare",
    tagline: "Patient data. Regulatory certainty. Zero breaches.",
    color: "from-red-50 to-red-100/30",
    iconColor: "text-red-500",
    iconBg: "bg-red-100",
    stat: "$10.9M",
    statLabel: "Average healthcare breach cost",
    pain: "HIPAA violations, ransomware targeting EHR systems, and third-party vendor risk are existential threats for healthcare organizations.",
    challenges: [
      "HIPAA/HITECH compliance with audit-ready evidence",
      "Medical device security and IoT monitoring",
      "EHR system anomaly detection and access logging",
      "Ransomware recovery under 4-hour RTO targets",
    ],
    modules: ["Endpoint Protection", "Compliance Manager", "Identity & Access", "Risk Assessment"],
  },
  {
    id: "fintech",
    icon: DollarSign,
    name: "Fintech & Financial Services",
    tagline: "Trust is your product. Protect it absolutely.",
    color: "from-blue-50 to-blue-100/30",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100",
    stat: "$5.9M",
    statLabel: "Average fintech breach cost",
    pain: "PCI-DSS compliance, API security, and real-time fraud detection require financial services firms to maintain enterprise-grade security at startup speed.",
    challenges: [
      "PCI-DSS Level 1 compliance automation",
      "Open banking API security and monitoring",
      "Real-time transaction anomaly detection",
      "SOC 2 Type II evidence generation",
    ],
    modules: ["Compliance Manager", "Network Monitoring", "Risk Assessment", "SIEM Integration"],
  },
  {
    id: "retail",
    icon: ShoppingCart,
    name: "Retail & E-Commerce",
    tagline: "Protect every transaction. Keep customers loyal.",
    color: "from-orange-50 to-orange-100/30",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-100",
    stat: "60%",
    statLabel: "Of retail breaches target payment data",
    pain: "Point-of-sale systems, e-commerce platforms, and loyalty programs create a large, distributed attack surface that seasonal staffing makes even harder to defend.",
    challenges: [
      "PCI-DSS cardholder data environment protection",
      "E-commerce platform web application firewall",
      "Third-party vendor and supply chain risk",
      "Seasonal workforce security training at scale",
    ],
    modules: ["Endpoint Protection", "Compliance Manager", "Educational Hub", "Cloud Security"],
  },
  {
    id: "manufacturing",
    icon: Cog,
    name: "Manufacturing & OT",
    tagline: "Operational continuity is your security goal.",
    color: "from-gray-50 to-gray-100/30",
    iconColor: "text-gray-600",
    iconBg: "bg-gray-100",
    stat: "22%",
    statLabel: "Of all attacks target industrial systems",
    pain: "Legacy OT systems, converging IT/OT environments, and nation-state threats targeting critical infrastructure demand specialized security approaches.",
    challenges: [
      "OT/ICS network segmentation and monitoring",
      "Legacy system security without agent installation",
      "Supply chain integrity and vendor access control",
      "NIST SP 800-82 / IEC 62443 compliance mapping",
    ],
    modules: ["Network Monitoring", "Identity & Access", "Risk Assessment", "Endpoint Protection"],
  },
  {
    id: "saas",
    icon: Rocket,
    name: "SaaS Startups",
    tagline: "Build secure from day one. Close enterprise deals.",
    color: "from-primary/5 to-primary/10",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    stat: "SOC 2",
    statLabel: "Required by 78% of enterprise buyers",
    pain: "Enterprise customers require SOC 2 Type II reports before signing. Most startups spend 12+ months and $150K+ to get there. Coreser cuts that to weeks.",
    challenges: [
      "SOC 2 Type II fast-track with automated evidence collection",
      "Multi-tenant architecture security review",
      "Developer-friendly security tooling and SAST integration",
      "Cloud infrastructure security posture management",
    ],
    modules: ["Compliance Manager", "Cloud Security", "Risk Assessment", "Identity & Access"],
  },
];

export default function Industries() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              Industry Solutions
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
              Security built for your industry.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto">
              Every industry has unique compliance requirements, threat profiles, and attack surfaces. Coreser is pre-configured for yours.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Industry Nav */}
      <section className="sticky top-[60px] z-40 bg-white/90 backdrop-blur-md border-b border-border/40 py-4">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex gap-6 overflow-x-auto pb-1 scrollbar-none">
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <a
                  key={ind.id}
                  href={`#${ind.id}`}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary whitespace-nowrap transition-colors"
                  data-testid={`nav-industry-${ind.id}`}
                >
                  <Icon size={14} />
                  {ind.name}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industry Sections */}
      <div className="py-16 pb-32">
        {industries.map((industry, index) => {
          const Icon = industry.icon;
          const isEven = index % 2 === 0;
          return (
            <section
              key={industry.id}
              id={industry.id}
              className={`py-20 ${isEven ? "bg-white" : "bg-secondary/10"}`}
            >
              <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8 }}
                  className={`grid md:grid-cols-2 gap-16 items-start ${!isEven ? "md:[&>*:first-child]:order-2" : ""}`}
                  data-testid={`industry-${industry.id}`}
                >
                  {/* Content */}
                  <div>
                    <div className={`w-14 h-14 rounded-2xl ${industry.iconBg} flex items-center justify-center mb-5`}>
                      <Icon size={26} className={industry.iconColor} />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">{industry.name}</p>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">{industry.tagline}</h2>
                    <div className="flex items-center gap-3 mb-6">
                      <AlertTriangle size={16} className="text-destructive" />
                      <p className="text-muted-foreground text-sm leading-relaxed">{industry.pain}</p>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {industry.challenges.map((c) => (
                        <li key={c} className="flex items-start gap-3">
                          <CheckCircle size={16} className="text-primary mt-0.5 shrink-0" />
                          <span className="text-sm text-foreground">{c}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {industry.modules.map((m) => (
                        <span key={m} className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                          {m}
                        </span>
                      ))}
                    </div>
                    <Link href="/pricing">
                      <Button className="rounded-full px-7 py-5 bg-primary hover:bg-accent text-white" data-testid={`button-industry-${industry.id}`}>
                        See {industry.name} Pricing <ArrowRight size={15} className="ml-2" />
                      </Button>
                    </Link>
                  </div>

                  {/* Stats Card */}
                  <div className={`bg-gradient-to-br ${industry.color} rounded-3xl p-10 border border-border/40`}>
                    <div className="mb-8">
                      <div className="text-6xl font-display font-bold text-foreground mb-2">{industry.stat}</div>
                      <p className="text-muted-foreground text-sm">{industry.statLabel}</p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 bg-white/60 rounded-2xl p-4">
                        <div className={`w-10 h-10 rounded-xl ${industry.iconBg} flex items-center justify-center`}>
                          <Shield size={16} className={industry.iconColor} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Coreser protects you from this</p>
                          <p className="text-xs text-muted-foreground">Automated detection + response</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {["CISA Aligned", "Compliance Ready", "Mid-Market Priced", "4-Hour Deploy"].map((tag) => (
                          <div key={tag} className="bg-white/60 rounded-xl p-3 text-center">
                            <CheckCircle size={14} className="text-primary mx-auto mb-1" />
                            <p className="text-xs font-medium text-foreground">{tag}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <section className="py-24 bg-foreground text-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-display font-bold mb-6">
              Don't see your industry?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 text-lg mb-10">
              Coreser works for any mid-market organization. Talk to a security specialist and we'll configure the right modules for your specific environment.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/pricing">
                <Button className="rounded-full px-10 py-6 text-lg bg-primary hover:bg-accent text-white" data-testid="button-industries-cta">
                  Get Custom Assessment <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
