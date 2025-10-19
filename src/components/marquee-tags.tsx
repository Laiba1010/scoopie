'use client';
import { motion } from 'framer-motion';

const TAGS = [
  '100% Fresh',
  'Natural Ingredients',
  'No Artificial Flavor',
  'Gluten-Free',
  'Low Sugar',
  'Refreshing Taste',
  'Customer Favorite',
  'Made with Love',
  'Limited Edition',
];

export default function MarqueeTags() {
  return (
    <div className="relative overflow-hidden w-full bg-transparent pb-24">
      <motion.div
        className="flex gap-2"
        animate={{ x: ['0%', '-40%'] }} // 👈 move only half for seamless loop
        transition={{
          repeat: Infinity,
          duration: 20, // slow down for smoother effect
          ease: 'linear',
        }}
      >
        {[...TAGS, ...TAGS].map((tag, i) => (
          <div
            key={i}
            className=" font-ibm flex items-center justify-center text-base uppercase font-semibold
                       border border-secondary text-secondary rounded-full px-8"
            style={{
              height: '40px',
              width: 'fit-content',
              whiteSpace: 'nowrap',
            }}
          >
            {tag}
          </div>
        ))}
      </motion.div>
      <motion.div
        className="flex gap-2 pt-2"
        animate={{ x: ['-40%', '0%'] }} // 👈 move only half for seamless loop
        transition={{
          repeat: Infinity,
          duration: 20, // slow down for smoother effect
          ease: 'linear',
        }}
      >
        {[...TAGS, ...TAGS].map((tag, i) => (
          <div
            key={i}
            className=" font-ibm flex items-center justify-center text-base uppercase font-semibold
                       border border-secondary text-secondary rounded-full px-8"
            style={{
              height: '40px',
              width: 'fit-content',
              whiteSpace: 'nowrap',
            }}
          >
            {tag}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
