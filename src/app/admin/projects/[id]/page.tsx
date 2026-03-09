import React from 'react';
import ProjectForm from '../components/ProjectForm';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { projectDetails } from '@/app/design-z/data/projectDetailData';
import { projects } from '@/app/design-z/data/projectData';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const dbProject = await prisma.project.findUnique({
        where: { slug: id },
        include: { gallery: true }
    });

    if (!dbProject) {
        // Fallback to static if not found in DB
        const staticProject = projects.find(p => p.id === id);
        if (!staticProject) {
            notFound();
        }
        const details = projectDetails[id] || {};

        // We must map it the same way the database map is structured, pulling .en
        const mergedData = {
            id: staticProject.id,
            title: staticProject.title?.en || staticProject.title,
            location: staticProject.location?.en || staticProject.location,
            type: staticProject.type?.en || staticProject.type,
            status: staticProject.status?.en || staticProject.status,
            image: staticProject.image,
            summary: staticProject.summary?.en || staticProject.summary,
            client: details.client?.en || '',
            area: details.area || '',
            year: details.year || '',
            description: {
                background: details.description?.background?.en || '',
                objectives: details.description?.objectives?.en || '',
                concept: details.description?.concept?.en || ''
            },
            services: details.services?.map((s: any) => s.en) || [],
            challenges: details.challenges?.map((c: any) => c.en) || [],
            gallery: details.gallery || []
        };
        return <ProjectForm initialData={mergedData} isEditing={true} />;
    }

    // We try to merge with static details if available
    const staticDetails = projectDetails[id] || {};

    const mappedProject = {
        id: dbProject.slug,
        title: { en: dbProject.title, kh: dbProject.titleKm || dbProject.title },
        location: { en: dbProject.location || '', kh: dbProject.locationKm || dbProject.location || '' },
        type: { en: dbProject.category, kh: dbProject.category },
        status: { en: dbProject.status, kh: dbProject.status },
        image: dbProject.heroImage || '/images/projects/Thumbnail-1.jpg',
        summary: { en: dbProject.description || '', kh: dbProject.descriptionKm || dbProject.description || '' },
        client: dbProject.client || staticDetails.client?.en || '',
        area: staticDetails.area || '',
        year: staticDetails.year || (dbProject.completionDate?.getFullYear().toString()) || '',
        description: {
            background: dbProject.description || staticDetails.description?.background?.en || '',
            objectives: staticDetails.description?.objectives?.en || '',
            concept: staticDetails.description?.concept?.en || ''
        },
        services: staticDetails.services?.map((s: any) => s.en) || [],
        challenges: staticDetails.challenges?.map((c: any) => c.en) || [],
        gallery: dbProject.gallery?.length ? dbProject.gallery.map(g => g.url) : (staticDetails.gallery || [])
    };

    return <ProjectForm initialData={mappedProject} isEditing={true} />;
}
