import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import JsonLdScript from "@/components/JsonLdScript";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { getProjectDetail } from "@/data/project-details";
import { projectCatalog } from "@/data/projects";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.description,
    alternates: { canonical: `/case-studies/${slug}` },
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    openGraph: {
      title: study.title,
      description: study.description,
      url: `${SITE_URL}/case-studies/${slug}`,
      type: "article",
      publishedTime: study.publishedAt,
      modifiedTime: study.updatedAt,
      authors: [SITE_NAME],
    },
    twitter: {
      card: "summary_large_image",
      title: study.title,
      description: study.description,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const detail = getProjectDetail(study.project);
  const catalogItem = projectCatalog.find((p) => p.id === study.project);
  const others = caseStudies.filter((c) => c.slug !== slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: study.title,
    description: study.description,
    url: `${SITE_URL}/case-studies/${slug}`,
    mainEntityOfPage: `${SITE_URL}/case-studies/${slug}`,
    datePublished: study.publishedAt,
    dateModified: study.updatedAt,
    inLanguage: "en",
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    about: detail ? { "@type": "WebApplication", name: detail.name, url: `${SITE_URL}/projects/${study.project}` } : undefined,
    keywords: study.stack.join(", "),
  };

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <JsonLdScript data={jsonLd} />
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Case studies", href: "/case-studies" },
            { name: study.title, href: `/case-studies/${slug}` },
          ]}
        />

        <article>
          <header>
            <p className="text-xs font-semibold uppercase tracking-wide text-purple-500">
              {study.kicker}
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              {study.title}
            </h1>
            <p className="mt-4 text-sm text-foreground/60">
              By {SITE_NAME} ·{" "}
              <time dateTime={study.publishedAt}>
                {new Date(study.publishedAt).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </p>
            <p className="mt-6 text-xl leading-relaxed text-foreground/80">{study.intro}</p>

            {detail && catalogItem && (
              <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
                <Link
                  href={`/projects/${study.project}`}
                  className="rounded-full border border-foreground/20 px-4 py-2 hover:border-purple-500 hover:text-purple-500"
                >
                  Project page
                </Link>
                <a
                  href={catalogItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-foreground/20 px-4 py-2 hover:border-purple-500 hover:text-purple-500"
                >
                  Live demo
                </a>
                {detail.repo && (
                  <a
                    href={detail.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-foreground/20 px-4 py-2 hover:border-purple-500 hover:text-purple-500"
                  >
                    Source code
                  </a>
                )}
              </div>
            )}
          </header>

          {study.sections.map((section) => (
            <section key={section.heading} className="mt-12">
              <h2 className="text-2xl font-bold">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-lg leading-relaxed text-foreground/80">
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul className="list-disc space-y-2 pl-6">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}

          <section className="mt-12">
            <h2 className="text-2xl font-bold">Tech stack</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {study.stack.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-foreground/15 bg-foreground/[0.04] px-3 py-1 text-sm font-medium"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </article>

        {others.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold">More case studies</h2>
            <ul className="mt-6 space-y-4">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/case-studies/${other.slug}`}
                    className="block rounded-2xl border border-foreground/10 p-5 transition hover:border-purple-500/50"
                  >
                    <h3 className="font-bold">{other.title}</h3>
                    <p className="mt-1 text-sm text-foreground/70">{other.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-16 rounded-2xl border border-foreground/10 p-8 text-center">
          <h2 className="text-2xl font-bold">Working on something similar?</h2>
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
