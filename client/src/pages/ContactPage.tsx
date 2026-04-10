import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Mail, Phone, Shield } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || "";

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    phone: "", jobTitle: "", company: "", message: "", consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
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
          body: JSON.stringify({ type: "quote", name: `${form.firstName} ${form.lastName}`, email: form.email, phone: form.phone, jobTitle: form.jobTitle, company: form.company, message: form.message }),
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
                <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight mb-5">
                  SaaS and AI security done right. Get a quote.
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Tell us about your environment and we'll put together a configuration built for your risk profile, your team size, and your budget. No pressure, no bloated bundles.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-5">
                {[
                  { icon: Mail, label: "Email Us", value: "sales@coreser.io" },
                  { icon: Phone, label: "Call Us", value: "+1 (800) 267-3737" },
                  { icon: Shield, label: "Security Emergencies", value: "ir@coreser.io" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{label}</h4>
                      <p className="text-muted-foreground text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="bg-white rounded-2xl p-6 border border-border/40 shadow-sm">
                <p className="text-sm font-semibold text-foreground mb-3">What happens next?</p>
                <ul className="space-y-2">
                  {[
                    "A specialist reviews your submission within 1 business day",
                    "We schedule a 30-minute discovery call to understand your environment",
                    "You receive a custom security configuration and pricing proposal",
                  ].map((step) => (
                    <li key={step} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle size={14} className="text-primary mt-0.5 shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>
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
                  <h3 className="text-2xl font-display font-bold text-foreground mb-3">Request received.</h3>
                  <p className="text-muted-foreground">A Coreser specialist will be in touch within one business day with your custom quote.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="mb-6">
                    <h2 className="text-xl font-display font-bold text-foreground mb-1">Get a Quote</h2>
                    <p className="text-sm text-muted-foreground">Custom pricing built for your organization.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground/70 mb-1.5">First Name <span className="text-primary">*</span></label>
                      <Input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Jane" required className="h-11 bg-secondary/20 border-transparent focus:bg-white focus:border-primary/30" data-testid="input-contact-firstname" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground/70 mb-1.5">Last Name <span className="text-primary">*</span></label>
                      <Input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Smith" required className="h-11 bg-secondary/20 border-transparent focus:bg-white focus:border-primary/30" data-testid="input-contact-lastname" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground/70 mb-1.5">Business Email <span className="text-primary">*</span></label>
                    <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" required className="h-11 bg-secondary/20 border-transparent focus:bg-white focus:border-primary/30" data-testid="input-contact-email" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground/70 mb-1.5">Phone Number</label>
                    <Input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className="h-11 bg-secondary/20 border-transparent focus:bg-white focus:border-primary/30" data-testid="input-contact-phone" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground/70 mb-1.5">Job Title <span className="text-primary">*</span></label>
                    <Input name="jobTitle" value={form.jobTitle} onChange={handleChange} placeholder="CTO / Security Lead / IT Director" required className="h-11 bg-secondary/20 border-transparent focus:bg-white focus:border-primary/30" data-testid="input-contact-jobtitle" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground/70 mb-1.5">Company <span className="text-primary">*</span></label>
                    <Input name="company" value={form.company} onChange={handleChange} placeholder="Acme Corp" required className="h-11 bg-secondary/20 border-transparent focus:bg-white focus:border-primary/30" data-testid="input-contact-company" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground/70 mb-1.5">Tell us about your needs</label>
                    <Textarea name="message" value={form.message} onChange={handleChange} placeholder="Number of employees, industry, biggest security concern..." className="min-h-[100px] resize-none bg-secondary/20 border-transparent focus:bg-white focus:border-primary/30" data-testid="input-contact-message" />
                  </div>
                  <div className="flex items-start gap-3 pt-1">
                    <input type="checkbox" name="consent" id="contact-consent" checked={form.consent} onChange={handleChange} className="mt-0.5 accent-primary shrink-0" data-testid="input-contact-consent" />
                    <label htmlFor="contact-consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                      Yes, I consent to receive communications from Coreser Security. Visit our{" "}
                      <a href="/" className="underline hover:text-primary transition-colors">Terms of Use / Privacy Policy</a>.
                    </label>
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl text-sm font-semibold bg-primary hover:bg-accent text-white shadow-md shadow-primary/20" data-testid="button-contact-submit">
                    {loading ? "Submitting..." : "Get Pricing"}
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
