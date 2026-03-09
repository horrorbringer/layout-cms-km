'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Briefcase, Search, Filter, ChevronDown, Users, Globe, Award, Upload, Send, Check, DollarSign, Zap, Target } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage, getLocalizedText } from '../../context/LanguageContext';
import { careerContent } from '../../data/careerContent';

// --- Custom Dropdown Component ---
const CustomDropdown = ({ options, value, onChange, icon: Icon }: { options: string[], value: string, onChange: (val: string) => void, icon?: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                className={`flex items-center gap-3 bg-white border ${isOpen ? 'border-titan-red ring-2 ring-titan-red/10' : 'border-gray-200'} px-6 py-3 rounded-lg text-sm font-bold text-titan-navy min-w-[220px] justify-between transition-all hover:border-titan-red/50 shadow-sm`}
            >
                <div className="flex items-center gap-3">
                    {Icon && <Icon size={16} className="text-titan-red" />}
                    <span>{value}</span>
                </div>
                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden z-50 py-2 origin-top"
                    >
                        {options.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => { onChange(opt); setIsOpen(false); }}
                                className={`w-full text-left px-6 py-2.5 text-sm font-medium hover:bg-gray-50 flex items-center justify-between group ${value === opt ? 'text-titan-red bg-red-50/50' : 'text-titan-navy'}`}
                            >
                                {opt}
                                {value === opt && <Check size={14} className="text-titan-red" />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


export default function CareersView({ initialJobs }: { initialJobs: any[] }) {
    const { t, language, fontClassName } = useLanguage();
    const data = careerContent;

    const [filterDept, setFilterDept] = useState(t('All Departments'));
    const [filterLoc, setFilterLoc] = useState(t('All Locations'));
    const [searchQuery, setSearchQuery] = useState('');

    const filteredJobs = initialJobs.filter(job => {
        const deptLabel = t(job.dept);
        if (filterDept !== t('All Departments') && deptLabel !== filterDept) return false;
        const jobLocLabel = getLocalizedText(job.loc, language);
        if (filterLoc !== t('All Locations') && jobLocLabel !== filterLoc) return false;
        const titleEn = job.title.en.toLowerCase();
        const titleKh = (job.title.kh || '').toLowerCase();
        if (searchQuery && !titleEn.includes(searchQuery.toLowerCase()) && !titleKh.includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const categories = [t('All Departments'), t('Engineering'), t('Operations'), t('Design'), t('Supply Chain'), t('Quality & Safety')];
    const locations = [t('All Locations'), t('Phnom Penh'), t('Sihanoukville'), t('Kampot'), t('Siem Reap')];

    const [isApplyOpen, setIsApplyOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        cvUrl: '',
        interest: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const uploadData = new FormData();
            uploadData.append('file', file);
            const res = await fetch('/api/cms/upload', { method: 'POST', body: uploadData });
            const data = await res.json();
            if (data.url) {
                setFormData(prev => ({ ...prev, cvUrl: data.url }));
            }
        } catch (err) {
            setSubmitError('Failed to upload CV');
        } finally {
            setIsUploading(false);
        }
    };

    const handleApplySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');

        try {
            const response = await fetch('/api/careers/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobId: 'general',
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    cvUrl: formData.cvUrl,
                    coverLetter: formData.interest
                })
            });

            if (!response.ok) throw new Error('Submission failed');

            setIsSubmitted(true);
            setTimeout(() => {
                setIsApplyOpen(false);
                setIsSubmitted(false);
                setFormData({ firstName: '', lastName: '', email: '', phone: '', cvUrl: '', interest: '' });
            }, 3000);
        } catch (err) {
            setSubmitError('Failed to submit application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getIcon = (name: string) => {
        switch (name) {
            case 'Award': return Award;
            case 'Target': return Target;
            case 'Users': return Users;
            case 'Zap': return Zap;
            case 'Briefcase': return Briefcase;
            case 'Globe': return Globe;
            case 'Check': return Check;
            default: return Target;
        }
    };

    return (
        <div className={`bg-gray-50 min-h-screen text-titan-navy relative ${fontClassName}`}>
            {/* --- HERO SECTION --- */}
            <section className="relative h-[80vh] bg-titan-navy flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/career.png"
                        alt="Join Kimmex"
                        fill
                        className="object-cover opacity-30 scale-110"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-titan-navy/50 via-titan-navy/20 to-titan-navy"></div>
                </div>

                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-xs font-bold uppercase tracking-widest mb-8 border border-white/10 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-titan-red animate-pulse"></span>
                            {getLocalizedText(data.hero.tagline, language)}
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tight leading-[0.9]">
                            {getLocalizedText(data.hero.title1, language)} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">{getLocalizedText(data.hero.title2, language)}</span>
                        </h1>
                        <p className="text-xl text-white/70 font-light max-w-xl leading-relaxed mb-10 border-l-4 border-titan-red pl-6">
                            {getLocalizedText(data.hero.subtext, language)}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-titan-red text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-white hover:text-titan-red transition-all shadow-lg hover:shadow-titan-red/20"
                            >
                                {t('View Openings')}
                            </button>
                            <button
                                onClick={() => setIsApplyOpen(true)}
                                className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-white hover:text-titan-navy transition-all backdrop-blur-sm"
                            >
                                {t('Apply General')}
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="hidden lg:grid grid-cols-2 gap-4"
                    >
                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                            <h3 className="text-4xl font-black text-white mb-2">{data.stats.teamMembers}</h3>
                            <p className="text-white/80 text-sm font-bold uppercase tracking-widest">{getLocalizedText(data.stats.teamMembersLabel, language)}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                            <h3 className="text-4xl font-black text-white mb-2">{data.stats.activeProjects}</h3>
                            <p className="text-white/80 text-sm font-bold uppercase tracking-widest">{getLocalizedText(data.stats.activeProjectsLabel, language)}</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-xl col-span-2 flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-black text-titan-navy mb-1">{getLocalizedText(data.stats.awardTitle, language)}</h3>
                                <p className="text-titan-navy-subtle text-xs font-bold uppercase tracking-widest">{getLocalizedText(data.stats.awardSub, language)}</p>
                            </div>
                            <Award size={48} className="text-titan-red" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- WHY JOIN US --- */}
            <section className="py-24 px-6 max-w-[1400px] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-titan-navy mb-4">{getLocalizedText(data.whyJoin.title, language)}</h2>
                    <p className="text-titan-navy-subtle max-w-2xl mx-auto">{getLocalizedText(data.whyJoin.subtext, language)}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {data.whyJoin.cards.map((card: any, i: number) => {
                        const Icon = getIcon(card.icon);
                        return (
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-10 rounded-2xl shadow-xl border-b-4 border-titan-red text-center group hover:-translate-y-2 transition-transform duration-300"
                            >
                                <div className="w-16 h-16 bg-titan-bg rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-titan-red group-hover:text-white transition-colors">
                                    <Icon size={28} />
                                </div>
                                <h3 className="text-xl font-black text-titan-navy mb-4">{getLocalizedText(card.title, language)}</h3>
                                <p className="text-titan-navy-subtle leading-relaxed">{getLocalizedText(card.desc, language)}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* --- HIRING PROCESS --- */}
            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-titan-red font-bold uppercase tracking-widest text-sm mb-2 block">{getLocalizedText(data.process.tagline, language)}</span>
                        <h2 className="text-4xl text-titan-navy font-black">{getLocalizedText(data.process.title, language)}</h2>
                        <p className="text-titan-navy/50 mt-4 max-w-2xl mx-auto">{getLocalizedText(data.process.subtext, language)}</p>
                    </div>

                    <div className="relative">
                        <div className="hidden md:block absolute top-[40px] left-0 right-0 h-[2px] bg-gray-200 z-0"></div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                            {data.process.steps.map((s: any, i: number) => (
                                <div key={i} className="flex flex-col items-center text-center group">
                                    <div className="w-20 h-20 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center text-2xl font-black text-titan-navy shadow-sm mb-6 group-hover:border-titan-red group-hover:text-titan-red transition-all relative z-10">
                                        {s.step}
                                    </div>
                                    <h3 className="text-lg font-black text-titan-navy mb-2">{getLocalizedText(s.title, language)}</h3>
                                    <p className="text-sm text-titan-navy/60 px-4">{getLocalizedText(s.desc, language)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- JOB LISTINGS & FILTERS --- */}
            <section id="openings" className="px-6 max-w-[1400px] mx-auto pb-32 pt-10 border-t border-gray-200">
                <div className="flex flex-col xl:flex-row justify-between items-end mb-12 gap-8 relative z-30 pt-20">
                    <div>
                        <h2 className="text-4xl font-black text-titan-navy mb-3">{getLocalizedText(data.openings.title, language)}</h2>
                        <p className="text-titan-navy-subtle text-lg font-medium">{getLocalizedText(data.openings.subtext, language)}</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto bg-white p-2 rounded-2xl shadow-lg border border-gray-100">
                        <div className="relative flex-grow md:flex-grow-0 md:w-64">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder={t('Search roles...')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border-none bg-gray-50 text-sm font-bold text-titan-navy focus:outline-none focus:ring-2 focus:ring-titan-red/20 transition-all placeholder:text-gray-400"
                            />
                        </div>

                        <CustomDropdown
                            options={categories}
                            value={filterDept}
                            onChange={setFilterDept}
                            icon={Filter}
                        />
                        <CustomDropdown
                            options={locations}
                            value={filterLoc}
                            onChange={setFilterLoc}
                            icon={MapPin}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AnimatePresence>
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.05 }}
                                    key={job.id}
                                    className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-2xl hover:border-titan-red/20 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between min-h-[220px]"
                                >
                                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                                        <Briefcase size={80} className="text-titan-navy" />
                                    </div>

                                    <div>
                                        <div className="flex flex-wrap justify-between items-start mb-4">
                                            <div className="flex flex-wrap gap-2 items-center mb-2">
                                                {job.tags?.map((tag: any, ti: number) => (
                                                    <span key={ti} className="px-3 py-1 bg-gray-50 text-[10px] font-black uppercase tracking-widest text-titan-navy-subtle rounded-md border border-gray-100">
                                                        {getLocalizedText(tag, language)}
                                                    </span>
                                                ))}
                                                <span className="text-[10px] text-gray-400 font-medium ml-2">{getLocalizedText(job.postedDate, language)}</span>
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-titan-navy/40 bg-gray-50 px-2 py-1 rounded">
                                                {getLocalizedText(job.type, language)}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-black text-titan-navy group-hover:text-titan-red transition-colors mb-2 pr-12 line-clamp-2">
                                            {getLocalizedText(job.title, language)}
                                        </h3>

                                        <div className="grid grid-cols-2 gap-4 mb-8 bg-gray-50 rounded-xl p-4 border border-gray-100">
                                            <div>
                                                <span className="block text-[10px] font-black uppercase tracking-widest text-titan-navy/40 mb-1">{t('Salary Range')}</span>
                                                <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                                                    <DollarSign size={14} /> {getLocalizedText(job.salary, language)}
                                                </div>
                                            </div>
                                            <div>
                                                <span className="block text-[10px] font-black uppercase tracking-widest text-titan-navy/40 mb-1">{t('Experience')}</span>
                                                <div className="flex items-center gap-2 text-titan-navy font-bold text-sm">
                                                    <Award size={14} className="text-titan-red" /> {getLocalizedText(job.experience, language)}
                                                </div>
                                            </div>
                                            <div>
                                                <span className="block text-[10px] font-black uppercase tracking-widest text-titan-navy/40 mb-1">{t('Location')}</span>
                                                <div className="flex items-center gap-2 text-titan-navy-subtle text-xs font-bold">
                                                    <MapPin size={12} /> {getLocalizedText(job.loc, language)}
                                                </div>
                                            </div>
                                            <div>
                                                <span className="block text-[10px] font-black uppercase tracking-widest text-titan-navy/40 mb-1">{t('Department')}</span>
                                                <div className="flex items-center gap-2 text-titan-navy-subtle text-xs font-bold">
                                                    <Briefcase size={12} /> {job.dept}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto">
                                        <Link href={`/design-z/careers/${job.id}`} className="w-full group/btn flex items-center justify-between bg-titan-navy text-white px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-titan-red transition-all shadow-md">
                                            {t('View Full Description')}
                                            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-24 bg-white rounded-2xl border border-dashed border-gray-200">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="text-gray-300" size={32} />
                                </div>
                                <h3 className="text-xl font-black text-titan-navy mb-2">{t('No positions found')}</h3>
                                <p className="text-titan-navy-subtle text-sm mb-8 font-medium">{t('No positions found Sub')}</p>
                                <button onClick={() => { setFilterDept(t('All Departments')); setFilterLoc(t('All Locations')); setSearchQuery(''); }} className="bg-titan-navy text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-titan-red transition-colors shadow-lg">
                                    {t('Clear All Filters')}
                                </button>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-20 bg-titan-navy rounded-2xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-white/5 opacity-10"></div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black mb-4">{t("Don't see your perfect role?")}</h3>
                        <p className="text-white/70 mb-8 max-w-xl mx-auto text-lg font-light">{t('Talent Pool Sub')}</p>
                        <button
                            onClick={() => setIsApplyOpen(true)}
                            className="inline-flex items-center gap-2 bg-titan-red text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-white hover:text-titan-red transition-colors shadow-lg"
                        >
                            {t('Send General Application')} <Send size={16} />
                        </button>
                    </div>
                </div>
            </section>

            {/* --- APPLICATION MODAL --- */}
            <AnimatePresence>
                {isApplyOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsApplyOpen(false)}
                            className="absolute inset-0 bg-titan-navy/80 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-titan-navy to-titan-red"></div>
                            <button
                                onClick={() => setIsApplyOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-titan-red transition-colors bg-gray-50 rounded-full p-2"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-8 md:p-12">
                                <div className="mb-8 text-center">
                                    <h3 className="text-3xl font-black text-titan-navy mb-2">{t('General Application')}</h3>
                                    <p className="text-titan-navy-subtle text-sm">{t('General Application Sub')}</p>
                                </div>

                                {isSubmitted ? (
                                    <div className="text-center py-10 space-y-6">
                                        <h3 className="text-2xl font-black text-titan-navy">{t('Application Sent')}</h3>
                                        <p className="text-titan-navy-subtle">Thank you for your interest. We will review your application and get back to you soon.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleApplySubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">{t('First Name')}</label>
                                                <input type="text" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-titan-navy focus:border-titan-red focus:outline-none transition-colors" placeholder={language === 'kh' ? 'ឧ. សុខ' : 'John'} required />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">{t('Last Name')}</label>
                                                <input type="text" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-titan-navy focus:border-titan-red focus:outline-none transition-colors" placeholder={language === 'kh' ? 'ឧ. ដារ៉ា' : 'Doe'} required />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">{t('Email Address')}</label>
                                                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-titan-navy focus:border-titan-red focus:outline-none transition-colors" placeholder="john@example.com" required />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">{t('Phone Number required')}</label>
                                                <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-titan-navy focus:border-titan-red focus:outline-none transition-colors" placeholder="+855 ..." required />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">{t('Area of Interest')}</label>
                                            <input type="text" value={formData.interest} onChange={e => setFormData({ ...formData, interest: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-titan-navy focus:border-titan-red focus:outline-none transition-colors" placeholder={language === 'kh' ? 'ឧ. គ្រប់គ្រងគម្រោង, វិស្វកម្ម...' : 'e.g. Project Management, Engineering...'} required />
                                        </div>

                                        <div className="mb-6">
                                            <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">{t('Resume / CV')}</label>
                                            <div className={`border-2 border-dashed ${formData.cvUrl ? 'border-green-300' : 'border-gray-300'} rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative`}>
                                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} accept=".pdf,.doc,.docx" disabled={isUploading} />
                                                <Upload className={`mx-auto mb-2 ${formData.cvUrl ? 'text-green-500' : 'text-titan-navy-subtle'}`} size={24} />
                                                <p className="text-sm font-bold text-titan-navy">
                                                    {isUploading ? 'Uploading...' : formData.cvUrl ? 'CV Uploaded' : t('Click to Upload or Drag & Drop')}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">{t('PDF, DOCX up to 5MB')}</p>
                                            </div>
                                        </div>

                                        {submitError && (
                                            <p className="text-titan-red text-xs font-bold mb-4 text-center">{submitError}</p>
                                        )}

                                        <button disabled={isSubmitting || isUploading} type="submit" className="w-full bg-titan-navy text-white font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-titan-red transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50">
                                            {isSubmitting ? 'Submitting...' : t('Submit Application')} <Send size={16} />
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

const X = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
