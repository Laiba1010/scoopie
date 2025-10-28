'use client';

export const Features = () => {
  return (
    <div className="md:h-[90rem] h-[110rem] w-full flex items-center justify-center flex-col lg:px-10 px-6 gap-8 lg:py-64 md:py-24 py-40">
      <h1 className="md:text-8xl text-6xl text-black  md:leading-[0.7]   leading-[0.7]  font-baloo text-center max-w-4xl uppercase">
        Your smile knows so does the scoop
      </h1>
      <div className="w-full h-full grid grid-cols-3 md:grid-cols-3 grid-rows-3 md:grid-rows-3 gap-4 md:gap-4 m-4">
        <div className="bg-[#FFC629] text-black items-center flex flex-col justify-center text-center col-start-1 row-start-1 col-span-3 md:col-start-1 md:row-start-1 md:col-span-1 md:row-span-1 rounded-[20px] p-10">
          <h1 className="text-4xl uppercase font-baloo   ">Real Fruits</h1>
          <p className="text-lg font-ibm tracking-tighter font-medium">
            Every scoop and sip is made with freshly picked, juicy fruits, never
            frozen, never fake
          </p>
        </div>
        <div className="col-start-1 row-start-2 col-span-3 row-span-3 md:col-start-1 md:row-start-2 md:col-span-1 md:row-span-2 bg-gray-300 rounded-[20px] ">
          <img
            loading="lazy"
            src="/images/holding_product.png"
            alt="holding product"
            className="w-full h-full object-cover  rounded-[20px]"
          />
        </div>
        <div className="col-start-1 text-center text-primary items-center flex flex-col justify-center row-start-5 col-span-3 md:col-start-2 md:row-start-1 md:col-span-1 md:row-span-1 bg-[#803B2C]  rounded-[20px] p-10">
          <h1 className="text-4xl font-baloo  uppercase ">100% natural</h1>
          <p className="text-lg font-ibm font-medium tracking-tighter">
            No artificial flavors, no shortcuts, just the real taste of nature
            in every bite
          </p>
        </div>
        <div className="col-start-1 row-start-6 col-span-3 md:col-start-2 md:row-start-2 md:col-span-1 md:row-span-1 bg-gray-300 rounded-[20px] ">
          <img
            loading="lazy"
            src="/images/floating_products.png"
            alt=" floating products"
            className="w-full h-full object-cover  rounded-[20px]"
          />
        </div>
        <div className="col-start-1 text-[#BB3221] flex flex-col items-center justify-center text-center bg-[#FFA1AA] row-start-7 col-span-3 md:col-start-2 md:row-start-3 md:col-span-1 md:row-span-1 rounded-[20px] p-10">
          <h1 className="text-4xl font-baloo uppercase ">Cold-Pressed</h1>
          <p className="text-lg font-medium font-ibm tracking-tighter">
            Our cold-pressed process keeps the vitamins intact while delivering
            a smooth, rich texture
          </p>
        </div>
        <div className="hidden md:block col-start-1 row-start-8 col-span-3 md:col-start-3 md:row-start-1 md:col-span-1 md:row-span-2 rounded-[20px]">
          <img
            loading="lazy"
            src="/images/shakeinhand.png"
            alt=" shake in hand"
            className="w-full h-full object-cover  rounded-[20px]"
          />
        </div>
        <div className="hidden md:block md:col-start-3 md:row-start-3 md:col-span-1 md:row-span-1 bg-gray-300 rounded-[20px] ">
          <img
            loading="lazy"
            src="/images/all_products.png"
            alt="all products"
            className="w-full h-full object-cover  rounded-[20px]"
          />
        </div>
      </div>
    </div>
  );
};
