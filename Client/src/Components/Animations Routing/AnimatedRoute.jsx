import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { x: '-100vw', opacity: 0 },  // Start from the left
  in: { x: 0, opacity: 1 },               // Move to the center
  out: { x: '100vw', opacity: 1 }          // Exit to the right
};

const pageTransition = {
  duration: 0.5
};

const AnimatedRoute = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedRoute;
