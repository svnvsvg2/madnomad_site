export interface Work {
    id: string;
    slug: string;
    title: string;
    category: string;
    thumbnailUrl: string; // URL for the grid image
    videoUrl: string; // Main video URL (YouTube/Vimeo embed or direct link)
    description: string;
    credits?: string[];
    year: string;
}

import worksData from '../data/works.json';

export interface Work {
    id: string;
    slug: string;
    title: string;
    category: string;
    thumbnailUrl: string;
    videoUrl: string;
    description: string;
    credits?: string[];
    year: string;
}

export interface Section {
    title: string;
    items: Work[];
}

// Since we flattened the display, we don't strictly need sections, but keeping the export for compatibility if needed.
// Or effectively export 'sections' as a single "All Works" section if app still uses it mapped.
// Wait, the app currently maps over sections. Let me update page.tsx to just use a flat list if possible, or adapt here.
// The user removed categories visually, but the code in page.tsx still iterates sections to flatten them.
// Let's create a single dummy section to avoid breaking page.tsx for now,
// or better: export a flat list and update page.tsx to use it directly.
// Given strict instructions, I will keep 'sections' export but populated from JSON.

// Make a single section containing all works for now to match current usage
// actually, I'll export 'works' directly and update page.tsx to be cleaner.
// But first let's stick to the current contract to minimize breakage.

export const sections: Section[] = [
    {
        title: "All Works",
        items: worksData as Work[]
    }
];

// Also export raw works for direct access
export const works: Work[] = worksData as Work[];
