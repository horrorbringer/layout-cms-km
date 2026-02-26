import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { allMessages, ContactMessage } from '@/app/design-z/data/messagesData';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, subject, message } = body;

        const newMessage: ContactMessage = {
            id: Date.now().toString(),
            name,
            email,
            phone,
            subject,
            message,
            date: new Date().toLocaleString(),
            status: 'new'
        };

        const updatedMessages = [newMessage, ...allMessages];

        const filePath = path.join(process.cwd(), 'src/app/design-z/data/messagesData.ts');
        const content = `export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    date: string;
    status: 'new' | 'read' | 'replied';
}

export const allMessages: ContactMessage[] = ${JSON.stringify(updatedMessages, null, 4)};`;

        await fs.writeFile(filePath, content, 'utf8');

        return NextResponse.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Failed to submit message:', error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
