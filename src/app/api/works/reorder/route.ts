import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/works.json');

export async function POST(request: Request) {
    try {
        const { orderedIds } = await request.json();

        if (!Array.isArray(orderedIds)) {
            return NextResponse.json({ error: 'orderedIds must be an array' }, { status: 400 });
        }

        // Read current works
        const fileContent = await fs.readFile(dataFilePath, 'utf-8');
        let works = JSON.parse(fileContent);

        // Map works by id for easy lookup
        const worksMap = new Map(works.map((w: any) => [w.id, w]));

        // Create new reordered array
        const reorderedWorks = orderedIds.map(id => worksMap.get(id)).filter(w => w !== undefined);

        // Find any works that were omitted and append them to avoid data loss
        const orderedIdsSet = new Set(orderedIds);
        const omittedWorks = works.filter((w: any) => !orderedIdsSet.has(w.id));
        const finalWorks = [...reorderedWorks, ...omittedWorks];

        // Save back to file
        await fs.writeFile(dataFilePath, JSON.stringify(finalWorks, null, 2), 'utf-8');

        return NextResponse.json({ message: 'Order saved successfully' });
    } catch (error) {
        console.error('Reorder Error:', error);
        return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
    }
}
