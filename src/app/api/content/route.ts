import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const contentFilePath = path.join(process.cwd(), 'src/data/site-content.json');

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const fileContent = await fs.readFile(contentFilePath, 'utf-8');
        const data = JSON.parse(fileContent);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({});
    }
}

export async function POST(request: Request) {
    try {
        const newData = await request.json();
        await fs.writeFile(contentFilePath, JSON.stringify(newData, null, 2), 'utf-8');
        return NextResponse.json({ message: 'Saved successfully' });
    } catch (error) {
        console.error('File Write Error:', error);
        return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }
}
