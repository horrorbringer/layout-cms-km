'use client';

import React, { useState } from 'react';
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    X,
    FileText,
    Image as ImageIcon,
    Star,
    Upload,
    Loader2
} from 'lucide-react';
import Image from 'next/image';
import ImageUpload from '@/app/admin/_components/ImageUpload';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/app/design-z/context/LanguageContext';
import RichTextEditor from '@/app/admin/_components/RichTextEditor';
import ActionDropdown from '@/app/admin/_components/ActionDropdown';
import { useToast } from '@/app/admin/_context/ToastContext';
import { useConfirm } from '@/app/admin/_context/ConfirmContext';

export interface NewsItem {
    id: string;
    title: { en: string; kh: string };
    category: string;
    date: { en: string; kh: string };
    readTime: { en: string; kh: string };
    image: string;
    excerpt: { en: string; kh: string };
    featured: boolean;
    trending: boolean;
    author: { en: string; kh: string };
    year: string;
    content: { en: string; kh: string };
    tags: string[];
}

export default function NewsListView({
    initialNews
}: {
    initialNews: NewsItem[]
}) {
    const { t, language } = useLanguage();
    const [news, setNews] = useState<NewsItem[]>(initialNews);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
    const { showToast } = useToast();
    const { confirm } = useConfirm();

    const emptyLocalized = () => ({ en: '', kh: '' });

    const defaultFormData: NewsItem = {
        id: '',
        title: emptyLocalized(),
        category: 'Updates',
        date: emptyLocalized(),
        readTime: emptyLocalized(),
        image: '',
        excerpt: emptyLocalized(),
        featured: false,
        trending: false,
        author: emptyLocalized(),
        year: new Date().getFullYear().toString(),
        content: emptyLocalized(),
        tags: []
    };

    const [formData, setFormData] = useState<NewsItem>(defaultFormData);

    const filteredNews = news.filter(n =>
        (n.title.en?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (n.title.kh?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        n.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t(n.category).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenModal = (item?: NewsItem) => {
        if (item) {
            setEditingNews(item);
            setFormData(item);
        } else {
            setEditingNews(null);
            setFormData({ ...defaultFormData, id: Date.now().toString() });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/cms/news/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to save news article');
            }

            const savedArticle = await res.json();

            if (editingNews) {
                setNews(news.map(n => n.id === editingNews.id ? { ...formData, id: savedArticle.slug || savedArticle.id } : n));
                showToast('Article updated successfully', 'success');
            } else {
                setNews([{ ...formData, id: savedArticle.slug || savedArticle.id }, ...news]);
                showToast('Article created successfully', 'success');
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error('Failed to persist news changes:', error);
            showToast(error instanceof Error ? error.message : 'Error saving article', 'error');
        }
    };




    const handleDelete = async (id: string) => {
        const isConfirmed = await confirm({
            title: 'Delete Article',
            message: 'Are you sure you want to delete this news article? This action cannot be undone.',
            confirmText: 'Delete',
            type: 'danger'
        });

        if (isConfirmed) {
            try {
                const res = await fetch('/api/cms/news/delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id })
                });

                if (!res.ok) throw new Error('Failed to delete');
                setNews(news.filter(n => n.id !== id));
                showToast('Article deleted successfully', 'success');
            } catch (error) {
                console.error('Failed to persist news deletion:', error);
                showToast('Error deleting article', 'error');
            }
        }
    };

    const updateLocalized = (field: keyof NewsItem, lang: 'en' | 'kh', value: string) => {
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
                    <h1 className="text-2xl font-bold text-slate-900">{t('Newsroom Management')}</h1>
                    <p className="text-sm text-slate-500 mt-1">{t('Manage articles, press releases, and company updates.')}</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus size={18} />
                    {t('New Article')}
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder={t('Search articles...')}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                    <FileText size={16} className="text-indigo-600" />
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{news.length} {t('Articles')}</span>
                </div>
            </div>

            {/* Article List */}
            <div className="grid grid-cols-1 gap-4">
                <AnimatePresence mode='popLayout'>
                    {filteredNews.map((item) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={item.id}
                            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors flex items-center gap-6"
                        >
                            <div className="w-24 h-16 rounded-lg bg-slate-100 overflow-hidden relative border border-slate-200 shrink-0">
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.title.en}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center"><ImageIcon size={20} className="text-slate-300" /></div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-base font-bold text-slate-900 truncate">{item.title[language] || item.title.en || 'Untitled'}</h3>
                                    {item.featured && <Star size={14} className="text-amber-500 fill-amber-500" />}
                                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold uppercase tracking-wider shrink-0">
                                        {t(item.category)}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 font-medium truncate">{item.excerpt[language] || item.excerpt.en}</p>
                            </div>

                            <div className="flex items-center gap-8 shrink-0">
                                <div className="hidden md:flex flex-col text-right">
                                    <span className="text-xs font-semibold text-slate-600">{item.date[language] || item.date.en}</span>
                                    <span className="text-[10px] text-slate-400">{item.author[language] || item.author.en}</span>
                                </div>
                                <div className="flex items-center gap-1 z-10 relative">
                                    <ActionDropdown
                                        onEdit={() => handleOpenModal(item)}
                                        onDelete={() => handleDelete(item.id)}
                                    />
                                </div>
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
                            className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl relative z-10 max-h-[90vh] flex flex-col"
                        >
                            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between shrink-0">
                                <h2 className="text-xl font-bold text-slate-900">{editingNews ? t('Edit Article') : t('New Article')}</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                            </div>

                            <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
                                <form id="news-form" onSubmit={handleSave} className="space-y-8">

                                    {/* Settings */}
                                    <div className="grid grid-cols-4 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                                        <div className="space-y-1.5 col-span-2 md:col-span-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('Category')}</label>
                                            <select
                                                required
                                                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none bg-white font-medium"
                                                value={formData.category === 'Project Updates' ? 'Updates' : formData.category}
                                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                            >
                                                <option value="Updates">Project Updates</option>
                                                <option value="Awards">Awards</option>
                                                <option value="Safety">Safety</option>
                                                <option value="Sustainability">Sustainability</option>
                                                <option value="Culture">Culture</option>
                                                <option value="Community">Community</option>
                                                <option value="Innovation">Innovation</option>
                                                <option value="Systems">Systems</option>
                                                <option value="ANNOUNCEMENT">Announcement</option>
                                                <option value="INDUSTRY">Industry</option>
                                                <option value="CSR">CSR</option>
                                                <option value="ENVIRONMENT">Environment</option>
                                                <option value="CORPORATE">Corporate</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1.5 col-span-2 md:col-span-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('Year')}</label>
                                            <input required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} />
                                        </div>
                                        <div className="space-y-1.5 col-span-2 md:col-span-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('Featured')}</label>
                                            <div className="flex items-center h-10">
                                                <input type="checkbox" checked={formData.featured} onChange={e => setFormData({ ...formData, featured: e.target.checked })} className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                                                <span className="ml-2 text-sm text-slate-600 font-medium">{t('Top Feature')}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-1.5 col-span-2 md:col-span-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('Trending')}</label>
                                            <div className="flex items-center h-10">
                                                <input type="checkbox" checked={formData.trending} onChange={e => setFormData({ ...formData, trending: e.target.checked })} className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                                                <span className="ml-2 text-sm text-slate-600 font-medium">{t('In Trending')}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* English Content */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2 border-b pb-2">
                                            <span className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center text-xs font-bold">EN</span>
                                            <h3 className="text-lg font-bold text-slate-900">English Content</h3>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-1.5 col-span-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Title</label>
                                                <input required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none" value={formData.title.en} onChange={e => updateLocalized('title', 'en', e.target.value)} />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Date</label>
                                                <input required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none" placeholder="e.g. Feb 01, 2026" value={formData.date.en} onChange={e => updateLocalized('date', 'en', e.target.value)} />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Author</label>
                                                <input required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none" value={formData.author.en} onChange={e => updateLocalized('author', 'en', e.target.value)} />
                                            </div>
                                            <div className="space-y-1.5 col-span-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Excerpt</label>
                                                <textarea rows={2} required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none resize-none" value={formData.excerpt.en} onChange={e => updateLocalized('excerpt', 'en', e.target.value)} />
                                            </div>
                                            <div className="space-y-1.5 col-span-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Content (HTML)</label>
                                                <RichTextEditor
                                                    value={formData.content?.en || ''}
                                                    onChange={val => updateLocalized('content', 'en', val)}
                                                    placeholder="Write the full English article..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Khmer Content */}
                                    <div className="space-y-6 pt-6 border-t border-slate-100">
                                        <div className="flex items-center gap-2 border-b pb-2">
                                            <span className="w-6 h-6 rounded bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">KH</span>
                                            <h3 className="text-lg font-bold text-slate-900">Khmer Content <span className="text-sm font-normal text-slate-400">(Optional)</span></h3>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-1.5 col-span-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Title (Khmer)</label>
                                                <input className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none" value={formData.title.kh || ''} onChange={e => updateLocalized('title', 'kh', e.target.value)} />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Date (Khmer)</label>
                                                <input className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none" placeholder="e.g. ០១ កុម្ភៈ ២០២៦" value={formData.date.kh || ''} onChange={e => updateLocalized('date', 'kh', e.target.value)} />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Author (Khmer)</label>
                                                <input className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none" value={formData.author.kh || ''} onChange={e => updateLocalized('author', 'kh', e.target.value)} />
                                            </div>
                                            <div className="space-y-1.5 col-span-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Excerpt (Khmer)</label>
                                                <textarea rows={2} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none resize-none" value={formData.excerpt.kh || ''} onChange={e => updateLocalized('excerpt', 'kh', e.target.value)} />
                                            </div>
                                            <div className="space-y-1.5 col-span-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Content (HTML) (Khmer)</label>
                                                <RichTextEditor
                                                    value={formData.content?.kh || ''}
                                                    onChange={val => updateLocalized('content', 'kh', val)}
                                                    placeholder="Write the full Khmer article..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6 pt-6 border-t border-slate-100">
                                        <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Assets & Meta</h3>
                                        <div className="grid grid-cols-2 gap-6 items-start">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Cover Image</label>
                                                <ImageUpload
                                                    value={formData.image}
                                                    onChange={(url) => setFormData({ ...formData, image: url })}
                                                    description="This image will be used for the article thumbnail and header."
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Read Time (e.g. 5 min read)</label>
                                                <div className="flex gap-2">
                                                    <input required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none" placeholder="EN" value={formData.readTime.en} onChange={e => updateLocalized('readTime', 'en', e.target.value)} />
                                                    <input className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none" placeholder="KH" value={formData.readTime.kh || ''} onChange={e => updateLocalized('readTime', 'kh', e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>

                            <div className="px-8 py-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0 bg-slate-50">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-200 rounded-lg transition-colors">{t('Cancel')}</button>
                                <button type="submit" form="news-form" className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm">{t('Save Article')}</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
