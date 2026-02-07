

"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { carData } from "@/data/carData";

interface Props {
    scrollYProgress: MotionValue<number>;
}

export default function ExperienceOverlay({ scrollYProgress }: Props) {
    // Hero Opacity & Scale
    const heroOpacity = useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

    // Design Opacity & Position
    const designOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.6, 0.65], [0, 1, 1, 0]);
    const designX = useTransform(scrollYProgress, [0.35, 0.45], [-100, 0]);

    // Engine Opacity & Position (Widened Range & Earlier Trigger)
    const engineOpacity = useTransform(scrollYProgress, [0.55, 0.65, 0.95], [0, 1, 1]);
    const engineY = useTransform(scrollYProgress, [0.55, 0.65], [100, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden mix-blend-plus-lighter">
            {/* HERO SECTION */}
            <motion.div
                className="absolute top-[20%] left-6 md:left-20 max-w-4xl"
                style={{ opacity: heroOpacity, scale: heroScale }}
            >
                <div className="overflow-hidden">
                    <motion.h1
                        className="text-7xl md:text-[10rem] font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-700 mb-0 tracking-tighter leading-[0.85] drop-shadow-2xl"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.2, ease: "circOut" }}
                    >
                        {carData.hero.title}
                    </motion.h1>
                </div>
                <motion.div
                    className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-8 pl-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <div className="h-[1px] w-20 bg-lambo-yellow" />
                    <p className="text-xl md:text-2xl text-lambo-yellow font-heading tracking-[0.4em] uppercase">
                        {carData.hero.subtitle}
                    </p>
                    <div className="h-[1px] flex-grow max-w-[100px] bg-white/20" />
                </motion.div>

                <motion.p
                    className="mt-6 text-white/50 max-w-lg leading-relaxed text-sm md:text-base font-light border-l border-white/10 pl-6 ml-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    {carData.hero.description}
                </motion.p>
            </motion.div>

            {/* DESIGN DETAILS */}
            <motion.div
                className="absolute top-[40%] right-6 md:right-20 text-right flex flex-col items-end"
                style={{ opacity: designOpacity, x: designX }}
            >
                <div className="relative inline-block mb-4">
                    <div className="absolute -inset-6 border border-lambo-yellow/20 clip-angle opacity-50" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-lambo-yellow" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-lambo-yellow" />

                    <h2 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter mix-blend-overlay opacity-80">
                        {carData.design.title}
                    </h2>
                </div>

                <h3 className="text-2xl mt-4 font-heading tracking-[0.3em] text-lambo-yellow mb-2">{carData.design.subtitle}</h3>
                <p className="text-white/40 max-w-sm text-sm leading-relaxed border-r-2 border-lambo-yellow/30 pr-6 mr-1">{carData.design.description}</p>

                {/* Specs Grid */}
                <div className="flex gap-12 mt-12">
                    {carData.design.specs.map((spec, i) => (
                        <div key={i} className="text-right group cursor-default">
                            <p className="text-white/30 text-[0.6rem] tracking-[0.3em] font-heading mb-2 uppercase group-hover:text-lambo-yellow transition-colors">{spec.label}</p>
                            <p className="text-3xl font-heading italic text-white group-hover:scale-110 transition-transform origin-right duration-500">{spec.value}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* ENGINE SPECS & FEATURES HUD */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: engineOpacity }}
            >
                {/* Main Engine Stats - Bottom Left */}
                <motion.div
                    className="absolute bottom-[15%] left-6 md:left-20"
                    style={{ y: engineY }}
                >
                    <div className="flex flex-col gap-1 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-lambo-yellow rounded-full animate-pulse shadow-[0_0_10px_#F5C211]" />
                            <span className="text-xs font-mono text-lambo-yellow/80 tracking-widest">SYSTEM_LIVE</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-white to-transparent tracking-tighter">
                            {carData.engine.title}
                        </h2>
                    </div>

                    <div className="relative pl-8 pt-8 border-l border-t border-white/10 rounded-tl-3xl backdrop-blur-sm bg-black/20 p-8 max-w-xl">
                        {/* Decorative HUD Elements */}
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-lambo-yellow rounded-tl-3xl" />

                        <h3 className="text-sm text-white/60 font-heading mb-8 tracking-[0.2em]">{carData.engine.subtitle}</h3>

                        <div className="grid grid-cols-3 gap-8">
                            {carData.engine.specs.map((spec, i) => (
                                <div key={i} className="relative group">
                                    <div className="absolute -left-4 top-1 w-[2px] h-full bg-gradient-to-b from-lambo-yellow/0 via-lambo-yellow/50 to-lambo-yellow/0 group-hover:via-lambo-yellow transition-colors" />
                                    <p className="text-[10px] text-lambo-yellow tracking-widest mb-1 uppercase opacity-60">{spec.label}</p>
                                    <p className="text-3xl font-heading italic text-white group-hover:text-lambo-yellow transition-colors duration-300 drop-shadow-lg">
                                        {spec.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Tech Features List - Right Side Slide-in */}
                <motion.div
                    className="absolute top-[25%] right-0 w-[400px] h-[400px]"
                    style={{ x: useTransform(scrollYProgress, [0.55, 0.65], [200, 0]) }}
                >
                    {/* Circle HUD Graphic */}
                    <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_60s_linear_infinite] border-dashed" />
                    <div className="absolute inset-10 border border-lambo-yellow/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

                    <div className="absolute top-1/2 right-10 md:right-20 transform -translate-y-1/2 flex flex-col items-end gap-6 text-right">
                        {["ACTIVE AERODYNAMICS", "TITANIUM EXHAUST", "SEQUENTIAL GEARBOX"].map((feature, i) => (
                            <div key={i} className="group flex items-center gap-4 cursor-pointer">
                                <span className="text-xs md:text-sm text-white/50 font-heading tracking-widest group-hover:text-white transition-colors duration-300">{feature}</span>
                                <div className="w-16 h-[1px] bg-white/20 group-hover:bg-lambo-yellow group-hover:w-24 transition-all duration-300" />
                                <div className="w-2 h-2 bg-white/20 rotate-45 group-hover:bg-lambo-yellow group-hover:rotate-90 transition-all duration-500" />
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* TECHNICAL EXPLODED VIEW OVERLAY */}
            <TechnicalOverlay scrollYProgress={scrollYProgress} />
        </div>
    );
}

function TechnicalOverlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    // Trigger range: 0.7 - 1.0 (after engine stats)
    const opacity = useTransform(scrollYProgress, [0.7, 0.75, 0.95, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0.7, 1], [0.9, 1.1]); // Slight zoom effect

    // Individual Part Labels - Simulated "Explosion" outward
    const cylinderHeadX = useTransform(scrollYProgress, [0.7, 0.9], [0, -150]);
    const cylinderHeadY = useTransform(scrollYProgress, [0.7, 0.9], [0, -50]);

    const exhaustX = useTransform(scrollYProgress, [0.7, 0.9], [0, 150]);
    const exhaustY = useTransform(scrollYProgress, [0.7, 0.9], [0, 50]);

    const suspensionY = useTransform(scrollYProgress, [0.7, 0.9], [0, 100]);

    return (
        <motion.div
            className="absolute inset-0 pointer-events-none flex items-center justify-center p-20 z-50"
            style={{ opacity }}
        >
            <div className="relative w-full h-full max-w-6xl border border-lambo-yellow/10 rounded-sm">
                {/* SYSTEM STATUS HEADER */}
                <div className="absolute top-0 left-0 w-full p-4 border-b border-lambo-yellow/10 flex justify-between items-center bg-black/40 backdrop-blur-sm">
                    <span className="text-lambo-yellow font-mono text-xs tracking-widest animate-pulse">Checking Systems...</span>
                    <span className="text-white/40 font-heading text-xs">EXPLODED_VIEW_MODE</span>
                </div>

                {/* CENTER: ENGINE BLOCK (Simulated) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-dashed border-white/20 rounded-full animate-[spin_20s_linear_infinite]" />

                {/* PART 1: CYLINDER HEADS */}
                <motion.div
                    className="absolute top-1/2 left-1/2"
                    style={{ x: cylinderHeadX, y: cylinderHeadY }}
                >
                    <div className="flex flex-col items-end -translate-x-full -translate-y-full pr-8 pb-8">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-lambo-yellow font-heading text-xl italic">CYLINDER HEADS</span>
                            <div className="w-2 h-2 bg-lambo-yellow rounded-full" />
                        </div>
                        <p className="text-white/50 text-[10px] text-right max-w-[150px] font-mono">
                            CNC Machined / Aerospace Aluminum / High-Flow Ports
                        </p>
                        <div className="w-[100px] h-[1px] bg-gradient-to-l from-lambo-yellow to-transparent mt-2" />
                    </div>
                </motion.div>

                {/* PART 2: EXHAUST SYSTEM */}
                <motion.div
                    className="absolute top-1/2 left-1/2"
                    style={{ x: exhaustX, y: exhaustY }}
                >
                    <div className="flex flex-col items-start pl-8 pt-8">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-lambo-yellow rounded-full" />
                            <span className="text-lambo-yellow font-heading text-xl italic">INCONEL EXHAUST</span>
                        </div>
                        <p className="text-white/50 text-[10px] text-left max-w-[150px] font-mono">
                            Hydroformed / Ceramic Coated / F1 Technology
                        </p>
                        <div className="w-[100px] h-[1px] bg-gradient-to-r from-lambo-yellow to-transparent mt-2" />
                    </div>
                </motion.div>

                {/* PART 3: SUSPENSION */}
                <motion.div
                    className="absolute top-1/2 left-1/2"
                    style={{ y: suspensionY, x: "-50%" }}
                >
                    <div className="flex flex-col items-center pt-32">
                        <div className="w-[1px] h-[50px] bg-lambo-yellow/50 mb-2" />
                        <span className="text-white font-heading text-lg tracking-widest">PUSHROD SUSPENSION</span>
                        <span className="text-lambo-yellow text-xs font-mono">ÖHLINS ADJUSTABLE DAMPERS</span>
                    </div>
                </motion.div>

                {/* Grid Lines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] pointer-events-none" />
            </div>
        </motion.div>
    );
}
