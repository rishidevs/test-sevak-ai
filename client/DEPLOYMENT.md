# Deployment Guide for SevakAI Frontend

## 🚀 Quick Deploy Options

### 1. Vercel (Recommended - Easiest)

1. **Go to [Vercel](https://vercel.com)** and sign up/login
2. **Click "New Project"**
3. **Import your GitHub repository** (xenon1919/test-sevakai)
4. **Configure the project:**
   - Framework Preset: Vite
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Add Environment Variables** (if needed):
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
6. **Click "Deploy"**

Your site will be live at: `https://your-project-name.vercel.app`

### 2. Netlify

1. **Go to [Netlify](https://netlify.com)** and sign up/login
2. **Click "New site from Git"**
3. **Connect to GitHub** and select your repository
4. **Configure build settings:**
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `dist`
5. **Click "Deploy site"**

### 3. GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json:**
   ```json
   {
     "homepage": "https://xenon1919.github.io/test-sevakai",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

## 🔧 Manual Deployment Steps

### Prerequisites
- Node.js 20.x or higher
- Git

### Local Setup
```bash
# Clone the repository
git clone https://github.com/xenon1919/test-sevakai.git
cd test-sevakai/client

# Install dependencies
npm install

# Build for production
npm run build

# Preview the build
npm run preview
```

### Environment Variables
Create a `.env` file in the `client` directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📁 Project Structure

```
client/
├── src/                    # Source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── lib/               # Utilities and configs
│   └── main.tsx           # Entry point
├── public/                # Static assets
│   ├── assets/            # Images and media
│   ├── logos/             # Logo files
│   └── images/            # Additional images
├── dist/                  # Build output (generated)
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS config
├── vercel.json           # Vercel deployment config
└── netlify.toml          # Netlify deployment config
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type check
- `npm run test` - Run tests

## 🔍 Troubleshooting

### Image Loading Issues

If images are not loading in production but work locally:

1. **Check File Paths**: Ensure all images are in the `public/` directory
2. **Verify Image Sizes**: Some platforms have file size limits (usually 50MB per file)
3. **Check Network Tab**: Open browser dev tools and check the Network tab for failed image requests
4. **Clear Cache**: Clear browser cache and try again

### Build Issues
1. **Node version**: Ensure you're using Node.js 20.x
2. **Dependencies**: Run `npm install` to install all dependencies
3. **TypeScript errors**: Run `npm run check` to see type errors

### Deployment Issues
1. **Build fails**: Check the build logs for specific errors
2. **Environment variables**: Ensure all required env vars are set
3. **404 errors**: Check if your hosting platform supports SPA routing

### Common Issues
- **Large bundle size**: The build warning about chunk size is normal for this app
- **Supabase connection**: Ensure your Supabase project is active and accessible
- **Image file sizes**: Some images are large (2-3MB). Consider optimizing them if deployment fails

## 🖼️ Image Optimization

If you encounter issues with large image files:

1. **Compress Images**: Use tools like TinyPNG or ImageOptim
2. **Convert to WebP**: Modern format with better compression
3. **Use CDN**: Consider using a CDN for image hosting
4. **Lazy Loading**: Images are already set up with lazy loading

## 📞 Support

If you encounter any issues:
1. Check the build logs in your deployment platform
2. Verify all environment variables are set correctly
3. Ensure your Supabase project is properly configured
4. Check the browser console for any JavaScript errors

## 🎉 Success!

Once deployed, your SevakAI frontend will be live and accessible to users worldwide!

### Deployment Checklist
- [ ] All images are in `public/assets/` directory
- [ ] Image paths use `/assets/` prefix (not relative paths)
- [ ] Build completes successfully
- [ ] No console errors in browser
- [ ] Images load properly in production
- [ ] All pages are accessible
- [ ] Chatbot functionality works
