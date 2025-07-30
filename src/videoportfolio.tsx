"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import "./styles.css";

const videoData = [
  {
    url: "https://www.youtube.com/embed/MWkHLk0dZ04",
    thumbnail: "/thumbnail/video1.png",
  },
  {
    url: "https://www.youtube.com/embed/UvqrnVvD_GA",
    thumbnail: "/thumbnail/video2.png",
  },
  {
    url: "https://www.youtube.com/embed/oG9h4XGZvwU",
    thumbnail: "/thumbnail/video3.png",
  },
  {
    url: "https://www.youtube.com/embed/rzgiqUYHaYY",
    thumbnail: "/thumbnail/video4.png",
  },
  {
    url: "https://www.youtube.com/embed/UZ1rTFGbmpY",
    thumbnail: "/thumbnail/video5.png",
  },
  {
    url: "https://www.youtube.com/embed/NSc9RY0qmas",
    thumbnail: "/thumbnail/video6.png",
  },
];

export default function VideoPortfolio() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    const activeEl = document.activeElement;
    if (activeEl instanceof HTMLElement) {
      activeEl.blur(); // ✅ Now TypeScript knows it's safe
    }
  };

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Video Work</h2>
      <div className="video-panel">
        <div className="video-grid">
          {videoData.map((video, i) => (
            <div key={i} className="video-item">
              {activeIndex === i ? (
                <div className="aspect-video">
                  <iframe
                    src={`${video.url}?autoplay=1`}
                    title={`Video ${i + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-xl"
                  />
                </div>
              ) : (
                <motion.div
                  className="video-thumbnail cursor-pointer relative group aspect-video"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  onClick={() => handleClick(i)}
                >
                  <img
                    src={video.thumbnail}
                    alt={`Video ${i + 1}`}
                    loading="eager"
                    className="thumbnail-image w-full h-full object-cover rounded-xl"
                  />
                  <img
                    src="/thumbnail/youtube-logo.png"
                    alt="Play"
                    className="youtube-logo absolute inset-0 m-auto grayscale group-hover:grayscale-0 group-hover:scale-110 transition duration-300 w-12 h-12 md:w-10 md:h-10 sm:w-8 sm:h-8"
                  />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
