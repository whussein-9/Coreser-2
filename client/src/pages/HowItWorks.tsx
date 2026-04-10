import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  BarChart3, Zap, Shield, BookOpen, TrendingUp, ArrowRight,
  ChevronDown, CheckCircle, Server, Eye, RefreshCw
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const steps = [
  {
    number: "01",
    title: "Risk Assessment",
    subtitle: "Know before you protect",
    icon: BarChart3,
    color: "from-blue-50 to-blue-100/50",
    accent: "#3B82F6",
    description:
      "Coreser begins with a comprehensive, automated risk assessment of your entire digital environment. Within hours, you'll receive your Coreser Score — a 0-100 composite rating of your security posture benchmarked against the CISA Framework.",
    details: [
      "Asset discovery across endpoints, cloud, and network",
      "Vulnerability scanning with zero agent install required",
      "CISA Framework gap analysis with prioritized findings",
      "Coreser Score report with executive-ready summary",
    ],
    duration: "2–4 hours",
  },
  {
    number: "02",
    title: "Custom Module Configuration",
    subtitle: "Build your security stack",
    icon: Shield,
    color: "from-primary/5 to-primary/10",
    accent: "#8A9A5B",
    description:
      "Based on your risk profile, Coreser recommends a tailored module configuration. You choose which protections to activate. Every module is priced transparently — no bundles, no surprises.",
    details: [
      "AI-driven module recommendations based on your risk score",
      "Industry-specific compliance templates (HIPAA, PCI-DSS, SOC 2)",
      "Mix-and-match modules to fit your budget",
      "Preview total cost and coverage before committing",
    ],
    duration: "1–2 hours",
  },
  {
    number: "03",
    title: "Lightweight Agent Deployment",
    subtitle: "Silent, powerful, non-disruptive",
    icon: Zap,
    color: "from-yellow-50 to-yellow-100/40",
    accent: "#EAB308",
    description:
      "A single, lightweight agent installs across your endpoints and infrastructure. Under 2% CPU overhead — your team won't notice it's there. Works with Windows, macOS, Linux, and containerized environments.",
    details: [
      "< 2% CPU and < 50MB memory footprint",
      "Group Policy / MDM / Ansible deployment support",
      "Encrypted telemetry with zero data exfiltration risk",
      "Air-gapped and hybrid environment support",
    ],
    duration: "Under 4 hours for full deployment",
  },
  {
    number: "04",
    title: "Continuous Monitoring",
    subtitle: "Eyes on your environment 24/7",
    icon: Eye,
    color: "from-purple-50 to-purple-100/40",
    accent: "#8B5CF6",
    description:
      "Once deployed, Coreser monitors your environment in real time — detecting anomalies, lateral movement, data exfiltration attempts, and policy violations. Alerts are triaged and correlated automatically.",
    details: [
      "Real-time behavioral anomaly detection using ML",
      "Network traffic analysis with encrypted protocol inspection",
      "Identity threat detection (credential stuffing, privilege escalation)",
      "SIEM integration via syslog, Splunk, or Microsoft Sentinel",
    ],
    duration: "Always-on",
  },
  {
    number: "05",
    title: "Coreser Score & Reporting",
    subtitle: "Security that improves over time",
    icon: TrendingUp,
    color: "from-green-50 to-green-100/40",
    accent: "#22C55E",
    description:
      "Your Coreser Score updates weekly, reflecting your organization's improving security posture. Executive dashboards, board-ready reports, and compliance evidence packages are generated automatically.",
    details: [
      "Weekly Coreser Score updates with trend analysis",
      "Board-ready PDF reports in one click",
      "Compliance evidence mapping (HIPAA, PCI-DSS, NIST)",
      "Employee security training progress tracking",
    ],
    duration: "Ongoing",
  },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              The Coreser Method
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
              How Coreser Works
            </motion.h1>
            <motion.p variants={fadeUp} className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto">
              A five-step journey from unknown risk to enterprise-grade security posture. No security team required.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex justify-center">
              <div className="animate-bounce text-muted-foreground/40">
                <ChevronDown size={28} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Steps */}
      <section className="py-12 pb-32">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border/60 -translate-x-1/2 hidden md:block" />

            <div className="space-y-24">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative md:grid md:grid-cols-2 md:gap-16 items-center ${isEven ? "" : ""}`}
                    data-testid={`step-${step.number}`}
                  >
                    {/* Dot on timeline */}
                    <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex w-10 h-10 rounded-full bg-white border-2 border-primary items-center justify-center shadow-sm z-10">
                      <Icon size={16} className="text-primary" />
                    </div>

                    {/* Content card */}
                    <div className={`${isEven ? "md:order-1" : "md:order-2"} mb-8 md:mb-0`}>
                      <div className={`bg-gradient-to-br ${step.color} rounded-3xl p-8 border border-border/40`}>
                        <div className="flex items-center gap-4 mb-5">
                          <span className="text-5xl font-display font-bold text-foreground/10">{step.number}</span>
                          <div>
                            <h2 className="text-xl font-display font-bold text-foreground">{step.title}</h2>
                            <p className="text-sm text-muted-foreground">{step.subtitle}</p>
                          </div>
                        </div>
                        <p className="text-foreground/80 leading-relaxed mb-6">{step.description}</p>
                        <ul className="space-y-2">
                          {step.details.map((d) => (
                            <li key={d} className="flex items-start gap-2 text-sm text-foreground/70">
                              <CheckCircle size={15} className="text-primary mt-0.5 shrink-0" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Duration badge */}
                    <div className={`${isEven ? "md:order-2" : "md:order-1"} flex ${isEven ? "md:justify-start md:pl-16" : "md:justify-end md:pr-16"}`}>
                      <div className="bg-white border border-border/60 rounded-2xl p-6 shadow-sm max-w-xs w-full">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                          <Icon size={22} className="text-primary" />
                        </div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Typical duration</p>
                        <p className="text-lg font-display font-bold text-foreground">{step.duration}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Architecture Strip */}
      <section className="py-20 bg-foreground text-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Under the Hood</h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Coreser's architecture is built for security, privacy, and performance at scale.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Server,
                title: "Zero-Trust Architecture",
                desc: "Every API call, agent communication, and data transfer is authenticated, encrypted, and logged. No implicit trust.",
              },
              {
                icon: RefreshCw,
                title: "Always-On Threat Intel",
                desc: "Threat signatures update every 6 hours from 40+ global threat intelligence feeds, including government-issued IOCs.",
              },
              {
                icon: Shield,
                title: "Data Residency Controls",
                desc: "Choose where your telemetry data lives — US, EU, or hybrid. GDPR, CCPA, and HIPAA compliant by default.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-5">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-3">{title}</h3>
                <p className="text-white/50 leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary/20">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Ready to start step one?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-10">
              Run a free risk assessment and receive your Coreser Score within 24 hours.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/trial">
                <Button className="rounded-full px-10 py-6 text-lg bg-primary hover:bg-accent text-white shadow-lg shadow-primary/20" data-testid="button-hiw-cta">
                  Start Free Trial <ArrowRight size={18} className="ml-2" />
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
