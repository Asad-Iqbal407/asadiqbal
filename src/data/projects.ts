export type ProjectCatalogItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  featured: boolean;
};

export type ProjectRecord = Partial<ProjectCatalogItem> & {
  _id?: string;
};

// Project preview images using microlink screenshot service
export const projectCatalog: ProjectCatalogItem[] = [
  {
    id: 'video-downloader',
    image: 'https://api.microlink.io/?url=https://videodownloader-nu-six.vercel.app/&screenshot=true&meta=false&embed=screenshot.url',
    title: 'Video Downloader',
    description: 'Seamlessly save high-quality videos from YouTube & TikTok. Fast, free, and unlimited.',
    link: 'https://videodownloader-nu-six.vercel.app/',
    tags: ['React', 'Next.js', 'API'],
    featured: true
  },
  {
    id: 'tg-accessories',
    image: 'https://api.microlink.io/?url=https://tgaccessories.vercel.app/&screenshot=true&meta=false&embed=screenshot.url',
    title: 'TG Accessories',
    description: 'Premium tech accessories for your digital life. Power solutions, cables, and more.',
    link: 'https://tgaccessories.vercel.app/',
    tags: ['E-commerce', 'React', 'Tailwind'],
    featured: true
  },
  {
    id: 'pixel-arcade',
    image: 'https://api.microlink.io/?url=https://gamestudio-woad.vercel.app/&screenshot=true&meta=false&embed=screenshot.url',
    title: 'Pixel Arcade',
    description: 'A curated collection of timeless games reimagined with modern performance.',
    link: 'https://gamestudio-woad.vercel.app/',
    tags: ['Gaming', 'React', 'Canvas'],
    featured: true
  },
  {
    id: 'archery-duck-hunter',
    image: 'https://api.microlink.io/?url=https://duckshooting.vercel.app/&screenshot=true&meta=false&embed=screenshot.url',
    title: '3D Archery Duck Hunter',
    description: 'Master the bow and conquer the seasons in this immersive 3D archery game.',
    link: 'https://duckshooting.vercel.app/',
    tags: ['3D', 'Three.js', 'Game'],
    featured: true
  },
  {
    id: 'tertulia-impulsiva',
    image: 'https://api.microlink.io/?url=https://imobilerepairing-tau.vercel.app/&screenshot=true&meta=false&embed=screenshot.url',
    title: 'Tertulia Impulsiva',
    description: 'Specialized mobile phone repair services. Fast, reliable, and affordable repairs for all brands.',
    link: 'https://imobilerepairing-tau.vercel.app/',
    tags: ['Service', 'Business', 'React'],
    featured: true
  },
  {
    id: 'bombsquad',
    image: 'https://api.microlink.io/?url=https://bombsquad-tau.vercel.app/&screenshot=true&meta=false&embed=screenshot.url',
    title: 'BombSquad',
    description: 'Strategic arcade game. Survive, destroy, and conquer in this explosive space adventure.',
    link: 'https://bombsquad-tau.vercel.app/',
    tags: ['Gaming', 'React', 'Canvas'],
    featured: true
  },
  {
    id: 'lms-platform',
    image: 'https://api.microlink.io/?url=https://lms-jet-theta.vercel.app/&screenshot=true&meta=false&embed=screenshot.url',
    title: 'LMS Platform',
    description: 'Learning Management System with admin controls, course management, and student tracking.',
    link: 'https://lms-jet-theta.vercel.app/',
    tags: ['Education', 'Next.js', 'Dashboard'],
    featured: true
  },
  {
    id: 'stock-market-prediction',
    image: 'https://api.microlink.io/?url=https://stockmarketprediction-phi.vercel.app/&screenshot=true&meta=false&embed=screenshot.url',
    title: 'Stock Market Prediction',
    description: 'Data-driven stock forecasting with market signals and performance insights.',
    link: 'https://stockmarketprediction-phi.vercel.app/',
    tags: ['Finance', 'Analytics', 'ML'],
    featured: true
  }
];

const isNonEmpty = (value?: string) => typeof value === 'string' && value.trim().length > 0;

export const mergeProjects = (incoming?: ProjectRecord[]): ProjectCatalogItem[] => {
  if (!Array.isArray(incoming) || incoming.length === 0) {
    return projectCatalog;
  }

  const mergedCatalog = projectCatalog.map((catalogItem) => {
    const match = incoming.find(
      (project) => project.link === catalogItem.link || project.title === catalogItem.title
    );

    if (!match) {
      return catalogItem;
    }

    return {
      ...catalogItem,
      ...match,
      image: isNonEmpty(match.image) ? match.image!.trim() : catalogItem.image,
      title: isNonEmpty(match.title) ? match.title!.trim() : catalogItem.title,
      description: isNonEmpty(match.description) ? match.description!.trim() : catalogItem.description,
      link: isNonEmpty(match.link) ? match.link!.trim() : catalogItem.link,
      tags: Array.isArray(match.tags) && match.tags.length > 0 ? match.tags : catalogItem.tags,
      featured: typeof match.featured === 'boolean' ? match.featured : catalogItem.featured
    };
  });

  const extraProjects = incoming
    .filter((project) => {
      const existsInCatalog = projectCatalog.some(
        (catalogItem) => catalogItem.link === project.link || catalogItem.title === project.title
      );
      return !existsInCatalog && isNonEmpty(project.title) && isNonEmpty(project.image) && isNonEmpty(project.link);
    })
    .map((project, index) => ({
      id: project.id ?? project._id ?? `extra-${index}`,
      title: project.title!.trim(),
      description: isNonEmpty(project.description) ? project.description!.trim() : 'Project description coming soon.',
      image: project.image!.trim(),
      link: project.link!.trim(),
      tags: Array.isArray(project.tags) ? project.tags : [],
      featured: typeof project.featured === 'boolean' ? project.featured : false
    }));

  return [...mergedCatalog, ...extraProjects];
};
