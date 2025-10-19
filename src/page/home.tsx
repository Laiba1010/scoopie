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
    </>
  );
};

export default HomePage;
