"use client";
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-white z-50"
    >
      {/* Simple Rotating Circle */}
      <motion.div
        animate={{ rotate: 360 }} // Continuous rotation
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
        
        className="w-12 h-12 border-4 border-black border-t-transparent rounded-full"
      ></motion.div>
    </motion.div>
  );
};

export default Loading;