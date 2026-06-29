import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ConsultationForm } from "@/components/consultation-form";
import { motion } from "framer-motion";

export default function Consultation() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-secondary selection:text-primary">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto bg-primary text-background p-12 md:p-20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            
            <div className="text-center mb-16 relative z-10">
              <h2 className="text-3xl md:text-5xl font-serif mb-6">Request a Consultation</h2>
              <p className="text-background/80 text-lg">
                If you would like to discuss your matter, please fill out the form below. I take consultations in person at my chambers in Delhi as well as over phone and video — by appointment.
              </p>
            </div>

            <div className="relative z-10">
              <ConsultationForm />
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
