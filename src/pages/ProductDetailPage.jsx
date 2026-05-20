import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TbArrowLeft, TbActivity, TbHexagon } from "react-icons/tb";
import { fetchCatalog } from "../utils/shopify";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHoveringConfirm, setIsHoveringConfirm] = useState(false);

  useEffect(() => {
    async function loadItem() {
      try {
        const catalog = await fetchCatalog();
        const foundItem = catalog.find((i) => i.id === id);
        setItem(foundItem);
      } catch (err) {
        console.error("Failed to load item:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadItem();
  }, [id]);

  if (isLoading) {
    return <div className="flex-grow flex items-center justify-center font-mono text-zinc-500">SYSTEM_INITIALIZING...</div>;
  }

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

  return (
    <div className="flex-grow flex flex-col p-3 sm:p-4 md:p-6 font-mono relative z-10 w-full" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
        <Link to="/catalog" className="flex items-center gap-1 sm:gap-2 text-xs transition-colors uppercase group" style={{ color: 'var(--color-twilight-mauve)' }}>
          <TbArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] sm:text-xs">[ESC] Return to DB</span>
        </Link>
        <div className="text-[9px] sm:text-xs" style={{ color: 'var(--color-twilight-mauve)' }}>INSPECTION_MODE</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-4 flex-grow auto-rows-max md:auto-rows-auto">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-3 border p-3 sm:p-4 md:p-6 flex flex-col justify-between" style={{ borderColor: 'var(--color-twilight-mauve)', backgroundColor: 'rgba(85, 48, 58, 0.1)' }}>
          <div>
            <h3 className="text-[10px] sm:text-xs mb-4 sm:mb-6 pb-2" style={{ color: 'var(--color-twilight-mauve)', borderBottom: '1px solid', borderColor: 'var(--color-twilight-mauve)' }}>DIAGNOSTICS</h3>
            {[
              { label: "Durability", level: 8 },
              { label: "Weight_Class", level: 5 },
              { label: "Thermal_Resist", level: 7 }
            ].map((stat) => (
              <div key={stat.label} className="mb-3 sm:mb-4">
                <div className="flex justify-between text-[9px] sm:text-[10px] mb-1 uppercase" style={{ color: 'var(--color-twilight-mauve)' }}>
                  <span>{stat.label}</span>
                  <span>LVL_{stat.level}</span>
                </div>
                <div className="w-full h-1 sm:h-2 border flex" style={{ borderColor: 'var(--color-roan-rouge)', backgroundColor: 'rgba(30, 24, 33, 0.5)' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${stat.level * 10}%` }} transition={{ duration: 1, ease: "easeOut" }} style={{ backgroundColor: 'var(--color-roan-rouge)' }} />
                </div>
              </div>
            ))}
            <div className="mt-6 sm:mt-8 space-y-2 text-xs">
              <div className="flex justify-between pb-1 text-[10px] sm:text-xs" style={{ borderBottom: '1px solid', borderColor: 'var(--color-roan-rouge)', color: 'var(--color-twilight-mauve)' }}><span>SYS_ID</span> <span style={{ color: 'var(--color-bottlefly-wings)' }}>{item.sys_name}</span></div>
              <div className="flex justify-between pb-1 text-[10px] sm:text-xs" style={{ borderBottom: '1px solid', borderColor: 'var(--color-roan-rouge)', color: 'var(--color-twilight-mauve)' }}><span>CLASS</span> <span style={{ color: 'var(--color-bottlefly-wings)' }}>{item.armor_type}</span></div>
            </div>
          </div>
          <TbHexagon className="text-4xl sm:text-5xl md:text-6xl mx-auto mt-6 sm:mt-8 animate-pulse" style={{ color: 'var(--color-twilight-mauve)', opacity: 0.3 }} />
        </motion.div>

        <div className="md:col-span-6 border relative flex items-end justify-center overflow-hidden min-h-[300px] sm:min-h-[350px] md:min-h-[50vh]" style={{ borderColor: 'var(--color-twilight-mauve)', backgroundColor: 'rgba(95, 79, 126, 0.1)' }}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 text-[10vw] sm:text-[12vw] font-black tracking-tighter" style={{ color: 'var(--color-twilight-mauve)', fontFamily: "Syncopate" }}>
            {item.id.split('-')[1]}
          </div>
          <motion.img initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} src={item.image} alt={item.title} className="h-[80%] md:h-[90%] w-full object-cover grayscale contrast-125 mix-blend-lighten relative z-10" />
          <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute left-0 w-full h-[1px] sm:h-[2px] z-20" style={{ backgroundColor: 'rgba(135, 82, 86, 0.5)', boxShadow: '0_0_10px_rgba(135, 82, 86, 0.5)' }} />
        </div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-3 border p-3 sm:p-4 md:p-6 flex flex-col justify-between" style={{ borderColor: 'var(--color-twilight-mauve)', backgroundColor: 'rgba(85, 48, 58, 0.1)' }}>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase mb-2 tracking-tight" style={{ fontFamily: "Syncopate", color: 'var(--color-aster-petal)' }}>{item.title}</h1>
            <p className="text-lg sm:text-xl mb-4 sm:mb-6" style={{ color: 'var(--color-bottlefly-wings)' }}>{item.price}</p>
            <div className="border p-3 sm:p-4 relative mb-4 sm:mb-6" style={{ borderColor: 'var(--color-roan-rouge)', backgroundColor: 'rgba(30, 24, 33, 0.95)' }}>
              <p className="text-[10px] sm:text-xs leading-relaxed uppercase" style={{ color: 'var(--color-twilight-mauve)' }}>{item.description}</p>
            </div>
          </div>
          <button 
            onMouseEnter={() => setIsHoveringConfirm(true)} 
            onMouseLeave={() => setIsHoveringConfirm(false)}
            className="w-full border p-3 sm:p-4 text-xs sm:text-sm font-bold uppercase transition-all flex justify-between items-center"
            style={{ borderColor: 'var(--color-aster-petal)', backgroundColor: isHoveringConfirm ? 'var(--color-aster-petal)' : 'transparent', color: isHoveringConfirm ? 'var(--color-night-demons)' : 'var(--color-aster-petal)' }}
          >
            {isHoveringConfirm ? "CONFIRM_SELECTION" : "ADD_TO_LOADOUT"} <span>{isHoveringConfirm ? "↵" : "+"}</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}