// components/CustomCenteredPopover.tsx
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface CustomCenteredPopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  width?: string;
  height?: string;
  showBackdrop?: boolean;
  className?: string;
}

export const CustomCenteredPopover: React.FC<CustomCenteredPopoverProps> = ({
  children,
  content,
  width = '400px',
  height = '300px',
  showBackdrop = true,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <>
      <div onClick={toggleOpen} className="inline-block cursor-pointer">
        {children}
      </div>

      {open &&
        createPortal(
          <>
            {showBackdrop && <div className="fixed inset-0 bg-black/40 z-40" />}
            <div
              ref={contentRef}
              className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-50 rounded shadow-lg p-4 ${className}`}
              style={{ width, height }}
            >
              {content}
            </div>
          </>,
          document.body,
        )}
    </>
  );
};
