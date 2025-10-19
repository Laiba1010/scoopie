'use client';

import * as React from 'react';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { motion, AnimatePresence } from 'framer-motion'; // 🪄 animation library
import { BadgeCheck } from 'lucide-react';

const PRODUCTS = {
  popular: [
    {
      name: 'Chocolate Shake',
      tags: ['New Arrival', 'Gluten Free', 'Limited Edition'],
      image: '/images/icecream/chocolate_icecream.png',
    },
    {
      name: 'Vanilla Delight',
      tags: ['Best Seller', 'Protein Boost'],
      image: '/images/icecream/Mango_icecream_bucket.png',
    },
    {
      name: 'Berry Bliss',
      tags: ['New Arrival'],
      image: '/images/shakes/strawberry_shake.png',
    },
    {
      name: 'Mango Magic',
      tags: ['Summer Favorite'],
      image: '/images/freshsip/mojito_freshsip.png',
    },

    {
      name: 'Berry Bliss',
      tags: ['New Arrival'],
      image: '/images/icecream/pistachio_icecream.png',
    },
    {
      name: 'Berry Bliss',
      tags: ['New Arrival'],
      image: '/images/icecream/Mango_icecream_bucket.png',
    },
  ],
  shakes: [
    {
      name: 'Chocolate Shake',
      tags: ['Best Seller'],
      image: '/images/icecream/Mango_icecream_bucket.png',
    },
    {
      name: 'Vanilla Delight',
      tags: ['Classic'],
      image: '/images/shakes/oreo_shake.png',
    },
    {
      name: 'Oreo Shake',
      tags: ['Crunchy'],
      image:
        'https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=1000',
    },
    {
      name: 'Peanut Butter Shake',
      tags: ['Protein Boost'],
      image:
        'https://images.unsplash.com/photo-1601042879364-f38d1f6b2383?q=80&w=1000',
    },
    {
      name: 'Coffee Shake',
      tags: ['Wake Up'],
      image:
        'https://images.unsplash.com/photo-1521305916504-4a1121188589?q=80&w=1000',
    },
  ],
  icecreams: [
    {
      name: 'Strawberry Ice Cream',
      tags: ['Gluten Free'],
      image:
        'https://images.unsplash.com/photo-1565958011705-44e211f5e7e8?q=80&w=1000',
    },
    {
      name: 'Mint Chocolate',
      tags: ['Refreshing'],
      image:
        'https://images.unsplash.com/photo-1589710752564-4b9b42a8e6cf?q=80&w=1000',
    },
    {
      name: 'Caramel Swirl',
      tags: ['Sweet Tooth'],
      image:
        'https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=1000',
    },
  ],
  freshsip: [
    {
      name: 'Lemon Fizz',
      tags: ['Low Sugar'],
      image:
        'https://images.unsplash.com/photo-1612197512447-1d4c5a34f9e1?q=80&w=1000',
    },
    {
      name: 'Orange Zest',
      tags: ['Vitamin C'],
      image:
        'https://images.unsplash.com/photo-1612197522481-cbdfce463b43?q=80&w=1000',
    },
    {
      name: 'Watermelon Cooler',
      tags: ['Refreshing'],
      image:
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000',
    },
  ],
};

export default function ProductTabsCarousel() {
  const [tab, setTab] = React.useState<keyof typeof PRODUCTS>('popular');

  const [api, setApi] = React.useState<CarouselApi>();
  const [centerIndex, setCenterIndex] = React.useState(0);
  // 🎯 Update centerIndex when carousel scrolls
  React.useEffect(() => {
    if (!api) return;

    const updateCenter = () => {
      const snap = api.selectedScrollSnap();
      setCenterIndex(snap);
    };

    updateCenter();
    api.on('select', updateCenter);

    return () => {
      api.off('select', updateCenter);
    };
  }, [api]);
  // 🟡 Reset centerIndex when tab changes to correct middle

  return (
    <div className="w-full p-10 ">
      <Tabs
        value={tab}
        onValueChange={(value) => setTab(value as keyof typeof PRODUCTS)}
        className="w-full bg-[#f6efe2] rounded-[20px] py-16 "
      >
        <TabsList className="font-ibm flex justify-center mb-12 bg-transparent space-x-4 py-6">
          {['popular', 'shakes', 'icecreams', 'freshsip'].map((key) => (
            <TabsTrigger
              key={key}
              value={key}
              className={`relative px-10 py-4 text-lg font-semibold rounded-lg transition-all duration-300
                data-[state=active]:bg-secondary data-[state=active]:text-primary
                data-[state=inactive]:text-secondary
                before:content-[''] before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-secondary 
                before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500`}
            >
              {key === 'popular'
                ? 'Most Popular'
                : key === 'shakes'
                  ? 'Shakes'
                  : key === 'icecreams'
                    ? 'Ice Creams'
                    : 'Fresh Sip'}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Smooth transition for tab content */}
        <AnimatePresence mode="wait">
          {Object.entries(PRODUCTS).map(([key, list]) =>
            key === tab ? (
              <TabsContent key={key} value={key} forceMount>
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="w-full max-w-7xl mx-auto"
                >
                  <Carousel
                    opts={{ align: 'center', loop: true, duration: 50 }}
                    setApi={setApi}
                    // className="relative"
                  >
                    <CarouselContent className="overflow-visible">
                      {list.map((item, index) => {
                        const isCenter = index === centerIndex;
                        return (
                          <CarouselItem
                            key={index}
                            className="flex items-center justify-center basis-[30%] cursor-pointer"
                          >
                            <div className=" w-full relative ">
                              {/* 🍦 Image */}
                              {/* 🍦 Image + Rotating Background */}
                              <div className=" relative flex items-center justify-center w-full h-[400px] overflow-visible rounded-xl z-10">
                                {isCenter && (
                                  <motion.img
                                    key={index}
                                    src="/images/flower.svg" // path to your SVG in public folder
                                    alt="background shape"
                                    className="absolute w-[360px] h-[360px] -z-10"
                                    initial={{ scale: 0.1, rotate: 0 }}
                                    animate={{ scale: 1, rotate: 180 }}
                                    transition={{
                                      scale: { duration: 0.3, ease: 'easeOut' },
                                      rotate: {
                                        duration: 0.4,
                                        ease: 'easeOut',
                                      },
                                    }}
                                    onAnimationComplete={() => {
                                      const controls = document.getElementById(
                                        `spin-${index}`,
                                      );
                                      if (controls)
                                        controls.style.animation =
                                          'spin 15s linear infinite';
                                    }}
                                    id={`spin-${index}`}
                                  />
                                )}

                                <motion.img
                                  src={item.image}
                                  alt={item.name}
                                  className="object-contain h-[68%] w-[68%] relative z-20"
                                  animate={
                                    isCenter
                                      ? { rotate: -10, scale: 1.15 }
                                      : { rotate: 0, scale: 1 }
                                  }
                                  transition={{
                                    duration: 0.45,
                                    ease: 'easeOut',
                                  }}
                                />
                              </div>

                              {/* Text */}
                              {/* Text Section */}
                              <div className="mt-3 text-center text-secondary relative z-20">
                                <h3 className="tracking-tighter  text-4xl font-black uppercase font-baloo min-h-[3rem] flex items-start justify-center">
                                  {item.name}
                                </h3>

                                {/* Badges container with fixed height */}
                                <div className="w-full flex flex-wrap justify-center items-start gap-2  min-h-[3.5rem] ">
                                  {item.tags.map((tag, i) => (
                                    <span
                                      key={i}
                                      className="flex tracking-tighter  font-ibm items-center text-base font-semibold text-secondary"
                                    >
                                      <BadgeCheck
                                        className="w-5 h-5"
                                        fill="#E65300"
                                        stroke="#fff"
                                        strokeWidth={2}
                                      />
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>

                    <div className="max-w-xs mx-auto py-4 flex justify-center items-center bg-secondary rounded-[12px] gap-5 mt-10">
                      {/* ◀️ Left Arrow */}
                      <CarouselPrevious className="rounded-sm static translate-x-0 translate-y-0 h-6 w-6" />

                      {/* 🔵 Dots */}
                      <div className="flex justify-center items-center ">
                        {list.map((_, index) => {
                          const isActive = index === centerIndex;

                          return (
                            // 🟡 Fixed width slot so layout never shifts
                            <div
                              key={index}
                              className="flex justify-center items-center"
                              style={{ width: 20 }}
                            >
                              <motion.div
                                layout
                                className="rounded-full"
                                animate={{
                                  width: isActive ? 20 : 8, // active = pill
                                  height: 8,
                                  borderRadius: 999,
                                  backgroundColor: isActive
                                    ? '#fff6ee'
                                    : '#B0B0B0',
                                }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* ▶️ Right Arrow */}
                      <CarouselNext className="rounded-sm static translate-x-0 translate-y-0 h-6 w-6" />
                    </div>
                  </Carousel>
                </motion.div>
              </TabsContent>
            ) : null,
          )}
        </AnimatePresence>
      </Tabs>
    </div>
  );
}
