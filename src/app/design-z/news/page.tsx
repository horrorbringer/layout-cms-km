'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, User, Tag, TrendingUp, Newspaper, ChevronRight, Briefcase, FileText, Download, Check, ChevronDown, Filter, Clock, Bookmark, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage, getLocalizedText } from '../context/LanguageContext';
import { allNews } from '../data/newsData';


const categories = ['All', 'Trending', 'Project Updates', 'Awards', 'Safety', 'Sustainability', 'Culture', 'Innovation', 'Systems'];
const years = ['All', '2026', '2025', '2024'];

const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
        'Awards': 'bg-amber-50 text-amber-600 border-amber-100',
        'Project Updates': 'bg-blue-50 text-blue-600 border-blue-100',
        'Safety': 'bg-red-50 text-red-600 border-red-100',
        'Sustainability': 'bg-emerald-50 text-emerald-600 border-emerald-100',
        'Culture': 'bg-purple-50 text-purple-600 border-purple-100',
        'Innovation': 'bg-cyan-50 text-cyan-600 border-cyan-100',
        'Systems': 'bg-slate-50 text-slate-600 border-slate-100',
        'Trending': 'bg-orange-50 text-orange-600 border-orange-100',
    };
    return colors[category] || 'bg-gray-50 text-gray-600 border-gray-100';
};

const trendingNews = allNews.filter(n => n.trending);

export default function NewsPage() {
    const { t, language } = useLanguage();
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeYear, setActiveYear] = useState('All');
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
    const archiveRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsYearDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filtered News Items
    const filteredNews = allNews.filter(n => {
        const matchesCategory = activeCategory === 'All' ||
            (activeCategory === 'Trending' ? n.trending : n.category === activeCategory);
        const matchesYear = activeYear === 'All' || n.year === activeYear;
        return matchesCategory && matchesYear;
    });

    const activeFeaturedNews = filteredNews[0] || allNews[0];
    const gridNews = filteredNews.filter(n => n.id !== activeFeaturedNews.id);

    return (
        <div className="bg-gray-50/50 min-h-screen font-sans text-titan-navy pb-24">

            {/* --- HERO BANNER (Top) --- */}
            <div className="relative pt-[120px] pb-20 px-6 bg-[#0B1221] border-b border-white/10 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-[url('/images/projects/Thumbnail-8.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B1221]/90 via-[#1a2c4e]/80 to-[#0B1221]/90"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-titan-red rounded-full blur-[180px] opacity-15 -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[180px] opacity-10 -ml-20 -mb-20"></div>

                <div className="relative z-10 max-w-[1600px] mx-auto flex flex-col items-center text-center">
                    <span className="inline-block px-3 py-1 rounded-full border border-white/20 text-[10px] font-black uppercase tracking-widest text-white/80 mb-4 backdrop-blur-sm bg-white/5 mt-5">
                        {t('INSIGHTS & UPDATES')}
                    </span>
                    <h1 className={`font-black text-white mb-6 drop-shadow-lg font-outfit ${language === 'kh'
                        ? 'text-4xl md:text-5xl leading-[1.3] tracking-normal'
                        : 'text-4xl md:text-7xl leading-tight tracking-tight'
                        }`}>
                        TITAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-titan-red to-orange-400">{t('NEWSROOM')}</span>
                    </h1>
                    <p className={`max-w-xl text-white/80 font-light drop-shadow-md ${language === 'kh' ? 'text-base leading-[1.8]' : 'text-lg leading-relaxed'
                        }`}>
                        {t('Newsroom Subtitle')}
                    </p>
                </div>
            </div>

            {/* --- TOP BAR: FACETED FILTER SYSTEM --- */}
            <div className="sticky top-[80px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all py-2">
                <div className="max-w-[1600px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

                    {/* Topic Facet */}
                    <div className="flex items-center gap-4 flex-1 overflow-x-auto no-scrollbar w-full">
                        <span className="text-[10px] font-black uppercase tracking-widest text-titan-navy/40 shrink-0">{t('Topics')}</span>
                        <div className="flex items-center gap-1.5 p-1 bg-gray-100/50 rounded-full">
                            {categories.map(cat => {
                                const isActive = activeCategory === cat;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`
                                            relative px-5 py-2 rounded-full transition-all whitespace-nowrap z-10 font-bold
                                            ${language === 'kh' ? 'text-[13px]' : 'text-[10px] uppercase tracking-widest font-black'}
                                            ${isActive ? 'text-white' : 'text-titan-navy/40 hover:text-titan-navy hover:bg-gray-100'}
                                        `}
                                    >
                                        {cat === 'All' ? t('All Stories') : t(cat)}
                                        {isActive && (
                                            <motion.div
                                                layoutId="newsActiveCategory"
                                                className="absolute inset-0 bg-titan-navy rounded-full -z-10 shadow-md"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-center gap-6 w-full md:w-auto">
                        {/* Year Dropdown */}
                        <div className="flex items-center gap-3 border-l border-gray-200 pl-6 h-8 relative" ref={dropdownRef}>
                            <span className="text-[10px] font-black uppercase tracking-widest text-titan-navy/40 shrink-0">{t('Year')}</span>
                            <div className="relative">
                                <button
                                    onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                                    className="flex items-center gap-2.5 bg-gray-100/80 hover:bg-white border border-transparent hover:border-titan-red/30 px-5 py-2.5 rounded-full text-[10px] font-black tracking-widest text-titan-navy transition-all min-w-[160px] justify-between shadow-sm active:scale-95 group/drop"
                                >
                                    <div className="flex items-center gap-2">
                                        <Calendar size={12} className="text-titan-red/60 group-hover:text-titan-red transition-colors" />
                                        <span className="uppercase">{t('Year')}: {activeYear === 'All' ? t('All') : activeYear}</span>
                                    </div>
                                    <ChevronDown size={14} className={`text-titan-navy/30 transition-transform duration-500 ${isYearDropdownOpen ? 'rotate-180 text-titan-red' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isYearDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 12, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 12, scale: 0.95 }}
                                            className="absolute right-0 mt-3 w-52 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden z-[100] ring-1 ring-black/[0.03]"
                                        >
                                            <div className="p-1.5">
                                                {years.map(year => (
                                                    <button
                                                        key={year}
                                                        onClick={() => {
                                                            setActiveYear(year);
                                                            setIsYearDropdownOpen(false);
                                                        }}
                                                        className={`
                                                            w-full text-left px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                                                            ${activeYear === year
                                                                ? 'bg-titan-navy text-white shadow-lg shadow-titan-navy/20'
                                                                : 'text-titan-navy/50 hover:bg-gray-50 hover:text-titan-navy'
                                                            }
                                                        `}
                                                    >
                                                        {year === 'All' ? `${t('Year')}: ${t('All')}` : `${t('Year')}: ${year}`}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-4 md:px-6 pt-10">

                {/* --- HERO: MAGAZINE COVER --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 h-auto lg:h-[550px]">

                    {/* Featured Article (Left - Large) */}
                    <div className="lg:col-span-8 h-full relative group cursor-pointer overflow-hidden rounded-2xl shadow-sm border border-gray-100">
                        <Link href={`/design-z/news/${activeFeaturedNews.id}`} className="block h-[400px] md:h-[500px] lg:h-full relative">
                            <Image src={activeFeaturedNews.image} alt={getLocalizedText(activeFeaturedNews.title, language)} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-titan-navy/90 via-titan-navy/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full max-w-3xl">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <span className="inline-flex items-center gap-2 bg-titan-red/90 backdrop-blur text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 mb-4 rounded-sm shadow-lg">
                                        <TrendingUp size={12} /> {t('Featured Story')}
                                    </span>
                                    <h1 className={`font-black text-white mb-6 group-hover:underline decoration-4 underline-offset-8 decoration-titan-red/50 font-outfit ${language === 'kh'
                                        ? 'text-xl md:text-3xl lg:text-4xl leading-[1.4] tracking-normal'
                                        : 'text-2xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight'
                                        }`}>
                                        {getLocalizedText(activeFeaturedNews.title, language)}
                                    </h1>
                                    <p className={`text-white/80 mb-6 line-clamp-2 max-w-xl font-medium ${language === 'kh' ? 'text-sm md:text-base leading-[1.8]' : 'text-sm md:text-lg leading-relaxed'
                                        }`}>
                                        {getLocalizedText(activeFeaturedNews.excerpt, language)}
                                    </p>
                                    <div className="flex items-center gap-4 md:gap-6 text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-widest border-t border-white/10 pt-6">
                                        <span className="flex items-center gap-2 text-titan-navy/70"><Calendar size={14} className="text-titan-red" /> {getLocalizedText(activeFeaturedNews.date, language)}</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span className="flex items-center gap-2"><User size={14} /> {getLocalizedText(activeFeaturedNews.author, language)}</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span className="flex items-center gap-2"><Clock size={14} /> {getLocalizedText(activeFeaturedNews.readTime, language)}</span>
                                    </div>
                                </motion.div>
                            </div>
                        </Link>
                    </div>

                    {/* Side Column: Trending / Top Picks */}
                    <div className="lg:col-span-4 flex flex-col gap-6 h-full">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                                <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-titan-navy">
                                    <TrendingUp size={16} className="text-titan-red" /> {t('Trending')}
                                </h3>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2 space-y-8 custom-scrollbar">
                                {trendingNews.map((news, i) => (
                                    <Link key={i} href={`/design-z/news/${news.id}`} className="group flex gap-5 items-start">
                                        <div className="text-3xl font-black text-gray-100 group-hover:text-titan-red/20 transition-colors leading-none -mt-1">0{i + 1}</div>
                                        <div>
                                            <span className="text-[9px] font-bold text-titan-red uppercase tracking-wider mb-1.5 block">{t(news.category)}</span>
                                            <h4 className={`font-bold text-titan-navy group-hover:text-titan-red transition-colors mb-2 ${language === 'kh' ? 'text-base leading-[1.6]' : 'text-lg leading-tight'
                                                }`}>
                                                {getLocalizedText(news.title, language)}
                                            </h4>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">{getLocalizedText(news.date, language)}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <button
                                onClick={() => {
                                    setActiveCategory('Trending');
                                    archiveRef.current?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="w-full mt-8 py-4 border-2 border-gray-100 rounded-xl text-xs font-black uppercase tracking-widest hover:border-titan-navy hover:bg-titan-navy hover:text-white transition-all shadow-sm active:scale-95"
                            >
                                {t('View All Trends')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- BENTO GRID: RECENT STORIES --- */}
                <div className="mb-20" ref={archiveRef}>
                    <div className="flex items-end justify-between mb-10 pb-4 border-b border-gray-100">
                        <div>
                            <span className="text-titan-red font-black text-sm uppercase tracking-widest mb-2 block">{t('The Archives')}</span>
                            <h2 className="text-3xl md:text-4xl font-black text-titan-navy font-outfit">{t('LATEST')} <span className="text-titan-navy/30">{t('STORIES')}</span></h2>
                        </div>
                        {activeCategory !== 'All' && (
                            <button onClick={() => setActiveCategory('All')} className="text-xs text-titan-red font-black uppercase tracking-widest hover:underline">{t('Clear Filter')}</button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                        {gridNews.length > 0 ? (
                            gridNews.map((news, i) => (
                                <motion.div
                                    key={news.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: i * 0.05,
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 20
                                    }}
                                >
                                    <Link href={`/design-z/news/${news.id}`} className="group block h-full flex flex-col">
                                        {/* Image Container */}
                                        <div className="aspect-[16/10] relative overflow-hidden rounded-2xl mb-8 shadow-sm group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] transition-all duration-500">
                                            <Image src={news.image} alt={getLocalizedText(news.title, language)} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                                            <div className="absolute top-5 left-5">
                                                <span className={`
                                                    backdrop-blur-md px-4 py-2 rounded-lg shadow-sm border border-white/20
                                                    ${language === 'kh' ? 'text-[11px] font-bold' : 'text-[9px] font-black uppercase tracking-[0.15em]'}
                                                    ${getCategoryColor(news.category)}
                                                `}>
                                                    {t(news.category)}
                                                </span>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-titan-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-col flex-1 px-1">
                                            <div className="flex items-center gap-4 text-[10px] font-black text-titan-navy/30 uppercase tracking-[0.2em] mb-4">
                                                <span className="flex items-center gap-2"><Calendar size={12} className="text-titan-red" /> {getLocalizedText(news.date, language)}</span>
                                                <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                                                <span className="flex items-center gap-2"><Clock size={12} /> {getLocalizedText(news.readTime, language)}</span>
                                            </div>

                                            <h3 className={`font-black text-titan-navy mb-4 group-hover:text-titan-red transition-all duration-300 ${language === 'kh'
                                                    ? 'text-lg md:text-xl leading-[1.5]'
                                                    : 'text-xl md:text-2xl leading-[1.1]'
                                                }`}>
                                                {getLocalizedText(news.title, language)}
                                            </h3>

                                            <p className={`text-gray-500/80 mb-6 font-medium line-clamp-3 ${language === 'kh' ? 'text-sm leading-[1.9]' : 'text-[15px] leading-relaxed'
                                                }`}>
                                                {getLocalizedText(news.excerpt, language)}
                                            </p>

                                            <div className="mt-auto flex items-center justify-between group/footer">
                                                <div className="flex items-center gap-3 group/author">
                                                    <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-[10px] font-black text-titan-navy/40 group-hover/author:bg-titan-navy group-hover/author:text-white transition-all duration-300 shadow-sm">
                                                        {getLocalizedText(news.author, language).charAt(0)}
                                                    </div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-titan-navy/40 group-hover/author:text-titan-navy transition-colors">{t('By')} {getLocalizedText(news.author, language)}</span>
                                                </div>
                                                <div className="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                                    <ArrowRight size={18} className="text-titan-red" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-24 text-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center gap-6"
                                >
                                    <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center text-gray-300 mb-2">
                                        <Newspaper size={40} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black text-titan-navy uppercase tracking-tight">{t('No stories found')}</h3>
                                        <p className="text-gray-400 font-medium max-w-sm mx-auto">{t('No stories desc')}</p>
                                    </div>
                                    <button
                                        onClick={() => { setActiveCategory('All'); setActiveYear('All'); }}
                                        className="mt-4 px-8 py-3 bg-titan-navy text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-titan-red transition-all shadow-xl shadow-titan-navy/20"
                                    >
                                        {t('Reset All Filters')}
                                    </button>
                                </motion.div>
                            </div>
                        )}
                    </div>

                    {gridNews.length > 0 && (
                        <div className="mt-20 flex justify-center">
                            <button className="group flex items-center gap-4 px-10 py-5 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-titan-navy hover:bg-titan-navy hover:text-white hover:border-titan-navy transition-all shadow-sm hover:shadow-2xl hover:-translate-y-1">
                                {t('Load More Stories')}
                                <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform" />
                            </button>
                        </div>
                    )}
                </div>

                {/* --- NEWSLETTER CTA --- */}
                <div className="bg-titan-navy rounded-3xl p-8 lg:p-24 relative overflow-hidden text-center lg:text-left mb-20 shadow-2xl">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-titan-red rounded-full blur-[200px] opacity-15 -mr-48 -mt-48 pointer-events-none"></div>
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 space-y-6">
                            <h2 className="text-3xl lg:text-6xl font-black text-white leading-tight tracking-tight font-outfit">
                                {t('STAY AHEAD OF')} <br /><span className="text-white/30">{t('THE CURVE')}</span>
                            </h2>
                            <p className="text-white/60 text-lg max-w-xl font-light leading-relaxed">
                                {t('Newsletter Desc')}
                            </p>
                        </div>
                        <div className="lg:col-span-5 bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-inner">
                            <form className="flex flex-col gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">{t('Email Address')}</label>
                                    <input type="email" placeholder="name@company.com" className="w-full bg-white/10 border border-white/10 focus:bg-white focus:text-titan-navy px-6 py-4 rounded-xl text-white placeholder:text-white/30 focus:outline-none transition-all font-medium" />
                                </div>
                                <button className="w-full bg-titan-red text-white font-black uppercase tracking-widest py-4 rounded-xl hover:bg-white hover:text-titan-red transition-all shadow-lg hover:shadow-xl mt-2">
                                    {t('Subscribe Now')}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
