'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { AnimatePresence, easeOut, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// 🧪 Dummy navigation data
const navItems = [
  {
    label: 'Ice Cream Buckets',
    img: '/images/icecream/chocolate_icecream_bucket.png',
  },
  {
    label: 'Fresh Sips',
    img: '/images/freshsip/mojito_classic_fresh_sip.png',
  },

  { label: 'Shakes', img: '/images/shakes/blue_berry_shake.png' },
  { label: 'All Products', img: '/images/all-products.jpg' },
];

export function NavDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  function useResponsiveOffset() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
      const handleResize = () => setIsDesktop(window.innerWidth >= 1536); // md breakpoint
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
      sideOffset: isDesktop ? 40 : 30,
    };
  }
  const containerVariants = {
    hidden: { opacity: 0 }, // 🔥 Start fully transparent
    visible: {
      opacity: 1, // ✅ Fade in before children animate
      transition: {
        duration: 0.2,
        ease: easeOut,
        when: 'beforeChildren', // 🔥 ensures fade finishes before child animations start
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: easeOut },
    },
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative hover:bg-transparent hover:text-primary cursor-pointer px-0 flex items-center gap-2 font-semibold text-lg"
        >
          <span className="relative text-sm">
            Products
            {/* 🔥 Animated underline */}
            <AnimatePresence mode="wait">
              {(isHovered || isOpen) && (
                <motion.div
                  layoutId="underline"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '100%', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="absolute -bottom-1 left-0 h-[2px] bg-primary rounded-full"
                />
              )}
            </AnimatePresence>
          </span>

          {/* 🔁 Rotating Chevron */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        isOpen={isOpen}
        sideOffset={useResponsiveOffset().sideOffset}
        align="start"
        alignOffset={-40}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="drawer-content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="2xl:h-[45rem] grid  grid-cols-[2fr_1fr_1fr] gap-6 py-6 px-8  "
            >
              <motion.div variants={itemVariants}>
                <h3 className="font-semibold text-lg mb-3">
                  Product Categories
                </h3>

                {navItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="hover:bg-[#d2c1a8]/20 font-corben rounded-xl h-20 w-full justify-start font-bold text-2xl text-secondary my-3  gap-9"
                  >
                    <div className="">
                      <img
                        src={item.img}
                        alt={item.label}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                    </div>
                    {item.label}
                  </Button>
                ))}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-purple-400 rounded-[20px]"
              >
                Bye
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="bg-purple-400  rounded-[20px]"
              >
                Hello
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  );
}
