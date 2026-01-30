import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { ContactSection } from "@/components/ContactSection";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* About Section - Minimalist Text */}
        <section id="about" className="py-24 bg-background">
          <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-4xl font-display font-light leading-relaxed text-center text-foreground/90"
            >
              "Good design is obvious. Great design is <span className="text-primary font-normal">transparent</span>. We believe in creating spaces where content can breathe and users can think."
            </motion.p>
          </div>
        </section>

        <Features />
        
        {/* Visual Break / Image Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl shadow-black/5 relative h-[400px] md:h-[600px] group">
            {/* Unsplash: Minimal architecture sage green white */}
            <img 
              src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2067&auto=format&fit=crop" 
              alt="Minimalist Architecture" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-8 md:p-12">
              <div className="text-white">
                <h3 className="text-3xl font-display font-bold mb-2">Simplicity at Scale</h3>
                <p className="text-white/80 max-w-md">Our philosophy applied to structural design.</p>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <footer className="bg-white py-12 border-t border-border/40">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">M</div>
            <span className="font-display font-bold text-lg">Minal.</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Minal Design Studio. All rights reserved.
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
