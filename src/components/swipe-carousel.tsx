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
  '/images/icecream/Mango_icecream_bucket.png',
  '/images/freshsip/mojito_freshsip.png',
  '/images/shakes/strawberry_shake.png',
];

export default function SwipeCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

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
    <div className="relative  overflow-hidden mx-auto w-full h-[80rem] 2xl:h-[80rem] flex flex-col justify-between items-center">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          key={current} // 👈 triggers re-render when slide changes
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.05, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundColor: BG_COLORS[current],
            backgroundImage: `url(${BG_SVGS[current]})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: '50rem',
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
              className="basis-[70%] flex items-center justify-center pt-40"
            >
              <Card
                className={cn(
                  'border-0 outline-none ring-0 shadow-none bg-transparent text-primary-foreground transition-all duration-500 w-[70%]  2xl:w-[45rem]',
                  {
                    'opacity-0 pointer-events-none': index !== current, // completely hides others
                    'opacity-100': index === current,
                  },
                )}
              >
                <CardContent className=" border-none flex flex-col   p-0 items-center justify-center ">
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
                    className="z-48 text-9xl tracking-tighter text-center font-black uppercase font-baloo"
                  >
                    {HEADINGS[current]}
                  </motion.h1>

                  {/* Sparkles appear from behind the image */}
                  <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                    {/* Left sparkle */}
                    <motion.div
                      key={`left-${current}`}
                      initial={{ opacity: 0, x: -50, y: 0, scale: 0.3 }}
                      animate={{ opacity: 1, x: -280, y: -20, scale: 1 }}
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
                      animate={{ opacity: 1, x: -200, y: 250, scale: 1 }}
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
                      animate={{ opacity: 1, x: 280, y: 60, scale: 1 }}
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
                    className="px-24 relative z-10"
                  >
                    <motion.img
                      key={index}
                      src={IMAGES[index]}
                      alt={`Ice Cream ${index + 1}`}
                      className="h-full object-cover"
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
