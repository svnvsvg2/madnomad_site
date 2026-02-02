import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/works.json');

export async function GET() {
    try {
        const fileContent = await fs.readFile(dataFilePath, 'utf-8');
        const works = JSON.parse(fileContent);
        return NextResponse.json(works);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const works = await request.json();
        await fs.writeFile(dataFilePath, JSON.stringify(works, null, 2), 'utf-8');
        return NextResponse.json({ message: 'Data updated successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}
