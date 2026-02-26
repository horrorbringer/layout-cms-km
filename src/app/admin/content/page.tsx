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

// --- TYPES ---
interface ProcessStep {
    id: string;
    step: string;
    title: string;
    desc: string;
}

interface ValueItem {
    id: string;
    title: string;
    content: string;
}

interface Job {
    id: string;
    title: string;
    loc: string;
    type: string;
    date: string;
}

interface Testimonial {
    id: string;
    author: string;
    quote: string;
    role: string;
}

interface ServiceFeatureItem {
    en: string;
    kh: string;
}

interface ServiceItem {
    id: string;
    title: string;
    desc: string;
    image: string;
    features: ServiceFeatureItem[];
}

interface ProcessItem {
    id: string;
    step: string;
    title: string;
    desc: string;
}

interface SectorItem {
    id: string;
    title: string;
    image: string;
}

interface ServiceDetail extends ServiceDetailType { }

function AdminContentEditor() {
    const searchParams = useSearchParams();
    const sectionParam = searchParams.get('section') || 'home';
    const [activeSection, setActiveSection] = useState(sectionParam);
    const [isSaving, setIsSaving] = useState(false);

    // --- STATE FOR CONTENT ---
    const [homeHero, setHomeHero] = useState({
        title: typeof homeData.hero.title === 'string' ? homeData.hero.title : (homeData.hero.title.en || ''),
        subtitle: typeof homeData.hero.subtitle === 'string' ? homeData.hero.subtitle : (homeData.hero.subtitle.en || '')
    });

    const [stats, setStats] = useState(() =>
        homeData.stats.map(s => ({
            label: typeof s.label === 'string' ? s.label : (s.label.en || ''),
            val: typeof s.val === 'string' ? s.val : (s.val.en || ''),
            iconName: s.iconName
        }))
    );

    const [processSteps, setProcessSteps] = useState<ProcessStep[]>(() =>
        homeData.process.map(p => ({
            id: p.id,
            step: p.step,
            title: typeof p.title === 'string' ? p.title : (p.title.en || ''),
            desc: typeof p.desc === 'string' ? p.desc : (p.desc.en || '')
        }))
    );

    const [aboutStory, setAboutStory] = useState(() => {
        const story = aboutData.story;
        if (typeof story === 'string') return story;
        return story.en || '';
    });

    const [values, setValues] = useState<ValueItem[]>(() => {
        return aboutData.values.map(v => ({
            id: v.id,
            title: typeof v.title === 'string' ? v.title : (v.title.en || ''),
            content: typeof v.content === 'string' ? v.content : (v.content.en || '')
        }));
    });

    const [services, setServices] = useState<ServiceItem[]>(() =>
        serviceData.services.map(s => ({
            id: s.id,
            title: typeof s.title === 'string' ? s.title : (s.title.en || ''),
            desc: typeof s.desc === 'string' ? s.desc : (s.desc.en || ''),
            image: s.image,
            features: s.features.map((f: any) => ({ en: f.en || f, kh: f.kh || f.en || f }))
        }))
    );

    const [processStepsService, setProcessStepsService] = useState<ProcessItem[]>(() =>
        serviceData.process.map(p => ({
            id: p.id,
            step: p.step,
            title: typeof p.title === 'string' ? p.title : (p.title.en || ''),
            desc: typeof p.desc === 'string' ? p.desc : (p.desc.en || '')
        }))
    );

    const [sectors, setSectors] = useState<SectorItem[]>(() =>
        serviceData.sectors.map(s => ({
            id: s.id,
            title: typeof s.title === 'string' ? s.title : (s.title.en || ''),
            image: s.image
        }))
    );

    const [detailsMap, setDetailsMap] = useState<Record<string, ServiceDetail>>(serviceDetails);
    const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

    const [jobs, setJobs] = useState<Job[]>(() =>
        jobData.map(j => ({
            id: j.id,
            title: typeof j.title === 'string' ? j.title : (j.title.en || ''),
            loc: j.loc,
            type: j.type,
            date: typeof j.postedDate === 'string' ? j.postedDate : (j.postedDate.en || '')
        }))
    );

    const [testimonials, setTestimonials] = useState<Testimonial[]>(() =>
        homeData.testimonials.map(t => ({
            id: t.id,
            author: typeof t.author === 'string' ? t.author : (t.author.en || ''),
            quote: typeof t.quote === 'string' ? t.quote : (t.quote.en || ''),
            role: typeof t.role === 'string' ? t.role : (t.role.en || '')
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
                    story: {
                        en: aboutStory,
                        kh: (typeof aboutData.story !== 'string' ? aboutData.story.kh : aboutStory) || aboutStory
                    },
                    values: values.map(v => {
                        const originalValue = aboutData.values.find(ov => ov.id === v.id);
                        return {
                            id: v.id,
                            title: {
                                en: v.title,
                                kh: (originalValue && typeof originalValue.title !== 'string' ? originalValue.title.kh : v.title) || v.title
                            },
                            content: {
                                en: v.content,
                                kh: (originalValue && typeof originalValue.content !== 'string' ? originalValue.content.kh : v.content) || v.content
                            }
                        };
                    })
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
                    services: services.map(s => {
                        const orig = serviceData.services.find(o => o.id === s.id);
                        return {
                            id: s.id,
                            title: { en: s.title, kh: (orig && typeof orig.title !== 'string' ? orig.title.kh : s.title) || s.title },
                            desc: { en: s.desc, kh: (orig && typeof orig.desc !== 'string' ? orig.desc.kh : s.desc) || s.desc },
                            image: s.image,
                            features: s.features
                        };
                    }),
                    process: processStepsService.map(p => {
                        const orig = serviceData.process.find(o => o.id === p.id);
                        return {
                            id: p.id,
                            step: p.step,
                            title: { en: p.title, kh: (orig && typeof orig.title !== 'string' ? orig.title.kh : p.title) || p.title },
                            desc: { en: p.desc, kh: (orig && typeof orig.desc !== 'string' ? orig.desc.kh : p.desc) || p.desc }
                        };
                    }),
                    sectors: sectors.map(s => {
                        const orig = serviceData.sectors.find(o => o.id === s.id);
                        return {
                            id: s.id,
                            title: { en: s.title, kh: (orig && typeof orig.title !== 'string' ? orig.title.kh : s.title) || s.title },
                            image: s.image
                        };
                    })
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
                    hero: {
                        title: { en: homeHero.title, kh: (typeof homeData.hero.title !== 'string' ? homeData.hero.title.kh : homeHero.title) || homeHero.title },
                        subtitle: { en: homeHero.subtitle, kh: (typeof homeData.hero.subtitle !== 'string' ? homeData.hero.subtitle.kh : homeHero.subtitle) || homeHero.subtitle }
                    },
                    stats: stats.map((s, i) => {
                        const orig = homeData.stats[i];
                        return {
                            label: { en: s.label, kh: (orig && typeof orig.label !== 'string' ? orig.label.kh : s.label) || s.label },
                            val: { en: s.val, kh: (orig && typeof orig.val !== 'string' ? orig.val.kh : s.val) || s.val },
                            iconName: s.iconName
                        };
                    }),
                    process: processSteps.map((p, i) => {
                        const orig = homeData.process[i];
                        return {
                            id: p.id,
                            step: p.step,
                            title: { en: p.title, kh: (orig && typeof orig.title !== 'string' ? orig.title.kh : p.title) || p.title },
                            desc: { en: p.desc, kh: (orig && typeof orig.desc !== 'string' ? orig.desc.kh : p.desc) || p.desc },
                            iconName: (orig && (orig as any).iconName) || 'Circle'
                        };
                    }),
                    testimonials: testimonials.map((t, i) => {
                        const orig = homeData.testimonials.find(ot => ot.id === t.id);
                        return {
                            id: t.id,
                            quote: { en: t.quote, kh: (orig && typeof orig.quote !== 'string' ? orig.quote.kh : t.quote) || t.quote },
                            author: { en: t.author, kh: (orig && typeof orig.author !== 'string' ? orig.author.kh : t.author) || t.author },
                            role: { en: t.role, kh: (orig && typeof orig.role !== 'string' ? orig.role.kh : t.role) || t.role },
                            rating: (orig && orig.rating) || 5
                        };
                    })
                };

                const response = await fetch('/api/cms/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileName: 'homeData.ts', data: updatedHomeData })
                });

                if (!response.ok) throw new Error('Failed to save home content');
            }

            if (activeSection === 'careers') {
                const updatedJobData = jobs.map((j) => {
                    const orig = jobData.find(oj => oj.id === j.id);
                    return {
                        id: j.id,
                        title: { en: j.title, kh: (orig && typeof orig.title !== 'string' ? orig.title.kh : j.title) || j.title },
                        dept: (orig && orig.dept) || 'General',
                        loc: j.loc,
                        type: j.type,
                        tags: (orig && orig.tags) || [{ en: 'Career', kh: 'អាជីព' }],
                        salary: (orig && orig.salary) || '$1,000 - $2,000',
                        experience: (orig && orig.experience) || '2+ Years',
                        postedDate: { en: j.date, kh: (orig && typeof orig.postedDate !== 'string' ? orig.postedDate.kh : j.date) || j.date }
                    };
                });

                const response = await fetch('/api/cms/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileName: 'jobData.ts', data: updatedJobData })
                });

                if (!response.ok) throw new Error('Failed to save job content');
            }

            if (activeSection === 'contact') {
                const updatedContactData = {
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
            title: 'New Process Step',
            desc: 'Step description'
        }]);
    };

    const deleteProcessStep = (id: string) => {
        setProcessSteps(processSteps.filter(s => s.id !== id));
    };

    const addValue = () => {
        setValues([...values, { id: Date.now().toString(), title: 'New Value', content: 'Value content' }]);
    };

    const deleteValue = (id: string) => {
        setValues(values.filter(v => v.id !== id));
    };

    const addJob = () => {
        setJobs([...jobs, { id: Date.now().toString(), title: 'Open Position', loc: 'Phnom Penh', type: 'Full-time', date: 'Feb 2026' }]);
    };

    const deleteJob = (id: string) => {
        setJobs(jobs.filter(j => j.id !== id));
    };

    const addTestimonial = () => {
        setTestimonials([...testimonials, { id: Date.now().toString(), author: 'Client Name', quote: 'Experience shared here...', role: 'Organization' }]);
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
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Section:</span>
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{activeSection}</span>
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
                                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Main Headline</label>
                                                <input
                                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium"
                                                    value={homeHero.title}
                                                    onChange={(e) => setHomeHero({ ...homeHero, title: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Hero Description</label>
                                                <textarea
                                                    rows={3}
                                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium resize-none"
                                                    value={homeHero.subtitle}
                                                    onChange={(e) => setHomeHero({ ...homeHero, subtitle: e.target.value })}
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
                                                            className="w-full bg-transparent text-sm font-bold text-slate-900 outline-none border-b border-transparent focus:border-slate-300"
                                                            value={stat.label}
                                                            onChange={(e) => {
                                                                const newStats = [...stats];
                                                                newStats[i].label = e.target.value;
                                                                setStats(newStats);
                                                            }}
                                                        />
                                                        <input
                                                            className="w-full bg-transparent text-xs text-slate-500 outline-none border-b border-transparent focus:border-slate-300"
                                                            value={stat.val}
                                                            onChange={(e) => {
                                                                const newStats = [...stats];
                                                                newStats[i].val = e.target.value;
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
                                                                className="w-full text-sm font-bold text-slate-900 bg-transparent outline-none focus:bg-slate-50 rounded px-1"
                                                                value={p.title}
                                                                onChange={(e) => {
                                                                    const newSteps = [...processSteps];
                                                                    newSteps[i].title = e.target.value;
                                                                    setProcessSteps(newSteps);
                                                                }}
                                                            />
                                                            <input
                                                                className="w-full text-xs text-slate-500 bg-transparent outline-none focus:bg-slate-50 rounded px-1"
                                                                value={p.desc}
                                                                onChange={(e) => {
                                                                    const newSteps = [...processSteps];
                                                                    newSteps[i].desc = e.target.value;
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
                                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</label>
                                                            <input
                                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none"
                                                                value={svc.title}
                                                                onChange={(e) => {
                                                                    const updated = [...services]; updated[i].title = e.target.value; setServices(updated);
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
                                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</label>
                                                        <textarea
                                                            rows={3}
                                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none resize-none"
                                                            value={svc.desc}
                                                            onChange={(e) => {
                                                                const updated = [...services]; updated[i].desc = e.target.value; setServices(updated);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Features (comma-separated)</label>
                                                        <input
                                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none"
                                                            value={svc.features.map(f => f.en).join(', ')}
                                                            onChange={(e) => {
                                                                const updated = [...services];
                                                                updated[i].features = e.target.value.split(',').map(f => ({ en: f.trim(), kh: f.trim() }));
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
                                                                className="w-full text-sm font-bold text-slate-900 bg-transparent outline-none focus:bg-slate-50 rounded px-1"
                                                                value={p.title}
                                                                onChange={(e) => {
                                                                    const updated = [...processStepsService]; updated[i].title = e.target.value; setProcessStepsService(updated);
                                                                }}
                                                            />
                                                            <input
                                                                className="w-full text-xs text-slate-500 bg-transparent outline-none focus:bg-slate-50 rounded px-1"
                                                                value={p.desc}
                                                                onChange={(e) => {
                                                                    const updated = [...processStepsService]; updated[i].desc = e.target.value; setProcessStepsService(updated);
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
                                                            className="w-full text-sm font-bold text-slate-900 bg-transparent outline-none"
                                                            value={sec.title}
                                                            onChange={(e) => {
                                                                const updated = [...sectors]; updated[i].title = e.target.value; setSectors(updated);
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
                                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Corporate Narrative</label>
                                            <textarea
                                                rows={8}
                                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium leading-relaxed"
                                                value={aboutStory}
                                                onChange={(e) => setAboutStory(e.target.value)}
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
                                                        className="w-full text-base font-bold text-slate-900 bg-transparent outline-none mb-3"
                                                        value={v.title}
                                                        onChange={(e) => {
                                                            const newVals = [...values];
                                                            newVals[i].title = e.target.value;
                                                            setValues(newVals);
                                                        }}
                                                    />
                                                    <textarea
                                                        className="w-full text-sm text-slate-500 bg-transparent outline-none h-32 resize-none"
                                                        value={v.content}
                                                        onChange={(e) => {
                                                            const newVals = [...values];
                                                            newVals[i].content = e.target.value;
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
                                                            className="text-base font-bold text-slate-900 bg-transparent outline-none w-80"
                                                            value={job.title}
                                                            onChange={(e) => {
                                                                const newJobs = [...jobs];
                                                                newJobs[i].title = e.target.value;
                                                                setJobs(newJobs);
                                                            }}
                                                        />
                                                        <div className="flex gap-4 mt-1">
                                                            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                                                                <MapPin size={12} />
                                                                <input
                                                                    className="bg-transparent outline-none w-24"
                                                                    value={job.loc}
                                                                    onChange={(e) => {
                                                                        const newJobs = [...jobs];
                                                                        newJobs[i].loc = e.target.value;
                                                                        setJobs(newJobs);
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                                                                <Calendar size={12} />
                                                                <input
                                                                    className="bg-transparent outline-none w-24"
                                                                    value={job.date}
                                                                    onChange={(e) => {
                                                                        const newJobs = [...jobs];
                                                                        newJobs[i].date = e.target.value;
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
                                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Office Address (EN)</label>
                                                    <textarea
                                                        rows={3}
                                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium resize-none"
                                                        value={contact.address.en}
                                                        onChange={(e) => setContact({ ...contact, address: { ...contact.address, en: e.target.value } })}
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Office Address (KH)</label>
                                                    <textarea
                                                        rows={3}
                                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-siemreap resize-none"
                                                        value={contact.address.kh}
                                                        onChange={(e) => setContact({ ...contact, address: { ...contact.address, kh: e.target.value } })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Working Hours (EN)</label>
                                                    <input
                                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium"
                                                        value={contact.hours.en}
                                                        onChange={(e) => setContact({ ...contact, hours: { ...contact.hours, en: e.target.value } })}
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Working Hours (KH)</label>
                                                    <input
                                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-siemreap"
                                                        value={contact.hours.kh}
                                                        onChange={(e) => setContact({ ...contact, hours: { ...contact.hours, kh: e.target.value } })}
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
