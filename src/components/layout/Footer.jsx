import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t p-3 sm:p-4 text-[10px] uppercase font-mono flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 relative z-20 w-full" style={{ borderColor: 'var(--color-roan-rouge)', backgroundColor: 'rgba(30, 24, 33, 0.95)', color: 'var(--color-twilight-mauve)' }}>
      <div className="text-center sm:text-left order-2 sm:order-1">
        <span>R3LIK_SYSTEMS © 2025</span>
        <span className="mx-2 hidden sm:inline">|</span>
        <span className="sm:hidden">|</span>
        <span className="mx-2">JHB_ZA</span>
      </div>
      <div className="flex gap-2 sm:gap-4 text-center flex-wrap justify-center order-1 sm:order-2">
        <a href="#" className="transition-colors hover:text-white text-[9px] sm:text-[10px]" style={{ color: 'var(--color-twilight-mauve)' }}>Terms_of_Service</a>
        <span className="hidden sm:inline">|</span>
        <a href="#" className="transition-colors hover:text-white text-[9px] sm:text-[10px]" style={{ color: 'var(--color-twilight-mauve)' }}>Privacy_Protocol</a>
      </div>
    </footer>
  );
}