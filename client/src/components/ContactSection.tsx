import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { useSubmitContact } from "@/hooks/use-contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion } from "framer-motion";
import { Mail, Phone, Shield, CheckCircle } from "lucide-react";

export function ContactSection() {
  const mutation = useSubmitContact();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <span className="text-primary font-semibold tracking-wider text-sm uppercase mb-2 block">Contact Sales</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                Talk to a security specialist.
              </h2>
              <p className="text-lg text-muted-foreground max-w-md">
                Have questions about Coreser's platform? Our team will help you find the right modules for your risk profile and budget.
              </p>
            </div>

            <div className="space-y-5">
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
                    <h4 className="font-semibold text-foreground">{label}</h4>
                    <p className="text-muted-foreground text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-secondary/30 rounded-2xl p-6 border border-border/40">
              <p className="text-sm font-semibold text-foreground mb-3">What happens next?</p>
              <ul className="space-y-2">
                {[
                  "A specialist reviews your message within 1 business day",
                  "We schedule a 30-min discovery call",
                  "You receive a custom risk assessment plan",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle size={14} className="text-primary mt-0.5 shrink-0" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-black/5 border border-border/50"
          >
            {mutation.isSuccess ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-2">Message received!</h3>
                <p className="text-muted-foreground">A Coreser specialist will be in touch within 1 business day.</p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80 font-medium">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Jane Smith"
                            {...field}
                            className="h-12 bg-secondary/20 border-transparent focus:bg-white focus:border-primary/30 transition-all"
                            data-testid="input-contact-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80 font-medium">Work Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="jane@company.com"
                            {...field}
                            className="h-12 bg-secondary/20 border-transparent focus:bg-white focus:border-primary/30 transition-all"
                            data-testid="input-contact-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80 font-medium">Tell us about your security needs</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Number of employees, industry, biggest security concern..."
                            className="min-h-[140px] resize-none bg-secondary/20 border-transparent focus:bg-white focus:border-primary/30 transition-all"
                            {...field}
                            data-testid="input-contact-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full h-12 rounded-xl text-base font-semibold bg-primary hover:bg-accent text-white shadow-lg shadow-primary/20 transition-all duration-300"
                    data-testid="button-contact-submit"
                  >
                    {mutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
