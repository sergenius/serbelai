import React from 'react';
import { Brain } from 'lucide-react';
import { motion } from 'framer-motion';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2 relative">
      <motion.div
        className="absolute -inset-1 bg-black opacity-10 rounded-lg"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 45, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="absolute -inset-2 bg-black opacity-5 rounded-lg"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -45, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <Brain className="w-8 h-8 text-primary relative" />
      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent relative">
        serbelAI
      </span>
    </div>
  );
};