'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft, Clock, User, Share2, Facebook, Linkedin, Twitter, MapPin
} from 'lucide-react';

// Mock Data
// Note: Using simple strings to avoid any potential syntax issues with template literals or hidden characters.
const newsData: Record<string, any> = {
    'LOG-001': {
        id: 'LOG-001',
        title: 'Kimmex Wins Best Commercial Project 2025 at PropertyGuru Awards',
        category: 'Awards',
        date: '2h ago',
        author: 'Sarah Jenkins',
        location: 'Singapore',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&q=80&w=1600',
        content: '<p class="lead">We are thrilled to announce that Kimmex Construction has been honored with the Gold Award for Best Commercial Project at the 2025 PropertyGuru Cambodia Property Awards.</p><p>The Skyline Tower project was universally acclaimed for its structural innovation and carbon-neutral footprint, setting a new benchmark for high-rise developments in Southeast Asia. This recognition celebrates our commitment to excellence in the design and construction of complex commercial infrastructures.</p><h3>A Landmark Achievement</h3><p>The Ministry of Interior complex stands as a testament to modern engineering fused with traditional Khmer architectural elements. Spanning over 45,000 square meters, the project involved complex structural challenges and high-level security integration.</p><p>Mr. Kim, CEO of Kimmex, accepted the award, stating: "This award belongs to the hundreds of engineers, architects, and workers who dedicated their skills to this national landmark. It validates our mission to build structures that define the skyline and serve the nation."</p><h3>Sustainability & Innovation</h3><p>One of the key factors impressed the judges was the building energy efficiency. We utilized advanced materials and a smart HVAC system that reduces energy consumption by 25% compared to standard regulations.</p>',
        tags: ['Awards', 'Commercial', 'Ministry of Interior', 'Gold Winner'],
    },
    'LOG-002': {
        id: 'LOG-002',
        title: 'Sihanoukville Logistics Hub: Phase 1 Initiated',
        category: 'Projects',
        date: '4h ago',
        author: 'David Chen',
        location: 'Sihanoukville',
        readTime: '3 min read',
        image: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&q=80&w=1600',
        content: '<p class="lead">Phase 1 of the massive logistics center has officially begun. This project aims to revolutionize the supply chain infrastructure in the coastal region and support the growing export sector.</p>',
        tags: ['Logistics', 'Sihanoukville']
    },
    'default': {
        id: 'ERR-404',
        title: 'Article Not Found',
        category: 'Error',
        date: '-',
        author: 'System',
        location: '-',
        readTime: '-',
        image: 'https://images.unsplash.com/photo-1504384308090-c54be3852f92?auto=format&fit=crop&q=80&w=1600',
        content: '<p>The article you are looking for does not exist or has been removed.</p>',
        tags: []
    }
};

const relatedNews = [
    {
        id: 'LOG-002',
        title: 'Sihanoukville Logistics Hub: Phase 1 Initiated',
        category: 'Projects',
        date: '4h ago',
        image: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: 'LOG-003',
        title: 'New Safety Milestone Achieved',
        category: 'Safety',
        date: '6h ago',
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: 'LOG-004',
        title: 'Green Build Initiative Launch',
        category: 'Sustainability',
        date: '1d ago',
        image: 'https://images.unsplash.com/photo-1518182170546-0766aaef3194?auto=format&fit=crop&q=80&w=600'
    }
];

export default function NewsDetailPage() {
    const params = useParams();
    // Safely handle params.id which can be string, string[], or undefined
    const id = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : null;

    // Determine which article to show
    let article = newsData['default'];

    if (id && newsData[id]) {
        article = newsData[id];
    } else if (id === 'LOG-001') {
        article = newsData['LOG-001'];
    }

    // Filter related news
    const currentRelated = relatedNews.filter(n => n.id !== article.id);

    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy">

            {/* --- ARTICLE HEADER --- */}
            <div className="bg-white pt-42 pb-8 px-6 md:px-12 max-w-[1000px] mx-auto">
                <Link href="/design-y/news" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-titan-red mb-6 hover:underline">
                    <ArrowLeft size={12} /> Back to News
                </Link>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-titan-navy leading-tight mb-6">
                    {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 border-t border-gray-100 pt-6">
                    <span className="bg-titan-navy text-white px-3 py-1 text-xs font-bold uppercase tracking-wide">
                        {article.category}
                    </span>
                    <span className="flex items-center gap-2 font-bold">
                        <Clock size={16} className="text-titan-red" /> {article.date}
                    </span>
                    <span className="flex items-center gap-2">
                        <User size={16} className="text-gray-400" /> {article.author}
                    </span>
                    {article.location && (
                        <span className="flex items-center gap-2">
                            <MapPin size={16} className="text-gray-400" /> {article.location}
                        </span>
                    )}
                </div>
            </div>

            {/* --- HERO IMAGE --- */}
            <div className="w-full max-w-[1200px] mx-auto px-6 mb-12">
                <div className="aspect-[21/9] bg-titan-bg overflow-hidden relative">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                </div>
                <p className="mt-2 text-xs text-gray-500 text-right italic">Photo: PropertyGuru Asia Property Awards</p>
            </div>


            {/* --- MAIN CONTENT & SIDEBAR --- */}
            <div className="max-w-[1200px] mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* ARTICLE BODY (8 Cols) */}
                <div className="lg:col-span-8">
                    {/* Using a standard div instead of prose to minimize complexity for debugging */}
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* Tags */}
                    <div className="mt-12 pt-8 border-t border-gray-100">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Related Topics</h4>
                        <div className="flex flex-wrap gap-2">
                            {article.tags?.map((tag: string) => (
                                <span key={tag} className="px-3 py-1 border border-gray-200 text-titan-navy text-xs font-bold uppercase hover:bg-titan-navy hover:text-white transition-colors cursor-pointer rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* SIDEBAR (4 Cols) */}
                <div className="lg:col-span-4 space-y-12">

                    {/* Share Widget */}
                    <div className="bg-gray-50 p-6 border-t-4 border-titan-navy">
                        <h3 className="text-sm font-bold text-titan-navy uppercase tracking-widest mb-4">Share Article</h3>
                        <div className="flex gap-2">
                            <button className="flex-1 py-3 bg-white border border-gray-200 hover:border-titan-navy text-titan-navy transition-colors flex items-center justify-center"><Facebook size={18} /></button>
                            <button className="flex-1 py-3 bg-white border border-gray-200 hover:border-titan-navy text-titan-navy transition-colors flex items-center justify-center"><Twitter size={18} /></button>
                            <button className="flex-1 py-3 bg-white border border-gray-200 hover:border-titan-navy text-titan-navy transition-colors flex items-center justify-center"><Linkedin size={18} /></button>
                            <button className="flex-1 py-3 bg-white border border-gray-200 hover:border-titan-navy text-titan-navy transition-colors flex items-center justify-center"><Share2 size={18} /></button>
                        </div>
                    </div>

                    {/* More News */}
                    <div>
                        <h3 className="text-lg font-bold text-titan-navy mb-6 flex items-center gap-3">
                            <div className="w-2 h-8 bg-titan-red"></div> More News
                        </h3>
                        <div className="space-y-6">
                            {currentRelated.map(item => (
                                <Link href={`/design-y/news/${item.id}`} key={item.id} className="group block">
                                    <div className="aspect-video bg-titan-bg mb-3 relative overflow-hidden">
                                        <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <h4 className="font-bold text-titan-navy leading-tight group-hover:text-titan-red transition-colors mb-2">
                                        {item.title}
                                    </h4>
                                    <span className="text-xs font-bold text-gray-400 uppercase">{item.date}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>

            </div>

            <style jsx global>{`
                .lead {
                    font-size: 1.25rem;
                    line-height: 1.8;
                    color: #4a5568;
                    font-weight: 500;
                    margin-bottom: 2rem;
                }
                .prose h3 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #0A192F;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                }
                .prose p {
                    margin-bottom: 1.5rem;
                }
            `}</style>
        </div>
    );
}
