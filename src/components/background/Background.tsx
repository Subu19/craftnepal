import { useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useMousePosition } from "../../hooks/useMousePosition";
import "./Background.css";

const Background = () => {
  const mouse = useMousePosition();
  const { scrollYProgress } = useScroll();
  
  const mouseXValue = useMotionValue(0);
  const mouseYValue = useMotionValue(0);
  
  useEffect(() => {
    mouseXValue.set(mouse.x);
    mouseYValue.set(mouse.y);
  }, [mouse.x, mouse.y, mouseXValue, mouseYValue]);

  const mouseX = useTransform(
    mouseXValue,
    [0, typeof window !== "undefined" ? window.innerWidth : 1920],
    [-40, 40]
  );
  const mouseY = useTransform(
    mouseYValue,
    [0, typeof window !== "undefined" ? window.innerHeight : 1080],
    [-40, 40]
  );

  const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="app-background" aria-hidden="true">
      <motion.div 
        className="bg-perspective"
        style={{
          x: mouseX,
          y: mouseY,
          rotateZ: scrollRotate,
        }}
      >
        <div className="prism-mesh">
          <div className="mesh-gradient-1"></div>
          <div className="mesh-gradient-2"></div>
          <div className="mesh-gradient-3"></div>
        </div>

        <div className="prism-layer layer-1">
          <div className="beam beam-1"></div>
          <div className="beam beam-2"></div>
        </div>
        
        <div className="prism-layer layer-2">
          <div className="beam beam-3"></div>
          <div className="beam beam-4"></div>
        </div>
        
        <div className="prism-layer layer-3">
          <div className="beam beam-5"></div>
          <motion.div 
            className="shimmer-mesh"
            style={{ y: scrollY }}
          ></motion.div>
        </div>
      </motion.div>

      <div className="texture-noise"></div>


      <div className="vignette-overlay"></div>
    </div>
  );
};

export default Background;

