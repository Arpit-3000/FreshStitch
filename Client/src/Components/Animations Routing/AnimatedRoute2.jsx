import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { x: '100vw', opacity: 0 },
  in: { x: 0, opacity: 1 },
  out: { x: '-100vw', opacity: 1 }
};

const pageTransition = {
  duration: 0.5
};

const AnimatedRoute2 = ({ children }) => {
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

export default AnimatedRoute2;
