import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Shield, Zap, BarChart3, BookOpen, Lock, Eye,
  ArrowRight, CheckCircle, Star, Server, Globe, Users
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const features = [
  {
    id: "modular",
    icon: Lock,
    title: "Modular Architecture",
    tagline: "Pay for what you need. Expand when you're ready.",
    description:
      "Coreser's platform is a collection of independently deployable security modules. Start with your highest-risk areas and add modules as your business grows — no rip-and-replace migrations, ever.",
    highlights: [
      "6 core modules + 8 optional add-ons",
      "Activate, pause, or deactivate any module instantly",
      "Modules share a unified data layer for cross-correlation",
      "API-first for integration with your existing tools",
    ],
    visual: "modules",
  },
  {
    id: "agent",
    icon: Zap,
    title: "Lightweight Agent",
    tagline: "Enterprise protection. Zero footprint.",
    description:
      "The Coreser Agent runs silently across your endpoints collecting rich behavioral telemetry. Engineered for minimal resource consumption, it won't interfere with your team's productivity.",
    highlights: [
      "< 2% CPU, < 50MB RAM footprint",
      "Windows, macOS, Linux, Docker/Kubernetes",
      "Offline threat detection with local ML inference",
      "Encrypted, compressed telemetry transmission",
    ],
    visual: "agent",
  },
  {
    id: "risk",
    icon: BarChart3,
    title: "Risk Assessment Engine",
    tagline: "Your full attack surface. Mapped automatically.",
    description:
      "The Assessment Engine performs continuous asset discovery and vulnerability analysis across your on-prem, cloud, and SaaS environments — producing prioritized remediation playbooks for your team.",
    highlights: [
      "Agentless initial scan (no credentials required)",
      "CVE correlation with exploitability scoring",
      "Automated remediation playbooks in Jira, ServiceNow, or email",
      "Quarterly re-assessment included in all plans",
    ],
    visual: "risk",
  },
  {
    id: "score",
    icon: Star,
    title: "Coreser Score System",
    tagline: "Your security posture. In one number.",
    description:
      "The Coreser Score (0–100) gives you a real-time, composite view of your security posture benchmarked against your industry peers. It's your executive dashboard, board presentation, and insurance negotiating tool in one.",
    highlights: [
      "Composite score across 5 CISA Framework categories",
      "Peer benchmarking by industry and company size",
      "Score-to-premium correlation for cyber insurance",
      "Board-ready report generation in one click",
    ],
    visual: "score",
  },
  {
    id: "hub",
    icon: BookOpen,
    title: "Educational Hub",
    tagline: "Your employees are your biggest attack surface.",
    description:
      "The Coreser Educational Hub delivers role-based security training, phishing simulations, and compliance micro-learning to every employee — automatically triggered by real threat events in your environment.",
    highlights: [
      "300+ role-specific training modules",
      "Auto-triggered training based on employee behavior",
      "Phishing simulation with real-time risk scoring",
      "Compliance tracking for HIPAA, PCI-DSS, and more",
    ],
    visual: "hub",
  },
];

const VisualBlock = ({ type }: { type: string }) => {
  if (type === "score") {
    return (
      <div className="bg-gradient-to-br from-secondary/30 to-white rounded-3xl p-8 border border-border/40 flex flex-col items-center justify-center min-h-[280px]">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="12" />
            <motion.circle
              cx="60" cy="60" r="50"
              fill="none" stroke="hsl(95,26%,48%)" strokeWidth="12"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={2 * Math.PI * 50 * (1 - 0.78)}
              strokeLinecap="round"
              initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
              whileInView={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - 0.78) }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
            <span className="text-5xl font-display font-bold text-primary">78</span>
            <span className="text-xs text-muted-foreground">Coreser Score</span>
          </div>
        </div>
        <div className="mt-4 flex gap-6 text-sm">
          <span className="text-muted-foreground">Industry avg: <strong className="text-foreground">61</strong></span>
          <span className="text-primary font-semibold">Top 25%</span>
        </div>
      </div>
    );
  }

  if (type === "agent") {
    return (
      <div className="bg-foreground rounded-3xl p-8 border border-white/10 min-h-[280px] font-mono text-sm text-green-400 overflow-hidden">
        {[
          "$ coreser-agent --status",
          "● coreser-agent running",
          "  CPU usage:   1.2%",
          "  Memory:      42 MB",
          "  Uptime:      14d 6h 22m",
          "  Threats blocked: 3",
          "  Events/sec:  847",
          "  Status:      ✓ Healthy",
        ].map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`mb-1 ${line.startsWith("$") ? "text-white/70" : line.includes("✓") ? "text-green-400" : "text-green-400/70"}`}
          >
            {line}
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "modules") {
    const modules = [
      { name: "Endpoint Protection", pct: 100 },
      { name: "Network Monitoring", pct: 100 },
      { name: "Identity & Access", pct: 85 },
      { name: "Cloud Security", pct: 60 },
      { name: "Compliance Manager", pct: 100 },
    ];
    return (
      <div className="bg-white rounded-3xl p-8 border border-border/40 min-h-[280px] space-y-4">
        {modules.map(({ name, pct }) => (
          <div key={name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-foreground font-medium">{name}</span>
              <span className="text-primary font-semibold">{pct}%</span>
            </div>
            <div className="h-2 bg-border/50 rounded-full">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const icons = type === "risk" ? [BarChart3, Eye, Server, Globe] : [Users, BookOpen, Star, Shield];
  return (
    <div className="grid grid-cols-2 gap-4 min-h-[280px]">
      {icons.map((Icon, i) => (
        <div key={i} className="bg-secondary/30 rounded-2xl p-6 border border-border/40 flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Icon size={22} className="text-primary" />
          </div>
          <div className="h-2 w-16 bg-primary/20 rounded-full" />
          <div className="h-1.5 w-10 bg-border rounded-full" />
        </div>
      ))}
    </div>
  );
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              Platform Features
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
              Everything your security team needs.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto">
              Five integrated modules that work together — or independently — to deliver CISA-aligned security for mid-market organizations.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Feature Sections */}
      <section className="py-12 pb-24">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-32">
          {features.map((feature, index) => {
            const isEven = index % 2 === 0;
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                id={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`grid md:grid-cols-2 gap-16 items-center ${!isEven ? "md:[&>*:first-child]:order-2" : ""}`}
                data-testid={`feature-${feature.id}`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {feature.tagline}
                    </span>
                  </div>
                  <h2 className="text-4xl font-display font-bold text-foreground mb-4">{feature.title}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-foreground">
                        <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" />
                        <span className="text-sm">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <VisualBlock type={feature.visual} />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              How Coreser stacks up
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built specifically for mid-market realities — not downsized enterprise tools.
            </p>
          </div>
          <div className="bg-white rounded-3xl border border-border/50 overflow-hidden shadow-sm">
            <div className="grid grid-cols-4 bg-secondary/40 px-8 py-4 border-b border-border/40">
              <div className="text-sm font-semibold text-foreground">Feature</div>
              <div className="text-sm font-semibold text-muted-foreground text-center">Legacy MSSP</div>
              <div className="text-sm font-semibold text-muted-foreground text-center">SMB Tools</div>
              <div className="text-sm font-bold text-primary text-center">Coreser</div>
            </div>
            {[
              ["CISA Framework Alignment", false, false, true],
              ["Modular Pricing", false, false, true],
              ["< 2% Agent Overhead", false, true, true],
              ["Real-time Threat Detection", true, false, true],
              ["Coreser Score / Reporting", false, false, true],
              ["Employee Security Training", false, true, true],
              ["Mid-Market Optimized", false, false, true],
            ].map(([label, legacy, smb, core]) => (
              <div
                key={label as string}
                className="grid grid-cols-4 px-8 py-4 border-b border-border/20 last:border-0 hover:bg-secondary/20 transition-colors"
              >
                <div className="text-sm text-foreground font-medium">{label as string}</div>
                {[legacy, smb, core].map((val, i) => (
                  <div key={i} className="flex justify-center">
                    {val ? (
                      <CheckCircle size={18} className={i === 2 ? "text-primary" : "text-muted-foreground/50"} />
                    ) : (
                      <div className="w-5 h-0.5 bg-border rounded-full mt-2" />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-display font-bold mb-6">
              See all features in action.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/70 text-lg mb-10">
              Schedule a 30-minute demo and see how Coreser fits your specific environment.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <Button className="rounded-full px-10 py-6 text-lg bg-white text-primary hover:bg-secondary transition-all duration-300" data-testid="button-features-cta">
                  Get a Demo <ArrowRight size={18} className="ml-2" />
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
