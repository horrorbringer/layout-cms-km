'use client';

import React, { Suspense } from 'react';
import { HardHat, Clock } from 'lucide-react';
import ProjectListingPage from '../../components/ProjectListingPage';

export default function ImplementationProjectsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-100">Loading...</div>}>
            <ProjectListingPage
                title={<h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                    PROJECTS <span className="text-titan-red">IN PROGRESS</span>
                </h1>}
                subtitle="Witness our ongoing commitment to building the future. These projects are currently under construction and shaping the skyline."
                heroTag="Currently Active"
                heroIcon={<HardHat size={12} className="text-titan-red" />}
                heroImage="/images/projects/Thumbnail-6.jpg"
                filterStatus="Under Construction"
                categories={['All', 'Water Treatment Plant', 'Systems']}
                badgeConfig={{
                    className: "bg-titan-navy text-white",
                    icon: <Clock size={10} />,
                    label: "Under Construction"
                }}
                emptyState={{
                    title: "No projects in progress found.",
                    message: "Check back soon for updates."
                }}
            />
        </Suspense>
    );
}
