'use client';

import React, { useState, useEffect } from 'react';
import MenuOverlay from '@/components/design-a/MenuOverlay';
import '../globals.css';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Full Content Structure from Design X
    const navItems = [
        {
            label: 'About Us', href: '/about',
            children: [
                { label: 'Company Profile', href: '/about#profile', desc: 'Learn about our history' },
                { label: 'Leadership', href: '/about#leadership', desc: 'Meet our team' },
                { label: 'Quality & Safety', href: '/about#safety', desc: 'Our standards' }
            ]
        },
        {
            label: 'Services', href: '/services',
            children: [
                { label: 'Design & Build', href: '/services/design-build', desc: 'Full lifecycle solutions' },
                { label: 'Building Renovation', href: '/services/renovation', desc: 'Revitalize existing structures' },
                { label: 'Project Management', href: '/services/project-management', desc: 'Oversight & control' },
                { label: 'Consultants', href: '/services/consultants', desc: 'Expert advisory services' }
            ]
        },
        {
            label: 'Projects', href: '/projects/completed',
            children: [
                {
                    label: 'Done Projects',
                    href: '/projects/completed',
                    desc: 'View our portfolio',
                    children: [
                        { label: 'Government', href: '/projects/completed?type=Government', desc: 'Public sector works' },
                        { label: 'Public Service', href: '/projects/completed?type=Public Service', desc: 'Community infrastructure' },
                        { label: 'Private', href: '/projects/completed?type=Private', desc: 'Commercial & Residential' },
                        { label: 'Water Treatment', href: '/projects/completed?type=Water Treatment', desc: 'Industrial facilities' },
                        { label: 'Slope', href: '/projects/completed?type=Slope', desc: 'Specialized engineering' }
                    ]
                },
                {
                    label: 'Implement Projects',
                    href: '/projects/implementation',
                    desc: 'Current developments',
                    children: [
                        { label: 'Government', href: '/projects/implementation?type=Government', desc: 'Ongoing public works' },
                        { label: 'Public Service', href: '/projects/implementation?type=Public Service', desc: 'Civic projects underway' },
                        { label: 'Private', href: '/projects/implementation?type=Private', desc: 'Commercial developments' },
                        { label: 'Water Treatment', href: '/projects/implementation?type=Water Treatment', desc: 'Water infrastructure' },
                        { label: 'Slope', href: '/projects/implementation?type=Slope', desc: 'Structural reinforcement' }
                    ]
                }
            ]
        },
        {
            label: 'News', href: '/news',
            children: [
                { label: 'News & Updates', href: '/news', desc: 'Latest announcements' },
                { label: 'Doc Collection', href: '/documents', desc: 'Resources & documents' }
            ]
        },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' }
    ];

    return (
        <div className="bg-white md:bg-[#E5E5E5] min-h-screen md:p-6 font-sans text-titan-navy selection:bg-titan-navy selection:text-white transition-colors duration-500">
            {/* --- MAIN CONTAINER --- */}
            <div className="bg-white rounded-none md:rounded-[3rem] min-h-[calc(100vh-3rem)] shadow-none md:shadow-2xl overflow-hidden relative mx-auto max-w-[1920px]">
                {/* --- NAVIGATION (Minimal / Hidden Concept) --- */}
                <div className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 pointer-events-none ${scrolled ? 'py-4' : 'py-6 md:py-8'}`}>
                    <div className="px-6 md:px-12 flex justify-between items-start">

                        {/* Logo (Top Left) */}
                        <div className="bg-white/90 backdrop-blur shadow-sm px-5 py-3 rounded-full flex items-center gap-3 pointer-events-auto">
                            <div className="w-3 h-3 bg-titan-red rounded-full animate-pulse"></div>
                            <span className="font-bold text-lg tracking-tight">KIMMEX</span>
                        </div>

                        {/* Menu Trigger (Top Right) */}
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

                {children}

            </div>
        </div>
    );
}
