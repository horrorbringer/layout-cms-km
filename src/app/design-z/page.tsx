import {
    ArrowRight, ShieldCheck, Trophy, PenTool, Layout, Ruler, Users, Hammer,
    CheckCircle2, Phone, Clock, Award, Target, Quote, Star, MapPin,
    Calendar, MessageSquare, HardHat, Shield, Search
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { FadeInWhenVisible } from './_components/Animations';
import HomeHeroWrapper from './_components/HomeHeroWrapper';
import { useLanguage } from './context/LanguageContext';
import { homeData } from './data/homeData';
import prisma from '@/lib/prisma';

// --- CONFIGURATION ---
export default async function DesignGenX() {
    // Determine language (default to 'en' for server component if LanguageContext isn't available server-side)
    const language: 'en' | 'kh' = 'en';

    const dictionary: Record<string, any> = {
        'About Kimmex': 'About Kimmex',
        'Experience & Excellence': 'Experience & Excellence',
        'Experience Desc': 'Over 25 years of excellence in building the future of Cambodia.',
        'Testimonials': 'Testimonials',
        'What Our Clients Say': 'What Our Clients Say',
        'Home Testimonials Desc': 'We build relationships, not just structures.',
        'Build with Purpose': 'Build with Purpose',
        'Our Professional Process': 'Our Professional Process',
        'Years of Excellence': 'Years of Excellence',
        'Learn More About Us': 'Learn More About Us',
        'Our Services': 'Our Services',
        'Comprehensive Construction Solutions': 'Comprehensive Construction Solutions',
        'From design to completion': 'From design to completion',
        'View All Services': 'View All Services',
        'Our Process': 'Our Process',
        'How We Work': 'How We Work',
        'A streamlined approach': 'A streamlined approach',
        'Our Portfolio': 'Our Portfolio',
        'Featured Projects': 'Featured Projects',
        'View All Projects': 'View All Projects',
        'News & Updates': 'News & Updates',
        'Latest Insights': 'Latest Insights',
        'View All News': 'View All News',
        'Read Story': 'Read Story',
        'Ready to Start Your Project?': 'Ready to Start Your Project?',
        'Home CTA Desc': 'Contact us today for a free consultation and quote on your next big project.',
        'Get Free Quote': 'Get Free Quote',
        'Call Now': 'Call Now',
        'Our Partners': 'Our Partners',
        'Trusted By Leading Institutions': 'Trusted By Leading Institutions',
        'Partners': 'Partners',
        'Years Trust': 'Years Trust',
    };

    const t = (key: string) => dictionary[key] || key;

    // Server-side safe localizer
    const getLocalText = (obj: any, lang: 'en' | 'kh') => {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        return obj[lang] || obj.en || '';
    };

    // Fetch dynamic data from Prisma
    const projectsEntry = await prisma.project.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' }
    });

    const allNewsEntry = await prisma.newsArticle.findMany({
        take: 3,
        orderBy: { publishedAt: 'desc' }
    });

    const projectCounts = await prisma.project.groupBy({
        by: ['status'],
        _count: { _all: true }
    });

    const totalProjectCount = projectCounts.reduce((acc, curr) => acc + curr._count._all, 0);
    const completedCount = projectCounts.find(p => p.status === 'COMPLETED')?._count._all || 0;
    const ongoingCount = totalProjectCount - completedCount;

    const testimonialsEntry = await prisma.testimonial.findMany({
        where: { isFeatured: true },
        take: 10,
        orderBy: { createdAt: 'desc' }
    });

    const heroSettings = await prisma.systemSetting.findUnique({ where: { key: 'home_hero' } });
    const companyStats = await prisma.systemSetting.findUnique({ where: { key: 'company_stats' } });
    const homeProcess = await prisma.systemSetting.findUnique({ where: { key: 'home_process' } });

    // Helper to map DB category to frontend filter category
    const mapCategory = (cat: string) => {
        const mapping: Record<string, string> = {
            'GOVERNMENT_OFFICE': 'Government Office Building',
            'WATER_TREATMENT': 'Water Treatment Plant',
            'SLOP_CONSTRUCTION': 'Slope Construction',
            'SYSTEMS': 'Systems',
            'INFRASTRUCTURE': 'Infrastructure',
            'GOVERNMENT': 'Government',
            'PRIVATE_BUILDING': 'Private Building',
            'PUBLIC_SERVICE': 'Public Service'
        };
        return mapping[cat] || cat;
    };

    // Map Prisma models exactly to original frontend interface structure
    const mappedProjects = projectsEntry.map(p => ({
        id: p.slug,
        title: { en: p.title, kh: p.titleKm || p.title },
        location: { en: p.location || '', kh: p.locationKm || p.location || '' },
        type: { en: mapCategory(p.category), kh: mapCategory(p.category) },
        status: { en: p.status, kh: p.status },
        image: p.heroImage || '/images/projects/Thumbnail-1.jpg',
        summary: { en: p.description || '', kh: p.descriptionKm || p.description || '' }
    }));

    const allNews = allNewsEntry.map(n => ({
        id: n.slug,
        title: { en: n.title, kh: n.titleKm || n.title },
        category: n.category || 'Updates',
        date: { en: n.publishedAt ? new Date(n.publishedAt).toLocaleDateString('en-US') : '', kh: '' },
        image: n.coverImage || '/images/projects/Thumbnail-1.jpg',
    }));

    const testimonials = testimonialsEntry.length > 0
        ? testimonialsEntry.map(t => ({
            id: t.id,
            quote: { en: t.content, kh: t.contentKm || t.content },
            author: { en: t.clientName, kh: t.clientNameKm || t.clientName },
            role: { en: t.clientRole || '', kh: t.clientRoleKm || t.clientRole || '' },
            rating: t.rating || 5
        }))
        : homeData.testimonials;

    const servicesEntry = await prisma.service.findMany({
        where: { isActive: true },
        orderBy: { orderIndex: 'asc' }
    });

    const services = servicesEntry.map(s => ({
        title: s.title,
        desc: { en: s.summary || '', kh: s.summary || '' },
        icon: PenTool,
        features: s.features.map(f => ({ en: f, kh: f })),
        stat: 'New'
    }));

    const statusIcons: any = {
        ShieldCheck, Trophy, Clock, Target, Award, Hammer, PenTool,
        Users, Shield, Search, Layout, CheckCircle2, MessageSquare, HardHat
    };

    const getIcon = (name: string, label: string) => {
        return statusIcons[name] || statusIcons[label] || Award;
    };

    const companyStatsValue = companyStats?.value as any[];
    const stats = (companyStatsValue && companyStatsValue.length > 0) ? companyStatsValue : homeData.stats;
    const processes = (homeProcess?.value as any[]) || homeData.process;

    return (
        <>
            <HomeHeroWrapper initialData={heroSettings?.value} />

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
                                    {stats.map((item: any, i: number) => {
                                        const Icon = getIcon(item.iconName || item.icon, getLocalText(item.label, 'en'));
                                        return (
                                            <div key={i} className="group bg-white p-6 rounded-2xl border border-gray-100 relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1">
                                                <div className={`absolute top-0 right-0 w-24 h-24 ${item.bg || 'bg-gray-50'} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700`}></div>
                                                <div className="flex flex-col gap-4">
                                                    <div className={`w-12 h-12 ${item.bg || 'bg-gray-50'} ${item.color || 'text-titan-navy'} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                                        <Icon size={24} />
                                                    </div>
                                                    <div>
                                                        <div className="text-3xl font-black text-titan-navy mb-1 flex items-baseline gap-1">
                                                            {getLocalText(item.value, language)}
                                                            <span className="text-accent-orange text-sm font-bold">+</span>
                                                        </div>
                                                        <h3 className="text-xs font-bold text-titan-navy/40 uppercase tracking-widest group-hover:text-titan-navy/60 transition-colors">
                                                            {getLocalText(item.label, language)}
                                                        </h3>
                                                    </div>
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
                                        <Image src="/images/projects/Thumbnail-4.jpg" alt="Construction Site" fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                                    </div>
                                    <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg mt-8 md:mt-0">
                                        <Image src="/images/projects/Thumbnail-5.jpg" alt="Team Meeting" fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                                    </div>
                                    <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg -mt-8 md:mt-0">
                                        <Image src="/images/projects/Thumbnail-6.jpg" alt="Architecture" fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                                    </div>
                                    <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg">
                                        <Image src="/images/projects/Thumbnail-7.jpg" alt="Building" fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                                    </div>
                                </div>
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
                                    <p className="text-titan-navy/60 mb-8 text-sm leading-relaxed">{getLocalText(s.desc, language)}</p>
                                    <ul className="space-y-3 pt-8 border-t border-gray-100">
                                        {s.features.map((f, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-titan-navy/40 group-hover:text-titan-navy/80 transition-colors">
                                                <div className="w-1.5 h-1.5 bg-accent-orange rounded-full group-hover:scale-150 transition-transform"></div> {getLocalText(f, language)}
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
                        <div className="hidden md:block absolute top-[4.5rem] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>

                        {processes.map((s: any, i: number) => {
                            const Icon = getIcon(s.iconName || s.icon, getLocalText(s.title, 'en'));
                            return (
                                <FadeInWhenVisible key={i} delay={i * 0.1}>
                                    <div className="relative z-10 flex flex-col items-center text-center group">
                                        <div className="w-36 h-36 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 flex flex-col items-center justify-center mb-8 group-hover:bg-accent-orange group-hover:border-accent-orange group-hover:shadow-[0_0_40px_rgba(255,107,0,0.5)] group-hover:-translate-y-2 transition-all duration-500 relative">
                                            <Icon className="text-accent-orange mb-2 group-hover:text-white group-hover:scale-110 transition-all duration-300" size={32} />
                                            <span className="text-xl font-black text-white/40 group-hover:text-white transition-colors">{s.step}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-orange transition-colors">{getLocalText(s.title, language)}</h3>
                                        <p className="text-sm text-white/50 max-w-[200px] leading-relaxed group-hover:text-white/80 transition-colors">{getLocalText(s.desc, language)}</p>
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
                        {mappedProjects.map((p, i) => (
                            <FadeInWhenVisible key={i} delay={i * 0.1}>
                                <Link href={`/design-z/projects/${p.id}`} className="group block h-full">
                                    <div className="relative overflow-hidden rounded-2xl shadow-lg h-80 w-full">
                                        <Image
                                            src={p.image}
                                            alt={getLocalText(p.title, language)}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-titan-navy via-titan-navy/20 to-transparent z-10"></div>
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="bg-accent-orange text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded">
                                                {getLocalText(p.type, language)}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                            <h3 className="text-white text-2xl font-bold mb-2 group-hover:text-accent-orange transition-colors">{getLocalText(p.title, language)}</h3>
                                            <div className="flex items-center gap-4 text-white/60 text-sm">
                                                <span className="flex items-center gap-1"><MapPin size={14} /> {getLocalText(p.location, language)}</span>
                                                <span className="flex items-center gap-1"><CheckCircle2 size={14} /> {getLocalText(p.status, language)}</span>
                                            </div>
                                        </div>
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
                                    <p className="text-titan-navy/70 mb-6 relative z-10 leading-relaxed flex-grow">&ldquo;{getLocalText(t.quote, language)}&rdquo;</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-titan-navy rounded-full flex items-center justify-center text-white font-bold shrink-0">
                                            {getLocalText(t.author, language).charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-titan-navy">{getLocalText(t.author, language)}</div>
                                            <div className="text-sm text-titan-navy/50">{getLocalText(t.role, language)}</div>
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
                        {allNews.map((news, i) => (
                            <FadeInWhenVisible key={i} delay={i * 0.1}>
                                <Link href={`/design-z/news/${news.id}`} className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                                    <div className="aspect-[16/10] relative overflow-hidden">
                                        <div className="absolute top-4 left-4 bg-accent-orange text-white text-xs font-bold uppercase px-3 py-1 z-10 rounded">{news.category}</div>
                                        <Image src={news.image} alt={getLocalText(news.title, language)} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="text-xs font-bold uppercase tracking-widest text-titan-navy/40 mb-3 flex items-center gap-2">
                                            <Calendar size={14} /> {getLocalText(news.date, language)}
                                        </div>
                                        <h3 className="text-xl font-bold text-titan-navy group-hover:text-accent-orange transition-colors leading-tight mb-4">{getLocalText(news.title, language)}</h3>
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
                                <a href="tel:+85523999888" className="border-2 border-white text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-titan-navy transition-all rounded-lg flex items-center gap-2">
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
                            <h2 className="text-3xl md:text-4xl font-black text-white">{t('Trusted By Leading Institutions')}</h2>
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

                <div className="relative mb-6">
                    <div className="flex animate-marquee">
                        {[...Array(2)].map((_, setIndex) => (
                            <div key={setIndex} className="flex shrink-0">
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                    <div key={`${setIndex}-${num}`} className="w-44 h-20 mx-4 bg-white rounded-xl flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300 cursor-pointer relative">
                                        <Image src={`/patner/${num}.png`} alt={`Partner ${num}`} fill className="object-contain opacity-70 hover:opacity-100 transition-opacity p-2" sizes="200px" />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="flex animate-marquee-reverse">
                        {[...Array(2)].map((_, setIndex) => (
                            <div key={setIndex} className="flex shrink-0">
                                {[7, 9, 10, 11, 1, 2].map((num) => (
                                    <div key={`${setIndex}-${num}`} className="w-44 h-20 mx-4 bg-white rounded-xl flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300 cursor-pointer relative">
                                        <Image src={`/patner/${num}.png`} alt={`Partner ${num}`} fill className="object-contain opacity-70 hover:opacity-100 transition-opacity p-2" sizes="200px" />
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
