# Asad Iqbal: Portfolio

Personal portfolio and project showcase of Asad Iqbal, a full stack developer based in Lisbon, Portugal.

**Live site:** https://asadiqbal.vercel.app

## What's inside

- Single-page portfolio: hero, about, skills, featured work, education and certifications, contact form
- Individual pages for every project (`/projects/[slug]`) and in-depth case studies (`/case-studies/[slug]`)
- Contact form that stores messages in MongoDB, with a private admin inbox at `/admin`
- SEO: per-page metadata, Open Graph image, JSON-LD structured data, sitemap and robots

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · MongoDB (Mongoose) · jose (JWT) · bcryptjs

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Signs admin session tokens (32+ random characters) |
| `NEXT_PUBLIC_SITE_URL` | Public URL used for canonical links, sitemap and structured data |

The site still renders without a database: projects and certificates fall back to the bundled catalogs in `src/data`. The database is needed for the contact form and the admin inbox.

### Creating the admin account

Credentials are read from the environment only, never from source code. Running the script again resets the password.

```bash
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='a long unique passphrase' npm run create-admin
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run create-admin` | Create or reset the admin account |
| `npm run upsert-projects` | Add extra projects to the database without overwriting existing ones |

## Project structure

```
src/
  app/            Routes: home, /projects, /case-studies, /admin, API routes
  components/     UI components (navigation, sliders, forms, JSON-LD, ...)
  data/           Project, case study and certificate content
  lib/            Database connection, auth tokens, rate limiting, SEO constants
  models/         Mongoose models
scripts/          One-off maintenance scripts
```

## Security notes

- Admin sessions use signed, expiring JWTs. Login and the contact form are rate limited, and the contact form has a honeypot field.
- The rate limiter is in-memory per server instance. For a strict global limit, back it with a shared store such as Redis.
- Security headers are set in `next.config.mjs`.

## Deployment

Deployed on [Vercel](https://vercel.com). Set the environment variables above in the project settings; pushes to `master` deploy to production.
