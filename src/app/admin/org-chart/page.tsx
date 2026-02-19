'use client';

import React, { useState } from 'react';
import { orgChartData as initialData, OrgNode } from '@/app/design-z/data/orgChartData';
import {
    Plus,
    Trash2,
    ChevronRight,
    ChevronDown,
    User,
    Save,
    Search,
    RefreshCcw,
    CheckCircle2,
    AlertCircle,
    Layout,
    Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function OrgChartAdmin() {
    const [data, setData] = useState<OrgNode>(initialData);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [expandedNodes, setExpandedNodes] = useState<string[]>(['Okhna. TOUCH KIM']);

    const toggleExpand = (name: string) => {
        setExpandedNodes(prev =>
            prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
        );
    };

    const handleSave = async () => {
        setIsSaving(true);
        setSaveStatus('idle');

        try {
            const response = await fetch('/api/cms/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: data,
                    fileName: 'orgChartData.ts'
                })
            });

            if (response.ok) {
                setSaveStatus('success');
                setTimeout(() => setSaveStatus('idle'), 3000);
            } else {
                setSaveStatus('error');
            }
        } catch (error) {
            console.error('Save failed:', error);
            setSaveStatus('error');
        } finally {
            setIsSaving(false);
        }
    };

    const updateNode = (path: number[], updatedFields: Partial<OrgNode>) => {
        const newData = { ...data };
        let current: any = newData;

        for (let i = 0; i < path.length; i++) {
            if (i === path.length - 1) {
                current.children[path[i]] = { ...current.children[path[i]], ...updatedFields };
            } else {
                current = current.children[path[i]];
            }
        }

        setData(newData);
    };

    const updateRoot = (updatedFields: Partial<OrgNode>) => {
        setData({ ...data, ...updatedFields });
    };

    const renderNodeEditor = (node: OrgNode, path: number[] = [], depth: number = 0) => {
        const isExpanded = expandedNodes.includes(node.name);
        const hasChildren = node.children && node.children.length > 0;

        return (
            <div key={`${node.name}-${depth}`} className="ml-4 border-l border-slate-200 pl-4 py-2">
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all group">
                    <button
                        onClick={() => toggleExpand(node.name)}
                        className={`p-1 rounded hover:bg-slate-100 transition-colors ${!hasChildren && 'opacity-0 pointer-events-none'}`}
                    >
                        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>

                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 overflow-hidden relative shrink-0">
                        {node.image ? (
                            <Image src={node.image} alt={node.name} fill className="object-cover" />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                <User size={20} />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 grid grid-cols-2 gap-4">
                        <input
                            className="bg-transparent font-bold text-slate-900 border-none focus:ring-0 p-0 text-sm"
                            value={node.name}
                            onChange={(e) => {
                                if (depth === 0) updateRoot({ name: e.target.value });
                                else updateNode(path, { name: e.target.value });
                            }}
                            placeholder="Name"
                        />
                        <input
                            className="bg-transparent text-slate-500 border-none focus:ring-0 p-0 text-xs italic"
                            value={node.role}
                            onChange={(e) => {
                                if (depth === 0) updateRoot({ role: e.target.value });
                                else updateNode(path, { role: e.target.value });
                            }}
                            placeholder="Role"
                        />
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg">
                            <Plus size={16} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isExpanded && hasChildren && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            {node.children!.map((child, idx) => renderNodeEditor(child, [...path, idx], depth + 1))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                        <Layout className="text-indigo-600" />
                        Org Chart Management
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Manage the hierarchical structure of Design Z.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setData(initialData)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors"
                    >
                        <RefreshCcw size={18} />
                        Reset Items
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold text-white transition-all shadow-md active:scale-95 ${isSaving ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                            }`}
                    >
                        {isSaving ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                                <RefreshCcw size={18} />
                            </motion.div>
                        ) : <Save size={18} />}
                        {isSaving ? 'Saving...' : 'Publish Changes'}
                    </button>
                </div>
            </div>

            {/* Status Messages */}
            <AnimatePresence>
                {saveStatus !== 'idle' && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`p-4 rounded-xl flex items-center gap-3 border shadow-sm ${saveStatus === 'success'
                            ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
                            : 'bg-red-50 border-red-100 text-red-800'
                            }`}
                    >
                        {saveStatus === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                        <p className="text-sm font-bold">
                            {saveStatus === 'success'
                                ? 'Structure updated successfully! The website will reflect changes on next reload.'
                                : 'Failed to publish changes. Please check server logs.'}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Editor Console */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Search className="text-slate-400" size={16} />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Hierarchy Editor</span>
                    </div>
                </div>

                <div className="p-6 overflow-x-auto">
                    <div className="min-w-[800px]">
                        {renderNodeEditor(data)}
                    </div>
                </div>
            </div>

            {/* Helper Card */}
            <div className="bg-indigo-900 p-8 rounded-2xl text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10">
                        <Shield className="text-indigo-300" size={32} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">Editor Controls</h3>
                        <p className="text-indigo-100/80 text-sm leading-relaxed">
                            This panel allows you to modify the core hierarchy of Design Z. Changes are <strong>persistent</strong> and will overwrite the source <code>orgChartData.ts</code> file when published. Ensure all names and roles are correct before saving.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold">Live</p>
                            <p className="text-[10px] uppercase font-bold text-indigo-300 tracking-widest">Status</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
