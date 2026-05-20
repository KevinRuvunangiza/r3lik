import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbCrosshair, TbGridDots, TbActivity } from "react-icons/tb";
import { Link } from "react-router-dom";
import { fetchCatalog } from "../utils/shopify";

export default function CatalogPage() {
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHoveringEquip, setIsHoveringEquip] = useState(false);

  // Fetch data from Shopify on component mount
  useEffect(() => {
    async function loadProducts() {
      try {
        const liveData = await fetchCatalog();
        setItems(liveData);
        if (liveData.length > 0) {
          setActiveItem(liveData[0]); // Set the first product as the default active item
        }
      } catch (error) {
        console.error("Failed to load catalog:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadProducts();
  }, []);

  const glitchVariant = {
    hover: {
      x: [-2, 2, -2, 0],
      opacity: [1, 0.8, 1],
      transition: { duration: 0.2, repeat: Infinity, repeatType: "mirror" },
    },
    rest: { x: 0, opacity: 1 },
  };

  // Loading State UI
  if (isLoading) {
    return (
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center font-mono selection:bg-[#f4f4f4] selection:text-[#050505]" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-twilight-mauve)' }}>
        <TbActivity className="text-4xl animate-pulse mb-4" style={{ color: 'var(--color-roan-rouge)' }} />
        <p className="animate-pulse text-xs tracking-widest uppercase">Establishing Secure Connection to Inventory_DB...</p>
      </div>
    );
  }

  // Fallback if store is empty
  if (!items.length || !activeItem) {
    return (
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center font-mono selection:bg-[#f4f4f4] selection:text-[#050505]" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-twilight-mauve)' }}>
        <p className="text-xs tracking-widest uppercase">ERR: NO_ASSETS_FOUND</p>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen text-[#f4f4f4] flex flex-col selection:bg-[#f4f4f4] selection:text-[#050505]" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* CRT Overlays */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-10">
        <div className="w-full h-[10px] bg-white/20 blur-[2px] animate-scanline" />
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-40 mix-blend-overlay opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 51%)",
          backgroundSize: "100% 4px",
        }}
      />

      <main className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 relative z-10 w-full flex-grow font-mono">
        {/* LEFT PANEL: Filters / Categories */}
        <div className="md:col-span-2 flex flex-col gap-8">
          <div className="border p-4" style={{ borderColor: 'var(--color-twilight-mauve)', backgroundColor: 'rgba(85, 48, 58, 0.1)' }}>
            <h3 className="text-xs mb-4 pb-2" style={{ color: 'var(--color-twilight-mauve)', borderBottom: '1px solid', borderColor: 'var(--color-twilight-mauve)' }}>
              SYS_FILTERS
            </h3>
            <ul className="space-y-3 text-sm">
              {["ALL_ITEMS", "OUTERWEAR", "LEGWEAR", "ACCESSORIES"].map(
                (filter, i) => (
                  <li
                    key={filter}
                    className={`cursor-pointer transition-colors flex items-center gap-2`}
                    style={{ color: i === 0 ? 'var(--color-aster-petal)' : 'var(--color-twilight-mauve)' }}
                  >
                    {i === 0 && <span className="text-xs">▶</span>} {filter}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* CENTER PANEL: Database Grid */}
        <div className="md:col-span-6 border p-4 h-[75vh] overflow-y-auto custom-scrollbar" style={{ borderColor: 'var(--color-twilight-mauve)', backgroundColor: 'rgba(95, 79, 126, 0.1)' }}>
          <div className="flex justify-between items-center mb-6 pb-2" style={{ borderBottom: '1px solid', borderColor: 'var(--color-twilight-mauve)', color: 'var(--color-twilight-mauve)' }}>
            <h3 className="text-xs">
              AVAILABLE_ASSETS ({items.length})
            </h3>
            <TbGridDots />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {items.map((item) => (
              <Link key={item.id} to={`/catalog/${item.id}`}>
                <motion.div
                  onMouseEnter={() => setActiveItem(item)}
                  whileHover={{ scale: 0.98 }}
                  className={`border p-3 cursor-pointer transition-colors flex flex-col justify-between min-h-[160px]`}
                  style={{
                    borderColor: activeItem.id === item.id ? 'var(--color-aster-petal)' : 'var(--color-twilight-mauve)',
                    backgroundColor: activeItem.id === item.id ? 'rgba(85, 48, 58, 0.4)' : 'transparent'
                  }}
                >
                <div className="flex justify-between items-start">
                  <span className="text-[10px]" style={{ color: 'var(--color-twilight-mauve)' }}>{item.id}</span>
                  {activeItem.id === item.id && (
                    <TbCrosshair className="animate-spin-slow" style={{ color: 'var(--color-roan-rouge)' }} />
                  )}
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--color-twilight-mauve)' }}>{item.sys_name}</p>
                  <h4 className="text-sm font-bold uppercase truncate" style={{ color: 'var(--color-aster-petal)' }}>
                    {item.title}
                  </h4>
                  <p className="text-xs mt-2" style={{ color: 'var(--color-bottlefly-wings)' }}>{item.price}</p>
                </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL: The Inspector (Character Select View) */}
        <div className="md:col-span-4 border flex flex-col relative overflow-hidden min-h-[75vh]" style={{ borderColor: 'var(--color-twilight-mauve)', backgroundColor: 'rgba(95, 79, 126, 0.1)' }}>
          {/* Background ID Text */}
          <div
            className="absolute top-10 -right-10 text-[8vw] font-black rotate-90 pointer-events-none select-none tracking-tighter opacity-20"
            style={{ fontFamily: "Syncopate", color: 'var(--color-twilight-mauve)' }}
          >
            {activeItem.id}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full z-10"
            >
              {/* Clickable Image / Mannequin Container */}
              <Link 
                to={`/catalog/${activeItem.id}`}
                className="flex-grow relative flex items-center justify-center p-4 group cursor-pointer overflow-hidden"
                style={{ borderBottom: '1px solid', borderColor: 'var(--color-twilight-mauve)' }}
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="max-h-[300px] w-full object-cover grayscale contrast-125 mix-blend-lighten relative z-10"
                />
                
                {/* Overlay flash on hover */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 z-20 pointer-events-none"></div>

                {/* Corner Accents that react to hover */}
                <div className="absolute top-4 left-4 border-l-2 border-t-2 w-4 h-4 group-hover:transition-colors group-hover:duration-300" style={{ borderColor: 'var(--color-twilight-mauve)' }}></div>
                <div className="absolute bottom-4 right-4 border-r-2 border-b-2 w-4 h-4 group-hover:transition-colors group-hover:duration-300" style={{ borderColor: 'var(--color-twilight-mauve)' }}></div>
              </Link>

              {/* Data Block */}
              <div className="p-6 backdrop-blur-sm" style={{ backgroundColor: 'rgba(30, 24, 33, 0.95)' }}>
                <h2
                  className="text-2xl font-bold uppercase mb-1 tracking-tight"
                  style={{ fontFamily: "Syncopate", color: 'var(--color-aster-petal)' }}
                >
                  {activeItem.title}
                </h2>
                <p className="text-lg mb-6" style={{ color: 'var(--color-bottlefly-wings)' }}>{activeItem.price}</p>

                <div className="space-y-2 text-xs mb-6 py-4" style={{ borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'var(--color-roan-rouge)', color: 'var(--color-twilight-mauve)' }}>
                  <div className="flex justify-between">
                    <span>Class</span>
                    <span style={{ color: 'var(--color-bottlefly-wings)' }}>{activeItem.armor_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Material</span>
                    <span style={{ color: 'var(--color-bottlefly-wings)' }}>{activeItem.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weight</span>
                    <span style={{ color: 'var(--color-bottlefly-wings)' }}>{activeItem.weight}</span>
                  </div>
                </div>

                <p className="text-xs leading-relaxed mb-8" style={{ color: 'var(--color-twilight-mauve)' }}>
                  {activeItem.description}
                </p>

                {/* Equip Button */}
                <Link to={`/catalog/${activeItem.id}`} className="block w-full mt-auto">
                  <motion.button
                    onMouseEnter={() => setIsHoveringEquip(true)}
                    onMouseLeave={() => setIsHoveringEquip(false)}
                    whileHover="hover"
                    initial="rest"
                    className="w-full p-4 text-sm font-bold uppercase transition-all flex justify-between items-center group"
                    style={{
                      borderColor: 'var(--color-roan-rouge)',
                      border: '1px solid',
                      color: isHoveringEquip ? 'var(--color-night-demons)' : 'var(--color-aster-petal)',
                      backgroundColor: isHoveringEquip ? 'var(--color-aster-petal)' : 'transparent'
                    }}
                  >
                    <motion.span variants={glitchVariant}>
                      {isHoveringEquip ? "INSPECT_ASSET" : "EQUIP_ITEM"}
                    </motion.span>
                    <span>{isHoveringEquip ? "▶" : "+"}</span>
                  </motion.button>
                </Link>
                
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Global Style for Custom Scrollbar */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar { scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { display: none; }
      `,
        }}
      />
    </div>
  );
}