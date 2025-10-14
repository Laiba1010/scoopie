'use client';

import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

import { Link } from 'react-router';
import { NavItem } from './nav-item';

import { AnimatedButton } from '../animated-button';
import { NavDropdown } from './nav-dropdown';

export function Navbar() {
  const navItems = [
    { label: 'Recipes', href: '/recipes' },
    { label: 'About Us', href: '/about' },
    { label: 'News', href: '/news' },
  ];

  return (
    <header className="bg-slate-400 w-full p-4 font-ibm sticky top-0 z-50 bg-transparent flex justify-center items-center">
      <div className=" grid grid-cols-3 max-w-[110rem] mx-auto w-full bg-secondary  px-4 py-3 text-primary 2xl:h-[5.8rem] h-20 rounded-[24px] relative">
        {/* LEFT SECTION */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center justify-center gap-6 px-6">
            <NavDropdown />
            {navItems.map((item) => (
              <NavItem key={item.label} {...item} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* CENTER SECTION */}

        <Link
          to="/"
          className=" max-h-[4.2rem] overflow-hidden flex items-center justify-center"
        >
          <img src="/logo.png" alt="Logo" className="object-cover w-56" />
        </Link>

        {/* RIGHT SECTION */}
        <div className="flex items-center justify-end gap-3 px-6">
          <AnimatedButton
            initialWidth={140}
            hoverWidth={155}
            chevronClassName="text-white "
          >
            Explore Now
          </AnimatedButton>
          <AnimatedButton
            initialWidth={140}
            hoverWidth={155}
            chevronClassName="text-secondary bg-primary"
            buttonClassName=" border bg-transparent text-primary"
          >
            Dine with Us
          </AnimatedButton>
        </div>
      </div>
    </header>
  );
}
