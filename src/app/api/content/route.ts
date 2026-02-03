import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const { rows } = await sql`SELECT value FROM site_content WHERE key = 'site_data' LIMIT 1`;
        if (rows.length > 0) {
            return NextResponse.json(rows[0].value);
        }
        return NextResponse.json({});
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read content data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newData = await request.json();
        await sql`
            INSERT INTO site_content (key, value)
            VALUES ('site_data', ${newData})
            ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
        `;
        return NextResponse.json({ message: 'Content updated successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to save content data' }, { status: 500 });
    }
}
