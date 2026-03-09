import React from 'react';
import prisma from '@/lib/prisma';
import NewsListView, { NewsItem } from '../_components/NewsListView';

export const dynamic = 'force-dynamic';

export default async function NewsAdmin() {
    const articles = await prisma.newsArticle.findMany({
        orderBy: { publishedAt: 'desc' }
    });

    const mappedNews: NewsItem[] = articles.map(article => ({
        id: article.slug,
        title: {
            en: article.title,
            kh: article.titleKm || ''
        },
        category: article.category,
        date: {
            en: article.publishedAt.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            kh: article.publishedAt.toLocaleDateString('km-KH') // Simple toggle
        },
        readTime: {
            en: article.readTime || '5 min read',
            kh: article.readTimeKm || '៥ នាទី'
        },
        image: article.coverImage || '',
        excerpt: {
            en: article.excerpt || '',
            kh: article.excerptKm || ''
        },
        featured: article.isFeatured,
        trending: article.isTrending,
        author: {
            en: article.authorName || 'Kim Mex Admin',
            kh: article.authorNameKm || 'រដ្ឋបាល Kim Mex'
        },
        year: article.year || article.publishedAt.getFullYear().toString(),
        content: {
            en: article.content,
            kh: article.contentKm || ''
        },
        tags: article.tags
    }));

    return <NewsListView initialNews={mappedNews} />;
}
