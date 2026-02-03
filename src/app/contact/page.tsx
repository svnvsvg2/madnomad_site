"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ContactPage() {
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
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center' }}
            >
                <h1 className="title-large" style={{ marginBottom: '3rem' }}>
                    {content.contact.title}
                </h1>

                <div className="text-body" style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <p style={{ marginBottom: '2rem', whiteSpace: 'pre-line', textAlign: 'center' }}>
                        {content.contact.intro}
                    </p>

                    <a href={`mailto:${content.contact.email}`} className="title-medium" style={{
                        color: 'var(--accent-color)',
                        textDecoration: 'none',
                        borderBottom: '2px solid transparent',
                        transition: 'border-color 0.3s'
                    }}
                        onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--accent-color)'}
                        onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}
                    >
                        {content.contact.email}
                    </a>
                </div>

                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                    {content.contact.socials.filter((s: any) => s.name && s.url).map((social: any) => (
                        <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" style={{ textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
                            {social.name}
                        </a>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
