# Project images (MISSING — drop originals here)

The workspace started empty, so the original project artwork was not available
to reuse. Place the real images at these exact paths (or edit `lib/projects.ts`):

| Project    | Expected file                 | Subject |
| ---------- | ----------------------------- | ------- |
| NASCAR     | `public/images/nascar.jpg`    | Pink/purple NASCAR racing car |
| Shark Tank | `public/images/shark-tank.jpg`| Shark Tank studio set |
| Phocas     | `public/images/phocas.jpg`    | Phocas analytics dashboard on a tablet |
| Visa       | `public/images/visa.jpg`      | Visa wordmark artwork |

Optional Living Terrain hero artwork:
- `public/images/living-terrain.png` — then set `imageSrc` in
  `components/LivingTerrain.tsx`. Until then a procedural purple/magenta
  recreation is rendered in the brand palette.

`.jpg`, `.png`, `.webp`, and `.avif` all work. Until the real files exist, each
card renders an on-palette fallback (no unrelated stock imagery is substituted).
