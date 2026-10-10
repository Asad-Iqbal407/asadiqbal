import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import JsonLdScript from "@/components/JsonLdScript";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { caseStudies } from "@/data/case-studies";
import { projectDetails } from "@/data/project-details";
import { projectCatalog } from "@/data/projects";
import { SITE_URL } from "@/lib/seo";

const title = "Projects";
const description =
  "Web apps, games and tools built by Asad Iqbal with Next.js, React, Three.js and MongoDB: an LMS, a video downloader, an e-commerce store, browser games and more.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `${title} | Asad Iqbal`,
    description,
    url: `${SITE_URL}/projects`,
    type: "website",
  },
};

export default function ProjectsPage() {
  const items = projectCatalog.filter((p) => p.id in projectDetails);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects by Asad Iqbal",
    description,
    url: `${SITE_URL}/projects`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((p, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/projects/${p.id}`,
        name: p.title,
      })),
    },
  };

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <JsonLdScript data={jsonLd} />
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Projects", href: "/projects" },
          ]}
        />

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Projects by <span className="gradient-text">Asad Iqbal</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-foreground/70">
          A selection of web apps, games and tools I have built with Next.js, React, Three.js,
          MongoDB and more. Each page covers what the project does, how it is built, and where to
          see it live.
        </p>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {items.map((project) => {
            const detail = projectDetails[project.id as keyof typeof projectDetails];
            return (
              <li
                key={project.id}
                className="group overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.03] transition hover:border-purple-500/50"
              >
                <Link href={`/projects/${project.id}`} className="block">
                  <div className="relative h-44 overflow-hidden bg-foreground/5">
                    <Image
                      src={project.image}
                      alt={`${detail.name} website preview`}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-3 p-5">
                    <h2 className="text-xl font-bold group-hover:text-purple-500">{detail.name}</h2>
                    <p className="text-sm text-foreground/70">{detail.tagline}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 text-xs font-medium text-purple-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <section className="mt-20">
          <h2 className="text-2xl font-bold">Case studies</h2>
          <p className="mt-2 text-foreground/70">
            Deeper write-ups on how two of these projects were designed and built.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {caseStudies.map((study) => (
              <li key={study.slug}>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="block h-full rounded-2xl border border-foreground/10 p-5 transition hover:border-purple-500/50"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-purple-500">
                    {study.kicker}
                  </p>
                  <h3 className="mt-2 font-bold">{study.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
