"use client";

import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
            className={clsx(
                "fixed top-0 left-0 w-full z-50 transition-all duration-700",
                scrolled ? "py-4" : "py-8"
            )}
        >
            {/* Dynamic Glass Background */}
            <div className={clsx(
                "absolute inset-0 transition-opacity duration-700 pointer-events-none",
                scrolled ? "opacity-100" : "opacity-0"
            )}>
                <div className="absolute inset-0 bg-lambo-black/70 backdrop-blur-xl border-b border-white/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50" />
            </div>

            <div className="container mx-auto px-6 flex justify-between items-center relative z-10">
                {/* LOGO */}
                <div className="flex items-center gap-3 group cursor-pointer">
                    <img src="https://upload.wikimedia.org/wikipedia/en/d/df/Lamborghini_Logo.svg" alt="Logo" className="h-10 w-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-transform duration-500 group-hover:scale-110" />
                    <div className="flex flex-col">
                        <span className="font-heading text-2xl font-bold italic tracking-wide text-white drop-shadow-lg">
                            LAMBORGHINI
                        </span>
                        <span className="text-lambo-yellow text-[0.6rem] tracking-[0.3em] font-bold uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                            Automobili
                        </span>
                    </div>
                </div>

                {/* CTA BUTTON */}
                <MagneticButton>
                    <button className="relative overflow-hidden bg-transparent text-white font-heading font-bold tracking-widest px-8 py-3 text-sm group">
                        <span className="relative z-10 group-hover:text-black transition-colors duration-300">INQUIRE</span>
                        {/* Button Background & Border */}
                        <div className="absolute inset-0 border border-white/20 skew-x-[-12deg] transition-all duration-300 group-hover:bg-lambo-yellow group-hover:border-lambo-yellow" />
                        <div className="absolute inset-0 bg-lambo-yellow/10 skew-x-[-12deg] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </button>
                </MagneticButton>
            </div>
        </motion.nav>
    );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            {children}
        </motion.div>
    );
}
