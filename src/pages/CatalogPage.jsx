import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbCrosshair, TbBarcode, TbGridDots } from "react-icons/tb";
import { Link } from "react-router-dom";
import data from "../data/catalog.json";

const R3LIK_DB = data;

export default function CatalogPage() {
  const [activeItem, setActiveItem] = useState(R3LIK_DB.items[0]);
  const [isHoveringEquip, setIsHoveringEquip] = useState(false);

  const glitchVariant = {
    hover: {
      x: [-2, 2, -2, 0],
      opacity: [1, 0.8, 1],
      transition: { duration: 0.2, repeat: Infinity, repeatType: "mirror" },
    },
    rest: { x: 0, opacity: 1 },
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-[#f4f4f4] flex flex-col selection:bg-[#f4f4f4] selection:text-[#050505]">
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
          <div className="border border-zinc-800 p-4 bg-zinc-900/10">
            <h3 className="text-xs text-zinc-500 mb-4 border-b border-zinc-800 pb-2">
              SYS_FILTERS
            </h3>
            <ul className="space-y-3 text-sm">
              {["ALL_ITEMS", "OUTERWEAR", "LEGWEAR", "ACCESSORIES"].map(
                (filter, i) => (
                  <li
                    key={filter}
                    className={`cursor-pointer hover:text-white transition-colors flex items-center gap-2 ${i === 0 ? "text-white" : "text-zinc-500"}`}
                  >
                    {i === 0 && <span className="text-xs">▶</span>} {filter}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* CENTER PANEL: Database Grid */}
        <div className="md:col-span-6 border border-zinc-800 bg-zinc-900/10 p-4 h-[75vh] overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-2">
            <h3 className="text-xs text-zinc-500">
              AVAILABLE_ASSETS ({R3LIK_DB.items.length})
            </h3>
            <TbGridDots className="text-zinc-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {R3LIK_DB.items.map((item) => (
              <Link key={item.id} to={`/catalog/${item.id}`}>
                <motion.div
                  onMouseEnter={() => setActiveItem(item)}
                  whileHover={{ scale: 0.98 }}
                  className={`border p-3 cursor-pointer transition-colors flex flex-col justify-between min-h-[160px] ${activeItem.id === item.id ? "border-zinc-300 bg-zinc-900/40" : "border-zinc-800 hover:border-zinc-500"}`}
                >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-zinc-500">{item.id}</span>
                  {activeItem.id === item.id && (
                    <TbCrosshair className="animate-spin-slow text-zinc-400" />
                  )}
                </div>
                <div>
                  <p className="text-xs text-zinc-400 mb-1">{item.sys_name}</p>
                  <h4 className="text-sm font-bold uppercase truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs mt-2">{item.price}</p>
                </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL: The Inspector (Character Select View) */}
        <div className="md:col-span-4 border border-zinc-800 flex flex-col relative overflow-hidden bg-zinc-900/20 min-h-[75vh]">
          {/* Background ID Text */}
          <div
            className="absolute top-10 -right-10 text-[8vw] font-black text-zinc-800/20 rotate-90 pointer-events-none select-none tracking-tighter"
            style={{ fontFamily: "Syncopate" }}
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
              {/* MODIFIED: Clickable Image / Mannequin Container */}
              <Link 
                to={`/catalog/${activeItem.id}`}
                className="flex-grow border-b border-zinc-800 relative flex items-center justify-center p-4 group cursor-pointer overflow-hidden"
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
                <div className="absolute top-4 left-4 border-l-2 border-t-2 border-zinc-500 w-4 h-4 group-hover:border-zinc-300 transition-colors z-20"></div>
                <div className="absolute bottom-4 right-4 border-r-2 border-b-2 border-zinc-500 w-4 h-4 group-hover:border-zinc-300 transition-colors z-20"></div>
              </Link>

              {/* Data Block */}
              <div className="p-6 bg-[#050505]/80 backdrop-blur-sm">
                <h2
                  className="text-2xl font-bold uppercase mb-1 tracking-tight"
                  style={{ fontFamily: "Syncopate" }}
                >
                  {activeItem.title}
                </h2>
                <p className="text-lg mb-6">{activeItem.price}</p>

                <div className="space-y-2 text-xs mb-6 border-y border-zinc-800 py-4">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Class</span>
                    <span>{activeItem.armor_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Material</span>
                    <span>{activeItem.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Weight</span>
                    <span>{activeItem.weight}</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed mb-8">
                  {activeItem.description}
                </p>

                {/* Equip Button (Add to Cart) */}
                <Link to={`/catalog/${activeItem.id}`} className="block w-full mt-auto">
                  <motion.button
                    onMouseEnter={() => setIsHoveringEquip(true)}
                    onMouseLeave={() => setIsHoveringEquip(false)}
                    whileHover="hover"
                    initial="rest"
                    className="w-full border border-zinc-500 p-4 text-sm font-bold uppercase hover:bg-[#f4f4f4] hover:text-[#050505] transition-all flex justify-between items-center group"
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