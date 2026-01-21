'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, FileText, Download, Calendar, User, Eye, Share2, 
    Printer, ChevronRight, Shield, CheckCircle, Clock, Database, ArrowRight 
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Mock Data (Enhanced for detail view)
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
        status: 'Approved',
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
        status: 'Draft',
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

    const [isPdfOpen, setIsPdfOpen] = useState(false);
    const [isShared, setIsShared] = useState(false);

    const handleShare = () => {
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
        navigator.clipboard.writeText(window.location.href);
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-titan-navy">
            {/* --- PDF MODAL --- */}
            <AnimatePresence>
                {isPdfOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-titan-navy/95 backdrop-blur-xl flex flex-col"
                    >
                        <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/10 text-white">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-titan-red/20 rounded-lg">
                                    <FileText size={20} className="text-titan-red" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm leading-tight">{doc.title}</h3>
                                    <p className="text-xs text-white/50 font-mono">{doc.type} • {doc.size}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <a 
                                    href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" 
                                    download 
                                    className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors"
                                >
                                    <Download size={16} /> Download
                                </a>
                                <button 
                                    onClick={() => setIsPdfOpen(false)} 
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <div className="bg-white text-titan-navy rounded-full p-1">
                                        <ArrowLeft size={20} className="rotate-180" />
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 relative bg-titan-bg/5 p-4 md:p-8 flex justify-center overflow-hidden">
                            <div className="w-full max-w-5xl h-full bg-white rounded-lg shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
                                <div className="absolute inset-0 flex items-center justify-center text-titan-navy/30 flex-col gap-4">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-titan-red"></div>
                                    <span className="font-mono text-xs uppercase tracking-widest">Loading Viewer...</span>
                                </div>
                                <iframe
                                    src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                                    className="w-full h-full relative z-10"
                                    title="PDF Viewer"
                                ></iframe>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- HERO SECTION --- */}
            <section className="bg-titan-navy min-h-[60vh] relative overflow-hidden flex items-end pb-20 pt-40">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0">
                    {/* Hero Image */}
                    <img 
                        src={doc.image} 
                        alt={doc.title} 
                        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-titan-navy via-titan-navy/90 to-titan-navy/60"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10 mix-blend-multiply"></div>
                </div>

                <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10">
                    <Link href="/design-x/documents" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 text-xs font-bold uppercase tracking-widest transition-colors group">
                        <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-titan-red group-hover:bg-titan-red transition-all">
                            <ArrowLeft size={12} />
                        </div>
                        Back to Library
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="flex flex-wrap items-center gap-4 mb-6">
                                    <span className="bg-titan-red text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded shadow-lg shadow-titan-red/20">
                                        {doc.category}
                                    </span>
                                    {doc.status && (
                                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-400 uppercase tracking-widest bg-green-400/10 px-3 py-1.5 rounded border border-green-400/20">
                                            <CheckCircle size={12} /> {doc.status}
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-8 tracking-tight max-w-4xl">
                                    {doc.title}
                                </h1>

                                <div className="flex flex-wrap gap-y-6 gap-x-12 text-white/80 border-t border-white/10 pt-8">
                                    <div>
                                        <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">Last Updated</span>
                                        <span className="flex items-center gap-2 font-bold text-sm"><Calendar size={14} className="text-titan-red" /> {doc.date}</span>
                                    </div>
                                    <div>
                                        <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">Author</span>
                                        <span className="flex items-center gap-2 font-bold text-sm"><User size={14} className="text-titan-red" /> {doc.author}</span>
                                    </div>
                                    <div>
                                        <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">Version</span>
                                        <span className="flex items-center gap-2 font-bold text-sm"><Shield size={14} className="text-titan-red" /> {doc.version}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- MAIN CONTENT --- */}
            <div className="max-w-[1400px] mx-auto px-6 py-12 relative z-20 -mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* LEFT COLUMN: Main Info */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Executive Summary Card */}
                        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                            <div className="p-8 md:p-10">
                                <h2 className="text-xl font-bold text-titan-navy mb-6 flex items-center gap-3">
                                    <div className="w-1 h-6 bg-titan-red rounded-full"></div>
                                    Executive Summary
                                </h2>
                                <div className="prose prose-lg text-titan-navy-subtle max-w-none">
                                    <p className="font-medium text-titan-navy text-lg leading-relaxed mb-6">
                                        {doc.description}
                                    </p>
                                    <p className="leading-relaxed whitespace-pre-line text-base">
                                        {doc.abstract}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
                                <h3 className="text-xs font-bold text-titan-navy uppercase tracking-widest mb-4">Keywords & Topics</h3>
                                <div className="flex flex-wrap gap-2">
                                    {doc.topics?.map(topic => (
                                        <span key={topic} className="px-3 py-1.5 bg-white rounded-md text-xs font-bold text-titan-navy-subtle border border-gray-200 shadow-sm hover:border-titan-red hover:text-titan-red transition-colors cursor-default">
                                            #{topic}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Document Preview */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <h3 className="text-sm font-bold text-titan-navy uppercase tracking-widest flex items-center gap-2">
                                    <Eye size={16} className="text-titan-navy/40" /> Document Preview
                                </h3>
                                <span className="text-[10px] font-mono text-titan-navy/40 uppercase">Page 1 of {doc.pages}</span>
                            </div>
                            <div className="p-8 bg-titan-bg-alt">
                                <div 
                                    className="aspect-[4/3] md:aspect-video bg-white shadow-2xl mx-auto max-w-3xl overflow-hidden relative group cursor-pointer rounded-sm border border-gray-200" 
                                    onClick={() => setIsPdfOpen(true)}
                                >
                                    <img src={doc.image} className="w-full h-full object-cover opacity-90 blur-[1px] group-hover:blur-[2px] group-hover:scale-105 transition-all duration-700" alt="preview" />
                                    <div className="absolute inset-0 bg-titan-navy/20 group-hover:bg-titan-navy/40 transition-colors"></div>
                                    
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100">
                                            <button className="bg-titan-red text-white px-8 py-3 rounded-lg font-bold uppercase tracking-widest flex items-center gap-3 shadow-2xl hover:bg-titan-navy transition-colors">
                                                <Eye size={18} /> Read Full Document
                                            </button>
                                        </div>
                                    </div>

                                    {/* Watermark look */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 pointer-events-none opacity-10">
                                        <span className="text-6xl font-black uppercase text-titan-navy border-4 border-titan-navy p-4 rounded-xl">Confidential</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar Actions */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-6">
                            {/* Primary Action Card */}
                            <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                                <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
                                    <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center text-titan-red shrink-0 border border-red-100">
                                        <FileText size={28} />
                                    </div>
                                    <div>
                                        <span className="block text-xl font-black text-titan-navy mb-1">{doc.type} Document</span>
                                        <div className="flex items-center gap-2 text-xs font-bold text-titan-navy-subtle">
                                            <span className="bg-gray-100 px-2 py-0.5 rounded text-titan-navy">{doc.size}</span>
                                            <span>•</span>
                                            <span>{doc.pages} Pages</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <a 
                                        href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" 
                                        download 
                                        className="w-full bg-titan-navy text-white py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-titan-red transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                                    >
                                        <Download size={18} className="group-hover:-translate-y-1 transition-transform" /> Download File
                                    </a>
                                    <button 
                                        onClick={() => setIsPdfOpen(true)}
                                        className="w-full bg-white text-titan-navy border-2 border-titan-navy/10 py-3 rounded-lg font-bold uppercase tracking-widest text-xs hover:border-titan-navy hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Eye size={16} /> Preview Online
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button 
                                        onClick={handleShare}
                                        className="flex items-center justify-center gap-2 py-2.5 bg-gray-50 rounded-lg text-xs font-bold text-titan-navy hover:bg-gray-100 transition-colors relative overflow-hidden"
                                    >
                                        {isShared ? (
                                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-2 text-green-600">
                                                <CheckCircle size={14} /> Copied!
                                            </motion.div>
                                        ) : (
                                            <>
                                                <Share2 size={14} /> Share Link
                                            </>
                                        )}
                                    </button>
                                    <button className="flex items-center justify-center gap-2 py-2.5 bg-gray-50 rounded-lg text-xs font-bold text-titan-navy hover:bg-gray-100 transition-colors">
                                        <Printer size={14} /> Print Info
                                    </button>
                                </div>

                                {/* Meta Data List */}
                                <div className="mt-8 space-y-4">
                                    <h4 className="text-[10px] font-bold text-titan-navy/40 uppercase tracking-widest">Technical Details</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                            <span className="text-titan-navy-subtle">Document ID</span>
                                            <span className="font-mono font-bold text-titan-navy">KMX-2026-{doc.id.toString().padStart(3, '0')}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                            <span className="text-titan-navy-subtle">Language</span>
                                            <span className="font-bold text-titan-navy">English (US)</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                            <span className="text-titan-navy-subtle">Access Level</span>
                                            <span className="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs flex items-center gap-1">
                                                <Shield size={10} /> Public
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-titan-navy-subtle">License</span>
                                            <span className="font-bold text-titan-navy text-xs">Proprietary</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Support Card */}
                            <div className="bg-titan-navy text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Database size={64} />
                                </div>
                                <h4 className="font-bold text-lg mb-2 relative z-10">Need Assistance?</h4>
                                <p className="text-white/60 text-sm mb-4 relative z-10">
                                    Contact the Engineering Standards Committee for clarification on this document.
                                </p>
                                <a href="mailto:support@kimmex.com" className="text-xs font-bold uppercase tracking-widest text-titan-red hover:text-white transition-colors relative z-10 flex items-center gap-2">
                                    Contact Support <ChevronRight size={12} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- RELATED DOCS --- */}
            <section className="bg-white py-20 border-t border-gray-100 mt-20">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-2xl font-black text-titan-navy">Related Resources</h3>
                        <Link href="/design-x/documents" className="text-xs font-bold uppercase tracking-widest text-titan-red hover:text-titan-navy transition-colors flex items-center gap-2">
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {documents.slice(0, 3).map((item) => (
                            <Link href={`/design-x/documents/${item.id}`} key={item.id} className="group bg-gray-50 rounded-xl p-1 shadow-sm hover:shadow-xl transition-all duration-300">
                                <div className="bg-white rounded-lg p-6 h-full flex flex-col border border-gray-100 group-hover:border-transparent transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-[10px] font-bold text-titan-navy-subtle uppercase tracking-widest bg-gray-100 px-2 py-1 rounded-md">
                                            {item.category}
                                        </span>
                                        <FileText size={16} className="text-titan-navy/20 group-hover:text-titan-red transition-colors" />
                                    </div>
                                    <h4 className="font-bold text-titan-navy mb-3 group-hover:text-titan-red transition-colors leading-snug line-clamp-2">
                                        {item.title}
                                    </h4>
                                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] font-mono text-titan-navy/50 uppercase tracking-wide">
                                        <span>{item.date}</span>
                                        <span className="flex items-center gap-1 group-hover:text-titan-navy transition-colors">Read <ChevronRight size={10} /></span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
