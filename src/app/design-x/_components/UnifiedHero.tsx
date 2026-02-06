'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Image as ImageIcon } from 'lucide-react';
import HeroVideo from './Hero';
import HeroCarousel from './HeroCarousel';

export type HeroMode = 'video' | 'carousel';

interface UnifiedHeroProps {
    mode?: HeroMode;
    onToggle?: (mode: HeroMode) => void;
}

/**
 * UnifiedHero Component
 * 
 * This component serves as a switch between the Video Hero and the Carousel Hero.
 * It features a premium interactive toggle switch.
 */
export default function UnifiedHero({ mode = 'carousel', onToggle }: UnifiedHeroProps) {
    return (
        <div className="relative">
            {/* Premium Mode Switcher (Sliding Pill) */}
            <div className="absolute top-36 left-12 z-[60] hidden lg:block">
                <div className="relative bg-titan-navy/40 backdrop-blur-xl border border-white/10 p-1 rounded-full flex gap-1 shadow-2xl">
                    {/* Animated Pill Background */}
                    <motion.div
                        className="absolute inset-y-1 bg-titan-red rounded-full"
                        initial={false}
                        animate={{
                            x: mode === 'video' ? 0 : 124,
                            width: mode === 'video' ? 120 : 100
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />

                    {/* Video Mode Button */}
                    <button
                        onClick={() => onToggle?.('video')}
                        className={`
                            relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-colors duration-300
                            ${mode === 'video' ? 'text-white' : 'text-white/60 hover:text-white'}
                        `}
                    >
                        <Play size={14} fill={mode === 'video' ? 'currentColor' : 'none'} />
                        Cinematic
                    </button>

                    {/* Carousel Mode Button */}
                    <button
                        onClick={() => onToggle?.('carousel')}
                        className={`
                            relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-colors duration-300
                            ${mode === 'carousel' ? 'text-white' : 'text-white/60 hover:text-white'}
                        `}
                    >
                        <ImageIcon size={14} />
                        Gallery
                    </button>
                </div>
            </div>

            {/* Mobile Switcher (Simplified) */}
            <div className="absolute top-28 left-6 z-[60] lg:hidden">
                <button
                    onClick={() => onToggle?.(mode === 'video' ? 'carousel' : 'video')}
                    className="bg-titan-navy/60 backdrop-blur-lg border border-white/20 px-4 py-2 rounded-full text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2"
                >
                    {mode === 'video' ? <ImageIcon size={12} /> : <Play size={12} fill="white" />}
                    {mode === 'video' ? 'Switch to Gallery' : 'Switch to Video'}
                </button>
            </div>

            {/* Render Selected Hero with Smooth Transition */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={mode}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="w-full"
                >
                    {mode === 'video' ? <HeroVideo /> : <HeroCarousel />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
