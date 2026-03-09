import React from 'react';
import prisma from '@/lib/prisma';
import TeamListView, { TeamMember } from '../_components/TeamListView';

export const dynamic = 'force-dynamic';

export default async function TeamAdmin() {
    const employees = await prisma.employee.findMany({
        orderBy: { createdAt: 'asc' }
    });

    const mappedMembers: TeamMember[] = employees.map(emp => ({
        id: emp.id,
        name: emp.name,
        role: {
            en: emp.role || '',
            kh: emp.roleKm || ''
        },
        image: emp.image || '',
        bio: {
            en: emp.bio || '',
            kh: emp.bioKm || ''
        },
        experience: emp.experience || '',
        location: {
            en: emp.location || '',
            kh: emp.locationKm || ''
        },
        specialization: {
            en: emp.specialization || '',
            kh: emp.specializationKm || ''
        }
    }));

    return <TeamListView initialMembers={mappedMembers} />;
}
