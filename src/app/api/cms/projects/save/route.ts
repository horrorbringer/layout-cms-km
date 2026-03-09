import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ProjectCategory, ProjectStatus } from '@prisma/client';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Convert the string category to enum matching ProjectCategory
        let category: ProjectCategory = 'PUBLIC_SERVICE';
        if (data.type === 'Government Office Building') category = 'GOVERNMENT_OFFICE';
        else if (data.type === 'Water Treatment Plant') category = 'WATER_TREATMENT';
        else if (data.type === 'Slope Construction') category = 'SLOP_CONSTRUCTION';
        else if (data.type === 'Private Building') category = 'PRIVATE_BUILDING';
        else if (data.type === 'Infrastructure') category = 'INFRASTRUCTURE';
        else if (data.type === 'Government') category = 'GOVERNMENT';
        else if (data.type === 'Systems') category = 'SYSTEMS';

        const status: ProjectStatus = data.status === 'Completed' ? 'COMPLETED' : 'ONGOING';

        const extractString = (val: any): string => {
            if (!val) return '';
            if (typeof val === 'string') return val;
            return val.en || '';
        };
        const extractKhString = (val: any): string => {
            if (!val) return '';
            if (typeof val === 'string') return val;
            return val.kh || val.en || '';
        };

        const titleText = extractString(data.title);
        const titleKmText = data.titleKm || extractKhString(data.title) || titleText;
        const locationText = extractString(data.location);

        // Extract description
        const descriptionObj = data.description || {};
        const descriptionStr = extractString(descriptionObj.background) || extractString(data.summary) || '';

        const project = await prisma.project.upsert({
            where: { slug: data.id },
            update: {
                title: titleText,
                titleKm: titleKmText,
                category,
                status,
                heroImage: data.image,
                location: locationText,
                description: descriptionStr,
                client: extractString(data.client),
                // store gallery URLs if any
            },
            create: {
                slug: data.id,
                title: titleText,
                titleKm: titleKmText,
                category,
                status,
                heroImage: data.image,
                location: locationText,
                description: descriptionStr,
                client: extractString(data.client),
                // we will skip gallery mapping for simplicity on create unless handled manually
            }
        });

        // Optional: Update gallery using projectImage model if provided
        if (data.gallery && Array.isArray(data.gallery) && data.gallery.length > 0) {
            // delete existing and recreate
            await prisma.projectImage.deleteMany({
                where: { projectId: project.id }
            });
            await prisma.projectImage.createMany({
                data: data.gallery.map((url: string) => ({
                    url,
                    projectId: project.id
                }))
            });
        }

        return NextResponse.json({ success: true, project });
    } catch (error) {
        console.error('Save project error:', error);
        return NextResponse.json(
            { error: 'Failed to save project' },
            { status: 500 }
        );
    }
}
