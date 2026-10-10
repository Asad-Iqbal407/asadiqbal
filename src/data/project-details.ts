import type { ProjectSlug } from './project-slugs';

export type ProjectDetail = {
  slug: ProjectSlug;
  name: string;
  /** schema.org applicationCategory */
  category: string;
  /** Short line shown under the title and used in the <title> tag. */
  tagline: string;
  /** Meta description, aim for <= 160 characters. */
  summary: string;
  overview: string[];
  features: string[];
  stack: { name: string; note: string }[];
  repo?: string;
  /** Slug of a related case study, if one exists. */
  caseStudy?: string;
};

// NOTE: Everything below is taken from the live sites and the public GitHub
// repositories. TODO(asad): add your own story (goals, what was hard, results)
// to each overview; only add numbers or claims you can stand behind.
export const projectDetails: Record<ProjectSlug, ProjectDetail> = {
  'video-downloader': {
    slug: 'video-downloader',
    name: 'Video Downloader',
    category: 'MultimediaApplication',
    tagline: 'Save YouTube, TikTok and X videos from the browser',
    summary:
      'Video Downloader is a Next.js web app by Asad Iqbal for saving videos from YouTube, TikTok and X, with video, audio-only and GIF options.',
    overview: [
      'Video Downloader (shown on the site as VideoDownloader Pro) is a single-page web tool for saving videos from YouTube, TikTok and X (formerly Twitter). The page is split into one settings block per platform, so each service gets the options that make sense for it.',
      'It is built with Next.js and TypeScript, and uses server-side media tooling (ytdl-core and FFmpeg) to fetch streams and process audio. The interface keeps a download history so recent links are easy to find again.',
    ],
    features: [
      'YouTube: choose the best available video with audio, or audio only.',
      'TikTok: options to prefer HD, include the watermarked version, or save audio only.',
      'X: option to include GIFs. Only public videos are supported; private or age-restricted posts may fail.',
      'A download history panel on the same page.',
    ],
    stack: [
      { name: 'Next.js 16 & React 19', note: 'App Router application and UI.' },
      { name: 'TypeScript', note: 'Typed code across the app.' },
      { name: 'Tailwind CSS 4', note: 'Styling.' },
      { name: '@distube/ytdl-core', note: 'Retrieving YouTube video and audio streams.' },
      { name: 'FFmpeg (fluent-ffmpeg, ffmpeg-static)', note: 'Media processing and audio conversion.' },
      { name: 'Axios', note: 'HTTP client for platform requests.' },
    ],
    repo: 'https://github.com/Asad-Iqbal407/videodownloader',
  },

  'tg-accessories': {
    slug: 'tg-accessories',
    name: 'TG Accessories',
    category: 'ShoppingApplication',
    tagline: 'Online storefront for tech accessories',
    summary:
      'TG Accessories is a Next.js e-commerce storefront by Asad Iqbal for SIMs, chargers, cables and power banks, with a blog, cart and contact page.',
    overview: [
      'TG Accessories is an online storefront for tech accessories. The catalogue covers SIMs, chargers, cables and power banks, presented through a hero banner, category blocks and featured promotions.',
      'The site has a cart, a blog and a contact page, plus trust blocks for delivery, quality and support. Under the hood it is a Next.js and Tailwind CSS 4 application with MongoDB for data, Stripe for payments and token-based authentication.',
    ],
    features: [
      'Category browsing for SIMs, chargers, cables and power banks.',
      'Featured promotions and a hero section on the home page.',
      'Shopping cart page and a contact page.',
      'Blog, with Markdown rendering for posts.',
      'Delivery, quality-guarantee and support highlights.',
    ],
    stack: [
      { name: 'Next.js 16 & React 19', note: 'Application framework.' },
      { name: 'TypeScript', note: 'Typed code across the app.' },
      { name: 'Tailwind CSS 4 & Framer Motion', note: 'Styling and animation.' },
      { name: 'MongoDB', note: 'Database, configured through MONGODB_URI.' },
      { name: 'Stripe', note: 'Payments integration (stripe and @stripe/stripe-js).' },
      { name: 'bcryptjs, jose & jsonwebtoken', note: 'Password hashing and token-based sessions.' },
      { name: 'react-markdown', note: 'Rendering blog content.' },
    ],
    repo: 'https://github.com/Asad-Iqbal407/tgaccessories',
  },

  'pixel-arcade': {
    slug: 'pixel-arcade',
    name: 'Pixel Arcade',
    category: 'GameApplication',
    tagline: 'A browser arcade of classic games',
    summary:
      'Pixel Arcade is a browser-based collection of retro games by Asad Iqbal, including Snake, Tetris, Pong and Flappy, with instant play and a responsive layout.',
    overview: [
      'Pixel Arcade is a browser game hub with a retro "next gen arcade" look. It brings together classic arcade ideas such as Snake, Tetris, Pong and a Flappy-style endless runner, along with newer titles including a space shooter, a bubble shooter, a platformer and an archery duck hunt.',
      'Every game runs directly in the browser with no download or install, and the layout adapts to desktop, tablet and mobile. Each game has its own card with a short description and a Play Now link, and newer additions are tagged NEW.',
    ],
    features: [
      'Ten playable games across classic, puzzle, endless, sports, action, shooter and platformer genres.',
      'Instant play in the browser, with no downloads or installation.',
      'Responsive design for desktop, tablet and mobile.',
      'Card-based game grid with genre labels and NEW badges.',
    ],
    stack: [
      { name: 'Next.js & React', note: 'Application framework and UI.' },
      { name: 'Tailwind CSS', note: 'Styling.' },
      { name: 'Framer Motion', note: 'Interface animation.' },
      { name: 'HTML Canvas', note: 'Rendering the individual games.' },
    ],
  },

  'archery-duck-hunter': {
    slug: 'archery-duck-hunter',
    name: '3D Archery Duck Hunter',
    category: 'GameApplication',
    tagline: 'A 3D archery game you can play with your hand',
    summary:
      '3D Archery Duck Hunter is a browser game by Asad Iqbal built with Three.js and MediaPipe: aim with your mouse, tap on mobile, or pinch to fire with your webcam.',
    overview: [
      'Duck Hunter 3D is an archery game played in the browser. You shoot arrows at ducks across three seasonal stages, and you can play with a mouse, by tapping on a phone, or hands-free with your webcam, where hand tracking aims the bow and a pinch gesture fires.',
      'It is written as plain ES modules with no build step: Three.js renders the 3D scene and MediaPipe Hands handles the webcam hand tracking. The full write-up covers how the arrow physics, stage system and gesture controls work.',
    ],
    features: [
      'Three play modes: mouse and click, webcam hand tracking with pinch to fire, and tap controls on mobile.',
      'Three seasonal stages: Cherry Blossom, Golden Autumn and Crystal Glacier, each with its own colours, falling particles and difficulty.',
      'Arrows follow a gravity arc and fire at full power, with a short reload between shots.',
      'Headshots score 500 points; normal hits score 100.',
      'On-screen score, stage name and arrows remaining.',
    ],
    stack: [
      { name: 'Three.js r160', note: '3D rendering, loaded as an ES module through an import map.' },
      { name: 'MediaPipe Hands', note: 'In-browser hand tracking from the webcam.' },
      { name: 'JavaScript (ES modules)', note: 'Game logic in a single game.js file, no build step.' },
      { name: 'Vercel', note: 'Static hosting.' },
    ],
    repo: 'https://github.com/Asad-Iqbal407/duckshooting',
    caseStudy: 'hand-tracking-archery-game',
  },

  'tertulia-impulsiva': {
    slug: 'tertulia-impulsiva',
    name: 'Tertulia Impulsiva',
    category: 'BusinessApplication',
    tagline: 'Website for a mobile phone repair service',
    summary:
      'Tertulia Impulsiva is a Next.js business website by Asad Iqbal for a mobile phone repair service covering all brands.',
    overview: [
      'Tertulia Impulsiva is a website for a specialised mobile phone repair business, presenting its fast, reliable and affordable repairs for all brands.',
      'It is a Next.js and TypeScript application styled with Tailwind CSS and Framer Motion. The project is set up with MongoDB through Mongoose, Stripe for payments, and Nodemailer for transactional email.',
    ],
    features: [
      'Service-focused business website for a phone repair shop.',
      'Animated, responsive interface.',
      'Toast notifications for user feedback.',
      'Email sending support through Nodemailer.',
    ],
    stack: [
      { name: 'Next.js 16 & React 19', note: 'Application framework.' },
      { name: 'TypeScript', note: 'Typed code across the app.' },
      { name: 'Tailwind CSS 4 & Framer Motion', note: 'Styling and animation.' },
      { name: 'MongoDB (Mongoose)', note: 'Data storage.' },
      { name: 'Stripe', note: 'Payments integration.' },
      { name: 'Nodemailer', note: 'Sending email.' },
      { name: 'Sonner', note: 'Toast notifications.' },
    ],
    repo: 'https://github.com/Asad-Iqbal407/imobilerepairing',
  },

  bombsquad: {
    slug: 'bombsquad',
    name: 'BombSquad',
    category: 'GameApplication',
    tagline: 'A bomb-placing arcade game set on a space station',
    summary:
      'BombSquad is a browser arcade game by Asad Iqbal built with Next.js: guide an astronaut across a brick grid and place bombs. Play with the keyboard or on-screen buttons.',
    overview: [
      'BombSquad is an arcade game set on a space station. You move an astronaut across a grid of brick tiles and plant bombs, with the tagline "Survive, Destroy, Conquer".',
      'A sidebar HUD tracks lives, blast range, bomb count, fuse timer, power, speed and shield status. The game works with the keyboard on desktop and with on-screen buttons on touch devices.',
    ],
    features: [
      'Grid-based play on a brick-tile stage with an astronaut character.',
      'Keyboard controls: arrow keys to move and Space to plant a bomb.',
      'On-screen arrow and bomb buttons for touch devices.',
      'HUD showing score, lives, blast range, bombs, fuse timer, power, speed and shield.',
    ],
    stack: [
      { name: 'Next.js 16 & React 19', note: 'Application framework and UI.' },
      { name: 'TypeScript', note: 'Typed game and UI code.' },
      { name: 'Tailwind CSS 4', note: 'Styling.' },
      { name: 'React Compiler', note: 'Automatic memoisation via babel-plugin-react-compiler.' },
    ],
    repo: 'https://github.com/Asad-Iqbal407/Bombsquad',
  },

  'lms-platform': {
    slug: 'lms-platform',
    name: 'LMS Platform',
    category: 'EducationalApplication',
    tagline: 'A role-based learning management system',
    summary:
      'A learning management system by Asad Iqbal built with Next.js, MongoDB and NextAuth, with separate student, teacher and admin areas, course enrolment and assignments.',
    overview: [
      'The LMS Platform is a learning management system for the University of Gujrat. It gives students, teachers and administrators their own areas: students browse offered courses and enrol, teachers manage their courses and set assignments, and administrators manage users and courses.',
      'It is built with the Next.js App Router, MongoDB through Mongoose, and NextAuth for sign-in. Submissions and grading are the next milestone. The case study explains the authentication, data model and tooling decisions.',
    ],
    features: [
      'Student self-registration and sign-in with email and password.',
      'Role-based areas for students, teachers and admins.',
      'Course catalogue with one-click enrolment for students.',
      'Teachers manage their own courses and create assignments for them.',
      'Admin tools for users and courses, including creating courses and switching a course on or off.',
      'Seed scripts for an admin, sample courses and a demo dataset.',
    ],
    stack: [
      { name: 'Next.js 16 (App Router)', note: 'Pages, layouts and route handlers.' },
      { name: 'MongoDB & Mongoose 9', note: 'Data storage and schemas.' },
      { name: 'NextAuth 4', note: 'Credentials sign-in with JWT sessions.' },
      { name: 'Zod 4', note: 'Validating sign-in and registration input.' },
      { name: 'bcryptjs', note: 'Password hashing.' },
      { name: 'Tailwind CSS 4 & TypeScript', note: 'Styling and typed code.' },
    ],
    repo: 'https://github.com/Asad-Iqbal407/lms',
    caseStudy: 'role-based-lms-nextjs',
  },

  'stock-market-prediction': {
    slug: 'stock-market-prediction',
    name: 'Stock Market Prediction',
    category: 'FinanceApplication',
    tagline: 'A decision-support dashboard for market leaders',
    summary:
      'StockPredictor AI is an educational Next.js dashboard by Asad Iqbal that ranks stocks with multi-factor scoring across technical momentum, fundamentals and downside risk.',
    overview: [
      'StockPredictor AI is a decision-support dashboard for analysing market leaders. It ranks stocks using multi-factor scoring across technical momentum, fundamentals and downside risk, and each recommendation comes with a confidence level, a risk class and a signal-quality rating.',
      'The site is explicitly educational: it states that it is not financial advice and that model output can be wrong, and it tells users to cross-check filings, earnings and macro conditions before investing.',
    ],
    features: [
      'Multi-factor scoring across technical momentum, fundamentals and downside risk.',
      'Each recommendation shows confidence, risk class and signal quality.',
      'Dashboard and market views.',
      'Clear educational-use disclaimers.',
    ],
    stack: [
      { name: 'Next.js 16 & React 19', note: 'Application framework and UI.' },
      { name: 'TypeScript', note: 'Typed code across the app.' },
      { name: 'yahoo-finance2', note: 'Market data retrieval.' },
      { name: 'technicalindicators', note: 'Computing technical indicators.' },
      { name: 'Recharts', note: 'Charts.' },
      { name: 'Tailwind CSS 4', note: 'Styling.' },
    ],
    repo: 'https://github.com/Asad-Iqbal407/stockmarketprediction',
  },
};

export const getProjectDetail = (slug: string): ProjectDetail | undefined =>
  (projectDetails as Record<string, ProjectDetail | undefined>)[slug];
