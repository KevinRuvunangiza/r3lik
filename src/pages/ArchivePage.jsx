import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TbTerminal, TbCpu, TbFingerprint, TbActivity } from 'react-icons/tb';

export default function ArchivePage() {
  const [bootLog, setBootLog] = useState([]);
  const [isBooted, setIsBooted] = useState(false);

  // Simulated Terminal Boot Sequence
  useEffect(() => {
    const logs = [
      "INITIALIZING R3LIK_CORE...",
      "BYPASSING SECURITY PROTOCOLS...",
      "DECRYPTING MANIFESTO.DAT...",
      "LOADING SYSTEM ARCHITECTS...",
      "ACCESS GRANTED."
    ];
    
    let delay = 0;
    logs.forEach((log, index) => {
      setTimeout(() => {
        setBootLog(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setTimeout(() => setIsBooted(true), 600); // Reveal content after last log
        }
      }, delay);
      delay += 400 + Math.random() * 300; // Random glitchy typing delay
    });
  }, []);

  // Framer Motion Variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } }
  };

  return (
    <div className="w-full flex-grow flex flex-col p-4 md:p-6 font-mono relative z-10">
      
      {/* THE BOOT SEQUENCE OVERLAY */}
      {!isBooted && (
        <div className="absolute inset-0 z-50 flex flex-col items-start justify-center p-12 bg-[#050505]/95 backdrop-blur-md">
          <TbTerminal className="text-4xl text-zinc-500 mb-6 animate-pulse" />
          {bootLog.map((log, i) => (
            <motion.p 
              key={i} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="text-green-500 font-bold mb-2 text-sm uppercase tracking-widest"
            >
              {`> ${log}`}
            </motion.p>
          ))}
          <span className="w-3 h-5 bg-green-500 animate-ping mt-4 block" />
        </div>
      )}

      {/* MAIN ARCHIVE CONTENT */}
      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate={isBooted ? "show" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-grow"
      >
        
        {/* LORE / MANIFESTO (Span 8) */}
        <motion.div variants={itemVars} className="md:col-span-8 border border-zinc-800 bg-zinc-900/10 p-6 md:p-10 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TbFingerprint className="text-[200px]" />
          </div>
          
          <h2 className="text-xs text-zinc-500 uppercase tracking-[0.3em] mb-8 border-b border-zinc-800 pb-4 inline-flex items-center gap-2">
            <TbActivity className="animate-pulse text-white" /> Core_Directive.txt
          </h2>
          
          <div className="space-y-6 text-sm md:text-base leading-relaxed text-zinc-300 max-w-2xl relative z-10">
            <p>
              <strong className="text-white">R3LIK</strong> was not born from a desire to add to the noise. It was compiled as an executable response to excess.
            </p>
            <p>
              We view garments as hardware for the human form. Every seam, every textile, and every silhouette is heavily considered, stripping away the superfluous to leave only what is necessary. A digital aesthetic translated into physical armor.
            </p>
            <p>
              The Y2K paradigm wasn't just an era; it was a transition state between the analog past and the networked future. R3lik exists in that exact tension. 
            </p>
          </div>

          <div className="mt-auto pt-12">
            <div className="inline-block border border-zinc-700 bg-zinc-900 p-3 text-xs text-zinc-400">
              EST. 2025 // JOHANNESBURG_ZA
            </div>
          </div>
        </motion.div>

        {/* SYSTEM ARCHITECTS (Span 4) */}
        <motion.div variants={itemVars} className="md:col-span-4 flex flex-col gap-4">
          
          <div className="border border-zinc-800 bg-zinc-900/10 p-4">
            <h3 className="text-xs text-zinc-500 mb-4 flex justify-between items-center">
              <span>SYS_ARCHITECTS</span>
              <TbCpu className="text-lg" />
            </h3>
            
            <div className="space-y-3">
              {/* Founder 1 */}
              <div className="group cursor-default">
                <div className="flex justify-between text-xs text-zinc-400 group-hover:text-white transition-colors">
                  <span className="font-bold">ADMIN_01</span>
                  <span>[LEAD_DEV]</span>
                </div>
                <div className="w-full h-[1px] bg-zinc-800 my-1 group-hover:bg-zinc-500 transition-colors" />
                <span className="text-[10px] text-zinc-600 block uppercase">Technical Infrastructure & Systems</span>
              </div>

              {/* Founder 2 */}
              <div className="group cursor-default pt-2">
                <div className="flex justify-between text-xs text-zinc-400 group-hover:text-white transition-colors">
                  <span className="font-bold">ADMIN_02</span>
                  <span>[CREATIVE_DIR]</span>
                </div>
                <div className="w-full h-[1px] bg-zinc-800 my-1 group-hover:bg-zinc-500 transition-colors" />
                <span className="text-[10px] text-zinc-600 block uppercase">Visual Language & Apparel Design</span>
              </div>

              {/* Founder 3 */}
              <div className="group cursor-default pt-2">
                <div className="flex justify-between text-xs text-zinc-400 group-hover:text-white transition-colors">
                  <span className="font-bold">ADMIN_03 // BRIAN</span>
                  <span>[OPERATIONS]</span>
                </div>
                <div className="w-full h-[1px] bg-zinc-800 my-1 group-hover:bg-zinc-500 transition-colors" />
                <span className="text-[10px] text-zinc-600 block uppercase">Logistics & Strategy Execution</span>
              </div>
            </div>
          </div>

          {/* VERSION HISTORY / ROADMAP */}
          <div className="border border-zinc-800 bg-zinc-900/10 p-4 flex-grow flex flex-col justify-end">
            <h3 className="text-xs text-zinc-500 mb-4">PATCH_NOTES</h3>
            <ul className="text-xs space-y-2 font-mono">
              <li className="flex gap-4 opacity-50"><span className="text-zinc-500">v0.1</span> <span>Concept Genesis</span></li>
              <li className="flex gap-4 opacity-50"><span className="text-zinc-500">v0.5</span> <span>Frontend Architecture</span></li>
              <li className="flex gap-4 text-green-500 animate-pulse"><span className="text-green-700">v1.0</span> <span>System Live (Current)</span></li>
              <li className="flex gap-4 opacity-30 mt-4"><span className="text-zinc-600">v2.0</span> <span>[REDACTED_DROP]</span></li>
            </ul>
          </div>
          
        </motion.div>

      </motion.div>
    </div>
  );
}