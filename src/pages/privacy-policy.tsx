import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-secondary selection:text-primary">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-headings:text-primary prose-a:text-secondary prose-p:text-muted-foreground prose-strong:text-primary prose-li:text-muted-foreground"
          >
            <h1 className="text-3xl md:text-5xl font-serif text-primary mb-8">Privacy Policy</h1>
            
            <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>

            <p>This Privacy Policy outlines how Anil Shukla ("we," "us," or "our") collects, uses, and protects your information when you visit this website (the "Website").</p>

            <h3>Information We Collect</h3>
            <p>We may collect personal information that you voluntarily provide to us when you use the Website. This primarily includes:</p>
            <ul>
              <li>Name, email address, and phone number when you fill out the contact form.</li>
              <li>Standard website analytics data (such as IP addresses, browser types, and usage patterns) collected to improve user experience.</li>
            </ul>

            <h3>How We Use Your Information</h3>
            <p>The information we collect is used strictly for the following purposes:</p>
            <ul>
              <li>To respond to your inquiries and communicate with you effectively.</li>
              <li>To improve, optimize, and maintain the functionality and user experience of our Website.</li>
            </ul>

            <h3>Data Sharing and Protection</h3>
            <p>We respect your privacy and are committed to protecting your personal data. We guarantee that your personal information will <strong>never</strong> be sold, rented, or leased to third parties. We employ industry-standard data protection measures to safeguard your information from unauthorized access, disclosure, alteration, or destruction.</p>

            <h3>Your Rights</h3>
            <p>You retain the right to request access to the personal data we hold about you, request corrections to any inaccurate information, or request the deletion of your data. To exercise these rights, please contact us directly through the provided communication channels on the Website.</p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
