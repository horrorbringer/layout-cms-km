'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Linkedin, Twitter, Tag, ArrowRight, FileText, ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Data (Expanded to include Gallery and Documents)
const newsData: any = {
    '1': {
        id: '1',
        title: 'Kimmex Awarded "Best Commercial Project 2025" at PropertyGuru Awards',
        category: 'Awards',
        date: 'Oct 15, 2025',
        author: 'PR Team',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&q=80&w=1600',
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

// Fallback related items for demo
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

    // Look up article
    const article = (id && newsData[id]) ? newsData[id] : (!id || !newsData[id]) ? newsData['1'] : newsData['default'];

    // Filter related news to exclude current one
    const currentRelated = relatedNews.filter(n => n.id !== article.id).slice(0, 3);

    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy">
            {/* --- 1. HERO --- */}
            {/* --- 1. HERO --- */}
            {/* --- 1. HERO --- */}
            <div className="h-[85vh] w-full relative overflow-hidden group">
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-slate-900/60"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-titan-navy via-transparent to-transparent"></div>

                {/* Back Button - Top Left */}
                <div className="absolute top-40 left-0 w-full px-6 z-30">
                    <div className="max-w-[1600px] mx-auto">
                        <Link href="/design-x/news" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-all bg-white/5 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 hover:border-white/30">
                            <ArrowLeft size={12} /> Back to News
                        </Link>
                    </div>
                </div>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 w-full px-6 pb-20 z-20">
                    <div className="max-w-[1600px] mx-auto">
                        <div className="max-w-6xl">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[0.95] drop-shadow-2xl tracking-tight"
                            >
                                {article.title}
                            </motion.h1>

                            {/* --- 2. META --- */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-wrap items-center gap-8 text-white/90 text-xs font-bold uppercase tracking-widest border-t border-white/10 pt-8"
                            >
                                <span className="flex items-center gap-3"><Calendar size={16} className="text-titan-red" /> {article.date}</span>
                                <span className="flex items-center gap-3"><User size={16} className="text-titan-red" /> {article.author}</span>
                                <span className="flex items-center gap-3"><Clock size={16} className="text-titan-red" /> {article.readTime}</span>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CONTENT LAYOUT --- */}
            <section className="py-20 px-6 max-w-[1400px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-20">

                    {/* LEFT COLUMN: Main Body, Gallery, Documents */}
                    <div className="lg:w-2/3">

                        {/* --- 3. MAIN ARTICLE BODY --- */}
                        <article className="prose prose-lg prose-slate max-w-none 
                            prose-headings:font-black prose-headings:text-titan-navy 
                            prose-p:text-titan-navy-subtle prose-p:leading-relaxed
                            prose-strong:text-titan-navy prose-strong:font-bold
                            prose-li:text-titan-navy-subtle
                            first-letter:text-5xl first-letter:font-black first-letter:text-titan-red first-letter:mr-3 first-letter:float-left"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        {/* --- 4. IMAGES / DOCUMENTS --- */}

                        {/* Documents Download */}
                        {article.documents && article.documents.length > 0 && (
                            <div className="mt-12 bg-titan-bg-alt p-8 rounded-xl border border-titan-navy-light/10">
                                <h3 className="text-lg font-black text-titan-navy mb-6 flex items-center gap-2 uppercase tracking-wide">
                                    <FileText className="text-titan-red" /> Attached Documents
                                </h3>
                                <div className="space-y-3">
                                    {article.documents.map((doc: any, i: number) => (
                                        <div key={i} className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-100 hover:border-titan-red/30 transition-all cursor-pointer group shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-red-50 p-2 rounded text-titan-red group-hover:bg-titan-red group-hover:text-white transition-colors">
                                                    <FileText size={20} />
                                                </div>
                                                <span className="font-bold text-titan-navy text-sm">{doc.name}</span>
                                            </div>
                                            <span className="text-xs font-bold text-titan-navy-subtle uppercase tracking-widest">{doc.size}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Gallery Grid */}
                        {article.gallery && article.gallery.length > 0 && (
                            <div className="mt-16">
                                <h3 className="text-xl font-black text-titan-navy mb-8 flex items-center gap-2 uppercase tracking-wide">
                                    <ImageIcon className="text-titan-red" /> Event Gallery
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {article.gallery.map((img: string, i: number) => (
                                        <div key={i} className={`rounded-xl overflow-hidden shadow-lg border border-gray-100 cursor-pointer group relative ${i === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'}`}>
                                            <img src={img} alt="Gallery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tags */}
                        <div className="mt-16 pt-8 border-t border-gray-100">
                            <h3 className="text-sm font-bold text-titan-navy uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Tag size={16} /> Related Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {article.tags.map((tag: string) => (
                                    <span key={tag} className="px-4 py-2 bg-gray-50 text-titan-navy-subtle text-xs font-bold hover:bg-titan-red hover:text-white transition-colors rounded-sm cursor-pointer border border-transparent hover:border-titan-red">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar & Related */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-32 space-y-12">
                            {/* Share */}
                            <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100">
                                <h3 className="text-lg font-black text-titan-navy mb-6 uppercase tracking-wide flex items-center gap-2">
                                    <Share2 size={18} className="text-titan-red" /> Share Article
                                </h3>
                                <div className="flex gap-4">
                                    <button className="flex-1 h-12 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all"><Facebook size={20} /></button>
                                    <button className="flex-1 h-12 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all"><Linkedin size={20} /></button>
                                    <button className="flex-1 h-12 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white hover:border-black transition-all"><Twitter size={20} /></button>
                                </div>
                            </div>

                            {/* --- 5. RELATED NEWS --- */}
                            <div>
                                <h3 className="text-lg font-black text-titan-navy mb-6 uppercase tracking-wide border-l-4 border-titan-red pl-4">
                                    Related News
                                </h3>
                                <div className="space-y-6">
                                    {currentRelated.map((news) => (
                                        <Link href={`/design-x/news/${news.id}`} key={news.id} className="group block bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-all">
                                            <div className="aspect-video relative overflow-hidden">
                                                <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                            <div className="p-4">
                                                <span className="text-[10px] font-bold text-titan-navy-subtle uppercase tracking-widest mb-2 block">{news.date}</span>
                                                <h4 className="font-bold text-titan-navy group-hover:text-titan-red transition-colors line-clamp-2 leading-tight">
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
            </section>
        </div>
    );
}
