import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/works.json');

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const fileContent = await fs.readFile(dataFilePath, 'utf-8');
        const works = JSON.parse(fileContent);
        return NextResponse.json(works);
    } catch (error) {
        return NextResponse.json([]);
    }
}

export async function POST(request: Request) {
    try {
        const work = await request.json();

        let works = [];
        try {
            const fileContent = await fs.readFile(dataFilePath, 'utf-8');
            works = JSON.parse(fileContent);
        } catch (e) { works = []; }

        const index = works.findIndex((w: any) => w.id === work.id);

        if (index !== -1) {
            works[index] = work;
        } else {
            works.unshift(work);
        }

        await fs.writeFile(dataFilePath, JSON.stringify(works, null, 2), 'utf-8');
        return NextResponse.json({ message: 'Saved successfully' });
    } catch (error) {
        console.error('File Write Error:', error);
        return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) throw new Error('ID required');

        const fileContent = await fs.readFile(dataFilePath, 'utf-8');
        let works = JSON.parse(fileContent);

        works = works.filter((w: any) => w.id !== id);

        await fs.writeFile(dataFilePath, JSON.stringify(works, null, 2), 'utf-8');
        return NextResponse.json({ message: 'Deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
