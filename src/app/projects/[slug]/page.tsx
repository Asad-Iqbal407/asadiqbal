import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import JsonLdScript from "@/components/JsonLdScript";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { getCaseStudy } from "@/data/case-studies";
import { getProjectDetail, projectDetails } from "@/data/project-details";
import { projectCatalog } from "@/data/projects";
import { projectPageSlugs } from "@/data/project-slugs";
import { SITE_URL } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projectPageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = getProjectDetail(slug);
  if (!detail) return {};

  const title = `${detail.name}: ${detail.tagline}`;
  return {
    title,
    description: detail.summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${title} | Asad Iqbal`,
      description: detail.summary,
      url: `${SITE_URL}/projects/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Asad Iqbal`,
      description: detail.summary,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const detail = getProjectDetail(slug);
  const catalogItem = projectCatalog.find((p) => p.id === slug);
  if (!detail || !catalogItem) notFound();

  const caseStudy = detail.caseStudy ? getCaseStudy(detail.caseStudy) : undefined;

  const related = projectCatalog
    .filter((p) => p.id !== slug && p.id in projectDetails)
    .map((p) => ({
      project: p,
      shared: p.tags.filter((tag) => catalogItem.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.shared - a.shared)
    .slice(0, 3)
    .map((r) => r.project);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: detail.name,
    description: detail.summary,
    url: `${SITE_URL}/projects/${slug}`,
    sameAs: [catalogItem.link],
    applicationCategory: detail.category,
    operatingSystem: "Web",
    keywords: catalogItem.tags.join(", "),
    author: { "@id": `${SITE_URL}/#person` },
  };

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <JsonLdScript data={jsonLd} />
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Projects", href: "/projects" },
            { name: detail.name, href: `/projects/${slug}` },
          ]}
        />

        <article>
          <header>
            <div className="mb-4 flex flex-wrap gap-2">
              {catalogItem.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-500"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{detail.name}</h1>
            <p className="mt-3 text-xl text-foreground/70">{detail.tagline}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={catalogItem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/25 transition hover:scale-105"
              >
                Visit live site
              </a>
              {detail.repo && (
                <a
                  href={detail.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-foreground/20 px-6 py-3 font-semibold transition hover:border-purple-500 hover:text-purple-500"
                >
                  View source on GitHub
                </a>
              )}
            </div>
          </header>

          <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5">
            <Image
              src={catalogItem.image}
              alt={`Screenshot of the ${detail.name} website`}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">Overview</h2>
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-foreground/80">
              {detail.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">Key features</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-lg text-foreground/80">
              {detail.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">Tech stack</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              {detail.stack.map((item) => (
                <div
                  key={item.name}
                  className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-4"
                >
                  <dt className="font-semibold">{item.name}</dt>
                  <dd className="mt-1 text-sm text-foreground/70">{item.note}</dd>
                </div>
              ))}
            </dl>
          </section>

          {caseStudy && (
            <section className="mt-12 rounded-2xl border border-purple-500/30 bg-purple-500/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-500">
                Case study
              </p>
              <h2 className="mt-2 text-xl font-bold">{caseStudy.title}</h2>
              <p className="mt-2 text-foreground/70">{caseStudy.description}</p>
              <Link
                href={`/case-studies/${caseStudy.slug}`}
                className="mt-4 inline-block font-semibold text-purple-500 hover:underline"
              >
                Read the case study →
              </Link>
            </section>
          )}
        </article>

        <section className="mt-16">
          <h2 className="text-2xl font-bold">More projects</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((p) => {
              const d = getProjectDetail(p.id);
              if (!d) return null;
              return (
                <li key={p.id}>
                  <Link
                    href={`/projects/${p.id}`}
                    className="block h-full rounded-2xl border border-foreground/10 p-4 transition hover:border-purple-500/50"
                  >
                    <h3 className="font-bold">{d.name}</h3>
                    <p className="mt-1 text-sm text-foreground/70">{d.tagline}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-6">
            <Link href="/projects" className="font-semibold text-purple-500 hover:underline">
              See all projects →
            </Link>
          </p>
        </section>

        <section className="mt-16 rounded-2xl border border-foreground/10 p-8 text-center">
          <h2 className="text-2xl font-bold">Want something like this built?</h2>
          <p className="mt-2 text-foreground/70">
            I am a full stack developer based in Lisbon, available for new projects.
          </p>
          <Link
            href="/#contact"
            className="mt-6 inline-block rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 font-semibold text-white"
          >
            Get in touch
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
