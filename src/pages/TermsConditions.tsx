import { motion } from "framer-motion";

const TermsConditions = () => {
  return (
    <main className="pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary text-xs tracking-[0.4em] uppercase mb-3 font-cinzel text-center">Legal</p>
          <h1 className="font-cinzel text-4xl md:text-5xl tracking-[0.1em] text-center mb-12">Terms & Conditions</h1>

          <div className="prose prose-invert max-w-none space-y-8">
            <div className="text-muted-foreground leading-relaxed">
              <p className="text-lg mb-8">
                Welcome to NOVER NOIR. By accessing or using our website and purchasing our products, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully before proceeding.
              </p>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">1. Acceptance of Terms</h2>
                <p>By accessing and using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, along with our Privacy Policy and Return & Refund Policy. If you do not agree, please do not use our website or services.</p>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">2. Eligibility</h2>
                <p>By using our website and placing orders, you confirm that:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You are at least 18 years of age</li>
                  <li>You have the legal capacity to enter into binding contracts</li>
                  <li>All information provided during registration and checkout is accurate and complete</li>
                </ul>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">3. Products and Pricing</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All products are subject to availability</li>
                  <li>Prices are listed in Indian Rupees (INR) and may be subject to change without notice</li>
                  <li>We reserve the right to modify product descriptions, prices, or availability at any time</li>
                  <li>Product images are for illustration purposes and may vary slightly from actual products</li>
                  <li>All sales are final once the order is confirmed and shipped</li>
                </ul>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">4. Order Placement and Confirmation</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Placing an order constitutes an offer to purchase our products</li>
                  <li>We reserve the right to accept or decline any order for any reason</li>
                  <li>Order confirmation will be sent via email once payment is successfully processed</li>
                  <li>You are responsible for providing accurate shipping and contact information</li>
                  <li>NOVER NOIR is not liable for delays or non-delivery due to incorrect information provided by the customer</li>
                </ul>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">5. Payment</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payment must be made in full at the time of order placement</li>
                  <li>We accept major credit/debit cards, UPI, net banking, and other secure payment methods</li>
                  <li>All transactions are processed through secure third-party payment gateways</li>
                  <li>NOVER NOIR does not store your payment information</li>
                  <li>In case of payment failure, your order will not be processed</li>
                </ul>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">6. Shipping and Delivery</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Orders are typically processed within 1-3 business days</li>
                  <li>Delivery timelines depend on your location and courier partner availability</li>
                  <li>Shipping charges, if applicable, will be calculated at checkout</li>
                  <li>We are not responsible for delays caused by courier partners or unforeseen circumstances</li>
                  <li>Risk of loss and title pass to you upon delivery to the shipping address</li>
                </ul>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">7. Return and Refund Policy</h2>
                <p className="mb-4">Due to the personal and hygienic nature of fragrances, we maintain a strict return and refund policy. Please refer to our dedicated <strong>Return & Refund Policy</strong> page for full details.</p>
                <p>Returns and refunds are only applicable in cases of:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Wrong product delivered</li>
                  <li>Damaged product received (with unboxing video proof)</li>
                </ul>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">8. Intellectual Property</h2>
                <p className="mb-4">All content on this website, including but not limited to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Text, images, logos, and graphics</li>
                  <li>Product names and descriptions</li>
                  <li>Website design and layout</li>
                  <li>Trademarks and branding</li>
                </ul>
                <p className="mt-4">are the exclusive property of NOVER NOIR and are protected by copyright, trademark, and other intellectual property laws. Unauthorized use, reproduction, or distribution is strictly prohibited.</p>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">9. User Conduct</h2>
                <p className="mb-4">You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the website for any unlawful or fraudulent purpose</li>
                  <li>Attempt to gain unauthorized access to our systems or databases</li>
                  <li>Transmit viruses, malware, or harmful code</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Submit false, misleading, or inaccurate information</li>
                  <li>Engage in any activity that disrupts or interferes with the website's functionality</li>
                </ul>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">10. Limitation of Liability</h2>
                <p className="mb-4">To the fullest extent permitted by law, NOVER NOIR shall not be liable for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Indirect, incidental, or consequential damages</li>
                  <li>Loss of profits, revenue, or data</li>
                  <li>Delays or interruptions in service</li>
                  <li>Errors or inaccuracies in website content</li>
                  <li>Third-party actions or failures (e.g., payment gateways, couriers)</li>
                </ul>
                <p className="mt-4">Our total liability shall not exceed the amount paid by you for the product in question.</p>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">11. Privacy and Data Protection</h2>
                <p>We are committed to protecting your personal information. Please refer to our <strong>Privacy Policy</strong> for details on how we collect, use, and safeguard your data.</p>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">12. Modifications to Terms</h2>
                <p>NOVER NOIR reserves the right to update, modify, or change these Terms and Conditions at any time without prior notice. Changes will be effective immediately upon posting on the website. Continued use of the website constitutes acceptance of the updated terms.</p>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">13. Governing Law and Jurisdiction</h2>
                <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the courts in [Your City/State].</p>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">14. Severability</h2>
                <p>If any provision of these Terms and Conditions is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</p>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">15. Contact Information</h2>
                <p className="mb-4">For any questions or concerns regarding these Terms and Conditions, please contact us:</p>
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-sm">
                  <p><strong>NOVER NOIR</strong></p>
                  <p>Email: <a href="mailto:support@novernoir.com" className="text-primary hover:underline">support@novernoir.com</a></p>
                  <p>Phone: +91 79833 39080</p>
                </div>
              </section>

              <div className="border-t border-border my-8"></div>

              <div className="text-center mt-12">
                <p className="font-semibold text-foreground">By using our website, you acknowledge that you have read, understood, and agree to these Terms and Conditions.</p>
                <p className="text-sm text-muted-foreground mt-4">Last Updated: February 2026</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default TermsConditions;
