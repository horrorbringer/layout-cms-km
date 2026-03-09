import React, { Suspense } from 'react';
import { CheckCircle } from 'lucide-react';
import ProjectListingPage from '../../components/ProjectListingPage';
import prisma from '@/lib/prisma';

export default async function CompletedProjectsPage() {
    // Fetch completed projects from the database
    const projectsFromDb = await prisma.project.findMany({
        where: { status: 'COMPLETED' },
        orderBy: { completionDate: 'desc' }
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
        status: { en: 'Completed', kh: 'Completed' },
        image: p.heroImage || '/images/projects/Thumbnail-1.jpg',
        summary: { en: p.description || '', kh: p.descriptionKm || p.description || '' }
    }));

    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-100 ">Loading...</div>}>
            <ProjectListingPage
                title={<h1 className="text-4xl md:text-8xl font-black text-white mb-6 tracking-tighter ">
                    LATEST <span className="text-titan-red">Projects</span>
                </h1>}
                subtitle="Explore our portfolio of successfully delivered projects across Cambodia."
                heroTag="Success Stories"
                heroIcon={<CheckCircle size={12} className="text-titan-red" />}
                heroImage="/images/projects/Thumbnail-1.jpg"
                filterStatus="Completed"
                badgeConfig={{
                    className: "bg-white text-green-700 ",
                    icon: <CheckCircle size={10} />,
                    label: "Completed"
                }}
                emptyState={{
                    title: "No completed projects found",
                    message: "Try adjusting your filters."
                }}
                initialProjects={mappedProjects}
            />
        </Suspense>
    );
}
