'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Bell, ArrowRight, Calendar, Tag, ChevronRight, Search, Filter } from 'lucide-react';
import Link from 'next/link';

// Detailed Mock Data for Knowledge/Documents
// Images used are 'abstract' or 'office' themed to represent documents
const documents = [
    {
        id: 1,
        title: 'Kimmex Engineering Standards 2026: High-Rise Structural Integrity',
        date: 'Jan 10, 2026',
        category: 'Engineering Standard',
        size: '15.4 MB',
        type: 'PDF',
        description: 'Comprehensive guidelines and technical specifications for structural steel and concrete reinforcement in high-rise developments greater than 40 floors.',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 2,
        title: 'Sustainable Materials Research: Green Concrete Viability',
        date: 'Dec 15, 2025',
        category: 'Research Paper',
        size: '4.2 MB',
        type: 'PDF',
        description: 'Internal research findings on the cost-benefit analysis and long-term durability of recycled aggregate concrete in tropical climates.',
        image: 'https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 3,
        title: 'Standard Operating Procedures (SOP): Heavy Machinery Safety',
        date: 'Nov 22, 2025',
        category: 'Safety Manual',
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
        category: 'Corporate Policy',
        size: '3.5 MB',
        type: 'PDF',
        description: 'Official documentation of our quality assurance processes, utilized across all project lifecycles.',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 6,
        title: 'Technical Specification: Solar Facade Integration',
        date: 'Aug 20, 2025',
        category: 'Technical Spec',
        size: '8.1 MB',
        type: 'PDF',
        description: 'Technical drawings and electrical specifications for integrating BIPV (Building Integrated Photovoltaics) into glass facades.',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop'
    }
];

export default function KnowledgeBasePage() {
    return (
        <div className="bg-white min-h-screen">
            {/* --- HERO --- */}
            <section className="bg-titan-navy pt-40 pb-20 px-6">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="border-l-4 border-titan-red pl-6"
                    >
                        <span className="text-titan-red font-bold tracking-[0.2em] uppercase block mb-2">Company Knowledge Base</span>
                        <h1 className="text-5xl md:text-7xl font-black text-white">TECHNICAL DOCUMENTS</h1>
                        <p className="text-white/60 text-lg mt-6 max-w-2xl">
                            Access our repository of engineering standards, research papers, and technical specifications sharing Kimmex's industry expertise.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* --- FEATURED DOCUMENT (Like News Page Featured) --- */}
            <section className="py-20 px-6 max-w-[1400px] mx-auto border-b border-titan-navy-light/10">
                <div className="mb-8 flex items-center gap-2 text-titan-red font-bold uppercase tracking-widest text-xs">
                    <Calendar size={14} /> Latest Release
                </div>
                <Link href={`/design-x/documents/${documents[0].id}`} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group cursor-pointer block">
                    <div className="overflow-hidden relative aspect-[16/9] shadow-2xl rounded-sm border border-titan-navy-light/10">
                        {/* Overlay for Docs feeling */}
                        <div className="absolute inset-0 bg-titan-navy/10 z-10 group-hover:bg-titan-navy/5 transition-colors"></div>
                        <img
                            src={documents[0].image}
                            alt={documents[0].title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-4 left-4 bg-titan-red text-white text-xs font-bold px-4 py-2 uppercase tracking-widest shadow-md z-20">
                            Featured Standard
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-4 text-sm font-bold text-titan-navy-subtle uppercase tracking-widest mb-4">
                            <span className="flex items-center gap-2"><Tag size={14} className="text-titan-red" /> {documents[0].category}</span>
                            <span>•</span>
                            <span>{documents[0].size} {documents[0].type}</span>
                        </div>
                        <h2 className="text-4xl font-black text-titan-navy mb-6 group-hover:text-titan-red transition-colors leading-tight">{documents[0].title}</h2>
                        <p className="text-lg text-titan-navy-subtle mb-8 leading-relaxed">{documents[0].description}</p>

                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 bg-titan-navy text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-titan-red transition-colors">
                                <Download size={16} /> Download PDF
                            </button>
                            <button className="flex items-center gap-2 border border-titan-navy/20 text-titan-navy px-8 py-3 rounded-sm font-bold uppercase tracking-widest text-xs hover:border-titan-navy transition-colors">
                                View Abstract
                            </button>
                        </div>
                    </div>
                </Link>
            </section>

            {/* --- DOCUMENT GRID (Like News Grid) --- */}
            <section className="py-20 px-6 max-w-[1400px] mx-auto">
                {/* Visual Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
                    <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto">
                        {['All Types', 'Engineering', 'Safety', 'Research', 'Corporate'].map((filter, i) => (
                            <button
                                key={filter}
                                className={`whitespace-nowrap px-6 py-2.5 rounded-sm font-bold text-xs uppercase tracking-widest transition-all border ${i === 0 ? 'bg-titan-navy text-white border-titan-navy' : 'bg-white text-titan-navy-subtle border-titan-navy-light/20 hover:border-titan-navy hover:text-titan-navy'}`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Search Mock */}
                    <div className="relative w-full md:w-80">
                        <input
                            type="text"
                            placeholder="Search documents..."
                            className="w-full bg-titan-bg border border-titan-navy-light/10 rounded-sm py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-titan-red"
                        />
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-titan-navy-subtle" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {documents.slice(1).map((doc) => (
                        <Link href={`/design-x/documents/${doc.id}`} key={doc.id} className="group cursor-pointer flex flex-col h-full">
                            <div className="aspect-[3/2] overflow-hidden mb-6 relative rounded-sm shadow-sm border border-titan-navy-light/5">
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-titan-navy text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-10 rounded-sm shadow-sm">
                                    {doc.category}
                                </div>
                                <img
                                    src={doc.image}
                                    alt={doc.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Download Overlay on Hover */}
                                <div className="absolute inset-0 bg-titan-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="flex items-center gap-2 text-white font-bold uppercase tracking-widest border border-white px-6 py-3 rounded-sm hover:bg-white hover:text-titan-navy transition-colors">
                                        <Download size={16} /> Download
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col">
                                <div className="flex justify-between items-center mb-3 text-titan-navy-subtle text-xs font-bold uppercase tracking-widest">
                                    <span>{doc.date}</span>
                                    <span className="flex items-center gap-1"><FileText size={12} /> {doc.type}</span>
                                </div>

                                <h3 className="text-xl font-bold text-titan-navy mb-4 group-hover:text-titan-red transition-colors leading-snug">{doc.title}</h3>
                                <p className="text-sm text-titan-navy-subtle mb-6 line-clamp-3">{doc.description}</p>

                                <div className="mt-auto pt-4 border-t border-titan-navy-light/10 flex justify-between items-center">
                                    <span className="text-xs font-bold text-titan-navy-subtle">{doc.size}</span>
                                    <span className="text-titan-red font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                                        Details <ChevronRight size={14} />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <button className="bg-titan-bg-alt text-titan-navy px-12 py-4 font-bold uppercase tracking-widest border border-titan-navy/10 hover:bg-titan-navy hover:text-white transition-all rounded-sm">
                        Access Full Archive
                    </button>


                </div>
            </section>
        </div>
    );
}
