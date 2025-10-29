'use client';
import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import MarqueeTags from './marquee-tags';
import { Sparkle } from 'lucide-react';

const BG_COLORS = [
  '#FFC629', // 🟡 Golden yellow → deeper yellow (ice cream bucket)
  '#4CAF50', // 🟢 Fresh mint green → darker green (fresh mojitos)
  '#FFA1AA', // 🔴 Vibrant pink → darker pink/red (strawberry shake)
];

// 🟡 Golden yellow, 🟢 Deep mint green, 🔵 Vibrant blue

const HEADINGS = ['Mango Ice Cream', 'Mojito Fresh Sip', 'Stawberry Shake']; // 👈 Each slide's title
const HEADING_COLORS = [
  '#FF4900', // dark text for yellow background
  '#1B5E20', // white text for green background
  '#BB3221', // light strawberry pink

  // white text for pink/red background
];
const BG_SVGS = [
  '/images/bg_flower.svg',
  '/images/bg_flower2.svg',
  '/images/bg_flower3.svg',
];

const IMAGES = [
  '/images/icecream/Mango_icecream_bucket.webp',
  '/images/freshsip/mojito_freshsip.webp',
  '/images/shakes/strawberry_shake.webp',
];

export default function SwipeCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  function useMediaQuery(query: string) {
    const [matches, setMatches] = React.useState(false);

    React.useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
  }
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  React.useEffect(() => {
    if (!api) return;

    const updateSlide = () => {
      const newIndex = api.selectedScrollSnap();
      setCurrent(newIndex);
    };

    updateSlide(); // initial
    api.on('select', updateSlide);

    const interval = setInterval(() => {
      api.scrollNext();
    }, 20000);

    api.on('pointerDown', () => clearInterval(interval));
    return () => clearInterval(interval);
  }, [api]);
  return (
    <div className="relative  overflow-hidden mx-auto w-full h-[50rem] md:h-[55rem] lg:h-[80rem] 2xl:h-[80rem] flex flex-col justify-between items-center">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          key={current} // 👈 triggers re-render when slide changes
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.05, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center lg:bg-[length:50rem] md:bg-[length:30rem] bg-[length:22rem]"
          style={{
            backgroundColor: BG_COLORS[current],
            backgroundImage: `url(${BG_SVGS[current]})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* 🧩 Carousel */}
      <Carousel
        setApi={setApi}
        className="w-full mx-2 z-10 "
        opts={{ loop: true }}
      >
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="basis-[70%]  flex items-center justify-center md:pt-40 pt-28"
            >
              <Card
                className={cn(
                  'border-0  outline-none ring-0 shadow-none bg-transparent text-primary-foreground transition-all duration-500 lg:w-[70%] md:w-[80%] w-[80%] 2xl:w-[45rem]',
                  {
                    'opacity-0 pointer-events-none': index !== current, // completely hides others
                    'opacity-100': index === current,
                  },
                )}
              >
                <CardContent className="  border-none flex flex-col  p-0 items-center justify-center ">
                  <motion.h1
                    key={HEADINGS[current]} // 👈 key by heading text
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ color: HEADING_COLORS[current], lineHeight: 0.7 }}
                    transition={{
                      duration: 0.8,
                      ease: 'easeOut',
                    }}
                    className="z-48 lg:text-9xl md:text-8xl text-6xl text-center font-normal uppercase font-baloo"
                  >
                    {HEADINGS[current]}
                  </motion.h1>

                  {/* Sparkles appear from behind the image */}
                  <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                    {/* Left sparkle */}
                    <motion.div
                      key={`left-${current}`}
                      initial={{ opacity: 0, x: -50, y: 0, scale: 0.3 }}
                      animate={{
                        opacity: 1,
                        x: isMobile ? -120 : isTablet ? -200 : -280,
                        y: isMobile ? -10 : isTablet ? 40 : -30,
                        scale: 1,
                      }}
                      transition={{
                        duration: 1,
                        ease: 'easeOut',
                        delay: 0.1,
                      }}
                      className="absolute"
                      aria-hidden
                    >
                      <Sparkle fill="white" stroke="0" size={36} />
                    </motion.div>

                    {/* Center sparkle */}
                    <motion.div
                      key={`bottom-${current}`}
                      initial={{ opacity: 0, x: -30, y: 40, scale: 0.3 }}
                      animate={{
                        opacity: 1,
                        x: isMobile ? -120 : isTablet ? -120 : -200,
                        y: isMobile ? 150 : isTablet ? 180 : 250,
                        scale: 1,
                      }}
                      transition={{
                        duration: 1,
                        ease: 'easeOut',
                        delay: 0.2,
                      }}
                      className="absolute"
                      aria-hidden
                    >
                      <Sparkle fill="white" stroke="0" size={20} />
                    </motion.div>

                    {/* Right sparkle */}
                    <motion.div
                      key={`right-${current}`}
                      initial={{ opacity: 0, x: 50, y: 0, scale: 0.3 }}
                      animate={{
                        opacity: 1,
                        x: isMobile ? 140 : isTablet ? 200 : 280,
                        y: isMobile ? 60 : isTablet ? 50 : 60,
                        scale: 1,
                      }}
                      transition={{
                        duration: 1,
                        ease: 'easeOut',
                        delay: 0.15,
                      }}
                      className="absolute"
                      aria-hidden
                    >
                      <Sparkle fill="white" stroke="0" size={30} />
                    </motion.div>
                  </div>

                  {/* 🧊 Image floating animation only */}
                  <motion.div
                    animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="md:px-24 relative z-10"
                  >
                    <motion.img
                      key={index}
                      src={IMAGES[index]}
                      alt={`Ice Cream ${index + 1}`}
                      className="h-full object-cover lg:pt-0 md:pt-10 pt-8 "
                    />
                  </motion.div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <MarqueeTags />
    </div>
  );
}
