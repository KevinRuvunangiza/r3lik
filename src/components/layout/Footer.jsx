import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t p-4 text-[10px] uppercase font-mono flex justify-between items-center relative z-20 w-full" style={{ borderColor: 'var(--color-roan-rouge)', backgroundColor: 'rgba(30, 24, 33, 0.95)', color: 'var(--color-twilight-mauve)' }}>
      <div>
        <span>R3LIK_SYSTEMS © 2025</span>
        <span className="mx-2">|</span>
        <span>JHB_ZA</span>
      </div>
      <div className="flex gap-4">
        <a href="#" className="transition-colors hover:text-white" style={{ color: 'var(--color-twilight-mauve)' }}>Terms_of_Service</a>
        <a href="#" className="transition-colors hover:text-white" style={{ color: 'var(--color-twilight-mauve)' }}>Privacy_Protocol</a>
      </div>
    </footer>
  );
}