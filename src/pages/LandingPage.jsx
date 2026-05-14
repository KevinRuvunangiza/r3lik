import React, { useState } from "react";
import { motion } from "framer-motion";
import { TbCrosshair } from "react-icons/tb";

export default function LandingPage() {
  const [isHoveringShop, setIsHoveringShop] = useState(false);

  const glitchVariant = {
    hover: {
      x: [-2, 2, -2, 0],
      y: [1, -1, 1, 0],
      opacity: [1, 0.8, 1],
      transition: { duration: 0.2, repeat: Infinity, repeatType: "mirror" },
    },
    rest: { x: 0, y: 0, opacity: 1 },
  };

  return (
    // FIX: Swapped min-h-screen for h-screen and added flex flex-col to lock the viewport
    <div className="relative h-screen flex flex-col text-[#f4f4f4] overflow-hidden selection:bg-[#f4f4f4] selection:text-[#050505]" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Moving CRT Scanline */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden opacity-10">
        <div className="w-full h-[10px] bg-white/20 blur-[2px] animate-scanline" />
      </div>

      {/* Static CRT Grain Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-40 mix-blend-overlay opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 51%)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* FIX: Swapped h-[calc(...)] for flex-1 min-h-0 to perfectly fill remaining space */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-12 md:grid-rows-6 gap-4 flex-1 min-h-0 relative z-10">
        {/* Manifesto Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:col-span-3 md:row-span-6 border p-6 flex flex-col justify-between group transition-colors"
          style={{ borderColor: 'var(--color-twilight-mauve)', backgroundColor: 'rgba(85, 48, 58, 0.1)' }}
        >
          <div>
            <TbCrosshair className="text-3xl mb-8 opacity-50 group-hover:rotate-90 transition-transform duration-500" style={{ color: 'var(--color-roan-rouge)' }} />
            <h2 className="text-3xl lg:text-4xl font-bold uppercase mb-4 tracking-tighter leading-tight" style={{ color: 'var(--color-aster-petal)' }}>
              Without
              <br />
              Excess.
              <br />
              Only Style.
            </h2>
            <p className="text-xs leading-relaxed uppercase font-mono mt-8" style={{ color: 'var(--color-twilight-mauve)' }}>
              Modern silhouettes, natural fabrics, and honest design. A digital
              relic for the physical world.
            </p>
          </div>

          <motion.button
            whileHover="hover"
            initial="rest"
            className="flex justify-between items-center w-full border p-3 text-xs uppercase transition-colors relative overflow-hidden font-mono mt-4"
            style={{ borderColor: 'var(--color-roan-rouge)', color: 'var(--color-aster-petal)' }}
          >
            <motion.span variants={glitchVariant}>Initialize About</motion.span>
            <span>↗</span>
          </motion.button>
        </motion.div>

        {/* Mannequin / Center Stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="md:col-span-6 md:row-span-6 border relative overflow-hidden flex items-center justify-center"
          style={{ borderColor: 'var(--color-twilight-mauve)', backgroundColor: 'rgba(95, 79, 126, 0.1)' }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <span className="text-[10vw] font-black tracking-tighter rotate-90 md:rotate-0">
              R3LIK
            </span>
          </div>

          {/* Note: Replace this placeholder src with your actual mannequin render from Blender */}
          <motion.img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
            alt="R3lik Silhouette"
            className="h-[80%] object-cover z-10 drop-shadow-2xl grayscale contrast-125 mix-blend-lighten"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          />

          <div className="absolute top-4 left-4 border-l-2 border-t-2 w-6 h-6" style={{ borderColor: 'var(--color-twilight-mauve)' }}></div>
          <div className="absolute bottom-4 right-4 border-r-2 border-b-2 w-6 h-6" style={{ borderColor: 'var(--color-twilight-mauve)' }}></div>
        </motion.div>

        {/* Status HUD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:col-span-3 md:row-span-3 border p-6 flex flex-col justify-end"
          style={{ borderColor: 'var(--color-twilight-mauve)', backgroundImage: "radial-gradient(circle, #1a1a1a 1px, transparent 1px)", backgroundSize: "16px 16px" }}
        >
          <div className="bg-[#050505]/90 p-4 border backdrop-blur-md font-mono" style={{ borderColor: 'var(--color-roan-rouge)', backgroundColor: 'rgba(30, 24, 33, 0.95)' }}>
            <h3 className="text-sm font-bold uppercase mb-2 pb-2" style={{ borderColor: 'var(--color-roan-rouge)', borderBottom: '1px solid', color: 'var(--color-aster-petal)' }}>
              Equip_Status
            </h3>
            <div className="flex justify-between text-xs" style={{ color: 'var(--color-twilight-mauve)' }}>
              <span>Armor_Type</span>
              <span style={{ color: 'var(--color-bottlefly-wings)' }}>Heavy Puffer</span>
            </div>
            <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--color-twilight-mauve)' }}>
              <span>Network</span>
              <span className="animate-pulse" style={{ color: 'var(--color-roan-rouge)' }}>Online</span>
            </div>
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          onMouseEnter={() => setIsHoveringShop(true)}
          onMouseLeave={() => setIsHoveringShop(false)}
          className="md:col-span-3 md:row-span-3 border p-6 flex flex-col items-end justify-end cursor-pointer relative overflow-hidden transition-all duration-300 group"
          style={{ borderColor: 'var(--color-twilight-mauve)', backgroundColor: isHoveringShop ? 'var(--color-aster-petal)' : 'var(--color-background)', color: isHoveringShop ? 'var(--color-night-demons)' : 'var(--color-text)' }}
        >
          <div className="text-right z-10">
            <span
              className={`block text-xs mb-2 uppercase transition-colors font-mono`}
              style={{ color: isHoveringShop ? 'var(--color-roan-rouge)' : 'var(--color-twilight-mauve)' }}
            >
              {isHoveringShop ? "Insert Coin" : "System Ready"}
            </span>
            <div className="flex items-center gap-2 justify-end">
              {isHoveringShop && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl font-bold"
                >
                  ▶
                </motion.span>
              )}
              <h2 className="text-2xl lg:text-3xl font-bold uppercase tracking-tight">
                Access Shop
              </h2>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
