'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText, Download, Bell, ArrowRight, Calendar, Tag, ChevronRight,
    Search, Filter, Grid, List, FolderOpen, HardHat, Shield, Layers, LayoutGrid
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Mock Data
const allDocuments = [
    {
        id: 1,
        title: 'Kimmex Engineering Standards 2026: High-Rise Structural Integrity',
        date: '2026-01-10',
        category: 'Detail Design',
        subcategory: 'Structural',
        size: '15.4 MB',
        type: 'PDF',
        description: 'Comprehensive guidelines and technical specifications for structural steel and concrete reinforcement in high-rise developments greater than 40 floors.',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop',
        featured: true
    },
    {
        id: 2,
        title: 'Sustainable Materials Research: Green Concrete Viability',
        date: '2025-12-15',
        category: 'Civil Work',
        subcategory: 'Research',
        size: '4.2 MB',
        type: 'PDF',
        description: 'Internal research findings on the cost-benefit analysis and long-term durability of recycled aggregate concrete in tropical climates.',
        image: 'https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?q=80&w=800&auto=format&fit=crop',
        featured: false
    },
    {
        id: 3,
        title: 'Standard Operating Procedures (SOP): Heavy Machinery Safety',
        date: '2025-11-22',
        category: 'Company Policy',
        subcategory: 'Safety',
        size: '12.8 MB',
        type: 'PDF',
        description: 'Mandatory safety protocols for crane and excavator operators, including pre-start checks and emergency shutdown procedures.',
        image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop',
        featured: false
    },
    {
        id: 4,
        title: 'Urban Planning Case Study: Phnom Penh 2030',
        date: '2025-10-05',
        category: 'Detail Design',
        subcategory: 'Architect',
        size: '25 MB',
        type: 'PDF',
        description: 'A forward-looking analysis of infrastructure needs for the expanding metropolitan area, prepared by Kimmex Strategy Division.',
        image: 'https://images.unsplash.com/photo-1486325212027-8081648c82ee?q=80&w=800&auto=format&fit=crop',
        featured: false
    },
    {
        id: 5,
        title: 'ISO 9001:2015 Quality Management Framework',
        date: '2025-09-12',
        category: 'Company Policy',
        subcategory: 'Quality',
        size: '3.5 MB',
        type: 'PDF',
        description: 'Official documentation of our quality assurance processes, utilized across all project lifecycles.',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop',
        featured: false
    },
    {
        id: 6,
        title: 'Technical Specification: Solar Facade Integration',
        date: '2025-08-20',
        category: 'Detail Design',
        subcategory: 'MEP',
        size: '8.1 MB',
        type: 'PDF',
        description: 'Technical drawings and electrical specifications for integrating BIPV (Building Integrated Photovoltaics) into glass facades.',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop',
        featured: false
    },
    {
        id: 7,
        title: 'Financial Report Q4 2025',
        date: '2026-01-05',
        category: 'Finance',
        subcategory: 'Reporting',
        size: '2.1 MB',
        type: 'XLS',
        description: 'Quarterly financial earnings and projection analysis for stakeholders.',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop',
        featured: false
    },
    {
        id: 8,
        title: 'Employee Handbook v4.0',
        date: '2026-01-02',
        category: 'HR & Admin',
        subcategory: 'Policy',
        size: '5.5 MB',
        type: 'PDF',
        description: 'Updated guidelines for leave, benefits, and remote work policies.',
        image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop',
        featured: false
    }
];

// --- Sub Component: Filtered List ---
function DocumentList() {
    const searchParams = useSearchParams();
    const initialFilter = searchParams.get('filter') || 'All';

    const [filterCategory, setFilterCategory] = useState(initialFilter);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Sync state if URL param changes (though for this simple example, we might just use state)
    useEffect(() => {
        const f = searchParams.get('filter');
        if (f) setFilterCategory(f);
    }, [searchParams]);

    const categories = ['All', 'Company Policy', 'Detail Design', 'Civil Work', 'Finance', 'HR & Admin'];

    const filteredDocs = allDocuments.filter(doc => {
        const matchesCategory = filterCategory === 'All' || doc.category === filterCategory || (filterCategory === 'Detail Design' && ['Architect', 'Structural', 'MEP'].includes(doc.subcategory)); // Simple fuzzy logic
        const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || doc.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="pb-20">
            {/* --- CONTROLS --- */}
            <div className="sticky top-[80px] z-30 bg-white/95 backdrop-blur-md border-b border-titan-navy/10 py-4 mb-8">
                <div className="max-w-[1600px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Categories Scroll */}
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilterCategory(cat)}
                                className={`whitespace-nowrap px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all border ${filterCategory === cat
                                        ? 'bg-titan-navy text-white border-titan-navy'
                                        : 'bg-white text-titan-navy/50 border-titan-navy/10 hover:border-titan-navy hover:text-titan-navy'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <input
                                type="text"
                                placeholder="Search archives..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-titan-bg border border-titan-navy/10 rounded-sm text-sm font-bold text-titan-navy focus:outline-none focus:border-titan-red"
                            />
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-titan-navy/40" />
                        </div>

                        <div className="flex items-center border border-titan-navy/10 rounded-sm overflow-hidden hidden sm:flex">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-titan-navy text-white' : 'bg-white text-titan-navy/40 hover:bg-titan-bg'}`}
                            >
                                <LayoutGrid size={16} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-titan-navy text-white' : 'bg-white text-titan-navy/40 hover:bg-titan-bg'}`}
                            >
                                <List size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- RESULTS --- */}
            <div className="max-w-[1600px] mx-auto px-6 min-h-[50vh]">
                <div className="mb-6 text-[10px] font-mono uppercase tracking-widest text-titan-navy/40">
                    Showing {filteredDocs.length} Results // Filter: {filterCategory.toUpperCase()}
                </div>

                <AnimatePresence mode='popLayout'>
                    <motion.div
                        layout
                        className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "flex flex-col gap-4"}
                    >
                        {filteredDocs.map(doc => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={doc.id}
                            >
                                <Link
                                    href={`/design-y/documents/view?title=${encodeURIComponent(doc.title)}`}
                                    className={`group block bg-white border border-titan-navy/10 hover:border-titan-red transition-all duration-300 relative overflow-hidden ${viewMode === 'list' ? 'flex items-center gap-6 p-4' : 'h-full flex flex-col'
                                        }`}
                                >
                                    {/* Image (Grid Only or Small in List) */}
                                    <div className={`${viewMode === 'list' ? 'w-24 h-16 shrink-0' : 'aspect-[3/2] w-full'} overflow-hidden relative bg-titan-bg`}>
                                        <img src={doc.image} alt={doc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0" />
                                        {/* Overlay Icon */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-titan-navy/20">
                                            <div className="bg-white p-2 rounded-full text-titan-red shadow-lg transform scale-50 group-hover:scale-100 transition-transform">
                                                <Download size={16} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className={`flex-1 ${viewMode === 'grid' ? 'p-6 flex flex-col h-full' : 'pr-4'}`}>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-2 py-0.5 bg-titan-bg text-[9px] font-bold uppercase tracking-wider text-titan-navy/60 rounded-sm">
                                                {doc.category}
                                            </span>
                                            {doc.subcategory && (
                                                <span className="text-[9px] font-mono text-titan-navy/40">/ {doc.subcategory}</span>
                                            )}
                                        </div>

                                        <h3 className={`font-bold text-titan-navy group-hover:text-titan-red transition-colors mb-2 ${viewMode === 'grid' ? 'text-lg leading-tight' : 'text-base'}`}>
                                            {doc.title}
                                        </h3>

                                        {viewMode === 'grid' && (
                                            <p className="text-sm text-titan-navy-subtle line-clamp-2 mb-4 flex-1">
                                                {doc.description}
                                            </p>
                                        )}

                                        <div className={`mt-auto pt-4 border-t border-titan-navy/5 flex items-center justify-between text-[10px] font-mono text-titan-navy/50 uppercase tracking-wide ${viewMode === 'list' ? 'border-none pt-0 mt-0 gap-6' : ''}`}>
                                            <span className="flex items-center gap-1.5"><Calendar size={10} /> {doc.date}</span>
                                            <span className="flex items-center gap-1.5"><FileText size={10} /> {doc.size}</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {filteredDocs.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="w-16 h-16 bg-titan-bg rounded-full flex items-center justify-center mx-auto mb-4 text-titan-navy/30">
                            <Search size={24} />
                        </div>
                        <h3 className="text-titan-navy font-bold text-lg mb-2">No documents found</h3>
                        <p className="text-titan-navy/50 text-sm">Try adjusting your filters or search query.</p>
                        <button
                            onClick={() => { setFilterCategory('All'); setSearchQuery(''); }}
                            className="mt-6 text-xs font-bold uppercase tracking-widest text-titan-red hover:text-titan-navy transition-colors border-b border-titan-red hover:border-titan-navy pb-0.5"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function DocumentsPage() {
    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy">
            {/* Header */}
            <div className="pt-32 pb-12 bg-titan-bg relative overflow-hidden border-b border-titan-navy/10">
                <div className="absolute inset-0 z-0 opacity-[0.03]"
                    style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>

                <div className="max-w-[1600px] mx-auto px-6 relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="w-3 h-3 bg-titan-red animate-pulse"></span>
                        <span className="font-mono text-xs uppercase tracking-widest text-titan-navy/60">Central Archive</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-titan-navy mb-4">
                        DOCUMENT <span className="text-transparent stroke-text-navy">LIBRARY</span>
                    </h1>
                    <p className="max-w-xl text-titan-navy/60 font-light leading-relaxed">
                        Secure access to all organizational documentation, technical specifications, and corporate policies.
                    </p>
                </div>
            </div>

            <Suspense fallback={<div className="p-20 text-center font-mono text-xs uppercase">Loading Archive...</div>}>
                <DocumentList />
            </Suspense>

            <style jsx global>{`
                .stroke-text-navy {
                    -webkit-text-stroke: 2px #0A192F;
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
