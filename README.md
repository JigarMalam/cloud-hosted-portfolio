# Jigar Malam — DevOps & Cloud Portfolio

A cinematic, Cloudflare-friendly static portfolio with:

- Three.js WebGL hero scene with an interactive 3D wireframe core and starfield
- GSAP + ScrollTrigger motion
- AOS reveal animations
- CSS keyframes, gradients, glow, glassmorphism and hover effects
- Interactive tilt cards and magnetic buttons
- Responsive mobile navigation
- Dark/light visual mode
- Reduced-motion accessibility handling
- No build step required for the static version

## Deploy with Cloudflare Pages / Workers Assets

### Option 1 — Git integration
1. Push this folder to GitHub.
2. In Cloudflare, create a Pages project or Workers static assets project.
3. Point the project at the repository.
4. For the no-build static setup, use the repository root as the output directory.
5. Deploy.

### Option 2 — Wrangler

```bash
npx wrangler deploy
```

The included `wrangler.toml` uses the current directory as the static assets directory.

## Important: replace placeholders

Search `index.html` for:

- `your-email@example.com`
- `https://www.linkedin.com/`
- `https://github.com/`

Replace these with your real profile/contact URLs.

## Libraries

The page loads GSAP 3.13.0, AOS 2.3.4 and Three.js 0.185.1 from CDNs, so there is no npm build required. Three.js documents CDN loading through ES modules/import maps, and GSAP supports direct script-tag loading. For production hardening, you can vendor these dependencies locally later.
