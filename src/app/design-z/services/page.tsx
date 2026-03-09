import React from 'react';
import ServicesView from './_components/ServicesView';
import { serviceData } from '../data/serviceData';
import prisma from '@/lib/prisma';

export default async function ServicesPage() {
    const servicesFromDb = await prisma.service.findMany({
        where: { isActive: true },
        orderBy: { orderIndex: 'asc' }
    });

    // Map DB services to match the expected format of ServicesView
    const mappedServices = servicesFromDb.map(s => ({
        id: s.slug,
        title: { en: s.title, kh: s.titleKm || s.title },
        desc: { en: s.summary || '', kh: s.summaryKm || s.summary || '' },
        image: s.image || '/images/projects/Thumbnail-1.jpg',
        features: s.features.map(f => ({ en: f, kh: f }))
    }));

    // Fetch process and sectors from DB settings
    const [processSetting, sectorsSetting] = await Promise.all([
        prisma.systemSetting.findUnique({ where: { key: 'home_process' } }),
        prisma.systemSetting.findUnique({ where: { key: 'service_sectors' } })
    ]);

    const process = (processSetting?.value as any) || serviceData.process;
    const sectors = (sectorsSetting?.value as any) || serviceData.sectors;

    return (
        <ServicesView
            services={mappedServices}
            process={process}
            sectors={sectors}
        />
    );
}
