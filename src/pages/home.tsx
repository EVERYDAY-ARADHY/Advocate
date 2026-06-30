import { useEffect, useState } from "react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { Scale, BookOpen, Landmark, Briefcase, ChevronRight, Phone, Mail, Plus, Minus } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { practiceAreas } from "@/data/practice-areas";
import { Link } from "wouter";

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
  const [openArea, setOpenArea] = useState<string | null>(null);

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
              Trusted counsel.<br />
              <span className="text-secondary italic">Resolute action.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-background/80 max-w-2xl font-light leading-relaxed mb-12"
            >
              Representing clients with distinction before the Supreme Court of India, the Delhi High Court, Tis Hazari Court, and the District Courts of Delhi for over 12 years.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/consultation" className="px-8 py-4 bg-secondary text-primary font-medium tracking-wide hover:bg-background transition-colors flex items-center gap-2 inline-flex">
                Request Consultation <ChevronRight size={18} />
              </Link>
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
                    I am an Advocate based in Delhi, and I have spent the last twelve years building a practice on the foundations of thorough preparation, strategic foresight, and unwavering advocacy for the people who place their trust in me.
                  </p>
                  <p>
                    I read law at the Campus Law Centre (CLC), Faculty of Law, University of Delhi, and I approach this profession not as a job, but as a calling. Whether the matter is a complex constitutional question or a quiet family dispute, I bring the same care, the same diligence, and the same respect for the client sitting across from me.
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
                  src={`${import.meta.env.BASE_URL}images/anil-shukla.jpeg`} 
                  alt="Anil Shukla, Advocate, before the Supreme Court of India" 
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-[10px] uppercase tracking-widest text-background/90">
                  Supreme Court of India
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
              { title: "Tis Hazari & District Courts", desc: "Regular practice at Tis Hazari Court and across all District Courts of Delhi — trials, bail, and original civil suits.", icon: <Briefcase size={32} /> }
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
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    Comprehensive legal representation across civil and criminal domains. Each matter is approached with meticulous research and a tailored strategy.
                  </p>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed">
                    Tap a practice area to see the matters handled within it, or use the search icon in the top bar to look up a specific keyword like <span className="text-primary font-medium">"bail"</span> or <span className="text-primary font-medium">"divorce"</span>.
                  </p>
                </FadeIn>
              </div>
            </div>
            
            <div className="lg:col-span-7 space-y-4">
              {practiceAreas.map((area, i) => {
                const isOpen = openArea === area.id;
                return (
                  <FadeIn key={area.id} delay={0.05 * i}>
                    <div
                      className={`border bg-card transition-all duration-300 ${
                        isOpen
                          ? "border-primary shadow-lg"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <button
                        type="button"
                        data-area-id={area.id}
                        onClick={() => setOpenArea(isOpen ? null : area.id)}
                        aria-expanded={isOpen}
                        className="w-full p-6 md:p-8 flex items-center justify-between text-left group cursor-pointer"
                      >
                        <div className="min-w-0 pr-4">
                          <h3 className={`text-xl md:text-2xl font-serif transition-colors ${isOpen ? "text-secondary" : "text-primary group-hover:text-secondary"}`}>
                            {area.name}
                          </h3>
                          <p className="text-xs tracking-widest uppercase text-muted-foreground mt-2">
                            {area.services.length} matters handled
                          </p>
                        </div>
                        <span
                          className={`shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                            isOpen
                              ? "border-secondary text-secondary bg-secondary/5"
                              : "border-border text-muted-foreground group-hover:border-secondary group-hover:text-secondary"
                          }`}
                        >
                          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 md:px-8 pb-8 pt-2 border-t border-border">
                              <p className="text-muted-foreground italic mb-6 leading-relaxed">
                                {area.blurb}
                              </p>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                                {area.services.map((service) => (
                                  <li
                                    key={service}
                                    className="flex items-start gap-3 text-sm text-primary/90"
                                  >
                                    <span className="mt-2 w-1 h-1 rounded-full bg-secondary shrink-0" />
                                    <span>{service}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-between flex-wrap gap-3">
                                <p className="text-xs text-muted-foreground">
                                  Don't see your matter? Many allied issues are still handled.
                                </p>
                                <Link
                                  href="/consultation"
                                  className="text-xs font-bold tracking-widest uppercase text-secondary hover:text-primary transition-colors flex items-center gap-1 inline-flex"
                                >
                                  Discuss Your Matter <ChevronRight size={14} />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </FadeIn>
                );
              })}
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
              "Justice must not be a privilege of the few, but a right within reach of all. I take on pro bono matters because no deserving cause should go unheard for want of means."
            </p>
          </FadeIn>
        </div>
      </section>


      <Footer />
    </div>
  );
}
