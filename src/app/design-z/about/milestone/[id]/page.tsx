'use client';

import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import { milestones } from '../../../data/milestonesData';
import { ArrowLeft, Target, Calendar, CheckCircle2 } from 'lucide-react';
import { useLanguage, getLocalizedText } from '../../../context/LanguageContext';

export default function MilestoneDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { t, language } = useLanguage();
    // Use React.use() to resolve params in a Client Component (Next.js 15+)
    const resolvedParams = use(params);
    // Decoding the ID to match the format in the data (e.g., '1999', '2001-2004')
    const decodedId = decodeURIComponent(resolvedParams.id);
    const milestone = milestones.find(m => m.year === decodedId);

    if (!milestone) {
        notFound();
    }

    return (
        <div className="bg-white min-h-screen">
            {/* === HERO SECTION === */}
            <section className="relative h-[60vh] min-h-[500px] flex items-end">
                <div className="absolute inset-0">
                    <Image
                        src={milestone.image}
                        alt={getLocalizedText(milestone.title, language)}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-titan-navy via-titan-navy/50 to-transparent"></div>
                </div>

                {/* Back Button - Top Left */}
                <div className="absolute top-35 left-12 md:left-68 z-20">
                    <Link
                        href="/design-z/about"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group bg-titan-navy/20 hover:bg-titan-navy/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
                    >
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-titan-red transition-all">
                            <ArrowLeft size={14} />
                        </div>
                        <span className="font-bold uppercase tracking-widest text-xs">Back to About</span>
                    </Link>
                </div>

                {/* Hero Content - Bottom */}
                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 pb-20">
                    <div className="inline-flex items-center gap-2 bg-titan-red text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6 shadow-lg">
                        <Calendar size={14} />
                        {milestone.year}
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-6 drop-shadow-lg">
                        {getLocalizedText(milestone.title, language)}
                    </h1>

                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed font-light drop-shadow-md">
                        {getLocalizedText(milestone.desc, language)}
                    </p>
                </div>
            </section>

            {/* === CONTENT SECTION === */}
            <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
                {milestone.projects && milestone.projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                        {/* Major Projects List */}
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-12 bg-titan-red/10 rounded-xl flex items-center justify-center text-titan-red">
                                    <Target size={24} />
                                </div>
                                <h2 className="text-3xl font-black text-titan-navy uppercase tracking-tight">
                                    {t('Project Portfolio')}
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {milestone.projects.map((project, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-titan-red/30 hover:bg-white hover:shadow-lg transition-all duration-300 flex items-start gap-4"
                                    >
                                        <div className="mt-1 w-6 h-6 rounded-full bg-titan-red/10 flex items-center justify-center text-titan-red shrink-0 group-hover:bg-titan-red group-hover:text-white transition-colors">
                                            <CheckCircle2 size={14} />
                                        </div>
                                        <span className="text-lg font-bold text-titan-navy group-hover:text-titan-red transition-colors">
                                            {getLocalizedText(project, language)}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar / Stats or Additional Info */}
                        <div className="md:col-span-1">
                            <div className="bg-titan-navy text-white p-8 rounded-3xl sticky top-8">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <div className="w-1.5 h-6 bg-titan-red"></div>
                                    {t('Milestone Highlights')}
                                </h3>

                                <div className="space-y-6">
                                    <div className="pb-6 border-b border-white/10">
                                        <div className="text-white/40 text-sm font-bold uppercase tracking-wider mb-1">{t('Year')}</div>
                                        <div className="text-2xl font-black">{milestone.year}</div>
                                    </div>
                                    <div className="pb-6 border-b border-white/10">
                                        <div className="text-white/40 text-sm font-bold uppercase tracking-wider mb-1">{t('Projects Completed')}</div>
                                        <div className="text-2xl font-black">{milestone.projects.length}+</div>
                                    </div>
                                    <div>
                                        <div className="text-titan-red font-bold uppercase tracking-widest text-xs mb-4">{t('Impact')}</div>
                                        <p className="text-white/70 leading-relaxed text-sm">
                                            {t('Milestone Impact Desc')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 text-gray-400 mb-4">
                            <Target size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-titan-navy mb-2">{t('Projects details recorded in archive')}</h3>
                        <p className="text-titan-navy/50">{t('Milestone Archive Desc')}</p>
                    </div>
                )}
            </section>
        </div>
    );
}
