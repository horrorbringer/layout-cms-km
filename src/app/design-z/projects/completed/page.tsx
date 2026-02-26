'use client';

import React, { Suspense } from 'react';
import { CheckCircle } from 'lucide-react';
import ProjectListingPage from '../../components/ProjectListingPage';
import { useLanguage } from '../../context/LanguageContext';

export default function CompletedProjectsPage() {
    const { t } = useLanguage();

    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-100 ">Loading...</div>}>
            <ProjectListingPage
                title={<h1 className="text-4xl md:text-8xl font-black text-white mb-6 tracking-tighter ">
                    {t('LATEST')} <span className="text-titan-red">{t('Projects')}</span>
                </h1>}
                subtitle={t('Completed Projects Sub')}
                heroTag={t('Success Stories')}
                heroIcon={<CheckCircle size={12} className="text-titan-red" />}
                heroImage="/images/projects/Thumbnail-1.jpg"
                filterStatus="Completed"
                badgeConfig={{
                    className: "bg-white text-green-700 ",
                    icon: <CheckCircle size={10} />,
                    label: "Completed"
                }}
                emptyState={{
                    title: t('No completed projects found'),
                    message: t('Try adjusting your filters.')
                }}
            />
        </Suspense>
    );
}
