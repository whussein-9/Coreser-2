import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Shield, Zap, BarChart3, BookOpen, Lock, Globe,
  Server, Eye, CheckCircle, ArrowRight
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const tiers = [
  {
    name: "Starter",
    tagline: "Start free. See what you're working with.",
    description: "For growing teams ready to understand and reduce data loss risks with complete SaaS visibility.",
    cta: "Get Started",
    ctaHref: "/trial",
    highlight: false,
    features: [
      "Discover SaaS sprawl, including unsanctioned AI and shadow apps",
      "Detect spear phishing with no manual tuning",
      "Coreser Score baseline assessment",
      "Up to 1,000 users",
      "Standard onboarding support",
    ],
  },
  {
    name: "Foundations",
    tagline: "Governance and discovery at scale.",
    description: "For organizations ready to enforce privilege, map compliance, and tighten third-party access.",
    cta: "Get a Quote",
    ctaHref: "/contact",
    highlight: true,
    features: [
      "Shadow SaaS, AI agents, integrations, and browser extensions",
      "Third-party access ownership and last activity monitoring",
      "Privilege minimization and access rightsizing",
      "Compliance audit and mapping (SOC 2, HIPAA, PCI-DSS, NIST)",
      "Resolve unowned agents and integration access",
      "Dedicated Customer Success Manager",
    ],
  },
  {
    name: "Advanced",
    tagline: "Full detection, response, and AI security.",
    description: "For security-mature organizations that need deep threat detection, incident response, and AI guardrails.",
    cta: "Get a Quote",
    ctaHref: "/contact",
    highlight: false,
    features: [
      "Account takeover and session hijack detection",
      "Insider risk and misuse detection",
      "Sensitive data exposure in prompts and agent actions",
      "API and token compromise monitoring",
      "Runtime guardrails and AI security control",
      "Threat triage, remediation, and full chain forensics",
      "24/7 SOC monitoring with 1-hour SLA",
    ],
  },
];

const modules = [
  {
    id: "endpoint",
    name: "Endpoint Protection",
    icon: Shield,
    description: "Real-time malware detection, behavioral analysis, and automated isolation.",
  },
  {
    id: "agent",
    name: "Lightweight Agent",
    icon: Zap,
    description: "The core Coreser monitoring agent. Less than 2% CPU. Works silently in the background.",
  },
  {
    id: "assessment",
    name: "Risk Assessment Engine",
    icon: BarChart3,
    description: "Continuous asset discovery, CVE correlation, and Coreser Score reporting.",
  },
  {
    id: "network",
    name: "Network Monitoring",
    icon: Eye,
    description: "Full network traffic analysis, DNS monitoring, and lateral movement detection.",
  },
  {
    id: "identity",
    name: "Identity & Access",
    icon: Lock,
    description: "MFA enforcement, privileged access management, and credential threat detection.",
  },
  {
    id: "cloud",
    name: "Cloud Security",
    icon: Globe,
    description: "AWS, Azure, GCP posture management, misconfiguration detection, and CSPM.",
  },
  {
    id: "compliance",
    name: "Compliance Manager",
    icon: BookOpen,
    description: "Automated compliance evidence for HIPAA, PCI-DSS, SOC 2, and NIST frameworks.",
  },
  {
    id: "siem",
    name: "SIEM Integration",
    icon: Server,
    description: "Splunk, Microsoft Sentinel, and Elastic SIEM connector with pre-built detection rules.",
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
              Start free. Expand as you grow.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto">
              Security pricing for modular adoption. No bloated bundles, no long-term lock-in. Choose what your team needs and add more when you're ready.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Tiers */}
      <section className="pb-24">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {tiers.map((tier) => (
              <motion.div
                key={tier.name}
                variants={fadeUp}
                className={`rounded-3xl p-8 border flex flex-col ${
                  tier.highlight
                    ? "bg-foreground text-white border-foreground shadow-xl"
                    : "bg-white border-border/50 shadow-sm"
                }`}
              >
                <div className="mb-6">
                  <h3 className={`text-xl font-display font-bold mb-1 ${tier.highlight ? "text-white" : "text-foreground"}`}>
                    {tier.name}
                  </h3>
                  <p className={`text-sm mb-3 ${tier.highlight ? "text-white/60" : "text-muted-foreground"}`}>
                    {tier.tagline}
                  </p>
                  <p className={`text-sm leading-relaxed ${tier.highlight ? "text-white/50" : "text-muted-foreground"}`}>
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckCircle size={14} className={`mt-0.5 shrink-0 ${tier.highlight ? "text-primary" : "text-primary"}`} />
                      <span className={`text-sm leading-snug ${tier.highlight ? "text-white/70" : "text-foreground/70"}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a href={tier.ctaHref}>
                  <Button
                    className={`w-full rounded-full py-5 font-semibold transition-all ${
                      tier.highlight
                        ? "bg-primary hover:bg-accent text-white"
                        : "bg-foreground hover:bg-foreground/90 text-white"
                    }`}
                    data-testid={`button-pricing-${tier.name.toLowerCase()}`}
                  >
                    {tier.cta} <ArrowRight size={15} className="ml-2" />
                  </Button>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Module Library */}
      <section className="py-24 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeUp} className="text-4xl font-display font-bold text-foreground mb-5">
              The full module library
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-xl mx-auto">
              Every module is independently deployable and works seamlessly as part of the full Coreser stack. Contact us to find the right combination for your risk profile.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {modules.map((mod) => {
              const Icon = mod.icon;
              return (
                <motion.div
                  key={mod.id}
                  variants={fadeUp}
                  className="bg-secondary/20 border border-border/40 rounded-2xl p-6 hover:border-primary/30 hover:bg-secondary/40 transition-all"
                  data-testid={`module-card-${mod.id}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mb-2">{mod.name}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{mod.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Quote CTA */}
      <section className="py-24 bg-secondary/25">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-display font-bold text-foreground mb-5">
              SaaS and AI security done right.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Tell us about your environment and we'll put together a configuration built for your risk profile, your team size, and your budget.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/contact">
                <Button className="rounded-full px-10 py-6 text-base bg-primary hover:bg-accent text-white shadow-md shadow-primary/15">
                  Get a Quote <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white border-t border-border/30">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-foreground text-center mb-12">Common questions</h2>
          <div className="space-y-5">
            {[
              {
                q: "Is there a minimum contract length?",
                a: "Starter is free with no commitment. Foundations and Advanced plans are tailored — we'll work with you on the right term and structure for your organization.",
              },
              {
                q: "Can I start with one module and add more?",
                a: "Yes. Every module is independently deployable and can be activated or deactivated at any time from your dashboard. Changes are prorated.",
              },
              {
                q: "Is the Starter plan really free?",
                a: "Yes. The Starter tier is free for up to 1,000 users and includes your baseline Coreser Score and SaaS discovery. No credit card required.",
              },
              {
                q: "How does pricing work for larger organizations?",
                a: "For Foundations and Advanced, pricing is tailored to your organization's size, industry, and the modules you need. Contact us for a custom quote.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-secondary/20 rounded-2xl p-6 border border-border/30">
                <h4 className="font-semibold text-foreground mb-2 text-sm">{q}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
