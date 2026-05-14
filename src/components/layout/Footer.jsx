import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 p-4 text-[10px] uppercase font-mono text-zinc-600 flex justify-between items-center relative z-20 w-full bg-[#050505]">
      <div>
        <span>R3LIK_SYSTEMS © 2025</span>
        <span className="mx-2">|</span>
        <span>JHB_ZA</span>
      </div>
      <div className="flex gap-4">
        <a href="#" className="hover:text-white transition-colors">Terms_of_Service</a>
        <a href="#" className="hover:text-white transition-colors">Privacy_Protocol</a>
      </div>
    </footer>
  );
}