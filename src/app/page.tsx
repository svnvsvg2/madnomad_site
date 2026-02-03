"use client";

import { sections, Section, Work } from '../lib/data';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Typing animation variants
const sentence = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.2, // Start a bit faster
            staggerChildren: 0.08, // Speed of typing
        },
    },
};

const letter = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
    },
};

// Work item animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

export default function Home() {
    const [heroBg, setHeroBg] = useState('');

    useEffect(() => {
        // Fetch background from CMS
        fetch(`/api/content?t=${Date.now()}`)
            .then(res => res.json())
            .then(data => {
                if (data.home?.heroBackground) {
                    setHeroBg(data.home.heroBackground);
                }
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            {/* Hero Section */}
            <section style={{
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '20vh',
                paddingBottom: '4rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }} className="hero-section">

                {/* Background Image/GIF or Video */}
                {heroBg && (
                    heroBg.endsWith('.webm') || heroBg.endsWith('.mp4') ? (
                        <video
                            src={heroBg}
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{
                                position: 'absolute',
                                inset: 0,
                                zIndex: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                opacity: 0.4
                            }}
                        />
                    ) : (
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            zIndex: 0,
                            backgroundImage: `url(${heroBg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.4 /* Low opacity to keep text readable */
                        }} />
                    )
                )}

                {/* Gradient Fade at Bottom */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '200px',
                    background: 'linear-gradient(to bottom, transparent, var(--bg-color))',
                    zIndex: 0,
                    pointerEvents: 'none'
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.h1
                        className="title-large"
                        variants={sentence}
                        initial="hidden"
                        animate="visible"
                        style={{
                            marginBottom: '2rem',
                            fontSize: 'clamp(3rem, 10vw, 8rem)',
                            letterSpacing: '-0.04em',
                            lineHeight: 0.85,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        {/* Line 1: MADNOMAD. */}
                        <span style={{ display: 'block' }}>
                            {"MADNOMAD".split("").map((char, index) => (
                                <motion.span key={char + "-" + index} variants={letter}>
                                    {char}
                                </motion.span>
                            ))}
                            <motion.span variants={letter} style={{ color: 'var(--accent-color)' }}>.</motion.span>
                        </span>

                        {/* Line 2: COLLECTIVE */}
                        <span style={{ display: 'block' }}>
                            {"COLLECTIVE".split("").map((char, index) => (
                                <motion.span key={char + "-" + index} variants={letter}>
                                    {char}
                                </motion.span>
                            ))}
                        </span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.8 }} // Appear after typing
                        className="text-body hero-description"
                        style={{
                            fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                            maxWidth: '600px',
                            margin: '0 auto',
                            borderLeft: 'none', /* Removed side border for centered layout */
                            paddingLeft: 0,
                        }}
                    >
                        Visual Reality Engineers.<br />
                        Crafting immersive digital experiences.
                    </motion.div>
                </div>
            </section>

            {/* Works Grid */}
            <div className="works-container" style={{ paddingBottom: 'clamp(3rem, 8vw, 6rem)' }}>
                <div className="works-grid">
                    {sections.flatMap(section => section.items).map((work: Work) => (
                        <Link href={`/work/${work.slug}`} key={work.id} className="work-card-link">
                            <motion.article
                                style={{ position: 'relative', cursor: 'pointer' }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={fadeInUp}
                            >
                                <div className="media-wrapper">
                                    <img
                                        src={work.thumbnailUrl}
                                        alt={work.title}
                                        className="work-image"
                                    />
                                    <div className="work-overlay">
                                        <h3 className="work-title">
                                            {work.title}
                                        </h3>
                                    </div>
                                </div>
                            </motion.article>
                        </Link>
                    ))}
                </div>
            </div>

            <footer className="container site-footer" style={{
                padding: 'clamp(2rem, 5vw, 4rem) 0',
                borderTop: '1px solid #333',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                color: '#666',
                fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
            }}>
                <div>&copy; {new Date().getFullYear()} MADNOMAD. All rights reserved.</div>
                <div>for inquiries: salam@madnomad.kz</div>
            </footer>

            <style jsx>{`
                .works-container {
                    width: 95%; /* Wider container */
                    max-width: 1800px; /* Allow it to go wider */
                    margin: 0 auto;
                    padding: 0 1rem;
                }

                .works-grid {
                    display: grid;
                    /* Larger items: ensure at least 600px width before wrapping, forcing 1 or 2 columns mostly */
                    grid-template-columns: repeat(auto-fill, minmax(min(100%, 600px), 1fr));
                    gap: 1rem; /* Closer together */
                    row-gap: 1rem;
                }

                .media-wrapper {
                    aspect-ratio: 16/9;
                    overflow: hidden;
                    background: #222;
                    position: relative;
                }

                .work-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }

                /* Zoom effect on hover */
                .work-card-link:hover .work-image {
                    transform: scale(1.05);
                }

                .work-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent 40%);
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end; /* Text at bottom */
                    padding: 2rem;
                    opacity: 1; /* Always visible */
                    transition: opacity 0.4s ease;
                    z-index: 10; /* Ensure on top */
                    pointer-events: none; /* Let clicks pass through */
                }

                /* .work-card-link:hover .work-overlay {
                    opacity: 1;
                } */

                .work-title {
                    font-size: 1.5rem;
                    font-family: 'Inter', sans-serif;
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 0.02em;
                    color: white;
                    text-align: center;
                }

                @media (hover: none) {
                    /* On touch devices, always show the title since there is no hover */
                    .work-overlay {
                        opacity: 1;
                    }
                }

                @media (max-width: 768px) {
                    .site-footer {
                        flex-direction: column !important;
                        text-align: center;
                    }
                    
                    /* Mobile works grid adjustments */
                    .works-container {
                        width: 100% !important;
                        padding: 0 !important; /* Remove side padding */
                        max-width: 100% !important;
                    }
                    
                    .works-grid {
                        grid-template-columns: 1fr !important; /* Force 1 column */
                        gap: 2px !important; /* Very close on mobile */
                        row-gap: 2px !important;
                    }

                    .work-card-link {
                         display: block;
                         width: 100%;
                    }

                    .media-wrapper {
                        border-radius: 0 !important;
                    }
                }
            `}</style>
        </div>
    );
}
