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
  initialWidth,
  hoverWidth,
}: AnimatedButtonProps) => {
  const [hovered, setHovered] = useState(false);
  const [chevronKey, setChevronKey] = useState(0);

  const hasCustomWidth = initialWidth && hoverWidth; // ✅ check if width props are provided

  return (
    <motion.button
      onMouseEnter={() => {
        setHovered(true);
        setChevronKey((prev) => prev + 1);
      }}
      onMouseLeave={() => setHovered(false)}
      animate={
        hasCustomWidth
          ? { width: hovered ? hoverWidth : initialWidth }
          : { scale: hovered ? 1.02 : 1 }
      }
      transition={{
        duration: 0.2,
        ease: 'easeInOut',
      }}
      className={cn(
        'group font-ibm text-sm font-bold bg-primary relative flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-[12px] text-secondary transition-all',
        hasCustomWidth ? '' : 'w-full', // ✅ full width if no widths provided
        buttonClassName,
      )}
    >
      <span className="z-10 flex items-center justify-center">{children}</span>

      <div
        className={cn(
          'rounded-sm bg-secondary w-5 h-5 flex-shrink-0 flex items-center justify-center overflow-hidden',
          chevronClassName,
        )}
      >
        <motion.div
          key={chevronKey}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.3,
            ease: [0.25, 1, 0.5, 1],
            delay: 0.1,
          }}
          className="flex items-center justify-center"
        >
          <ChevronRight size={14} />
        </motion.div>
      </div>
    </motion.button>
  );
};
