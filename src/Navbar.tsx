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
    <div className="navbar-container">
      <motion.div
        className="navbar-logo alchemy-core-wrapper"
        whileHover={{ scale: 1.3, rotate: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        onClick={() => handleScroll("hero")} // ✅ Fixed: points to the actual ID
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
    </div>
  );
};

export default Navbar;
