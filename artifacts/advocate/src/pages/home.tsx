import { useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";
import { Scale, BookOpen, Landmark, Briefcase, ChevronRight, Phone, Mail } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-secondary selection:text-primary">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/90 mix-blend-multiply z-10" />
          <img 
            src={`${import.meta.env.BASE_URL}images/hero.png`} 
            alt="Supreme Court of India" 
            className="w-full h-full object-cover object-center grayscale opacity-60"
          />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block py-1 px-3 border border-secondary/50 text-secondary text-xs font-bold tracking-widest uppercase mb-8">
                Advocate, Delhi
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif text-background leading-[1.1] mb-8"
            >
              Quiet confidence.<br />
              <span className="text-secondary italic">Resolute counsel.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-background/80 max-w-2xl font-light leading-relaxed mb-12"
            >
              Representing clients with distinction before the Supreme Court of India, Delhi High Court, and District Courts for over 12 years.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#contact" className="px-8 py-4 bg-secondary text-primary font-medium tracking-wide hover:bg-background transition-colors flex items-center gap-2">
                Request Consultation <ChevronRight size={18} />
              </a>
              <a href="#about" className="px-8 py-4 bg-transparent border border-background/30 text-background font-medium tracking-wide hover:bg-background/10 transition-colors">
                Learn More
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn>
                <h2 className="text-3xl md:text-5xl font-serif text-primary mb-8 leading-tight">
                  12+ years of dedicated legal practice.
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    Anil Shukla is an Advocate based in Delhi, bringing over a decade of rigorous legal experience to every matter. His practice is defined by a commitment to thorough preparation, strategic foresight, and unwavering advocacy for his clients.
                  </p>
                  <p>
                    An alumnus of the prestigious Campus Law Centre (CLC), Faculty of Law at the University of Delhi, he approaches the law not merely as a profession, but as a calling. His counsel is sought for matters requiring deep analytical insight and nuanced understanding of Indian jurisprudence.
                  </p>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.4} className="mt-12 grid grid-cols-2 gap-8">
                <div className="border-l-2 border-secondary pl-6">
                  <h4 className="text-4xl font-serif text-primary mb-2">12+</h4>
                  <p className="text-sm font-bold tracking-widest uppercase text-muted-foreground">Years Experience</p>
                </div>
                <div className="border-l-2 border-secondary pl-6">
                  <h4 className="text-xl font-serif text-primary mb-2 mt-2">CLC, Delhi Univ.</h4>
                  <p className="text-sm font-bold tracking-widest uppercase text-muted-foreground">Alma Mater</p>
                </div>
              </FadeIn>
            </div>
            
            <FadeIn delay={0.3} className="relative">
              <div className="aspect-[3/4] relative bg-muted max-w-md mx-auto overflow-hidden">
                <img 
                  src={`${import.meta.env.BASE_URL}images/portrait-placeholder.png`} 
                  alt="Anil Shukla Monogram" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 text-[10px] uppercase tracking-widest bg-background/80 backdrop-blur px-2 py-1 text-primary">
                  Portrait Placeholder
                </div>
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-secondary/20 -z-10" />
              <div className="absolute -top-8 -right-8 w-48 h-48 border border-secondary/30 -z-10" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Courts Section */}
      <section id="courts" className="py-24 md:py-32 bg-primary text-background">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Jurisdiction</span>
              <h2 className="text-3xl md:text-5xl font-serif mb-6">Practicing before the highest courts</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Supreme Court of India", desc: "Appellate jurisdiction and constitutional matters before the apex court.", icon: <Scale size={32} /> },
              { title: "Delhi High Court", desc: "Writ petitions, appeals, and original side civil jurisdiction.", icon: <Landmark size={32} /> },
              { title: "District Courts of Delhi", desc: "Trials, bail matters, and original civil suits across all district courts.", icon: <Briefcase size={32} /> }
            ].map((court, i) => (
              <FadeIn key={i} delay={0.2 + (i * 0.1)} className="group cursor-default">
                <div className="border border-background/20 p-10 h-full hover:border-secondary transition-colors duration-500 bg-background/5">
                  <div className="text-secondary mb-8 group-hover:scale-110 transition-transform duration-500 origin-left">
                    {court.icon}
                  </div>
                  <h3 className="text-2xl font-serif mb-4">{court.title}</h3>
                  <p className="text-background/70 leading-relaxed">
                    {court.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section id="practice-areas" className="py-24 md:py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <FadeIn>
                  <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Expertise</span>
                  <h2 className="text-3xl md:text-5xl font-serif text-primary mb-8 leading-tight">Practice Areas</h2>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    Comprehensive legal representation across civil and criminal domains. Each case is approached with meticulous research and a tailored strategy.
                  </p>
                </FadeIn>
              </div>
            </div>
            
            <div className="lg:col-span-7 space-y-4">
              {[
                "Criminal Law",
                "Civil Litigation",
                "Matrimonial & Divorce",
                "Wills & Succession",
                "General Litigation"
              ].map((area, i) => (
                <FadeIn key={i} delay={0.1 * i}>
                  <div className="group p-8 border border-border hover:border-primary transition-all duration-300 bg-card hover:shadow-lg flex items-center justify-between cursor-default">
                    <h3 className="text-2xl font-serif text-primary group-hover:text-secondary transition-colors">{area}</h3>
                    <ChevronRight className="text-border group-hover:text-secondary transition-colors" />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pro Bono Section */}
      <section className="py-24 bg-card border-y border-border overflow-hidden relative">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-20 mix-blend-multiply pointer-events-none">
          <img src={`${import.meta.env.BASE_URL}images/books.png`} alt="" className="w-full h-full object-cover object-left" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <FadeIn className="max-w-3xl">
            <BookOpen className="text-secondary mb-8" size={40} />
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">Commitment to Justice</h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-light italic border-l-4 border-secondary pl-6">
              "Justice must not be a privilege of the few, but a right accessible to all. Anil Shukla takes on pro bono matters to ensure that deserving causes are not silenced by lack of resources."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto bg-primary text-background p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            
            <FadeIn>
              <div className="text-center mb-16 relative z-10">
                <h2 className="text-3xl md:text-5xl font-serif mb-6">Request a Consultation</h2>
                <p className="text-background/80 text-lg">Chambers are located in Delhi, India. In-person and virtual consultations available by appointment.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                <a 
                  href="tel:+91782771663" 
                  className="flex flex-col items-center justify-center p-10 border border-background/20 hover:bg-background/5 hover:border-secondary transition-all duration-300 group"
                >
                  <div className="w-16 h-16 rounded-full bg-background/10 flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-primary transition-colors">
                    <Phone size={24} />
                  </div>
                  <h3 className="text-xl font-bold tracking-widest uppercase mb-2">Phone</h3>
                  <p className="text-background/80 text-lg group-hover:text-secondary transition-colors">+91 78277 1663</p>
                </a>

                <a 
                  href="mailto:anilshukla.clc@gmail.com" 
                  className="flex flex-col items-center justify-center p-10 border border-background/20 hover:bg-background/5 hover:border-secondary transition-all duration-300 group"
                >
                  <div className="w-16 h-16 rounded-full bg-background/10 flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-primary transition-colors">
                    <Mail size={24} />
                  </div>
                  <h3 className="text-xl font-bold tracking-widest uppercase mb-2">Email</h3>
                  <p className="text-background/80 text-lg group-hover:text-secondary transition-colors truncate w-full text-center">anilshukla.clc@gmail.com</p>
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
