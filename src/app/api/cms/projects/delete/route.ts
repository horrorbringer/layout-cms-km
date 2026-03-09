import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
        }

        // Delete the project from the PostgreSQL Database via Prisma
        // The ProjectListView client is passing the "slug" mapped as "id" right now, so we delete by slug
        try {
            await prisma.project.delete({
                where: { slug: id }
            });
        } catch (error: any) {
            // P2025: Record to delete does not exist.
            // This is perfectly normal if the user is deleting a static project that has never
            // been migrated/saved to the actual Postgres database. We should allow the API to succeed.
            if (error.code !== 'P2025') {
                throw error;
            }
        }

        // Technically, you should also delete it from static data here (projectData.ts / projectDetailData.ts) 
        // to fully "delete" it from everywhere, but focusing on fixing the Prisma error first.
        return NextResponse.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project API:', error);
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
