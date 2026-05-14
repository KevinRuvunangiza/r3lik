import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TbArrowLeft, TbActivity, TbHexagon } from "react-icons/tb";
import data from "../data/catalog.json";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [isHoveringConfirm, setIsHoveringConfirm] = useState(false);

  // Fetch the specific item from our JSON based on the URL parameter
  const item = data.items.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="flex-grow flex items-center justify-center font-mono text-zinc-500 flex-col gap-4">
        <TbActivity className="text-4xl animate-pulse text-red-500" />
        <p>ERR_404: ASSET_NOT_FOUND</p>
        <Link to="/catalog" className="border border-zinc-700 p-2 hover:bg-white hover:text-black transition-colors">
          RETURN_TO_ROSTER
        </Link>
      </div>
    );
  }

  // Helper to generate a retro "Stat Bar" based on mock values
  const renderStatBar = (label, level) => (
    <div className="mb-4">
      <div className="flex justify-between text-[10px] text-zinc-500 mb-1 uppercase">
        <span>{label}</span>
        <span>LVL_{level}</span>
      </div>
      <div className="w-full h-2 bg-zinc-900 border border-zinc-800 flex">
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: `${level * 10}%` }} 
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-zinc-400"
        />
      </div>
    </div>
  );

  return (
    <div className="flex-grow flex flex-col p-4 md:p-6 font-mono relative z-10 w-full h-full">
      
      {/* Top Nav / Back Button */}
      <div className="flex justify-between items-center mb-6">
        <Link to="/catalog" className="flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors uppercase group">
          <TbArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>[ESC] Return to DB</span>
        </Link>
        <div className="text-xs text-zinc-500">INSPECTION_MODE</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-grow">
        
        {/* LEFT PANEL: Technical Specs (The Stat Block) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-3 border border-zinc-800 bg-zinc-900/10 p-6 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xs text-zinc-500 mb-6 border-b border-zinc-800 pb-2">DIAGNOSTICS</h3>
            {renderStatBar("Durability", 8)}
            {renderStatBar("Weight_Class", 5)}
            {renderStatBar("Thermal_Resist", 7)}
            
            <div className="mt-8 space-y-2 text-xs">
              <div className="flex justify-between border-b border-zinc-800 pb-1"><span className="text-zinc-600">SYS_ID</span> <span className="text-zinc-300">{item.sys_name}</span></div>
              <div className="flex justify-between border-b border-zinc-800 pb-1"><span className="text-zinc-600">CLASS</span> <span className="text-zinc-300">{item.armor_type}</span></div>
              <div className="flex justify-between border-b border-zinc-800 pb-1"><span className="text-zinc-600">MATERIAL</span> <span className="text-zinc-300">{item.material}</span></div>
            </div>
          </div>
          
          <TbHexagon className="text-6xl text-zinc-800 mx-auto mt-8 animate-pulse" />
        </motion.div>

        {/* CENTER PANEL: The Arena (Massive Mannequin Render) */}
        <div className="md:col-span-6 border border-zinc-800 bg-zinc-900/20 relative flex items-end justify-center overflow-hidden min-h-[50vh]">
          {/* Background Typography */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <span className="text-[15vw] font-black tracking-tighter" style={{ fontFamily: "Syncopate" }}>
              {item.id.split('-')[1]}
            </span>
          </div>

          <motion.img 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            src={item.image} 
            alt={item.title} 
            className="h-[90%] w-full object-cover grayscale contrast-125 mix-blend-lighten relative z-10"
          />
          
          {/* Scanning Line Effect on the image */}
          <motion.div 
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-[2px] bg-green-500/20 z-20 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
          />
        </div>

        {/* RIGHT PANEL: Lore & Confirmation (Add to Cart) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-3 border border-zinc-800 bg-zinc-900/10 p-6 flex flex-col justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold uppercase mb-2 tracking-tight" style={{ fontFamily: "Syncopate" }}>
              {item.title}
            </h1>
            <p className="text-xl text-zinc-300 mb-6">{item.price}</p>
            
            <div className="bg-[#050505] border border-zinc-800 p-4 relative mb-6">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-500" />
              <p className="text-xs text-zinc-400 leading-relaxed uppercase">
                {item.description}
              </p>
            </div>

            {/* Sizing Selector (Mock) */}
            <div className="mb-8">
              <h3 className="text-[10px] text-zinc-500 mb-2 uppercase">Select_Parameters</h3>
              <div className="grid grid-cols-4 gap-2">
                {['S', 'M', 'L', 'XL'].map(size => (
                  <button key={size} className="border border-zinc-800 p-2 text-xs hover:border-zinc-400 hover:text-white transition-colors">
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <motion.button 
            onMouseEnter={() => setIsHoveringConfirm(true)}
            onMouseLeave={() => setIsHoveringConfirm(false)}
            className="w-full border border-white p-4 text-sm font-bold uppercase bg-white text-black hover:bg-[#050505] hover:text-white transition-all flex justify-between items-center group relative overflow-hidden"
          >
            <span className="relative z-10">
              {isHoveringConfirm ? "CONFIRM_SELECTION" : "ADD_TO_LOADOUT"}
            </span>
            <span className="relative z-10">{isHoveringConfirm ? "↵" : "+"}</span>
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
}