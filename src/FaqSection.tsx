import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";

const Section = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const FAQSection = () => {
  const questions = [
    "How fast will I receive my videos?",
    "How do I request edits?",
    "How does the process work?",
    "What if I’m not satisfied?",
    "Can you help build my content style?",
  ];

  const answers = [
    "Most edits arrive in 2–3 business days. Urgent 24-hour delivery is available if planned ahead for tight schedules.",
    "Send feedback via the review link I provide, or email or WhatsApp—whichever works best for you.",
    "We start with a strategy call to set tone and goals, then you share your footage. I edit and deliver polished videos quickly.",
    "Unlimited revisions until you’re happy. The goal is a video you’ll confidently want to post.",
    "Yes! I help shape your style—subtitles, colors, motion, and pacing—so it fits your audience perfectly.",
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [bounceTrigger, setBounceTrigger] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
      setBounceTrigger(index);
    }
  };

  useEffect(() => {
    if (bounceTrigger !== null) {
      const timer = setTimeout(() => setBounceTrigger(null), 300);
      return () => clearTimeout(timer);
    }
  }, [bounceTrigger]);

  return (
    <section id="faq-section">
      <Section>
        <section className="faq">
          <h2>Frequently Asked Questions</h2>
          {questions.map((q, i) => (
            <details
              key={i}
              open={openIndex === i}
              onClick={(e) => {
                e.preventDefault();
                toggleFAQ(i);
              }}
              className="faq-item tilt-faq"
            >
              <summary>
                <span className="faq-icon">+</span> {q}
              </summary>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.p
                    key={i}
                    initial={{ height: 0, opacity: 0, y: -5 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      y: 0,
                      transition:
                        bounceTrigger === i
                          ? { type: "spring", stiffness: 150, damping: 8 }
                          : { duration: 0.2 },
                    }}
                    exit={{ height: 0, opacity: 0, y: -5 }}
                  >
                    {answers[i]}
                  </motion.p>
                )}
              </AnimatePresence>
            </details>
          ))}
        </section>
      </Section>
    </section>
  );
};

export default FAQSection;
