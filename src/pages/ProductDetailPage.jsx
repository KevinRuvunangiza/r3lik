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
      <div className="flex-grow flex items-center justify-center font-mono flex-col gap-4" style={{ color: 'var(--color-twilight-mauve)' }}>
        <TbActivity className="text-4xl animate-pulse" style={{ color: 'var(--color-roan-rouge)' }} />
        <p>ERR_404: ASSET_NOT_FOUND</p>
        <Link to="/catalog" className="border p-2 transition-colors" style={{ borderColor: 'var(--color-twilight-mauve)', color: 'var(--color-twilight-mauve)' }}>
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
    <div className="flex-grow flex flex-col p-4 md:p-6 font-mono relative z-10 w-full h-full" style={{ backgroundColor: 'var(--color-background)' }}>
      
      {/* Top Nav / Back Button */}
      <div className="flex justify-between items-center mb-6">
        <Link to="/catalog" className="flex items-center gap-2 text-xs transition-colors uppercase group" style={{ color: 'var(--color-twilight-mauve)' }}>
          <TbArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>[ESC] Return to DB</span>
        </Link>
        <div className="text-xs" style={{ color: 'var(--color-twilight-mauve)' }}>INSPECTION_MODE</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-grow">
        
        {/* LEFT PANEL: Technical Specs (The Stat Block) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-3 border p-6 flex flex-col justify-between"
          style={{ borderColor: 'var(--color-twilight-mauve)', backgroundColor: 'rgba(85, 48, 58, 0.1)' }}
        >
          <div>
            <h3 className="text-xs mb-6 pb-2" style={{ color: 'var(--color-twilight-mauve)', borderBottom: '1px solid', borderColor: 'var(--color-twilight-mauve)' }}>DIAGNOSTICS</h3>
            {[
              { label: "Durability", level: 8 },
              { label: "Weight_Class", level: 5 },
              { label: "Thermal_Resist", level: 7 }
            ].map((stat) => (
              <div key={stat.label} className="mb-4">
                <div className="flex justify-between text-[10px] mb-1 uppercase" style={{ color: 'var(--color-twilight-mauve)' }}>
                  <span>{stat.label}</span>
                  <span>LVL_{stat.level}</span>
                </div>
                <div className="w-full h-2 border flex" style={{ borderColor: 'var(--color-roan-rouge)', backgroundColor: 'rgba(30, 24, 33, 0.5)' }}>
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${stat.level * 10}%` }} 
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ backgroundColor: 'var(--color-roan-rouge)' }}
                  />
                </div>
              </div>
            ))}
            
            <div className="mt-8 space-y-2 text-xs">
              <div className="flex justify-between pb-1" style={{ borderBottom: '1px solid', borderColor: 'var(--color-roan-rouge)', color: 'var(--color-twilight-mauve)' }}><span>SYS_ID</span> <span style={{ color: 'var(--color-bottlefly-wings)' }}>{item.sys_name}</span></div>
              <div className="flex justify-between pb-1" style={{ borderBottom: '1px solid', borderColor: 'var(--color-roan-rouge)', color: 'var(--color-twilight-mauve)' }}><span>CLASS</span> <span style={{ color: 'var(--color-bottlefly-wings)' }}>{item.armor_type}</span></div>
              <div className="flex justify-between pb-1" style={{ borderBottom: '1px solid', borderColor: 'var(--color-roan-rouge)', color: 'var(--color-twilight-mauve)' }}><span>MATERIAL</span> <span style={{ color: 'var(--color-bottlefly-wings)' }}>{item.material}</span></div>
            </div>
          </div>
          
          <TbHexagon className="text-6xl mx-auto mt-8 animate-pulse" style={{ color: 'var(--color-twilight-mauve)', opacity: 0.3 }} />
        </motion.div>

        {/* CENTER PANEL: The Arena (Massive Mannequin Render) */}
        <div className="md:col-span-6 border relative flex items-end justify-center overflow-hidden min-h-[50vh]" style={{ borderColor: 'var(--color-twilight-mauve)', backgroundColor: 'rgba(95, 79, 126, 0.1)' }}>
          {/* Background Typography */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5" style={{ color: 'var(--color-twilight-mauve)' }}>
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
            className="absolute left-0 w-full h-[2px] z-20"
            style={{ backgroundColor: 'rgba(135, 82, 86, 0.5)', boxShadow: '0_0_10px_rgba(135, 82, 86, 0.5)' }}
          />
        </div>

        {/* RIGHT PANEL: Lore & Confirmation (Add to Cart) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-3 border p-6 flex flex-col justify-between"
          style={{ borderColor: 'var(--color-twilight-mauve)', backgroundColor: 'rgba(85, 48, 58, 0.1)' }}
        >
          <div>
            <h1 className="text-3xl font-bold uppercase mb-2 tracking-tight" style={{ fontFamily: "Syncopate", color: 'var(--color-aster-petal)' }}>
              {item.title}
            </h1>
            <p className="text-xl mb-6" style={{ color: 'var(--color-bottlefly-wings)' }}>{item.price}</p>
            
            <div className="border p-4 relative mb-6" style={{ borderColor: 'var(--color-roan-rouge)', backgroundColor: 'rgba(30, 24, 33, 0.95)' }}>
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: 'var(--color-twilight-mauve)' }} />
              <p className="text-xs leading-relaxed uppercase" style={{ color: 'var(--color-twilight-mauve)' }}>
                {item.description}
              </p>
            </div>

            {/* Sizing Selector (Mock) */}
            <div className="mb-8">
              <h3 className="text-[10px] mb-2 uppercase" style={{ color: 'var(--color-twilight-mauve)' }}>Select_Parameters</h3>
              <div className="grid grid-cols-4 gap-2">
                {['S', 'M', 'L', 'XL'].map(size => (
                  <button key={size} className="border p-2 text-xs transition-colors" style={{ borderColor: 'var(--color-twilight-mauve)', color: 'var(--color-twilight-mauve)' }}>
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <motion.button 
            onMouseEnter={() => setIsHoveringConfirm(true)}
            onMouseLeave={() => setIsHoveringConfirm(false)}
            className="w-full border p-4 text-sm font-bold uppercase transition-all flex justify-between items-center group relative overflow-hidden"
            style={{
              borderColor: 'var(--color-aster-petal)',
              backgroundColor: isHoveringConfirm ? 'var(--color-aster-petal)' : 'transparent',
              color: isHoveringConfirm ? 'var(--color-night-demons)' : 'var(--color-aster-petal)'
            }}
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