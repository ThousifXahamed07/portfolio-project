"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
}

function getStatusLabel(slug: string): { symbol: string; label: string } {
  switch (slug) {
    case "tripdeal-ai":
      return { symbol: "●", label: "LIVE" };
    case "moc-chatbot":
      return { symbol: "●", label: "PRODUCTION" };
    case "ooredoo-hr-agent":
      return { symbol: "✓", label: "SHIPPED" };
    case "asnan-tower-appointments":
      return { symbol: "▴", label: "PROTOTYPE" };
    case "alhamra-receipt-ocr":
      return { symbol: "●", label: "PRODUCTION" };
    default:
      return { symbol: "●", label: "PRODUCTION" };
  }
}

export function ProjectCard({ project, index, total }: ProjectCardProps) {
  const reduce = useReducedMotion();
  const status = getStatusLabel(project.slug);
  const num = String(index + 1).padStart(2, "0");
  const tot = String(total).padStart(2, "0");

  const visibleTags = project.tags.slice(0, 4);
  const moreTags = project.tags.length > 4 ? project.tags.length - 4 : 0;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={project.detailPage}
        className="group block border border-[rgba(237,230,211,0.12)] bg-[rgba(0,0,0,0.4)] p-6 transition-all duration-300 hover:border-[rgba(237,230,211,0.25)] hover:bg-[rgba(0,0,0,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
      >
        {/* Status row */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em]">
            <span className={`mr-1.5 ${status.symbol === '●' && (status.label === 'LIVE' || status.label === 'PRODUCTION') ? 'text-[#c8ff5e]' : status.symbol === '✓' ? 'text-signal' : 'text-foreground-2'}`}>{status.symbol}</span>
            <span className={`${status.symbol === '●' && (status.label === 'LIVE' || status.label === 'PRODUCTION') ? 'text-[#c8ff5e]' : status.symbol === '✓' ? 'text-signal' : 'text-foreground-2'}`}>{status.label}</span>
          </span>
          <span className="font-mono text-[10.5px] tracking-normal text-[rgba(237,230,211,0.45)]">
            {num} / {tot}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-serif text-[1.8rem] font-normal tracking-[-0.025em] leading-[1.05] text-foreground mb-1">
          {project.title}
          <span className="text-signal italic">.</span>
        </h2>

        {/* Meta row */}
        <div className="font-mono text-[11px] tracking-[0.16em] text-[rgba(237,230,211,0.45)] uppercase mb-4">
          2025 &middot; {project.category}
        </div>

        {/* Description */}
        <p className="text-[0.98rem] leading-[1.6] tracking-[-0.005em] text-foreground-2 mb-5 max-w-[65ch]">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-5">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10.5px] tracking-normal text-[rgba(237,230,211,0.45)]"
            >
              {tag}
            </span>
          ))}
          {moreTags > 0 && (
            <span className="font-mono text-[10.5px] tracking-[0.04em] text-foreground-3">
              + {moreTags} more
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal group-hover:tracking-[0.22em] transition-all duration-300">
          READ THE CASE STUDY<span className="ml-1">&rarr;</span>
        </div>
      </Link>
    </motion.div>
  );
}
