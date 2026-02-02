"use client";

import { sections, Work } from '../../../lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Helper to flatten works
const getAllWorks = (): Work[] => {
    return sections.flatMap(section => section.items);
};


export default function WorkPage({ params }: { params: { slug: string } }) {
    const works = getAllWorks();
    const work = works.find((w) => w.slug === params.slug);

    if (!work) {
        notFound();
        return null; // Ensure TS knows execution stops here
    }

    return (
        <div style={{ minHeight: '100vh', background: '#050505' }}>

            {/* Fullscreen Video Header */}
            <div className="video-header" style={{
                height: 'clamp(50vh, 80vh, 90vh)',
                width: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#000'
            }}>
                {work.videoUrl.includes('youtube.com') || work.videoUrl.includes('youtu.be') ? (
                    <iframe
                        src={work.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'www.youtube.com/embed/')}
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : work.videoUrl.includes('vimeo.com') ? (
                    <iframe
                        src={work.videoUrl.replace('vimeo.com/', 'player.vimeo.com/video/')}
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <video
                        src={work.videoUrl}
                        controls
                        autoPlay
                        muted
                        loop
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            maxHeight: '100vh'
                        }}
                    />
                )}

                <div className="video-title" style={{
                    position: 'absolute',
                    bottom: 'clamp(1rem, 3vw, 2rem)',
                    left: 'clamp(1rem, 3vw, 2rem)',
                    zIndex: 10,
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}>
                    <h1 className="title-medium">{work.title}</h1>
                </div>
            </div>

            {/* Info Section */}
            <div className="container section work-info" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: 'clamp(2rem, 5vw, 4rem)'
            }}>
                <div>
                    <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ color: '#666', marginBottom: '0.5rem' }}>Category</h4>
                        <p>{work.category}</p>
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ color: '#666', marginBottom: '0.5rem' }}>Year</h4>
                        <p>{work.year}</p>
                    </div>
                    {work.credits && (
                        <div>
                            <h4 style={{ color: '#666', marginBottom: '0.5rem' }}>Credits</h4>
                            <ul style={{ listStyle: 'none' }}>
                                {work.credits.map((credit, i) => (
                                    <li key={i} style={{ marginBottom: '0.2rem' }}>{credit}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div>
                    <h2 style={{ marginBottom: '2rem' }}>Brief</h2>
                    <p className="text-body" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#ccc' }}>
                        {work.description}
                    </p>
                </div>
            </div>

            {/* Navigation Footer */}
            <div className="container" style={{ paddingBottom: 'clamp(2rem, 5vw, 4rem)' }}>
                <Link href="/" className="btn">Back to All Works</Link>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    .video-header {
                        height: 50vh !important;
                    }

                    .work-info {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                }

                @media (max-width: 480px) {
                    .video-header {
                        height: 40vh !important;
                    }
                }
            `}</style>
        </div>
    );
}
