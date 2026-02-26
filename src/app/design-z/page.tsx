'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Trophy, PenTool, Layout, Ruler, Users, Hammer, CheckCircle2, Phone, Clock, Award, Target, Quote, Star, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { FadeInWhenVisible } from './_components/Animations';
import UnifiedHero, { HeroMode } from './_components/UnifiedHero';
import { allNews } from './data/newsData';
import { projects as allProjects } from './data/projectData';
import { homeData } from './data/homeData';
import { useLanguage, getLocalizedText } from './context/LanguageContext';

// --- CONFIGURATION ---
// Change this to 'video' or 'carousel' to switch the hero style
export default function DesignGenX() {
    const { language, t } = useLanguage();
    const [heroMode, setHeroMode] = React.useState<HeroMode>('video');

    const services = [
        {
            title: t('Design & Build'),
            desc: { en: 'End-to-end solutions from concept to completion with integrated design and construction.', kh: 'ការផ្តល់ដំណោះស្រាយពេញលេញពីរចនាបថគំរូរហូតដល់ការសាងសង់បញ្ចប់ជាមួយគ្នាយ៉ាងល្អឥតខ្ចោះ។' },
            icon: PenTool,
            features: [
                { en: 'Conceptual Design', kh: 'រូបគំនូសព្រាងការរចនា' },
                { en: 'Structural Engineering', kh: 'ការគូសប្លង់គ្រឿងបង្គុំ' },
                { en: 'Interior Design', kh: 'ការរចនា និងតុបតែងផ្នែកខាងក្នុង' }
            ],
            stat: '50+'
        },
        {
            title: t('Infrastructure'),
            desc: { en: 'Building the backbone of communities with bridges, roads, and utilities.', kh: 'ការសាងសង់ហេដ្ឋារចនាសម្ព័ន្ធសហគមន៍ដូចជា ស្ពាន ផ្លូវថ្នល់ និង​ប្រព័ន្ធអាគារនានា។' },
            icon: Layout,
            features: [
                { en: 'Roads & Bridges', kh: 'ផ្លូវ និងស្ពាន' },
                { en: 'Water Treatment', kh: 'ប្រព័ន្ធចម្រោះទឹកស្អាត' },
                { en: 'Public Works', kh: 'ការដ្ឋានសាធារណការ' }
            ],
            stat: '30+'
        },
        {
            title: t('Project Management'),
            desc: { en: 'Rigorous oversight ensuring on-time, on-budget delivery for every client.', kh: 'ការត្រួតពិនិត្យយ៉ាងប្រុងប្រយ័ត្ន ដើម្បីធានាបាននូវការប្រគល់ជូនទាន់ពេលវេលា និងតាមថវិកាដែលបានគ្រោងទុក។' },
            icon: Users,
            features: [
                { en: 'Cost Control', kh: 'ការគ្រប់គ្រងតម្លៃ' },
                { en: 'Quality Assurance', kh: 'ការធានាគុណភាព' },
                { en: 'Safety Compliance', kh: 'ការអនុលោមតាមសុវត្ថិភាព' }
            ],
            stat: '100%'
        },
        {
            title: t('Renovation'),
            desc: { en: 'Revitalizing existing structures to meet modern standards and aesthetics.', kh: 'ការកែលម្អគម្រោងចាស់ៗឲ្យកាន់តែស្រស់ស្អាត និងស្របតាមស្តង់ដារទំនើប។' },
            icon: Ruler,
            features: [
                { en: 'Structural Strengthening', kh: 'ការពង្រឹងរចនាសម្ព័ន្ធ' },
                { en: 'Facade Upgrades', kh: 'ការកែលម្អមុខអគារ' },
                { en: 'MEP Retrofitting', kh: 'ការជួសជុលប្រព័ន្ធ MEP' }
            ],
            stat: '40+'
        },
        {
            title: t('Systems'),
            desc: { en: 'Smart building technologies and advanced MEP integration for modern hubs.', kh: 'បច្ចេកវិទ្យាអាគារឆ្លាតវៃ និងការភ្ជាប់ប្រព័ន្ធអនុវត្ត MEP កម្រិតយន្តសម្រាប់មជ្ឈមណ្ឌលទំនើប។' },
            icon: Target,
            features: [
                { en: 'Smart Grid Control', kh: 'ការគ្រប់គ្រងបណ្តាញឆ្លាតវៃ' },
                { en: 'Advanced MEP', kh: 'ប្រព័ន្ធ MEP កម្រិតយន្ត' },
                { en: 'Building Automation', kh: 'ស្វ័យប្រវត្តិកម្មអគារ' }
            ],
            stat: '20+'
        }
    ];

    const projects = allProjects.slice(0, 4);

    const testimonials = homeData.testimonials;

    const statsMapping = (label: string) => {
        const icons: any = { ShieldCheck, Trophy, Clock, Target, Award, Hammer, PenTool };
        const iconName = homeData.stats.find(s => getLocalizedText(s.label, 'en') === label)?.iconName || 'ShieldCheck';
        return icons[iconName] || ShieldCheck;
    };

    const processIcons: any = { Target, PenTool, Hammer, Trophy };


    return (
        <>
            <UnifiedHero mode={heroMode} onToggle={(mode) => setHeroMode(mode)} />

            {/* === WHY CHOOSE US === */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <FadeInWhenVisible>
                            <div>
                                <h2 className="text-accent-orange font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                                    {t('About Kimmex')}
                                </h2>
                                <h1 className="text-4xl md:text-6xl font-black text-titan-navy mb-8 leading-tight">
                                    {t('Experience & Excellence')}
                                </h1>
                                <p className="text-titan-navy/60 text-lg mb-8">
                                    {t('Experience Desc')}
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    {homeData.stats.map((item, i) => {
                                        const Icon = processIcons[item.iconName] || statsMapping(getLocalizedText(item.label, 'en')) || Award;
                                        return (
                                            <div key={i} className="group bg-white p-8 rounded-xl border border-gray-100 relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2">
                                                <div className="absolute top-0 left-0 w-1 h-full bg-gray-100 group-hover:bg-accent-orange transition-colors duration-500"></div>
                                                <div className="ml-4">
                                                    <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent-orange group-hover:text-white transition-all duration-300">
                                                        <Icon size={24} className="text-titan-navy group-hover:text-white transition-colors" />
                                                    </div>
                                                    <h3 className="text-xl font-black text-titan-navy mb-3 group-hover:text-accent-orange transition-colors">{getLocalizedText(item.label, language)}</h3>
                                                    <p className="text-titan-navy/60 text-sm leading-relaxed">{getLocalizedText(item.val, language)}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <Link href="/design-z/about" className="inline-flex items-center gap-3 mt-10 text-titan-red font-black uppercase tracking-[0.3em] text-xs hover:gap-6 transition-all">
                                    {t('Learn More About Us')} <ArrowRight size={16} />
                                </Link>
                            </div>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={0.2}>
                            <div className="relative">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg">
                                        <Image
                                            src="/images/projects/Thumbnail-4.jpg"
                                            alt="Construction Site"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                        />
                                    </div>
                                    <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg mt-8 md:mt-0">
                                        <Image
                                            src="/images/projects/Thumbnail-5.jpg"
                                            alt="Team Meeting"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                        />
                                    </div>
                                    <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg -mt-8 md:mt-0">
                                        <Image
                                            src="/images/projects/Thumbnail-6.jpg"
                                            alt="Architecture"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                        />
                                    </div>
                                    <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg">
                                        <Image
                                            src="/images/projects/Thumbnail-7.jpg"
                                            alt="Building"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                        />
                                    </div>
                                </div>

                                {/* Experience Badge */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-orange text-white p-6 rounded-2xl shadow-xl text-center z-10 w-32 h-32 flex flex-col items-center justify-center">
                                    <div className="text-4xl font-black">25+</div>
                                    <div className="text-xs uppercase tracking-widest mt-1">{t('Years of Excellence')}</div>
                                </div>
                            </div>
                        </FadeInWhenVisible>
                    </div>
                </div>
            </section>

            {/* === SERVICES === */}
            <section className="py-24 bg-white">
                <div className="max-w-[1400px] mx-auto px-6">
                    <FadeInWhenVisible>
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <span className="text-accent-orange font-bold uppercase tracking-widest text-sm mb-4 block">{t('Our Services')}</span>
                            <h2 className="text-4xl font-black text-titan-navy mb-4">{t('Comprehensive Construction Solutions')}</h2>
                            <p className="text-titan-navy/50 text-lg">{t('From design to completion')}</p>
                        </div>
                    </FadeInWhenVisible>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                        {services.map((s, i) => (
                            <FadeInWhenVisible key={i} delay={i * 0.1}>
                                <div className="bg-white p-10 group hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 border border-gray-100 border-b-4 border-b-transparent hover:border-b-accent-orange h-full relative overflow-hidden rounded-xl">
                                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700">
                                        <s.icon size={80} className="text-titan-navy" />
                                    </div>
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-accent-orange group-hover:shadow-lg group-hover:shadow-accent-orange/30 transition-all duration-300">
                                            <s.icon className="text-titan-navy group-hover:text-white transition-colors" size={28} />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-black text-titan-navy group-hover:text-accent-orange transition-colors mb-4 uppercase tracking-tighter">{s.title}</h3>
                                    <p className="text-titan-navy/60 mb-8 text-sm leading-relaxed">{getLocalizedText(s.desc, language)}</p>
                                    <ul className="space-y-3 pt-8 border-t border-gray-100">
                                        {s.features.map((f, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-titan-navy/40 group-hover:text-titan-navy/80 transition-colors">
                                                <div className="w-1.5 h-1.5 bg-accent-orange rounded-full group-hover:scale-150 transition-transform"></div> {getLocalizedText(f, language)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FadeInWhenVisible>
                        ))}
                    </div>

                    <FadeInWhenVisible>
                        <div className="text-center mt-12">
                            <Link href="/design-z/services" className="inline-flex items-center gap-2 bg-titan-navy text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-accent-orange transition-all rounded-lg">
                                {t('View All Services')} <ArrowRight size={16} />
                            </Link>
                        </div>
                    </FadeInWhenVisible>
                </div>
            </section>

            {/* === WORKING PROCESS === */}
            <section className="py-24 bg-titan-navy">
                <div className="max-w-[1400px] mx-auto px-6">
                    <FadeInWhenVisible>
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <span className="text-accent-orange font-bold uppercase tracking-widest text-sm mb-4 block">{t('Our Process')}</span>
                            <h2 className="text-4xl font-black text-white mb-4">{t('How We Work')}</h2>
                            <p className="text-white/50 text-lg">{t('A streamlined approach')}</p>
                        </div>
                    </FadeInWhenVisible>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[4.5rem] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>

                        {homeData.process.map((s, i) => {
                            const Icon = processIcons[s.iconName] || Target;
                            return (
                                <FadeInWhenVisible key={i} delay={i * 0.1}>
                                    <div className="relative z-10 flex flex-col items-center text-center group">
                                        <div className="w-36 h-36 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 flex flex-col items-center justify-center mb-8 group-hover:bg-accent-orange group-hover:border-accent-orange group-hover:shadow-[0_0_40px_rgba(255,107,0,0.5)] group-hover:-translate-y-2 transition-all duration-500 relative">
                                            <Icon className="text-accent-orange mb-2 group-hover:text-white group-hover:scale-110 transition-all duration-300" size={32} />
                                            <span className="text-xl font-black text-white/40 group-hover:text-white transition-colors">{s.step}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-orange transition-colors">{getLocalizedText(s.title, language)}</h3>
                                        <p className="text-sm text-white/50 max-w-[200px] leading-relaxed group-hover:text-white/80 transition-colors">{getLocalizedText(s.desc, language)}</p>
                                    </div>
                                </FadeInWhenVisible>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* === FEATURED PROJECTS === */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-[1400px] mx-auto px-6">
                    <FadeInWhenVisible>
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                            <div>
                                <span className="text-accent-orange font-bold uppercase tracking-widest text-sm mb-4 block">{t('Our Portfolio')}</span>
                                <h2 className="text-4xl font-black text-titan-navy">{t('Featured Projects')}</h2>
                            </div>
                            <Link href="/design-z/projects" className="mt-6 md:mt-0 inline-flex items-center gap-2 text-accent-orange font-bold uppercase tracking-widest text-sm hover:text-titan-navy transition-colors">
                                {t('View All Projects')} <ArrowRight size={16} />
                            </Link>
                        </div>
                    </FadeInWhenVisible>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {projects.map((p, i) => (
                            <FadeInWhenVisible key={i} delay={i * 0.1}>
                                <Link href={`/design-z/projects/${p.id}`} className="group block h-full">
                                    <div className="relative overflow-hidden rounded-2xl shadow-lg h-80 w-full">
                                        <Image
                                            src={p.image}
                                            alt={getLocalizedText(p.title, language)}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-titan-navy via-titan-navy/20 to-transparent z-10"></div>

                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="bg-accent-orange text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded">
                                                {getLocalizedText(p.type, language)}
                                            </span>
                                        </div>

                                        {/* Project Info */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                            <h3 className="text-white text-2xl font-bold mb-2 group-hover:text-accent-orange transition-colors">{getLocalizedText(p.title, language)}</h3>
                                            <div className="flex items-center gap-4 text-white/60 text-sm">
                                                <span className="flex items-center gap-1"><MapPin size={14} /> {getLocalizedText(p.location, language)}</span>
                                                <span className="flex items-center gap-1"><CheckCircle2 size={14} /> {getLocalizedText(p.status, language)}</span>
                                            </div>
                                        </div>

                                        {/* Hover Arrow */}
                                        <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 z-20">
                                            <ArrowRight size={18} className="text-titan-navy" />
                                        </div>
                                    </div>
                                </Link>
                            </FadeInWhenVisible>
                        ))}
                    </div>
                </div>
            </section>

            {/* === TESTIMONIALS === */}
            <section className="py-24 bg-white">
                <div className="max-w-[1400px] mx-auto px-6">
                    <FadeInWhenVisible>
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <span className="text-accent-orange font-bold uppercase tracking-widest text-sm mb-4 block">{t('Testimonials')}</span>
                            <h2 className="text-4xl font-black text-titan-navy mb-4">{t('What Our Clients Say')}</h2>
                            <p className="text-titan-navy/50 text-lg">{t('Home Testimonials Desc')}</p>
                        </div>
                    </FadeInWhenVisible>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <FadeInWhenVisible key={i} delay={i * 0.1}>
                                <div className="bg-gray-50 p-8 rounded-2xl relative h-full flex flex-col">
                                    <Quote className="text-accent-orange/20 absolute top-6 right-6" size={48} />
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(t.rating)].map((_, idx) => (
                                            <Star key={idx} className="text-accent-orange fill-accent-orange" size={18} />
                                        ))}
                                    </div>
                                    <p className="text-titan-navy/70 mb-6 relative z-10 leading-relaxed flex-grow">&ldquo;{getLocalizedText(t.quote, language)}&rdquo;</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-titan-navy rounded-full flex items-center justify-center text-white font-bold shrink-0">
                                            {getLocalizedText(t.author, language).charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-titan-navy">{getLocalizedText(t.author, language)}</div>
                                            <div className="text-sm text-titan-navy/50">{getLocalizedText(t.role, language)}</div>
                                        </div>
                                    </div>
                                </div>
                            </FadeInWhenVisible>
                        ))}
                    </div>
                </div>
            </section>

            {/* === LATEST NEWS === */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-[1400px] mx-auto px-6">
                    <FadeInWhenVisible>
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                            <div>
                                <span className="text-accent-orange font-bold uppercase tracking-widest text-sm mb-4 block">{t('News & Updates')}</span>
                                <h2 className="text-4xl font-black text-titan-navy">{t('Latest Insights')}</h2>
                            </div>
                            <Link href="/design-z/news" className="mt-6 md:mt-0 inline-flex items-center gap-2 text-accent-orange font-bold uppercase tracking-widest text-sm hover:text-titan-navy transition-colors">
                                {t('View All News')} <ArrowRight size={16} />
                            </Link>
                        </div>
                    </FadeInWhenVisible>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {allNews.slice(0, 3).map((news, i) => (
                            <FadeInWhenVisible key={i} delay={i * 0.1}>
                                <Link href={`/design-z/news/${news.id}`} className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                                    <div className="aspect-[16/10] relative overflow-hidden">
                                        <div className="absolute top-4 left-4 bg-accent-orange text-white text-xs font-bold uppercase px-3 py-1 z-10 rounded">{news.category}</div>
                                        <Image
                                            src={news.image}
                                            alt={getLocalizedText(news.title, language)}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="text-xs font-bold uppercase tracking-widest text-titan-navy/40 mb-3 flex items-center gap-2">
                                            <Calendar size={14} /> {getLocalizedText(news.date, language)}
                                        </div>
                                        <h3 className="text-xl font-bold text-titan-navy group-hover:text-accent-orange transition-colors leading-tight mb-4">{getLocalizedText(news.title, language)}</h3>
                                        <span className="text-sm font-bold text-accent-orange flex items-center gap-2 mt-auto">
                                            {t('Read Story')} <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </Link>
                            </FadeInWhenVisible>
                        ))}
                    </div>
                </div>
            </section>

            {/* === CTA SECTION === */}
            <section className="py-24 bg-accent-orange">
                <div className="max-w-[1400px] mx-auto px-6">
                    <FadeInWhenVisible>
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="text-center lg:text-left">
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{t('Ready to Start Your Project?')}</h2>
                                <p className="text-white/80 text-lg max-w-xl">{t('Home CTA Desc')}</p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/design-z/contact" className="bg-white text-titan-navy px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-titan-navy hover:text-white transition-all rounded-lg flex items-center gap-2">
                                    {t('Get Free Quote')} <ArrowRight size={16} />
                                </Link>
                                <a href="tel:+85523999999" className="border-2 border-white text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-titan-navy transition-all rounded-lg flex items-center gap-2">
                                    <Phone size={16} /> {t('Call Now')}
                                </a>
                            </div>
                        </div>
                    </FadeInWhenVisible>
                </div>
            </section>

            {/* === TRUSTED PARTNERS === */}
            <section className="py-20 bg-titan-navy overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-6 mb-12">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <span className="text-accent-orange font-bold uppercase tracking-widest text-sm mb-2 block">{t('Our Partners')}</span>
                            <h2 className="text-3xl md:text-4xl font-black text-white">
                                {t('Trusted By Leading Institutions')}
                            </h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-center px-6 py-3 bg-white/10 rounded-lg">
                                <div className="text-2xl font-black text-accent-orange">50+</div>
                                <div className="text-[10px] uppercase tracking-widest text-white/60 font-bold">{t('Partners')}</div>
                            </div>
                            <div className="text-center px-6 py-3 bg-white/10 rounded-lg">
                                <div className="text-2xl font-black text-accent-orange">25+</div>
                                <div className="text-[10px] uppercase tracking-widest text-white/60 font-bold">{t('Years Trust')}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Marquee Row 1 */}
                <div className="relative mb-6">
                    <div className="flex animate-marquee">
                        {[...Array(2)].map((_, setIndex) => (
                            <div key={setIndex} className="flex shrink-0">
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                    <div
                                        key={`${setIndex}-${num}`}
                                        className="w-44 h-20 mx-4 bg-white rounded-xl flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300 cursor-pointer relative"
                                    >
                                        <Image
                                            src={`/patner/${num}.png`}
                                            alt={`Partner ${num}`}
                                            fill
                                            className="object-contain opacity-70 hover:opacity-100 transition-opacity p-2"
                                            sizes="200px"
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Marquee Row 2 */}
                <div className="relative">
                    <div className="flex animate-marquee-reverse">
                        {[...Array(2)].map((_, setIndex) => (
                            <div key={setIndex} className="flex shrink-0">
                                {[7, 9, 10, 11, 1, 2].map((num) => (
                                    <div
                                        key={`${setIndex}-${num}`}
                                        className="w-44 h-20 mx-4 bg-white rounded-xl flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300 cursor-pointer relative"
                                    >
                                        <Image
                                            src={`/patner/${num}.png`}
                                            alt={`Partner ${num}`}
                                            fill
                                            className="object-contain opacity-70 hover:opacity-100 transition-opacity p-2"
                                            sizes="200px"
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
