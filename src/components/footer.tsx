import { FooterCard } from './footer-card';

import { Input } from './ui/input';

export const Footer = () => {
  return (
    <div className="h-[50rem]   ">
      <div className=" bg-secondary flex-col flex items-center justify-start px-6 lg:px-0 ">
        <FooterCard />
      </div>
      <div className="   bg-secondary flex flex-col  items-center justify-center">
        <img src="/logo.png" alt="logo " className=" lg:w-72 md:w-60 w-52 " />
        <h3 className="text-[#C6A26D] font-baloo text-4xl uppercase lg:text-8xl md:text-6xl lg:-mt-28 md:-mt-24 -mt-16">
          #ScoopOfHappiness
        </h3>
        <footer className=" w-full bg-secondary text-primary pt-16 px-12 md:px-28 md:pb-52  ">
          <div className="grid grid-cols-2 lg:grid-cols-5 grid-rows-1 lg:grid-rows-3 gap-12 lg:gap-6 m-4  text-xl  uppercase  max-w-7xl mx-auto w-full">
            {/* Column 1 — Links */}
            <div className=" text-center md:text-left col-start-1 row-start-1 lg:col-start-1 lg:row-start-1 lg:col-span-1 lg:row-span-3 flex flex-col gap-3 font-baloo items-center lg:justify-start  lg:items-start ">
              {['Home', 'Products', 'Where to Buy', 'Recipes'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:text-[#C6A26D] transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Column 2 — Legal */}
            <div className="col-start-2 lg:justify-start  text-center  row-start-1 lg:col-start-2 md:row-start-1 lg:col-span-1 lg:row-span-3 flex flex-col gap-3 font-baloo items-center lg:items-start ">
              <a href="#" className="hover:text-[#C6A26D]">
                Terms of Use
              </a>
              <a href="#" className="hover:text-[#C6A26D]">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#C6A26D]">
                About Us
              </a>
              <a href="#" className="hover:text-[#C6A26D]">
                News
              </a>
              <a href="#" className="hover:text-[#C6A26D]">
                Contact Us
              </a>
            </div>

            <div className="col-start-1 row-start-2 col-span-2 lg:col-start-3 lg:row-start-1 lg:col-span-2 lg:row-span-3 flex flex-col gap-3 items-center  lg:items-start ">
              <h4 className="text-xl  text-primary font-baloo">Subscribe</h4>
              <p className="text-lg font-ibm normal-case font-normal leading-relaxed">
                Sign up for the latest updates and exclusive offers from
                Spoocie.
              </p>
              <Input
                placeholder="Full Name*"
                className="border-0 border-b-2 h-14 border-primary rounded-none focus-visible:ring-0 focus-visible:outline-none focus:border-[#b38f5b] bg-transparent text-black placeholder:text-primary placeholder:font-baloo placeholder:text-lg"
              />

              <Input
                placeholder="Email Address*"
                className="border-0 border-b-2 h-14 border-primary rounded-none focus-visible:ring-0 focus-visible:outline-none focus:border-[#b38f5b] bg-transparent text-black placeholder:text-primary placeholder:font-baloo placeholder:text-lg"
              />

              <label
                className=" font-ibm font-semibold normal-case
               text-xs mt-2 flex items-start gap-2 text-primary"
              >
                <input type="checkbox" className=" size-9 " />
                Yes, I would like to receive updates, promotions, and offers
                from Scoopie’s Retail & Restaurants. I understand I can
                unsubscribe at any time.
              </label>
            </div>

            {/* Column 4 — Contact */}
            <div className="text-center lg:text-left  col-start-1 row-start-3 col-span-2 lg:col-start-5 lg:row-start-1 lg:col-span-1 lg:row-span-3 flex flex-row flex-wrap justify-between items-start lg:flex-col lg:gap-4 md:pt-8 mb-24 md:mb-0">
              {/* Contact Us */}
              <div className="w-[45%] lg:w-full text-xs md:text-base  md:space-y-2">
                <h4 className="font-baloo text-xl text-primary">Contact Us</h4>
                <p className="font-semibold break-all">+1.234.567.9800</p>
                <p className="font-semibold break-all">info@scoopiefoods.com</p>
                <p className="font-semibold break-all">
                  sales@scoopoefoods.com
                </p>
              </div>

              {/* Head Office */}
              <div className="w-1/2 lg:w-full text-xs md:text-base  md:mt-3">
                <h4 className="font-baloo text-xl text-primary">Head Office</h4>
                <p className="font-semibold">190 Statesman Drive</p>
                <p className="font-semibold">190 Statesman Drive</p>
                <p className="font-semibold">Paris</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
