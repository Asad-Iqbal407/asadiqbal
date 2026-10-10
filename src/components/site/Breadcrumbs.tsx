import Link from "next/link";
import JsonLdScript from "@/components/JsonLdScript";
import { SITE_URL } from "@/lib/seo";

export type Crumb = { name: string; href: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href === "/" ? "" : item.href}`,
    })),
  };

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-foreground/60">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className="text-foreground/80">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-purple-500">
                    {item.name}
                  </Link>
                )}
                {!isLast && <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
