'use client';

import { useState } from 'react';

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

export const MobileProductSelect = () => {
  const [tab, setTab] = useState('popular');

  return (
    <div className="md:hidden flex justify-center mb-8">
      <Select value={tab} onValueChange={(value) => setTab(value)}>
        <SelectTrigger className="w-[70%] bg-secondary border-none font-baloo font-normal text-primary  rounded-lg py-6  px-4 text-base  focus:outline-none">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent
          sideOffset={6}
          className=" bg-primary text-base font-baloo text-secondary border-none rounded-lg shadow-lg"
        >
          <SelectItem value="popular" className="p-3 hover:bg-secondary/10">
            Most Popular
          </SelectItem>
          <SelectItem value="shakes" className="p-3 hover:bg-secondary/10">
            Shakes
          </SelectItem>
          <SelectItem value="icecreams" className="p-3 hover:bg-secondary/10">
            Ice Creams
          </SelectItem>
          <SelectItem value="freshsip" className="p-3 hover:bg-secondary/10">
            Fresh Sip
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
