"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Something went wrong</h1>
      <p className="mt-4 text-lg text-foreground/70">
        An unexpected error occurred. You can try again, or head back to the home page.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 font-semibold text-white"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-foreground/20 px-6 py-3 font-semibold hover:border-purple-500 hover:text-purple-500"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
