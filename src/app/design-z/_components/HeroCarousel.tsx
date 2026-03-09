'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HeroCarousel({ initialData }: { initialData?: any }) {
    const { t, language, fontClassName } = useLanguage();

    const defaultSlides = [
        {
            id: 1,
            image: '/images/projects/Thumbnail-1.jpg',
            subtitle: t('Government Infrastructure'),
            title: t('Ministry of Economy'),
            desc: t('Slide 1 Desc'),
            link: '/design-z/projects/mef'
        },
        {
            id: 2,
            image: '/images/projects/Thumbnail-2.jpg',
            subtitle: t('Water Infrastructure'),
            title: t('Khleang Toeuk WTP'),
            desc: t('Slide 2 Desc'),
            link: '/design-z/projects/kt-wtp'
        },
        {
            id: 3,
            image: '/images/projects/Thumbnail-3.jpg',
            subtitle: t('Infrastructure Protection'),
            title: t('Mekong Bank Protection'),
            desc: t('Slide 3 Desc'),
            link: '/design-z/projects/mekong-slope'
        }
    ];

    const slides = (initialData && initialData.slides) ? initialData.slides.map((s: any, idx: number) => ({
        id: idx + 1,
        image: s.image,
        subtitle: s.subtitle[language] || s.subtitle.en || '',
        title: s.title[language] || s.title.en || '',
        desc: s.desc[language] || s.desc.en || '',
        link: s.link || '/design-z/projects'
    })) : defaultSlides;

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

    const slideVariants: import('framer-motion').Variants = {
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
                x: { type: 'spring' as const, stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                scale: { duration: 6, ease: "linear" as const } // Ken Burns effect
            }
        },
        exit: (direction: number) => ({
            x: direction > 0 ? '-100%' : '100%',
            opacity: 0,
            scale: 1, // Reset scale on exit to avoid jump
            transition: {
                x: { type: 'spring' as const, stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 }
            }
        })
    };

    const contentVariants = {
        initial: { opacity: 0, y: 30 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.3, duration: 0.8, staggerChildren: 0.2 }
        },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };

    return (
        <header className={`relative h-screen min-h-[700px] overflow-hidden bg-titan-navy text-white ${fontClassName}`}>
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
                    <div className="absolute inset-0 bg-gradient-to-r from-titan-navy/60 via-titan-navy/30 to-transparent"></div>
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
                                <div className="w-12 h-1 bg-titan-red"></div>
                                <span className="text-titan-red font-bold tracking-[0.2em] uppercase text-sm">
                                    {slides[current].subtitle}
                                </span>
                            </motion.div>

                            <motion.h1
                                variants={contentVariants}
                                className={`font-black mb-6 ${language === 'kh'
                                    ? 'text-4xl md:text-6xl leading-[1.3] tracking-normal'
                                    : 'text-5xl md:text-7xl leading-[1.1] tracking-tight'
                                    }`}
                            >
                                {slides[current].title}
                            </motion.h1>

                            <motion.p
                                variants={contentVariants}
                                className={`text-white/80 max-w-lg mb-10 font-light ${language === 'kh' ? 'text-base md:text-lg leading-[1.6]' : 'text-lg md:text-xl leading-relaxed'
                                    }`}
                            >
                                {slides[current].desc}
                            </motion.p>

                            <motion.div
                                variants={contentVariants}
                                className="flex flex-wrap gap-4"
                            >
                                <Link href={slides[current].link} className="group bg-titan-red text-white px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-titan-navy transition-all duration-300 flex items-center gap-3 rounded-none">
                                    <span>{t('View Project')}</span>
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                                </Link>
                                <Link href="/design-z/contact" className="group border-2 border-white text-white px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-titan-navy transition-all duration-300 flex items-center gap-3 rounded">
                                    <Phone size={18} />
                                    <span>{t('Contact Us')}</span>
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
                        {slides.map((_: any, idx: number) => (
                            <button
                                key={idx}
                                onClick={() => goToSlide(idx)}
                                className={`h-1.5 transition-all duration-300 ${idx === current ? 'w-16 bg-titan-red' : 'w-8 bg-white/30 hover:bg-white/60'}`}
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
                        <div className="text-[10px] text-accent-orange uppercase tracking-widest font-bold">{t('Years Exp')}</div>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-white">150+</div>
                        <div className="text-[10px] text-titan-red uppercase tracking-widest font-bold">{t('Projects')}</div>
                    </div>
                </div>
            </div>
        </header>
    );
}
