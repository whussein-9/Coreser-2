import { motion } from "framer-motion";
import { Layout, Feather, Zap, Globe } from "lucide-react";

const features = [
  {
    icon: Layout,
    title: "Thoughtful Layouts",
    description: "Every pixel is placed with intention. We use grid systems that create harmony and balance across all device sizes."
  },
  {
    icon: Feather,
    title: "Lightweight Design",
    description: "Performance meets aesthetics. Our designs are optimized for speed without sacrificing visual quality."
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Built to be accessible and inclusive. We ensure your message resonates with audiences everywhere."
  },
  {
    icon: Zap,
    title: "Seamless Interaction",
    description: "Micro-interactions that delight. We add depth and feedback to make the user experience feel alive."
  }
];

export function Features() {
  return (
    <section id="services" className="py-24 md:py-32 bg-white relative">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">
            Simplicity is the ultimate sophistication.
          </h2>
          <p className="text-lg text-muted-foreground">
            Our approach combines aesthetic purity with functional robustness to create products that stand the test of time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
