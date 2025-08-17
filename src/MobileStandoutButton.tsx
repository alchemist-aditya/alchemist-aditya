import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiInfo } from "@react-icons/all-files/fi/FiInfo";
import "./styles.css";

const PAYMENT_URL = "https://www.alchaditya.com/payment";

// Text for the info tooltip
const tooltipText = (
  <>
    <strong>Ready to stand out?</strong>
    <br />
    Secure your spot! Feature your content at the TOP for maximum reach—or go to
    the payment page to get started.
  </>
);

const ANIMATE_INTERVAL = 6000; // 6 seconds

const MobileStandoutButton: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [expanded, setExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [shine, setShine] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  // === 1. Responsive: Is mobile?
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // === 2. Hide tooltip if click outside
  useEffect(() => {
    if (!showTooltip) return;
    function handler(e: MouseEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setShowTooltip(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showTooltip]);

  // === 3. Animate FAB every 6 seconds regardless of expanded
  useEffect(() => {
    const interval = window.setInterval(() => {
      setShine(true);
      setTimeout(() => setShine(false), 1200); // remove animate class after animation
    }, ANIMATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  if (!isMobile) return null;

  return (
    <motion.div
      className="msb-fab-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Standout CTA and Info */}
      <AnimatePresence>
        {expanded && (
          <>
            {/* Info Icon */}
            <motion.button
              key="info-icon"
              className="msb-info-btn"
              aria-label="More info"
              type="button"
              initial={{ opacity: 0, y: 16, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.8 }}
              transition={{ duration: 0.23, delay: 0.01 }}
              onClick={() => setShowTooltip((v) => !v)}
            >
              <FiInfo />
            </motion.button>

            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  className="msb-fab-tooltip"
                  ref={tooltipRef}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.96 }}
                  transition={{ duration: 0.24 }}
                  style={{
                    position: "absolute",
                    bottom: 84,
                    right: 0,
                    minWidth: 210,
                    maxWidth: 260,
                    zIndex: 200001,
                  }}
                >
                  {tooltipText}
                  <button
                    aria-label="Close info"
                    onClick={() => setShowTooltip(false)}
                    style={{
                      position: "absolute",
                      top: 7,
                      right: 7,
                      border: "none",
                      background: "none",
                      color: "#fff",
                      fontSize: 17,
                      opacity: 0.6,
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stand Out Now pill button */}
            <motion.a
              key="fabCta"
              href={PAYMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`msb-fab-cta${shine ? " animate" : ""}`}
              initial={{ scale: 0.8, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 10 }}
              transition={{ duration: 0.33 }}
              tabIndex={showTooltip ? -1 : 0}
              style={{ pointerEvents: showTooltip ? "none" : "auto" }}
              onClick={() => setExpanded(false)}
              onAnimationEnd={() => setShine(false)}
            >
              <span
                role="img"
                aria-label="star"
                className={`msb-shine-star${shine ? " animate" : ""}`}
                style={{ marginRight: 7 }}
              >
                ⭐
              </span>
              <span className={`msb-shine-text${shine ? " animate" : ""}`}>
                Stand Out Now
              </span>
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* FAB launcher */}
      <motion.button
        className={`msb-fab-main${shine ? " animate" : ""}`}
        aria-label={expanded ? "Close Standout" : "Open Standout"}
        onClick={() => {
          setExpanded((v) => !v);
          setShowTooltip(false);
        }}
        initial={false}
        animate={{
          scale: expanded ? 0.92 : 1,
        }}
        transition={{ type: "spring", stiffness: 340, damping: 30 }}
      >
        <span className="shine-sweep" />
        <span
          role="img"
          aria-label="star"
          className={`msb-fab-star${shine ? " animate" : ""}`}
        >
          ⭐
        </span>
      </motion.button>
    </motion.div>
  );
};

export default MobileStandoutButton;
