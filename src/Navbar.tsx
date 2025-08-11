import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./styles.css";

const PAYMENT_URL = "https://www.alchaditya.com/payment";

const HOVER_ANIMS = [
  "million-animate-pulse",
  "million-animate-rotate",
  "million-animate-wiggle",
  "million-animate-pop",
  "million-animate-colorwave",
  "million-animate-shine",
];

function getRandomAnimation(lastAnim: string) {
  let rand;
  do {
    rand = HOVER_ANIMS[Math.floor(Math.random() * HOVER_ANIMS.length)];
  } while (rand === lastAnim);
  return rand;
}

const Navbar = () => {
  const standoutBtnRef = useRef<HTMLAnchorElement>(null);
  const [lastAnim, setLastAnim] = useState("");

  // Animation cycle every 6s and on hover/tap/focus
  useEffect(() => {
    let timeout: any;
    let interval: any;
    let currentAnim = lastAnim;
    const triggerAnimation = () => {
      const btn = standoutBtnRef.current;
      if (btn) {
        const anim = getRandomAnimation(currentAnim);
        btn.classList.remove(
          ...HOVER_ANIMS,
          "million-animate" // for legacy support
        );
        btn.classList.add(anim);
        currentAnim = anim;
        setLastAnim(anim);
        timeout = setTimeout(() => {
          btn.classList.remove(anim);
        }, 1600);
      }
    };

    interval = setInterval(triggerAnimation, 6000);

    const btn = standoutBtnRef.current;
    if (btn) {
      btn.addEventListener("mouseenter", triggerAnimation);
      btn.addEventListener("focus", triggerAnimation);
      btn.addEventListener("touchstart", triggerAnimation);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      if (btn) {
        btn.removeEventListener("mouseenter", triggerAnimation);
        btn.removeEventListener("focus", triggerAnimation);
        btn.removeEventListener("touchstart", triggerAnimation);
      }
    };
    // eslint-disable-next-line
  }, []);

  // 3D Tilt/Parallax for button and its text
  useEffect(() => {
    const btn = standoutBtnRef.current;
    if (!btn) return;
    let timeout: any;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const parallax = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = (y / rect.height - 0.5) * -24;
      const rotateY = (x / rect.width - 0.5) * 24;
      btn.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      const txt = btn.querySelector(".standout-btn-text") as HTMLElement;
      if (txt) {
        txt.style.transform = `translate3d(${(rotateY * 1.0).toFixed(2)}px, ${(
          rotateX * 1.0
        ).toFixed(2)}px, 0)`;
      }
    };
    const reset = () => {
      btn.style.transform = "";
      const txt = btn.querySelector(".standout-btn-text") as HTMLElement;
      if (txt) txt.style.transform = "";
    };

    btn.addEventListener("mousemove", parallax);
    btn.addEventListener("mouseleave", () => {
      timeout = setTimeout(reset, 150);
    });

    return () => {
      btn.removeEventListener("mousemove", parallax);
      btn.removeEventListener("mouseleave", reset);
      clearTimeout(timeout);
    };
  }, []);

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      className="navbar-container"
      initial={{ y: -80, x: "-50%", opacity: 0 }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{
        duration: 0.6,
        delay: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{
        position: "fixed",
        left: "50%",
        zIndex: 1000,
      }}
    >
      <motion.div
        className="navbar-logo alchemy-core-wrapper"
        whileHover={{ scale: 1.13, rotate: -6 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
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

      {/* Animated STAND OUT NOW button */}
      <a
        href={PAYMENT_URL}
        target="_blank"
        rel="noopener noreferrer"
        ref={standoutBtnRef}
        className="primary-button shine-sweep standout-pay-btn"
        id="standout-now-btn"
      >
        <span className="million-glass" aria-hidden="true"></span>
        <span className="million-shine" aria-hidden="true"></span>
        <span className="standout-btn-text">Stand Out Now</span>
        <span className="pay-bubbles" aria-hidden="true">
          <span className="bubble bubble-1"></span>
          <span className="bubble bubble-2"></span>
          <span className="bubble bubble-3"></span>
        </span>
        <span className="confetti-animation" aria-hidden="true">
          <span className="c1"></span>
          <span className="c2"></span>
          <span className="c3"></span>
          <span className="c4"></span>
          <span className="c5"></span>
          <span className="c6"></span>
        </span>
      </a>
    </motion.div>
  );
};

export default Navbar;
