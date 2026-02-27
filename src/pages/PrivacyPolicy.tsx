import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <main className="pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary text-xs tracking-[0.4em] uppercase mb-3 font-cinzel text-center">Legal</p>
          <h1 className="font-cinzel text-4xl md:text-5xl tracking-[0.1em] text-center mb-12">Privacy Policy</h1>

          <div className="prose prose-invert max-w-none space-y-8">
            <div className="text-muted-foreground leading-relaxed">
              <p className="text-lg mb-8">
                At NOVER NOIR, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or purchase our products.
              </p>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">1. Information We Collect</h2>
                <p className="mb-4">We may collect the following types of information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address, and billing information when you place an order</li>
                  <li><strong>Account Information:</strong> Username, password, and preferences if you create an account</li>
                  <li><strong>Payment Information:</strong> Credit card or payment details (processed securely through third-party payment gateways)</li>
                  <li><strong>Usage Data:</strong> IP address, browser type, device information, and browsing behavior on our website</li>
                  <li><strong>Communication Data:</strong> Messages, feedback, or inquiries you send to us</li>
                </ul>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">2. How We Use Your Information</h2>
                <p className="mb-4">We use your information for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To process and fulfill your orders</li>
                  <li>To communicate with you regarding your purchases, order status, and shipping updates</li>
                  <li>To provide customer support and respond to your inquiries</li>
                  <li>To improve our website, products, and services</li>
                  <li>To send promotional offers, newsletters, and updates (with your consent)</li>
                  <li>To prevent fraud and ensure secure transactions</li>
                  <li>To comply with legal obligations and regulations</li>
                </ul>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">3. How We Share Your Information</h2>
                <p className="mb-4">We do not sell, rent, or trade your personal information to third parties. However, we may share your data with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Service Providers:</strong> Payment processors, shipping companies, and logistics partners to fulfill orders</li>
                  <li><strong>Legal Authorities:</strong> When required by law or to protect our rights, safety, or property</li>
                  <li><strong>Business Transfers:</strong> In case of a merger, acquisition, or sale of assets, your information may be transferred to the new entity</li>
                </ul>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">4. Data Security</h2>
                <p className="mb-4">We implement industry-standard security measures to protect your personal information, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>SSL encryption for secure data transmission</li>
                  <li>Secure payment gateways for transactions</li>
                  <li>Access controls and authentication measures</li>
                  <li>Regular security audits and updates</li>
                </ul>
                <p className="mt-4">However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.</p>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">5. Cookies and Tracking Technologies</h2>
                <p className="mb-4">We use cookies and similar tracking technologies to enhance your browsing experience. Cookies help us:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Provide personalized content and recommendations</li>
                  <li>Improve website functionality and performance</li>
                </ul>
                <p className="mt-4">You can control cookie settings through your browser, but disabling cookies may affect website functionality.</p>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">6. Your Rights and Choices</h2>
                <p className="mb-4">You have the following rights regarding your personal information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal obligations)</li>
                  <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails at any time</li>
                  <li><strong>Data Portability:</strong> Request your data in a structured, machine-readable format</li>
                </ul>
                <p className="mt-4">To exercise these rights, contact us at <a href="mailto:support@novernoir.com" className="text-primary hover:underline">support@novernoir.com</a></p>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">7. Third-Party Links</h2>
                <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We recommend reviewing their privacy policies before providing any personal information.</p>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">8. Data Retention</h2>
                <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Once your data is no longer needed, we will securely delete or anonymize it.</p>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">9. Children's Privacy</h2>
                <p>Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we discover that we have inadvertently collected data from a minor, we will delete it promptly.</p>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">10. Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page with a revised effective date. We encourage you to review this policy periodically.</p>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">11. Contact Us</h2>
                <p className="mb-4">If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at:</p>
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-sm">
                  <p><strong>NOVER NOIR</strong></p>
                  <p>Email: <a href="mailto:support@novernoir.com" className="text-primary hover:underline">support@novernoir.com</a></p>
                  <p>Phone: +91 79833 39080</p>
                </div>
              </section>

              <div className="border-t border-border my-8"></div>

              <div className="text-center mt-12 text-sm text-muted-foreground">
                <p>Last Updated: February 2026</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
