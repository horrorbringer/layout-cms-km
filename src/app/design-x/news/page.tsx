'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, User, Tag, Search, TrendingUp, Newspaper, ChevronRight, Briefcase, FileText, Download, Check, ChevronDown, Filter } from 'lucide-react';
import Link from 'next/link';

// Mock Data for News
const allNews = [
    {
        id: '1',
        title: 'Kimmex Awarded "Best Commercial Project 2025" at PropertyGuru Awards',
        category: 'Awards',
        date: 'Oct 15, 2025',
        author: 'PR Team',
        image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=1200',
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

// Mock Data for Sidebar Widgets
const recentJobs = [
    { title: 'Senior Civil Engineer', loc: 'Phnom Penh' },
    { title: 'Site Manager', loc: 'Sihanoukville' },
    { title: 'Safety Inspector (HSE)', loc: 'Kampot' }
];

const recentDocs = [
    { title: 'Engineering Standards 2026', size: '15.4 MB', type: 'PDF' },
    { title: 'Sustainability Report Q3', size: '4.2 MB', type: 'PDF' }
];

const categories = ['All', 'Project Updates', 'Awards', 'Safety', 'Sustainability', 'Culture', 'Community'];

// --- Custom Dropdown Component ---
const CustomDropdown = ({ options, value, onChange, icon: Icon, placeholder = "Select..." }: { options: string[], value: string, onChange: (val: string) => void, icon?: any, placeholder?: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                className={`w-full flex items-center justify-between bg-white border ${isOpen ? 'border-titan-red ring-1 ring-titan-red/20' : 'border-gray-200'} px-4 py-3 rounded-lg text-sm font-bold text-titan-navy transition-all hover:border-titan-red/50 shadow-sm`}
            >
                <div className="flex items-center gap-3 truncate">
                    {Icon && <Icon size={16} className="text-titan-red shrink-0" />}
                    <span className="truncate">{value || placeholder}</span>
                </div>
                <ChevronDown size={14} className={`text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden z-50 py-2 origin-top max-h-60 overflow-y-auto"
                    >
                        {options.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => { onChange(opt); setIsOpen(false); }}
                                className={`w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-gray-50 flex items-center justify-between group ${value === opt ? 'text-titan-red bg-red-50/50' : 'text-titan-navy'}`}
                            >
                                <span className="truncate">{opt}</span>
                                {value === opt && <Check size={14} className="text-titan-red shrink-0" />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function NewsPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    
    const featuredNews = allNews.find(n => n.featured) || allNews[0];
    // Exclude featured from the main list, but if we filter, we might want to include it? 
    // Usually featured is kept separate at the top. Let's keep it separate for 'All', 
    // but maybe include it if it matches a specific filter? 
    // For simplicity and standard UX, let's keep featured always at top and 'other' list below filtering.
    // Actually, usually filtering affects the list below.
    
    const otherNews = allNews.filter(n => n.id !== featuredNews.id);

    const filteredNews = otherNews.filter(n => {
        const matchesCategory = activeCategory === 'All' || n.category === activeCategory;
        const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              n.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy">
            {/* --- HERO --- */}
            <section className="relative h-[70vh] bg-titan-navy flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2670&auto=format&fit=crop" 
                        alt="News Hero" 
                        className="w-full h-full object-cover opacity-30 scale-105 animate-slow-pan"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-titan-navy/90 via-titan-navy/60 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-titan-navy to-transparent opacity-90"></div>
                </div>
                
                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-xs font-bold uppercase tracking-widest mb-6 border border-white/10 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-titan-red animate-pulse"></span>
                            Latest Updates
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tight leading-[0.9]">
                            INSIGHTS & <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-titan-red to-white">INNOVATION</span>
                        </h1>
                        <p className="text-xl text-white/70 font-light max-w-xl leading-relaxed mb-10 border-l-4 border-titan-red pl-6">
                            Discover the stories shaping our company and the future of construction in Cambodia.
                        </p>
                    </motion.div>

                    {/* Featured Headline Card - Floating */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="hidden lg:block relative"
                    >
                        <div className="absolute -inset-4 bg-white/5 rounded-2xl blur-xl"></div>
                        <Link href={`/design-x/news/${featuredNews.id}`} className="relative block bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/15 transition-all group">
                            <div className="flex items-center justify-between mb-6">
                                <span className="bg-titan-red text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-lg">
                                    Breaking News
                                </span>
                                <span className="text-white/60 text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                                    <Calendar size={12} /> {featuredNews.date}
                                </span>
                            </div>
                            <h3 className="text-3xl font-black text-white mb-4 leading-tight group-hover:text-titan-red transition-colors">
                                {featuredNews.title}
                            </h3>
                            <div className="flex items-center gap-3 text-white/80 text-sm font-bold uppercase tracking-widest mt-6">
                                Read Story <ArrowRight size={16} className="text-titan-red" />
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-[1400px] mx-auto px-6 -mt-24 relative z-20 pb-20">
                
                {/* --- LAYOUT CONTAINER --- */}
                <div className="flex flex-col lg:flex-row gap-12">
                    
                    {/* --- MAIN CONTENT (70%) --- */}
                    <div className="lg:w-[70%] space-y-12">
                        
                        {/* FEATURED STORY */}
                        <motion.div 
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Link href={`/design-x/news/${featuredNews.id}`} className="group relative block rounded-2xl overflow-hidden shadow-xl aspect-[16/9] border border-gray-100">
                                <img src={featuredNews.image} alt={featuredNews.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-titan-navy/90 via-titan-navy/40 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-3/4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="bg-titan-red text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                                            Featured Story
                                        </span>
                                        <span className="text-white/80 text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                                            <Calendar size={12} /> {featuredNews.date}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl md:text-4xl font-black text-white mb-6 leading-tight group-hover:text-titan-red transition-colors">
                                        {featuredNews.title}
                                    </h2>
                                    <div className="flex items-center gap-2 text-white/90 font-bold text-sm uppercase tracking-widest">
                                        Read Full Story <ArrowRight size={16} className="text-titan-red" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>

                        {/* NEWS GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <AnimatePresence mode='wait'>
                                {filteredNews.map((news, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        key={news.id}
                                    >
                                        <Link href={`/design-x/news/${news.id}`} className="group flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                                            <div className="aspect-[3/2] overflow-hidden relative">
                                                <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                                                <div className="absolute top-4 left-4">
                                                    <span className="bg-white/95 backdrop-blur text-titan-navy px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-sm">
                                                        {news.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="flex items-center gap-4 text-xs font-bold text-titan-navy-subtle mb-3 uppercase tracking-wider">
                                                    <span className="flex items-center gap-1.5"><Calendar size={12} className="text-titan-red" /> {news.date}</span>
                                                </div>
                                                <h3 className="text-lg font-bold text-titan-navy mb-3 group-hover:text-titan-red transition-colors leading-tight line-clamp-2">
                                                    {news.title}
                                                </h3>
                                                <p className="text-titan-navy-subtle text-sm leading-relaxed mb-6 line-clamp-2">
                                                    {news.excerpt}
                                                </p>
                                                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-titan-navy">
                                                    <span className="group-hover:text-titan-red transition-colors">Read Article</span>
                                                    <ArrowRight size={14} className="text-titan-red" />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {filteredNews.length === 0 && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200"
                            >
                                <p className="text-titan-navy-subtle font-medium">No news found matching your criteria.</p>
                                <button onClick={() => { setActiveCategory('All'); setSearchQuery(''); }} className="mt-4 text-titan-red font-bold text-sm uppercase tracking-wide hover:underline">
                                    Clear Filters
                                </button>
                            </motion.div>
                        )}
                    </div>

                    {/* --- SIDEBAR WIDGETS (30%) --- */}
                    <div className="lg:w-[30%] space-y-8 lg:sticky lg:top-24 h-fit">
                        
                        {/* 1. Filter & Search Widget */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-xs font-black text-titan-navy mb-4 uppercase tracking-widest flex items-center gap-2">
                                <Filter size={14} className="text-titan-red" /> Filter News
                            </h3>
                            
                            <div className="space-y-4">
                                {/* Search */}
                                <div className="relative group">
                                    <input 
                                        type="text" 
                                        placeholder="Search articles..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-titan-bg border-transparent border focus:bg-white pl-10 pr-4 py-3 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-titan-red/20 focus:border-titan-red/20 transition-all" 
                                    />
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-titan-red transition-colors" />
                                </div>

                                {/* Categories Dropdown */}
                                <div>
                                    <CustomDropdown 
                                        options={categories}
                                        value={activeCategory}
                                        onChange={setActiveCategory}
                                        icon={Tag}
                                        placeholder="All Categories"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Hiring Widget */}
                        <div className="bg-titan-navy p-6 rounded-xl shadow-xl text-white relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all">
                            <Link href="/design-x/careers" className="absolute inset-0 z-20"></Link>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-titan-red rounded-full blur-[60px] opacity-20 -mr-10 -mt-10"></div>
                            
                            <div className="flex items-center justify-between mb-6 relative z-10">
                                <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                    <Briefcase size={16} className="text-titan-red" /> We're Hiring
                                </h3>
                                <ArrowRight size={14} className="text-white/50 group-hover:text-white transition-colors" />
                            </div>

                            <div className="space-y-3 relative z-10">
                                {recentJobs.map((job, i) => (
                                    <div key={i} className="block bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-sm font-bold text-white mb-0.5">{job.title}</h4>
                                                <p className="text-[10px] text-white/60 flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {job.loc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. Resources Widget */}
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-sm font-black text-titan-navy uppercase tracking-widest flex items-center gap-2">
                                    <FileText size={16} className="text-titan-red" /> Resources
                                </h3>
                                <Link href="/design-x/documents" className="text-[10px] font-bold text-titan-navy-subtle hover:text-titan-navy transition-colors flex items-center gap-1">
                                    View All <ChevronRight size={12} />
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {recentDocs.map((doc, i) => (
                                    <Link href="/design-x/documents" key={i} className="block bg-white hover:shadow-md p-3 rounded-lg border border-gray-100 transition-all group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded bg-red-50 flex items-center justify-center text-red-600 font-black text-[10px] shrink-0 border border-red-100">
                                                {doc.type}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-xs font-bold text-titan-navy group-hover:text-titan-red transition-colors truncate">{doc.title}</h4>
                                                <p className="text-[10px] text-titan-navy-subtle mt-0.5">{doc.size}</p>
                                            </div>
                                            <Download size={14} className="text-gray-300 group-hover:text-titan-navy transition-colors shrink-0" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
