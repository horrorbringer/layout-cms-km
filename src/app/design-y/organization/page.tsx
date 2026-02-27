'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, ChevronRight, ChevronDown, Binary, Shield,
    Target, Award, Briefcase, Mail, Phone, ExternalLink,
    Search, Map, Layers, Network
} from 'lucide-react';
import Link from 'next/link';
import { orgChartData, OrgNode } from '../data/orgChartData';

// --- Components ---

const ConnectorLine = ({ type = 'vertical', length = 'h-8' }: { type?: 'vertical' | 'horizontal', length?: string }) => (
    <div className={`relative ${type === 'vertical' ? `w-px ${length}` : `h-px ${length}`} bg-titan-navy/10`}>
        <motion.div
            initial={type === 'vertical' ? { height: 0 } : { width: 0 }}
            whileInView={type === 'vertical' ? { height: '100%' } : { width: '100%' }}
            className={`absolute inset-0 bg-titan-red/30`}
        />
    </div>
);

const NodeCard = ({ node, depth = 0 }: { node: OrgNode; depth?: number }) => {
    const [isExpanded, setIsExpanded] = useState(depth < 2);
    const hasChildren = node.children && node.children.length > 0;

    const getCardStyles = () => {
        switch (node.type) {
            case 'director': return 'border-titan-navy bg-titan-navy text-white shadow-2xl';
            case 'department': return 'border-titan-red/20 bg-titan-red/[0.02] text-titan-navy border-dashed';
            default: return 'border-titan-navy/10 bg-white text-titan-navy shadow-sm';
        }
    };

    return (
        <div className="flex flex-col items-center">
            {/* Card Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`
                    group relative p-4 rounded-sm border min-w-[240px] transition-all duration-300
                    ${getCardStyles()}
                    ${hasChildren ? 'cursor-pointer hover:border-titan-red' : ''}
                `}
                onClick={() => hasChildren && setIsExpanded(!isExpanded)}
            >
                {/* Decoration */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-titan-red opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-titan-red opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    {node.image ? (
                        <div className="relative w-12 h-12 rounded-sm overflow-hidden border border-white/10 shrink-0">
                            <img src={node.image} alt={node.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </div>
                    ) : (
                        <div className={`w-12 h-12 rounded-sm flex items-center justify-center shrink-0 border border-titan-navy/5 ${node.type === 'department' ? 'bg-titan-red/10 text-titan-red' : 'bg-titan-navy/5 text-titan-navy/20'}`}>
                            {node.type === 'department' ? <Network size={20} /> : <Users size={20} />}
                        </div>
                    )}

                    <div className="flex-grow min-w-0">
                        <h4 className="text-[11px] font-black uppercase tracking-widest leading-none mb-1.5 truncate">
                            {node.name}
                        </h4>
                        <p className={`text-[9px] font-mono uppercase tracking-wider opacity-60 truncate`}>
                            {node.role}
                        </p>
                    </div>

                    {hasChildren && (
                        <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                            <ChevronDown size={14} className="opacity-30" />
                        </div>
                    )}
                </div>

                {/* Profile Link */}
                {node.type !== 'department' && (
                    <Link
                        href={`/design-y/about/${node.id}`}
                        className="absolute -right-2 -top-2 w-6 h-6 bg-titan-red text-white flex items-center justify-center rounded-sm opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg z-20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ExternalLink size={10} />
                    </Link>
                )}
            </motion.div>

            {/* Vertical Splitter */}
            {hasChildren && isExpanded && (
                <>
                    <ConnectorLine type="vertical" length="h-10" />
                    <div className="relative flex justify-center w-full">
                        {/* Horizontal branch line */}
                        {node.children!.length > 1 && (
                            <div className="absolute top-0 left-[25%] right-[25%] h-px bg-titan-navy/10"></div>
                        )}

                        <div className="flex gap-8 pt-0">
                            {node.children!.map((child, idx) => (
                                <div key={child.id} className="relative flex flex-col items-center">
                                    {/* Small vertical stem to child */}
                                    <ConnectorLine type="vertical" length="h-6" />
                                    <NodeCard node={child} depth={depth + 1} />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default function OrganizationPage() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="bg-titan-bg min-h-screen text-titan-navy selection:bg-titan-red selection:text-white pb-32">

            {/* Background Utilities */}
            <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}>
            </div>

            {/* Header */}
            <header className="relative z-10 pt-32 pb-16 px-12 border-b border-titan-navy/10 bg-white/50 backdrop-blur-md">
                <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Binary size={16} className="text-titan-red" />
                            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-titan-navy/50">Operational Protocol / 01</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-titan-navy leading-none mb-8">
                            COMMAND <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px #0A192F' }}>STRUCTURE</span>
                        </h1>
                        <p className="text-xl text-titan-navy/60 font-light max-w-xl leading-relaxed">
                            The strategic hierarchy of Kimmex Construction. Our leadership network is engineered for rapid response, technical excellence, and national impact.
                        </p>
                    </div>

                    <div className="w-full md:w-96">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-titan-navy/30 group-focus-within:text-titan-red transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search personnel or department..."
                                className="w-full bg-titan-bg border border-titan-navy/10 pl-12 pr-4 py-4 rounded-sm text-sm font-bold focus:outline-none focus:border-titan-red focus:bg-white transition-all shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* View Controls / Legend */}
            <div className="relative z-10 px-12 py-8 bg-titan-bg border-b border-titan-navy/5">
                <div className="max-w-[1600px] mx-auto flex items-center gap-8 font-mono text-[9px] uppercase tracking-widest text-titan-navy/40">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-titan-navy"></div>
                        Executive Directorate
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 border border-titan-navy/20"></div>
                        Operational Unit
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 border border-dashed border-titan-red/40 bg-titan-red/[0.05]"></div>
                        Departmental Hub
                    </div>
                </div>
            </div>

            {/* Tree Container */}
            <main className="relative z-10 pt-20 px-12 overflow-x-auto min-h-[600px] custom-scrollbar">
                <div className="inline-block min-w-full text-center">
                    <div className="flex justify-center p-8">
                        <NodeCard node={orgChartData} />
                    </div>
                </div>
            </main>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(10, 25, 47, 0.05);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(10, 25, 47, 0.2); 
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #EF4444; 
                }
            `}</style>

        </div>
    );
}
