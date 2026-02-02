"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
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
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
                pointerEvents: 'none'
            }}>
                <Link href="/" style={{ pointerEvents: 'auto', display: 'block' }}>
                    <img
                        src="/logo.png"
                        alt="MADNOMAD Logo"
                        style={{
                            height: '60px',
                            width: 'auto',
                            objectFit: 'contain',
                            filter: 'invert(1)'
                        }}
                    />
                </Link>

                {/* Desktop Navigation */}
                <div style={{
                    display: 'flex',
                    gap: '3rem',
                    pointerEvents: 'auto'
                }} className="desktop-nav">
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
                            onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-color)'}
                            onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    onClick={toggleMobileMenu}
                    className="mobile-menu-btn"
                    style={{
                        display: 'none',
                        pointerEvents: 'auto',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        zIndex: 101
                    }}
                    aria-label="Toggle menu"
                >
                    <div style={{
                        width: '28px',
                        height: '20px',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <span style={{
                            width: '100%',
                            height: '2px',
                            background: '#fff',
                            transition: 'all 0.3s',
                            transform: mobileMenuOpen ? 'rotate(45deg) translateY(9px)' : 'none'
                        }}></span>
                        <span style={{
                            width: '100%',
                            height: '2px',
                            background: '#fff',
                            transition: 'all 0.3s',
                            opacity: mobileMenuOpen ? 0 : 1
                        }}></span>
                        <span style={{
                            width: '100%',
                            height: '2px',
                            background: '#fff',
                            transition: 'all 0.3s',
                            transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-9px)' : 'none'
                        }}></span>
                    </div>
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                background: 'rgba(5, 5, 5, 0.98)',
                zIndex: 99,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '3rem',
                opacity: mobileMenuOpen ? 1 : 0,
                pointerEvents: mobileMenuOpen ? 'auto' : 'none',
                transition: 'opacity 0.3s ease'
            }} className="mobile-menu-overlay">
                {['WORKS', 'ABOUT', 'CONTACT'].map((item, index) => (
                    <Link
                        key={item}
                        href={item === 'CONTACT' ? "mailto:contact@madnomad.kz" : `/${item.toLowerCase() === 'works' ? '' : item.toLowerCase()}`}
                        onClick={closeMobileMenu}
                        style={{
                            fontSize: '2.5rem',
                            letterSpacing: '0.1em',
                            fontWeight: 700,
                            color: '#fff',
                            transition: 'all 0.3s',
                            transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                            opacity: mobileMenuOpen ? 1 : 0,
                            transitionDelay: mobileMenuOpen ? `${index * 0.1}s` : '0s',
                            fontFamily: 'Syne, sans-serif',
                            textTransform: 'uppercase'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-color)'}
                        onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
                    >
                        {item}
                    </Link>
                ))}
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    nav {
                        padding: 1.5rem 1.5rem !important;
                    }

                    nav img {
                        height: 45px !important;
                    }

                    .desktop-nav {
                        display: none !important;
                    }

                    .mobile-menu-btn {
                        display: block !important;
                    }
                }

                @media (max-width: 480px) {
                    nav {
                        padding: 1rem 1rem !important;
                    }

                    nav img {
                        height: 40px !important;
                    }

                    .mobile-menu-overlay a {
                        font-size: 2rem !important;
                    }
                }
            `}</style>
        </>
    );
}
