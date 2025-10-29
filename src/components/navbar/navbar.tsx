'use client';

import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

import { Link } from 'react-router-dom';
import { NavItem } from './nav-item';
import { AnimatedButton } from '../animated-button';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, cubicBezier, motion } from 'framer-motion';
import { Button } from '../ui/button';

export function Navbar() {
  const [open, setOpen] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const navLinks = [
    { label: 'Recipes', href: '#' },
    { label: 'About Us', href: '#' },
    { label: 'News', href: '#' },
  ];
  const navItems = [
    {
      label: 'Ice Cream Buckets',
      img: '/images/icecream/chocolate_icecream.png',
      bgColor: '#FBE8C4', // 🍦 soft beige
    },
    {
      label: 'Fresh Sips',
      img: '/images/freshsip/mojito_freshsip.png',
      bgColor: '#4CAF50', // 🥤 minty green
    },
    {
      label: 'Shakes',
      img: '/images/shakes/strawberry_shake.png',
      bgColor: '#FFA1AA', // 🫐 blueberry hint
    },
    {
      label: 'All Products',
      img: '/images/all_products.png',
      bgColor: '#FEE2E2', // 🍓 pink tone
    },
  ];
  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1, // delay between children
        delayChildren: 0.2, // small start delay
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: cubicBezier(0.33, 1, 0.68, 1), // same as power3.out
      },
    },
  };
  return (
    <header className="  w-full mx-auto py-4 px-2  md:py-4 md:px-4 font-ibm fixed top-0 z-50 bg-transparent flex flex-col items-center">
      {/* NAVBAR */}
      <div className="z-50 grid grid-cols-3 max-w-[110rem] mx-auto w-full bg-secondary px-4 md:py-2 text-primary 2xl:h-[5.8rem] md:rounded-[24px] rounded-2xl relative">
        {/* LEFT SECTION */}
        <div className="hidden lg:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center justify-center gap-6 px-6">
              {/* TRIGGER BUTTON */}
              <Button
                onClick={() => setOpen(!open)}
                variant="ghost"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative hover:bg-transparent hover:text-primary cursor-pointer px-0 flex items-center gap-2 font-bold text-lg"
              >
                <span className="relative text-sm">
                  Products
                  {/* 🔥 Animated underline */}
                  <AnimatePresence mode="wait">
                    {(isHovered || open) && (
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
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </Button>
              {/* NORMAL NAV ITEMS */}
              {navLinks.map((item) => (
                <NavItem key={item.label} {...item} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* CENTER SECTION */}
        <Link
          to="/"
          className="max-h-[4.2rem] overflow-hidden hidden lg:flex items-center justify-center"
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="object-cover w-48 rotate-2"
          />
        </Link>

        {/* RIGHT SECTION */}
        <div className="lg:flex hidden items-center justify-end gap-3 px-6">
          <AnimatedButton
            initialWidth={140}
            hoverWidth={155}
            chevronClassName="text-white "
          >
            Explore Now
          </AnimatedButton>
          <AnimatedButton
            initialWidth={140}
            hoverWidth={155}
            chevronClassName="text-secondary bg-primary"
            buttonClassName="border bg-transparent text-primary"
          >
            Dine with Us
          </AnimatedButton>
        </div>

        {/* MOBILE SECTION */}
        <div className="lg:hidden col-span-3 flex justify-between items-center">
          <Link
            to="/"
            className="max-h-[4.2rem] overflow-hidden flex items-center justify-center"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="object-cover w-24 rotate-2"
            />
          </Link>
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
            className="relative rounded-lg  bg-white flex flex-col items-center justify-center w-10 h-10 p-2 text-black z-50"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 1 } : { rotate: 0, y: -4 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="block text-black w-full h-[2px] bg-black rounded-full"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -1 } : { rotate: 0, y: 4 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="block w-full h-[2px] bg-black rounded-full"
            />
          </button>
        </div>
      </div>

      {/* ACCORDION PANEL */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              onClick={() => setOpen(false)} // closes panel when clicking outside
              className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  duration: 0.6,
                  ease: cubicBezier(0.33, 0, 0, 1),
                },
              }}
              transition={{
                duration: 0.8,
                ease: cubicBezier(0.2, 1, 0.2, 1),
              }}
              className="z-50 w-full md:border-[12px] border-4 border-black  max-w-[110rem] mx-auto  bg-primary rounded-[25px] 2xl:overflow-hidden overflow-y-auto mt-3"
            >
              <div className=" hidden lg:h-[80vh] xl:h-[75vh]  2xl:h-full w-full mx-auto p-8 lg:flex flex-wrap gap-12 justify-center  ">
                <AnimatePresence>
                  {open && (
                    <>
                      <motion.div
                        key="drawer-content"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="  grid  grid-cols-[2fr_1fr_1fr] gap-6 py-6 px-8  "
                      >
                        <motion.div variants={itemVariants}>
                          <h3 className="font-semibold text-lg mb-3 text-black">
                            Product Categories
                          </h3>

                          {navItems.map((item, index) => (
                            <Button
                              key={index}
                              variant="ghost"
                              className="hover:bg-[#d2c1a8]/20  uppercase font-baloo rounded-xl h-20 w-full justify-start text-3xl text-secondary my-3 gap-9"
                            >
                              <div
                                className="flex items-center justify-center w-16 h-16 rounded-lg"
                                style={{ backgroundColor: item.bgColor }}
                              >
                                <img
                                  src={item.img}
                                  alt={item.label}
                                  className="w-12 h-12 object-contain"
                                />
                              </div>
                              {item.label}
                            </Button>
                          ))}
                        </motion.div>

                        <motion.img
                          src="/images/electricblue_inair.webp"
                          variants={itemVariants}
                          className="h-full object-cover rounded-[20px]"
                        />
                        <motion.img
                          src="/images/vanilla_inair.webp"
                          variants={itemVariants}
                          className="h-full object-cover rounded-[20px]"
                        />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
              <div className="block lg:hidden p-4 md:p-6 h-[80vh]">
                <motion.div
                  key="drawer-content-mobile"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col  text-left items-start justify-between h-full "
                >
                  <div className="flex flex-col  text-left items-start gap-2">
                    {['Products', 'Recipes', 'About Us', 'News', 'Contact'].map(
                      (label, i) => (
                        <motion.button
                          key={i}
                          variants={itemVariants}
                          className="text-5xl md:text-6xl leading-[0.8] uppercase font-baloo text-[#FF4900] rounded-xl "
                        >
                          {label}
                        </motion.button>
                      ),
                    )}
                  </div>
                  <motion.div
                    variants={itemVariants}
                    className="flex w-full items-center justify-center gap-3 py-4"
                  >
                    <AnimatedButton
                      chevronClassName="text-white bg-primary text-secondary"
                      buttonClassName="bg-secondary text-primary"
                    >
                      Explore Now
                    </AnimatedButton>
                    <AnimatedButton
                      chevronClassName="text-secondary bg-primary"
                      buttonClassName="border border-black bg-transparent text-secondary"
                    >
                      Dine with Us
                    </AnimatedButton>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
