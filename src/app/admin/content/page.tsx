'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
    Layout,
    Type,
    Image as ImageIcon,
    Quote,
    Phone,
    Trophy,
    Save,
    Plus,
    ChevronRight,
    Hammer,
    ShieldCheck,
    Clock,
    Target,
    Trash2,
    Calendar,
    MapPin,
    ExternalLink,
    Briefcase,
    Eye,
    Award,
    Circle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { aboutData } from '@/app/design-z/data/aboutData';
import { serviceData } from '@/app/design-z/data/serviceData';
import { serviceDetails, ServiceDetail as ServiceDetailType } from '@/app/design-z/data/serviceDetailData';
import { contactData } from '@/app/design-z/data/contactData';
import { homeData } from '@/app/design-z/data/homeData';
import { jobData } from '@/app/design-z/data/jobData';
import ServiceDetailEditor from './components/ServiceDetailEditor';
import { LocalizedString } from '@/app/design-z/context/LanguageContext';

// --- TYPES ---
interface ProcessStep {
    id: string;
    step: string;
    title: LocalizedString;
    desc: LocalizedString;
}

interface ValueItem {
    id: string;
    title: LocalizedString;
    content: LocalizedString;
}

interface Job {
    id: string;
    title: LocalizedString;
    loc: LocalizedString;
    type: LocalizedString;
    date: LocalizedString;
}

interface Testimonial {
    id: string;
    author: LocalizedString;
    quote: LocalizedString;
    role: LocalizedString;
}

interface ServiceFeatureItem {
    en: string;
    kh: string;
}

interface ServiceItem {
    id: string;
    title: LocalizedString;
    desc: LocalizedString;
    image: string;
    features: ServiceFeatureItem[];
}

interface ProcessItem {
    id: string;
    step: string;
    title: LocalizedString;
    desc: LocalizedString;
}

interface SectorItem {
    id: string;
    title: LocalizedString;
    image: string;
}

interface StatItem {
    label: LocalizedString;
    val: LocalizedString;
    iconName: string;
}

interface ServiceDetail extends ServiceDetailType { }

function AdminContentEditor() {
    const searchParams = useSearchParams();
    const sectionParam = searchParams.get('section') || 'home';
    const [activeSection, setActiveSection] = useState(sectionParam);
    const [editLang, setEditLang] = useState<'en' | 'kh'>('en');
    const [isSaving, setIsSaving] = useState(false);

    // --- STATE FOR CONTENT ---
    const [homeHero, setHomeHero] = useState(() => ({
        title: typeof homeData.hero.title === 'string' ? { en: homeData.hero.title, kh: homeData.hero.title } : homeData.hero.title,
        subtitle: typeof homeData.hero.subtitle === 'string' ? { en: homeData.hero.subtitle, kh: homeData.hero.subtitle } : homeData.hero.subtitle
    }));

    const [stats, setStats] = useState<StatItem[]>(() =>
        homeData.stats.map(s => ({
            label: typeof s.label === 'string' ? { en: s.label, kh: s.label } : s.label,
            val: typeof s.val === 'string' ? { en: s.val, kh: s.val } : s.val,
            iconName: s.iconName
        }))
    );

    const [processSteps, setProcessSteps] = useState<ProcessStep[]>(() =>
        homeData.process.map(p => ({
            id: p.id,
            step: p.step,
            title: typeof p.title === 'string' ? { en: p.title, kh: p.title } : p.title,
            desc: typeof p.desc === 'string' ? { en: p.desc, kh: p.desc } : p.desc
        }))
    );

    const [aboutStory, setAboutStory] = useState<LocalizedString>(() => {
        const story = aboutData.story;
        if (typeof story === 'string') return { en: story, kh: story };
        return story;
    });

    const [values, setValues] = useState<ValueItem[]>(() => {
        return aboutData.values.map(v => ({
            id: v.id,
            title: typeof v.title === 'string' ? { en: v.title, kh: v.title } : v.title,
            content: typeof v.content === 'string' ? { en: v.content, kh: v.content } : v.content
        }));
    });

    const [services, setServices] = useState<ServiceItem[]>(() =>
        serviceData.services.map(s => ({
            id: s.id,
            title: typeof s.title === 'string' ? { en: s.title, kh: s.title } : s.title,
            desc: typeof s.desc === 'string' ? { en: s.desc, kh: s.desc } : s.desc,
            image: s.image,
            features: s.features.map((f: any) => ({ en: f.en || f, kh: f.kh || f.en || f }))
        }))
    );

    const [processStepsService, setProcessStepsService] = useState<ProcessItem[]>(() =>
        serviceData.process.map(p => ({
            id: p.id,
            step: p.step,
            title: typeof p.title === 'string' ? { en: p.title, kh: p.title } : p.title,
            desc: typeof p.desc === 'string' ? { en: p.desc, kh: p.desc } : p.desc
        }))
    );

    const [sectors, setSectors] = useState<SectorItem[]>(() =>
        serviceData.sectors.map(s => ({
            id: s.id,
            title: typeof s.title === 'string' ? { en: s.title, kh: s.title } : s.title,
            image: s.image
        }))
    );

    const [detailsMap, setDetailsMap] = useState<Record<string, ServiceDetail>>(serviceDetails);
    const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

    const [jobs, setJobs] = useState<Job[]>(() =>
        jobData.map(j => ({
            id: j.id,
            title: typeof j.title === 'string' ? { en: j.title, kh: j.title } : j.title,
            loc: typeof j.loc === 'string' ? { en: j.loc, kh: j.loc } : j.loc,
            type: typeof j.type === 'string' ? { en: j.type, kh: j.type } : j.type,
            date: typeof j.postedDate === 'string' ? { en: j.postedDate, kh: j.postedDate } : j.postedDate
        }))
    );

    const [testimonials, setTestimonials] = useState<Testimonial[]>(() =>
        homeData.testimonials.map(t => ({
            id: t.id,
            author: typeof t.author === 'string' ? { en: t.author, kh: t.author } : t.author,
            quote: typeof t.quote === 'string' ? { en: t.quote, kh: t.quote } : t.quote,
            role: typeof t.role === 'string' ? { en: t.role, kh: t.role } : t.role
        }))
    );

    const [contact, setContact] = useState({
        address: {
            en: contactData.address.en,
            kh: contactData.address.kh || contactData.address.en
        },
        phone: contactData.phone.join(', '),
        email: contactData.email.join(', '),
        hours: {
            en: contactData.hours.en,
            kh: contactData.hours.kh || contactData.hours.en
        },
        googleMapsUrl: contactData.googleMapsUrl,
        socials: {
            facebook: contactData.socials.facebook,
            linkedin: contactData.socials.linkedin,
            instagram: contactData.socials.instagram,
        }
    });

    useEffect(() => {
        setActiveSection(sectionParam);
        if (typeof window !== 'undefined' && window.location.hash) {
            const id = window.location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [sectionParam]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            if (activeSection === 'about') {
                const updatedAboutData = {
                    story: aboutStory,
                    values: values
                };

                const response = await fetch('/api/cms/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileName: 'aboutData.ts', data: updatedAboutData })
                });

                if (!response.ok) throw new Error('Failed to save content');
            }

            if (activeSection === 'services') {
                const updatedServiceData = {
                    services,
                    process: processStepsService,
                    sectors
                };

                const res1 = await fetch('/api/cms/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileName: 'serviceData.ts', data: updatedServiceData })
                });
                if (!res1.ok) throw new Error('Failed to save serviceData');

                const res2 = await fetch('/api/cms/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileName: 'serviceDetailData.ts', data: detailsMap })
                });
                if (!res2.ok) throw new Error('Failed to save serviceDetailData');
            }

            if (activeSection === 'home') {
                const updatedHomeData = {
                    hero: homeHero,
                    stats: stats,
                    process: processSteps,
                    testimonials: testimonials
                };

                const response = await fetch('/api/cms/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileName: 'homeData.ts', data: updatedHomeData })
                });

                if (!response.ok) throw new Error('Failed to save content');
            }

            if (activeSection === 'careers') {
                const updatedJobData = jobs.map(j => {
                    const orig = jobData.find(oj => oj.id === j.id);
                    return {
                        ...orig,
                        id: j.id,
                        title: j.title,
                        loc: j.loc,
                        type: j.type,
                        postedDate: j.date
                    };
                });

                const response = await fetch('/api/cms/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileName: 'jobData.ts', data: updatedJobData })
                });

                if (!response.ok) throw new Error('Failed to save content');
            }

            if (activeSection === 'contact') {
                const updatedContactData = {
                    ...contactData,
                    address: contact.address,
                    phone: contact.phone.split(',').map(p => p.trim()),
                    email: contact.email.split(',').map(e => e.trim()),
                    hours: contact.hours,
                    googleMapsUrl: contact.googleMapsUrl,
                    socials: contact.socials
                };

                const res = await fetch('/api/cms/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileName: 'contactData.ts', data: updatedContactData })
                });
                if (!res.ok) throw new Error('Failed to save contactData');
            }

            alert('Changes saved successfully!');
        } catch (error) {
            console.error('Error saving:', error);
            alert('Failed to save changes.');
        } finally {
            setIsSaving(false);
        }
    };

    // --- HANDLERS ---
    const addProcessStep = () => {
        const nextStep = (processSteps.length + 1).toString().padStart(2, '0');
        setProcessSteps([...processSteps, {
            id: Date.now().toString(),
            step: nextStep,
            title: { en: 'New Process Step', kh: 'ជំហានថ្មី' },
            desc: { en: 'Step description', kh: 'ការពិពណ៌នា' }
        }]);
    };

    const deleteProcessStep = (id: string) => {
        setProcessSteps(processSteps.filter(s => s.id !== id));
    };

    const addValue = () => {
        setValues([...values, { id: Date.now().toString(), title: { en: 'New Value', kh: 'គុណតម្លៃថ្មី' }, content: { en: 'Value content', kh: 'មាតិកា' } }]);
    };

    const deleteValue = (id: string) => {
        setValues(values.filter(v => v.id !== id));
    };

    const addJob = () => {
        setJobs([...jobs, {
            id: Date.now().toString(),
            title: { en: 'Open Position', kh: 'មុខតំណែងទំនេរ' },
            loc: { en: 'Phnom Penh', kh: 'ភ្នំពេញ' },
            type: { en: 'Full-time', kh: 'ពេញម៉ោង' },
            date: { en: 'Feb 2026', kh: 'កុម្ភៈ ២០២៦' }
        }]);
    };

    const deleteJob = (id: string) => {
        setJobs(jobs.filter(j => j.id !== id));
    };

    const addTestimonial = () => {
        setTestimonials([...testimonials, { id: Date.now().toString(), author: { en: 'Client Name', kh: 'ឈ្មោះអតិថិជន' }, quote: { en: 'Experience shared here...', kh: 'បទពិសោធន៍...' }, role: { en: 'Organization', kh: 'ស្ថាប័ន' } }]);
    };

    const deleteTestimonial = (id: string) => {
        setTestimonials(testimonials.filter(t => t.id !== id));
    };

    const editServiceDetails = (id: string) => {
        setEditingServiceId(id);
    };

    const closeServiceDetails = () => {
        setEditingServiceId(null);
    };

    const updateServiceDetail = (updated: ServiceDetail) => {
        setDetailsMap({
            ...detailsMap,
            [updated.id]: updated
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Site Content Editor</h1>
                    <p className="text-sm text-slate-500 mt-1">Update the textual and visual information on the {activeSection} section.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                        <Eye size={16} />
                        Preview
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                        {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Section:</span>
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{activeSection}</span>
                    </div>

                    <div className="flex items-center bg-slate-200/50 p-1 rounded-lg border border-slate-200">
                        <button
                            onClick={() => setEditLang('en')}
                            className={`px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${editLang === 'en' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            English (EN)
                        </button>
                        <button
                            onClick={() => setEditLang('kh')}
                            className={`px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${editLang === 'kh' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Khmer (KH)
                        </button>
                    </div>
                </div>

                <div className="p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* --- HOME --- */}
                            {activeSection === 'home' && (
                                <div className="space-y-12">
                                    <section id="hero" className="space-y-4">
                                        <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Hero Section</h3>
                                        <div className="grid grid-cols-1 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Main Headline ({editLang.toUpperCase()})</label>
                                                <input
                                                    className={`w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                    value={homeHero.title[editLang]}
                                                    onChange={(e) => setHomeHero({ ...homeHero, title: { ...homeHero.title, [editLang]: e.target.value } })}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Hero Description ({editLang.toUpperCase()})</label>
                                                <textarea
                                                    rows={3}
                                                    className={`w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium resize-none ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                    value={homeHero.subtitle[editLang]}
                                                    onChange={(e) => setHomeHero({ ...homeHero, subtitle: { ...homeHero.subtitle, [editLang]: e.target.value } })}
                                                />
                                            </div>
                                        </div>
                                    </section>

                                    <section id="why" className="space-y-4">
                                        <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Core Statistics</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            {stats.map((stat, i) => (
                                                <div key={i} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3">
                                                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-indigo-600">
                                                        {stat.iconName === 'ShieldCheck' && <ShieldCheck size={16} />}
                                                        {stat.iconName === 'Trophy' && <Trophy size={16} />}
                                                        {stat.iconName === 'Clock' && <Clock size={16} />}
                                                        {stat.iconName === 'Target' && <Target size={16} />}
                                                        {stat.iconName === 'Award' && <Award size={16} />}
                                                        {!['ShieldCheck', 'Trophy', 'Clock', 'Target', 'Award'].includes(stat.iconName) && <Type size={16} />}
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <input
                                                            className={`w-full bg-transparent text-sm font-bold text-slate-900 outline-none border-b border-transparent focus:border-slate-300 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                            value={stat.label[editLang]}
                                                            onChange={(e) => {
                                                                const newStats = [...stats];
                                                                newStats[i].label = { ...newStats[i].label, [editLang]: e.target.value };
                                                                setStats(newStats);
                                                            }}
                                                        />
                                                        <input
                                                            className={`w-full bg-transparent text-xs text-slate-500 outline-none border-b border-transparent focus:border-slate-300 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                            value={stat.val[editLang]}
                                                            onChange={(e) => {
                                                                const newStats = [...stats];
                                                                newStats[i].val = { ...newStats[i].val, [editLang]: e.target.value };
                                                                setStats(newStats);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section id="process" className="space-y-4">
                                        <div className="flex items-center justify-between border-b pb-2">
                                            <h3 className="text-lg font-bold text-slate-900">Working Process</h3>
                                            <button onClick={addProcessStep} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                                                <Plus size={14} /> Add Step
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {processSteps.map((p, i) => (
                                                <div key={p.id} className="p-5 border border-slate-200 rounded-xl relative group">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">{p.step}</div>
                                                        <div className="flex-1 space-y-1">
                                                            <input
                                                                className={`w-full text-sm font-bold text-slate-900 bg-transparent outline-none focus:bg-slate-50 rounded px-1 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                                value={p.title[editLang]}
                                                                onChange={(e) => {
                                                                    const newSteps = [...processSteps];
                                                                    newSteps[i].title = { ...newSteps[i].title, [editLang]: e.target.value };
                                                                    setProcessSteps(newSteps);
                                                                }}
                                                            />
                                                            <input
                                                                className={`w-full text-xs text-slate-500 bg-transparent outline-none focus:bg-slate-50 rounded px-1 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                                value={p.desc[editLang]}
                                                                onChange={(e) => {
                                                                    const newSteps = [...processSteps];
                                                                    newSteps[i].desc = { ...newSteps[i].desc, [editLang]: e.target.value };
                                                                    setProcessSteps(newSteps);
                                                                }}
                                                            />
                                                        </div>
                                                        <button onClick={() => deleteProcessStep(p.id)} className="p-1.5 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section id="testimonials" className="space-y-4">
                                        <div className="flex items-center justify-between border-b pb-2">
                                            <h3 className="text-lg font-bold text-slate-900">Testimonials</h3>
                                            <button onClick={addTestimonial} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                                                <Plus size={14} /> Add Testimonial
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {testimonials.map((t, i) => (
                                                <div key={t.id} className="p-5 border border-slate-200 rounded-xl relative group bg-white shadow-sm hover:border-slate-300 transition-colors">
                                                    <button onClick={() => deleteTestimonial(t.id)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                                        <Trash2 size={14} />
                                                    </button>
                                                    <div className="flex items-center gap-1 text-amber-400 mb-3">
                                                        {[...Array(5)].map((_, i) => <Award key={i} size={14} fill="currentColor" />)}
                                                    </div>
                                                    <textarea
                                                        className={`w-full text-sm italic text-slate-600 bg-transparent outline-none mb-4 resize-none h-24 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                        value={t.quote[editLang]}
                                                        onChange={(e) => {
                                                            const updated = [...testimonials];
                                                            updated[i].quote = { ...updated[i].quote, [editLang]: e.target.value };
                                                            setTestimonials(updated);
                                                        }}
                                                    />
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                                            <Quote size={20} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <input
                                                                className={`w-full text-sm font-bold text-slate-900 bg-transparent outline-none ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                                value={t.author[editLang]}
                                                                onChange={(e) => {
                                                                    const updated = [...testimonials];
                                                                    updated[i].author = { ...updated[i].author, [editLang]: e.target.value };
                                                                    setTestimonials(updated);
                                                                }}
                                                            />
                                                            <input
                                                                className={`w-full text-xs text-slate-500 bg-transparent outline-none ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                                value={t.role[editLang]}
                                                                onChange={(e) => {
                                                                    const updated = [...testimonials];
                                                                    updated[i].role = { ...updated[i].role, [editLang]: e.target.value };
                                                                    setTestimonials(updated);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            )}

                            {/* --- SERVICES --- */}
                            {activeSection === 'services' && (
                                <div className="space-y-10">
                                    <section id="services-list" className="space-y-4">
                                        <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Service Cards</h3>
                                        <div className="space-y-6">
                                            {services.map((svc, i) => (
                                                <div key={svc.id} className="p-5 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Service {i + 1}</span>
                                                        <button
                                                            onClick={() => editServiceDetails(svc.id)}
                                                            className="text-xs font-bold text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-all flex items-center gap-1.5"
                                                        >
                                                            <Eye size={14} /> Edit Detail Page
                                                        </button>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Title ({editLang.toUpperCase()})</label>
                                                            <input
                                                                className={`w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                                value={svc.title[editLang]}
                                                                onChange={(e) => {
                                                                    const updated = [...services];
                                                                    updated[i].title = { ...updated[i].title, [editLang]: e.target.value };
                                                                    setServices(updated);
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Image Path</label>
                                                            <input
                                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none"
                                                                value={svc.image}
                                                                onChange={(e) => {
                                                                    const updated = [...services]; updated[i].image = e.target.value; setServices(updated);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Description ({editLang.toUpperCase()})</label>
                                                        <textarea
                                                            rows={3}
                                                            className={`w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none resize-none ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                            value={svc.desc[editLang]}
                                                            onChange={(e) => {
                                                                const updated = [...services];
                                                                updated[i].desc = { ...updated[i].desc, [editLang]: e.target.value };
                                                                setServices(updated);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Features ({editLang.toUpperCase()}, comma-separated)</label>
                                                        <input
                                                            className={`w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                            value={svc.features.map(f => f[editLang] || f.en).join(', ')}
                                                            onChange={(e) => {
                                                                const vals = e.target.value.split(',').map(v => v.trim());
                                                                const updated = [...services];
                                                                updated[i].features = vals.map((v, idx) => {
                                                                    const existing = updated[i].features[idx];
                                                                    return {
                                                                        en: editLang === 'en' ? v : (existing?.en || v),
                                                                        kh: editLang === 'kh' ? v : (existing?.kh || v)
                                                                    };
                                                                });
                                                                setServices(updated);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section id="services-process" className="space-y-4">
                                        <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Working Process</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {processStepsService.map((p, i) => (
                                                <div key={p.id} className="p-5 border border-slate-200 rounded-xl relative group">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">{p.step}</div>
                                                        <div className="flex-1 space-y-1">
                                                            <input
                                                                className={`w-full text-sm font-bold text-slate-900 bg-transparent outline-none focus:bg-slate-50 rounded px-1 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                                value={p.title[editLang]}
                                                                onChange={(e) => {
                                                                    const updated = [...processStepsService];
                                                                    updated[i].title = { ...updated[i].title, [editLang]: e.target.value };
                                                                    setProcessStepsService(updated);
                                                                }}
                                                            />
                                                            <input
                                                                className={`w-full text-xs text-slate-500 bg-transparent outline-none focus:bg-slate-50 rounded px-1 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                                value={p.desc[editLang]}
                                                                onChange={(e) => {
                                                                    const updated = [...processStepsService];
                                                                    updated[i].desc = { ...updated[i].desc, [editLang]: e.target.value };
                                                                    setProcessStepsService(updated);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section id="services-sectors" className="space-y-4">
                                        <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Sectors We Serve</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {sectors.map((sec, i) => (
                                                <div key={sec.id} className="p-4 border border-slate-200 rounded-xl flex items-center gap-4 group">
                                                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">{i + 1}</div>
                                                    <div className="flex-1 space-y-1">
                                                        <input
                                                            className={`w-full text-sm font-bold text-slate-900 bg-transparent outline-none ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                            value={sec.title[editLang]}
                                                            onChange={(e) => {
                                                                const updated = [...sectors];
                                                                updated[i].title = { ...updated[i].title, [editLang]: e.target.value };
                                                                setSectors(updated);
                                                            }}
                                                        />
                                                        <input
                                                            className="w-full text-xs text-slate-400 font-mono bg-transparent outline-none"
                                                            value={sec.image}
                                                            onChange={(e) => {
                                                                const updated = [...sectors]; updated[i].image = e.target.value; setSectors(updated);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            )}

                            {/* --- ABOUT --- */}
                            {activeSection === 'about' && (
                                <div className="space-y-10">
                                    <section id="story" className="space-y-4">
                                        <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Our Story</h3>
                                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Corporate Narrative ({editLang.toUpperCase()})</label>
                                            <textarea
                                                rows={8}
                                                className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium leading-relaxed ${editLang === 'kh' ? 'font-siemreap text-lg' : ''}`}
                                                value={aboutStory[editLang]}
                                                onChange={(e) => setAboutStory({ ...aboutStory, [editLang]: e.target.value })}
                                            />
                                        </div>
                                    </section>

                                    <section id="values" className="space-y-4">
                                        <div className="flex items-center justify-between border-b pb-2">
                                            <h3 className="text-lg font-bold text-slate-900">Core Values</h3>
                                            <button onClick={addValue} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                                                <Plus size={14} /> Add Value
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {values.map((v, i) => (
                                                <div key={v.id} className="p-5 border border-slate-200 rounded-xl relative group bg-white shadow-sm hover:border-slate-300 transition-colors">
                                                    <button onClick={() => deleteValue(v.id)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                                        <Trash2 size={14} />
                                                    </button>
                                                    <input
                                                        className={`w-full text-base font-bold text-slate-900 bg-transparent outline-none mb-3 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                        value={v.title[editLang]}
                                                        onChange={(e) => {
                                                            const newVals = [...values];
                                                            newVals[i].title = { ...newVals[i].title, [editLang]: e.target.value };
                                                            setValues(newVals);
                                                        }}
                                                    />
                                                    <textarea
                                                        className={`w-full text-sm text-slate-500 bg-transparent outline-none h-32 resize-none ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                        value={v.content[editLang]}
                                                        onChange={(e) => {
                                                            const newVals = [...values];
                                                            newVals[i].content = { ...newVals[i].content, [editLang]: e.target.value };
                                                            setValues(newVals);
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            )}

                            {/* --- CAREERS --- */}
                            {activeSection === 'careers' && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between border-b pb-4">
                                        <h3 className="text-lg font-bold text-slate-900">Job Listings</h3>
                                        <button onClick={addJob} className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors">
                                            Post New Position
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        {jobs.map((job, i) => (
                                            <div key={job.id} className="p-4 border border-slate-200 rounded-xl flex items-center justify-between hover:bg-slate-50 transition-colors">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">{i + 1}</div>
                                                    <div>
                                                        <input
                                                            className={`text-base font-bold text-slate-900 bg-transparent outline-none w-80 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                            value={job.title[editLang]}
                                                            onChange={(e) => {
                                                                const newJobs = [...jobs];
                                                                newJobs[i].title = { ...newJobs[i].title, [editLang]: e.target.value };
                                                                setJobs(newJobs);
                                                            }}
                                                        />
                                                        <div className="flex gap-4 mt-1">
                                                            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                                                                <MapPin size={12} />
                                                                <input
                                                                    className={`bg-transparent outline-none w-24 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                                    value={job.loc[editLang]}
                                                                    onChange={(e) => {
                                                                        const newJobs = [...jobs];
                                                                        newJobs[i].loc = { ...newJobs[i].loc, [editLang]: e.target.value };
                                                                        setJobs(newJobs);
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                                                                <Briefcase size={12} />
                                                                <input
                                                                    className={`bg-transparent outline-none w-24 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                                    value={job.type[editLang]}
                                                                    onChange={(e) => {
                                                                        const newJobs = [...jobs];
                                                                        newJobs[i].type = { ...newJobs[i].type, [editLang]: e.target.value };
                                                                        setJobs(newJobs);
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                                                                <Calendar size={12} />
                                                                <input
                                                                    className={`bg-transparent outline-none w-24 ${editLang === 'kh' ? 'font-siemreap' : ''}`}
                                                                    value={job.date[editLang]}
                                                                    onChange={(e) => {
                                                                        const newJobs = [...jobs];
                                                                        newJobs[i].date = { ...newJobs[i].date, [editLang]: e.target.value };
                                                                        setJobs(newJobs);
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button onClick={() => deleteJob(job.id)} className="p-2 text-slate-300 hover:text-red-500">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* --- CONTACT --- */}
                            {activeSection === 'contact' && (
                                <div className="space-y-10">
                                    <section className="space-y-4">
                                        <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Location & Schedule</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Office Address ({editLang.toUpperCase()})</label>
                                                    <textarea
                                                        rows={3}
                                                        className={`w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none ${editLang === 'kh' ? 'font-siemreap' : 'font-medium'}`}
                                                        value={contact.address[editLang]}
                                                        onChange={(e) => setContact({ ...contact, address: { ...contact.address, [editLang]: e.target.value } })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Working Hours ({editLang.toUpperCase()})</label>
                                                    <input
                                                        className={`w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all ${editLang === 'kh' ? 'font-siemreap' : 'font-medium'}`}
                                                        value={contact.hours[editLang]}
                                                        onChange={(e) => setContact({ ...contact, hours: { ...contact.hours, [editLang]: e.target.value } })}
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Google Maps URL</label>
                                                    <input
                                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-mono text-xs"
                                                        value={contact.googleMapsUrl}
                                                        onChange={(e) => setContact({ ...contact, googleMapsUrl: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="space-y-4">
                                        <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Communication</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone Numbers (comma separated)</label>
                                                <input
                                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium"
                                                    value={contact.phone}
                                                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Addresses (comma separated)</label>
                                                <input
                                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium"
                                                    value={contact.email}
                                                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </section>

                                    <section className="space-y-4">
                                        <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Social Presence</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Facebook</label>
                                                <input
                                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-xs"
                                                    value={contact.socials.facebook}
                                                    onChange={(e) => setContact({ ...contact, socials: { ...contact.socials, facebook: e.target.value } })}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">LinkedIn</label>
                                                <input
                                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-xs"
                                                    value={contact.socials.linkedin}
                                                    onChange={(e) => setContact({ ...contact, socials: { ...contact.socials, linkedin: e.target.value } })}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Instagram</label>
                                                <input
                                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-xs"
                                                    value={contact.socials.instagram}
                                                    onChange={(e) => setContact({ ...contact, socials: { ...contact.socials, instagram: e.target.value } })}
                                                />
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Service Detail Modal Editor */}
            <AnimatePresence>
                {editingServiceId && detailsMap[editingServiceId] && (
                    <ServiceDetailEditor
                        detail={detailsMap[editingServiceId]}
                        editLang={editLang}
                        onClose={closeServiceDetails}
                        onSave={(updated) => {
                            updateServiceDetail(updated);
                            closeServiceDetails();
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

export default function SiteContentPage() {
    return (
        <Suspense fallback={<div className="p-12 text-center text-slate-400 font-medium">Loading Editor...</div>}>
            <AdminContentEditor />
        </Suspense>
    );
}
