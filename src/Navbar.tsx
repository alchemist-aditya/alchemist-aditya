import React from "react";
import { motion } from "framer-motion";
import "./styles.css";

const Navbar = () => {
  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
<motion.div
  className="navbar-container"
  initial={{ y: -80, opacity: 0 }}
  animate={{ y: 0, opacity: 1, x: "-50%" }} // ← Include translateX!
  transition={{
    duration: 0.6,
    delay: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94],
  }}
  style={{
    position: "fixed",
    left: "50%",
  }}
>
      <motion.div
        className="navbar-logo alchemy-core-wrapper"
        whileHover={{ scale: 1.3, rotate: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        onClick={() => handleScroll("hero")}
      >
        <div className="pulse-rune-ring"></div>
        <div className="rune-ring rotate-left"></div>
        <div className="rune-ring rotate-right"></div>
        <div className="diamond-core"></div>
      </motion.div>

      <ul className="navbar-links">
        <li onClick={() => handleScroll("About-Me")}>About Me</li>
        <li onClick={() => handleScroll("what-i-do-section")}>What I Do</li>
        <li onClick={() => handleScroll("faq-section")}>FAQs</li>
      </ul>

      <button
        className="primary-button shine-sweep"
        onClick={() => handleScroll("calendly-section")}
      >
        Book a call
      </button>
    </motion.div>
  );
};

export default Navbar;
