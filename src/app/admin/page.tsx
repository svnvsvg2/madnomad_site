"use client";

import { useState, useEffect } from 'react';
import { Work } from '@/lib/data';
import Link from 'next/link';

interface SiteContent {
    home: {
        heroBackground: string;
    };
    about: {
        title: string;
        paragraphs: string[];
    };
    contact: {
        title: string;
        intro: string;
        email: string;
        socials: { name: string; url: string }[];
    };
}

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<'works' | 'content'>('works');

    // Works State
    const [works, setWorks] = useState<Work[]>([]);
    const [worksLoading, setWorksLoading] = useState(true);
    const [worksStatus, setWorksStatus] = useState<string>('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [workFormData, setWorkFormData] = useState<Work>({
        id: '',
        slug: '',
        title: '',
        category: 'Commercial',
        thumbnailUrl: '',
        videoUrl: '',
        description: '',
        year: new Date().getFullYear().toString()
    });

    // Content State
    const [content, setContent] = useState<SiteContent | null>(null);
    const [contentLoading, setContentLoading] = useState(true);
    const [contentStatus, setContentStatus] = useState<string>('');

    useEffect(() => {
        fetchWorks();
        fetchContent();
    }, []);

    const fetchWorks = async () => {
        try {
            const res = await fetch('/api/works');
            if (res.ok) {
                const data = await res.json();
                setWorks(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setWorksLoading(false);
        }
    };

    const fetchContent = async () => {
        try {
            const res = await fetch('/api/content');
            if (res.ok) {
                const data = await res.json();
                setContent(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setContentLoading(false);
        }
    };

    // --- WORKS HANDLERS ---
    const handleEditWork = (work: Work) => {
        setEditingId(work.id);
        setWorkFormData(work);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteWork = async (id: string) => {
        if (!confirm('Are you sure you want to delete this work?')) return;
        try {
            const res = await fetch(`/api/works?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                await fetchWorks();
            } else {
                alert('Failed to delete');
            }
        } catch (err) {
            console.error(err);
            alert('Error deleting work');
        }
    };

    const handleSaveWork = async (e: React.FormEvent) => {
        e.preventDefault();
        setWorksStatus('Saving...');

        if (!workFormData.id || !workFormData.title || !workFormData.slug) {
            setWorksStatus('Error: Title, ID and Slug are required');
            return;
        }

        try {
            const res = await fetch('/api/works', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(workFormData)
            });

            if (res.ok) {
                setWorksStatus('Saved successfully!');
                await fetchWorks();

                setEditingId(null);
                setWorkFormData({
                    id: '',
                    slug: '',
                    title: '',
                    category: 'Commercial',
                    thumbnailUrl: '',
                    videoUrl: '',
                    description: '',
                    year: new Date().getFullYear().toString()
                });
                setTimeout(() => setWorksStatus(''), 3000);
            } else {
                setWorksStatus('Failed to save.');
            }
        } catch (err) {
            setWorksStatus('Error saving data.');
        }
    };
    /* Removed old saveWorks helper as it is replaced by per-item API calls */

    const handleWorkChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setWorkFormData(prev => ({ ...prev, [name]: value }));
    };

    // --- CONTENT HANDLERS ---
    const handleContentChange = (section: 'home' | 'about' | 'contact', field: string, value: any) => {
        if (!content) return;

        setContent(prev => {
            if (!prev) return null;
            return {
                ...prev,
                [section]: {
                    ...prev[section as keyof SiteContent], // Cast to keyof SiteContent to avoid implicit any if needed, or just let TS infer
                    [field]: value
                }
            };
        });
    };

    const handleSocialChange = (index: number, field: 'name' | 'url', value: string) => {
        if (!content) return;
        const newSocials = [...content.contact.socials];
        newSocials[index] = { ...newSocials[index], [field]: value };
        handleContentChange('contact', 'socials', newSocials);
    };

    const saveContent = async (e: React.FormEvent) => {
        e.preventDefault();
        setContentStatus('Saving...');
        try {
            const res = await fetch('/api/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(content)
            });
            if (res.ok) {
                setContentStatus('Content updated successfully!');
                setTimeout(() => setContentStatus(''), 3000);
            } else {
                setContentStatus('Failed to save content.');
            }
        } catch (err) {
            setContentStatus('Error saving content.');
        }
    };

    if (worksLoading || contentLoading) return <div className="p-10 text-white">Loading...</div>;

    return (
        <div style={{ minHeight: '100vh', background: '#111', color: '#eee', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="bg-dark-800 rounded p-1 flex gap-2">
                        <button
                            onClick={() => setActiveTab('works')}
                            className="btn"
                            style={{
                                background: activeTab === 'works' ? 'var(--accent-color)' : 'transparent',
                                color: activeTab === 'works' ? 'white' : '#ccc',
                                padding: '0.5rem 1rem'
                            }}
                        >
                            Projects
                        </button>
                        <button
                            onClick={() => setActiveTab('content')}
                            className="btn"
                            style={{
                                background: activeTab === 'content' ? 'var(--accent-color)' : 'transparent',
                                color: activeTab === 'content' ? 'white' : '#ccc',
                                padding: '0.5rem 1rem'
                            }}
                        >
                            Pages Content
                        </button>
                    </div>
                    <Link href="/" className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>View Site</Link>
                </div>
            </div>

            {/* --- WORKS TAB --- */}
            {activeTab === 'works' && (
                <>
                    {worksStatus && <div className="status-msg" style={{ background: worksStatus.includes('Error') || worksStatus.includes('Failed') ? '#500' : '#050', padding: '1rem', marginBottom: '1rem', borderRadius: '4px' }}>{worksStatus}</div>}

                    <form onSubmit={handleSaveWork} style={{ background: '#222', padding: '2rem', borderRadius: '8px', marginBottom: '4rem', border: '1px solid #333' }}>
                        <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-color)' }}>
                            {editingId ? 'Edit Project' : 'Add New Project'}
                        </h2>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                            <div className="input-group">
                                <label>Title</label>
                                <input name="title" value={workFormData.title} onChange={handleWorkChange} placeholder="Project Title" required />
                            </div>
                            <div className="input-group">
                                <label>ID (Unique)</label>
                                <input name="id" value={workFormData.id} onChange={handleWorkChange} placeholder="unique-id" required disabled={!!editingId} />
                            </div>
                            <div className="input-group">
                                <label>Slug (URL)</label>
                                <input name="slug" value={workFormData.slug} onChange={handleWorkChange} placeholder="url-slug" required />
                            </div>
                            <div className="input-group">
                                <label>Year</label>
                                <input name="year" value={workFormData.year} onChange={handleWorkChange} placeholder="2024" />
                            </div>
                            <div className="input-group">
                                <label>Thumbnail URL</label>
                                <input name="thumbnailUrl" value={workFormData.thumbnailUrl} onChange={handleWorkChange} placeholder="/images/thumb.jpg or https://..." />
                            </div>
                            <div className="input-group">
                                <label>Video URL</label>
                                <input name="videoUrl" value={workFormData.videoUrl} onChange={handleWorkChange} placeholder="/video.mp4 or YouTube URL" />
                            </div>
                            <div className="input-group">
                                <label>Category</label>
                                <input name="category" value={workFormData.category} onChange={handleWorkChange} placeholder="Commercial" />
                            </div>
                        </div>
                        <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                            <label>Description</label>
                            <textarea name="description" value={workFormData.description} onChange={handleWorkChange} rows={4} style={{ width: '100%' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button type="submit" className="btn" style={{ background: 'var(--accent-color)', color: 'white', border: 'none' }}>
                                {editingId ? 'Update Project' : 'Create Project'}
                            </button>
                            {editingId && (
                                <button type="button" onClick={() => {
                                    setEditingId(null);
                                    setWorkFormData({ id: '', slug: '', title: '', category: 'Commercial', thumbnailUrl: '', videoUrl: '', description: '', year: new Date().getFullYear().toString() });
                                }} className="btn" style={{ background: '#444', color: 'white', border: 'none' }}>Cancel</button>
                            )}
                        </div>
                    </form>

                    <h2 style={{ marginBottom: '1rem' }}>Current Projects ({works.length})</h2>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {works.map(work => (
                            <div key={work.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1a1a1a', padding: '1rem', borderRadius: '4px', borderLeft: `4px solid var(--accent-color)` }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ width: '60px', height: '40px', background: '#333', overflow: 'hidden' }}>
                                        {work.thumbnailUrl && <img src={work.thumbnailUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{work.title}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#666' }}>/{work.slug}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => handleEditWork(work)} style={{ padding: '0.5rem', background: '#333', color: 'white', border: 'none', cursor: 'pointer' }}>Edit</button>
                                    <button onClick={() => handleDeleteWork(work.id)} style={{ padding: '0.5rem', background: '#500', color: 'white', border: 'none', cursor: 'pointer' }}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* --- CONTENT TAB --- */}
            {activeTab === 'content' && content && (
                <>
                    {contentStatus && <div className="status-msg" style={{ background: contentStatus.includes('Error') || contentStatus.includes('Failed') ? '#500' : '#050', padding: '1rem', marginBottom: '1rem', borderRadius: '4px' }}>{contentStatus}</div>}

                    <form onSubmit={saveContent} style={{ display: 'grid', gap: '2rem' }}>
                        {/* Home Section */}
                        <div style={{ background: '#222', padding: '2rem', borderRadius: '8px', border: '1px solid #333' }}>
                            <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-color)' }}>Home Page</h2>
                            <div className="input-group">
                                <label>Hero Background API/URL (GIF supported)</label>
                                <input
                                    value={content.home?.heroBackground || ''}
                                    onChange={(e) => handleContentChange('home', 'heroBackground', e.target.value)}
                                    placeholder="https://example.com/animation.gif"
                                />
                                <small style={{ color: '#666' }}>Leave empty for black background.</small>
                            </div>
                        </div>

                        {/* About Section */}
                        <div style={{ background: '#222', padding: '2rem', borderRadius: '8px', border: '1px solid #333' }}>
                            <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-color)' }}>About Page</h2>
                            <div className="input-group">
                                <label>Page Title</label>
                                <input
                                    value={content.about.title}
                                    onChange={(e) => handleContentChange('about', 'title', e.target.value)}
                                    placeholder="ABOUT US"
                                />
                            </div>
                            <div className="input-group">
                                <label>Paragraphs (One per line)</label>
                                <textarea
                                    value={content.about.paragraphs.join('\n\n')}
                                    onChange={(e) => handleContentChange('about', 'paragraphs', e.target.value.split('\n\n'))}
                                    rows={8}
                                    style={{ width: '100%' }}
                                    placeholder="Paragraph 1...&#10;&#10;Paragraph 2..."
                                />
                                <small style={{ color: '#666' }}>Separate paragraphs with double enter.</small>
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div style={{ background: '#222', padding: '2rem', borderRadius: '8px', border: '1px solid #333' }}>
                            <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-color)' }}>Contact Page</h2>
                            <div className="input-group">
                                <label>Page Title</label>
                                <input
                                    value={content.contact.title}
                                    onChange={(e) => handleContentChange('contact', 'title', e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label>Intro Text</label>
                                <textarea
                                    value={content.contact.intro}
                                    onChange={(e) => handleContentChange('contact', 'intro', e.target.value)}
                                    rows={3}
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div className="input-group">
                                <label>Email</label>
                                <input
                                    value={content.contact.email}
                                    onChange={(e) => handleContentChange('contact', 'email', e.target.value)}
                                />
                            </div>

                            <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem', fontSize: '1rem' }}>Social Links</h3>
                            {content.contact.socials.map((social, idx) => (
                                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', marginBottom: '0.5rem' }}>
                                    <input
                                        value={social.name}
                                        onChange={(e) => handleSocialChange(idx, 'name', e.target.value)}
                                        placeholder="Name (e.g. Instagram)"
                                    />
                                    <input
                                        value={social.url}
                                        onChange={(e) => handleSocialChange(idx, 'url', e.target.value)}
                                        placeholder="URL"
                                    />
                                </div>
                            ))}
                        </div>

                        <button type="submit" className="btn" style={{ background: 'var(--accent-color)', color: 'white', border: 'none', padding: '1rem', fontSize: '1.1rem' }}>
                            Save All Content
                        </button>
                    </form>
                </>
            )}

            <style jsx>{`
                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }
                label {
                    font-size: 0.8rem;
                    color: #888;
                    text-transform: uppercase;
                }
                input, textarea {
                    background: #333;
                    border: 1px solid #444;
                    padding: 0.8rem;
                    color: white;
                    border-radius: 4px;
                    font-family: inherit;
                }
                input:focus, textarea:focus {
                    outline: none;
                    border-color: var(--accent-color);
                }
            `}</style>
        </div>
    );
}
