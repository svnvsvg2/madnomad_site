"use client";

import { useState, useEffect } from 'react';
import { Work } from '@/lib/data';
import Link from 'next/link';

export default function AdminPage() {
    const [works, setWorks] = useState<Work[]>([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState<string>('');

    // Form state
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Work>({
        id: '',
        slug: '',
        title: '',
        category: 'Commercial',
        thumbnailUrl: '',
        videoUrl: '',
        description: '',
        year: new Date().getFullYear().toString()
    });

    useEffect(() => {
        fetchWorks();
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
            setLoading(false);
        }
    };

    const handleEdit = (work: Work) => {
        setEditingId(work.id);
        setFormData(work);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this work?')) return;

        const newWorks = works.filter(w => w.id !== id);
        await saveWorks(newWorks);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Saving...');

        // Validation
        if (!formData.id || !formData.title || !formData.slug) {
            setStatus('Error: Title, ID and Slug are required');
            return;
        }

        let newWorks = [...works];

        if (editingId) {
            // Update existing
            const index = newWorks.findIndex(w => w.id === editingId);
            if (index !== -1) {
                newWorks[index] = formData;
            }
        } else {
            // Add new
            // Check for duplicate ID
            if (newWorks.some(w => w.id === formData.id)) {
                setStatus('Error: ID already exists');
                return;
            }
            newWorks.unshift(formData); // Add to top
        }

        await saveWorks(newWorks);

        // Reset form
        setEditingId(null);
        setFormData({
            id: '',
            slug: '',
            title: '',
            category: 'Commercial',
            thumbnailUrl: '',
            videoUrl: '',
            description: '',
            year: new Date().getFullYear().toString()
        });
    };

    const saveWorks = async (newWorks: Work[]) => {
        try {
            const res = await fetch('/api/works', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newWorks)
            });

            if (res.ok) {
                setWorks(newWorks);
                setStatus('Saved successfully!');
                setTimeout(() => setStatus(''), 3000);
            } else {
                setStatus('Failed to save.');
            }
        } catch (err) {
            setStatus('Error saving data.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) return <div className="p-10 text-white">Loading...</div>;

    return (
        <div style={{ minHeight: '100vh', background: '#111', color: '#eee', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="title-medium">Portfolio CMS</h1>
                <Link href="/" className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>View Site</Link>
            </div>

            {status && <div style={{
                padding: '1rem',
                background: status.includes('Error') || status.includes('Failed') ? '#500' : '#050',
                marginBottom: '1rem',
                borderRadius: '4px'
            }}>{status}</div>}

            {/* Editor Form */}
            <form onSubmit={handleSave} style={{
                background: '#222',
                padding: '2rem',
                borderRadius: '8px',
                marginBottom: '4rem',
                border: '1px solid #333'
            }}>
                <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-color)' }}>
                    {editingId ? 'Edit Project' : 'Add New Project'}
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="input-group">
                        <label>Title</label>
                        <input name="title" value={formData.title} onChange={handleChange} placeholder="Project Title" required />
                    </div>
                    <div className="input-group">
                        <label>ID (Unique)</label>
                        <input name="id" value={formData.id} onChange={handleChange} placeholder="unique-id" required disabled={!!editingId} />
                    </div>
                    <div className="input-group">
                        <label>Slug (URL)</label>
                        <input name="slug" value={formData.slug} onChange={handleChange} placeholder="url-slug" required />
                    </div>
                    <div className="input-group">
                        <label>Year</label>
                        <input name="year" value={formData.year} onChange={handleChange} placeholder="2024" />
                    </div>
                    <div className="input-group">
                        <label>Thumbnail URL</label>
                        <input name="thumbnailUrl" value={formData.thumbnailUrl} onChange={handleChange} placeholder="/images/thumb.jpg or https://..." />
                    </div>
                    <div className="input-group">
                        <label>Video URL</label>
                        <input name="videoUrl" value={formData.videoUrl} onChange={handleChange} placeholder="/video.mp4 or YouTube/Vimeo URL" />
                    </div>
                    <div className="input-group">
                        <label>Category</label>
                        <input name="category" value={formData.category} onChange={handleChange} placeholder="Commercial, Music Video, etc." />
                    </div>
                </div>

                <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                    <label>Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows={4} style={{ width: '100%' }} />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" className="btn" style={{ background: 'var(--accent-color)', color: 'white', border: 'none' }}>
                        {editingId ? 'Update Project' : 'Create Project'}
                    </button>
                    {editingId && (
                        <button type="button" onClick={() => {
                            setEditingId(null);
                            setFormData({
                                id: '',
                                slug: '',
                                title: '',
                                category: 'Commercial',
                                thumbnailUrl: '',
                                videoUrl: '',
                                description: '',
                                year: new Date().getFullYear().toString()
                            });
                        }} className="btn" style={{ background: '#444', color: 'white', border: 'none' }}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* List */}
            <h2 style={{ marginBottom: '1rem' }}>Current Projects ({works.length})</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
                {works.map(work => (
                    <div key={work.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: '#1a1a1a',
                        padding: '1rem',
                        borderRadius: '4px',
                        borderLeft: `4px solid var(--accent-color)`
                    }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ width: '60px', height: '40px', background: '#333', overflow: 'hidden' }}>
                                {work.thumbnailUrl && <img src={work.thumbnailUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                            </div>
                            <div>
                                <div style={{ fontWeight: 'bold' }}>{work.title}</div>
                                <div style={{ fontSize: '0.8rem', color: '#666' }}>/{work.slug} — {work.year}</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => handleEdit(work)} style={{ padding: '0.5rem', background: '#333', color: 'white', border: 'none', cursor: 'pointer' }}>Edit</button>
                            <button onClick={() => handleDelete(work.id)} style={{ padding: '0.5rem', background: '#500', color: 'white', border: 'none', cursor: 'pointer' }}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
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
