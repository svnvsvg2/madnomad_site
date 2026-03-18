"use client";

import { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
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

    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    
    // Auto-hide controls logic
    const [showControls, setShowControls] = useState(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleInteraction = () => {
        setShowControls(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            // Only hide if the video is actually playing, otherwise keep it visible so they know they can interact
            if (videoRef.current && !videoRef.current.paused) {
                setShowControls(false);
            }
        }, 3000);
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    if (!work) {
        notFound();
        return null; // Ensure TS knows execution stops here
    }

    return (
        <div style={{ minHeight: '100vh', background: '#050505' }}>

            {/* Fullscreen Video Header */}
            <div 
                className="video-header" 
                onMouseMove={handleInteraction}
                onTouchStart={handleInteraction}
                onMouseLeave={() => setShowControls(false)}
                style={{
                    height: 'clamp(50vh, 80vh, 90vh)',
                    width: '100%',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#000'
                }}
            >
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
                    <>
                        <video
                            ref={videoRef}
                            src={work.videoUrl}
                            controls
                            playsInline
                            autoPlay
                            muted={isMuted}
                            loop
                            title=" "
                            disablePictureInPicture
                            controlsList="nodownload"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                maxHeight: '100vh'
                            }}
                        />
                        <button 
                            onClick={toggleMute}
                            style={{
                                position: 'absolute',
                                bottom: 'clamp(1.5rem, 4vw, 3rem)',
                                left: 'clamp(1rem, 3vw, 2rem)',
                                zIndex: 20,
                                background: 'rgba(0,0,0,0.6)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: 'white',
                                padding: '0.6rem 1rem',
                                borderRadius: '30px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                backdropFilter: 'blur(4px)',
                                fontStyle: 'normal',
                                opacity: showControls ? 1 : 0,
                                transition: 'opacity 0.3s ease, transform 0.2s',
                                pointerEvents: showControls ? 'auto' : 'none'
                            }}
                        >
                            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{isMuted ? 'Unmute' : 'Mute'}</span>
                        </button>
                    </>
                )}

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
