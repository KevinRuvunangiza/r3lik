import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TbBarcode, TbMenu2, TbX } from 'react-icons/tb';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 border-b text-xs uppercase tracking-widest relative z-20 w-full font-mono backdrop-blur-sm" style={{ borderColor: 'var(--color-roan-rouge)', backgroundColor: 'rgba(30, 24, 33, 0.95)' }}>
      {/* Logo and Mobile Menu Toggle */}
      <div className="flex items-center justify-between w-full sm:w-auto gap-4">
        <Link to="/">
          <motion.span 
            className="font-bold text-base sm:text-lg tracking-[0.2em]"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ color: 'var(--color-aster-petal)' }}
          >
            R3LIK <sup className="text-[10px]">©25</sup>
          </motion.span>
        </Link>
        
        {/* Mobile Menu Toggle Button */}
        <button 
          className="sm:hidden flex items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ color: 'var(--color-twilight-mauve)' }}
        >
          {isMenuOpen ? <TbX className="text-2xl" /> : <TbMenu2 className="text-2xl" />}
        </button>
      </div>

      {/* Breadcrumb - Hidden on small screens */}
      <span className="hidden lg:inline text-[10px]" style={{ color: 'var(--color-twilight-mauve)' }}>
        // SYS_DIR: {location.pathname === '/' ? 'MAIN_TERMINAL' : location.pathname.toUpperCase().replace('/', '')}
      </span>

      {/* Navigation Menu */}
      <ul className={`flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-12 font-mono w-full sm:w-auto ${isMenuOpen ? 'block mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0' : 'hidden sm:flex'} sm:flex`} style={isMenuOpen ? { borderColor: 'var(--color-twilight-mauve)' } : {}}>
        {[
          { name: 'Main', path: '/' },
          { name: 'Catalog', path: '/catalog' },
          { name: 'About Us', path: '/archive' }
        ].map((item) => (
          <li key={item.name}>
            <Link to={item.path} onClick={() => setIsMenuOpen(false)}>
              <motion.span 
                whileHover={{ scale: 1.05, textShadow: "0px 0px 8px rgba(212, 219, 226, 0.8)" }}
                className={`cursor-pointer transition-colors text-sm sm:text-xs ${location.pathname === item.path ? 'border-b pb-1' : ''}`}
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

      {/* Right Section - Status Indicator */}
      <div className="hidden sm:flex items-center gap-2 font-mono md:absolute md:right-6">
        <span className="animate-pulse hidden sm:inline text-[10px]" style={{ color: 'var(--color-roan-rouge)' }}>NET_ONLINE</span>
        <TbBarcode className="text-xl sm:text-2xl" style={{ color: 'var(--color-twilight-mauve)' }} />
      </div>
    </nav>
  );
}