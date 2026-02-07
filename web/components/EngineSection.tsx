"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function EngineSection() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Parallax effects
    const yBg = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const opacityBg = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center py-20 z-10">
            {/* AMBIENT BACKGROUND */}
            <motion.div style={{ opacity: opacityBg }} className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>

                {/* Breathing blobs - Optimized */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                        rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    style={{ willChange: "transform, opacity", z: 0 }}
                    className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-lambo-yellow/20 to-transparent blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" // Reduced blur slightly
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                        rotate: [0, -45, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    style={{ willChange: "transform, opacity", z: 0 }}
                    className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-red-900/40 to-transparent blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" // Reduced blur slightly
                />
            </motion.div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* LEFT: Typography & Narrative */}
                <motion.div className="lg:col-span-7 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative"
                    >
                        <h3 className="text-lambo-yellow font-heading tracking-[0.5em] text-sm mb-6 flex items-center gap-4">
                            <span className="w-12 h-[1px] bg-lambo-yellow"></span>
                            ENGINEERING MASTERPIECE
                        </h3>

                        <div className="overflow-hidden">
                            <motion.h2
                                initial={{ y: "100%" }}
                                whileInView={{ y: 0 }}
                                transition={{ duration: 0.8, ease: "circOut", delay: 0.1 }}
                                viewport={{ once: true }}
                                className="text-8xl md:text-[10rem] font-heading italic leading-[0.85] text-white mix-blend-difference"
                            >
                                V12
                            </motion.h2>
                        </div>

                        <div className="overflow-hidden mb-10">
                            <motion.h2
                                initial={{ y: "100%" }}
                                whileInView={{ y: 0 }}
                                transition={{ duration: 0.8, ease: "circOut", delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-7xl md:text-9xl font-heading italic leading-none text-transparent text-stroke-white opacity-50"
                            >
                                LEGACY
                            </motion.h2>
                        </div>

                        <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed font-light border-l-2 border-lambo-yellow/30 pl-8 ml-2">
                            The 6.0-liter naturally aspirated V12 is a tribute to pure mechanical emotion.
                            <span className="text-white block mt-4 font-normal">
                                No turbos. No hybrid assistance. Just 9000 RPM of screaming Italian glory.
                            </span>
                        </p>
                    </motion.div>
                </motion.div>

                {/* RIGHT: Live Telemetry Stats */}
                <div className="lg:col-span-5 flex flex-col gap-12 lg:pl-12 border-l border-white/5 relative">
                    {/* Decorative Hud Elements */}
                    <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-lambo-yellow/50 to-transparent"></div>

                    <StatBlock
                        label="DISPLACEMENT"
                        value={6498}
                        unit="cc"
                        description="Naturally Aspirated"
                        delay={0.3}
                    />
                    <StatBlock
                        label="MAX POWER"
                        value={770}
                        unit="CV"
                        description="@ 8,500 RPM"
                        delay={0.4}
                    />
                    <StatBlock
                        label="MAX TORQUE"
                        value={720}
                        unit="Nm"
                        description="Instant Response"
                        delay={0.5}
                    />
                    <StatBlock
                        label="REDLINE"
                        value={8700}
                        unit="RPM"
                        description="Screaming Limit"
                        delay={0.6}
                        isLast
                    />
                </div>
            </div>
        </section>
    );
}

function StatBlock({ label, value, unit, description, delay, isLast }: { label: string, value: number, unit: string, description: string, delay: number, isLast?: boolean }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const springValue = useSpring(0, { stiffness: 60, damping: 20, mass: 1 });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            springValue.set(value);
        }
    }, [isInView, value, springValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            setDisplayValue(Math.floor(latest));
        });
    }, [springValue]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`group relative ${!isLast ? 'pb-12 border-b border-white/5' : ''}`}
        >
            <div className="flex items-baseline justify-between mb-2">
                <div className="flex items-baseline gap-2">
                    <span className="text-6xl md:text-7xl font-heading text-white italic tracking-tighter tabular-nums group-hover:text-lambo-yellow transition-colors duration-500">
                        {displayValue}
                    </span>
                    <span className="text-xl text-lambo-yellow font-bold uppercase">{unit}</span>
                </div>
            </div>

            <div className="flex justify-between items-end">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500 tracking-[0.2em] font-bold uppercase mb-1">{label}</span>
                    <span className="text-xs text-white/40 font-mono">{description}</span>
                </div>
                {/* Visual Bar Indicator */}
                <div className="w-24 h-1 bg-white/10 overflow-hidden relative">
                    <motion.div
                        initial={{ x: "-100%" }}
                        whileInView={{ x: "0%" }}
                        transition={{ duration: 1.5, delay: delay + 0.2, ease: "circOut" }}
                        className="absolute inset-0 bg-lambo-yellow"
                    />
                </div>
            </div>
        </motion.div>
    );
}
