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

  useEffect(() => {
    async function loadProducts() {
      try {
        const liveData = await fetchCatalog();
        setItems(liveData);
        if (liveData.length > 0) {
          setActiveItem(liveData[0]);
        }
      } catch (error) {
        console.error("Failed to load catalog:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  // FIX 2: glitchVariant now lives on the parent motion.button via `variants`,
  // so child motion.span inherits and the animation actually fires.
  const glitchVariant = {
    hover: {
      x: [-2, 2, -2, 0],
      opacity: [1, 0.8, 1],
      transition: { duration: 0.2, repeat: Infinity, repeatType: "mirror" },
    },
    rest: { x: 0, opacity: 1 },
  };

  if (isLoading) {
    return (
      <div
        className="relative w-full min-h-screen flex flex-col items-center justify-center font-mono selection:bg-[#f4f4f4] selection:text-[#050505]"
        style={{ backgroundColor: "var(--color-background)", color: "var(--color-twilight-mauve)" }}
      >
        <TbActivity className="text-4xl animate-pulse mb-4" style={{ color: "var(--color-roan-rouge)" }} />
        <p className="animate-pulse text-xs tracking-widest uppercase">
          Establishing Secure Connection to Inventory_DB...
        </p>
      </div>
    );
  }

  // FIX 3: Guard against null activeItem — show fallback if store empty OR activeItem not yet set
  if (!items.length || !activeItem) {
    return (
      <div
        className="relative w-full min-h-screen flex flex-col items-center justify-center font-mono selection:bg-[#f4f4f4] selection:text-[#050505]"
        style={{ backgroundColor: "var(--color-background)", color: "var(--color-twilight-mauve)" }}
      >
        <p className="text-xs tracking-widest uppercase">ERR: NO_ASSETS_FOUND</p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full min-h-screen text-[#f4f4f4] flex flex-col selection:bg-[#f4f4f4] selection:text-[#050505]"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* CRT Overlays */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-10">
        <div className="w-full h-[10px] bg-white/20 blur-[2px] animate-scanline" />
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-40 mix-blend-overlay opacity-20"
        style={{
          backgroundImage: "linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 51%)",
          backgroundSize: "100% 4px",
        }}
      />

      <main className="p-3 sm:p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-4 relative z-10 w-full flex-grow font-mono auto-rows-max lg:auto-rows-auto">
        {/* LEFT PANEL */}
        <div className="hidden lg:flex lg:col-span-2 flex-col gap-4 md:gap-8">
          <div
            className="border p-3 sm:p-4"
            style={{ borderColor: "var(--color-twilight-mauve)", backgroundColor: "rgba(85, 48, 58, 0.1)" }}
          >
            <h3
              className="text-xs mb-3 sm:mb-4 pb-2 text-[11px] sm:text-xs"
              style={{ color: "var(--color-twilight-mauve)", borderBottom: "1px solid", borderColor: "var(--color-twilight-mauve)" }}
            >
              SYS_FILTERS
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              {["ALL_ITEMS", "OUTERWEAR", "LEGWEAR", "ACCESSORIES"].map((filter, i) => (
                <li
                  key={filter}
                  className="cursor-pointer transition-colors flex items-center gap-2 text-[11px] sm:text-sm"
                  style={{ color: i === 0 ? "var(--color-aster-petal)" : "var(--color-twilight-mauve)" }}
                >
                  {i === 0 && <span className="text-xs">▶</span>} {filter}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CENTER PANEL */}
        <div
          className="lg:col-span-5 border p-3 sm:p-4 max-h-[60vh] md:max-h-[70vh] lg:max-h-[75vh] overflow-y-auto custom-scrollbar"
          style={{ borderColor: "var(--color-twilight-mauve)", backgroundColor: "rgba(95, 79, 126, 0.1)" }}
        >
          <div
            className="flex justify-between items-center mb-4 sm:mb-6 pb-2 text-[11px] sm:text-xs"
            style={{ borderBottom: "1px solid", borderColor: "var(--color-twilight-mauve)", color: "var(--color-twilight-mauve)" }}
          >
            <h3>AVAILABLE_ASSETS ({items.length})</h3>
            <TbGridDots className="text-lg" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {items.map((item) => (
              <Link key={item.id} to={`/catalog/${item.id}`}>
                <motion.div
                  onMouseEnter={() => setActiveItem(item)}
                  whileHover={{ scale: 0.98 }}
                  className="border p-2 sm:p-3 cursor-pointer transition-colors flex flex-col justify-between min-h-[140px] sm:min-h-[160px]"
                  style={{
                    // FIX 3: safe optional chaining — no crash if activeItem is null
                    borderColor: activeItem?.id === item.id ? "var(--color-aster-petal)" : "var(--color-twilight-mauve)",
                    backgroundColor: activeItem?.id === item.id ? "rgba(85, 48, 58, 0.4)" : "transparent",
                  }}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] sm:text-[10px]" style={{ color: "var(--color-twilight-mauve)" }}>
                      {item.id}
                    </span>
                    {activeItem?.id === item.id && (
                      <TbCrosshair className="animate-spin-slow text-sm" style={{ color: "var(--color-roan-rouge)" }} />
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs mb-1" style={{ color: "var(--color-twilight-mauve)" }}>
                      {item.sys_name}
                    </p>
                    <h4 className="text-xs sm:text-sm font-bold uppercase truncate" style={{ color: "var(--color-aster-petal)" }}>
                      {item.title}
                    </h4>
                    <p className="text-[10px] sm:text-xs mt-2" style={{ color: "var(--color-bottlefly-wings)" }}>
                      {item.price}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL: Inspector */}
        <div
          className="lg:col-span-5 border flex flex-col relative overflow-hidden min-h-[50vh] md:min-h-[60vh] lg:min-h-[75vh]"
          style={{ borderColor: "var(--color-twilight-mauve)", backgroundColor: "rgba(95, 79, 126, 0.1)" }}
        >
          <div
            className="absolute top-8 -right-8 text-[6vw] sm:text-[8vw] font-black rotate-90 pointer-events-none select-none tracking-tighter opacity-20"
            style={{ fontFamily: "Syncopate", color: "var(--color-twilight-mauve)" }}
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
              <Link
                to={`/catalog/${activeItem.id}`}
                className="flex-grow relative flex items-center justify-center p-3 sm:p-4 group cursor-pointer overflow-hidden"
                style={{ borderBottom: "1px solid", borderColor: "var(--color-twilight-mauve)" }}
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="max-h-[250px] sm:max-h-[300px] w-full object-cover grayscale contrast-125 mix-blend-lighten relative z-10"
                />
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 z-20 pointer-events-none" />
                <div
                  className="absolute top-2 sm:top-4 left-2 sm:left-4 border-l-2 border-t-2 w-3 sm:w-4 h-3 sm:h-4"
                  style={{ borderColor: "var(--color-twilight-mauve)" }}
                />
                <div
                  className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 border-r-2 border-b-2 w-3 sm:w-4 h-3 sm:h-4"
                  style={{ borderColor: "var(--color-twilight-mauve)" }}
                />
              </Link>

              {/* Data Block */}
              {/* FIX 1: lg:max-h-none instead of invalid lg:max-h-auto */}
              <div
                className="p-3 sm:p-4 md:p-6 backdrop-blur-sm overflow-y-auto max-h-[40%] lg:max-h-none"
                style={{ backgroundColor: "rgba(30, 24, 33, 0.95)" }}
              >
                <h2
                  className="text-xl sm:text-2xl font-bold uppercase mb-1 tracking-tight"
                  style={{ fontFamily: "Syncopate", color: "var(--color-aster-petal)" }}
                >
                  {activeItem.title}
                </h2>
                <p className="text-base sm:text-lg mb-3 sm:mb-6" style={{ color: "var(--color-bottlefly-wings)" }}>
                  {activeItem.price}
                </p>

                <div
                  className="space-y-1 sm:space-y-2 text-[10px] sm:text-xs mb-3 sm:mb-6 py-2 sm:py-4"
                  style={{
                    borderTop: "1px solid",
                    borderBottom: "1px solid",
                    borderColor: "var(--color-roan-rouge)",
                    color: "var(--color-twilight-mauve)",
                  }}
                >
                  <div className="flex justify-between">
                    <span>Class</span>
                    <span style={{ color: "var(--color-bottlefly-wings)" }}>{activeItem.armor_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Material</span>
                    <span style={{ color: "var(--color-bottlefly-wings)" }}>{activeItem.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weight</span>
                    <span style={{ color: "var(--color-bottlefly-wings)" }}>{activeItem.weight}</span>
                  </div>
                </div>

                <p className="text-[10px] sm:text-xs leading-relaxed mb-3 sm:mb-8" style={{ color: "var(--color-twilight-mauve)" }}>
                  {activeItem.description}
                </p>

                {/* FIX 2: variants on motion.button so child motion.span inherits them correctly */}
                <Link to={`/catalog/${activeItem.id}`} className="block w-full mt-auto">
                  <motion.button
                    onMouseEnter={() => setIsHoveringEquip(true)}
                    onMouseLeave={() => setIsHoveringEquip(false)}
                    variants={glitchVariant}
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                    className="w-full p-2 sm:p-3 md:p-4 text-xs sm:text-sm font-bold uppercase transition-all flex justify-between items-center group"
                    style={{
                      border: "1px solid",
                      borderColor: "var(--color-roan-rouge)",
                      color: isHoveringEquip ? "var(--color-night-demons)" : "var(--color-aster-petal)",
                      backgroundColor: isHoveringEquip ? "var(--color-aster-petal)" : "transparent",
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