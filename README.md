# Curriculum Vitae Site for Matthew "Lanoid" Lane

What I have done in my career, what I enjoyed, what I didn't and little bio down at the bottom. One page index.html because who needs more than one page?

![Netlify Status](https://api.netlify.com/api/v1/badges/458b77fa-816a-4d13-8033-0be6f0768ba3/deploy-status)

## Build System

This project now uses **Rollup** instead of Gulp for a more modern build process.

### Available Scripts

- `npm run dev` - Start development server with live reload at http://localhost:3000
- `npm run build` - Build for production (outputs to `serve/` folder)
- `npm run serve` - Start development server without watch mode

### Development

1. Install dependencies: `npm install`
2. Start development: `npm run dev`
3. Your site will open at `http://localhost:3000` with live reload enabled

### Build Process

The build system:
- Compiles LESS files to CSS (`lanoid.less` → `lanoid.css`, `lanoid-print.less` → `lanoid-print.css`)
- Copies HTML files and assets to the `serve/` directory
- Provides live reload during development
- Optimizes CSS for production builds

### Deployment

Run `npm run build` to create the production build in the `serve/` folder, then deploy that folder.
