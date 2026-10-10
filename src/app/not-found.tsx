import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-purple-500">404</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Page not found</h1>
        <p className="mt-4 text-lg text-foreground/70">
          The page you are looking for does not exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 font-semibold text-white"
          >
            Back to home
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-foreground/20 px-6 py-3 font-semibold hover:border-purple-500 hover:text-purple-500"
          >
            View projects
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
