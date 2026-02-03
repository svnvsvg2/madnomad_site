import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const { rows } = await sql`SELECT * FROM works ORDER BY created_at DESC`;
        // Normalize data structure if needed (e.g. credits array handling)
        // works table credits is not in my SQL yet, I should add it or store as text/json.
        // Let's store credits as text[] or strings. 
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const work = await request.json();

        // Check if it's an array (bulk save) or single item (incremental)
        // To support the current "save all" frontend, we might need a bulk handler
        // BUT changing frontend is better.

        // Let's assume we receive a SINGLE work item for Upsert
        const { id, slug, title, category, thumbnailUrl, videoUrl, description, year } = work;

        await sql`
            INSERT INTO works (id, slug, title, category, thumbnail_url, video_url, description, year)
            VALUES (${id}, ${slug}, ${title}, ${category}, ${thumbnailUrl}, ${videoUrl}, ${description}, ${year})
            ON CONFLICT (id) DO UPDATE SET
            slug = EXCLUDED.slug,
            title = EXCLUDED.title,
            category = EXCLUDED.category,
            thumbnail_url = EXCLUDED.thumbnail_url,
            video_url = EXCLUDED.video_url,
            description = EXCLUDED.description,
            year = EXCLUDED.year;
        `;

        return NextResponse.json({ message: 'Work saved successfully' });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Failed to save work' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) throw new Error('ID required');

        await sql`DELETE FROM works WHERE id = ${id}`;
        return NextResponse.json({ message: 'Deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
