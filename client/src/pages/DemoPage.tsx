import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Users, Eye, Shield } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || "";

export default function DemoPage() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    phone: "", jobTitle: "", company: "", consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) { setError("Please consent to communications to continue."); return; }
    setLoading(true); setError("");
    try {
      if (FORMSPREE_ENDPOINT) {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ type: "demo", name: `${form.firstName} ${form.lastName}`, email: form.email, phone: form.phone, jobTitle: form.jobTitle, company: form.company }),
        });
        if (!res.ok) throw new Error();
      } else {
        await new Promise((r) => setTimeout(r, 900));
      }
      setSubmitted(true);
    } catch { setError("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-36 pb-32">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">

            <motion.div initial="hidden" animate="show" variants={stagger} className="space-y-8 lg:pt-4">
              <motion.div variants={fadeUp}>
                <p className="text-sm text-primary font-medium tracking-wide uppercase mb-4">Let's connect</p>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight mb-5">
                  Book Your Demo
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Eliminate SaaS and AI security blind spots, stop identity-based breaches, and protect your data where it lives.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-5">
                {[
                  {
                    icon: Users,
                    title: "Meet a security expert",
                    desc: "Speak with a Coreser specialist who'll learn about your SaaS environment, AI usage, and business needs.",
                  },
                  {
                    icon: Eye,
                    title: "See a tailored demo",
                    desc: "Get a live walkthrough showing how Coreser eliminates your specific SaaS and AI security blind spots.",
                  },
                  {
                    icon: Shield,
                    title: "Get actionable insights",
                    desc: "Receive one-on-one feedback on strategies to close your specific SaaS and AI security gaps — immediately.",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm mb-1">{title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="bg-white rounded-2xl p-6 border border-border/40 shadow-sm">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  See why the largest Fortune 1000 and Global 2000 companies trust Coreser to accelerate safe AI usage and secure their SaaS environments.
                </p>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {["Upwork", "Snowflake", "BigCommerce"].map((name) => (
                    <div key={name} className="bg-secondary/30 rounded-xl px-3 py-2.5 text-center">
                      <span className="text-xs font-semibold text-foreground/60">{name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="bg-white rounded-3xl shadow-lg shadow-black/5 border border-border/40 p-8 md:p-10"
            >
              {submitted ? (
                <div className="text-center py-14">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={30} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-3">Demo booked.</h3>
                  <p className="text-muted-foreground">A Coreser security expert will reach out within one business day to confirm your session.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="mb-6">
                    <h2 className="text-xl font-display font-bold text-foreground mb-1">Book Your Demo Today</h2>
                    <p className="text-sm text-muted-foreground">30 minutes. Tailored to your environment.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground/70 mb-1.5">First Name <span className="text-primary">*</span></label>
                      <Input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Jane" required className="h-11 bg-secondary/20 border-transparent focus:bg-white focus:border-primary/30" data-testid="input-demo-firstname" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground/70 mb-1.5">Last Name <span className="text-primary">*</span></label>
                      <Input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Smith" required className="h-11 bg-secondary/20 border-transparent focus:bg-white focus:border-primary/30" data-testid="input-demo-lastname" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground/70 mb-1.5">Business Email <span className="text-primary">*</span></label>
                    <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" required className="h-11 bg-secondary/20 border-transparent focus:bg-white focus:border-primary/30" data-testid="input-demo-email" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground/70 mb-1.5">Phone Number</label>
                    <Input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className="h-11 bg-secondary/20 border-transparent focus:bg-white focus:border-primary/30" data-testid="input-demo-phone" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground/70 mb-1.5">Job Title <span className="text-primary">*</span></label>
                    <Input name="jobTitle" value={form.jobTitle} onChange={handleChange} placeholder="CTO / Security Lead / IT Director" required className="h-11 bg-secondary/20 border-transparent focus:bg-white focus:border-primary/30" data-testid="input-demo-jobtitle" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground/70 mb-1.5">Company <span className="text-primary">*</span></label>
                    <Input name="company" value={form.company} onChange={handleChange} placeholder="Acme Corp" required className="h-11 bg-secondary/20 border-transparent focus:bg-white focus:border-primary/30" data-testid="input-demo-company" />
                  </div>
                  <div className="flex items-start gap-3 pt-1">
                    <input type="checkbox" name="consent" id="demo-consent" checked={form.consent} onChange={handleChange} className="mt-0.5 accent-primary shrink-0" data-testid="input-demo-consent" />
                    <label htmlFor="demo-consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                      Yes, I consent to receive communications from Coreser Security. Visit our{" "}
                      <a href="/" className="underline hover:text-primary transition-colors">Terms of Use / Privacy Policy</a>.
                    </label>
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl text-sm font-semibold bg-primary hover:bg-accent text-white shadow-md shadow-primary/20" data-testid="button-demo-submit">
                    {loading ? "Submitting..." : "Get A Demo"}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
