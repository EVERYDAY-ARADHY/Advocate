import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { motion } from "framer-motion";

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-secondary selection:text-primary">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-headings:text-primary prose-a:text-secondary prose-p:text-muted-foreground prose-strong:text-primary"
          >
            <h1 className="text-3xl md:text-5xl font-serif text-primary mb-8">Terms of Service</h1>
            
            <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>

            <p>By accessing or using this website (the "Website"), you agree to comply with and be bound by the following terms and conditions. If you do not agree with these terms, please do not use the Website.</p>

            <h3>Acceptable Use</h3>
            <p>Visitors agree to use the Website only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit the use and enjoyment of the Website by any third party. You agree not to use the Website to transmit any harmful, threatening, or unlawful material.</p>

            <h3>Intellectual Property Rights</h3>
            <p>All original written content, profile materials, design elements, and graphics on this Website are the exclusive property of Anil Shukla. Unauthorized use, reproduction, distribution, or modification of any material from this Website without prior written consent is strictly prohibited and protected by applicable copyright and intellectual property laws.</p>

            <h3>Limitation of Liability</h3>
            <p>The content provided on this Website is for general informational purposes only. Anil Shukla makes no warranties or representations regarding the accuracy, completeness, or reliability of the content. Under no circumstances shall Anil Shukla be held liable for any direct, indirect, incidental, or consequential damages resulting from your use of, or inability to use, the Website or any actions taken based on the content provided herein.</p>

            <h3>Changes to Terms</h3>
            <p>We reserve the right to modify these Terms of Service at any time. Any changes will be effective immediately upon posting to the Website. Your continued use of the Website after any modifications indicates your acceptance of the updated terms.</p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
