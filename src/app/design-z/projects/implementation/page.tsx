import React, { Suspense } from 'react';
import { HardHat, Clock } from 'lucide-react';
import ProjectListingPage from '../../components/ProjectListingPage';
import prisma from '@/lib/prisma';

export default async function ImplementationProjectsPage() {
    // Fetch ongoing projects from the database
    const projectsFromDb = await prisma.project.findMany({
        where: { status: 'ONGOING' },
        orderBy: { createdAt: 'desc' }
    });

    // Helper to map DB category to frontend filter category
    const mapCategory = (cat: string) => {
        const mapping: Record<string, string> = {
            'GOVERNMENT_OFFICE': 'Government Office Building',
            'WATER_TREATMENT': 'Water Treatment Plant',
            'SLOP_CONSTRUCTION': 'Slope Construction',
            'SYSTEMS': 'Systems',
            'INFRASTRUCTURE': 'Infrastructure',
            'GOVERNMENT': 'Government',
            'PRIVATE_BUILDING': 'Private Building',
            'PUBLIC_SERVICE': 'Public Service'
        };
        return mapping[cat] || cat;
    };

    // Map Prisma models to the frontend's expected format
    const mappedProjects = projectsFromDb.map(p => ({
        id: p.slug,
        title: { en: p.title, kh: p.titleKm || p.title },
        location: { en: p.location || '', kh: p.locationKm || p.location || '' },
        type: { en: mapCategory(p.category), kh: mapCategory(p.category) },
        status: { en: 'Under Construction', kh: 'Under Construction' },
        image: p.heroImage || '/images/projects/Thumbnail-1.jpg',
        summary: { en: p.description || '', kh: p.descriptionKm || p.description || '' }
    }));

    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-100">Loading...</div>}>
            <ProjectListingPage
                title={<h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                    Projects <span className="text-titan-red">IN PROGRESS</span>
                </h1>}
                subtitle="Currently managing and executing landmark projects across the Kingdom."
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
                    title: "No projects in progress found",
                    message: "Check back soon for updates."
                }}
                initialProjects={mappedProjects}
            />
        </Suspense>
    );
}
