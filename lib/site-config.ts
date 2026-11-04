/**
 * Central site configuration.
 *
 * IMPORTANT: Destinations below marked with `TODO` are placeholders because the
 * real URLs were NOT available in the repository (the workspace started empty).
 * Per the build brief, destinations are exposed here as configuration variables
 * instead of being invented. Replace the TODO values with the real ones.
 */

export interface SiteConfig {
  name: string;
  /** Short role used in the footer. */
  role: string;
  /** Full positioning title used across the site. */
  title: string;
  /** Primary professional proposition (hero-adjacent). */
  statement: string;
  /** Supporting capability statement. */
  capabilityStatement: string;
  location: string;
  website: {
    label: string;
    url: string;
  };
  links: {
    linkedin: string;
    /** Contact destination (mailto: or form URL). */
    contact: string;
    /** Path to the downloadable CV under /public. */
    cv: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'Luis Suarez',
  role: 'Senior Product Designer',
  title: 'Senior Product Designer · AI Products & UX Engineering',
  statement:
    'I turn complex problems into clear, useful digital products — connecting product thinking, experience design, AI systems, and technology.',
  capabilityStatement:
    'I design and build intelligent digital experiences, combining product strategy, human-centered design, AI models, agentic workflows, and frontend engineering.',
  location: 'Manizales, Colombia',
  website: {
    label: 'luissuarezuxc.com',
    url: 'https://luissuarezuxc.com',
  },
  links: {
    linkedin: 'https://www.linkedin.com/in/luis-suarezux/',
    contact: 'mailto:luisksuarez@gmail.com',
    /** CV lives in public/docs so it ships in the static export. */
    cv: '/docs/luis-suarez-cv-2026-1.pdf',
  },
};
