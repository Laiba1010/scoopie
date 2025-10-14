'use client';

import {
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface NavItemProps {
  label: string;
  href: string;
}

export function NavItem({ label, href }: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative text-sm font-semibold hover:text-primary transition-colors"
        >
          {label}

          {/* 🔥 Animated underline */}
          <AnimatePresence mode="wait">
            {isHovered && (
              <motion.div
                key="underline"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="absolute -bottom-1 left-0 h-[2px] bg-primary rounded-full"
              />
            )}
          </AnimatePresence>
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
