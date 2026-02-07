"use client";

import { motion } from "framer-motion";

export default function SpeedLines() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white/10 h-[1px] w-full"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: "-100%",
                        willChange: "transform", // Hint browser
                    }}
                    animate={{
                        x: "200%",
                    }}
                    initial={{
                        transform: "translateZ(0)" // Force GPU layer
                    }}
                    transition={{
                        duration: Math.random() * 2 + 1,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5,
                    }}
                />
            ))}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
        </div>
    );
}
