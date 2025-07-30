import React, { useRef } from "react";
import { motion } from "framer-motion";

const ServiceCard = ({
  icon,
  title,
  points,
}: {
  icon: string;
  title: string;
  points: string[];
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;

    card.style.setProperty("--rotateX", `${rotateY}deg`);
    card.style.setProperty("--rotateY", `${rotateX}deg`);
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (card) {
      card.style.setProperty("--rotateX", `0deg`);
      card.style.setProperty("--rotateY", `0deg`);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="service-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <ul>
        {points.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>
    </motion.div>
  );
};
const WhatIDoSection = () => {
  return (
    <section>
      <motion.section
        className="what-i-do-section glass-panel stroke-animated"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
       <h2 className="section-heading">What I Do</h2>

<motion.p
  className="what-i-do-description full-hover-white"
  whileHover={{ color: "#ffffff" }}
>
  I specialize in editing fast-paced, scroll-stopping short-form content tailored to your audience, voice, and goals.
</motion.p>


        <div className="service-grid">
          <ServiceCard
            icon="🧠"
            title="Voice-Matched Delivery"
            points={[
              "Edits that match your tone",
              "Focus on authenticity",
              "Custom subtitling & flow",
            ]}
          />
          <ServiceCard
            icon="⚡"
            title="Scroll-Stopping Hooks"
            points={[
              "Immediate attention-grab",
              "Retention-first cuts",
              "Strong first 3 seconds",
            ]}
          />
          <ServiceCard
            icon="📊"
            title="Audience-Aligned"
            points={[
              "Edits based on your niche",
              "Strategy-backed storytelling",
              "Optimization for conversion",
            ]}
          />
        </div>

        <div className="stroke-border-animation" />
      </motion.section>
    </section>
  );
};

export default WhatIDoSection;
