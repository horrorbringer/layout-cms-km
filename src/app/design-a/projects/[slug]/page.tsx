'use client';

import React, { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Building, CheckCircle, HardHat } from 'lucide-react';
import Link from 'next/link';
import Image from "next/image";
import { projects } from '../../../design-x/data/projectData';
import Footer from '@/components/design-a/Footer';
import MenuOverlay from '@/components/design-a/MenuOverlay';

export default function ProjectDetailPage() {
    const params = useParams();
    const slug = params?.slug;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const project = projects.find(p => p.id === slug);

    if (!project) {
        notFound();
    }

    // Reuse Nav Items structure from completed items
    const navItems = [
        {
            label: 'About Us', href: '/design-a/about',
            children: [
                { label: 'Company Profile', href: '/design-a/about#profile', desc: 'Learn about our history' },
                { label: 'Leadership', href: '/design-a/about#leadership', desc: 'Meet our team' },
                { label: 'Quality & Safety', href: '/design-a/about#safety', desc: 'Our standards' }
            ]
        },
        {
            label: 'Services', href: '/design-a/services',
            children: [
                { label: 'Design & Build', href: '/design-a/services/design-build', desc: 'Full lifecycle solutions' },
                { label: 'Building Renovation', href: '/design-a/services/renovation', desc: 'Revitalize existing structures' },
                { label: 'Project Management', href: '/design-a/services/project-management', desc: 'Oversight & control' },
                { label: 'Consultants', href: '/design-a/services/consultants', desc: 'Expert advisory services' }
            ]
        },
        {
            label: 'Projects', href: '/design-a/projects',
            children: [
                {
                    label: 'Done Projects',
                    href: '/design-a/projects/completed',
                    desc: 'View our portfolio',
                    children: [
                        { label: 'Government', href: '/design-a/projects/completed?type=Government', desc: 'Public sector works' },
                        { label: 'Public Service', href: '/design-a/projects/completed?type=Public Service', desc: 'Community infrastructure' },
                        { label: 'Private', href: '/design-a/projects/completed?type=Private', desc: 'Commercial & Residential' },
                        { label: 'Water Treatment', href: '/design-a/projects/completed?type=Water Treatment', desc: 'Industrial facilities' },
                        { label: 'Slope', href: '/design-a/projects/completed?type=Slope', desc: 'Specialized engineering' }
                    ]
                },
                {
                    label: 'Implement Projects',
                    href: '/design-a/projects/implementation',
                    desc: 'Current developments',
                    children: [
                        { label: 'Government', href: '/design-a/projects/implementation?type=Government', desc: 'Ongoing public works' },
                        { label: 'Public Service', href: '/design-a/projects/implementation?type=Public Service', desc: 'Civic projects underway' },
                        { label: 'Private', href: '/design-a/projects/implementation?type=Private', desc: 'Commercial developments' },
                        { label: 'Water Treatment', href: '/design-a/projects/implementation?type=Water Treatment', desc: 'Water infrastructure' },
                        { label: 'Slope', href: '/design-a/projects/implementation?type=Slope', desc: 'Structural reinforcement' }
                    ]
                }
            ]
        },
        {
            label: 'News', href: '/design-a/news',
            children: [
                { label: 'News & Updates', href: '/design-a/news', desc: 'Latest announcements' },
                { label: 'Doc Collection', href: '/design-a/documents', desc: 'Resources & documents' }
            ]
        },
        { label: 'Careers', href: '/design-a/careers' },
        { label: 'Contact', href: '/design-a/contact' }
    ];

    return (
        <div className="bg-white md:bg-[#E5E5E5] min-h-screen md:p-6 text-titan-navy selection:bg-titan-navy selection:text-white transition-colors duration-500">
            {/* Main Container */}
            <div className="bg-white rounded-none md:rounded-[3rem] min-h-[calc(100vh-3rem)] shadow-none md:shadow-2xl overflow-hidden relative mx-auto max-w-[1920px] pb-20">

                {/* --- NAVIGATION (Matches completed/page.tsx pattern) --- */}
                <div className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 pointer-events-none ${scrolled ? 'py-4' : 'py-6 md:py-8'}`}>
                    <div className="px-6 md:px-12 flex justify-between items-start">
                        {/* Logo Left - With Back Logic Integration? Or Standard Logo */}
                        <div className="bg-white/90 backdrop-blur shadow-sm px-5 py-2.5 rounded-full flex items-center gap-3 pointer-events-auto">
                            <Image src="/logo.png" alt="Kimmex Logo" width={28} height={28} className="object-contain" />
                            <span className="font-bold text-lg tracking-tight">KIMMEX</span>
                        </div>

                        {/* Menu Trigger Right */}
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="bg-titan-navy text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-titan-red transition-all shadow-lg flex items-center gap-3 pointer-events-auto group"
                        >
                            <span className="hidden md:inline group-hover:-translate-x-1 transition-transform">Menu</span>
                            <div className="flex flex-col gap-1.5 items-end">
                                <span className="w-6 h-0.5 bg-white group-hover:w-4 transition-all"></span>
                                <span className="w-4 h-0.5 bg-white group-hover:w-6 transition-all"></span>
                            </div>
                        </button>
                    </div>
                </div>

                <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navItems={navItems} />

                {/* --- BACK BUTTON (Floating, below nav) --- */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-24 left-6 md:left-12 z-30"
                >
                    <Link href="/design-a/projects/completed" className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest text-white hover:bg-white hover:text-titan-navy transition-all">
                        <ArrowLeft size={14} /> Back
                    </Link>
                </motion.div>

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
                        <div className="bg-[#F5F5F7] p-8 rounded-3xl sticky top-24">
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
                                    href="/design-a/contact"
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
            </div>
        </div>
    );
}
