import React from 'react';
import ProjectListView from '../_components/ProjectListView';
import prisma from '@/lib/prisma';

// Server-side translation helper
const getLocalText = (obj: any, lang: 'en' | 'kh') => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj.en || '';
};

export default async function ProjectsAdmin() {
    const language = 'en'; // Assuming default admin locale for server fetches

    const projectsData = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
    });

    // Map Prisma to match the expected structure of ProjectListView
    const dbProjectsMapped = projectsData.map(p => ({
        id: p.slug, // Using slug as ID since original static data relied on slug-like IDs
        title: { en: p.title, kh: p.titleKm || p.title },
        location: { en: p.location || '', kh: p.locationKm || p.location || '' },
        type: { en: p.category, kh: p.category },
        status: { en: p.status, kh: p.status },
        image: p.heroImage || '/images/projects/Thumbnail-1.jpg',
    }));

    // Import static projects fallback
    const { projects: staticProjects } = await import('@/app/design-z/data/projectData');

    // Create lookup map for existing DB ids
    const dbIds = new Set(dbProjectsMapped.map(p => p.id));

    // Find static projects not yet in the DB
    const missingStaticProjects = staticProjects.filter(sp => !dbIds.has(sp.id));

    // Merge them together securely
    const combinedProjects = [...dbProjectsMapped, ...missingStaticProjects];

    return (
        <ProjectListView initialProjects={combinedProjects} />
    );
}
