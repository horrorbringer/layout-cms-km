'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Download, Calendar, User, Eye, Share2, Printer, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Mock Data (Duplicated for standalone functionality)
const documents = [
    {
        id: 1,
        title: 'Kimmex Engineering Standards 2026: High-Rise Structural Integrity',
        date: 'Jan 10, 2026',
        category: 'Engineering Standard',
        size: '15.4 MB',
        type: 'PDF',
        author: 'Dr. S. Rithy, Chief Structural Engineer',
        pages: 142,
        version: 'v4.2',
        description: 'Comprehensive guidelines and technical specifications for structural steel and concrete reinforcement in high-rise developments greater than 40 floors. This standard incorporates the latest seismic activity data for the Phnom Penh region and aligns with Eurocode 8 standards.',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
        abstract: 'This document serves as the primary reference for all high-rise construction projects under Kimmex execution. It details the mandatory requirements for material testing, load-bearing calculations, and foundation piling depth analysis. \n\n Key updates in the 2026 edition include revised wind load factors for coastal regions and updated safety protocols for crane operations at heights exceeding 150 meters.',
        topics: ['Structural Engineering', 'Seismic Design', 'Concrete Reinforcement', 'Safety Protocols']
    },
    {
        id: 2,
        title: 'Sustainable Materials Research: Green Concrete Viability',
        date: 'Dec 15, 2025',
        category: 'Research Paper',
        size: '4.2 MB',
        type: 'PDF',
        author: 'Kimmex R&D Team',
        pages: 45,
        version: 'v1.0',
        description: 'Internal research findings on the cost-benefit analysis and long-term durability of recycled aggregate concrete in tropical climates.',
        image: 'https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?q=80&w=1200&auto=format&fit=crop',
        abstract: 'Abstract content placeholder...',
        topics: ['Sustainability', 'Materials Science']
    },
    // ... other items would be here
];

export default function DocumentDetailPage() {
    const params = useParams();
    const id = parseInt(Array.isArray(params.id) ? params.id[0] : params.id || '1');
    const doc = documents.find(d => d.id === id) || documents[0];

    const [isPdfOpen, setIsPdfOpen] = React.useState(false);

    return (
        <div className="bg-white min-h-screen">
            {/* --- PDF MODAL --- */}


            {/* --- HERO SECTION (IMPROVED) --- */}
            <div className="bg-titan-navy min-h-[60vh] relative overflow-hidden flex items-center">
                {/* Atmospheric Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-titan-navy via-[#0f1c2e] to-titan-navy z-0"></div>

                {/* Content Container */}
                <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10 pt-32 pb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Text Column */}
                        <div className="lg:col-span-7">
                            <Link href="/design-y/documents" className="inline-flex items-center gap-2 text-white/60 hover:text-titan-red mb-8 uppercase tracking-widest text-xs font-bold transition-colors group">
                                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Knowledge Base
                            </Link>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="bg-titan-red text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm">
                                        {doc.category}
                                    </span>
                                    <span className="h-px flex-1 bg-white/10"></span>
                                </div>

                                <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-8 tracking-tight">
                                    {doc.title}
                                </h1>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-l-2 border-titan-red/50 pl-6 mt-12 bg-white/5 p-6 rounded-sm backdrop-blur-sm">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] uppercase tracking-widest text-titan-red font-bold">Published</span>
                                        <span className="flex items-center gap-2 font-bold text-lg text-white">{doc.date}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] uppercase tracking-widest text-titan-red font-bold">Author</span>
                                        <span className="flex items-center gap-2 font-bold text-lg text-white truncate" title={doc.author}>{doc.author.split(',')[0]}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] uppercase tracking-widest text-titan-red font-bold">Version</span>
                                        <span className="flex items-center gap-2 font-bold text-lg text-white">{doc.version}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] uppercase tracking-widest text-titan-red font-bold">Classification</span>
                                        <span className="flex items-center gap-2 font-bold text-xs text-green-400 border border-green-500/30 px-2 py-1 rounded w-fit bg-green-900/20">
                                            PUBLIC ACCESS
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Visual Column (3D Cover) */}
                        <div className="lg:col-span-5 hidden lg:block perspective-1000">
                            <motion.div
                                initial={{ opacity: 0, rotateY: 10, x: 50 }}
                                animate={{ opacity: 1, rotateY: -10, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative aspect-[3/4] max-w-sm mx-auto transform-style-3d group"
                            >
                                {/* Shiny Bloom Effect */}
                                <div className="absolute inset-0 bg-titan-red blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity rounded-full"></div>

                                {/* The Card/Cover */}
                                <div className="absolute inset-0 bg-white rounded-sm shadow-2xl overflow-hidden border-r-8 border-b-8 border-white/10 transform transition-transform duration-500 hover:rotate-y-0 hover:scale-[1.02]">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-titan-navy/80 z-10"></div>
                                    <img src={doc.image} alt="cover" className="w-full h-full object-cover" />

                                    {/* Cover Info Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white mb-4 border border-white/30">
                                            <FileText size={24} />
                                        </div>
                                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">{doc.type} • {doc.size}</p>
                                        <p className="text-white font-bold text-lg leading-tight line-clamp-2">{doc.title}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="max-w-[1400px] mx-auto px-6 py-16 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* LEFT COLUMN: CONTENT */}
                    <div className="lg:col-span-2">
                        <div className="space-y-8">
                            {/* Summary Card */}
                            <div className="bg-white p-8 shadow-sm rounded-sm border border-titan-navy-light/10 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                                <div className="absolute top-0 left-0 w-1 h-full bg-titan-red"></div>
                                <h2 className="text-sm font-bold text-titan-navy uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <FileText size={16} className="text-titan-red" /> Executive Summary
                                </h2>
                                <div className="prose prose-lg text-titan-navy leading-relaxed max-w-none">
                                    <p className="font-bold text-lg mb-4">{doc.description}</p>
                                    <p className="text-titan-navy-subtle text-base">{doc.abstract}</p>
                                </div>
                            </div>

                            {/* Topics Grid */}
                            <div className="bg-titan-bg p-8 rounded-sm border border-titan-navy-light/10">
                                <h3 className="text-xs font-bold text-titan-navy uppercase tracking-widest mb-6 opacity-60">Domain Coverage</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {doc.topics?.map(topic => (
                                        <div key={topic} className="flex items-center gap-3 bg-white px-4 py-3 rounded-sm border border-titan-navy/5 shadow-sm">
                                            <div className="w-1.5 h-1.5 bg-titan-red rounded-full"></div>
                                            <span className="text-xs font-bold text-titan-navy uppercase tracking-wide">{topic}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* PREVIEW IMAGE / MOCKUP */}
                        <div className="bg-titan-bg-alt p-8 rounded-sm text-center">
                            <h3 className="text-sm font-bold text-titan-navy uppercase tracking-widest mb-6">Document Preview</h3>
                            <div className="aspect-[4/3] bg-white shadow-lg mx-auto max-w-2xl overflow-hidden relative group">
                                <img src={doc.image} className="w-full h-full object-cover opacity-50 blur-[2px] cursor-pointer hover:opacity-75 transition-opacity" alt="preview" />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <Link href={`/design-y/documents/view?title=${encodeURIComponent(doc.title)}`} className="bg-titan-navy/90 text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest flex items-center gap-3 shadow-xl backdrop-blur-sm group-hover:bg-titan-red transition-colors pointer-events-auto">
                                        <Eye size={18} /> View Full PDF
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: ACTIONS & INFO */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Download Card */}
                        <div className="bg-white p-8 shadow-xl rounded-sm border-t-4 border-titan-red">
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-12 h-12 bg-titan-bg rounded-full flex items-center justify-center text-titan-red">
                                    <FileText size={24} />
                                </div>
                                <div className="text-right">
                                    <span className="block text-2xl font-black text-titan-navy">{doc.type}</span>
                                    <span className="block text-xs font-bold text-titan-navy-subtle">{doc.size}</span>
                                </div>
                            </div>

                            <button className="w-full bg-titan-red text-white py-4 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-titan-navy transition-all shadow-lg flex items-center justify-center gap-2 mb-4">
                                <Download size={18} /> Download Now
                            </button>

                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-2 py-3 border border-titan-navy-light/20 rounded-sm text-xs font-bold text-titan-navy hover:bg-titan-bg transition-colors">
                                    <Share2 size={14} /> Share
                                </button>
                                <button className="flex items-center justify-center gap-2 py-3 border border-titan-navy-light/20 rounded-sm text-xs font-bold text-titan-navy hover:bg-titan-bg transition-colors">
                                    <Printer size={14} /> Print
                                </button>
                            </div>

                            <div className="mt-8 pt-6 border-t border-titan-navy-light/10">
                                <h4 className="text-xs font-bold text-titan-navy uppercase tracking-widest mb-4">Document Details</h4>
                                <ul className="space-y-3 text-sm text-titan-navy-subtle">
                                    <li className="flex justify-between">
                                        <span>Published</span>
                                        <span className="font-bold text-titan-navy">{doc.date}</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Pages</span>
                                        <span className="font-bold text-titan-navy">{doc.pages}</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Language</span>
                                        <span className="font-bold text-titan-navy">English</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Access Level</span>
                                        <span className="font-bold text-green-600">Public</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* --- RELATED DOCUMENTS (SIDEBAR) --- */}
                        <div className="bg-white border border-titan-navy-light/10 rounded-sm overflow-hidden shadow-sm">
                            <div className="bg-titan-bg p-4 border-b border-titan-navy-light/10 flex justify-between items-center">
                                <h3 className="text-xs font-bold text-titan-navy uppercase tracking-widest">Related Documents</h3>
                                <Link href="/design-y/documents" className="text-[10px] font-bold text-titan-red uppercase tracking-wide hover:underline">View All</Link>
                            </div>
                            <div className="divide-y divide-titan-navy-light/5">
                                {documents.filter(item => item.id !== doc.id).map((item) => (
                                    <Link href={`/design-y/documents/${item.id}`} key={item.id} className="block p-4 hover:bg-titan-bg transition-colors group">
                                        <div className="flex items-start gap-3">
                                            <FileText size={16} className="text-titan-navy/30 group-hover:text-titan-red transition-colors mt-0.5" />
                                            <div>
                                                <h4 className="font-bold text-sm text-titan-navy group-hover:text-titan-red transition-colors leading-snug line-clamp-2 mb-1">{item.title}</h4>
                                                <div className="flex items-center gap-2 text-[10px] text-titan-navy-subtle uppercase tracking-wider">
                                                    <span>{item.category}</span>
                                                    <span>•</span>
                                                    <span>{item.date}</span>
                                                </div>
                                            </div>
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
