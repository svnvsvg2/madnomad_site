# MADNOMAD COLLECTIVE - Portfolio Site

A minimalist portfolio website built with Next.js, featuring a built-in CMS for easy content management.

## 🚀 Quick Start

### Local Development
```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to view the site.

### Content Management
Visit `http://localhost:3000/admin` to add/edit your portfolio projects.

## 📁 Adding Images

1. Place your images in the `public/img/` folder
2. In the Admin panel, reference them as: `/img/your-image.jpg`

## 🎥 Video Support

The site supports:
- **YouTube**: Paste the full URL (e.g., `https://www.youtube.com/watch?v=...`)
- **Vimeo**: Paste the full URL (e.g., `https://vimeo.com/...`)
- **Direct files**: Upload to `public/` and use `/video.mp4`

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"

**Note**: The Admin panel works locally. For production, edit `src/data/works.json` and push changes to GitHub.

### Manual Deployment Steps

```bash
# Build the production version
npm run build

# Test the production build locally
npm start
```

## 📝 Project Structure

```
├── public/
│   ├── img/          # Your thumbnail images
│   └── logo.png      # Site logo
├── src/
│   ├── app/
│   │   ├── admin/    # CMS Admin panel
│   │   ├── work/     # Project detail pages
│   │   └── page.tsx  # Homepage
│   ├── data/
│   │   └── works.json # Your portfolio data
│   └── lib/
│       └── data.ts   # Data types
```

## 🎨 Customization

- **Colors**: Edit `src/app/globals.css` (look for `--accent-color`)
- **Logo**: Replace `public/logo.png`
- **Content**: Use the Admin panel at `/admin`

---

Built with ❤️ using Next.js, Framer Motion, and TypeScript.
