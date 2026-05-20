import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbCrosshair, TbChevronRight, TbSignalG } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [isHoveringShop, setIsHoveringShop] = useState(false);

  // FIX 2: variants declared here so motion.button can receive them directly
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
    <div
      className="relative w-full flex-grow flex flex-col text-[#f4f4f4] overflow-hidden selection:bg-[#f4f4f4] selection:text-[#050505]"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* CRT Scanline */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden opacity-10">
        <div className="w-full h-[10px] bg-white/20 blur-[2px] animate-scanline" />
      </div>

      {/* CRT Grain */}
      <div
        className="pointer-events-none fixed inset-0 z-40 mix-blend-overlay opacity-20"
        style={{
          backgroundImage: "linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 51%)",
          backgroundSize: "100% 4px",
        }}
      />

      <main className="p-3 sm:p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 md:grid-rows-6 gap-3 sm:gap-4 flex-1 min-h-0 relative z-10 auto-rows-min md:auto-rows-auto">

        {/* MANIFESTO PANEL */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:col-span-3 md:row-span-6 border p-4 sm:p-6 flex flex-col justify-between group transition-colors"
          style={{ borderColor: "var(--color-twilight-mauve)", backgroundColor: "rgba(85, 48, 58, 0.1)" }}
        >
          <div>
            <TbCrosshair
              className="text-2xl sm:text-3xl mb-4 sm:mb-8 opacity-50 group-hover:rotate-90 transition-transform duration-500"
              style={{ color: "var(--color-roan-rouge)" }}
            />
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase mb-3 sm:mb-4 tracking-tighter leading-tight"
              style={{ color: "var(--color-aster-petal)" }}
            >
              Without
              <br />
              Excess.
              <br />
              Only Style.
            </h2>
            <p
              className="text-[11px] sm:text-xs leading-relaxed uppercase font-mono mt-4 sm:mt-8"
              style={{ color: "var(--color-twilight-mauve)" }}
            >
              Modern silhouettes, natural fabrics, and honest design. A digital
              relic for the physical world.
            </p>

            {/* UPGRADE: minimal stat readouts below manifesto copy */}
            <div className="mt-6 sm:mt-10 space-y-3 border-t pt-4" style={{ borderColor: "var(--color-roan-rouge)" }}>
              {[
                { label: "Season", value: "SS_25" },
                { label: "Origin", value: "ZA_LOCAL" },
                { label: "Status", value: "ACTIVE", pulse: true },
              ].map(({ label, value, pulse }) => (
                <div key={label} className="flex justify-between text-[10px] uppercase" style={{ color: "var(--color-twilight-mauve)" }}>
                  <span>{label}</span>
                  <span className={pulse ? "animate-pulse" : ""} style={{ color: pulse ? "var(--color-roan-rouge)" : "var(--color-bottlefly-wings)" }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* FIX 1: variants on motion.button + wrapped in Link */}
          <Link to="/archive" className="block mt-3 sm:mt-4">
            <motion.button
              variants={glitchVariant}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="flex justify-between items-center w-full border p-2 sm:p-3 text-[10px] sm:text-xs uppercase transition-colors relative overflow-hidden font-mono"
              style={{ borderColor: "var(--color-roan-rouge)", color: "var(--color-aster-petal)" }}
            >
              <motion.span variants={glitchVariant}>Initialize About</motion.span>
              <span>↗</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* CENTER: Mannequin */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          // FIX 2: md:min-h-0 instead of invalid md:min-h-auto
          className="md:col-span-6 md:row-span-6 border relative overflow-hidden flex items-center justify-center min-h-[250px] sm:min-h-[300px] md:min-h-0"
          style={{ borderColor: "var(--color-twilight-mauve)", backgroundColor: "rgba(95, 79, 126, 0.1)" }}
        >
          {/* Background watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <span className="text-[8vw] font-black tracking-tighter rotate-90 md:rotate-0">R3LIK</span>
          </div>

          <motion.img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
            alt="R3lik Silhouette"
            className="h-[70%] sm:h-[75%] md:h-[80%] object-cover z-10 drop-shadow-2xl grayscale contrast-125 mix-blend-lighten"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          />

          {/* Corner accents */}
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 border-l-2 border-t-2 w-4 sm:w-6 h-4 sm:h-6" style={{ borderColor: "var(--color-twilight-mauve)" }} />
          <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 border-r-2 border-b-2 w-4 sm:w-6 h-4 sm:h-6" style={{ borderColor: "var(--color-twilight-mauve)" }} />

          {/* UPGRADE: scan line on center panel too */}
          <motion.div
            animate={{ y: ["0%", "100%", "0%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 top-0 w-full h-[1px] z-20 pointer-events-none"
            style={{ backgroundColor: "rgba(135, 82, 86, 0.4)" }}
          />

          {/* UPGRADE: asset tag bottom-left */}
          <div
            className="absolute bottom-3 left-3 text-[9px] uppercase tracking-widest font-mono z-20"
            style={{ color: "var(--color-twilight-mauve)", opacity: 0.6 }}
          >
            REF_01 // HERO_UNIT
          </div>
        </motion.div>

        {/* TOP-RIGHT: Status HUD — UPGRADE: richer readouts + signal icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:col-span-3 md:row-span-3 border p-4 sm:p-6 flex flex-col justify-between"
          style={{
            borderColor: "var(--color-twilight-mauve)",
            backgroundImage: "radial-gradient(circle, #1a1a1a 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] uppercase tracking-widest font-mono" style={{ color: "var(--color-twilight-mauve)" }}>
              EQUIP_STATUS
            </span>
            <TbSignalG className="text-base animate-pulse" style={{ color: "var(--color-roan-rouge)" }} />
          </div>

          <div
            className="border p-3 sm:p-4 font-mono backdrop-blur-md flex-grow flex flex-col justify-between"
            style={{ borderColor: "var(--color-roan-rouge)", backgroundColor: "rgba(30, 24, 33, 0.95)" }}
          >
            {[
              { label: "Armor_Type", value: "Heavy Puffer" },
              { label: "Network", value: "Online", pulse: true },
              { label: "Slots_Open", value: "3 / 5" },
              { label: "Last_Drop", value: "25.05.25" },
            ].map(({ label, value, pulse }) => (
              <div key={label} className="flex justify-between text-[10px] sm:text-xs py-1" style={{ color: "var(--color-twilight-mauve)" }}>
                <span>{label}</span>
                <span
                  className={pulse ? "animate-pulse" : ""}
                  style={{ color: pulse ? "var(--color-roan-rouge)" : "var(--color-bottlefly-wings)" }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* BOTTOM-RIGHT: Shop CTA — UPGRADE: arrow animation + subtle grid lines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          onMouseEnter={() => setIsHoveringShop(true)}
          onMouseLeave={() => setIsHoveringShop(false)}
          className="md:col-span-3 md:row-span-3 border p-4 sm:p-6 flex flex-col items-end justify-end cursor-pointer relative overflow-hidden transition-all duration-300 group"
          style={{
            borderColor: "var(--color-twilight-mauve)",
            backgroundColor: isHoveringShop ? "var(--color-aster-petal)" : "var(--color-background)",
            color: isHoveringShop ? "var(--color-night-demons)" : "var(--color-text)",
          }}
        >
          {/* Subtle grid lines in resting state */}
          {!isHoveringShop && (
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: "linear-gradient(var(--color-twilight-mauve) 1px, transparent 1px), linear-gradient(90deg, var(--color-twilight-mauve) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
          )}

          {/* UPGRADE: corner marker */}
          <div
            className="absolute top-3 left-3 text-[9px] font-mono uppercase tracking-widest transition-colors"
            style={{ color: isHoveringShop ? "var(--color-roan-rouge)" : "var(--color-twilight-mauve)", opacity: 0.7 }}
          >
            {isHoveringShop ? "INSERT_COIN" : "SYS_READY"}
          </div>

          <div className="text-right z-10 w-full">
            <div className="flex items-center gap-2 justify-end">
              <AnimatePresence>
                {isHoveringShop && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.15 }}
                    className="text-lg sm:text-2xl font-bold"
                  >
                    ▶
                  </motion.span>
                )}
              </AnimatePresence>
              <Link to="/catalog">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight">
                  Access Shop
                </h2>
              </Link>
            </div>

            {/* UPGRADE: item count teaser */}
            <motion.div
              initial={false}
              animate={{ opacity: isHoveringShop ? 1 : 0, y: isHoveringShop ? 0 : 4 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-end gap-1 mt-2"
            >
              <TbChevronRight className="text-xs" style={{ color: "var(--color-roan-rouge)" }} />
              <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: "var(--color-roan-rouge)" }}>
                View All Assets
              </span>
            </motion.div>
          </div>
        </motion.div>

      </main>
    </div>
  );
}