"use client";

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Hide navbar on admin pages
    if (pathname?.startsWith('/admin')) return null;

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <Link href="/" className="logo-link">
                        <img
                            src="/logo.png"
                            alt="MADNOMAD Logo"
                            className="nav-logo"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="desktop-nav">
                        {['WORKS', 'ABOUT', 'CONTACT'].map((item) => (
                            <Link
                                key={item}
                                href={`/${item === 'WORKS' ? '' : item.toLowerCase()}`}
                                className="nav-link"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="mobile-menu-btn"
                        aria-label="Toggle menu"
                    >
                        <div className="hamburger-icon">
                            <span style={{
                                transform: mobileMenuOpen ? 'rotate(45deg) translateY(9px)' : 'none'
                            }}></span>
                            <span style={{
                                opacity: mobileMenuOpen ? 0 : 1
                            }}></span>
                            <span style={{
                                transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-9px)' : 'none'
                            }}></span>
                        </div>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
                {['WORKS', 'ABOUT', 'CONTACT'].map((item, index) => (
                    <Link
                        key={item}
                        href={`/${item === 'WORKS' ? '' : item.toLowerCase()}`}
                        onClick={closeMobileMenu}
                        className="mobile-link"
                        style={{
                            transitionDelay: mobileMenuOpen ? `${index * 0.1}s` : '0s',
                        }}
                    >
                        {item}
                    </Link>
                ))}
            </div>

            <style jsx>{`
                .navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    padding: 2rem 0; /* Reduced side padding, handled by container */
                    z-index: 100;
                    background: linear-gradient(to bottom, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.8) 50%, transparent 100%);
                    pointer-events: none;
                }

                .nav-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    pointer-events: auto;
                }

                .logo-link {
                    display: block;
                    margin-bottom: 1.5rem;
                }

                .nav-logo {
                    height: 100px; /* Bigger logo */
                    width: auto;
                    object-fit: contain;
                    filter: invert(1);
                    transition: height 0.3s ease;
                }

                .desktop-nav {
                    display: flex;
                    gap: 3rem;
                    pointer-events: auto;
                }

                .nav-link {
                    font-size: 0.9rem;
                    letter-spacing: 0.1em;
                    font-weight: 500;
                    color: #fff;
                    transition: color 0.3s;
                    text-transform: uppercase;
                }

                .nav-link:hover {
                    color: var(--accent-color);
                }

                .mobile-menu-btn {
                    display: none;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 0.5rem;
                    z-index: 101;
                    pointer-events: auto;
                    position: absolute; /* Absolute position for mobile */
                    right: 1.5rem;
                    top: 1.5rem;
                }

                .hamburger-icon {
                    width: 28px;
                    height: 20px;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .hamburger-icon span {
                    width: 100%;
                    height: 2px;
                    background: #fff;
                    transition: all 0.3s;
                    display: block;
                }

                .mobile-menu-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(5, 5, 5, 0.98);
                    z-index: 99;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 3rem;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.3s ease;
                }

                .mobile-menu-overlay.open {
                    opacity: 1;
                    pointer-events: auto;
                }

                .mobile-link {
                    font-size: 2.5rem;
                    letter-spacing: 0.1em;
                    font-weight: 700;
                    color: #fff;
                    transition: all 0.3s;
                    transform: translateY(20px);
                    opacity: 0;
                    font-family: 'Syne', sans-serif;
                    text-transform: uppercase;
                }

                .mobile-menu-overlay.open .mobile-link {
                    transform: translateY(0);
                    opacity: 1;
                }

                .mobile-link:hover {
                    color: var(--accent-color);
                }

                /* Mobile Responsive Styles */
                @media (max-width: 768px) {
                    .nav-container {
                        flex-direction: row; /* Row for mobile header */
                        justify-content: center; /* Center logo */
                        padding: 0 1.5rem;
                    }

                    .navbar {
                        padding: 1.5rem 0;
                    }

                    .logo-link {
                        margin-bottom: 0;
                    }

                    .nav-logo {
                        height: 45px; /* Smaller logo on mobile */
                    }

                    .desktop-nav {
                        display: none;
                    }

                    .mobile-menu-btn {
                        display: block;
                    }
                }

                @media (max-width: 480px) {
                    .nav-logo {
                        height: 40px;
                    }

                    .mobile-link {
                        font-size: 2rem;
                    }
                }
            `}</style>
        </>
    );
}
