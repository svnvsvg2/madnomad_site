import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const contentFilePath = path.join(process.cwd(), 'src/data/site-content.json');

export async function GET() {
    try {
        const fileContent = await fs.readFile(contentFilePath, 'utf-8');
        const data = JSON.parse(fileContent);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read content data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newData = await request.json();
        // Read existing to merge or just overwrite? Overwrite is safer for full updates.
        await fs.writeFile(contentFilePath, JSON.stringify(newData, null, 2), 'utf-8');
        return NextResponse.json({ message: 'Content updated successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to save content data' }, { status: 500 });
    }
}
