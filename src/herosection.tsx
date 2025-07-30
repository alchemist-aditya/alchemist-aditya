"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import SplitType from "split-type";
import "./styles.css";

const phrases = [
  "Creators and Coaches",
  "Storytelling that Converts",
  "Edits Built for Attention",
];

export default function HeroPortfolio() {
  const bgRef = useRef<HTMLDivElement>(null);
  const morphTextRef = useRef<HTMLSpanElement>(null);
  const morphIndex = useRef(0);
  const calendlyRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const bg = bgRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (bg) {
        const x = clientX / 40;
        const y = clientY / 40;
        bg.style.backgroundPosition = `${x}px ${y}px`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      morphIndex.current = (morphIndex.current + 1) % phrases.length;
      if (morphTextRef.current) {
        morphTextRef.current.textContent = phrases[morphIndex.current];
      }
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const split = new SplitType("h1", { types: "words" });
    gsap.from(split.words, {
      y: 60,
      opacity: 0,
      stagger: 0.08,
      duration: 1.2,
      ease: "power4.out",
    });
  }, []);

  const handleBookClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isDesktop = window.innerWidth >= 1024; // adjust breakpoint if needed
    if (isDesktop) {
      e.preventDefault();
      const target = document.getElementById("calendly-section");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
    // else let default behavior (Calendly link) happen
  };

  return (
    <main>
      <div ref={bgRef} className="netlify-dot-grid"></div>

      <section className="hero-section">
        <header className="hero">
          <h1>
            <motion.div
              className="headline-line tilt-shortform"
              whileHover={{ scale: 1.03, y: -2 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
            >
              <span>Short-Form Video Editing</span>
            </motion.div>

            <br />
            <span className="headline-line no-tilt static-text">for </span>

            <motion.div
              className="headline-line tilt-creators"
              whileHover={{ scale: 1.05, y: -1 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
            >
              <span className="creators-highlight">Creators and Coaches</span>
            </motion.div>
          </h1>

          <motion.p
            className="subheadline platform-subline"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <motion.span
              className="hover-highlight reels"
              whileHover={{ scale: 1.06, y: -2 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              Reels
            </motion.span>{" "}
            •{" "}
            <motion.span
              className="hover-highlight tiktok"
              whileHover={{ scale: 1.06, y: -2 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              TikTok
            </motion.span>{" "}
            •{" "}
            <motion.span
              className="hover-highlight shorts"
              whileHover={{ scale: 1.06, y: -2 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              YouTube Shorts
            </motion.span>{" "}
            •{" "}
            <motion.span
              className="hover-highlight linkedin"
              whileHover={{ scale: 1.06, y: -2 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              LinkedIn
            </motion.span>
          </motion.p>

          <motion.p
            className="subheadline main-subline"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Tired of{" "}
            <motion.span
              className="hover-accent cookie"
              whileHover={{ scale: 1.03, y: -2 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              cookie-cutter content
            </motion.span>
            ? I deliver{" "}
            <motion.span
              className="hover-accent sleek"
              whileHover={{ scale: 1.03, y: -2 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              sleek short-form edits
            </motion.span>{" "}
            that{" "}
            <motion.span
              className="hover-accent voice"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              match your voice
            </motion.span>
          </motion.p>

          <motion.button
            className="primary-button shine-sweep"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const isDesktop = window.innerWidth >= 1024;
              if (isDesktop) {
                const section = document.getElementById("calendly-section");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              } else {
                window.open(
                  "https://calendly.com/narayanaditya/1hour",
                  "_blank"
                );
              }
            }}
          >
            Book a Free Call
          </motion.button>
        </header>
      </section>
    </main>
  );
}
