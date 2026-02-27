'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, MapPin, Building, Activity, Tag, HelpCircle, ArrowRight, Share2, Maximize, User, Calendar, CheckCircle2, AlertTriangle, Shield } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage, getLocalizedText } from '../../context/LanguageContext';
import { projects } from '../../data/projectData';
import { projectDetails } from '../../data/projectDetailData';

export default function ProjectDetailPage() {
    const { t, language } = useLanguage();
    const params = useParams();
    // Safely handle params.id whether it is a string or array
    const idParam = params?.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;

    // Use fallback if id is undefined or not found in data
    const project = (id && projectDetails[id]) ? projectDetails[id] : projectDetails['moi'];

    // Determine back link based on status
    const backLink = getLocalizedText(project.status, language) === 'Completed' || project.status.en === 'Completed'
        ? '/design-z/projects/completed'
        : '/design-z/projects/implementation';

    const backLabel = getLocalizedText(project.status, language) === 'Completed' || project.status.en === 'Completed'
        ? t('Back to Done Projects')
        : t('Back to Implementation');

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const auth = localStorage.getItem('kimmex_admin_auth');
        if (auth === 'true') setIsAdmin(true);
    }, []);

    return (
        <div className="bg-white min-h-screen text-titan-navy relative">
            {/* --- ADMIN QUICK EDIT --- */}
            {isAdmin && (
                <div className="fixed bottom-8 right-8 z-[100]">
                    <Link
                        href={`/admin/projects/${id}`}
                        className="flex items-center gap-3 bg-titan-navy text-white px-6 py-4 rounded-full shadow-2xl hover:bg-titan-red transition-all group scale-100 hover:scale-105 active:scale-95"
                    >
                        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                            <Shield size={16} className="text-titan-red group-hover:text-white" />
                        </div>
                        <span className="font-black text-sm uppercase tracking-widest">Edit Project</span>
                    </Link>
                </div>
            )}
            {/* --- HERO SECTION --- */}
            <section className="relative h-[70vh] bg-titan-navy flex items-end">
                <div className="absolute inset-0">
                    <Image src={project.image} alt={getLocalizedText(project.title, language)} fill className="object-cover opacity-70" />
                    <div className="absolute inset-0 bg-gradient-to-t from-titan-navy via-titan-navy/20 to-transparent"></div>
                </div>

                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 pb-20">
                    <Link href={backLink} className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs mb-8">
                        <ArrowLeft size={14} /> {backLabel}
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="bg-titan-red text-white px-4 py-1 rounded-sm text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                            {getLocalizedText(project.sector, language)}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight leading-none">
                            {getLocalizedText(project.title, language)}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/80 font-light flex items-center gap-3">
                            <MapPin size={20} className="text-titan-red" /> {getLocalizedText(project.subtitle, language)}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* --- MAIN CONTENT SPLIT --- */}
            <section className="py-24 px-6 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* LEFT: CONTENT */}
                    <div className="lg:col-span-8">
                        {/* Description */}
                        <div className="mb-16">
                            <h2 className="text-2xl font-black text-titan-navy mb-8 flex items-center gap-3">
                                <HelpCircle className="text-titan-red" /> {t('Project Overview')}
                            </h2>
                            <div className="space-y-8 text-lg text-titan-navy-subtle leading-relaxed">
                                <div>
                                    <h3 className="text-titan-navy font-bold text-sm uppercase tracking-widest mb-2">{t('The Background')}</h3>
                                    <p>{getLocalizedText(project.description.background, language)}</p>
                                </div>
                                <div>
                                    <h3 className="text-titan-navy font-bold text-sm uppercase tracking-widest mb-2">{t('Objectives')}</h3>
                                    <p>{getLocalizedText(project.description.objectives, language)}</p>
                                </div>
                                <div>
                                    <h3 className="text-titan-navy font-bold text-sm uppercase tracking-widest mb-2">{t('Design Concept')}</h3>
                                    <p>{getLocalizedText(project.description.concept, language)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Scope */}
                        <div className="mb-16 bg-titan-bg-alt p-10 rounded-xl border border-titan-navy-light/10">
                            <h2 className="text-2xl font-black text-titan-navy mb-8 flex items-center gap-3">
                                <Activity className="text-titan-red" /> {t('Scope of Work')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {project.services.map((s: any, i: number) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-transparent hover:border-titan-red/20 transition-all">
                                        <CheckCircle2 size={20} className="text-titan-red" />
                                        <span className="font-bold text-titan-navy">{getLocalizedText(s, language)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Challenges */}
                        <div>
                            <h2 className="text-2xl font-black text-titan-navy mb-8 flex items-center gap-3">
                                <AlertTriangle className="text-titan-red" /> {t('Key Challenges & Solutions')}
                            </h2>
                            <ul className="space-y-6">
                                {project.challenges.map((c: any, i: number) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-titan-navy/5 flex items-center justify-center shrink-0 font-bold text-titan-navy text-sm">{i + 1}</div>
                                        <p className="text-titan-navy-subtle leading-relaxed pt-1">{getLocalizedText(c, language)}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* RIGHT: KEY FACTS SIDEBAR */}
                    <div className="lg:col-span-4">
                        <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-100 sticky top-32">
                            <h3 className="text-xl font-black text-titan-navy mb-8 pb-4 border-b border-gray-100">{t('Project Data')}</h3>

                            <div className="space-y-6">
                                <div className="group">
                                    <span className="block text-xs font-bold text-titan-navy-subtle uppercase tracking-widest mb-1 group-hover:text-titan-red transition-colors">{t('Client')}</span>
                                    <div className="flex items-center gap-3 font-bold text-titan-navy text-lg">
                                        <User size={20} className="text-gray-300 group-hover:text-titan-red transition-colors" />
                                        {getLocalizedText(project.client, language)}
                                    </div>
                                </div>

                                <div className="group">
                                    <span className="block text-xs font-bold text-titan-navy-subtle uppercase tracking-widest mb-1 group-hover:text-titan-red transition-colors">{t('Location')}</span>
                                    <div className="flex items-center gap-3 font-bold text-titan-navy text-lg">
                                        <MapPin size={20} className="text-gray-300 group-hover:text-titan-red transition-colors" />
                                        {getLocalizedText(project.location, language)}
                                    </div>
                                </div>

                                <div className="group">
                                    <span className="block text-xs font-bold text-titan-navy-subtle uppercase tracking-widest mb-1 group-hover:text-titan-red transition-colors">{t('Built Area')}</span>
                                    <div className="flex items-center gap-3 font-bold text-titan-navy text-lg">
                                        <Maximize size={20} className="text-gray-300 group-hover:text-titan-red transition-colors" />
                                        {project.area}
                                    </div>
                                </div>

                                <div className="group">
                                    <span className="block text-xs font-bold text-titan-navy-subtle uppercase tracking-widest mb-1 group-hover:text-titan-red transition-colors">{t('Year & Status')}</span>
                                    <div className="flex items-center gap-3 font-bold text-titan-navy text-lg">
                                        <Calendar size={20} className="text-gray-300 group-hover:text-titan-red transition-colors" />
                                        {project.year} <span className={`text-xs px-2 py-1 rounded text-white ${getLocalizedText(project.status, language) === 'Completed' || project.status.en === 'Completed' ? 'bg-green-600' : 'bg-orange-500'}`}>{getLocalizedText(project.status, language)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-gray-100">
                                <button className="w-full bg-titan-navy text-white font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-titan-red transition-colors shadow-lg flex items-center justify-center gap-2">
                                    <Share2 size={18} /> {t('Share Project')}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* --- GALLERY SECTION --- */}
            <section className="bg-titan-navy py-24 px-6 text-white">
                <div className="max-w-[1400px] mx-auto">
                    <h2 className="text-3xl font-black mb-12 border-l-4 border-titan-red pl-6">{t('Project Gallery')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                        {project.gallery.map((img: string, i: number) => {
                            // Fancy layout logic
                            let gridClass = "md:col-span-2 aspect-[4/3]";
                            if (project.gallery.length === 1) {
                                gridClass = "md:col-span-6 aspect-video";
                            } else if (project.gallery.length === 2) {
                                gridClass = "md:col-span-3 aspect-[4/3]";
                            } else if (project.gallery.length >= 3) {
                                if (i === 0) gridClass = "md:col-span-4 md:row-span-2 aspect-square md:aspect-auto";
                                else gridClass = "md:col-span-2 aspect-[4/3]";
                            }

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className={`rounded-lg overflow-hidden group cursor-pointer relative ${gridClass}`}
                                >
                                    <Image src={img} alt={`Gallery ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="bg-white/20 backdrop-blur-md p-4 rounded-full">
                                            <Maximize size={24} className="text-white" />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* --- RELATED PROJECTS --- */}
            <section className="py-24 px-6 max-w-[1400px] mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-3xl font-black text-titan-navy">{t('Similar Projects')}</h2>
                    <Link href={backLink} className="font-bold text-titan-red hover:underline flex items-center gap-2 text-sm uppercase tracking-widest">
                        {t('View All')} <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects
                        .filter(p => p.id !== id)
                        .slice(0, 3)
                        .map((p, idx) => (
                            <Link href={`/design-z/projects/${p.id}`} key={idx} className="block group">
                                <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 relative">
                                    <Image src={p.image} alt={getLocalizedText(p.title, language)} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-4 left-4 bg-titan-navy text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">{getLocalizedText(p.type, language)}</div>
                                </div>
                                <h3 className="text-xl font-bold text-titan-navy group-hover:text-titan-red transition-colors line-clamp-1">{getLocalizedText(p.title, language)}</h3>
                            </Link>
                        ))}
                </div>
            </section>
        </div>
    );
}
