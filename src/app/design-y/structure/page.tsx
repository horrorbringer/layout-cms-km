'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight, FolderOpen, Layers, Shield, FileCheck, DollarSign,
    Users, Database, Server, PenTool, HardHat, Cog, Search, Star, FileText, ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- Types ---
type TreeNodeData = {
    id: string;
    label: string;
    icon?: React.ElementType;
    badge?: string;
    count?: number; // Feature #2: File Counts
    isEssential?: boolean; // Feature #4: Essential Reading
    previewDocs?: string[]; // Feature #5: Hover Previews
    children?: TreeNodeData[];
    isOpen?: boolean;
};

// --- Enhanced Mock Data ---
const organizationData: TreeNodeData = {
    id: 'root',
    label: "Document Collection",
    icon: FolderOpen,
    isOpen: true,
    count: 245,
    children: [
        {
            id: 'policy',
            label: "Company Policy",
            icon: Shield,
            count: 12,
            isEssential: true,
            previewDocs: ['Employee Handbook 2026.pdf', 'Code of Conduct.pdf', 'Remote Work Guidelines.pdf']
        },
        {
            id: 'design',
            label: "Detail Design",
            icon: PenTool,
            isOpen: true,
            count: 156,
            children: [
                {
                    id: 'arch', label: "Architect", icon: Layers, count: 45, isEssential: true,
                    previewDocs: ['High-Rise Standards.pdf', 'Acoustic Insulation Specs.pdf']
                },
                { id: 'struct', label: "Structural", icon: Layers, count: 32 },
                { id: 'elv', label: "ELV", icon: Cog, count: 18 },
                { id: 'mep', label: "MEP", icon: Cog, count: 24 },
                { id: 'mvac', label: "MVAC", icon: Cog, count: 15 },
            ]
        },
        {
            id: 'civil',
            label: "Civil Work",
            icon: HardHat,
            badge: "1",
            count: 28,
            previewDocs: ['Site Safety Protocols.pdf', 'Excavation Permit Form.pdf']
        },
        { id: 'finish', label: "Finishing Work", icon: Layers, count: 14 },
        { id: 'mep-ops', label: "MEP Operation", icon: Cog, count: 8 },
        { id: 'qs', label: "Quantity Surveyor (QS)", icon: FileCheck, count: 22 },
        { id: 'purchase', label: "Purchase", icon: DollarSign, count: 35 },
        { id: 'finance', label: "Finance", icon: DollarSign, count: 42 },
        {
            id: 'hr', label: "HR & Admin", icon: Users, count: 19, isEssential: true,
            previewDocs: ['Leave Request Form.docx', 'Onboarding Checklist.xlsx']
        },
        { id: 'warehouse', label: "Warehouse & Stock", icon: Database, count: 56 },
        { id: 'it', label: "IT", icon: Server, count: 9 },
    ]
};

// --- Helper: Search Logic ---
// recursively check if a node or its children match the search
const filterTree = (node: TreeNodeData, search: string): boolean => {
    if (!search) return true;
    const matchSelf = node.label.toLowerCase().includes(search.toLowerCase());
    const matchChild = node.children?.some(child => filterTree(child, search));
    return matchSelf || !!matchChild;
};

// --- Component: Node ---
const TreeNode = ({ node, isRoot = false, searchTerm = '' }: { node: TreeNodeData; isRoot?: boolean; searchTerm?: string }) => {
    const router = useRouter();
    // Auto-open if searching and children match
    const hasSearchMatch = searchTerm && (node.label.toLowerCase().includes(searchTerm.toLowerCase()) || node.children?.some(c => c.label.toLowerCase().includes(searchTerm.toLowerCase())));

    // Derived state for display
    const [isOpen, setIsOpen] = useState(node.isOpen || false);

    // Force open if search is active and matches children (so we can see them)
    useEffect(() => {
        if (searchTerm) setIsOpen(true);
    }, [searchTerm]);

    const hasChildren = node.children && node.children.length > 0;
    const isMatch = searchTerm ? node.label.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const isDimmed = searchTerm && !isMatch && !hasSearchMatch; // Dim if search is active but this node isn't relevant

    const handleNavigate = (e: React.MouseEvent) => {
        e.stopPropagation();
        // Feature #1: Clickable - Navigate to docs filtered by this label
        router.push(`/design-y/documents?filter=${encodeURIComponent(node.label)}`);
    };

    const toggleOpen = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    return (
        <div className={`flex items-center ${isDimmed ? 'opacity-30' : 'opacity-100'} transition-opacity duration-300`}>
            {/* Node Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`
                    relative z-10 group flex items-center gap-3 px-6 py-4 rounded-sm border cursor-pointer transition-all duration-300
                    ${isRoot
                        ? 'bg-titan-navy text-white border-titan-navy shadow-xl min-w-[250px]'
                        : isMatch
                            ? 'bg-titan-red/5 border-titan-red text-titan-navy shadow-md ring-1 ring-titan-red' // Highlight match
                            : 'bg-white text-titan-navy border-titan-navy/10 hover:border-titan-red hover:shadow-lg'
                    }
                `}
                onClick={hasChildren ? toggleOpen : handleNavigate}
            >
                {/* Icon */}
                {node.icon && <node.icon size={isRoot ? 24 : 18} className={isRoot ? "text-titan-red" : isMatch ? "text-titan-red" : "text-titan-navy/40"} />}

                <div className="flex flex-col">
                    <span className={`font-bold tracking-wide flex items-center gap-2 ${isRoot ? 'text-lg uppercase' : 'text-sm'}`}>
                        {node.label}
                        {/* Feature #4: Essential Badge */}
                        {node.isEssential && (
                            <Star size={10} className="fill-titan-red text-titan-red animate-pulse" />
                        )}
                    </span>
                    {/* Feature #2: File Counts */}
                    <span className={`text-[9px] font-mono tracking-wider ${isRoot ? 'text-white/40' : 'text-titan-navy/40'}`}>
                        {node.count ? `${node.count} FILES` : 'EMPTY'}
                    </span>
                </div>

                {/* Badge */}
                {node.badge && (
                    <span className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-titan-red text-white text-[10px] font-bold rounded-full shadow-sm">
                        {node.badge}
                    </span>
                )}

                {/* Expander Arrow */}
                {hasChildren && (
                    <div className={`ml-4 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>
                        <ChevronRight size={14} className={isRoot ? "text-white/50" : "text-titan-navy/30"} />
                    </div>
                )}

                {/* Navigate Action Icon (on hover for all, always for leaf) */}
                <div
                    onClick={handleNavigate}
                    className={`absolute right-2 top-2 p-1.5 rounded-full bg-titan-red text-white opacity-0 hover:scale-110 transition-all duration-200
                        ${!hasChildren ? 'group-hover:opacity-100' : 'group-hover:opacity-100'}
                    `}
                    title="View Documents"
                >
                    <ArrowUpRight size={10} />
                </div>

                {/* Feature #5: Hover Preview */}
                {node.previewDocs && (
                    <div className="absolute left-full top-0 ml-4 w-64 bg-titan-navy text-white p-4 rounded-sm shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none translate-x-2 group-hover:translate-x-0">
                        {/* Triangle */}
                        <div className="absolute right-full top-6 -mr-1 w-2 h-2 bg-titan-navy rotate-45"></div>

                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-titan-red mb-3 border-b border-white/10 pb-1">
                            Popular Files
                        </h4>
                        <ul className="space-y-2">
                            {node.previewDocs.map((doc, i) => (
                                <li
                                    key={i}
                                    className="flex items-center gap-2 text-xs text-white/80 hover:text-titan-red cursor-pointer transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(`/design-y/documents/view?title=${encodeURIComponent(doc)}`);
                                    }}
                                >
                                    <FileText size={10} className="shrink-0 opacity-50" />
                                    <span className="line-clamp-1">{doc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </motion.div>

            {/* Children Connector Line (Horizontal from Parent) */}
            {hasChildren && isOpen && (
                <div className="w-12 h-px bg-titan-navy/20"></div>
            )}

            {/* Children Container */}
            {hasChildren && isOpen && (
                <div className="flex flex-col justify-center relative">
                    {/* Vertical Line spanning children */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-titan-navy/20 my-6"></div>

                    <div className="flex flex-col gap-6">
                        {node.children!
                            // Filtering logic for children if search is active?
                            // No, display all but dim ones that don't match, unless strict filter is desired.
                            // Let's keep all to maintain structure, relying on dimming for focus.
                            .map((child, index) => (
                                <div key={index} className="flex items-center relative pl-0">
                                    <div className="w-8 h-px bg-titan-navy/20"></div>
                                    <TreeNode node={child} searchTerm={searchTerm} />
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default function StructurePage() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="bg-titan-bg min-h-screen font-sans text-titan-navy overflow-hidden flex flex-col">

            {/* Background Grid */}
            <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}>
            </div>

            <div className="relative z-10 pt-32 pb-12 px-12 flex-none">
                {/* Header */}
                <div className="mb-8 border-b border-titan-navy/10 pb-6 flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="w-3 h-3 bg-titan-red animate-pulse"></span>
                            <span className="font-mono text-xs uppercase tracking-widest text-titan-navy/60">Knowledge Base</span>
                        </div>
                        <h1 className="text-5xl font-black text-titan-navy mb-4">
                            SHARED <span className="text-transparent stroke-text-navy">DOCUMENTS</span>
                        </h1>
                        <p className="text-lg text-titan-navy/70 font-light leading-relaxed">
                            An open repository available to everyone. Explore, read, and learn from our collective knowledge—simplifying access to company standards.
                        </p>
                    </div>

                    {/* Feature #3: Quick Search */}
                    <div className="w-full md:w-96 relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search size={18} className="text-titan-navy/40 group-focus-within:text-titan-red transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Find department or document..."
                            className="w-full bg-white border border-titan-navy/20 pl-12 pr-4 py-4 rounded-sm text-sm font-bold text-titan-navy focus:outline-none focus:border-titan-red focus:shadow-lg transition-all"
                        />
                        {searchTerm && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-titan-navy/40">
                                FILTERING...
                            </div>
                        )}
                    </div>
                </div>

                {/* Legend / Key */}
                <div className="flex gap-6 text-[10px] uppercase font-bold tracking-widest text-titan-navy/50 mb-4">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-titan-red"></div> Main Branch</span>
                    <span className="flex items-center gap-2"><Star size={10} className="text-titan-red fill-titan-red" /> Essential Reading</span>
                    <span className="flex items-center gap-2"><div className="w-2 h-2 border border-titan-navy/20"></div> Standard Folder</span>
                </div>
            </div>

            {/* Tree Visualization with Overflow X/Y */}
            <div className="relative z-10 flex-grow overflow-auto px-12 pb-20 custom-scrollbar">
                <div className="inline-block min-w-full">
                    <TreeNode node={organizationData} isRoot={true} searchTerm={searchTerm} />
                </div>
            </div>

            <style jsx global>{`
                .stroke-text-navy {
                    -webkit-text-stroke: 2px #0A192F;
                }
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
                    background: rgba(239, 68, 68, 0.8); 
                }
            `}</style>
        </div>
    );
}
