'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Phone } from 'lucide-react';

const slides = [
    {
        id: 1,
        image: '/images/projects/Thumbnail-1.jpg',
        subtitle: 'Government Infrastructure',
        title: 'Ministry of Economy',
        desc: 'A landmark of modern governance and architectural excellence in the heart of Phnom Penh.',
        link: '/design-x/projects/1'
    },
    {
        id: 2,
        image: '/images/projects/Thumbnail-2.jpg',
        subtitle: 'Commercial Excellence',
        title: 'Vattanac Capital Extension',
        desc: 'Pushing the boundaries of vertical design and engineering for Cambodia’s premium business hub.',
        link: '/design-x/projects/2'
    },
    {
        id: 3,
        image: '/images/projects/Thumbnail-3.jpg',
        subtitle: 'National Development',
        title: 'Sihanoukville Deep Sea Port',
        desc: 'Building the gateway to global trade with robust maritime infrastructure.',
        link: '/design-x/projects/3'
    }
];

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 6000);
        return () => clearInterval(timer);
    }, [current]);

    const nextSlide = () => {
        setDirection(1);
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const goToSlide = (index: number) => {
        setDirection(index > current ? 1 : -1);
        setCurrent(index);
    };

    const slideVariants: Variants = {
        initial: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 1.1
        }),
        animate: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                scale: { duration: 6, ease: "linear" } // Ken Burns effect
            }
        },
        exit: (direction: number) => ({
            x: direction > 0 ? '-100%' : '100%',
            opacity: 0,
            scale: 1, // Reset scale on exit to avoid jump
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 }
            }
        })
    };

    const contentVariants: Variants = {
        initial: { opacity: 0, y: 30 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.3, duration: 0.8, staggerChildren: 0.2 }
        },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };

    return (
        <header className="relative h-screen min-h-[700px] overflow-hidden bg-titan-navy text-white">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0 w-full h-full"
                >
                    <Image
                        src={slides[current].image}
                        alt={slides[current].title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-titan-navy/90 via-titan-navy/50 to-transparent"></div>
                </motion.div>
            </AnimatePresence>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center">
                <div className="max-w-[1400px] w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            variants={contentVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="z-10"
                        >
                            <motion.div
                                variants={contentVariants}
                                className="flex items-center gap-4 mb-6"
                            >
                                <div className="w-12 h-1 bg-accent-orange"></div>
                                <span className="text-accent-orange font-bold tracking-[0.2em] uppercase text-sm">
                                    {slides[current].subtitle}
                                </span>
                            </motion.div>

                            <motion.h1
                                variants={contentVariants}
                                className="text-5xl md:text-7xl font-black leading-[1.1] mb-6 tracking-tight"
                            >
                                {slides[current].title}
                            </motion.h1>

                            <motion.p
                                variants={contentVariants}
                                className="text-lg md:text-xl text-white/80 max-w-lg mb-10 leading-relaxed font-light"
                            >
                                {slides[current].desc}
                            </motion.p>

                            <motion.div
                                variants={contentVariants}
                                className="flex flex-wrap gap-4"
                            >
                                <Link href={slides[current].link} className="group bg-accent-orange text-white px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-titan-navy transition-all duration-300 flex items-center gap-3 rounded">
                                    <span>View Project</span>
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                                </Link>
                                <Link href="/design-x/contact" className="group border-2 border-white text-white px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-titan-navy transition-all duration-300 flex items-center gap-3 rounded">
                                    <Phone size={18} />
                                    <span>Contact Us</span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-12 left-0 right-0 z-20">
                <div className="max-w-[1400px] mx-auto px-6 flex items-end justify-between">
                    {/* Pagination Lines */}
                    <div className="flex gap-4">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => goToSlide(idx)}
                                className={`h-1 transition-all duration-300 ${idx === current ? 'w-16 bg-accent-orange' : 'w-8 bg-white/30 hover:bg-white/60'}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>

                    {/* Arrows */}
                    <div className="flex gap-2">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-accent-orange hover:border-accent-orange transition-all duration-300 text-white"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-accent-orange hover:border-accent-orange transition-all duration-300 text-white"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Decorative Stats */}
            <div className="hidden lg:block absolute bottom-12 right-[20%] z-10">
                <div className="flex gap-12">
                    <div>
                        <div className="text-3xl font-black text-white">25+</div>
                        <div className="text-[10px] text-accent-orange uppercase tracking-widest font-bold">Years Exp</div>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-white">150+</div>
                        <div className="text-[10px] text-accent-orange uppercase tracking-widest font-bold">Projects</div>
                    </div>
                </div>
            </div>
        </header>
    );
}
