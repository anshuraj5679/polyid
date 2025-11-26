import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function IntroAnimation({ onComplete }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 800); // Wait for exit animation
        }, 2500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                >
                    {/* Background VFX - Moving Gradients */}
                    <motion.div
                        className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] bg-polyPurple/20 rounded-full blur-[100px]"
                        animate={{
                            x: [0, 100, 0],
                            y: [0, -50, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-[-20%] right-[-20%] w-[60vw] h-[60vw] bg-blue-600/20 rounded-full blur-[100px]"
                        animate={{
                            x: [0, -100, 0],
                            y: [0, 50, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Main Content Container */}
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Logo Icon Animation */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "backOut" }}
                            className="mb-6 relative"
                        >
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-polyPurple to-blue-600 flex items-center justify-center shadow-[0_0_50px_rgba(130,71,229,0.5)]">
                                <svg
                                    className="w-12 h-12 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            {/* Pulse Ring */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl border border-white/50"
                                initial={{ scale: 1, opacity: 1 }}
                                animate={{ scale: 1.5, opacity: 0 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                            />
                        </motion.div>

                        {/* Text Animation */}
                        <div className="overflow-hidden">
                            <motion.h1
                                className="text-6xl md:text-8xl font-bold text-white tracking-tighter"
                                initial={{ y: 100 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95], delay: 0.2 }}
                            >
                                Poly<span className="text-transparent bg-clip-text bg-gradient-to-r from-polyPurple to-blue-500">ID</span>
                            </motion.h1>
                        </div>

                        {/* Subtitle / Loader Line */}
                        <motion.div
                            className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden w-48"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 192, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            <motion.div
                                className="h-full bg-gradient-to-r from-polyPurple to-blue-500"
                                initial={{ x: "-100%" }}
                                animate={{ x: "0%" }}
                                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
                            />
                        </motion.div>

                        <motion.p
                            className="mt-4 text-neutral-400 text-sm tracking-widest uppercase"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                        >
                            Verifiable Credentials
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
