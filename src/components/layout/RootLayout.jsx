import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function RootLayout() {
  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-[#f4f4f4] flex flex-col selection:bg-[#f4f4f4] selection:text-[#050505]">
      {/* GLOBAL: Moving CRT Scanline */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-10">
        <div className="w-full h-[10px] bg-white/20 blur-[2px] animate-scanline" />
      </div>

      {/* GLOBAL: Static CRT Grain Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-40 mix-blend-overlay opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 51%)",
          backgroundSize: "100% 4px",
        }}
      />

      <Navbar />

      {/* Dynamic Page Content Injector */}
      <main className="flex-grow relative z-10 flex flex-col w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
