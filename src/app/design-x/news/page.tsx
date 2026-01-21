'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, Tag, Search, TrendingUp } from 'lucide-react';
import Link from 'next/link';

// Mock Data
const allNews = [
    {
        id: '1',
        title: 'Kimmex Awarded "Best Commercial Project 2025" at PropertyGuru Awards',
        category: 'Awards',
        date: 'Oct 15, 2025',
        author: 'PR Team',
        image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&q=80&w=1200',
        excerpt: 'We are honored to receive the prestigious Gold Award for the new Ministry of Interior complex, recognized for its architectural excellence and sustainable design.',
        featured: true
    },
    {
        id: '2',
        title: 'Breaking Ground on the New Sihanoukville Logistics Hub',
        category: 'Project Updates',
        date: 'Sep 22, 2025',
        author: 'Project Mgmt',
        image: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&q=80&w=1200',
        excerpt: 'Phase 1 of the massive logistics center has officially begun. This project aims to revolutionize the supply chain infrastructure in the coastal region.',
        featured: false
    },
    {
        id: '3',
        title: 'Safety First: Achieving 2 Million Man-Hours Without Lost Time Injury',
        category: 'Safety',
        date: 'Aug 05, 2025',
        author: 'HSE Dept',
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200',
        excerpt: 'A milestone achievement for our construction teams at the Calmette Hospital site, proving that safety and speed can go hand in hand.',
        featured: false
    },
    {
        id: '4',
        title: 'Introducing Our New "Green Build" Initiative',
        category: 'Sustainability',
        date: 'Jul 12, 2025',
        author: 'Sustainability Lead',
        image: 'https://images.unsplash.com/photo-1518182170546-0766aaef3194?auto=format&fit=crop&q=80&w=1200',
        excerpt: 'Commiting to a sustainable future, Kimmex pledges to reduce carbon footprint by 30% across all new projects starting 2026.',
        featured: false
    },
    {
        id: '5',
        title: 'Annual Staff Retreat 2025: Building Bonds',
        category: 'Culture',
        date: 'Jun 20, 2025',
        author: 'HR Dept',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
        excerpt: 'Our team gathered in Siem Reap for a weekend of team building, strategy planning, and celebrating our shared successes.',
        featured: false
    },
    {
        id: '6',
        title: 'Kimmex Partners with RUPP for Internship Program',
        category: 'Community',
        date: 'May 30, 2025',
        author: 'HR Dept',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
        excerpt: 'Fostering the next generation of engineers, we are proud to announce a signed MoU with the Royal University of Phnom Penh.',
        featured: false
    }
];

const categories = ['All', 'Project Updates', 'Awards', 'Safety', 'Sustainability', 'Culture', 'Community'];

export default function NewsPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const featuredNews = allNews.find(n => n.featured) || allNews[0];
    const otherNews = allNews.filter(n => n.id !== featuredNews.id);

    const filteredNews = activeCategory === 'All'
        ? otherNews
        : otherNews.filter(n => n.category === activeCategory);

    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy">
            {/* --- HERO --- */}
            <section className="bg-titan-navy pt-40 pb-20 px-6 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <span className="text-titan-red font-bold uppercase tracking-widest text-xs mb-4 block">Newsroom</span>
                    <h1 className="text-5xl md:text-7xl font-black mb-6">Latest Updates</h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
                        Insights, announcements, and stories from Kimmex Construction.
                    </p>
                </div>
            </section>

            {/* --- FEATURED ENTRY --- */}
            <section className="px-6 -mt-10 relative z-20 max-w-[1400px] mx-auto mb-20">
                <Link href={`/design-x/news/${featuredNews.id}`} className="group relative block rounded-2xl overflow-hidden shadow-2xl aspect-[21/9]">
                    <img src={featuredNews.image} alt={featuredNews.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-titan-navy via-titan-navy/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 md:p-16">
                        <span className="bg-titan-red text-white px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-sm mb-4 inline-block">
                            Featured
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight group-hover:text-titan-red transition-colors w-full md:w-2/3">
                            {featuredNews.title}
                        </h2>
                        <div className="flex items-center gap-6 text-white/80 text-sm font-medium">
                            <span className="flex items-center gap-2"><Calendar size={16} /> {featuredNews.date}</span>
                            <span className="flex items-center gap-2"><User size={16} /> {featuredNews.author}</span>
                        </div>
                    </div>
                </Link>
            </section>

            {/* --- CONTENT AREA --- */}
            <section className="px-6 pb-32 max-w-[1400px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Sidebar / Filters */}
                    <div className="lg:w-1/4 space-y-10">
                        {/* Search */}
                        <div className="relative">
                            <input type="text" placeholder="Search news..." className="w-full bg-gray-50 border border-gray-200 pl-12 pr-4 py-3 rounded-lg text-sm focus:outline-none focus:border-titan-red transition-colors" />
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>

                        {/* Categories */}
                        <div>
                            <h3 className="text-lg font-black text-titan-navy mb-6 uppercase tracking-wide">Categories</h3>
                            <div className="space-y-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`w-full text-left px-4 py-2 rounded-md text-sm font-bold transition-all flex justify-between items-center group ${activeCategory === cat ? 'bg-titan-navy text-white' : 'text-titan-navy-subtle hover:bg-gray-50 hover:text-titan-red'}`}
                                    >
                                        {cat}
                                        {activeCategory === cat && <ArrowRight size={14} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Trending */}
                        <div className="bg-titan-bg-alt p-6 rounded-xl border border-titan-navy/5">
                            <h3 className="text-sm font-black text-titan-navy mb-4 uppercase tracking-wide flex items-center gap-2">
                                <TrendingUp size={16} className="text-titan-red" /> Trending
                            </h3>
                            <ul className="space-y-4">
                                <li className="text-sm font-medium text-titan-navy hover:text-titan-red cursor-pointer transition-colors block border-b border-gray-200 pb-2">
                                    New Safety Protocols 2026
                                </li>
                                <li className="text-sm font-medium text-titan-navy hover:text-titan-red cursor-pointer transition-colors block border-b border-gray-200 pb-2">
                                    Q3 Financial Report Highlights
                                </li>
                                <li className="text-sm font-medium text-titan-navy hover:text-titan-red cursor-pointer transition-colors block">
                                    Interview with CEO Mr. Kim
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* News Grid */}
                    <div className="lg:w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {filteredNews.map((news) => (
                                <Link href={`/design-x/news/${news.id}`} key={news.id} className="group flex flex-col h-full bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
                                    <div className="aspect-video overflow-hidden relative">
                                        <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest text-titan-navy shadow-sm">
                                            {news.category}
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
                                            <span>{news.date}</span>
                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                            <span>{news.author}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-titan-navy mb-4 group-hover:text-titan-red transition-colors leading-tight">
                                            {news.title}
                                        </h3>
                                        <p className="text-titan-navy-subtle text-sm leading-relaxed mb-6 line-clamp-3">
                                            {news.excerpt}
                                        </p>
                                        <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-titan-navy group-hover:translate-x-2 transition-transform">
                                            Read More <ArrowRight size={14} className="text-titan-red" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
