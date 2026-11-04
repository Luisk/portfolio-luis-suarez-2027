/**
 * Selected Work project data.
 *
 * Order and layout are fixed by the brief:
 *   1. NASCAR      — full width
 *   2. Shark Tank  — half width  (shares a row with Phocas)
 *   3. Phocas      — half width  (shares a row with Shark Tank)
 *   4. Visa        — full width
 *
 * Overplay App and FIFA World Cup are intentionally excluded.
 *
 * ASSET STATUS: the workspace started empty, so the original project images and
 * case-study PDFs were NOT available to reuse. The `image` and `pdfUrl` fields
 * below point at the conventional locations under /public. Drop the real assets
 * at those paths (or edit the paths) and no code changes are required.
 *   - Images  -> public/images/<slug>.*  (jpg/png/webp)
 *   - PDFs    -> public/projects/<slug>.pdf
 * If a PDF is missing, the card stays clickable but its href is configurable here.
 */

export type ProjectSpan = 'full' | 'half';

export interface Project {
  slug: string;
  title: string;
  description: string;
  /** Path to the hero image under /public. Replace with the original artwork. */
  image: string;
  /** Alt text for accessibility. */
  imageAlt: string;
  /** Case-study PDF opened in a new tab. Null => asset missing, see report. */
  pdfUrl: string | null;
  span: ProjectSpan;
  /** Tailwind object-position tuning so the subject sits toward the right. */
  imagePosition?: string;
}

export const projects: Project[] = [
  {
    slug: 'nascar',
    title: 'NASCAR',
    description: 'Turning spectators into players.',
    image: '/images/nascar.jpg',
    imageAlt:
      'A pink and purple NASCAR stock car in motion, rendered in a neon, futuristic style.',
    pdfUrl: '/projects/nascar.pdf',
    span: 'full',
    imagePosition: 'object-right',
  },
  {
    slug: 'shark-tank',
    title: 'Shark Tank',
    description: 'Interactive experiences for a global TV franchise.',
    image: '/images/shark-tank.jpg',
    imageAlt:
      'The Shark Tank television studio set with the illuminated logo and seating.',
    pdfUrl: '/projects/shark-tank.pdf',
    span: 'half',
    imagePosition: 'object-right',
  },
  {
    slug: 'phocas',
    title: 'Phocas',
    description: 'Making data decision-ready for business users.',
    image: '/images/phocas.jpg',
    imageAlt:
      'The Phocas analytics dashboard shown on a tablet with magenta data charts.',
    pdfUrl: '/projects/phocas.pdf',
    span: 'half',
    imagePosition: 'object-right',
  },
  {
    slug: 'visa',
    title: 'Visa',
    description: 'Simplifying complex financial experiences.',
    image: '/images/visa.jpg',
    imageAlt:
      'The Visa wordmark on a purple financial-themed backdrop with a glowing light streak.',
    pdfUrl: '/projects/visa.pdf',
    span: 'full',
    imagePosition: 'object-right',
  },
];
