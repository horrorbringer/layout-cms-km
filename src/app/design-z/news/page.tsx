'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, User, Tag, Search, TrendingUp, Newspaper, ChevronRight, Briefcase, FileText, Download, Check, ChevronDown, Filter, Clock, Bookmark, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

// Mock Data for News
const allNews = [
    {
        id: '1',
        title: 'Kimmex Awarded "Best Commercial Project 2025" at PropertyGuru Awards',
        category: 'Awards',
        date: 'Oct 15, 2025',
        readTime: '5 min read',
        image: '/images/projects/Thumbnail-8.jpg',
        excerpt: 'We are honored to receive the prestigious Gold Award for the new Ministry of Interior complex, recognized for its architectural excellence and sustainable design.',
        featured: true,
        trending: true,
        author: 'Sarah Jenkins'
    },
    {
        id: '2',
        title: 'Breaking Ground on the New Sihanoukville Logistics Hub',
        category: 'Project Updates',
        date: 'Sep 22, 2025',
        readTime: '3 min read',
        image: '/images/projects/Thumbnail-1.jpg',
        excerpt: 'Phase 1 of the massive logistics center has officially begun. This project aims to revolutionize the supply chain infrastructure in the coastal region.',
        featured: false,
        trending: true,
        author: 'David Chen'
    },
    {
        id: '3',
        title: 'Safety First: Achieving 2 Million Man-Hours Without Lost Time Injury',
        category: 'Safety',
        date: 'Aug 05, 2025',
        readTime: '4 min read',
        image: '/images/projects/Thumbnail-2.jpg',
        excerpt: 'A milestone achievement for our construction teams at the Calmette Hospital site, proving that safety and speed can go hand in hand.',
        featured: false,
        trending: false,
        author: 'HSE Dept'
    },
    {
        id: '4',
        title: 'Introducing Our New "Green Build" Initiative',
        category: 'Sustainability',
        date: 'Jul 12, 2025',
        readTime: '6 min read',
        image: '/images/projects/Thumbnail-7.jpg',
        excerpt: 'Commiting to a sustainable future, Kimmex pledges to reduce carbon footprint by 30% across all new projects starting 2026.',
        featured: false,
        trending: false,
        author: 'Eco Team'
    },
    {
        id: '5',
        title: 'Annual Staff Retreat 2025: Building Bonds',
        category: 'Culture',
        date: 'Jun 20, 2025',
        readTime: '8 min read',
        image: '/images/projects/Thumbnail-5.jpg',
        excerpt: 'Our team gathered in Siem Reap for a weekend of team building, strategy planning, and celebrating our shared successes.',
        featured: false,
        trending: false,
        author: 'HR Dept'
    },
    {
        id: '6',
        title: 'Kimmex Partners with RUPP for Internship Program',
        category: 'Community',
        date: 'May 30, 2025',
        readTime: '2 min read',
        image: '/images/projects/Thumbnail-6.jpg',
        excerpt: 'Fostering the next generation of engineers, we are proud to announce a signed MoU with the Royal University of Phnom Penh.',
        featured: false,
        trending: true,
        author: 'University Rel.'
    },
    {
        id: '7',
        title: 'Innovative Steel Structures: A New Era',
        category: 'Innovation',
        date: 'Apr 10, 2025',
        readTime: '5 min read',
        image: '/images/projects/Thumbnail-3.jpg',
        excerpt: 'Exploring the latest in steel fabrication technology and how it speeds up delivery times.',
        featured: false,
        trending: false,
        author: 'Engineering'
    },
    {
        id: '8',
        title: 'Advanced MEP Systems Integration in High-Rise Buildings',
        category: 'Systems',
        date: 'Mar 15, 2025',
        readTime: '7 min read',
        image: '/images/projects/Thumbnail-4.jpg',
        excerpt: 'How we are implementing smart mechanical, electrical, and plumbing systems to improve building efficiency and sustainability.',
        featured: false,
        trending: false,
        author: 'Technical Team'
    }
];

const categories = ['All', 'Project Updates', 'Awards', 'Safety', 'Sustainability', 'Culture', 'Innovation', 'Systems'];
const years = ['All', '2026', '2025', '2024'];

const trendingNews = allNews.filter(n => n.trending);

export default function NewsPage() {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeYear, setActiveYear] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Filtered News Items
    const filteredNews = allNews.filter(n => {
        const matchesCategory = activeCategory === 'All' || n.category === activeCategory;
        const matchesYear = activeYear === 'All' || n.date.includes(activeYear);
        const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            n.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesYear && matchesSearch;
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
                        Insights & Updates
                    </span>
                    <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-lg">
                        TITAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-titan-red to-orange-400">NEWSROOM</span>
                    </h1>
                    <p className="max-w-xl text-white/80 text-lg font-light leading-relaxed drop-shadow-md">
                        Your central hub for the latest construction announcements, project milestones, and industry insights from Kimmex.
                    </p>
                </div>
            </div>

            {/* --- TOP BAR: FACETED FILTER SYSTEM --- */}
            <div className="sticky top-[80px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all py-2">
                <div className="max-w-[1600px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

                    {/* Category Facet */}
                    <div className="flex items-center gap-4 flex-1 overflow-x-auto no-scrollbar w-full">
                        <span className="text-[10px] font-black uppercase tracking-widest text-titan-navy/40 shrink-0">Category</span>
                        <div className="flex items-center gap-1.5 p-1 bg-gray-100/50 rounded-full">
                            {categories.map(cat => {
                                const isActive = activeCategory === cat;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`
                                            relative px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap z-10
                                            ${isActive ? 'text-white' : 'text-titan-navy/60 hover:text-titan-navy'}
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

                    <div className="flex items-center gap-6 w-full md:w-auto overflow-x-auto no-scrollbar">
                        {/* Year Facet */}
                        <div className="flex items-center gap-3 border-l border-gray-200 pl-6 h-8">
                            <span className="text-[10px] font-black uppercase tracking-widest text-titan-navy/40 shrink-0">{t('Year')}</span>
                            <div className="flex items-center gap-1 bg-gray-100/50 p-1 rounded-lg">
                                {years.map(year => {
                                    const isActive = activeYear === year;
                                    return (
                                        <button
                                            key={year}
                                            onClick={() => setActiveYear(year)}
                                            className={`
                                                relative px-3 py-1 rounded-md text-[9px] font-black tracking-widest transition-all
                                                ${isActive ? 'text-titan-red bg-white shadow-sm' : 'text-titan-navy/40 hover:text-titan-navy'}
                                            `}
                                        >
                                            {year === 'All' ? t('All') : year}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Search Facet */}
                        <div className="relative group min-w-[200px]">
                            <input
                                type="text"
                                placeholder={t('Search...')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 px-4 py-2 pl-9 rounded-xl text-xs font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-titan-navy/5 transition-all"
                            />
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-titan-red transition-colors" />
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
                            <Image src={activeFeaturedNews.image} alt={activeFeaturedNews.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
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
                                    <h1 className="text-2xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[0.9] tracking-tight group-hover:underline decoration-4 underline-offset-8 decoration-titan-red/50">
                                        {activeFeaturedNews.title}
                                    </h1>
                                    <p className="text-white/80 text-sm md:text-lg mb-6 line-clamp-2 max-w-xl font-medium leading-relaxed">
                                        {activeFeaturedNews.excerpt}
                                    </p>
                                    <div className="flex items-center gap-4 md:gap-6 text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-widest border-t border-white/10 pt-6">
                                        <span className="flex items-center gap-2 text-white"><User size={14} className="text-titan-red" /> {activeFeaturedNews.author}</span>
                                        <span className="flex items-center gap-2"><Calendar size={14} /> {activeFeaturedNews.date}</span>
                                        <span className="flex items-center gap-2"><Clock size={14} /> {activeFeaturedNews.readTime}</span>
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
                                    <TrendingUp size={16} className="text-titan-red" /> Trending Now
                                </h3>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2 space-y-8 custom-scrollbar">
                                {trendingNews.map((news, i) => (
                                    <Link key={i} href={`/design-z/news/${news.id}`} className="group flex gap-5 items-start">
                                        <div className="text-3xl font-black text-gray-100 group-hover:text-titan-red/20 transition-colors leading-none -mt-1">0{i + 1}</div>
                                        <div>
                                            <span className="text-[9px] font-bold text-titan-red uppercase tracking-wider mb-1.5 block">{news.category}</span>
                                            <h4 className="font-bold text-lg text-titan-navy leading-tight group-hover:text-titan-red transition-colors mb-2">
                                                {news.title}
                                            </h4>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">{news.date}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <button className="w-full mt-8 py-4 border-2 border-gray-100 rounded-xl text-xs font-black uppercase tracking-widest hover:border-titan-navy hover:bg-titan-navy hover:text-white transition-all">
                                View All Trends
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- BENTO GRID: RECENT STORIES --- */}
                <div className="mb-20">
                    <div className="flex items-end justify-between mb-10 pb-4 border-b border-gray-100">
                        <div>
                            <span className="text-titan-red font-black text-sm uppercase tracking-widest mb-2 block">The Archives</span>
                            <h2 className="text-3xl md:text-4xl font-black text-titan-navy">LATEST <span className="text-titan-navy/30">STORIES</span></h2>
                        </div>
                        {activeCategory !== 'All' && (
                            <button onClick={() => setActiveCategory('All')} className="text-xs text-titan-red font-black uppercase tracking-widest hover:underline">{t('Clear Filter')}</button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {gridNews.map((news, i) => (
                            <motion.div
                                key={news.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link href={`/design-z/news/${news.id}`} className="group block h-full flex flex-col">
                                    {/* Image Container */}
                                    <div className="aspect-[16/10] relative overflow-hidden rounded-xl mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                                        <Image src={news.image} alt={news.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/95 backdrop-blur text-titan-navy px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-sm shadow-sm">
                                                {t(news.category)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col flex-1">
                                        <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                                            <span className="flex items-center gap-1"><Calendar size={12} /> {news.date}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                            <span className="flex items-center gap-1"><Clock size={12} /> {news.readTime}</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-titan-navy mb-3 leading-[1.2] group-hover:text-titan-red transition-colors line-clamp-2">
                                            {news.title}
                                        </h3>

                                        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                                            {news.excerpt}
                                        </p>

                                        <div className="mt-auto flex items-center gap-2 group/author">
                                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-500 group-hover/author:bg-titan-red group-hover/author:text-white transition-colors">
                                                {news.author.charAt(0)}
                                            </div>
                                            <span className="text-[10px] font-bold uppercase text-gray-400 group-hover/author:text-titan-navy transition-colors">{t('By')} {news.author}</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* --- NEWSLETTER CTA --- */}
                <div className="bg-titan-navy rounded-3xl p-8 lg:p-24 relative overflow-hidden text-center lg:text-left mb-20 shadow-2xl">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-titan-red rounded-full blur-[200px] opacity-15 -mr-48 -mt-48 pointer-events-none"></div>
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 space-y-6">
                            <h2 className="text-3xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                                STAY AHEAD OF <br /><span className="text-white/30">THE CURVE.</span>
                            </h2>
                            <p className="text-white/60 text-lg max-w-xl font-light leading-relaxed">
                                Subscribe to our newsletter for exclusive insights on Cambodia's construction landscape, project updates, and industry analysis.
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
