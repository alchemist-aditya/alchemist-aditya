import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    const section = document.querySelector(id.startsWith("#") ? id : `#${id}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.div
        className="mobile-nav-icon"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
      >
        <div className={`bar ${isOpen ? "open" : ""}`} />
        <div className={`bar ${isOpen ? "open" : ""}`} />
        <div className={`bar ${isOpen ? "open" : ""}`} />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ul>
              <li onClick={() => handleLinkClick("#hero")}>Home</li>
              <li onClick={() => handleLinkClick("About-Me")}>About Me</li>
              <li onClick={() => handleLinkClick("what-i-do-section")}>
                What I Do
              </li>
              <li onClick={() => handleLinkClick("faq-section")}>FAQs</li>
            </ul>
            <a
              className="primary-button shine-sweep mobile"
              href="https://calendly.com/narayanaditya/1hour"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="button-text">Book a Call</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
