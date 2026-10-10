import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-foreground/10">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-10 text-sm text-foreground/70 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Asad Iqbal. Full stack developer based in Lisbon, Portugal.</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-5">
          <Link href="/" className="hover:text-purple-500">Home</Link>
          <Link href="/projects" className="hover:text-purple-500">Projects</Link>
          <Link href="/case-studies" className="hover:text-purple-500">Case studies</Link>
          <a
            href="https://github.com/Asad-Iqbal407"
            target="_blank"
            rel="noopener noreferrer me"
            className="hover:text-purple-500"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/asad-iqbal"
            target="_blank"
            rel="noopener noreferrer me"
            className="hover:text-purple-500"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}
