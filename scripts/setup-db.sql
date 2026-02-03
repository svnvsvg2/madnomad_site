CREATE TABLE IF NOT EXISTS works (
  id TEXT PRIMARY KEY, /* Changed to TEXT for custom IDs */
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT,
  thumbnail_url TEXT,
  video_url TEXT,
  description TEXT,
  year TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS site_content (
  key TEXT PRIMARY KEY,
  value JSONB
);

/* Insert default content row */
INSERT INTO site_content (key, value) VALUES 
('site_data', '{
  "home": { "heroBackground": "" },
  "about": { 
    "title": "ABOUT US", 
    "paragraphs": ["MADNOMAD is a collective..."] 
  },
  "contact": {
    "title": "CONTACT",
    "intro": "Interested in...",
    "email": "contact@madnomad.kz",
    "socials": []
  }
}') ON CONFLICT DO NOTHING;
