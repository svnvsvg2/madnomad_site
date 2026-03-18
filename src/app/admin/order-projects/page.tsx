"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Work {
    id: string;
    title: string;
}

export default function OrderProjectsPage() {
    const [works, setWorks] = useState<Work[]>([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

    useEffect(() => {
        fetch('/api/works')
            .then(res => res.json())
            .then(data => {
                setWorks(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIdx(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault(); // Necessary to allow dropping
        e.dataTransfer.dropEffect = 'move';
        
        if (draggedIdx === null || draggedIdx === index) return;

        // Reorder array optimally based on mouse over
        const newWorks = [...works];
        const draggedItem = newWorks[draggedIdx];
        newWorks.splice(draggedIdx, 1);
        newWorks.splice(index, 0, draggedItem);
        
        setDraggedIdx(index);
        setWorks(newWorks);
    };

    const handleDragEnd = () => {
        setDraggedIdx(null);
    };

    const handleSaveOrder = async () => {
        setStatus('Saving...');
        try {
            const orderedIds = works.map(w => w.id);
            const res = await fetch('/api/works/reorder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderedIds })
            });

            if (res.ok) {
                setStatus('Order saved successfully!');
                setTimeout(() => setStatus(''), 3000);
            } else {
                setStatus('Failed to save order.');
            }
        } catch (err) {
            console.error(err);
            setStatus('Error saving order.');
        }
    };

    if (loading) return <div className="p-10 text-white">Loading...</div>;

    return (
        <div style={{ minHeight: '100vh', background: '#111', color: '#eee', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', maxWidth: '600px' }}>
                <h1 style={{ color: 'var(--accent-color)' }}>Order Projects</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={async () => {
                            if (!confirm('Deploy changes to live website? This may take a minute.')) return;
                            try {
                                const res = await fetch('/api/deploy', { method: 'POST' });
                                const data = await res.json();
                                alert(data.message || data.error);
                            } catch (e) {
                                alert('Error deploying site.');
                            }
                        }}
                        className="btn"
                        style={{ padding: '0.5rem 1rem', background: '#0a0', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Deploy Live
                    </button>
                    <Link href="/admin" className="btn" style={{ padding: '0.5rem 1rem', background: '#333', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Back to Admin</Link>
                </div>
            </div>

            {status && (
                <div style={{ background: status.includes('Error') || status.includes('Failed') ? '#500' : '#050', padding: '1rem', marginBottom: '1rem', borderRadius: '4px', maxWidth: '600px' }}>
                    {status}
                </div>
            )}

            <p style={{ marginBottom: '2rem', color: '#aaa', maxWidth: '600px' }}>
                Drag and drop projects to change their display order on the main site.
            </p>

            <div style={{ background: '#222', padding: '1rem', borderRadius: '8px', border: '1px solid #333', maxWidth: '600px' }}>
                {works.map((work, idx) => (
                    <div
                        key={work.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, idx)}
                        onDragOver={(e) => handleDragOver(e, idx)}
                        onDragEnd={handleDragEnd}
                        style={{
                            padding: '1rem',
                            marginBottom: '0.5rem',
                            background: draggedIdx === idx ? '#444' : '#1a1a1a',
                            border: '1px solid #333',
                            borderRadius: '4px',
                            cursor: 'grab',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            opacity: draggedIdx === idx ? 0.5 : 1,
                            transition: 'background 0.2s ease, opacity 0.2s ease'
                        }}
                    >
                        <div style={{ cursor: 'grab', color: '#888', fontSize: '1.2rem', paddingRight: '0.5rem' }}>≡</div>
                        <div style={{ fontWeight: 'bold' }}>{work.title}</div>
                    </div>
                ))}
            </div>

            <button
                onClick={handleSaveOrder}
                className="btn"
                style={{ marginTop: '2rem', background: 'var(--accent-color)', color: 'white', border: 'none', padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '4px', cursor: 'pointer' }}
            >
                Save New Order
            </button>
        </div>
    );
}
