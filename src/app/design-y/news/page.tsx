'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Search, MapPin, PlayCircle } from 'lucide-react';
import Link from 'next/link';

// Mock Data
const mainStory = {
    id: 'LOG-001',
    title: 'Kimmex Wins "Best Commercial Project 2025" at PropertyGuru Awards',
    category: 'Awards',
    date: '2h ago',
    location: 'Singapore',
    image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&q=80&w=1600',
    excerpt: 'The Skyline Tower project was universally acclaimed for its structural innovation and carbon-neutral footprint, setting a new benchmark for high-rise developments in Southeast Asia.'
};

const subStories = [
    {
        id: 'LOG-002',
        title: 'Sihanoukville Logistics Hub: Phase 1 Initiated',
        category: 'Projects',
        date: '4h ago',
        location: 'Sihanoukville',
        image: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'LOG-003',
        title: 'New Safety Milestone Achieved',
        category: 'Safety',
        date: '6h ago',
        location: 'Phnom Penh',
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800'
    }
];

const latestNews = [
    {
        id: 'LOG-004',
        title: '"Green Build" Initiative Launch',
        category: 'Sustainability',
        date: '1d ago',
        location: 'Global',
        image: 'https://images.unsplash.com/photo-1518182170546-0766aaef3194?auto=format&fit=crop&q=80&w=800',
        excerpt: 'Committing to a 30% carbon footprint reduction across all new project vectors.'
    },
    {
        id: 'LOG-005',
        title: 'Annual Staff Retreat: Sector Siem Reap',
        category: 'Culture',
        date: '2d ago',
        location: 'Siem Reap',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
        excerpt: 'Strategic planning and team cohesion exercises conducted at the northern HQ.'
    },
    {
        id: 'LOG-006',
        title: 'Partnership Established with RUPP',
        category: 'Community',
        date: '3d ago',
        location: 'Phnom Penh',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
        excerpt: 'Fostering the next generation of engineering talent through joint research.'
    }
];

const headlines = [
    { id: 'h1', title: 'Steel prices stabilize after Q3 fluctuations', category: 'Market' },
    { id: 'h2', title: 'Q4 Recruitment Drive: Engineering Leads', category: 'Careers' },
    { id: 'h3', title: 'Internal Memo: Holiday Schedule Update', category: 'Notice' },
    { id: 'h4', title: 'Tech Review: Spot Robot Dog tested at Site B', category: 'Tech' },
    { id: 'h5', title: 'CEO Interview on CNBC Asia', category: 'Press' },
];

export default function NewsPage() {
    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy">

            {/* --- HEADER --- */}
            <div className="bg-titan-bg/50 pt-42 pb-12 border-b border-titan-navy/10">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-end">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-black text-titan-navy tracking-tighter mb-4">
                            NEWSROOM
                        </h1>
                        <p className="text-lg text-titan-navy/60 max-w-2xl font-light">
                            Latest corporate bulletins, field reports, and market analysis.
                        </p>
                    </div>
                </div>
            </div>

            <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">

                {/* --- HERO SECTION (BBC STYLE) --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16 border-b border-gray-200 pb-12">

                    {/* Main Story */}
                    <Link href={`/design-y/news/${mainStory.id}`} className="lg:col-span-2 group">
                        <div className="relative aspect-video overflow-hidden bg-titan-bg mb-4">
                            <img src={mainStory.image} alt={mainStory.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute bottom-0 left-0 bg-titan-red text-white text-xs font-bold uppercase px-3 py-1">
                                {mainStory.category}
                            </div>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-3 group-hover:text-titan-red transition-colors text-titan-navy">
                            {mainStory.title}
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-4 max-w-3xl">
                            {mainStory.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-wide">
                            <span className="flex items-center gap-1"><Clock size={14} /> {mainStory.date}</span>
                            <span className="flex items-center gap-1"><MapPin size={14} /> {mainStory.location}</span>
                        </div>
                    </Link>

                    {/* Secondary Stories Column */}
                    <div className="lg:col-span-1 flex flex-col gap-8">
                        {subStories.map(story => (
                            <Link href={`/design-y/news/${story.id}`} key={story.id} className="group flex flex-col h-full">
                                <div className="aspect-[3/2] overflow-hidden bg-titan-bg mb-3 relative">
                                    <img src={story.image} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 text-[10px] font-bold text-titan-navy uppercase">
                                        {story.category}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-titan-red transition-colors text-titan-navy">
                                    {story.title}
                                </h3>
                                <div className="mt-auto flex items-center gap-3 text-xs font-bold text-gray-400 uppercase tracking-wide">
                                    <span className="flex items-center gap-1"><Clock size={12} /> {story.date}</span>
                                    {story.location && <span className="flex items-center gap-1"><MapPin size={12} /> {story.location}</span>}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* --- LATEST UPDATES GRID & SIDEBAR --- */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

                    {/* Latest News (3 Cols) */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center justify-between mb-6 border-b border-titan-navy border-opacity-10 pb-2">
                            <h3 className="text-xl font-bold text-titan-navy uppercase tracking-tight flex items-center gap-2">
                                <div className="w-3 h-3 bg-titan-red"></div> Latest Updates
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {latestNews.map(news => (
                                <Link href={`/design-y/news/${news.id}`} key={news.id} className="group">
                                    <div className="aspect-[4/3] bg-titan-bg mb-3 overflow-hidden relative">
                                        <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <h4 className="text-lg font-bold leading-tight mb-2 group-hover:text-titan-red transition-colors text-titan-navy">
                                        {news.title}
                                    </h4>
                                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-3">
                                        {news.excerpt}
                                    </p>
                                    <span className="text-xs font-bold text-titan-red uppercase tracking-wide flex items-center gap-1">
                                        {news.category} <span className="text-gray-300">|</span> <span className="text-gray-400">{news.date}</span>
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar / Headlines (1 Col) */}
                    <div className="lg:col-span-1">
                        <div className="bg-titan-bg/50 p-6 border-t-4 border-titan-navy">
                            <h3 className="text-lg font-bold text-titan-navy uppercase tracking-tight mb-6">In Brief</h3>
                            <div className="space-y-6">
                                {headlines.map((item, i) => (
                                    <div key={item.id} className="group cursor-pointer">
                                        <div className="flex items-start gap-3">
                                            <span className="text-titan-red font-bold text-lg leading-none">{i + 1}</span>
                                            <div>
                                                <h5 className="font-bold text-sm leading-snug text-titan-navy group-hover:text-titan-red transition-colors mb-1">
                                                    {item.title}
                                                </h5>
                                                <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wide">{item.category}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-8 py-3 border border-titan-navy/10 bg-white text-xs font-bold uppercase tracking-widest text-titan-navy hover:bg-titan-navy hover:text-white transition-colors">
                                View All Headlines
                            </button>
                        </div>

                        {/* Video Widget */}
                        <div className="mt-8 relative group cursor-pointer overflow-hidden">
                            <div className="aspect-video bg-black relative">
                                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <PlayCircle size={48} className="text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                    <span className="text-white font-bold text-sm leading-tight block">WATCH: Annual Safety Drift</span>
                                    <span className="text-xs text-white/60 font-mono">03:42</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </main>

            <style jsx global>{`
                ::selection {
                    background-color: #0A192F;
                    color: white;
                }
            `}</style>
        </div>
    );
}
