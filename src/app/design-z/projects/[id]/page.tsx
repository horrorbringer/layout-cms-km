import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ProjectDetailView from './_components/ProjectDetailView';
import { projectDetails as staticProjectDetails } from '../../data/projectDetailData';
import { projects as staticProjects } from '../../data/projectData';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Fetch project from database
    const dbProject = await prisma.project.findUnique({
        where: { slug: id },
        include: { gallery: true }
    });

    if (!dbProject && !staticProjectDetails[id]) {
        notFound();
    }

    // Helper to map DB category to frontend display category
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

    // Map Prisma project to frontend format
    // If not in DB, use static detail data
    let mappedProject: any;

    if (dbProject) {
        // Find matching static details for extended info (area, sector, etc.)
        const staticDetail = staticProjectDetails[id] || {};

        mappedProject = {
            id: dbProject.slug,
            title: { en: dbProject.title, kh: dbProject.titleKm || dbProject.title },
            subtitle: staticDetail.subtitle || { en: mapCategory(dbProject.category), kh: mapCategory(dbProject.category) },
            location: { en: dbProject.location || '', kh: dbProject.locationKm || dbProject.location || '' },
            client: { en: dbProject.client || '', kh: dbProject.client || '' },
            sector: staticDetail.sector || { en: mapCategory(dbProject.category), kh: mapCategory(dbProject.category) },
            area: staticDetail.area || '',
            year: dbProject.completionDate ? new Date(dbProject.completionDate).getFullYear().toString() : staticDetail.year || '',
            status: {
                en: dbProject.status === 'COMPLETED' ? 'Completed' : 'Under Construction',
                kh: dbProject.status === 'COMPLETED' ? 'Completed' : 'Under Construction'
            },
            image: dbProject.heroImage || '/images/projects/Thumbnail-1.jpg',
            description: {
                background: { en: dbProject.description || '', kh: dbProject.descriptionKm || dbProject.description || '' },
                objectives: staticDetail.description?.objectives,
                concept: staticDetail.description?.concept
            },
            services: staticDetail.services || [],
            challenges: staticDetail.challenges || [],
            gallery: dbProject.gallery.length > 0 ? dbProject.gallery.map(img => img.url) : staticDetail.gallery || []
        };
    } else {
        const detail = staticProjectDetails[id];
        mappedProject = {
            ...detail,
            id: id
        };
    }

    // Fetch related projects
    const dbRelated = await prisma.project.findMany({
        where: {
            slug: { not: id },
            category: dbProject?.category
        },
        take: 3
    });

    const mappedRelated = dbRelated.length > 0 ? dbRelated.map(p => ({
        id: p.slug,
        title: { en: p.title, kh: p.titleKm || p.title },
        image: p.heroImage || '/images/projects/Thumbnail-1.jpg',
        type: { en: mapCategory(p.category), kh: mapCategory(p.category) }
    })) : staticProjects.filter(p => p.id !== id).slice(0, 3);

    return (
        <ProjectDetailView
            project={mappedProject}
            relatedProjects={mappedRelated}
        />
    );
}
