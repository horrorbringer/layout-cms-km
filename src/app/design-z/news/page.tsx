import React from 'react';
import prisma from '@/lib/prisma';
import NewsPageView from './_components/NewsPageView';

export default async function NewsPage() {
    // Fetch news from the database
    const newsFromDb = await prisma.newsArticle.findMany({
        orderBy: { publishedAt: 'desc' },
        include: {
            author: true
        }
    });

    // Map Prisma models to the frontend's expected format
    const mappedNews = newsFromDb.map(n => ({
        id: n.slug,
        title: { en: n.title, kh: n.titleKm || n.title },
        category: n.category || 'Updates',
        date: { en: n.publishedAt ? new Date(n.publishedAt).toLocaleDateString('en-US') : '', kh: '' },
        author: { en: n.authorName || n.author?.name || 'KM Admin', kh: n.authorNameKm || n.author?.roleKm || 'KM Admin' },
        readTime: { en: n.readTime || '5 min read', kh: n.readTimeKm || '5 min read' },
        image: n.coverImage || '/images/projects/Thumbnail-1.jpg',
        excerpt: { en: n.excerpt || '', kh: n.excerptKm || n.excerpt || '' },
        trending: n.isTrending,
        year: n.year || (n.publishedAt ? new Date(n.publishedAt).getFullYear().toString() : '2026')
    }));

    return (
        <NewsPageView initialNews={mappedNews} />
    );
}
