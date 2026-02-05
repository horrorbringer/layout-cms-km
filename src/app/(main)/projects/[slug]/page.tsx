'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Building, CheckCircle, HardHat } from 'lucide-react';
import Link from 'next/link';
import { projects } from '../../../design-x/data/projectData';
import Footer from '@/components/design-a/Footer';

export default function ProjectDetailPage() {
    const params = useParams();
    const slug = params?.slug;

    const project = projects.find(p => p.id === slug);

    if (!project) {
        notFound();
    }

    return (
        <main>
            {/* Note: Main container and Navigation are handled by layout.tsx in (main) group */}

            {/* --- BACK BUTTON (Floating) --- */}
            <div className="absolute top-6 left-6 md:top-8 md:left-12 z-40">
                <Link href="/projects/completed" className="bg-white/90 backdrop-blur shadow-sm px-5 py-3 rounded-full flex items-center gap-2 pointer-events-auto font-bold uppercase text-xs tracking-widest hover:bg-titan-navy hover:text-white transition-colors">
                    <ArrowLeft size={16} /> <span className="hidden md:inline">Back to Projects</span>
                </Link>
            </div>

            {/* --- HERO SECTION --- */}
            <header className="relative h-[70vh] w-full bg-titan-navy rounded-b-[4rem] overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-titan-navy via-transparent to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${project.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                                {project.status}
                            </span>
                            <span className="text-white/60 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                                <MapPin size={14} className="text-titan-red" /> {project.location}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            {project.title}
                        </h1>

                        <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                            {project.summary}
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* --- CONTENT SECTION --- */}
            <section className="px-6 md:px-12 lg:px-20 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">

                {/* Left Column: Project Stats */}
                <div className="lg:col-span-1">
                    <div className="bg-[#F5F5F7] p-8 rounded-3xl sticky top-32">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-titan-navy mb-8 border-b border-gray-200 pb-4">
                            Project Details
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Type</div>
                                <div className="font-bold text-lg flex items-center gap-2">
                                    <Building size={18} className="text-titan-red" /> {project.type}
                                </div>
                            </div>

                            <div>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Location</div>
                                <div className="font-bold text-lg flex items-center gap-2">
                                    <MapPin size={18} className="text-titan-red" /> {project.location}
                                </div>
                            </div>

                            <div>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Status</div>
                                <div className="font-bold text-lg flex items-center gap-2">
                                    {project.status === 'Completed' ? <CheckCircle size={18} className="text-green-600" /> : <HardHat size={18} className="text-orange-600" />}
                                    {project.status}
                                </div>
                            </div>

                            <div>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Client</div>
                                <div className="font-bold text-lg">
                                    Private Client
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <Link
                                href="/contact"
                                className="block w-full text-center bg-titan-navy text-white font-bold py-4 rounded-xl hover:bg-titan-red transition-colors shadow-lg shadow-titan-navy/10"
                            >
                                Inquire Similar Project
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Column: Description */}
                <div className="lg:col-span-2">
                    <div className="prose prose-lg prose-slate max-w-none">
                        <h3 className="text-2xl font-bold text-titan-navy mb-6">About the Project</h3>
                        <p>
                            Only text descriptions were provided for this project in the initial dataset.
                            In a real implementation, this section would contain detailed case study information,
                            challenges faced, solutions provided, and technical specifications of the {project.type.toLowerCase()}.
                        </p>
                        <p>
                            Kimmex Construction delivered this project in {project.location}, adhering to the highest standards of quality and safety.
                            The {project.title} stands as a testament to our commitment to engineering excellence.
                        </p>

                        <h3 className="text-2xl font-bold text-titan-navy mt-12 mb-6">Key Features</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
                            {[
                                'Advanced Structural Engineering',
                                'Sustainable Material Selection',
                                'High-Efficiency Systems',
                                'Strict Safety Compliance',
                                'On-time Delivery',
                                'Modern Architectural Design'
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                    <div className="w-2 h-2 bg-titan-red rounded-full"></div>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <h3 className="text-2xl font-bold text-titan-navy mt-12 mb-6">Gallery</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden relative group">
                                <img src={project.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Detail 1" />
                            </div>
                            <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden relative group">
                                <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Detail 2" />
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <Footer />
        </main>
    );
}
