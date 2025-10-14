import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface AnimatedButtonProps {
  buttonClassName?: string;
  chevronClassName?: string;
  children?: React.ReactNode;
  initialWidth?: number;
  hoverWidth?: number;
}

export const AnimatedButton = ({
  buttonClassName,
  chevronClassName,
  children,
  initialWidth = 160,
  hoverWidth = 220,
}: AnimatedButtonProps) => {
  const [hovered, setHovered] = useState(false);
  const [chevronKey, setChevronKey] = useState(0); // 👈 unique key for re-mount

  return (
    <motion.button
      onMouseEnter={() => {
        setHovered(true);
        setChevronKey((prev) => prev + 1); // 🔁 re-render chevron on each hover
      }}
      onMouseLeave={() => setHovered(false)}
      animate={{ width: hovered ? hoverWidth : initialWidth }}
      transition={{
        duration: 0.1,
        ease: 'easeInOut',
      }}
      className={cn(
        'group font-ibm text-sm font-semibold bg-primary relative flex items-center justify-center gap-2  whitespace-nowrap rounded-lg px-4 py-[12px] text-secondary transition-all',
        buttonClassName,
      )}
    >
      <span className="z-10 flex items-center justify-center ">{children}</span>

      <div
        className={cn(
          ' rounded-sm bg-secondary w-5 h-5 flex-shrink-0 flex items-center justify-center overflow-hidden',
          chevronClassName,
        )}
      >
        <motion.div
          key={chevronKey} // 🔁 force fresh animation
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.3,
            ease: [0.25, 1, 0.5, 1],
            delay: 0.15,
          }}
          className="flex items-center justify-center"
        >
          <ChevronRight size={14} />
        </motion.div>
      </div>
    </motion.button>
  );
};
