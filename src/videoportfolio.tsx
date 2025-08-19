"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";

const videoData = [
  {
    url: "https://www.youtube.com/embed/MWkHLk0dZ04",
    thumbnail: "/thumbnail/video1.png",
  },
  {
    url: "https://www.youtube.com/embed/6kpWiaNMStA",
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
  const [carouselIndex, setCarouselIndex] = useState(0); // snapped index (arrows)
  const [centerIndex, setCenterIndex] = useState(0); // visual center (during scroll)
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const prevSnappedIndex = useRef<number>(0);

  // responsive check
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  useEffect(() => {
    const check = () => setIsMobileOrTablet(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ---- helper: compute nearest index + distance + width ----
  const computeNearest = useCallback(() => {
    const track = carouselRef.current;
    if (!track || track.children.length === 0)
      return { nearest: 0, dist: 0, width: 1 };

    const trackRect = track.getBoundingClientRect();
    const trackCenterX = trackRect.left + trackRect.width / 2;

    let nearest = 0;
    let nearestDist = Infinity;
    let elWidth = 0;

    for (let i = 0; i < track.children.length; i++) {
      const el = track.children[i] as HTMLElement;
      const r = el.getBoundingClientRect();
      const elCenterX = r.left + r.width / 2;
      const d = Math.abs(elCenterX - trackCenterX);
      if (d < nearestDist) {
        nearestDist = d;
        nearest = i;
        elWidth = r.width;
      }
    }

    return { nearest, nearestDist, width: elWidth || 1 };
  }, []);

  // ---- goToIndex (clamped) ----
  // add this ref
  const ignoreSnap = useRef(false);

  // ---- goToIndex (clamped) ----
  const goToIndex = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(idx, videoData.length - 1));
      const track = carouselRef.current;
      if (!track) {
        setCarouselIndex(clamped);
        setCenterIndex(clamped);
        prevSnappedIndex.current = clamped;
        return;
      }
      const el = track.children[clamped] as HTMLElement | undefined;
      if (el) {
        ignoreSnap.current = true; // 🚨 tell snapper to ignore next scroll
        el.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
        setTimeout(() => {
          ignoreSnap.current = false; // ✅ re-enable snapping after animation
        }, 400); // adjust to match smooth scroll duration
      }
      setCarouselIndex(clamped);
      setCenterIndex(clamped);
      prevSnappedIndex.current = clamped;
    },
    [videoData.length]
  );

  // arrow handlers
  const handlePrev = () => goToIndex(Math.max(carouselIndex - 1, 0));
  const handleNext = () =>
    goToIndex(Math.min(carouselIndex + 1, videoData.length - 1));

  const handleKeyboard = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  const handleClickPlay = (index: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // prevent parent centering
    setActiveIndex(index);
    // ensure carousel centers on mobile so video is visible
    setTimeout(() => {
      if (isMobileOrTablet) goToIndex(index);
    }, 160);
    const el = document.activeElement;
    if (el instanceof HTMLElement) el.blur();
  };

  // ==== SWIPE + SNAP logic ====
  const scrollEndTimer = useRef<number | null>(null);

  const snapThresholdFactor = 0.35; // element width * factor to decide if we switch

  const handleSnap = useCallback(() => {
    const { nearest, nearestDist = 0, width } = computeNearest(); // default to 0
    const prev = prevSnappedIndex.current ?? carouselIndex;
    const threshold = width * snapThresholdFactor;

    if (nearest === prev) {
      goToIndex(nearest);
    } else if (nearestDist > threshold) {
      goToIndex(nearest);
    } else {
      goToIndex(prev);
    }
  }, [computeNearest, goToIndex, carouselIndex]);

  const onTrackScroll = useCallback(() => {
    if (ignoreSnap.current) return;

    // clear any previous timer
    if (scrollEndTimer.current !== null) {
      window.clearTimeout(scrollEndTimer.current);
    }

    const { nearest } = computeNearest();
    setCenterIndex(nearest);

    // ✅ safe assignment (no casting hacks needed)
    scrollEndTimer.current = window.setTimeout(() => {
      handleSnap();
    }, 90);
  }, [computeNearest, handleSnap]);

  useEffect(() => {
    const track = carouselRef.current;
    if (!track) return;
    const handler = () => onTrackScroll();
    track.addEventListener("scroll", handler, { passive: true });
    return () => {
      track.removeEventListener("scroll", handler as any);
      if (scrollEndTimer.current) window.clearTimeout(scrollEndTimer.current);
    };
  }, [onTrackScroll]);

  // init centerIndex on mount for mobile
  useEffect(() => {
    if (!isMobileOrTablet) return;
    const computed = computeNearest();
    setCenterIndex(computed.nearest);
    setCarouselIndex(computed.nearest);
    prevSnappedIndex.current = computed.nearest;
  }, [isMobileOrTablet, computeNearest]);

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 video-section-title">
        Video Work
      </h2>

      <div
        className={`${
          isMobileOrTablet ? "mobile-tablet-mode" : "desktop-mode"
        }`}
      >
        {/* DESKTOP & LAPTOP GRID (unchanged) */}
        {!isMobileOrTablet && (
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
                      onClick={() => handleClickPlay(i)}
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
        )}
        {/* MOBILE/TABLET: improved carousel */}
        {isMobileOrTablet && (
          <div className="video-carousel-container netflix-canvas">
            <div className="carousel-controls netflix-carousel-controls">
              <button
                className="carousel-arrow left"
                onClick={() => handlePrev()}
                disabled={carouselIndex === 0}
                aria-label="Previous videos"
                tabIndex={0}
              >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <circle
                    cx="18"
                    cy="18"
                    r="18"
                    fill="#181231"
                    opacity="0.19"
                  />
                  <path
                    d="M19.92 12l-4 6 4 6"
                    stroke="#fff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                className="carousel-arrow right"
                onClick={() => handleNext()}
                disabled={carouselIndex >= videoData.length - 1}
                aria-label="Next videos"
                tabIndex={0}
              >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <circle
                    cx="18"
                    cy="18"
                    r="18"
                    fill="#181231"
                    opacity="0.19"
                  />
                  <path
                    d="M16.08 12l4 6-4 6"
                    stroke="#fff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div
              className="carousel-track netflix-carousel-track"
              ref={carouselRef}
              tabIndex={0}
              onKeyDown={handleKeyboard}
            >
              {videoData.map((video, i) => {
                const offset = i - centerIndex;
                const isCenter = offset === 0;
                const isNear = Math.abs(offset) === 1;
                const isPrev = offset === -1;
                const isNext = offset === 1;

                return (
                  <motion.div
                    key={i}
                    className={`carousel-slide netflix-carousel-slide ${
                      activeIndex === i ? "is-active" : ""
                    } ${
                      isCenter ? "is-center" : isNear ? "is-near" : "is-far"
                    } ${isPrev ? "is-prev" : isNext ? "is-next" : ""}`}
                    initial={{ opacity: 0, y: 28, scale: 0.95 }}
                    animate={{
                      opacity: 1,
                      y: isCenter ? -12 : isNear ? -6 : 0,
                      scale: isCenter ? 1.06 : isNear ? 1.0 : 0.95,
                      zIndex: isCenter ? 6 : isNear ? 5 : 1,
                    }}
                    transition={{
                      opacity: { duration: 0.28, delay: i * 0.06 },
                      y: { type: "spring", stiffness: 170, damping: 17 },
                      scale: { type: "spring", stiffness: 220, damping: 14 },
                    }}
                    whileHover={{
                      scale: isCenter ? 1.07 : 1.03,
                      zIndex: 10,
                      boxShadow: "0 0 28px 0 rgba(200,83,255,0.12)",
                    }}
                    onClick={() => {
                      if (!isCenter) {
                        goToIndex(i);
                      }
                    }}
                  >
                    <div
                      className="video-item netflix-carousel-card"
                      style={{ cursor: activeIndex !== i ? "pointer" : "auto" }}
                    >
                      {activeIndex === i ? (
                        <AnimatePresence>
                          <motion.div
                            className="aspect-video"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{
                              type: "spring",
                              stiffness: 120,
                              damping: 13,
                              duration: 0.22,
                            }}
                          >
                            <iframe
                              src={`${video.url}?autoplay=1`}
                              title={`Video ${i + 1}`}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full rounded-xl"
                            />
                          </motion.div>
                        </AnimatePresence>
                      ) : (
                        <motion.div
                          className="video-thumbnail group aspect-video"
                          onClick={(e) => handleClickPlay(i, e)}
                          tabIndex={0}
                          role="button"
                          aria-label={`Play video ${i + 1}`}
                          initial={{ scale: 1 }}
                          whileTap={{ scale: 0.96 }}
                          whileHover={{ scale: 1.025 }}
                        >
                          <img
                            src={video.thumbnail}
                            alt={`Video ${i + 1}`}
                            loading="eager"
                            className="thumbnail-image w-full h-full object-cover rounded-xl"
                          />

                          <motion.img
                            src="/thumbnail/youtube-logo.png"
                            alt="Play"
                            className={`youtube-logo absolute inset-0 m-auto grayscale ${
                              isCenter ? "center-active" : ""
                            }`}
                            animate={isCenter ? { y: [-2, 2, -2] } : { y: 0 }}
                            transition={
                              isCenter
                                ? {
                                    repeat: Infinity,
                                    duration: 3.2,
                                    ease: "easeInOut",
                                  }
                                : { duration: 0.2 }
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClickPlay(
                                i,
                                e as unknown as React.MouseEvent
                              );
                            }}
                          />

                          <span className="netflix-shine" aria-hidden />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* ✅ Dot Progress Bar */}
            <div className="dots-container">
              {videoData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`dot ${centerIndex === index ? "active" : ""}`}
                  aria-label={`Go to video ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
