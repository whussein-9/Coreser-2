import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/50 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl opacity-50 -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="space-y-8"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary-foreground font-medium text-sm tracking-wide bg-primary/10 text-primary">
            Redefining Minimal Design
          </span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground tracking-tight leading-[1.1] text-balance">
            Design that <span className="text-primary italic">breathes</span> <br className="hidden md:block"/> and inspires.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance font-light leading-relaxed">
            We craft digital experiences that strip away the non-essential, focusing purely on what matters most: your content, your story, your impact.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="rounded-full px-8 h-14 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start a Project
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="rounded-full px-8 h-14 text-base font-medium hover:bg-secondary/50 group"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More 
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-muted-foreground/20 overflow-hidden">
          <div className="w-full h-1/2 bg-primary/50 animate-accordion-down" />
        </div>
      </motion.div>
    </section>
  );
}
