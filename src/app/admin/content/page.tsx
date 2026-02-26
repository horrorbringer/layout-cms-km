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
    Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { aboutData } from '@/app/design-z/data/aboutData';
import { serviceData } from '@/app/design-z/data/serviceData';
import { serviceDetails, ServiceDetail as ServiceDetailType } from '@/app/design-z/data/serviceDetailData';
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
        title: "Building Excellence Since 1999",
        subtitle: "With over 25 years of experience, we have established ourselves as Cambodia's most trusted partner."
    });

    const [stats, setStats] = useState([
        { label: 'Safety First', val: 'Zero accidents', icon: ShieldCheck },
        { label: 'ISO Certified', val: '9001:2015', icon: Trophy },
        { label: 'On-Time', val: '98% Finished', icon: Clock },
        { label: 'Quality', val: 'High Focus', icon: Target }
    ]);

    const [processSteps, setProcessSteps] = useState<ProcessStep[]>([
        { id: '1', step: '01', title: 'Consultation', desc: 'Understanding your vision' },
        { id: '2', step: '02', title: 'Planning', desc: 'Detailed blueprints' },
        { id: '3', step: '03', title: 'Construction', desc: 'Expert execution' },
        { id: '4', step: '04', title: 'Handover', desc: 'Quality inspection' },
    ]);

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

    const [jobs, setJobs] = useState<Job[]>([
        { id: 'j1', title: 'Senior Site Engineer', loc: 'Phnom Penh', type: 'Full-time', date: 'Feb 2026' },
        { id: 'j2', title: 'Project Manager', loc: 'Sihanoukville', type: 'Full-time', date: 'Jan 2026' },
        { id: 'j3', title: 'Safety Officer', loc: 'Siem Reap', type: 'Contract', date: 'Feb 2026' }
    ]);

    const [testimonials, setTestimonials] = useState<Testimonial[]>([
        { id: 't1', author: 'H.E. Minister of Economy', quote: "Kimmex delivered our project on time and exceeded our quality expectations.", role: 'Government' },
        { id: 't2', author: 'Mr. Chen Wei', quote: "Working with Kimmex was a seamless experience. They understood our vision.", role: 'Vattanac Group' }
    ]);

    const [contact, setContact] = useState({
        address: "#123, Russian Blvd, Phnom Penh, Cambodia",
        phone: "+855 23 999 999",
        email: "info@kimmex.com",
        socials: [
            { label: 'Facebook', val: 'facebook.com/kimmex' },
            { label: 'LinkedIn', val: 'linkedin.com/kimmex' },
            { label: 'Instagram', val: 'instagram.com/kimmex' },
        ]
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
                                                        <stat.icon size={16} />
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
                                <div className="space-y-8">
                                    <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Contact Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Office Address</label>
                                                <textarea
                                                    rows={3}
                                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium resize-none"
                                                    value={contact.address}
                                                    onChange={(e) => setContact({ ...contact, address: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</label>
                                                    <input
                                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium"
                                                        value={contact.phone}
                                                        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</label>
                                                    <input
                                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium"
                                                        value={contact.email}
                                                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 h-fit">
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Social Links</h4>
                                            <div className="space-y-4">
                                                {contact.socials.map((s, i) => (
                                                    <div key={i} className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-slate-500">{s.label}</label>
                                                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-slate-200 rounded-lg">
                                                            <input
                                                                className="w-full text-xs font-medium text-slate-900 outline-none"
                                                                value={s.val}
                                                                onChange={(e) => {
                                                                    const newSocials = [...contact.socials];
                                                                    newSocials[i].val = e.target.value;
                                                                    setContact({ ...contact, socials: newSocials });
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
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
