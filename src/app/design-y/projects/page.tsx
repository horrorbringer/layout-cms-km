'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { projects } from '../data/projectData';

const allProjects = projects;

export default function DesignYProjects() {
    const [filterCategory, setFilterCategory] = useState('All');

    // Unique Categories
    const categories = ['All', ...Array.from(new Set(allProjects.map(p => p.type)))];

    const filtered = filterCategory === 'All'
        ? allProjects
        : allProjects.filter(p => p.type === filterCategory);

    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy selection:bg-titan-red selection:text-white">

            {/* --- HEADER --- */}
            <div className="pt-40 pb-20 px-6 border-b border-titan-navy/10 bg-titan-bg relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}>
                </div>

                <div className="max-w-[1600px] mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-3 mb-6 border border-titan-navy/10 px-4 py-2 bg-white/50 backdrop-blur">
                        <span className="w-2 h-2 bg-titan-red animate-pulse"></span>
                        <span className="font-mono text-xs uppercase tracking-widest text-titan-navy/60">Portfolio Archive</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-titan-navy mb-6">
                        ENGINEERING <br className="md:hidden" /> <span className="text-transparent stroke-text-navy">EXCELLENCE</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-titan-navy/60 font-light leading-relaxed mb-12">
                        A definitive collection of infrastructure and architectural milestones defining the skyline of tomorrow.
                    </p>

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((cat, i) => (
                            <button
                                key={i}
                                onClick={() => setFilterCategory(cat)}
                                className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all border ${filterCategory === cat ? 'bg-titan-navy text-white border-titan-navy shadow-lg shadow-titan-navy/20' : 'bg-white text-titan-navy/40 border-titan-navy/10 hover:border-titan-navy hover:text-titan-navy'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- PROJECT GRID --- */}
            <div className="max-w-[1800px] mx-auto p-6 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((project, index) => (
                        <Link href={`/design-y/projects/${project.id}`} key={project.id} className="group relative block h-[500px] overflow-hidden border border-titan-navy/10 bg-titan-bg">

                            {/* Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: `url(${project.image})` }}
                            >
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-titan-navy/90 via-titan-navy/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 text-white">

                                {/* Top: ID & Status */}
                                <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                    <span className="font-mono text-xs uppercase tracking-widest text-white/60">No. {(index + 1).toString().padStart(2, '0')}</span>
                                    <span className={`inline-flex items-center px-2 py-1 text-[10px] font-bold uppercase tracking-widest border border-white/20 bg-black/20 backdrop-blur`}>
                                        {project.status || 'Active'}
                                    </span>
                                </div>

                                {/* Bottom: Info */}
                                <div>
                                    <div className="mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <span className="block text-[10px] font-bold uppercase tracking-widest text-titan-red mb-2">{project.type}</span>
                                        <h3 className="text-3xl font-bold leading-tight mb-2 group-hover:underline decoration-titan-red decoration-2 underline-offset-4">{project.title}</h3>
                                        <p className="flex items-center gap-2 text-xs font-mono uppercase text-white/60">
                                            <span className="w-1.5 h-1.5 bg-titan-red rounded-full"></span> {project.location}
                                        </p>
                                    </div>

                                    {/* Hover Reveal Description */}
                                    <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                                        <p className="text-sm text-white/80 leading-relaxed border-t border-white/20 pt-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            {project.summary}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Border Effect */}
                            <div className="absolute inset-0 border-4 border-transparent group-hover:border-titan-red/0 transition-colors pointer-events-none duration-300"></div>
                        </Link>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="py-32 text-center border-2 border-dashed border-titan-navy/10">
                        <p className="text-titan-navy/40 font-mono text-sm uppercase">No Archive Data Found</p>
                        <button onClick={() => setFilterCategory('All')} className="mt-4 text-titan-red text-xs font-bold uppercase tracking-widest hover:underline">Reset Filters</button>
                    </div>
                )}
            </div>

            {/* --- BOTTOM --- */}
            <div className="py-12 px-6 flex justify-between items-end border-t border-titan-navy/10 bg-white">
                <span className="font-mono text-[10px] uppercase tracking-widest text-titan-navy/30">Kimmex Construction © 2024</span>
                <Link href="#" className="font-bold text-titan-navy uppercase text-xs hover:text-titan-red transition-colors">Back to Top</Link>
            </div>

            <style jsx>{`
                .stroke-text-navy {
                    -webkit-text-stroke: 1px #0A192F;
                }
            `}</style>
        </div>
    );
}
