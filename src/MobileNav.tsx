import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock scroll + close on ESC while menu is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLinkClick = (id: string) => {
    const section = document.querySelector(id.startsWith("#") ? id : `#${id}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Fixed top bar */}
      <div className="mobile-navbar">
        {/* Left: Alchemy Core Wrapper (always visible) */}
        <div
          className="alchemy-core-wrapper"
          onClick={() => handleLinkClick("#hero")}
        >
          <div className="pulse-rune-ring"></div>
          <div className="rune-ring rotate-left"></div>
          <div className="rune-ring rotate-right"></div>
          <div className="diamond-core"></div>
        </div>

        {/* Right: Hamburger / Close button */}
        <motion.div
          className="mobile-nav-icon"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <div className={`bar ${isOpen ? "open" : ""}`} />
          <div className={`bar ${isOpen ? "open" : ""}`} />
          <div className={`bar ${isOpen ? "open" : ""}`} />
        </motion.div>
      </div>

      {/* Menu + backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0,0,0,0.3)",
                zIndex: 9998,
              }}
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-down menu */}
            <motion.nav
              className="mobile-menu"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              role="dialog"
              aria-modal="true"
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
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
