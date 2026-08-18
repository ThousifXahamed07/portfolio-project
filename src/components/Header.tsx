"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[rgba(0,0,0,0.7)] backdrop-blur-md border-b border-[rgba(237,230,211,0.12)]">
      <div className="mx-auto max-w-[1480px] px-5">
        <nav className="flex items-center gap-4 sm:gap-6 h-10">
          <Link
            href="/"
            className={`font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 ${
              pathname === "/"
                ? "text-signal"
                : "text-foreground hover:text-signal"
            }`}
          >
            Thousif.Ahamed
          </Link>
          <Link
            href="/projects"
            className={`font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 ${
              pathname?.startsWith("/projects")
                ? "text-signal"
                : "text-foreground-2 hover:text-signal"
            }`}
          >
            / Projects
          </Link>
          <a
            href="https://www.linkedin.com/in/thousif-ahamed-59263b24b/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-2 hover:text-signal transition-colors duration-200"
          >
            / LinkedIn
          </a>
        </nav>
      </div>
    </header>
  );
}
