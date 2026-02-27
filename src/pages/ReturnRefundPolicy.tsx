import { motion } from "framer-motion";

const ReturnRefundPolicy = () => {
  return (
    <main className="pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary text-xs tracking-[0.4em] uppercase mb-3 font-cinzel text-center">Legal</p>
          <h1 className="font-cinzel text-4xl md:text-5xl tracking-[0.1em] text-center mb-12">Return & Refund Policy</h1>

          <div className="prose prose-invert max-w-none space-y-8">
            <div className="text-muted-foreground leading-relaxed">
              <p className="text-lg mb-8">
                At NOVER NOIR, we are committed to delivering premium-quality fragrances crafted with care and precision. Due to the personal and hygienic nature of perfumes and attars, we maintain a strict return and refund policy to protect product integrity and ensure fairness.
              </p>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">1. Eligibility for Return or Refund</h2>
                <p className="mb-4">Returns and refunds are strictly applicable only under the following conditions:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>You have received a <strong>wrong product</strong>, OR</li>
                  <li>The product was <strong>physically damaged during transit</strong></li>
                </ul>
                <p className="mb-4">We do <strong>NOT</strong> offer returns or refunds for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Change of mind</li>
                  <li>Personal fragrance preference</li>
                  <li>Dislike of scent</li>
                  <li>Used or opened products</li>
                  <li>Minor packaging differences</li>
                  <li>Incorrect orders placed by the customer</li>
                </ul>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">2. Mandatory Unboxing Video Proof (Compulsory)</h2>
                <p className="mb-4">To qualify for any return or refund request, you must provide a <strong>continuous, unedited video recording</strong> of the unboxing.</p>
                <p className="mb-4">The video must clearly show:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>The sealed outer shipping package</li>
                  <li>That the parcel has not been previously opened or tampered with</li>
                  <li>The complete, uninterrupted unboxing process</li>
                  <li>Clear evidence of the wrong or damaged product</li>
                </ul>
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-sm mt-4">
                  <p className="font-semibold mb-2">Important:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>The video must begin before opening the parcel</li>
                    <li>Any cut, pause, or edited video will be considered invalid</li>
                    <li>Claims without proper video proof will be automatically rejected</li>
                  </ul>
                </div>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">3. No Exchange Policy</h2>
                <p className="mb-4">NOVER NOIR does <strong>not offer exchanges</strong> under any circumstances.</p>
                <p>If your claim meets the eligibility requirements and is approved after verification, only a <strong>refund</strong> will be processed.</p>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">4. Reporting Timeline</h2>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>The issue must be reported <strong>within 24 hours of delivery</strong></li>
                  <li>Email your complaint with:
                    <ul className="list-circle pl-6 mt-2 space-y-1">
                      <li>Order ID</li>
                      <li>Full unboxing video</li>
                      <li>Clear images (if applicable)</li>
                    </ul>
                  </li>
                  <li>Send to: <a href="mailto:support@novernoir.com" className="text-primary hover:underline">support@novernoir.com</a></li>
                </ul>
                <p className="text-yellow-500">Requests made after 24 hours of delivery will not be accepted.</p>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">5. Product Condition Requirements</h2>
                <p className="mb-4">To be eligible for review:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The product must be <strong>unused</strong></li>
                  <li>The original packaging, box, and seal must be <strong>intact</strong></li>
                  <li>The item must not show signs of usage or tampering</li>
                </ul>
                <p className="mt-4 text-yellow-500">Products without original packaging or with broken seals will not qualify for return under any condition.</p>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">6. Refund Process</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Once your claim is verified and approved, the refund will be processed within <strong>5–7 business days</strong></li>
                  <li>Refunds will be credited to the <strong>original payment method only</strong></li>
                  <li>Shipping charges (if applicable) are <strong>non-refundable</strong></li>
                </ul>
              </section>

              <div className="border-t border-border my-8"></div>

              <section className="mb-10">
                <h2 className="font-cinzel text-2xl tracking-[0.15em] text-foreground mb-4">7. Right to Refuse</h2>
                <p className="mb-4">NOVER NOIR reserves the right to deny any return or refund request that:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Does not meet the above conditions</li>
                  <li>Lacks valid proof</li>
                  <li>Shows signs of misuse or tampering</li>
                </ul>
                <p className="font-semibold">All decisions made by NOVER NOIR regarding returns and refunds shall be final.</p>
              </section>

              <div className="border-t border-border my-8"></div>

              <div className="text-center mt-12 text-sm">
                <p>For any questions or concerns, please contact us at:</p>
                <p className="text-primary mt-2">
                  <a href="mailto:support@novernoir.com" className="hover:underline">support@novernoir.com</a>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default ReturnRefundPolicy;
