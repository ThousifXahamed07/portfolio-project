import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[rgba(237,230,211,0.12)] mt-auto">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Link
            href="/projects"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-3 hover:text-signal transition-colors duration-200"
          >
            &larr; Back to Projects
          </Link>
          <a
            href="https://www.linkedin.com/in/thousif-ahamed-59263b24b/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-3 hover:text-signal transition-colors duration-200"
          >
            Open LinkedIn &rarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
