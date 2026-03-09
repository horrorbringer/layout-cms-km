import React from 'react';
import prisma from '@/lib/prisma';
import NewsDetailView from './_components/NewsDetailView';
import { notFound } from 'next/navigation';

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Fetch the specific article from the database
    const article = await prisma.newsArticle.findUnique({
        where: { slug: id },
        include: {
            author: true
        }
    });

    if (!article) {
        // Fallback or 404
        return notFound();
    }

    // Fetch related articles
    const relatedArticles = await prisma.newsArticle.findMany({
        where: {
            slug: { not: id },
            category: article.category
        },
        take: 3,
        orderBy: { publishedAt: 'desc' }
    });

    // Map Prisma model to frontend structure
    const mappedArticle = {
        id: article.slug,
        title: { en: article.title, kh: article.titleKm || article.title },
        category: article.category,
        date: { en: article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US') : '', kh: '' },
        author: { en: article.authorName || article.author?.name || 'KM Admin', kh: article.authorNameKm || article.author?.roleKm || 'KM Admin' },
        readTime: { en: article.readTime || '5 min read', kh: article.readTimeKm || '5 min read' },
        image: article.coverImage || '/images/projects/Thumbnail-1.jpg',
        content: { en: article.content, kh: article.contentKm || article.content },
        gallery: article.gallery || [],
        tags: article.tags || [],
        // Documents are not currently in NewsArticle model but can be fetched if needed
        documents: []
    };

    const mappedRelated = relatedArticles.map(n => ({
        id: n.slug,
        title: { en: n.title, kh: n.titleKm || n.title },
        date: { en: n.publishedAt ? new Date(n.publishedAt).toLocaleDateString('en-US') : '', kh: '' },
        image: n.coverImage || '/images/projects/Thumbnail-1.jpg'
    }));

    return (
        <NewsDetailView
            initialArticle={mappedArticle}
            initialRelated={mappedRelated}
        />
    );
}
