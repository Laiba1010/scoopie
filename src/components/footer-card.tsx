import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Input } from './ui/input';
import { AnimatedButton } from './animated-button';

export const FooterCard = () => {
  return (
    <Card className="border-none shadow-none outline-none focus-visible:ring-0 focus-visible:outline-none w-full max-w-6xl bg-[#C5B4E2] py-20 -mt-64">
      <CardHeader className="flex gap-5 items-center justify-center text-center ">
        <CardTitle className="font-baloo font-normal  text-7xl md:text-9xl text-secondary uppercase max-w-2xl leading-[0.8]">
          Spice Up Your Inbox
        </CardTitle>
        <CardDescription className="text-2xl font-ibm text-secondary max-w-2xl">
          Get special offers and all the latest products, recipes, and news
          delivered to your inbox!
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <form>
          <div className="flex md:flex-row flex-col items-center justify-center gap-4 md:gap-2">
            <div className="grid gap-2">
              <Input
                id="name"
                type="text"
                placeholder="Full Name"
                required
                className="h-14 lg:w-80 w-60  bg-primary rounded-xl"
              />
            </div>
            <div className="grid gap-2">
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                required
                className="h-14 lg:w-80 w-60 bg-primary rounded-xl md:mr-4"
              />
            </div>
            <AnimatedButton
              initialWidth={130}
              hoverWidth={145}
              chevronClassName="text-secondary bg-primary"
              buttonClassName="h-14 bg-secondary text-primary text-xl mt-2 md:mt-0 "
            >
              Submit
            </AnimatedButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
