"use client";

import Link from 'next/link';

export default function Navbar() {
    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            padding: '2rem 3rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 100,
            // mixBlendMode: 'difference', // Removing difference mode to control colors directly
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
            pointerEvents: 'none' // Allow clicking through navbar container
        }}>
            <Link href="/" style={{ pointerEvents: 'auto', display: 'block' }}>
                <img
                    src="/logo.png"
                    alt="MADNOMAD Logo"
                    style={{
                        height: '60px',
                        width: 'auto',
                        objectFit: 'contain',
                        filter: 'invert(1)' // Assuming the logo is black like in the screenshot provided by user? Wait, user provided a black logo on white bg. I need to invert it for dark mode or specific styling.
                    }}
                />
            </Link>
            <div style={{ display: 'flex', gap: '3rem', pointerEvents: 'auto' }}>
                {['WORKS', 'ABOUT', 'CONTACT'].map((item) => (
                    <Link
                        key={item}
                        href={item === 'CONTACT' ? "mailto:contact@madnomad.kz" : `/${item.toLowerCase() === 'works' ? '' : item.toLowerCase()}`}
                        style={{
                            fontSize: '0.9rem',
                            letterSpacing: '0.1em',
                            fontWeight: 500,
                            color: '#fff',
                            transition: 'color 0.3s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-red)'}
                        onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
                    >
                        {item}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
