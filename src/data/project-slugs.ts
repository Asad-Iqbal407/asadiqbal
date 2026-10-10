// Slugs of projects that have their own page at /projects/[slug].
// Kept separate from project-details.ts so client components can import it
// without pulling in all of the long-form content.
export const projectPageSlugs = [
  'video-downloader',
  'tg-accessories',
  'pixel-arcade',
  'archery-duck-hunter',
  'tertulia-impulsiva',
  'bombsquad',
  'lms-platform',
  'stock-market-prediction',
] as const;

export type ProjectSlug = (typeof projectPageSlugs)[number];

export const hasProjectPage = (id: string): id is ProjectSlug =>
  (projectPageSlugs as readonly string[]).includes(id);
