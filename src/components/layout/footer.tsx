import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16 md:py-24 border-t-4 border-secondary">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-5">
            <h2 className="text-3xl font-serif mb-6 text-background">Anil Shukla</h2>
            <p className="text-primary-foreground/70 max-w-sm font-sans text-sm leading-relaxed mb-8">
              Advocate practicing before the Supreme Court of India, Delhi High Court, Tis Hazari Court, and the District Courts of Delhi. Over 12 years of dedicated legal practice.
            </p>
          </div>
          
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="text-sm font-bold tracking-widest uppercase text-secondary mb-6">Contact</h3>
            <ul className="space-y-4 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-secondary shrink-0" />
                <a href="tel:+917827716643" className="hover:text-background transition-colors">+91 78277 16643</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-secondary shrink-0" />
                <a href="mailto:anilshukla.clc@gmail.com" className="hover:text-background transition-colors">anilshukla.clc@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-secondary shrink-0 mt-1" />
                <span className="leading-snug">Delhi, India</span>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold tracking-widest uppercase text-secondary mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link href="/#about" className="hover:text-background transition-colors">About</Link></li>
              <li><Link href="/#practice-areas" className="hover:text-background transition-colors">Practice Areas</Link></li>
              <li><Link href="/#courts" className="hover:text-background transition-colors">Courts</Link></li>
              <li><Link href="/consultation" className="hover:text-background transition-colors text-secondary font-medium">Request Consultation</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/10 text-xs text-primary-foreground/50 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="max-w-2xl">
            <strong>Disclaimer:</strong> According to the rules of the Bar Council of India, advocates are prohibited from soliciting work or advertising. This website is for informational purposes only and does not constitute legal advice or solicitation.
          </p>
          <p>© {new Date().getFullYear()} Anil Shukla. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
