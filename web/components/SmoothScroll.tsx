"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { motion, useScroll, useSpring } from "framer-motion";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const lenis = new Lenis({
            duration: 2.5, // Increased for heavier feel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 0.8, // Slower response
            touchMultiplier: 1.5,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <>
            {/* Custom Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 right-0 w-1 h-full bg-lambo-yellow origin-top z-[100] shadow-[0_0_15px_#F5C211]"
                style={{ scaleY }}
            />
            {children}
        </>
    );
}
