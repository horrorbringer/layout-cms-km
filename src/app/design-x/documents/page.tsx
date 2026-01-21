'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Bell, ArrowRight, Calendar, Tag, ChevronRight, Search, Filter, FolderOpen, Database } from 'lucide-react';
import Link from 'next/link';

// Detailed Mock Data for Knowledge/Documents
const documents = [
    {
        id: 1,
        title: 'Kimmex Engineering Standards 2026: High-Rise Structural Integrity',
        date: 'Jan 10, 2026',
        category: 'Engineering',
        size: '15.4 MB',
        type: 'PDF',
        description: 'Comprehensive guidelines and technical specifications for structural steel and concrete reinforcement in high-rise developments greater than 40 floors.',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 2,
        title: 'Sustainable Materials Research: Green Concrete Viability',
        date: 'Dec 15, 2025',
        category: 'Research',
        size: '4.2 MB',
        type: 'PDF',
        description: 'Internal research findings on the cost-benefit analysis and long-term durability of recycled aggregate concrete in tropical climates.',
        image: 'https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 3,
        title: 'Standard Operating Procedures (SOP): Heavy Machinery Safety',
        date: 'Nov 22, 2025',
        category: 'Safety',
        size: '12.8 MB',
        type: 'PDF',
        description: 'Mandatory safety protocols for crane and excavator operators, including pre-start checks and emergency shutdown procedures.',
        image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 4,
        title: 'Urban Planning Case Study: Phnom Penh 2030',
        date: 'Oct 05, 2025',
        category: 'Case Study',
        size: '25 MB',
        type: 'PDF',
        description: 'A forward-looking analysis of infrastructure needs for the expanding metropolitan area, prepared by Kimmex Strategy Division.',
        image: 'https://images.unsplash.com/photo-1486325212027-8081648c82ee?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 5,
        title: 'ISO 9001:2015 Quality Management Framework',
        date: 'Sep 12, 2025',
        category: 'Corporate',
        size: '3.5 MB',
        type: 'PDF',
        description: 'Official documentation of our quality assurance processes, utilized across all project lifecycles.',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 6,
        title: 'Technical Specification: Solar Facade Integration',
        date: 'Aug 20, 2025',
        category: 'Technical',
        size: '8.1 MB',
        type: 'PDF',
        description: 'Technical drawings and electrical specifications for integrating BIPV (Building Integrated Photovoltaics) into glass facades.',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop'
    }
];

const categories = ['All Types', 'Engineering', 'Safety', 'Research', 'Corporate', 'Technical', 'Case Study'];

export default function DocCollectionPage() {
    const [activeCategory, setActiveCategory] = useState('All Types');

    const filteredDocs = activeCategory === 'All Types' 
        ? documents 
        : documents.filter(doc => doc.category === activeCategory);

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-titan-navy">
            {/* --- HERO --- */}
            <section className="bg-titan-navy pt-40 pb-32 px-6 relative overflow-hidden">
                 <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10"></div>
                    <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent"></div>
                </div>

                <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col md:flex-row items-end justify-between gap-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-3xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-xs font-bold uppercase tracking-widest mb-6 border border-white/10 backdrop-blur-sm">
                            <Database size={14} className="text-titan-red" />
                            Resource Center
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-none">
                            DOC <span className="text-titan-red">COLLECTION</span>
                        </h1>
                        <p className="text-white/60 text-lg max-w-2xl leading-relaxed font-light">
                            Access our centralized repository of engineering standards, research papers, technical specifications, and corporate policies.
                        </p>
                    </motion.div>

                    {/* Quick Stats or Action */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex gap-8 text-white/80 border-l border-white/10 pl-8 hidden lg:flex"
                    >
                        <div>
                            <span className="block text-3xl font-black text-white">120+</span>
                            <span className="text-xs uppercase tracking-widest font-bold">Documents</span>
                        </div>
                        <div>
                            <span className="block text-3xl font-black text-white">15</span>
                            <span className="text-xs uppercase tracking-widest font-bold">Categories</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-[1400px] mx-auto px-6 -mt-20 relative z-20 pb-20">
                {/* --- CONTROLS BAR --- */}
                <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Categories Scroll */}
                    <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                        <div className="flex gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`whitespace-nowrap px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                                        activeCategory === cat 
                                        ? 'bg-titan-navy text-white shadow-md' 
                                        : 'bg-gray-50 text-titan-navy-subtle hover:bg-gray-100 hover:text-titan-navy'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-80 shrink-0">
                        <input
                            type="text"
                            placeholder="Search by title or keyword..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-titan-red/20 focus:border-titan-red transition-all"
                        />
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* --- LATEST RELEASE (FEATURED) --- */}
                {activeCategory === 'All Types' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <span className="w-2 h-2 rounded-full bg-titan-red"></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-titan-navy-subtle">Latest Release</span>
                        </div>
                        
                        <Link href={`/design-x/documents/${documents[0].id}`} className="group bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 grid grid-cols-1 lg:grid-cols-5 hover:shadow-2xl transition-all duration-300">
                            <div className="lg:col-span-3 relative overflow-hidden aspect-video lg:aspect-auto">
                                <div className="absolute inset-0 bg-titan-navy/10 group-hover:bg-titan-navy/0 transition-colors z-10"></div>
                                <img
                                    src={documents[0].image}
                                    alt={documents[0].title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-6 left-6 z-20">
                                    <span className="bg-titan-red text-white px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest shadow-lg">
                                        Featured
                                    </span>
                                </div>
                            </div>
                            <div className="lg:col-span-2 p-8 md:p-12 flex flex-col justify-center bg-white relative">
                                <div className="mb-6 flex flex-wrap gap-3">
                                    <span className="px-3 py-1 bg-titan-bg rounded-full text-[10px] font-bold uppercase tracking-wider text-titan-navy border border-gray-200">
                                        {documents[0].category}
                                    </span>
                                    <span className="px-3 py-1 bg-titan-bg rounded-full text-[10px] font-bold uppercase tracking-wider text-titan-navy-subtle border border-gray-200">
                                        {documents[0].type} • {documents[0].size}
                                    </span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-black text-titan-navy mb-4 group-hover:text-titan-red transition-colors leading-tight">
                                    {documents[0].title}
                                </h2>
                                <p className="text-titan-navy-subtle mb-8 leading-relaxed">
                                    {documents[0].description}
                                </p>
                                <div className="mt-auto flex gap-4">
                                    <button className="flex-1 bg-titan-navy text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-titan-red transition-colors flex items-center justify-center gap-2 shadow-lg">
                                        <Download size={16} /> Download
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )}

                {/* --- GRID LAYOUT --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDocs.slice(activeCategory === 'All Types' ? 1 : 0).map((doc, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            key={doc.id}
                        >
                            <Link href={`/design-x/documents/${doc.id}`} className="group flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
                                <div className="aspect-[4/3] relative overflow-hidden bg-titan-bg">
                                    <img
                                        src={doc.image}
                                        alt={doc.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-titan-navy/60 to-transparent opacity-60"></div>
                                    
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/95 backdrop-blur-sm text-titan-navy px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm">
                                            {doc.category}
                                        </span>
                                    </div>

                                    {/* Hover Action */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-titan-navy/40 backdrop-blur-[2px]">
                                        <div className="bg-white text-titan-navy px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wide flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                                            View Details <ChevronRight size={14} />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-titan-navy-subtle uppercase tracking-wider mb-1">Published</span>
                                            <span className="text-xs font-bold text-titan-navy">{doc.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded text-[10px] font-bold text-titan-navy border border-gray-100">
                                            <FileText size={10} className="text-titan-red" />
                                            {doc.type}
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-titan-navy mb-3 group-hover:text-titan-red transition-colors leading-snug line-clamp-2">
                                        {doc.title}
                                    </h3>
                                    
                                    <p className="text-sm text-titan-navy-subtle mb-6 line-clamp-2">
                                        {doc.description}
                                    </p>

                                    <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center text-xs">
                                        <span className="font-bold text-titan-navy-subtle">{doc.size}</span>
                                        <span className="font-bold text-titan-navy group-hover:text-titan-red transition-colors flex items-center gap-1">
                                            <Download size={12} /> Download
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
