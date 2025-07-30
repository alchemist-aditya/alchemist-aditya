import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { motion } from "framer-motion";
import "./styles.css";
import VideoPortfolio from "./videoportfolio";
import MobileNav from "./MobileNav";
import Navbar from "./Navbar";
import CalendlySection from "./CalendlySection";
import HeroSection from "./herosection";
import WhatIDoSection from "./WhatIDoSection";

gsap.registerPlugin(ScrollTrigger);

// ======================
// Anim Section Wrapper
// ======================

const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Section = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={fadeInVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className="fade-in-section"
  >
    {children}
  </motion.div>
);

const App = () => {
  const dotRef = useRef<HTMLDivElement>(null);

 const handleBookClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop) {
      e.preventDefault();
      const section = document.getElementById("calendly-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.open("https://calendly.com/narayanaditya/1hour", "_blank");
    }
  };

  return (
    <motion.button onClick={handleBookClick}>
      Book a Free Call
    </motion.button>
  );
};


  useEffect(() => {
    // Initialize Lenis scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Custom cursor animation
    let mouseX = 0,
      mouseY = 0;
    let dotX = 0,
      dotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      dotX += (mouseX - dotX) * 0.28;
      dotY += (mouseY - dotY) * 0.28;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      lenis.destroy();
    };
  }, []);

  // ✅ Tilt interaction for .about-me panel
  useEffect(() => {
    const panel = document.querySelector(".about-me") as HTMLElement;
    if (!panel) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { width, height, left, top } = panel.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / width;
      const y = (e.clientY - top - height / 2) / height;
      panel.style.transform = `rotateX(${y * -5}deg) rotateY(${
        x * 5
      }deg) scale(1.01)`;
    };

    const resetTransform = () => {
      panel.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    };

    panel.addEventListener("mousemove", handleMouseMove);
    panel.addEventListener("mouseleave", resetTransform);

    return () => {
      panel.removeEventListener("mousemove", handleMouseMove);
      panel.removeEventListener("mouseleave", resetTransform);
    };
  }, []);

  // ✅ Scroll-triggered bullet point animation for glass panels
  useEffect(() => {
    const panels = gsap.utils.toArray(".glass-panel ul li") as HTMLElement[];
    if (panels.length === 0) return;

    gsap.set(panels, { opacity: 0, y: 20 });

    panels.forEach((el, i) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: i * 0.05,
        ease: "power2.out",
      });
    });
  }, []);

  // ✅ Subtle Parallax & Magnetic Hover for Glass Panels
  useEffect(() => {
    const panels = document.querySelectorAll(
      ".glass-panel"
    ) as NodeListOf<HTMLElement>;

    panels.forEach((panel) => {
      let bounds = panel.getBoundingClientRect();

      const handleMouseMove = (e: MouseEvent) => {
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;

        const centerX = bounds.width / 2;
        const centerY = bounds.height / 2;

        const moveX = (x - centerX) * 0.01; // 🔽 toned down from 0.05
        const moveY = (y - centerY) * 0.01;

        panel.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.005)`; // 🔽 scale reduced
      };

      const reset = () => {
        panel.style.transform = "translate(0px, 0px) scale(1)";
      };

      panel.addEventListener("mousemove", handleMouseMove);
      panel.addEventListener("mouseleave", reset);

      // ✅ Fixes stale bounds when window is resized
      const handleResize = () => {
        bounds = panel.getBoundingClientRect();
      };
      window.addEventListener("resize", handleResize);

      return () => {
        panel.removeEventListener("mousemove", handleMouseMove);
        panel.removeEventListener("mouseleave", reset);
        window.removeEventListener("resize", handleResize);
      };
    });
  }, []);

  // ✅ Emoji / Tick bounce on scroll
  useEffect(() => {
    const listItems = gsap.utils.toArray(".glass-panel ul li") as HTMLElement[];

    listItems.forEach((li, i) => {
      const emojiSpan = li.querySelector("li") || li;

      gsap.fromTo(
        li,
        { scale: 0.85 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: li,
            start: "top 90%",
          },
          duration: 0.4,
          ease: "back.out(2)",
          delay: i * 0.05,
        }
      );
    });
  }, []);

  // ✅ glowAurora/

  useEffect(() => {
    const canvas = document.getElementById("glowAurora") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    let colors = ["#ff00cc", "#00e0ff", "#aaff00", "#ffcc00", "#aa00ff"];
    let blobs = Array.from({ length: 12 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      dx: (Math.random() - 0.5) * 1.5,
      dy: (Math.random() - 0.5) * 1.5,
      r: Math.random() * 80 + 80,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let mouse = { x: w / 2, y: h / 2 };
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    function draw() {
      if (!ctx) return;

      ctx.clearRect(0, 0, w, h);

      blobs.forEach((b) => {
        b.x += b.dx + (mouse.x - w / 2) * 0.0009;
        b.y += b.dy + (mouse.y - h / 2) * 0.0009;

        if (b.x < -b.r || b.x > w + b.r) b.dx *= -1;
        if (b.y < -b.r || b.y > h + b.r) b.dy *= -1;

        let gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        gradient.addColorStop(0, `${b.color}88`); // more opacity
        gradient.addColorStop(1, `${b.color}00`);

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });
  }, []);

  return (
    <motion.div
      className="app-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className="cursor-dot" ref={dotRef} />
      <canvas id="glowAurora" className="aurora-canvas"></canvas>
      <div className="desktop-nav">
        <Navbar />
      </div>

      <MobileNav />

      {/* HERO SECTION */}
      <section id="hero">
        <Section>
          <HeroSection />
        </Section>
      </section>

      <section id="what-i-do-section">
        {/* WHAT I DO */}
        <Section>
          <WhatIDoSection />
        </Section>
      </section>

      <Section>
        <VideoPortfolio />
      </Section>

      {/* WHY WORK WITH ME */}
      <Section>
        <motion.section
          className="why-glass-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h2 className="section-title">Why Work With Me?</h2>

          <div className="glass-panels">
            <motion.div
              className="glass-panel plain tilt-card"
              whileHover={{ rotateX: 5, rotateY: -5, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
            >
              <h3>Generic Editors / Agencies</h3>
              <ul>
                <li>
                  <span className="emoji-bounce">❌</span> Juggle multiple
                  clients
                </li>
                <li>
                  <span className="emoji-bounce">❌</span> Slow communication
                </li>
                <li>
                  <span className="emoji-bounce">❌</span> Limited revisions
                </li>
                <li>
                  <span className="emoji-bounce">❌</span> Surface-level edits
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="glass-panel gradient tilt-card glow-on-hover"
              whileHover={{ rotateX: 5, rotateY: -5, scale: 1.01 }}
              initial={{ scale: 0.96, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
            >
              <h3>Working With Me</h3>
              <ul>
                <li>
                  <span className="emoji-bounce">✅</span> Full focus — one
                  project at a time
                </li>
                <li>
                  <span className="emoji-bounce">✅</span> Personal
                  communication with me
                </li>
                <li>
                  <span className="emoji-bounce">✅</span> Unlimited revisions
                </li>
                <li>
                  <span className="emoji-bounce">✅</span> Platform-optimized,
                  automation-aware workflow
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.section>
      </Section>

      {/* ABOUT ME */}
      <section id="About-Me">
        <Section>
          <motion.section
            className="about-me"
            whileHover={{ scale: 1.02, rotateX: 4, rotateY: -4 }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              About Me
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              More than a video editor, I design solutions that make content
              creation faster, smarter, and more efficient. From short-form
              edits to custom tools in After Effects, I focus on fixing real
              bottlenecks — whether it's saving time or improving how content
              hits on social.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              One of my favorites is a custom{" "}
              <span className="script-highlight">Script UI Panel</span> in After
              Effects that automates proximity-based animation — cutting
              repetitive work and unlocking faster creative flow.
            </motion.p>

            <motion.p
              className="footer-signature"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              — Aditya Pandey
            </motion.p>
          </motion.section>
        </Section>
      </section>

      <section id="calendly-section">
      <Section>
        <CalendlySection />
      </Section>
        </section>

      {/* FAQ SECTION */}
      <section id="faq-section">
        <Section>
          <section className="faq">
            <h2>Frequently Asked Questions</h2>
            {[
              "How fast will I receive my videos?",
              "How do I request edits?",
              "How does the process work?",
              "What if I’m not satisfied?",
            ].map((q, i) => (
              <details key={i} className="faq-item tilt-faq">
                <summary>
                  <span className="faq-icon">+</span> {q}
                </summary>
                <p>
                  {
                    [
                      "Videos are delivered in 2–3 business days on average.",
                      "You’ll receive a link or use email to leave feedback.",
                      "We start with a short call. You send your footage. I do the rest.",
                      "I’ll revise the videos until you’re happy — 100% guaranteed.",
                    ][i]
                  }
                </p>
              </details>
            ))}
          </section>
        </Section>
      </section>
      {/* FOOTER */}
      <Section>
        <motion.footer
          className="compact-footer"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="compact-footer-heading">
            Let’s bring your content to life.
          </h2>

  <motion.button
  className="primary-button shine-sweep"
  whileHover={{ scale: 1.08 }}
  whileTap={{ scale: 0.95 }}
  onClick={handleBookClick}
>
  Book a Free Call
</motion.button>
          <div className="compact-footer-grid">
            <div className="footer-item">
              <span className="footer-label">🔗 Connect</span>
              <motion.a
                href="https://www.linkedin.com/in/alchemist-aditya/"
                target="_blank"
                rel="noopener noreferrer"
                className="compact-link"
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                LinkedIn Profile
              </motion.a>
            </div>

            <div className="footer-item">
              <span className="footer-label">💬 Have a question?</span>
              <motion.a
                href="mailto:narayanaditya7804@gmail.com"
                className="compact-link"
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Email me
              </motion.a>
            </div>
          </div>

          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Aditya Pandey. All rights
            reserved.
          </p>
        </motion.footer>
      </Section>
    </motion.div>
  );
};

export default App;
