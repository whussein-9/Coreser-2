import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Shield, Zap, BarChart3, BookOpen, Lock, Globe,
  Server, Eye, CheckCircle, ArrowRight, HelpCircle
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const baseModules = [
  {
    id: "endpoint",
    name: "Endpoint Protection",
    icon: Shield,
    description: "Real-time malware detection, behavioral analysis, and automated isolation.",
    priceMonth: 4,
    priceAnnual: 3.2,
    unit: "/ endpoint / mo",
    required: true,
  },
  {
    id: "agent",
    name: "Lightweight Agent",
    icon: Zap,
    description: "The core Coreser monitoring agent. Required for all plans.",
    priceMonth: 0,
    priceAnnual: 0,
    unit: "included",
    required: true,
  },
  {
    id: "assessment",
    name: "Risk Assessment Engine",
    icon: BarChart3,
    description: "Continuous asset discovery, CVE correlation, and Coreser Score reporting.",
    priceMonth: 299,
    priceAnnual: 239,
    unit: "/ mo",
    required: true,
  },
];

const addOnModules = [
  {
    id: "network",
    name: "Network Monitoring",
    icon: Eye,
    description: "Full network traffic analysis, DNS monitoring, and lateral movement detection.",
    priceMonth: 199,
    priceAnnual: 159,
    unit: "/ mo",
  },
  {
    id: "identity",
    name: "Identity & Access",
    icon: Lock,
    description: "MFA enforcement, privileged access management, and credential threat detection.",
    priceMonth: 149,
    priceAnnual: 119,
    unit: "/ mo",
  },
  {
    id: "cloud",
    name: "Cloud Security",
    icon: Globe,
    description: "AWS, Azure, GCP posture management, misconfiguration detection, and CSPM.",
    priceMonth: 249,
    priceAnnual: 199,
    unit: "/ mo",
  },
  {
    id: "compliance",
    name: "Compliance Manager",
    icon: BookOpen,
    description: "Automated compliance evidence for HIPAA, PCI-DSS, SOC 2, and NIST frameworks.",
    priceMonth: 349,
    priceAnnual: 279,
    unit: "/ mo",
  },
  {
    id: "siem",
    name: "SIEM Integration",
    icon: Server,
    description: "Splunk, Microsoft Sentinel, and elastic SIEM connector with pre-built detection rules.",
    priceMonth: 199,
    priceAnnual: 159,
    unit: "/ mo",
  },
];

const managedAddOn = {
  id: "managed",
  name: "Coreser-Managed Service",
  priceMonth: 1999,
  priceAnnual: 1599,
  description:
    "Hand off monitoring, alerting, and incident response to Coreser's 24/7 Security Operations team. Includes a dedicated Customer Success Manager.",
  includes: [
    "24/7 SOC monitoring and alert triage",
    "Dedicated Customer Success Manager",
    "Monthly executive security briefing",
    "Incident response with 1-hour SLA",
  ],
};

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [endpoints, setEndpoints] = useState(50);
  const [activeAddOns, setActiveAddOns] = useState<string[]>([]);
  const [managed, setManaged] = useState(false);

  const toggleAddOn = (id: string) => {
    setActiveAddOns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const basePrice = annual
    ? baseModules.reduce((sum, m) => sum + (m.id === "endpoint" ? m.priceAnnual * endpoints : m.priceAnnual), 0)
    : baseModules.reduce((sum, m) => sum + (m.id === "endpoint" ? m.priceMonth * endpoints : m.priceMonth), 0);

  const addOnPrice = activeAddOns.reduce((sum, id) => {
    const mod = addOnModules.find((m) => m.id === id);
    if (!mod) return sum;
    return sum + (annual ? mod.priceAnnual : mod.priceMonth);
  }, 0);

  const managedPrice = managed ? (annual ? managedAddOn.priceAnnual : managedAddOn.priceMonth) : 0;

  const total = Math.round(basePrice + addOnPrice + managedPrice);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              Transparent Pricing
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
              Build your security stack.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              No hidden fees, no forced bundles. Choose exactly what your organization needs and see your price in real time.
            </motion.p>
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-4">
              <span className={`text-sm font-medium ${!annual ? "text-foreground" : "text-muted-foreground"}`}>
                Monthly
              </span>
              <Switch
                checked={annual}
                onCheckedChange={setAnnual}
                data-testid="switch-billing-annual"
                className="data-[state=checked]:bg-primary"
              />
              <span className={`text-sm font-medium ${annual ? "text-foreground" : "text-muted-foreground"}`}>
                Annual
                <span className="ml-2 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-semibold">
                  Save 20%
                </span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Builder */}
      <section className="pb-32">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Module Selector */}
            <div className="lg:col-span-2 space-y-8">
              {/* Endpoint count */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl p-8 border border-border/50 shadow-sm"
              >
                <h3 className="text-lg font-display font-bold text-foreground mb-2">How many endpoints?</h3>
                <p className="text-sm text-muted-foreground mb-6">Laptops, servers, workstations, and VMs</p>
                <div className="flex items-center gap-6">
                  <input
                    type="range"
                    min={10}
                    max={500}
                    step={10}
                    value={endpoints}
                    onChange={(e) => setEndpoints(Number(e.target.value))}
                    className="flex-1 accent-primary"
                    data-testid="input-endpoints-slider"
                  />
                  <div className="bg-secondary/50 rounded-xl px-4 py-2 min-w-[80px] text-center">
                    <span className="text-xl font-display font-bold text-primary">{endpoints}</span>
                    <span className="text-xs text-muted-foreground block">endpoints</span>
                  </div>
                </div>
              </motion.div>

              {/* Base modules */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Base Platform (Included)
                </h3>
                <div className="space-y-3">
                  {baseModules.map((mod) => {
                    const Icon = mod.icon;
                    return (
                      <div
                        key={mod.id}
                        className="bg-white border border-primary/20 rounded-2xl p-5 flex items-center gap-4"
                        data-testid={`module-base-${mod.id}`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon size={18} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground text-sm">{mod.name}</p>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Required</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{mod.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          {mod.priceMonth === 0 ? (
                            <span className="text-sm font-medium text-primary">Included</span>
                          ) : (
                            <div>
                              <span className="text-sm font-bold text-foreground">
                                ${annual ? mod.priceAnnual : mod.priceMonth}
                              </span>
                              <span className="text-xs text-muted-foreground block">{mod.unit}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add-on modules */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Add-On Modules
                </h3>
                <div className="space-y-3">
                  {addOnModules.map((mod) => {
                    const Icon = mod.icon;
                    const active = activeAddOns.includes(mod.id);
                    return (
                      <button
                        key={mod.id}
                        onClick={() => toggleAddOn(mod.id)}
                        className={`w-full text-left bg-white border rounded-2xl p-5 flex items-center gap-4 transition-all duration-200 ${
                          active
                            ? "border-primary shadow-sm shadow-primary/10 bg-primary/2"
                            : "border-border/50 hover:border-primary/30"
                        }`}
                        data-testid={`module-addon-${mod.id}`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            active ? "bg-primary/15" : "bg-muted/60"
                          }`}
                        >
                          <Icon size={18} className={active ? "text-primary" : "text-muted-foreground"} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium text-sm ${active ? "text-foreground" : "text-foreground/80"}`}>
                            {mod.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">{mod.description}</p>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                          <div className="text-right">
                            <span className="text-sm font-bold text-foreground">
                              +${annual ? mod.priceAnnual : mod.priceMonth}
                            </span>
                            <span className="text-xs text-muted-foreground block">{mod.unit}</span>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              active ? "border-primary bg-primary" : "border-border"
                            }`}
                          >
                            {active && <CheckCircle size={12} className="text-white" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Managed service */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Managed Service
                </h3>
                <button
                  onClick={() => setManaged(!managed)}
                  className={`w-full text-left bg-white border rounded-3xl p-6 flex items-start gap-4 transition-all duration-200 ${
                    managed ? "border-primary shadow-md shadow-primary/10" : "border-border/50 hover:border-primary/30"
                  }`}
                  data-testid="module-managed"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${managed ? "bg-primary/15" : "bg-muted/60"}`}>
                    <Shield size={22} className={managed ? "text-primary" : "text-muted-foreground"} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-foreground">{managedAddOn.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">{managedAddOn.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-lg font-bold text-foreground">
                          +${annual ? managedAddOn.priceAnnual : managedAddOn.priceMonth}
                        </span>
                        <span className="text-xs text-muted-foreground block">/ mo</span>
                      </div>
                    </div>
                    <ul className="mt-4 grid grid-cols-2 gap-2">
                      {managedAddOn.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-foreground/70">
                          <CheckCircle size={12} className="text-primary mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 shrink-0 ${
                      managed ? "border-primary bg-primary" : "border-border"
                    }`}
                  >
                    {managed && <CheckCircle size={12} className="text-white" />}
                  </div>
                </button>
              </div>
            </div>

            {/* Right: Price Summary (sticky) */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-foreground text-white rounded-3xl p-8"
                >
                  <h3 className="text-lg font-display font-bold mb-6">Your Plan</h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Base Platform ({endpoints} endpoints)</span>
                      <span className="text-white font-medium">${Math.round(basePrice)}/mo</span>
                    </div>
                    {activeAddOns.map((id) => {
                      const mod = addOnModules.find((m) => m.id === id)!;
                      return (
                        <div key={id} className="flex justify-between text-sm">
                          <span className="text-white/60">{mod.name}</span>
                          <span className="text-white font-medium">+${annual ? mod.priceAnnual : mod.priceMonth}/mo</span>
                        </div>
                      );
                    })}
                    {managed && (
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Managed Service</span>
                        <span className="text-white font-medium">+${annual ? managedAddOn.priceAnnual : managedAddOn.priceMonth}/mo</span>
                      </div>
                    )}
                    {annual && (
                      <div className="flex justify-between text-sm text-primary">
                        <span>Annual discount (20%)</span>
                        <span>Applied</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-white/10 pt-5 mb-7">
                    <div className="flex items-end justify-between">
                      <span className="text-white/60 text-sm">Estimated total</span>
                      <div className="text-right">
                        <motion.span
                          key={total}
                          initial={{ scale: 1.2, color: "#8A9A5B" }}
                          animate={{ scale: 1, color: "#ffffff" }}
                          className="text-4xl font-display font-bold text-white"
                          data-testid="text-price-total"
                        >
                          ${total}
                        </motion.span>
                        <span className="text-white/50 text-sm block">per month</span>
                      </div>
                    </div>
                    {annual && (
                      <p className="text-xs text-white/40 mt-2">
                        Billed annually as ${total * 12}/yr
                      </p>
                    )}
                  </div>

                  <Button
                    className="w-full rounded-full py-5 bg-primary hover:bg-accent text-white font-semibold mb-3"
                    data-testid="button-pricing-cta"
                  >
                    Start Free Assessment <ArrowRight size={16} className="ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full rounded-full py-5 border-white/20 text-white hover:bg-white/10 text-sm"
                  >
                    Talk to Sales
                  </Button>

                  <div className="mt-6 flex items-start gap-2 text-white/40 text-xs">
                    <HelpCircle size={12} className="shrink-0 mt-0.5" />
                    <p>No credit card required for risk assessment. Final pricing confirmed after assessment.</p>
                  </div>
                </motion.div>

                <div className="mt-6 bg-secondary/40 rounded-2xl p-5 border border-border/40">
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-3">All plans include</p>
                  <ul className="space-y-2">
                    {[
                      "Coreser Score & weekly reporting",
                      "CISA Framework gap analysis",
                      "Onboarding & deployment support",
                      "99.9% uptime SLA",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-foreground/70">
                        <CheckCircle size={12} className="text-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-muted/30 border-t border-border/40">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-foreground text-center mb-12">Pricing FAQ</h2>
          <div className="space-y-6">
            {[
              {
                q: "Is there a minimum contract length?",
                a: "Monthly plans have no lock-in. Annual plans are billed upfront and carry a 20% discount.",
              },
              {
                q: "What counts as an endpoint?",
                a: "Any device running the Coreser Agent — laptops, workstations, servers, and VMs all count. Mobile devices and network devices are not counted.",
              },
              {
                q: "Can I add modules after signing up?",
                a: "Yes. You can activate or deactivate any add-on module at any time from your dashboard. Changes are prorated.",
              },
              {
                q: "Is the free risk assessment really free?",
                a: "Yes. The initial risk assessment and your first Coreser Score report are completely free, with no credit card required.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl p-6 border border-border/40">
                <h4 className="font-semibold text-foreground mb-2">{q}</h4>
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
