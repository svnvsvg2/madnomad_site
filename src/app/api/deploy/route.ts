import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';

const execAsync = util.promisify(exec);

export async function POST() {
    // Strictly prevent this from running on the live production server
    if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Cannot deploy from the live production site.' }, { status: 403 });
    }

    try {
        // 1. Stage all changes
        await execAsync('git add .');
        
        // 2. Commit the changes (We wrap this in try/catch because if there are no changes, git commit throws an error)
        try {
            await execAsync('git commit -m "Auto-deploy from Admin Panel"');
        } catch (commitError) {
            console.log('Note: Nothing new to commit, or commit skipped.');
        }

        // 3. Push to GitHub (which triggers Vercel automatically)
        await execAsync('git push origin main');

        return NextResponse.json({ message: 'Code successfully pushed to GitHub! Vercel is now building your site.' });
    } catch (error: any) {
        console.error('Deployment Error:', error);
        return NextResponse.json({ error: 'Deployment Failed: ' + error.message }, { status: 500 });
    }
}
