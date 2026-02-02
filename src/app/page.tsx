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
                minHeight: '40vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                paddingTop: '18vh',
                paddingBottom: '2rem',
                paddingLeft: 'var(--grid-gap)',
                paddingRight: 'var(--grid-gap)',
            }}>
                <div className="container">
                    <motion.h1
                        className="title-large"
                        variants={sentence}
                        initial="hidden"
                        animate="visible"
                        style={{
                            marginBottom: '2rem',
                            fontSize: 'clamp(4rem, 10vw, 8rem)',
                            letterSpacing: '-0.04em',
                            lineHeight: 0.85,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start'
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
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.5, duration: 0.8 }} // Appear after typing
                        className="text-body"
                        style={{
                            fontSize: '1.1rem',
                            maxWidth: '600px',
                            borderLeft: '2px solid var(--accent-color)',
                            paddingLeft: '1.5rem',
                            marginLeft: '5px'
                        }}
                    >
                        Visual Reality Engineers.<br />
                        Crafting immersive digital experiences.
                    </motion.div>
                </div>
            </section>

            {/* Works Grid */}
            <div className="container" style={{ paddingBottom: '6rem' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '2vw',
                    rowGap: '4rem'
                }}>
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
                                    {/* Overlay on hover could go here, handled via CSS on parent typically */}
                                </div>
                                <div>
                                    <h3 style={{
                                        fontSize: '1.1rem',
                                        marginBottom: '0.25rem',
                                        fontFamily: 'Inter, sans-serif',
                                        fontWeight: 500,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.02em'
                                    }}>
                                        {work.title}
                                    </h3>
                                </div>
                            </motion.article>
                        </Link>
                    ))}
                </div>
            </div>

            <footer className="container" style={{
                padding: '4rem 0',
                borderTop: '1px solid #333',
                display: 'flex',
                justifyContent: 'space-between',
                color: '#666',
                fontSize: '0.9rem'
            }}>
                <div>&copy; {new Date().getFullYear()} MADNOMAD. All rights reserved.</div>
                <div>for inquiries: salam@madnomad.kz</div>
            </footer>
        </div>
    );
}
