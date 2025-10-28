'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import { AnimatedButton } from './animated-button';
import { ChevronDown } from 'lucide-react';

export const BrandJourney = () => {
  const [active, setActive] = useState('item-1');
  // use a counter so every click produces a unique key -> forces remount
  const [replayCount, setReplayCount] = useState(0);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [activeId, setActiveId] = useState('item-1');

  const items = [
    {
      id: 'item-1',
      title: 'Latest News',
      color: 'bg-[#FFC629]',
      img: 'https://images.unsplash.com/photo-1603201667141-5a2d4c673378?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=896',
      date: 'August 5, 2025',
      heading: 'Our Small Story Wins Big At the Marketing Awards',
      subheading:
        'The "Growing With You" campaign, highlighting the importance of family and connection, earned Silver and Bronze recognitions.',
    },
    {
      id: 'item-2',
      title: 'Shipping Details',
      color: 'bg-[#3BB3E3]',
      img: 'https://plus.unsplash.com/premium_photo-1742404280631-fc42d69b605c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870',
      date: 'Sep 4, 2025',
      heading: 'Helping More Kiddos Take Their First Steps',
      subheading:
        'Our new "Growing With You" campaign aims to inspire kids to embrace their uniqueness and pursue their passions.',
    },
    {
      id: 'item-3',
      title: 'Return Policy',
      color: 'bg-[#C5B4E2]',
      img: 'https://plus.unsplash.com/premium_photo-1684249781401-56992dda152d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=860',
      date: 'Sep 10, 2025',
      heading: 'New Products and Services',
      subheading:
        'We are excited to announce the launch of our new "Growing With You" campaign, which highlights the importance of family and connection.',
    },
  ];

  // Smooth width animation
  useEffect(() => {
    items.forEach((item) => {
      const el = contentRefs.current[item.id];
      if (!el) return;
      if (active === item.id) {
        el.style.width = el.scrollWidth + 'px';
      } else {
        el.style.width = '0px';
      }
    });
  }, [active, items]);

  // Variants for stagger animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: cubicBezier(0.33, 1, 0.68, 1) },
    },
  };

  // handle clicks: if same id -> increment replayCount to remount motion container
  const handleClick = (id: string) => {
    if (active === id) {
      // don't change active; force remount of animated content
      setReplayCount((c) => c + 1);
    } else {
      setActive(id);
      // also bump counter so new panel's animation runs fresh
      setReplayCount((c) => c + 1);
    }
  };
  const [height, setHeight] = useState('20rem');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768)
        setHeight('40rem'); // mobile
      else if (window.innerWidth < 1024) setHeight('25rem'); // tablet
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className="lg:h-[48rem] md:h-[58rem] h-[70rem] w-full flex flex-col items-center justify-center gap-12  mb-72 md:mb-[25rem]">
      <div className="text-black gap-4 text-center uppercase font-baloo flex flex-col items-center justify-center">
        <h3 className="text-3xl">What's New</h3>
        <h1 className=" text-6xl md:text-8xl  md:leading-[0.7]    max-w-[350px] md:max-w-2xl leading-[0.7] ">
          The World of Scoopie
        </h1>
      </div>
      <div className="lg:flex hidden items-center justify-center gap-2 overflow-hidden w-full h-[28rem] ">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex   flex-row   overflow-hidden h-full"
          >
            {/* Header */}
            <div
              className={`rounded-[23px] text-secondary font-baloo uppercase text-3xl flex items-center justify-center px-3.5 py-2 cursor-pointer writing-mode-vertical transform rotate-180 text-center transition-all duration-300 select-none ${item.color}`}
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
              }}
              onClick={() => handleClick(item.id)}
            >
              {item.title}
            </div>

            {/* Collapsible Content */}
            <div
              ref={(el) => {
                if (el) contentRefs.current[item.id] = el;
              }}
              className="overflow-hidden transition-[width] duration-700 ease-[cubic-bezier(0.2,1,0.2,1)]"
              style={{ width: active === item.id ? '66rem' : '0rem' }}
            >
              <div
                className={`p-5 flex gap-7 text-gray-700 h-full text-sm leading-relaxed w-[66rem] rounded-[20px] ml-2 ${item.color}`}
              >
                <AnimatePresence mode="wait">
                  {active === item.id && (
                    // key includes replayCount so each click forces re-mount
                    <motion.div
                      key={`${item.id}-${replayCount}`}
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="flex gap-7"
                    >
                      {/* Image */}
                      <motion.img
                        variants={itemVariants}
                        src={item.img}
                        alt="brand journey"
                        className="w-full max-w-lg h-full object-cover rounded-[20px]"
                      />

                      {/* Text content */}
                      <motion.div
                        variants={containerVariants}
                        className="font-ibm text-black flex flex-col items-start gap-4 justify-center"
                      >
                        <motion.h3
                          variants={itemVariants}
                          className="text-base font-bold tracking-tighter"
                        >
                          {item.date}
                        </motion.h3>
                        <motion.h1
                          variants={itemVariants}
                          className="font-baloo uppercase text-4xl leading-[0.8]"
                        >
                          {item.heading}
                        </motion.h1>
                        <motion.p
                          variants={itemVariants}
                          className="text-lg leading-[1.1] pb-4"
                        >
                          {item.subheading}
                        </motion.p>
                        <motion.div variants={itemVariants}>
                          <AnimatedButton
                            initialWidth={130}
                            hoverWidth={145}
                            chevronClassName="text-white "
                            buttonClassName="p-2.5 py-3 text-xs"
                          >
                            Read More
                          </AnimatedButton>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Accordion (same logic + animation as desktop) */}
      <div className="lg:hidden w-full max-w-4xl space-y-4">
        {items.map((item) => {
          const isActive = activeId === item.id;

          const handleMobileClick = (id: string) => {
            if (activeId === id) {
              // replay animation if clicking same item
              setReplayCount((c) => c + 1);
            } else {
              // activate a new item
              setActiveId(id);
              setReplayCount((c) => c + 1);
            }
          };

          return (
            <div
              key={item.id}
              className={`rounded-[20px] overflow-hidden transition-all mx-6 duration-300 ${item.color}`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => handleMobileClick(item.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left font-baloo uppercase text-xl "
              >
                <span>{item.title}</span>
                <motion.div
                  animate={{ rotate: isActive ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                >
                  <ChevronDown className="w-6 h-6 text-gray-900" />
                </motion.div>
              </button>

              {/* Accordion Content */}
              <AnimatePresence mode="wait" initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height }}
                    exit={{ height: 0 }}
                    transition={{
                      height: { duration: 0.4, ease: [0.33, 1, 0.68, 1] },
                    }}
                    className="overflow-hidden "
                  >
                    {/* Inner animated content */}
                    <motion.div
                      key={`${item.id}-${replayCount}`} // only this part remounts
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="p-6 flex  flex-col gap-6 md:flex-row items-start text-gray-900"
                    >
                      {/* Image */}
                      <motion.img
                        variants={itemVariants}
                        src={item.img}
                        alt={item.title}
                        className="w-full md:w-1/2 h-64 md:h-80 object-cover rounded-[20px]"
                      />

                      {/* Text Content */}
                      <motion.div
                        variants={containerVariants}
                        className="flex flex-col items-start gap-4 justify-center"
                      >
                        <motion.h3
                          variants={itemVariants}
                          className="text-sm  font-bold uppercase tracking-wide"
                        >
                          {item.date}
                        </motion.h3>

                        <motion.h1
                          style={{
                            lineHeight: 0.9,
                          }}
                          variants={itemVariants}
                          className="text-3xl md:text-4xl text-black  font-baloo uppercase "
                        >
                          {item.heading}
                        </motion.h1>

                        <motion.p
                          variants={itemVariants}
                          className="text-base leading-relaxed"
                        >
                          {item.subheading}
                        </motion.p>

                        <motion.div variants={itemVariants}>
                          <AnimatedButton
                            initialWidth={130}
                            hoverWidth={145}
                            chevronClassName="text-white"
                            buttonClassName="p-2.5 py-3 text-xs"
                          >
                            Read More
                          </AnimatedButton>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
