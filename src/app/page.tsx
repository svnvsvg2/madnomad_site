"use client";

import { sections, Section, Work } from '../lib/data';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            {/* Hero Section */}
            <section style={{
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '20vh', /* More space for the centered navbar */
                paddingBottom: '4rem',
                textAlign: 'center'
            }} className="hero-section">
                <div className="container">
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
                                <div className="media-wrapper" style={{
                                    aspectRatio: '16/9',
                                    overflow: 'hidden',
                                    background: '#222',
                                    marginBottom: '1rem',
                                    position: 'relative'
                                }}>
                                    <img
                                        src={work.thumbnailUrl}
                                        alt={work.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                                        }}
                                        className="work-image"
                                    />
                                </div>
                                <div className="work-info">
                                    <h3 style={{
                                        fontSize: '1.1rem',
                                        marginBottom: '0.25rem',
                                        fontFamily: 'Inter, sans-serif',
                                        fontWeight: 500,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.02em',
                                        textAlign: 'center' /* Center titles too */
                                    }}>
                                        {work.title}
                                    </h3>
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
                    width: 90%;
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }

                .works-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(min(100%, 450px), 1fr)); /* Larger items on desktop */
                    gap: clamp(2rem, 4vw, 4vw);
                    row-gap: clamp(3rem, 6vw, 6rem);
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
                        gap: 0 !important; /* Remove gap if we want them touching, or keep small */
                        row-gap: 2rem !important;
                    }

                    .work-card-link {
                         display: block;
                         width: 100%;
                    }

                    .media-wrapper {
                        border-radius: 0 !important; /* Full bleed images usually square off */
                    }

                    .work-info {
                        padding: 0 1rem; /* Add padding for text since container has none */
                    }
                }
            `}</style>
        </div>
    );
}
