'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Flag, Shield, Award, Users, TrendingUp, UserCheck, Warehouse, PencilRuler, HardHat, FileBarChart } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy relative">
            {/* --- HEADER BACKGROUND SPACER --- */}
            <div className="absolute top-0 left-0 w-full h-32 bg-titan-navy z-0"></div>

            {/* --- HERO --- */}
            <section className="pt-48 pb-20 px-6 max-w-[1400px] mx-auto text-center relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-8xl font-black text-titan-navy mb-6 tracking-tighter"
                >
                    ABOUT COMPANY
                </motion.h1>
                <div className="w-24 h-2 bg-titan-red mx-auto mb-8"></div>
            </section>

            {/* --- WHO WE ARE (Split Layout) --- */}
            <section className="px-6 pb-32 max-w-[1400px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Left: Image Context */}
                    <div className="lg:w-1/2 relative">
                        <div className="absolute top-4 left-4 w-full h-full border-2 border-titan-navy/5 rounded-2xl z-0 translate-x-4 translate-y-4"></div>
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                            <img
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
                                alt="Office Team"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-titan-navy/20"></div>
                        </div>
                    </div>

                    {/* Right: Who We Are Content */}
                    <div className="lg:w-1/2 space-y-10">
                        <div>
                            <span className="text-titan-red font-bold uppercase tracking-widest text-xs mb-2 block">Our Identity</span>
                            <h2 className="text-4xl font-black text-titan-navy mb-6">Who We Are</h2>
                            <p className="text-titan-navy-subtle text-lg leading-relaxed">
                                Since our inception, KIM MEX Construction has been a cornerstone of Cambodia's infrastructure development. We are more than builders; we are partners in national progress, dedicated to delivering excellence in every beam, brick, and blueprint.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Mission */}
                            <div className="flex gap-6 group">
                                <div className="w-16 h-16 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-titan-navy shadow-sm shrink-0 group-hover:border-titan-red group-hover:bg-titan-red group-hover:text-white transition-all duration-300">
                                    <Flag size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-titan-navy mb-2 group-hover:text-titan-red transition-colors">Our Mission</h3>
                                    <p className="text-titan-navy-subtle text-sm leading-relaxed">
                                        To bridge the gap between concept and reality through exceptional engineering, rigorous safety standards, and a commitment to client satisfaction.
                                    </p>
                                </div>
                            </div>

                            {/* Vision */}
                            <div className="flex gap-6 group">
                                <div className="w-16 h-16 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-titan-navy shadow-sm shrink-0 group-hover:border-titan-red group-hover:bg-titan-red group-hover:text-white transition-all duration-300">
                                    <Eye size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-titan-navy mb-2 group-hover:text-titan-red transition-colors">Our Vision</h3>
                                    <p className="text-titan-navy-subtle text-sm leading-relaxed">
                                        To be the most trusted and innovative construction partner in Cambodia, setting new standards for quality, safety, and sustainable development.
                                    </p>
                                </div>
                            </div>

                            {/* Goal */}
                            <div className="flex gap-6 group">
                                <div className="w-16 h-16 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-titan-navy shadow-sm shrink-0 group-hover:border-titan-red group-hover:bg-titan-red group-hover:text-white transition-all duration-300">
                                    <Target size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-titan-navy mb-2 group-hover:text-titan-red transition-colors">Our Goal</h3>
                                    <p className="text-titan-navy-subtle text-sm leading-relaxed">
                                        To complete every project on time and within budget while maintaining zero-accident safety records and contributing to national growth.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* --- CEO MESSAGE & STORY --- */}
            <section className="px-6 pb-32 max-w-[1400px] mx-auto">
                <div className="bg-titan-navy rounded-2xl overflow-hidden text-white flex flex-col lg:flex-row">
                    <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center relative">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-titan-red opacity-10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                        <h2 className="text-4xl font-black mb-8 relative z-10">A Message from CEO</h2>
                        <div className="text-xl font-light italic leading-relaxed opacity-90 mb-8 relative z-10">
                            "Construction is not just about concrete and steel. It's about building trust, fostering communities, and leaving a legacy that stands the test of time. At KIM MEX, we pour our heart into every foundation we lay."
                        </div>
                        <div className="relative z-10">
                            <span className="block font-bold text-lg">Mr. Kimmex Founder</span>
                            <span className="text-titan-red text-sm uppercase tracking-widest font-bold">Chief Executive Officer</span>
                        </div>
                    </div>
                    <div className="lg:w-1/2 relative min-h-[400px]">
                        <img
                            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop"
                            alt="CEO Portrait"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* --- MILESTONES --- */}
            <section className="px-6 pb-32 max-w-[1200px] mx-auto">
                <div className="text-center mb-16">
                    <span className="text-titan-red font-bold uppercase tracking-widest text-xs mb-2 block">Our Journey</span>
                    <h2 className="text-4xl font-black text-titan-navy">Milestones</h2>
                </div>

                <div className="relative space-y-12 md:space-y-24">
                    {/* Central Line for Desktop */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2"></div>
                    {/* Mobile Line */}
                    <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-gray-200"></div>

                    {[
                        {
                            year: '2015',
                            title: 'Foundation',
                            desc: 'KIM MEX Construction was established with a vision to redefine Cambodia\'s skyline. Starting with a humble team of 10 engineers, we laid the first stone of our legacy.',
                            image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop'
                        },
                        {
                            year: '2018',
                            title: 'Major Expansion',
                            desc: 'Following successful commercial projects in Phnom Penh, we expanded our operations to Siem Reap and Sihanoukville, securing contracts for major hotel resorts.',
                            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop'
                        },
                        {
                            year: '2020',
                            title: 'ISO Certification',
                            desc: 'Our commitment to excellence was recognized with ISO 9001:2015 accreditation, validating our rigorous Quality Management Systems and safety protocols.',
                            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop'
                        },
                        {
                            year: '2023',
                            title: 'National Recognition',
                            desc: 'Awarded "Top Infrastructure Partner" by the Ministry of Public Works for our contribution to national road development projects.',
                            image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop'
                        }
                    ].map((item, i) => (
                        <div key={i} className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 group ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>

                            {/* Card Content (One Side) */}
                            <div className={`w-full md:w-5/12 ${i % 2 === 0 ? 'md:text-right md:pr-12 pl-12 md:pl-0' : 'md:text-left md:pl-12 pl-12'}`}>
                                <h3 className="text-6xl font-black text-titan-red/10 group-hover:text-titan-red/20 transition-colors leading-none -mb-4 relative z-0">{item.year}</h3>
                                <h4 className="text-2xl font-bold text-titan-navy mb-3 relative z-10">{item.title}</h4>
                                <p className="text-titan-navy-subtle text-sm leading-relaxed relative z-10">{item.desc}</p>
                            </div>

                            {/* Center Dot */}
                            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-white border-4 border-titan-navy rounded-full group-hover:border-titan-red transition-all z-20 -translate-x-1/2 md:-translate-x-1/2 shadow-lg scale-100 group-hover:scale-125"></div>

                            {/* Image Visual (Other Side) */}
                            <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                                <div className="aspect-[16/9] rounded-lg overflow-hidden shadow-lg transform group-hover:-translate-y-2 transition-transform duration-500 border border-gray-100">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-all duration-700" />
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </section>

            {/* --- OUR TEAM (PHOTO HIERARCHY - ORG CHART STYLE) --- */}
            <section id="leadership" className="px-6 pb-20 max-w-[1400px] mx-auto">
                <div className="text-center mb-16">
                    <span className="text-titan-red font-bold uppercase tracking-widest text-xs mb-2 block">The Leaders</span>
                    <h2 className="text-4xl font-black text-titan-navy">Our Leadership Structure</h2>
                    <div className="w-20 h-1 bg-titan-red mx-auto mt-4"></div>
                </div>

                <div className="flex flex-col items-center w-full">

                    {/* LEVEL 1: CEO */}
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="text-center group bg-white relative z-10">
                            <div className="w-64 h-80 bg-gray-200 rounded-lg overflow-hidden mb-6 relative shadow-lg mx-auto ring-4 ring-white">
                                <img
                                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop"
                                    alt="Okhna. TOUCH KIM"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <h3 className="text-xl font-black text-titan-navy uppercase">Okhna. TOUCH KIM</h3>
                            <p className="text-xs font-bold text-titan-red tracking-widest mt-1">CHIEF EXECUTIVE OFFICER</p>
                        </div>
                        {/* Connecting Line Down from CEO */}
                        <div className="hidden lg:block w-px h-16 bg-gray-300"></div>
                    </div>

                    {/* LEVEL 2: SENIOR MANAGEMENT */}
                    <div className="w-full max-w-7xl relative px-4">

                        {/* Horizontal Bridge Line (Desktop Only) */}
                        {/* Helps connect the 5 children. Manually adjusted percentage for 5 items centered. */}
                        <div className="hidden lg:block absolute top-0 left-[10%] right-[10%] h-px bg-gray-300"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 pt-0 lg:pt-0 justify-items-center">
                            {[
                                { name: 'MR. PAUCH BUNPHEAKDEY', role: 'DEPUTY GENERAL MANAGER' },
                                { name: 'MR. LENG VANNARITH', role: 'FINANCE DIRECTOR' },
                                { name: 'MR. OUNG CHAKNORA', role: 'SENIOR PROJECT MANAGER' },
                                { name: 'MR. SUM ROTANA', role: 'PROJECT MANAGER' },
                                { name: 'MR. KRAI KEAK', role: 'MEP OPERATION PROJECT MANAGER' },
                            ].map((leader, i) => (
                                <div key={i} className="flex flex-col items-center w-full relative group">
                                    {/* Vertical Line Up to Bridge (Desktop Only) */}
                                    <div className="hidden lg:block w-px h-16 bg-gray-300 mb-4"></div>

                                    <div className="text-center w-full max-w-[220px]">
                                        <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-4 relative shadow-md mx-auto group-hover:-translate-y-2 transition-transform duration-300 bg-white ring-2 ring-transparent group-hover:ring-titan-red/20">
                                            <img
                                                src={`https://images.unsplash.com/photo-${1550000000000 + i}?q=80&w=600&auto=format&fit=crop`}
                                                alt={leader.name}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                            />
                                        </div>
                                        <h4 className="text-sm font-black text-titan-navy uppercase leading-tight min-h-[40px] flex items-start justify-center">{leader.name}</h4>
                                        <p className="text-[10px] font-bold text-gray-400 tracking-wider mt-1">{leader.role}</p>
                                    </div>

                                    {/* Connector to Level 3 (Optional, purely visual for flow) */}
                                    {/* Only distinct vertical lines if we assume direct reporting, otherwise just gap */}
                                    {/* <div className="hidden lg:block w-px h-8 bg-gray-200 mt-4 opacity-30"></div> */}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* GAP betwen levels */}
                    <div className="h-16 w-px bg-gradient-to-b from-gray-200 to-transparent hidden lg:block my-8"></div>

                    {/* LEVEL 3: DEPARTMENT MANAGERS */}
                    <div className="w-full max-w-5xl">
                        <div className="text-center mb-8 relative">
                            <span className="bg-white px-4 text-titan-navy-subtle text-xs font-bold uppercase tracking-widest relative z-10">Department Heads</span>
                            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-100 -z-0"></div>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
                            {[
                                { name: 'MR. CHHUNDY RYTA', role: 'DEPUTY ARCHITECT MANAGER' },
                                { name: 'MR. TOUCH PUTHEANY', role: 'MEP DESIGN MANAGER' },
                                { name: 'MR. RY KEN', role: 'DEPUTY QS MANAGER' },
                                { name: 'MR. HONG BUNNA', role: 'WAREHOUSE MANAGER' },
                            ].map((leader, i) => (
                                <div key={i} className="text-center group">
                                    <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-4 relative shadow-md mx-auto max-w-[200px] hover:shadow-xl transition-shadow">
                                        <img
                                            src={`https://images.unsplash.com/photo-${1560000000000 + i}?q=80&w=600&auto=format&fit=crop`}
                                            alt={leader.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                                        />
                                    </div>
                                    <h4 className="text-xs font-black text-titan-navy uppercase">{leader.name}</h4>
                                    <p className="text-[10px] font-bold text-gray-400 tracking-wider mt-1">{leader.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>
            <section className="px-6 pb-32 max-w-[1400px] mx-auto bg-gray-50 -mx-6 py-20">
                <div className="text-center mb-16 px-6">
                    <span className="text-titan-red font-bold uppercase tracking-widest text-xs mb-2 block">Our Team</span>
                    <h2 className="text-4xl font-black text-titan-navy">Leadership & Management Structure</h2>
                </div>

                <div className="max-w-[1400px] mx-auto px-6 overflow-x-auto pb-12">
                    <div className="min-w-[1000px] flex flex-col items-center">

                        {/* Level 1: Leadership */}
                        <div className="bg-titan-navy text-white p-6 rounded-lg shadow-lg w-72 text-center relative z-10">
                            <h4 className="font-bold text-lg">Board of Directors</h4>
                        </div>

                        {/* Level 1 Connector */}
                        <div className="w-0.5 h-12 bg-gray-300"></div>

                        {/* Level 2: Management Team */}
                        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-titan-red w-72 text-center relative z-10">
                            <h4 className="font-bold text-titan-navy">Management Team</h4>
                        </div>

                        {/* Level 2 Connector */}
                        <div className="w-0.5 h-12 bg-gray-300"></div>

                        {/* Horizontal Bar */}
                        <div className="w-[90%] h-0.5 bg-gray-300 relative">
                            {/* Vertical Lines to Nodes */}
                            <div className="absolute top-0 left-0 w-0.5 h-8 bg-gray-300"></div>
                            <div className="absolute top-0 left-[14%] w-0.5 h-8 bg-gray-300"></div>
                            <div className="absolute top-0 left-[28%] w-0.5 h-8 bg-gray-300"></div>
                            <div className="absolute top-0 left-[42%] w-0.5 h-8 bg-gray-300"></div>
                            <div className="absolute top-0 right-[42%] w-0.5 h-8 bg-gray-300"></div>
                            <div className="absolute top-0 right-[28%] w-0.5 h-8 bg-gray-300"></div>
                            <div className="absolute top-0 right-[14%] w-0.5 h-8 bg-gray-300"></div>
                            <div className="absolute top-0 right-0 w-0.5 h-8 bg-gray-300"></div>
                        </div>

                        {/* Level 3: Departments Grid */}
                        <div className="grid grid-cols-8 gap-4 w-full mt-8">
                            {[
                                { title: 'Finance', icon: FileBarChart },
                                { title: 'HR', icon: Users },
                                { title: 'Purchase', icon: TrendingUp },
                                { title: 'QS', icon: PencilRuler },
                                { title: 'Warehouse', icon: Warehouse },
                                { title: 'Stock', icon: Warehouse },
                                { title: 'Site Ops', icon: HardHat },
                                { title: 'Detail Design', icon: PencilRuler },
                            ].map((dept, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <div className="bg-white p-4 rounded-lg shadow-sm border-t-2 border-titan-navy w-full h-full flex flex-col items-center justify-center text-center gap-3 hover:shadow-md transition-shadow">
                                        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-titan-red">
                                            <dept.icon size={18} />
                                        </div>
                                        <span className="font-bold text-titan-navy text-xs leading-tight">{dept.title}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* --- QUALITY & SAFETY --- */}
            <section className="px-6 py-32 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-titan-red font-bold uppercase tracking-widest text-xs mb-2 block">Our Standards</span>
                        <h2 className="text-4xl font-black text-titan-navy mb-6">Quality & Safety First</h2>
                        <p className="text-titan-navy-subtle text-lg leading-relaxed mb-8">
                            We implement rigorous Quality Assurance (QA) and Quality Control (QC) protocols on every site. Our safety record is a testament to our commitment to our workforce and our clients.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-4 text-titan-navy font-bold">
                                <Shield className="text-green-600" size={24} /> ISO 9001:2015 Certified
                            </li>
                            <li className="flex items-center gap-4 text-titan-navy font-bold">
                                <Award className="text-titan-red" size={24} /> Zero Accident Policy
                            </li>
                        </ul>
                    </div>
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop"
                            alt="Safety Inspection"
                            className="rounded-xl shadow-2xl"
                        />
                    </div>
                </div>
            </section>

        </div>
    );
}
