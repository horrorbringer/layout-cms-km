'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';
import ProjectListingPage from '../../components/ProjectListingPage';

export default function CompletedProjectsPage() {
    return (
        <ProjectListingPage
            title={<h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
                DONE <span className="text-titan-red">PROJECTS</span>
            </h1>}
            subtitle="A portfolio of successfully delivered landmarks, infrastructure, and commercial developments across Cambodia."
            heroTag="Success Stories"
            heroIcon={<CheckCircle size={12} className="text-titan-red" />}
            heroImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
            filterStatus="Completed"
            badgeConfig={{
                className: "bg-white text-green-700",
                icon: <CheckCircle size={10} />,
                label: "Completed"
            }}
            emptyState={{
                title: "No completed projects found matching criteria.",
                message: "Try adjusting your filters."
            }}
        />
    );
}
