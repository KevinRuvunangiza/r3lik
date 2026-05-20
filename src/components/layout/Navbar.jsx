import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbBarcode, TbMenu2, TbX } from 'react-icons/tb';
import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { name: 'Main', path: '/' },
  { name: 'Catalog', path: '/catalog' },
  { name: 'About Us', path: '/archive' },
];

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className="relative z-20 w-full font-mono backdrop-blur-sm"
      style={{
        borderBottom: '1px solid var(--color-roan-rouge)',
        backgroundColor: 'rgba(30, 24, 33, 0.95)',
      }}
    >
      {/* Main row */}
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo */}
        <Link to="/">
          <motion.span
            className="font-bold text-base sm:text-lg tracking-[0.2em]"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            style={{ color: 'var(--color-aster-petal)' }}
          >
            R3LIK <sup className="text-[10px]">©25</sup>
          </motion.span>
        </Link>

        {/* Breadcrumb — desktop only */}
        <span
          className="hidden lg:inline text-[10px]"
          style={{ color: 'var(--color-twilight-mauve)' }}
        >
          // SYS_DIR:{' '}
          {location.pathname === '/'
            ? 'MAIN_TERMINAL'
            : location.pathname.toUpperCase().replace('/', '')}
        </span>

        {/* Desktop nav */}
        <ul className="hidden sm:flex gap-8 md:gap-12">
          {NAV_ITEMS.map((item) => (
            <li key={item.name}>
              <Link to={item.path}>
                <motion.span
                  whileHover={{
                    scale: 1.05,
                    textShadow: '0px 0px 8px rgba(212, 219, 226, 0.8)',
                  }}
                  className={`cursor-pointer transition-colors text-xs uppercase tracking-widest ${
                    location.pathname === item.path ? 'border-b pb-1' : ''
                  }`}
                  style={{
                    color:
                      location.pathname === item.path
                        ? 'var(--color-aster-petal)'
                        : 'var(--color-twilight-mauve)',
                    borderColor:
                      location.pathname === item.path
                        ? 'var(--color-aster-petal)'
                        : 'transparent',
                  }}
                >
                  {item.name}
                </motion.span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Right section — desktop */}
        <div className="hidden sm:flex items-center gap-2">
          <span
            className="animate-pulse text-[10px]"
            style={{ color: 'var(--color-roan-rouge)' }}
          >
            NET_ONLINE
          </span>
          <TbBarcode
            className="text-xl sm:text-2xl"
            style={{ color: 'var(--color-twilight-mauve)' }}
          />
        </div>

        {/* Mobile: status + hamburger */}
        <div className="flex sm:hidden items-center gap-3">
          <span
            className="animate-pulse text-[10px]"
            style={{ color: 'var(--color-roan-rouge)' }}
          >
            NET_ONLINE
          </span>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            style={{ color: 'var(--color-twilight-mauve)' }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <TbX className="text-2xl" />
            ) : (
              <TbMenu2 className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.ul
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="flex flex-col sm:hidden overflow-hidden"
            style={{ borderTop: '1px solid var(--color-twilight-mauve)' }}
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-sm uppercase tracking-widest transition-colors"
                  style={{
                    color:
                      location.pathname === item.path
                        ? 'var(--color-aster-petal)'
                        : 'var(--color-twilight-mauve)',
                    borderLeft:
                      location.pathname === item.path
                        ? '2px solid var(--color-aster-petal)'
                        : '2px solid transparent',
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}