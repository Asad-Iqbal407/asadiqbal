import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import JsonLdScript from "@/components/JsonLdScript";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { caseStudies } from "@/data/case-studies";
import { SITE_URL } from "@/lib/seo";

const title = "Case studies";
const description =
  "In-depth write-ups by Asad Iqbal on how two projects were built: a role-based LMS with Next.js and MongoDB, and a hand-tracking 3D archery game with Three.js and MediaPipe.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: `${title} | Asad Iqbal`,
    description,
    url: `${SITE_URL}/case-studies`,
    type: "website",
  },
};

export default function CaseStudiesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Case studies by Asad Iqbal",
    description,
    url: `${SITE_URL}/case-studies`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: caseStudies.map((study, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/case-studies/${study.slug}`,
        name: study.title,
      })),
    },
  };

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <JsonLdScript data={jsonLd} />
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Case studies", href: "/case-studies" },
          ]}
        />

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Case <span className="gradient-text">studies</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-foreground/70">
          Behind-the-scenes write-ups on how some of my projects work: the architecture, the
          trade-offs, and what I would improve next.
        </p>

        <ul className="mt-12 space-y-6">
          {caseStudies.map((study) => (
            <li key={study.slug}>
              <Link
                href={`/case-studies/${study.slug}`}
                className="block rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6 transition hover:border-purple-500/50"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-purple-500">
                  {study.kicker}
                </p>
                <h2 className="mt-2 text-2xl font-bold">{study.title}</h2>
                <p className="mt-3 text-foreground/70">{study.description}</p>
                <span className="mt-4 inline-block font-semibold text-purple-500">
                  Read the case study →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
