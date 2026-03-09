'use client';

import React, { useState, useEffect } from 'react';
import { orgChartData as initialData, OrgNode } from '@/app/design-z/data/orgChartData';
import {
    Plus,
    Trash2,
    ChevronRight,
    ChevronDown,
    User,
    Save,
    RefreshCcw,
    Layout,
    Shield,
    Phone,
    Users,
    Briefcase,
    Building2,
    UserCircle,
    X,
    Settings2,
    Languages,
    Upload,
    Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useToast } from '@/app/admin/_context/ToastContext';
import { useConfirm } from '@/app/admin/_context/ConfirmContext';
import { LocalizedString } from '@/app/design-z/context/LanguageContext';

type NodeType = 'director' | 'manager' | 'staff' | 'department';

export default function OrgChartAdmin() {
    const [data, setData] = useState<OrgNode>(initialData);
    const [isSaving, setIsSaving] = useState(false);
    const [expandedNodes, setExpandedNodes] = useState<string[]>(['0']);
    const [selectedNodePath, setSelectedNodePath] = useState<number[] | null>(null);
    const [editLang, setEditLang] = useState<'en' | 'kh'>('en');
    const [isUploading, setIsUploading] = useState(false);

    const { showToast } = useToast();
    const { confirm } = useConfirm();

    const toggleExpand = (pathKey: string) => {
        setExpandedNodes(prev =>
            prev.includes(pathKey) ? prev.filter(n => n !== pathKey) : [...prev, pathKey]
        );
    };

    const handleSave = async () => {
        setIsSaving(true);
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
                showToast('Organization structure published successfully!', 'success');
            } else {
                showToast('Failed to publish changes.', 'error');
            }
        } catch (error) {
            console.error('Save failed:', error);
            showToast('An error occurred while saving.', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const getNodeByPath = (root: OrgNode, path: number[]): OrgNode | null => {
        if (path.length === 0) return root;
        let current = root;
        for (const idx of path) {
            if (!current.children || !current.children[idx]) return null;
            current = current.children[idx];
        }
        return current;
    };

    const updateNodeByPath = (path: number[], updatedFields: Partial<OrgNode>) => {
        const newData = JSON.parse(JSON.stringify(data)); // Deep clone
        if (path.length === 0) {
            Object.assign(newData, updatedFields);
            setData(newData);
            return;
        }

        let current = newData;
        for (let i = 0; i < path.length - 1; i++) {
            current = current.children[path[i]];
        }

        const lastIdx = path[path.length - 1];
        current.children[lastIdx] = { ...current.children[lastIdx], ...updatedFields };
        setData(newData);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, path: number[]) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/cms/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                updateNodeByPath(path, { image: result.url });
                showToast('Image uploaded successfully!', 'success');
            } else {
                showToast('Failed to upload image.', 'error');
            }
        } catch (error) {
            console.error('Upload error:', error);
            showToast('Error uploading image.', 'error');
        } finally {
            setIsUploading(false);
        }
    };

    const addChildNode = (path: number[]) => {
        const newData = JSON.parse(JSON.stringify(data));
        let current = newData;
        if (path.length > 0) {
            for (const idx of path) {
                current = current.children[idx];
            }
        }

        if (!current.children) current.children = [];

        const newNode: OrgNode = {
            name: 'New Node',
            role: { en: 'Position Title', kh: 'តួនាទី' },
            type: 'staff',
            children: []
        };

        current.children.push(newNode);
        setData(newData);

        const parentPathKey = path.length === 0 ? '0' : `0-${path.join('-')}`;
        if (!expandedNodes.includes(parentPathKey)) {
            setExpandedNodes([...expandedNodes, parentPathKey]);
        }

        showToast('New node added. Click to edit.', 'info');
    };

    const deleteNodeByPath = async (path: number[], name: string) => {
        if (path.length === 0) {
            showToast('Cannot delete root node.', 'error');
            return;
        }

        const isConfirmed = await confirm({
            title: 'Remove Node',
            message: `Are you sure you want to delete "${name}" and all its subordinates?`,
            confirmText: 'Delete',
            type: 'danger'
        });

        if (!isConfirmed) return;

        const newData = JSON.parse(JSON.stringify(data));
        let current = newData;
        for (let i = 0; i < path.length - 1; i++) {
            current = current.children[path[i]];
        }

        const lastIdx = path[path.length - 1];
        current.children.splice(lastIdx, 1);

        if (selectedNodePath && JSON.stringify(selectedNodePath) === JSON.stringify(path)) {
            setSelectedNodePath(null);
        }

        setData(newData);
        showToast('Node removed successfully.', 'success');
    };

    const getTypeColor = (type?: NodeType) => {
        switch (type) {
            case 'director': return { border: 'border-indigo-500', bg: 'bg-indigo-50', text: 'text-indigo-700', icon: Shield, hex: '#6366f1' };
            case 'manager': return { border: 'border-amber-500', bg: 'bg-amber-50', text: 'text-amber-700', icon: Briefcase, hex: '#f59e0b' };
            case 'staff': return { border: 'border-rose-500', bg: 'bg-rose-50', text: 'text-rose-700', icon: User, hex: '#f43f5e' };
            case 'department': return { border: 'border-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700', icon: Building2, hex: '#10b981' };
            default: return { border: 'border-slate-200', bg: 'bg-white', text: 'text-slate-600', icon: User, hex: '#94a3b8' };
        }
    };

    const renderTree = (node: OrgNode, path: number[] = [], depth: number = 0) => {
        const pathKey = depth === 0 ? '0' : `0-${path.join('-')}`;
        const isExpanded = expandedNodes.includes(pathKey);
        const hasChildren = node.children && node.children.length > 0;
        const isSelected = selectedNodePath && JSON.stringify(selectedNodePath) === JSON.stringify(path);
        const { border, bg, text, icon: Icon, hex } = getTypeColor(node.type as NodeType);

        return (
            <div key={pathKey} className={`relative ${depth > 0 ? 'ml-8' : ''}`}>
                {depth > 0 && (
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-6 h-px bg-slate-200" />
                )}
                <div className="relative pb-4">
                    <div
                        onClick={() => setSelectedNodePath(path)}
                        className={`
                            group flex items-center gap-4 p-3 rounded-2xl border-2 transition-all cursor-pointer relative z-10
                            ${isSelected ? `${border} shadow-lg shadow-indigo-100 ring-4 ring-indigo-50` : `border-transparent hover:border-slate-200 bg-white hover:bg-slate-50 shadow-sm`}
                        `}
                    >
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full" style={{ backgroundColor: hex }} />

                        <div className="flex items-center gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); toggleExpand(pathKey); }}
                                className={`p-1 rounded-md hover:bg-slate-200 transition-colors ${!hasChildren && 'opacity-0 pointer-events-none'}`}
                            >
                                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </button>

                            <div className={`w-12 h-12 rounded-xl border-2 overflow-hidden relative shrink-0 ${border}`}>
                                {node.image ? (
                                    <Image src={node.image} alt={node.name} fill className="object-cover" />
                                ) : (
                                    <div className={`absolute inset-0 flex items-center justify-center ${bg} ${text}`}>
                                        <Icon size={20} />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-slate-940 truncate leading-tight mb-0.5">{node.name}</h4>
                            <div className="flex">
                                <span className={`
                                    px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border-l-2
                                    ${bg} ${text} ${isSelected ? 'opacity-100' : 'opacity-70'}
                                `}>
                                    {node.role ? (node.role[editLang] || node.role.en) : ''}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                            <button
                                onClick={(e) => { e.stopPropagation(); addChildNode(path); }}
                                className="p-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-lg transition-all"
                                title="Add Child"
                            >
                                <Plus size={14} />
                            </button>
                            {depth > 0 && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); deleteNodeByPath(path, node.name); }}
                                    className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg transition-all"
                                    title="Delete Node"
                                >
                                    <Trash2 size={14} />
                                </button>
                            )}
                        </div>
                    </div>

                    <AnimatePresence>
                        {isExpanded && hasChildren && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-l border-slate-200 mt-2"
                            >
                                {node.children!.map((child, idx) => renderTree(child, [...path, idx], depth + 1))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        );
    };

    const selectedNode = selectedNodePath !== null ? getNodeByPath(data, selectedNodePath) : null;

    return (
        <div className="flex h-[calc(100vh-140px)] gap-6 overflow-hidden">
            {/* Main Tree Area */}
            <div className="flex-1 flex flex-col bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h1 className="text-xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
                            <Layout className="text-indigo-600" size={24} />
                            Hierarchical Structure
                        </h1>
                        <p className="text-xs text-slate-400 mt-0.5 font-medium uppercase tracking-widest">Design Z Organization Chart</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                            <button
                                onClick={() => setEditLang('en')}
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${editLang === 'en' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                            >
                                English
                            </button>
                            <button
                                onClick={() => setEditLang('kh')}
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${editLang === 'kh' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                            >
                                Khmer
                            </button>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className={`
                                flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-white shadow-xl transition-all active:scale-95
                                ${isSaving ? 'bg-slate-400' : 'bg-indigo-600 hover:bg-indigo-700'}
                            `}
                        >
                            {isSaving ? <RefreshCcw size={16} className="animate-spin" /> : <Save size={16} />}
                            {isSaving ? 'Publishing...' : 'Publish structure'}
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-auto p-12 bg-[#fcfcfd]">
                    <div className="min-w-[700px] max-w-4xl mx-auto">
                        {renderTree(data)}
                    </div>
                </div>
            </div>

            {/* Side Editor Panel */}
            <div className="w-96 flex flex-col gap-6">
                <AnimatePresence mode="wait">
                    {selectedNode && selectedNodePath !== null ? (
                        <motion.div
                            key="editor"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                            className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col"
                        >
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-indigo-600 text-white">
                                <div className="flex items-center gap-3">
                                    <Settings2 size={20} />
                                    <h3 className="font-bold">Node Settings</h3>
                                </div>
                                <button
                                    onClick={() => setSelectedNodePath(null)}
                                    className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <UserCircle size={14} className="text-indigo-400" /> Identity
                                    </h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-[9px] font-bold text-slate-400 uppercase ml-1">Full Name</label>
                                            <input
                                                className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-indigo-500 transition-all placeholder:text-slate-300"
                                                value={selectedNode.name}
                                                onChange={(e) => updateNodeByPath(selectedNodePath, { name: e.target.value })}
                                                placeholder="Enter name..."
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[9px] font-bold text-slate-400 uppercase ml-1">Phone Number</label>
                                            <div className="relative">
                                                <input
                                                    className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-600 outline-none focus:border-indigo-500 transition-all"
                                                    value={selectedNode.phone || ''}
                                                    onChange={(e) => updateNodeByPath(selectedNodePath, { phone: e.target.value })}
                                                    placeholder="e.g. 012 345 678"
                                                />
                                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Languages size={14} className="text-emerald-400" /> Position & Localized
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <span className="w-4 h-4 bg-indigo-100 text-[8px] flex items-center justify-center font-bold text-indigo-600 rounded">EN</span>
                                                    <label className="text-[9px] font-bold text-slate-500 uppercase">Role (English)</label>
                                                </div>
                                                <input
                                                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 outline-none focus:border-indigo-500"
                                                    value={selectedNode.role?.en || ''}
                                                    onChange={(e) => updateNodeByPath(selectedNodePath, { role: { ...(selectedNode.role || { en: '', kh: '' }), en: e.target.value } })}
                                                />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <span className="w-4 h-4 bg-indigo-100 text-[8px] flex items-center justify-center font-bold text-indigo-600 rounded">KH</span>
                                                    <label className="text-[9px] font-bold text-slate-500 uppercase">Role (Khmer)</label>
                                                </div>
                                                <input
                                                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 outline-none focus:border-indigo-500"
                                                    value={selectedNode.role?.kh || ''}
                                                    onChange={(e) => updateNodeByPath(selectedNodePath, { role: { ...(selectedNode.role || { en: '', kh: '' }), kh: e.target.value } })}
                                                />
                                            </div>
                                            <div className="w-full h-[1px] bg-slate-200 my-4 hidden sm:block"></div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1.5 mt-4 sm:mt-0">
                                                    <span className="w-4 h-4 bg-indigo-100 text-[8px] flex items-center justify-center font-bold text-indigo-600 rounded">EN</span>
                                                    <label className="text-[9px] font-bold text-slate-500 uppercase">Bio / Description (English)</label>
                                                </div>
                                                <textarea
                                                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 outline-none focus:border-indigo-500 min-h-[80px]"
                                                    value={selectedNode.bio?.en || ''}
                                                    onChange={(e) => updateNodeByPath(selectedNodePath, { bio: { ...(selectedNode.bio || { en: '', kh: '' }), en: e.target.value } })}
                                                    placeholder="Enter a brief background or description..."
                                                />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <span className="w-4 h-4 bg-indigo-100 text-[8px] flex items-center justify-center font-bold text-indigo-600 rounded">KH</span>
                                                    <label className="text-[9px] font-bold text-slate-500 uppercase">Bio / Description (Khmer)</label>
                                                </div>
                                                <textarea
                                                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 outline-none focus:border-indigo-500 min-h-[80px]"
                                                    value={selectedNode.bio?.kh || ''}
                                                    onChange={(e) => updateNodeByPath(selectedNodePath, { bio: { ...(selectedNode.bio || { en: '', kh: '' }), kh: e.target.value } })}
                                                    placeholder="បញ្ចូលប្រវត្តិរូបសង្ខេប ឬការពិពណ៌នា..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Users size={14} className="text-amber-400" /> Style & Type
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        {(['director', 'manager', 'staff', 'department'] as NodeType[]).map((t) => (
                                            <button
                                                key={t}
                                                onClick={() => updateNodeByPath(selectedNodePath, { type: t })}
                                                className={`
                                                    p-2.5 rounded-xl border-2 text-[10px] font-bold uppercase tracking-wider transition-all flex flex-col items-center gap-1.5
                                                    ${selectedNode.type === t ? 'bg-indigo-50 border-indigo-600 text-indigo-700' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'}
                                                `}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-bold text-slate-400 uppercase ml-1">Image & Assets</label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <input
                                                    className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-600 outline-none focus:border-indigo-500 transition-all"
                                                    value={selectedNode.image || ''}
                                                    onChange={(e) => updateNodeByPath(selectedNodePath, { image: e.target.value })}
                                                    placeholder="/images/path.jpg"
                                                />
                                                <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                                            </div>
                                            <label className={`
                                                cursor-pointer px-4 py-3 rounded-xl border border-slate-100 bg-white flex items-center justify-center transition-all hover:bg-slate-50 hover:border-slate-200
                                                ${isUploading ? 'opacity-50 pointer-events-none' : ''}
                                            `}>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageUpload(e, selectedNodePath)}
                                                />
                                                {isUploading ? (
                                                    <RefreshCcw size={14} className="animate-spin text-indigo-500" />
                                                ) : (
                                                    <Upload size={14} className="text-indigo-500" />
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[9px] font-bold text-slate-400 uppercase ml-1">Member Count</label>
                                        <input
                                            type="number"
                                            className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-600 outline-none focus:border-indigo-500"
                                            value={selectedNode.memberCount || ''}
                                            onChange={(e) => updateNodeByPath(selectedNodePath, { memberCount: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="flex-1 bg-slate-50/50 rounded-3xl border border-dotted border-slate-300 flex flex-col items-center justify-center p-8 text-center">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-300 mb-4">
                                <Layout size={32} />
                            </div>
                            <h3 className="font-bold text-slate-400">No Node Selected</h3>
                            <p className="text-xs text-slate-400 mt-2 max-w-[200px]">Click on any person or department card in the tree to edit their details.</p>
                        </div>
                    )}
                </AnimatePresence>

                <div className="bg-indigo-900 px-6 py-6 rounded-3xl text-white relative overflow-hidden shadow-xl font-siemreap">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center border border-white/10">
                                <Shield className="text-indigo-300" size={16} />
                            </div>
                            <h4 className="text-xs font-black uppercase tracking-widest font-sans">Quick Helper</h4>
                        </div>
                        <p className="text-[10px] text-indigo-100/60 leading-relaxed">
                            Changes go live only after clicking <strong>Publish structure</strong>. Use + on cards to add subordinates.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
