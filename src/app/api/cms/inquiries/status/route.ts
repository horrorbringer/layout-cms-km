import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { id, status } = await req.json();
        const result = await prisma.inquiry.update({
            where: { id },
            data: { status }
        });
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error updating inquiry status:', error);
        return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
    }
}
