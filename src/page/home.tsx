import { BrandJourney } from '@/components/brand-journey';
import { Features } from '@/components/features';
import { Footer } from '@/components/footer';
import ProductTabsCarousel from '@/components/product-tab-carousel';
import SwipeCarousel from '@/components/swipe-carousel';

const HomePage = () => {
  return (
    <>
      <div className="w-full  relative">
        <SwipeCarousel />
      </div>
      <div className="mt-[-110px] relative z-10">
        <ProductTabsCarousel />
      </div>
      <Features />
      <BrandJourney />
      <Footer />
    </>
  );
};

export default HomePage;
