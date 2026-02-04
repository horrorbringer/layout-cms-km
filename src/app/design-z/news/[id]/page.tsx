'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Linkedin, Twitter, Tag, ArrowRight, FileText, ImageIcon, Download, Copy, Printer, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Data
const newsData: any = {
    '1': {
        id: '1',
        title: 'Kimmex Awarded "Best Commercial Project 2025" at PropertyGuru Awards',
        category: 'Awards',
        date: 'Oct 15, 2025',
        author: 'PR Team',
        readTime: '5 min read',
        image: '/images/projects/Thumbnail-8.jpg',
        content: `
            <p class="lead">We are thrilled to announce that Kimmex Construction has been honored with the Gold Award for "Best Commercial Project" at the 2025 PropertyGuru Cambodia Property Awards. This recognition celebrates our commitment to excellence in the design and construction of the new Ministry of Interior complex.</p>
            
            <h3>A Landmark Achievement</h3>
            <p>The Ministry of Interior complex stands as a testament to modern engineering fused with traditional Khmer architectural elements. Spanning over 45,000 square meters, the project involved complex structural challenges and high-level security integration.</p>
            
            <p>Mr. Kim, CEO of Kimmex, accepted the award, stating: "This award belongs to the hundreds of engineers, architects, and workers who dedicated their skills to this national landmark. It validates our mission to build structures that define the skyline and serve the nation."</p>

            <h3>Sustainability & Innovation</h3>
            <p>One of the key factors impressed the judges was the building's energy efficiency. We utilized advanced materials and a smart HVAC system that reduces energy consumption by 25% compared to standard regulations.</p>
        `,
        tags: ['Awards', 'Commercial', 'Ministry of Interior', 'Gold Winner'],
        gallery: [
            '/images/projects/Thumbnail-1.jpg',
            '/images/projects/Thumbnail-2.jpg',
            '/images/projects/Thumbnail-3.jpg'
        ],
        documents: [
            { name: 'Official Press Release.pdf', size: '2.4 MB' },
            { name: 'Award Ceremony Highlights.pdf', size: '1.2 MB' }
        ]
    },
    '2': {
        id: '2',
        title: 'Breaking Ground on the New Sihanoukville Logistics Hub',
        category: 'Project Updates',
        date: 'Sep 22, 2025',
        author: 'Project Mgmt',
        readTime: '3 min read',
        image: '/images/projects/Thumbnail-1.jpg',
        content: `
            <p class="lead">Phase 1 of the massive logistics center has officially begun. This project aims to revolutionize the supply chain infrastructure in the coastal region and support the growing export sector.</p>
            <h3>Strategic Importance</h3>
            <p>Located near the autonomous port, this hub will facilitate faster processing and storage of goods. Our team has mobilized heavy machinery this week to begin the foundation work.</p>
        `,
        tags: ['Logistics', 'Sihanoukville', 'Infrastructure', 'Phase 1'],
        gallery: [
            '/images/projects/Thumbnail-4.jpg',
            '/images/projects/Thumbnail-5.jpg'
        ],
        documents: []
    },
    // Fallback for demo
    'default': {
        id: '0',
        title: 'News Article Title Not Found',
        category: 'Uncategorized',
        date: 'Unknown Date',
        author: 'Admin',
        readTime: '1 min read',
        image: '/images/projects/Thumbnail.jpg',
        content: '<p>The article you are looking for does not exist or has been removed.</p>',
        tags: [],
        gallery: [],
        documents: []
    }
};

const relatedNews = [
    {
        id: '2',
        title: 'Breaking Ground on the New Sihanoukville Logistics Hub',
        date: 'Sep 22, 2025',
        image: '/images/projects/Thumbnail-1.jpg'
    },
    {
        id: '3',
        title: 'Safety First: Achieving 2 Million Man-Hours Without Lost Time Injury',
        date: 'Aug 05, 2025',
        image: '/images/projects/Thumbnail-2.jpg'
    },
    {
        id: '4',
        title: 'Introducing Our New "Green Build" Initiative',
        date: 'Jul 12, 2025',
        image: '/images/projects/Thumbnail-7.jpg'
    }
];

export default function NewsDetailPage() {
    const params = useParams();
    const idParam = params?.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;

    const article = (id && newsData[id]) ? newsData[id] : (!id || !newsData[id]) ? newsData['1'] : newsData['default'];
    const currentRelated = relatedNews.filter(n => n.id !== article.id).slice(0, 3);

    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy">

            {/* --- HERO SECTION (Dark) --- */}
            <div className="relative pt-[140px] pb-32 px-6 bg-[#0B1221] overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-[url('/images/projects/Thumbnail-2.jpg')] bg-cover bg-center opacity-30 blur-xl scale-110"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B1221]/80 via-[#1a2c4e]/70 to-[#0B1221]/90"></div>

                <div className="relative z-10 max-w-[1200px] mx-auto">
                    {/* Nav & Meta */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-white/10 pb-6">
                        <Link href="/design-z/news" className="group flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-titan-red transition-colors backdrop-blur-sm">
                                <ArrowLeft size={16} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest">Back to Newsroom</span>
                        </Link>

                        <div className="flex items-center gap-3">
                            <span className="text-white/60 text-[10px] font-black uppercase tracking-widest hidden md:inline-block">Share:</span>
                            <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-[#1877F2] transition-colors backdrop-blur-sm"><Facebook size={14} /></button>
                            <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-[#0A66C2] transition-colors backdrop-blur-sm"><Linkedin size={14} /></button>
                            <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black transition-colors backdrop-blur-sm"><Twitter size={14} /></button>
                        </div>
                    </div>

                    {/* Title & Info */}
                    <div className="max-w-[1000px]">
                        <div className="flex flex-wrap gap-3 mb-6">
                            <span className="bg-titan-red/90 text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-sm">
                                {article.category}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight drop-shadow-lg">
                            {article.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-widest text-white/70">
                            <span className="flex items-center gap-2 text-white"><Calendar size={14} className="text-titan-red" /> {article.date}</span>
                            <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                            <span className="flex items-center gap-2"><User size={14} /> {article.author}</span>
                            <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                            <span className="flex items-center gap-2"><Clock size={14} /> {article.readTime}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- HERO IMAGE (Overlap) --- */}
            <div className="relative z-20 px-6 -mt-20 mb-20">
                <div className="max-w-[1200px] mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[21/9] relative">
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* --- CONTENT AREA --- */}
            <div className="max-w-[1200px] mx-auto px-6 pb-24">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* LEFT: Article Body (65%) */}
                    <div className="lg:w-[65%]">
                        <article className="prose prose-lg prose-slate max-w-none 
                            prose-headings:font-black prose-headings:text-titan-navy prose-headings:tracking-tight
                            prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6
                            prose-p:text-slate-600 prose-p:leading-8 prose-p:mb-6
                            prose-strong:text-titan-navy prose-strong:font-black
                            prose-li:text-slate-600
                            prose-blockquote:border-l-4 prose-blockquote:border-titan-red prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:font-medium prose-blockquote:text-titan-navy"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        {/* Gallery */}
                        {article.gallery && article.gallery.length > 0 && (
                            <div className="mt-20 border-t border-gray-100 pt-12">
                                <h3 className="text-2xl font-black text-titan-navy mb-8 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-titan-navy text-white rounded-lg flex items-center justify-center">
                                        <ImageIcon size={20} />
                                    </div>
                                    Event Gallery
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {article.gallery.map((img: string, i: number) => (
                                        <div key={i} className={`rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 relative group cursor-pointer ${i === 0 ? 'col-span-2 aspect-[2/1]' : 'aspect-square'}`}>
                                            <Image src={img} alt="Gallery" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tags */}
                        <div className="mt-16 bg-gray-50 rounded-2xl p-8 border border-gray-100">
                            <p className="text-xs font-black uppercase tracking-widest text-titan-navy/40 mb-4">Related Topics</p>
                            <div className="flex flex-wrap gap-2">
                                {article.tags.map((tag: string) => (
                                    <span key={tag} className="px-4 py-2 bg-white border border-gray-200 text-titan-navy text-xs font-bold uppercase tracking-wider rounded-lg hover:border-titan-red hover:text-titan-red transition-all cursor-pointer shadow-sm">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Sidebar (35%) */}
                    <div className="lg:w-[35%]">
                        <div className="sticky top-32 space-y-10">

                            {/* Author Card */}
                            <div className="bg-white rounded-2xl p-1 shadow-xl shadow-gray-100 border border-gray-100">
                                <div className="bg-gray-50 rounded-xl p-6 flex items-center gap-5">
                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-titan-navy font-black text-xl border-2 border-white shadow-md">
                                        {article.author.charAt(0)}
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-black text-titan-navy/30 uppercase tracking-widest mb-1">Author</span>
                                        <h4 className="font-bold text-titan-navy text-lg leading-none mb-1">{article.author}</h4>
                                        <p className="text-xs text-titan-navy/50 font-medium">Content Specialist</p>
                                    </div>
                                </div>
                            </div>

                            {/* Documents */}
                            {article.documents && article.documents.length > 0 && (
                                <div className="bg-titan-navy text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-titan-red rounded-full blur-[60px] opacity-20 -mr-10 -mt-10 group-hover:opacity-30 transition-opacity duration-700"></div>
                                    <h3 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2 relative z-10 text-white/60">
                                        <FileText size={14} /> Project Documents
                                    </h3>
                                    <div className="space-y-3 relative z-10">
                                        {article.documents.map((doc: any, i: number) => (
                                            <div key={i} className="flex items-center justify-between bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-all cursor-pointer group/doc border border-white/5 hover:border-white/20">
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center shrink-0 text-titan-red">
                                                        <FileText size={16} />
                                                    </div>
                                                    <span className="text-xs font-bold truncate text-white/90">{doc.name}</span>
                                                </div>
                                                <Download size={14} className="shrink-0 opacity-0 -translate-x-2 group-hover/doc:opacity-100 group-hover/doc:translate-x-0 transition-all text-titan-red" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Related News (Sidebar) */}
                            <div>
                                <h3 className="text-xl font-black text-titan-navy mb-6 flex items-end justify-between">
                                    <span>Latest Stories</span>
                                    <Link href="/design-z/news" className="text-[10px] text-titan-red uppercase tracking-widest hover:underline mb-1">View All</Link>
                                </h3>
                                <div className="space-y-6">
                                    {currentRelated.map((news) => (
                                        <Link href={`/design-z/news/${news.id}`} key={news.id} className="group flex gap-5 items-start">
                                            <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-100 relative shadow-sm">
                                                <Image src={news.image} alt={news.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                            </div>
                                            <div className="py-1">
                                                <span className="text-[9px] font-black text-titan-navy/40 uppercase tracking-widest mb-2 block">
                                                    {news.date}
                                                </span>
                                                <h4 className="text-sm font-bold text-titan-navy group-hover:text-titan-red transition-colors leading-snug line-clamp-2 mb-2">
                                                    {news.title}
                                                </h4>
                                                <div className="flex items-center text-[10px] font-bold text-titan-red uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                                                    Read Story <ChevronRight size={12} />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
