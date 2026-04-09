import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Shield, Zap, BarChart3, BookOpen, Lock, ArrowRight,
  CheckCircle, AlertTriangle, TrendingUp, Users
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 via-background to-background pointer-events-none" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-display font-bold leading-tight text-foreground mb-6">
              Enterprise-Grade Security.{" "}
              <span className="text-primary">Modular.</span>{" "}
              Intelligent. Accessible.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
              Coreser gives mid-market businesses the cybersecurity power of enterprise teams — without the enterprise price tag or complexity.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link href="/pricing">
                <Button className="rounded-full px-8 py-6 text-base bg-primary hover:bg-accent text-white transition-all duration-300 shadow-lg shadow-primary/20" data-testid="button-hero-cta">
                  Get Free Risk Assessment
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="outline" className="rounded-full px-8 py-6 text-base border-border hover:bg-secondary hover:border-primary/30 transition-all duration-300" data-testid="button-hero-secondary">
                  See How It Works
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: "< 2%", label: "CPU Overhead", icon: Zap },
              { value: "98%", label: "Threat Detection Rate", icon: Shield },
              { value: "4 hrs", label: "Avg. Deployment Time", icon: TrendingUp },
              { value: "500+", label: "Mid-Market Clients", icon: Users },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="bg-white border border-border/60 rounded-2xl p-6 shadow-sm" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Icon size={18} className="text-primary" />
                </div>
                <div className="text-3xl font-display font-bold text-foreground">{value}</div>
                <div className="text-sm text-muted-foreground mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mid-Market Security Gap */}
      <section className="py-24 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 text-destructive bg-destructive/10 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <AlertTriangle size={14} />
                The Mid-Market Gap
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight mb-6">
                Too big to ignore. Too small for enterprise tools.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed mb-8">
                Mid-market companies are the #1 target for ransomware and supply-chain attacks — yet most security tools are built for Fortune 500 teams with 10+ person security departments. Coreser closes that gap.
              </motion.p>
              <motion.ul variants={stagger} className="space-y-4">
                {[
                  "43% of cyberattacks target mid-market businesses",
                  "Average breach cost: $4.5M — often company-ending",
                  "Most SMB tools lack compliance depth for regulated industries",
                ].map((point) => (
                  <motion.li key={point} variants={fadeUp} className="flex items-start gap-3 text-foreground">
                    <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-secondary/30 rounded-3xl p-10 border border-border/40"
            >
              <div className="space-y-6">
                {[
                  { label: "Enterprise Tools", coverage: 95, suitable: false },
                  { label: "SMB Tools", coverage: 30, suitable: false },
                  { label: "Coreser", coverage: 87, suitable: true },
                ].map(({ label, coverage, suitable }) => (
                  <div key={label}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-foreground">{label}</span>
                      <span className={`text-sm font-semibold ${suitable ? "text-primary" : "text-muted-foreground"}`}>
                        {coverage}% coverage
                      </span>
                    </div>
                    <div className="h-3 bg-border/60 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${coverage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full rounded-full ${suitable ? "bg-primary" : "bg-muted-foreground/40"}`}
                      />
                    </div>
                  </div>
                ))}
                <p className="text-sm text-muted-foreground pt-2">Mid-market security coverage benchmarked against CISA Framework controls</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-24 bg-secondary/20">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-primary font-medium text-sm uppercase tracking-widest mb-3">How It Works</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Three layers. Total protection.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl mx-auto mb-16">
              Coreser operates as a layered security platform — each module reinforces the others for defense-in-depth coverage.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8 mb-12"
          >
            {[
              {
                step: "01",
                title: "Assess",
                desc: "Automated risk assessment maps your attack surface against CISA benchmarks and produces your Coreser Score.",
                icon: BarChart3,
              },
              {
                step: "02",
                title: "Deploy",
                desc: "A lightweight agent (< 2% CPU) silently monitors endpoints, network traffic, and user behavior in real time.",
                icon: Zap,
              },
              {
                step: "03",
                title: "Protect & Learn",
                desc: "Continuous threat response, automated remediation, and an Educational Hub keep your team ahead of threats.",
                icon: BookOpen,
              },
            ].map(({ step, title, desc, icon: Icon }) => (
              <motion.div
                key={step}
                variants={fadeUp}
                className="bg-white rounded-3xl p-8 border border-border/50 text-left shadow-sm hover:shadow-md transition-shadow"
                data-testid={`card-howitworks-${step}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-primary/30 font-display font-bold text-4xl leading-none">{step}</span>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Icon size={22} className="text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <Link href="/how-it-works">
            <Button variant="outline" className="rounded-full px-8 py-5 border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-300">
              Explore the Full Journey <ArrowRight size={15} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Modular Architecture */}
      <section className="py-24 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { name: "Endpoint Protection", active: true },
                { name: "Network Monitoring", active: true },
                { name: "Identity & Access", active: true },
                { name: "Cloud Security", active: false },
                { name: "Compliance Manager", active: true },
                { name: "SIEM Integration", active: false },
              ].map(({ name, active }) => (
                <div
                  key={name}
                  className={`rounded-2xl p-5 border transition-all ${
                    active
                      ? "bg-primary/8 border-primary/30 text-primary"
                      : "bg-muted/50 border-border/40 text-muted-foreground"
                  }`}
                  data-testid={`module-${name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className={`w-8 h-8 rounded-lg mb-3 flex items-center justify-center ${active ? "bg-primary/20" : "bg-border"}`}>
                    <Lock size={14} className={active ? "text-primary" : "text-muted-foreground"} />
                  </div>
                  <p className="text-sm font-medium leading-tight">{name}</p>
                  <p className="text-xs mt-1 opacity-60">{active ? "Active" : "Add-on"}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="text-primary font-medium text-sm uppercase tracking-widest mb-3">Modular by Design</motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight mb-6">
                Pay only for what you need.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed mb-8">
                Start with your core risk profile, then layer on modules as your business grows. Every module is built to work independently or as part of the full Coreser stack.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link href="/pricing">
                  <Button className="rounded-full px-8 py-5 bg-primary hover:bg-accent text-white">
                    Build Your Security Stack <ArrowRight size={15} className="ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CISA Framework */}
      <section className="py-24 bg-foreground text-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-primary font-medium text-sm uppercase tracking-widest mb-3">Framework Alignment</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-display font-bold mb-4">
              Built on the CISA Framework
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 text-lg max-w-2xl mx-auto mb-16">
              Every Coreser module maps directly to CISA's five core functions — giving you a structured, government-grade security posture.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-5 gap-4"
          >
            {[
              { func: "Identify", desc: "Asset & risk mapping" },
              { func: "Protect", desc: "Safeguards & access control" },
              { func: "Detect", desc: "Anomaly & threat detection" },
              { func: "Respond", desc: "Automated incident response" },
              { func: "Recover", desc: "Resilience & restoration" },
            ].map(({ func, desc }) => (
              <motion.div
                key={func}
                variants={fadeUp}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-primary/20 hover:border-primary/40 transition-all"
                data-testid={`cisa-${func.toLowerCase()}`}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Shield size={18} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-white mb-2">{func}</h3>
                <p className="text-white/50 text-sm">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-secondary/20">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
              Know your risk score in{" "}
              <span className="text-primary">under 24 hours.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-10">
              Get a free, no-obligation risk assessment and Coreser Score — actionable insights your team can use immediately.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing">
                <Button className="rounded-full px-10 py-6 text-lg bg-primary hover:bg-accent text-white shadow-lg shadow-primary/20" data-testid="button-final-cta">
                  Start Free Assessment
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
}
