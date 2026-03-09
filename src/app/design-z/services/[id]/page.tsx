import React from 'react';
import prisma from '@/lib/prisma';
import { serviceDetails } from '../../data/serviceDetailData';
import ServiceDetailView from './ServiceDetailView';
import { Metadata } from 'next';

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const params = await props.params;
    const id = params.id || 'service';
    return {
        title: `${id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' ')} | Services`,
    };
}

export default async function ServiceDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const detailId = id === 'construction' ? 'construction' : id;

    // Fetch from SystemSettings
    const serviceDetailsSetting = await prisma.systemSetting.findUnique({
        where: { key: 'service_details' }
    });

    const allDetails = (serviceDetailsSetting?.value as any) || serviceDetails;
    const service = allDetails[detailId] || allDetails['design-build'];

    return <ServiceDetailView service={service} detailId={detailId} />;
}
