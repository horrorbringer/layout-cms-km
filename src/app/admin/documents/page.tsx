'use client';

import React, { useState } from 'react';
import { allDocuments as initialDocs, Document } from '@/app/design-z/data/documentData';
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    X,
    FileText,
    Image as ImageIcon,
    Download,
    Database
} from 'lucide-react';
import Image from 'next/image';
import ImageUpload from '@/app/admin/_components/ImageUpload';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/app/admin/_context/ToastContext';
import { useConfirm } from '@/app/admin/_context/ConfirmContext';

export default function DocumentsAdmin() {
    const [docs, setDocs] = useState<Document[]>(initialDocs);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDoc, setEditingDoc] = useState<Document | null>(null);
    const { showToast } = useToast();
    const { confirm } = useConfirm();

    // Form State
    const emptyLocalized = () => ({ en: '', kh: '' });

    const defaultFormData: Document = {
        id: 0,
        title: emptyLocalized(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        category: 'Engineering',
        size: '0 MB',
        type: 'PDF',
        description: emptyLocalized(),
        image: ''
    };

    const [formData, setFormData] = useState<Document>(defaultFormData);

    const filteredDocs = docs.filter(d =>
        (d.title.en?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (d.title.kh?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        d.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenModal = (item?: Document) => {
        if (item) {
            setEditingDoc(item);
            setFormData(item);
        } else {
            setEditingDoc(null);
            setFormData({ ...defaultFormData, id: Date.now() });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        let newDocsList;
        if (editingDoc) {
            newDocsList = docs.map(d => d.id === editingDoc.id ? formData : d);
        } else {
            newDocsList = [formData, ...docs];
        }

        setDocs(newDocsList);
        setIsModalOpen(false);

        // Persistent save
        try {
            const res = await fetch('/api/cms/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: newDocsList,
                    fileName: 'documentData.ts'
                })
            });
            if (!res.ok) throw new Error('Failed to save');
            showToast('Documents updated successfully!', 'success');
        } catch (error) {
            console.error('Failed to persist document changes:', error);
            showToast('Error saving changes.', 'error');
        }
    };

    const handleDelete = async (id: number) => {
        const isConfirmed = await confirm({
            title: 'Delete Document',
            message: 'Are you sure you want to delete this document? It will be removed from the public collection.',
            confirmText: 'Delete',
            type: 'danger'
        });

        if (isConfirmed) {
            const newDocsList = docs.filter(d => d.id !== id);
            setDocs(newDocsList);

            // Persistent save
            try {
                const res = await fetch('/api/cms/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        data: newDocsList,
                        fileName: 'documentData.ts'
                    })
                });
                if (!res.ok) throw new Error('Failed to save');
                showToast('Document deleted successfully', 'success');
            } catch (error) {
                console.error('Failed to persist document deletion:', error);
                showToast('Error deleting document', 'error');
            }
        }
    };

    const updateLocalized = (field: 'title' | 'description', lang: 'en' | 'kh', value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: {
                ...((prev[field] as Record<string, string>) || {}),
                [lang]: value
            }
        }));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Document Collection</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage technical papers, standards, and research resources.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus size={18} />
                    Add Document
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search documents..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                    <Database size={16} className="text-indigo-600" />
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{docs.length} Resources</span>
                </div>
            </div>

            {/* Document List */}
            <div className="grid grid-cols-1 gap-4">
                <AnimatePresence mode='popLayout'>
                    {filteredDocs.map((item) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={item.id}
                            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors flex items-center gap-6"
                        >
                            <div className="w-20 h-20 rounded-lg bg-slate-100 overflow-hidden relative border border-slate-200 shrink-0">
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.title.en}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center"><FileText size={24} className="text-slate-300" /></div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-base font-bold text-slate-900 truncate">{item.title.en || 'Untitled'}</h3>
                                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold uppercase tracking-wider shrink-0">
                                        {item.category}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 font-medium truncate">{item.description.en}</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                        <FileText size={10} /> {item.type}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                        <Download size={10} /> {item.size}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        {item.date}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                                <button
                                    onClick={() => handleOpenModal(item)}
                                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl relative z-10 max-h-[90vh] flex flex-col"
                        >
                            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between shrink-0">
                                <h2 className="text-xl font-bold text-slate-900">{editingDoc ? 'Edit Document' : 'Add Document'}</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                            </div>

                            <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
                                <form id="doc-form" onSubmit={handleSave} className="space-y-8">

                                    {/* Settings */}
                                    <div className="grid grid-cols-3 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</label>
                                            <select className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none bg-white" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                                <option>Engineering</option>
                                                <option>Safety</option>
                                                <option>Research</option>
                                                <option>Corporate</option>
                                                <option>Technical</option>
                                                <option>Case Study</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Type</label>
                                            <input required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none" placeholder="e.g. PDF" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">File Size</label>
                                            <input required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none" placeholder="e.g. 15.4 MB" value={formData.size} onChange={e => setFormData({ ...formData, size: e.target.value })} />
                                        </div>
                                    </div>

                                    {/* English Content */}
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                                            <span className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">EN</span>
                                            English Details
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Title</label>
                                                <input required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none font-medium" value={formData.title.en} onChange={e => updateLocalized('title', 'en', e.target.value)} />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description</label>
                                                <textarea rows={3} required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none resize-none" value={formData.description.en} onChange={e => updateLocalized('description', 'en', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Khmer Content */}
                                    <div className="space-y-6 pt-6 border-t border-slate-100">
                                        <h3 className="text-lg font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                                            <span className="w-6 h-6 rounded bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">KH</span>
                                            Khmer Details
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Title (Khmer)</label>
                                                <input className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none font-siemreap" value={formData.title.kh} onChange={e => updateLocalized('title', 'kh', e.target.value)} />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description (Khmer)</label>
                                                <textarea rows={3} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none resize-none font-siemreap" value={formData.description.kh} onChange={e => updateLocalized('description', 'kh', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6 pt-6 border-t border-slate-100">
                                        <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Media & Date</h3>
                                        <div className="grid grid-cols-2 gap-6 items-start">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Featured Image</label>
                                                <ImageUpload
                                                    value={formData.image || ''}
                                                    onChange={(url) => setFormData({ ...formData, image: url })}
                                                    description="Optional cover image for the document."
                                                />
                                            </div>
                                            <div className="space-y-1.5 pt-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Publish Date</label>
                                                <input required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>

                            <div className="px-8 py-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0 bg-slate-50 rounded-b-2xl">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
                                <button type="submit" form="doc-form" className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm">Save Document</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
