'use client';

import React, { Suspense } from 'react';
import { HardHat, Clock } from 'lucide-react';
import ProjectListingPage from '../../components/ProjectListingPage';

export default function ImplementationProjectsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-100">Loading...</div>}>
            <ProjectListingPage
                title={<h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                    IMPLEMENTATION <span className="text-titan-red">PROJECTS</span>
                </h1>}
                subtitle="Witness our ongoing commitment to building the future. These projects are currently under construction and shaping the skyline."
                heroTag="Currently Active"
                heroIcon={<HardHat size={12} className="text-titan-red" />}
                heroImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop"
                filterStatus="Under Construction"
                badgeConfig={{
                    className: "bg-titan-navy text-white",
                    icon: <Clock size={10} />,
                    label: "Under Construction"
                }}
                emptyState={{
                    title: "No implementation projects found.",
                    message: "Check back soon for updates."
                }}
            />
        </Suspense>
    );
}
