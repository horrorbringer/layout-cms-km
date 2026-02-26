'use client';

import React, { use } from 'react';
import ProjectForm from '../components/ProjectForm';
import { projects } from '@/app/design-z/data/projectData';
import { projectDetails } from '@/app/design-z/data/projectDetailData';
import { notFound } from 'next/navigation';

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const project = projects.find(p => p.id === id);

    if (!project) {
        notFound();
    }

    const details = projectDetails[id] || {};
    const mergedData = { ...project, ...details };

    return <ProjectForm initialData={mergedData} isEditing={true} />;
}
