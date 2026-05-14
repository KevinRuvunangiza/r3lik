import React from 'react';
import { motion } from 'framer-motion';
import { TbBarcode } from 'react-icons/tb';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="flex flex-col md:flex-row justify-center items-center p-6 border-b border-zinc-800 text-xs uppercase tracking-widest relative z-20 w-full font-mono bg-[#050505]/80 backdrop-blur-sm gap-6">
      <div className="flex items-center gap-4 md:absolute md:left-6">
        <Link to="/">
          <motion.span 
            className="font-bold text-lg tracking-[0.2em]"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            R3LIK <sup className="text-[10px]">©25</sup>
          </motion.span>
        </Link>
        {/* Breadcrumb style path indicator */}
        <span className="text-zinc-500 hidden md:inline">
          // SYS_DIR: {location.pathname === '/' ? 'MAIN_TERMINAL' : location.pathname.toUpperCase().replace('/', '')}
        </span>
      </div>

      <ul className="flex gap-12 font-mono">
        {[
          { name: 'Main', path: '/' },
          { name: 'Catalog', path: '/catalog' },
          { name: 'Archive', path: '/archive' }
        ].map((item) => (
          <li key={item.name}>
            <Link to={item.path}>
              <motion.span 
                whileHover={{ scale: 1.05, textShadow: "0px 0px 8px rgba(244,244,244,0.8)" }}
                className={`cursor-pointer transition-colors hover:text-white ${location.pathname === item.path ? 'text-white border-b border-white pb-1' : 'text-zinc-500'}`}
              >
                {item.name}
              </motion.span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 font-mono md:absolute md:right-6">
        <span className="animate-pulse text-green-500 hidden sm:inline">NET_ONLINE</span>
        <TbBarcode className="text-2xl text-zinc-500" />
      </div>
    </nav>
  );
}