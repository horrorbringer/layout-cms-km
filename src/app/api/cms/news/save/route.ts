import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { id, title, category, date, readTime, image, excerpt, featured, trending, author, year, content, tags } = data;

        // Validate NewsCategory enum
        const validCategories = [
            'CORPORATE', 'ENVIRONMENT', 'CSR', 'INDUSTRY', 'ANNOUNCEMENT',
            'Updates', 'Awards', 'Safety', 'Sustainability', 'Culture', 'Community', 'Innovation', 'Systems'
        ];
        const safeCategory = validCategories.includes(category) ? category : 'Updates';

        const articleData = {
            title: title?.en || '',
            titleKm: title?.kh || '',
            category: safeCategory as any,
            coverImage: image || '',
            excerpt: excerpt?.en || '',
            excerptKm: excerpt?.kh || '',
            content: content?.en || '',
            contentKm: content?.kh || '',
            isFeatured: featured || false,
            isTrending: trending || false,
            readTime: readTime?.en || '',
            readTimeKm: readTime?.kh || '',
            year: year || new Date().getFullYear().toString(),
            authorName: author?.en || '',
            authorNameKm: author?.kh || '',
            tags: Array.isArray(tags) ? tags : [],
        };

        const result = await prisma.newsArticle.upsert({
            where: { slug: id },
            update: articleData,
            create: {
                ...articleData,
                slug: id,
                publishedAt: new Date(),
            },
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error saving news article:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to save article' },
            { status: 500 }
        );
    }
}

