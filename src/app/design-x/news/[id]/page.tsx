'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
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
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop',
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
            'https://images.unsplash.com/photo-1518182170546-0766aaef3194?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
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
        image: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&q=80&w=1600',
        content: `
            <p class="lead">Phase 1 of the massive logistics center has officially begun. This project aims to revolutionize the supply chain infrastructure in the coastal region and support the growing export sector.</p>
            <h3>Strategic Importance</h3>
            <p>Located near the autonomous port, this hub will facilitate faster processing and storage of goods. Our team has mobilized heavy machinery this week to begin the foundation work.</p>
        `,
        tags: ['Logistics', 'Sihanoukville', 'Infrastructure', 'Phase 1'],
        gallery: [
            'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&q=80&w=800'
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
        image: 'https://images.unsplash.com/photo-1504384308090-c54be3852f92?auto=format&fit=crop&q=80&w=1600',
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
        image: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: '3',
        title: 'Safety First: Achieving 2 Million Man-Hours Without Lost Time Injury',
        date: 'Aug 05, 2025',
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: '4',
        title: 'Introducing Our New "Green Build" Initiative',
        date: 'Jul 12, 2025',
        image: 'https://images.unsplash.com/photo-1518182170546-0766aaef3194?auto=format&fit=crop&q=80&w=600'
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
            
            {/* --- HEADER --- */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/design-x/news" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-titan-navy hover:text-titan-red transition-colors">
                        <ArrowLeft size={14} /> Back to News
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 text-xs text-titan-navy-subtle">
                            <span>Share:</span>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Facebook size={14} /></button>
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Linkedin size={14} /></button>
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Twitter size={14} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- HERO: Clean Title & Meta --- */}
            <div className="max-w-[1000px] mx-auto px-6 pt-16 pb-12 text-center">
                <div className="mb-6 flex flex-wrap justify-center gap-3">
                    <span className="bg-titan-red/10 text-titan-red px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest">
                        {article.category}
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-titan-navy mb-8 leading-tight">
                    {article.title}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold uppercase tracking-widest text-titan-navy-subtle">
                    <span className="flex items-center gap-2"><Calendar size={14} /> {article.date}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="flex items-center gap-2"><User size={14} /> {article.author}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="flex items-center gap-2"><Clock size={14} /> {article.readTime}</span>
                </div>
            </div>

            {/* --- HERO IMAGE: Full Width Container --- */}
            <div className="w-full px-6 mb-16">
                <div className="max-w-[1400px] mx-auto rounded-2xl overflow-hidden shadow-2xl aspect-[21/9]">
                    <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* --- CONTENT AREA --- */}
            <div className="max-w-[1400px] mx-auto px-6 pb-24">
                <div className="flex flex-col lg:flex-row gap-16">
                    
                    {/* LEFT: Article Body (65%) */}
                    <div className="lg:w-[65%]">
                        <article className="prose prose-lg prose-slate max-w-none 
                            prose-headings:font-black prose-headings:text-titan-navy 
                            prose-p:text-titan-navy-subtle prose-p:leading-relaxed prose-p:text-lg
                            prose-strong:text-titan-navy
                            first-letter:text-5xl first-letter:font-black first-letter:text-titan-navy first-letter:mr-3 first-letter:float-left"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        {/* Gallery */}
                        {article.gallery && article.gallery.length > 0 && (
                            <div className="mt-16">
                                <h3 className="text-xl font-black text-titan-navy mb-6 flex items-center gap-2">
                                    <ImageIcon className="text-titan-red" size={20} /> Event Gallery
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {article.gallery.map((img: string, i: number) => (
                                        <div key={i} className={`rounded-xl overflow-hidden shadow-sm ${i === 0 ? 'col-span-2 aspect-[2/1]' : 'aspect-square'}`}>
                                            <img src={img} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tags */}
                        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
                            {article.tags.map((tag: string) => (
                                <span key={tag} className="px-3 py-1 bg-gray-50 text-titan-navy-subtle text-xs font-bold uppercase tracking-wider rounded hover:bg-titan-navy hover:text-white transition-colors cursor-pointer">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Sidebar (35%) */}
                    <div className="lg:w-[35%] space-y-8">
                        <div className="sticky top-24 space-y-8">
                            
                            {/* Author Card */}
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-titan-navy font-black text-lg border border-gray-200 shadow-sm">
                                    {article.author.charAt(0)}
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-titan-navy-subtle uppercase tracking-widest">Written By</span>
                                    <span className="font-bold text-titan-navy">{article.author}</span>
                                </div>
                            </div>

                            {/* Documents */}
                            {article.documents && article.documents.length > 0 && (
                                <div className="bg-titan-navy text-white rounded-xl p-6 shadow-lg relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-titan-red rounded-full blur-[40px] opacity-30 -mr-8 -mt-8"></div>
                                    <h3 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
                                        <FileText size={16} /> Downloads
                                    </h3>
                                    <div className="space-y-3 relative z-10">
                                        {article.documents.map((doc: any, i: number) => (
                                            <div key={i} className="flex items-center justify-between bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors cursor-pointer group">
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <FileText size={16} className="shrink-0 text-titan-red" />
                                                    <span className="text-xs font-bold truncate">{doc.name}</span>
                                                </div>
                                                <Download size={14} className="shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Related News (Sidebar) */}
                            <div>
                                <h3 className="text-sm font-black text-titan-navy uppercase tracking-widest mb-6 border-l-4 border-titan-red pl-3">
                                    Latest Stories
                                </h3>
                                <div className="space-y-6">
                                    {currentRelated.map((news) => (
                                        <Link href={`/design-x/news/${news.id}`} key={news.id} className="group flex gap-4 items-start">
                                            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                                                <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-bold text-titan-navy-subtle uppercase tracking-widest mb-1 block">
                                                    {news.date}
                                                </span>
                                                <h4 className="text-sm font-bold text-titan-navy group-hover:text-titan-red transition-colors leading-snug line-clamp-2">
                                                    {news.title}
                                                </h4>
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
