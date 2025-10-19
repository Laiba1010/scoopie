import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    isOpen?: boolean;
  }
>(
  (
    {
      className,
      align = 'center',
      sideOffset = 4,
      isOpen = false,
      children,
      ...props
    },
    ref,
  ) => {
    // ✅ 1️⃣ ADD THIS PART AT THE TOP (inside your function)
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [measuredHeight, setMeasuredHeight] = React.useState(0);

    React.useEffect(() => {
      if (contentRef.current) {
        setMeasuredHeight(contentRef.current.scrollHeight);
      }
    }, [children, isOpen]);

    // ✅ 2️⃣ REST OF YOUR CODE STAYS SAME
    return (
      <PopoverPrimitive.Portal forceMount>
        <AnimatePresence mode="wait" initial={false}>
          {isOpen && (
            <>
              {/* 🌫 Background Overlay with Fade */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              />

              <PopoverPrimitive.Content
                ref={ref}
                align={align}
                sideOffset={sideOffset}
                className={cn(
                  'z-50  0 mx-auto max-w-[calc(100vw-45px)] 2xl:w-[110rem] focus:outline-none outline-none',
                  className,
                )}
                {...props}
              >
                <motion.div
                  initial={{ opacity: 0, height: 40 }}
                  animate={{
                    opacity: 1,
                    height: isOpen ? measuredHeight : 0,
                  }}
                  exit={{
                    opacity: 0,
                    height: 40,
                    transition: {
                      duration: 0.45,
                      ease: [0.215, 0.61, 0.355, 1],
                    },
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  style={{
                    overflow: 'hidden',
                  }}
                  className="p-4  max-h-[calc(100vh-120px)] bg-background border-secondary border-[10px]  rounded-[20px]"
                >
                  <div
                    ref={contentRef}
                    className="h-full   overflow-y-auto scrollbar-grey"
                  >
                    <div>{children}</div>
                  </div>
                </motion.div>
              </PopoverPrimitive.Content>
            </>
          )}
        </AnimatePresence>
      </PopoverPrimitive.Portal>
    );
  },
);

PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
