import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Clean filename: remove spaces, special chars except dot and dash
        const cleanName = file.name.replace(/[^a-zA-Z0-9.\-]/g, '_');
        const filename = `${Date.now()}-${cleanName}`;

        const uploadDir = path.join(process.cwd(), 'public/images/uploads');

        // Ensure directory exists
        await fs.mkdir(uploadDir, { recursive: true });

        const filePath = path.join(uploadDir, filename);
        await fs.writeFile(filePath, buffer);

        return NextResponse.json({
            success: true,
            url: `/images/uploads/${filename}`
        });
    } catch (error) {
        console.error('File Upload Error:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}
