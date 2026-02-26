'use client';

import React, { Suspense } from 'react';
import { HardHat, Clock } from 'lucide-react';
import ProjectListingPage from '../../components/ProjectListingPage';
import { useLanguage } from '../../context/LanguageContext';

export default function ImplementationProjectsPage() {
    const { t } = useLanguage();

    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-100">Loading...</div>}>
            <ProjectListingPage
                title={<h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                    {t('Projects')} <span className="text-titan-red">{t('IN PROGRESS')}</span>
                </h1>}
                subtitle={t('Project In Progress Sub')}
                heroTag={t('Currently Active')}
                heroIcon={<HardHat size={12} className="text-titan-red" />}
                heroImage="/images/projects/Thumbnail-6.jpg"
                filterStatus="Under Construction"
                categories={['All', 'Water Treatment Plant', 'Systems']}
                badgeConfig={{
                    className: "bg-titan-navy text-white",
                    icon: <Clock size={10} />,
                    label: "Under Construction"
                }}
                emptyState={{
                    title: t('No projects in progress found'),
                    message: t('Check back soon for updates.')
                }}
            />
        </Suspense>
    );
}
