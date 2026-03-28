import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="custom-cursor"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
        animate={{
          scale: isHovered ? 2.5 : 1,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.3)',
          border: isHovered ? '1px solid rgba(255, 255, 255, 0.5)' : '1px solid rgba(255, 255, 255, 0.2)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
      <motion.div
        className="custom-cursor-dot"
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
        animate={{
          scale: isHovered ? 0 : 1,
        }}
      />
    </>
  );
};

export default CustomCursor;
