import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { id } = await req.json();
        await prisma.inquiry.delete({
            where: { id }
        });
        return NextResponse.json({ message: 'Inquiry deleted' });
    } catch (error) {
        console.error('Error deleting inquiry:', error);
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
