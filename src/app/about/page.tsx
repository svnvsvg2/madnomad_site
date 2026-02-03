"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function AboutPage() {
    const [content, setContent] = useState<any>(null);

    useEffect(() => {
        fetch(`/api/content?t=${Date.now()}`)
            .then(res => res.json())
            .then(data => setContent(data));
    }, []);

    if (!content) return null;

    return (
        <div style={{
            minHeight: '100vh',
            padding: '150px 2rem 4rem',
            maxWidth: '800px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="title-large" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    {content.about.title}
                </h1>

                <div className="text-body" style={{ margin: '0 auto', textAlign: 'center' }}>
                    {content.about.paragraphs.map((para: string, i: number) => (
                        <p key={i} style={{ marginBottom: '2rem', textAlign: 'center' }}>
                            {para}
                        </p>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
