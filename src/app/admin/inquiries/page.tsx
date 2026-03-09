import React from 'react';
import prisma from '@/lib/prisma';
import InquiryListView, { ContactMessage } from '../_components/InquiryListView';

export const dynamic = 'force-dynamic';

export default async function InquiriesAdmin() {
    const inquiries = await prisma.inquiry.findMany({
        orderBy: { createdAt: 'desc' }
    });

    const mappedMessages: ContactMessage[] = inquiries.map(inq => ({
        id: inq.id,
        name: inq.name,
        email: inq.email,
        phone: inq.phone || '',
        subject: inq.subject || 'No Subject',
        message: inq.message,
        date: inq.createdAt.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        status: inq.status as any
    }));

    return <InquiryListView initialMessages={mappedMessages} />;
}
