import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { id, name, role, bio, experience, location, specialization, image } = data;

        const employeeData = {
            name,
            role: role.en,
            roleKm: role.kh,
            bio: bio.en,
            bioKm: bio.kh,
            experience,
            location: location.en,
            locationKm: location.kh,
            specialization: specialization.en,
            specializationKm: specialization.kh,
            image,
        };

        let result;
        if (id && id.length > 20) { // Check if it's a real cuid() or something
            result = await prisma.employee.update({
                where: { id },
                data: employeeData,
            });
        } else {
            result = await prisma.employee.create({
                data: {
                    ...employeeData,
                    email: `${name.toLowerCase().replace(/\s/g, '.')}@kimmex.com.kh`
                },
            });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error saving team member:', error);
        return NextResponse.json({ error: 'Failed to save member' }, { status: 500 });
    }
}
