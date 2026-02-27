'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, Award } from 'lucide-react';

import { teamMembers } from '@/app/design-z/data/teamData';
import { useLanguage, getLocalizedText } from '@/app/design-z/context/LanguageContext';

function slugify(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export default function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { t, language } = useLanguage();

    const member = teamMembers.find(m => slugify(m.name) === slug);

    if (!member) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-titan-navy mb-4">{language === 'kh' ? 'រកមិនឃើញសមាជិក' : 'Member Not Found'}</h1>
                    <Link href="/design-z/about" className="text-titan-red font-bold hover:underline">
                        {language === 'kh' ? 'ត្រឡប់ទៅ អំពីយើង' : 'Return to About Us'}
                    </Link>
                </div>
            </div>
        );
    }

    const focusAreas = [t('Strategic Planning'), t('Operational Excellence'), t('Team Development'), t('Sustainability')];

    return (
        <div className="bg-white min-h-screen text-titan-navy">
            {/* === PROFESSIONAL HERO SECTION === */}
            <div className="relative bg-titan-navy min-h-[500px] flex flex-col justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-titan-red/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

                <div className="max-w-7xl mx-auto px-6 w-full relative z-10 py-24 pb-48">
                    <Link
                        href="/design-z/about#leadership"
                        className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-titan-red hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md mb-12 mt-12 group"
                    >
                        <div className="w-8 h-8 rounded-lg bg-titan-red/10 flex items-center justify-center text-titan-red group-hover:bg-titan-red group-hover:text-white transition-all">
                            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t('Back to Org Chart')}</span>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <div className="flex flex-wrap gap-4 items-center mb-6">
                            <span className="px-4 py-1.5 rounded-full border border-white/20 text-white/60 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                                {getLocalizedText(member.specialization, language)}
                            </span>
                            <span className="px-4 py-1.5 rounded-full bg-titan-red text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-titan-red/20">
                                {getLocalizedText(member.location, language)}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
                            {member.name.split(' ').map((word, i) => (
                                <span key={i} className="block">{word}</span>
                            ))}
                        </h1>

                        <div className="flex items-center gap-6">
                            <div className="h-[2px] w-20 bg-titan-red"></div>
                            <p className="text-xl md:text-2xl text-white/70 font-bold uppercase tracking-widest">
                                {getLocalizedText(member.role, language)}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* === MAIN CONTENT === */}
            <main className="max-w-7xl mx-auto px-6 pb-24 relative z-20 -mt-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Image Card */}
                    <div className="lg:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="bg-white p-0 rounded-none border-b-8 border-titan-red shadow-2xl overflow-hidden">
                                <div className="aspect-[3/4] relative">
                                    <Image
                                        src={member.image || '/images/projects/Thumbnail-5.jpg'}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Stats Cards */}
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow">
                                    <div className="text-3xl font-black text-titan-navy mb-1">{member.experience.split('+')[0]}+</div>
                                    <div className="text-xs uppercase tracking-widest text-titan-navy/40 font-bold">{t('Years Exp.')}</div>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow">
                                    <div className="text-3xl font-black text-titan-navy mb-1">100%</div>
                                    <div className="text-xs uppercase tracking-widest text-titan-navy/40 font-bold">{t('Success')}</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Bio Content */}
                    <div className="lg:col-span-8 lg:pt-40">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="prose prose-lg prose-slate max-w-none"
                        >
                            <h3 className="text-titan-navy font-bold text-2xl mb-6 flex items-center gap-3">
                                <span className="w-2 h-8 bg-titan-red rounded-full"></span>
                                {t('Biography')}
                            </h3>
                            <p className="text-xl text-titan-navy/70 leading-relaxed font-light mb-12">
                                {getLocalizedText(member.bio, language)}
                            </p>

                            <div className="grid md:grid-cols-2 gap-8 mb-16">
                                <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-titan-red">
                                    <h4 className="text-titan-navy font-black text-lg uppercase tracking-widest mb-4">{t('Focus Areas')}</h4>
                                    <ul className="space-y-4">
                                        {focusAreas.map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-titan-navy/70">
                                                <div className="w-1.5 h-1.5 bg-titan-red rounded-full"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-titan-navy p-8 rounded-2xl text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-titan-red/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                    <h4 className="text-white font-black text-lg uppercase tracking-widest mb-4 relative z-10">{t('Credentials')}</h4>
                                    <ul className="space-y-4 relative z-10">
                                        <li className="flex items-center gap-3 text-white/70">
                                            <Award size={18} className="text-titan-red" />
                                            {language === 'kh' ? 'អនុបណ្ឌិតវិស្វកម្ម' : 'Master of Engineering'}
                                        </li>
                                        <li className="flex items-center gap-3 text-white/70">
                                            <Award size={18} className="text-titan-red" />
                                            {language === 'kh' ? 'វិញ្ញាបនបត្រ PMP' : 'PMP Certified'}
                                        </li>
                                        <li className="flex items-center gap-3 text-white/70">
                                            <Award size={18} className="text-titan-red" />
                                            {language === 'kh' ? 'អនុបណ្ឌិតគ្រប់គ្រង' : 'MBA - Management'}
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-12">
                                <h3 className="text-titan-navy font-bold text-2xl mb-8">{t('Professional Journey')}</h3>
                                <p className="text-titan-navy/60 leading-relaxed mb-6">
                                    {language === 'kh'
                                        ? `ជាមួយអាជីពដែលមានរយៈពេលជាង ${member.experience} ${member.name} បានរួមចំណែកយ៉ាងសំខាន់ក្នុងការអភិវឌ្ឍហេដ្ឋារចនាសម្ព័ន្ធធំៗនៅកម្ពុជា។`
                                        : `With a career spanning over ${member.experience}, ${member.name} has been at the forefront of major infrastructure developments in Cambodia. His approach combines traditional engineering discipline with modern management practices.`
                                    }
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
