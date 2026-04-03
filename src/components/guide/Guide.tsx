import { useRef } from "react";
import etable from "../../assets/images/etable.webp";

import "./main.css";
import "./mobile.css";
import Guides from "./Guides";
import Particle from "./particle";
import ScrollToTop from "../extra/ScrollToTop";
import { motion } from "framer-motion";
import { Reveal, RevealText } from "../animations/Reveal";




const GuideComponent = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={mainRef} className="guide-page-root">
      <ScrollToTop />

      {/* Condensed Hero Section */}
      <section className="guide-hero-section-condensed">
        <div className="hero-left">
          <motion.div
            className="etable-wrapper"
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for premium feel
            }}
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="etable-inner-wrapper"
            >
              <div className="particle-wrapper-large">
                <Particle />
              </div>
              <img
                src={etable}
                className="etable"
                alt="etable"
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="hero-right">
          <div className="guide-hero-content-condensed">
            <Reveal>
              <h1 className="guide-hero-title-small">
                <RevealText text="Guide Book" />
              </h1>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="guide-hero-subtitle-small">
                Find Rules, Information and Usage of Commands.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="guide-content-wrapper">
        <Guides />
      </div>
    </div>
  );
};

export default GuideComponent;
