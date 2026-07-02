import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { motion } from "framer-motion";

export default function Disclaimer() {
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
            <h1 className="text-3xl md:text-5xl font-serif text-primary mb-8">Legal & Non-Solicitation Disclaimer</h1>
            
            <h3>DISCLAIMER AND RULES OF USE</h3>
            <p>
              The Bar Council of India strictly prohibits advocates from advertising or soliciting clients in any form or manner. By accessing this website (the "Website"), you acknowledge and confirm that you are seeking information relating to Anil Shukla of your own accord and that there has been no form of solicitation, advertisement, or inducement by Anil Shukla or any of their members to solicit work through this Website.
            </p>

            <h3>No Attorney-Client Relationship</h3>
            <p>
              The information provided on this Website is for general informational purposes only. Accessing, visiting, or interacting with this Website, including sending any communication through the contact form, does not establish or create an attorney-client relationship between you and Anil Shukla.
            </p>

            <h3>No Legal Advice</h3>
            <p>
              The content on this Website should not be construed as legal reference or legal advice. Users are advised to seek independent legal counsel before acting upon any information contained herein. Anil Shukla disclaims all liability for any actions taken or not taken based on any or all the contents of this Website.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
