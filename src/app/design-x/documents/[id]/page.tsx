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
            {isPdfOpen && (
                <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
                    <div className="flex items-center justify-between px-6 py-4 bg-titan-navy text-white text-sm font-bold uppercase tracking-widest border-b border-white/10">
                        <span className="flex items-center gap-3">
                            <FileText size={18} className="text-titan-red" />
                            {doc.title}.pdf
                        </span>
                        <div className="flex items-center gap-4">
                            <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" download className="hover:text-titan-red transition-colors flex items-center gap-2">
                                <Download size={18} /> <span className="hidden md:inline">Download</span>
                            </a>
                            <button onClick={() => setIsPdfOpen(false)} className="hover:text-titan-red transition-colors flex items-center gap-2 ml-4">
                                <span className="hidden md:inline">Close</span> <span className="bg-white/10 p-1 rounded-sm"><ArrowLeft size={18} className="rotate-180" /></span>
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 bg-gray-900 relative">
                        {/* Fallback / Loading */}
                        <div className="absolute inset-0 flex items-center justify-center text-white/50">
                            Loading Document...
                        </div>
                        <iframe
                            src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                            className="w-full h-full relative z-10"
                            title="PDF Viewer"
                        ></iframe>
                    </div>
                </div>
            )}

            {/* --- HERO SECTION (IMPROVED) --- */}
            <div className="bg-titan-navy min-h-[60vh] relative overflow-hidden flex items-center">
                {/* Atmospheric Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-titan-navy via-[#0f1c2e] to-titan-navy z-0"></div>

                {/* Content Container */}
                <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10 pt-32 pb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Text Column */}
                        <div className="lg:col-span-7">
                            <Link href="/design-x/documents" className="inline-flex items-center gap-2 text-white/60 hover:text-titan-red mb-8 uppercase tracking-widest text-xs font-bold transition-colors group">
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

                                <div className="flex flex-wrap gap-y-4 gap-x-8 text-white/80 text-sm font-medium border-l-2 border-white/20 pl-6">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Published</span>
                                        <span className="flex items-center gap-2 font-bold"><Calendar size={14} className="text-titan-red" /> {doc.date}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Author</span>
                                        <span className="flex items-center gap-2 font-bold"><User size={14} className="text-titan-red" /> {doc.author}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Version</span>
                                        <span className="flex items-center gap-2 font-bold"><FileText size={14} className="text-titan-red" /> {doc.version}</span>
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
                        <div className="bg-white p-10 shadow-xl rounded-sm border border-titan-navy-light/10 mb-12">
                            <h2 className="text-2xl font-bold text-titan-navy mb-6 border-b border-titan-navy-light/10 pb-4">Executive Abstract</h2>
                            <div className="prose prose-lg text-titan-navy-subtle leading-relaxed whitespace-pre-line">
                                <p className="font-bold text-titan-navy mb-4">{doc.description}</p>
                                <p>{doc.abstract}</p>
                            </div>

                            <div className="mt-12">
                                <h3 className="text-lg font-bold text-titan-navy mb-4">Key Topics Covered</h3>
                                <div className="flex flex-wrap gap-2">
                                    {doc.topics?.map(topic => (
                                        <span key={topic} className="px-4 py-2 bg-titan-bg rounded-sm text-xs font-bold text-titan-navy uppercase tracking-wide border border-titan-navy-light/10">
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* PREVIEW IMAGE / MOCKUP */}
                        <div className="bg-titan-bg-alt p-8 rounded-sm text-center">
                            <h3 className="text-sm font-bold text-titan-navy uppercase tracking-widest mb-6">Document Preview</h3>
                            <div className="aspect-[4/3] bg-white shadow-lg mx-auto max-w-2xl overflow-hidden relative group" onClick={() => setIsPdfOpen(true)}>
                                <img src={doc.image} className="w-full h-full object-cover opacity-50 blur-[2px] cursor-pointer hover:opacity-75 transition-opacity" alt="preview" />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <button className="bg-titan-navy/90 text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest flex items-center gap-3 shadow-xl backdrop-blur-sm group-hover:bg-titan-red transition-colors">
                                        <Eye size={18} /> View Full PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: ACTIONS & INFO */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Download Card */}
                        <div className="bg-white p-8 shadow-xl rounded-sm border-t-4 border-titan-red sticky top-24">
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
                    </div>
                </div>
            </div>

            {/* --- RELATED DOCS --- */}
            <section className="bg-titan-bg py-20 border-t border-titan-navy-light/10">
                <div className="max-w-[1400px] mx-auto px-6">
                    <h3 className="text-2xl font-black text-titan-navy mb-10">Related Resources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {documents.slice(0, 3).map((item) => (
                            <Link href={`/design-x/documents/${item.id}`} key={item.id} className="bg-white p-8 shadow-sm border border-transparent hover:border-titan-red transition-all cursor-pointer group flex flex-col h-full rounded-sm">
                                <div className="text-xs font-bold text-titan-navy-subtle uppercase tracking-widest mb-3">{item.category}</div>
                                <h4 className="font-bold text-titan-navy mb-4 group-hover:text-titan-red transition-colors text-lg leading-tight flex-grow">{item.title}</h4>
                                <div className="flex items-center gap-2 text-xs font-bold text-titan-red uppercase tracking-wide mt-4">
                                    Read Document <ChevronRight size={12} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
