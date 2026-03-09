import React from 'react';
import AdminOverviewView from './_components/AdminOverviewView';
import prisma from '@/lib/prisma';

// Server-side translation helper
const getLocalText = (obj: any, lang: 'en' | 'kh') => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj.en || '';
};

export default async function AdminDashboard() {
    const language = 'en'; // Assuming default admin locale for server fetches

    // 1. Fetch live metrics
    const totalProjects = await prisma.project.count();
    const activeTeam = await prisma.employee.count();
    const completedProjects = await prisma.project.count({
        where: { status: 'COMPLETED' }
    });
    const pendingProjects = totalProjects - completedProjects;

    // 2. Fetch Recent Activity
    const recentProjectsData = await prisma.project.findMany({
        take: 3,
        orderBy: { updatedAt: 'desc' },
        select: { title: true, titleKm: true, category: true, status: true, updatedAt: true }
    });

    const recentProjects = recentProjectsData.map((p, index) => {
        // Simple relative time approximation for the stub
        let timeStr = 'Just now';
        const hoursDiff = Math.floor((new Date().getTime() - p.updatedAt.getTime()) / (1000 * 60 * 60));
        if (hoursDiff > 24) timeStr = `${Math.floor(hoursDiff / 24)} days ago`;
        else if (hoursDiff > 0) timeStr = `${hoursDiff} hours ago`;

        return {
            title: getLocalText({ en: p.title, kh: p.titleKm || p.title }, language) || 'Untitled',
            category: p.category,
            status: p.status,
            date: timeStr
        };
    });

    // 3. Fetch Distribution Data
    // We'll grok the top 3 categories by raw count aggregation
    const groupByCategory = await prisma.project.groupBy({
        by: ['category'],
        _count: { category: true },
        orderBy: { _count: { category: 'desc' } },
        take: 3
    });

    const topTypes = groupByCategory.map((g, i) => {
        // Map Prisma ENUM to readable category if needed
        let readableName = g.category.replace(/_/g, ' ');
        // Title Case it
        readableName = readableName.charAt(0).toUpperCase() + readableName.slice(1).toLowerCase();

        return {
            name: readableName,
            percentage: Math.round((g._count.category / Math.max(1, totalProjects)) * 100),
            colorClass: i === 0 ? 'bg-indigo-500' : i === 1 ? 'bg-blue-500' : 'bg-emerald-500'
        };
    });

    return (
        <AdminOverviewView
            totalProjects={totalProjects}
            activeTeam={activeTeam}
            completedProjects={completedProjects}
            pendingProjects={pendingProjects}
            recentProjects={recentProjects}
            topTypes={topTypes}
        />
    );
}
