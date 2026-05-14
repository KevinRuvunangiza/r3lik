import React from 'react';
import { motion } from 'framer-motion';
import { TbBarcode } from 'react-icons/tb';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="flex flex-col md:flex-row justify-center items-center p-6 border-b text-xs uppercase tracking-widest relative z-20 w-full font-mono backdrop-blur-sm gap-6" style={{ borderColor: 'var(--color-roan-rouge)', backgroundColor: 'rgba(30, 24, 33, 0.95)' }}>
      <div className="flex items-center gap-4 md:absolute md:left-6">
        <Link to="/">
          <motion.span 
            className="font-bold text-lg tracking-[0.2em]"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ color: 'var(--color-aster-petal)' }}
          >
            R3LIK <sup className="text-[10px]">©25</sup>
          </motion.span>
        </Link>
        {/* Breadcrumb style path indicator */}
        <span className="hidden md:inline" style={{ color: 'var(--color-twilight-mauve)' }}>
          // SYS_DIR: {location.pathname === '/' ? 'MAIN_TERMINAL' : location.pathname.toUpperCase().replace('/', '')}
        </span>
      </div>

      <ul className="flex gap-12 font-mono">
        {[
          { name: 'Main', path: '/' },
          { name: 'Catalog', path: '/catalog' },
          { name: 'About Us', path: '/archive' }
        ].map((item) => (
          <li key={item.name}>
            <Link to={item.path}>
              <motion.span 
                whileHover={{ scale: 1.05, textShadow: "0px 0px 8px rgba(212, 219, 226, 0.8)" }}
                className={`cursor-pointer transition-colors ${location.pathname === item.path ? 'border-b pb-1' : ''}`}
                style={{
                  color: location.pathname === item.path ? 'var(--color-aster-petal)' : 'var(--color-twilight-mauve)',
                  borderColor: location.pathname === item.path ? 'var(--color-aster-petal)' : 'transparent'
                }}
              >
                {item.name}
              </motion.span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 font-mono md:absolute md:right-6">
        <span className="animate-pulse hidden sm:inline" style={{ color: 'var(--color-roan-rouge)' }}>NET_ONLINE</span>
        <TbBarcode className="text-2xl" style={{ color: 'var(--color-twilight-mauve)' }} />
      </div>
    </nav>
  );
}