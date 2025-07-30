import React from "react";
import { InlineWidget } from "react-calendly";
import { motion } from "framer-motion";
import "./styles.css";

const CalendlySection = () => {
  return (
    <motion.section
    id="calendly-section"   // ✅ Add this line
    className="calendly-wrapper"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
      <h2 className="calendly-heading">Book a 1-Hour Strategy Call</h2>

      <div className="calendly-center-container">
        <div className="calendly-scale-container">
          <iframe
            src="https://calendly.com/narayanaditya/1hour"
            className="calendly-iframe"
            width="1000"
            height="950"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
      </div>
    </motion.section>
  );
};

export default CalendlySection;
