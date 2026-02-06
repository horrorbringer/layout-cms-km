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

export default function UnifiedHero({ mode = 'carousel', onToggle }: UnifiedHeroProps) {
    return (
        <div className="relative">
            {/* Premium Mode Switcher (Sliding Pill) - Moved to Right to avoid overlap */}
            <div className="absolute top-[130px] right-12 z-[60] hidden lg:block">
                <div className="relative bg-titan-navy/40 backdrop-blur-xl border border-white/10 p-1.5 rounded-full flex items-center shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    {/* Sliding Background Pill */}
                    <motion.div
                        className="absolute h-[calc(100%-12px)] rounded-full bg-titan-red shadow-lg shadow-titan-red/20"
                        initial={false}
                        animate={{
                            left: mode === 'video' ? '6px' : '50%',
                            width: mode === 'video' ? '120px' : '120px'
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />

                    <button
                        onClick={() => onToggle?.('video')}
                        className={`relative z-10 flex items-center justify-center gap-2 w-[120px] py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${mode === 'video' ? 'text-white' : 'text-white/40 hover:text-white/60'}`}
                    >
                        <Play size={12} fill={mode === 'video' ? 'currentColor' : 'none'} className="mb-0.5" />
                        Cinematic
                    </button>

                    <button
                        onClick={() => onToggle?.('carousel')}
                        className={`relative z-10 flex items-center justify-center gap-2 w-[120px] py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${mode === 'carousel' ? 'text-white' : 'text-white/40 hover:text-white/60'}`}
                    >
                        <ImageIcon size={12} className="mb-0.5" />
                        Gallery
                    </button>
                </div>
            </div>

            {/* Mobile Mode Switcher - Moved to Right Corner */}
            <div className="absolute top-[100px] right-6 z-[60] lg:hidden">
                <div className="relative bg-titan-navy/60 backdrop-blur-lg border border-white/20 p-1 rounded-full flex items-center shadow-2xl scale-90 origin-right">
                    <motion.div
                        className="absolute h-[calc(100%-8px)] rounded-full bg-titan-red"
                        initial={false}
                        animate={{
                            left: mode === 'video' ? '4px' : 'calc(50% + 2px)',
                            width: 'calc(50% - 6px)'
                        }}
                    />
                    <button
                        onClick={() => onToggle?.('video')}
                        className={`relative z-10 p-2.5 px-4 rounded-full transition-all duration-500 ${mode === 'video' ? 'text-white' : 'text-white/40'}`}
                    >
                        <Play size={14} fill={mode === 'video' ? 'currentColor' : 'none'} />
                    </button>
                    <button
                        onClick={() => onToggle?.('carousel')}
                        className={`relative z-10 p-2.5 px-4 rounded-full transition-all duration-500 ${mode === 'carousel' ? 'text-white' : 'text-white/40'}`}
                    >
                        <ImageIcon size={14} />
                    </button>
                </div>
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
