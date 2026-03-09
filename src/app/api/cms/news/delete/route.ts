import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        // Use deleteMany to avoid throwing if record not found
        const result = await prisma.newsArticle.deleteMany({
            where: { slug: id }
        });

        if (result.count === 0) {
            return NextResponse.json({ message: 'Article not found, but consider it deleted' }, { status: 200 });
        }

        return NextResponse.json({ message: 'Article deleted successfully' });
    } catch (error) {
        console.error('Error deleting news article:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to delete article' },
            { status: 500 }
        );
    }
}

