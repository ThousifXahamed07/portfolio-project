"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { projects } from "@/lib/projects";

export interface Decision {
  title: string;
  body: string;
}

export interface Metric {
  value: string;
  label: string;
  description: string;
}

export interface StackEntry {
  key: string;
  value: string;
}

export interface ArchLayer {
  label: string;
  items: { name: string; detail: string }[];
}

export interface ProjectDetailData {
  project: Project;
  whyIBuiltIt: {
    subtitle: string;
    paragraphs: string[];
  };
  approach: {
    subtitle: string;
    paragraphs: string[];
  };
  decisions: Decision[];
  architecture: {
    subtitle: string;
    paragraphs: string[];
    layers: ArchLayer[];
  };
  stateOfTheArt: { title: string; description: string }[];
  measured: Metric[];
  ifIDidItAgain: string[];
  stack: StackEntry[];
  nextProject?: { title: string; slug: string };
}

const ease = [0.16, 1, 0.3, 1] as const;

function SectionLabel({
  number,
  title,
  subtitle,
  reduce,
}: {
  number: string;
  title: string;
  subtitle: string;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease }}
      className="col-span-12 lg:col-span-3"
    >
      <div className="lg:sticky lg:top-14">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">
          // {number} — {title}
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[rgba(237,230,211,0.6)] mt-1.5">
          {subtitle}
        </div>
      </div>
    </motion.div>
  );
}

function Divider() {
  return <div className="h-px bg-[rgba(237,230,211,0.12)]" />;
}

export function ProjectDetail({
  project,
  whyIBuiltIt,
  approach,
  decisions,
  architecture,
  stateOfTheArt,
  measured,
  ifIDidItAgain,
  stack,
  nextProject,
}: ProjectDetailData) {
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto max-w-[1480px] px-5 lg:px-5">
      {/* Breadcrumb */}
      <motion.div
        initial={reduce ? false : { opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease }}
        className="pt-16 pb-6"
      >
        <nav className="font-mono text-[11px] uppercase tracking-[0.16em] flex items-center gap-2">
          <Link
            href="/"
            className="text-foreground hover:text-signal transition-colors duration-200"
          >
            &larr; Field Report
          </Link>
          <span className="text-foreground-2">/</span>
          <Link
            href="/projects"
            className="text-foreground-2 hover:text-signal transition-colors duration-200"
          >
            Projects
          </Link>
          <span className="text-foreground-2">/</span>
          <span className="text-foreground-2">{project.slug}</span>
        </nav>
      </motion.div>

      {/* Hero — grid 12 cols */}
      <header className="grid grid-cols-12 gap-x-6 gap-y-6 mb-16">
        <div className="col-span-12 lg:col-span-9">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-2 mb-4"
          >
            {project.category} · 2025 · Updated 2025
          </motion.div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease }}
            className="font-serif text-[clamp(2.5rem,8vw,3.24rem)] font-normal tracking-[-0.035em] leading-[0.92] text-foreground mb-6"
          >
            {project.title}
            <span className="text-signal italic">.</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="font-serif text-[clamp(1rem,2vw,1.2rem)] italic leading-[1.32] tracking-[-0.012em] text-foreground-2 max-w-[768px] mb-6"
          >
            {project.description}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-3 mb-2"
          >
            By <span className="text-foreground-2">Thousif Ahamed</span> · AI
            Engineer · Bengaluru
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease }}
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-3"
          >
            // Enterprise Project
          </motion.div>

          {project.externalLinks && project.externalLinks.length > 0 && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="flex flex-wrap gap-4 mt-4"
            >
              {project.externalLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal hover:tracking-[0.22em] transition-all duration-300"
                >
                  {link.label} &rarr;
                </a>
              ))}
            </motion.div>
          )}
        </div>
      </header>

      <Divider />

      {/* // 01 — WHY I BUILT IT */}
      <section className="py-16 lg:py-20 grid grid-cols-12 gap-x-6 gap-y-4">
        <SectionLabel
          number="01"
          title="Why I Built It"
          subtitle={whyIBuiltIt.subtitle}
          reduce={reduce}
        />
        <div className="col-span-12 lg:col-span-9">
          <div className="flex flex-col gap-4">
            {whyIBuiltIt.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="text-[16.32px] leading-[1.7] text-foreground-2"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* // 02 — THE APPROACH */}
      <section className="py-16 lg:py-20 grid grid-cols-12 gap-x-6 gap-y-4">
        <SectionLabel
          number="02"
          title="The Approach"
          subtitle={approach.subtitle}
          reduce={reduce}
        />
        <div className="col-span-12 lg:col-span-9">
          <div className="flex flex-col gap-4">
            {approach.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="text-[16.32px] leading-[1.7] text-foreground-2"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* // 03 — KEY DECISIONS */}
      <section className="py-16 lg:py-20 grid grid-cols-12 gap-x-6 gap-y-4">
        <SectionLabel
          number="03"
          title="Key Decisions"
          subtitle="What I Chose & Why"
          reduce={reduce}
        />
        <div className="col-span-12 lg:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            {decisions.map((d, i) => (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease }}
                className="relative border-l border-signal pl-5"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal mb-2">
                  Decision · {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-serif text-[1.1rem] font-normal tracking-[-0.015em] leading-[1.18] text-foreground-2 mb-3">
                  {d.title}
                </h3>
                <p className="text-[16.32px] leading-[1.7] text-foreground-2">
                  {d.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* // 04 — ARCHITECTURE */}
      <section className="py-16 lg:py-20 grid grid-cols-12 gap-x-6 gap-y-4">
        <SectionLabel
          number="04"
          title="Architecture"
          subtitle={architecture.subtitle}
          reduce={reduce}
        />
        <div className="col-span-12 lg:col-span-9">
          <div className="flex flex-col gap-4 mb-10">
            {architecture.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="text-[16.32px] leading-[1.7] text-foreground-2"
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* System diagram */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-3">
                // Fig. System Diagram
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-3">
                Scale 1:N
              </span>
            </div>
            <div className="border border-[rgba(237,230,211,0.12)] bg-[rgba(0,0,0,0.4)] p-6 lg:p-8">
              <div className="flex flex-col gap-6">
                {architecture.layers.map((layer, li) => (
                  <div key={li}>
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-3 mb-3">
                      {layer.label}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {layer.items.map((item, ii) => (
                        <div
                          key={ii}
                          className="border border-[rgba(237,230,211,0.15)] bg-[rgba(255,74,28,0.03)] px-4 py-3"
                        >
                          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground mb-1">
                            {item.name}
                          </div>
                          <div className="font-mono text-[10px] tracking-[0.04em] text-foreground-3 leading-relaxed">
                            {item.detail}
                          </div>
                        </div>
                      ))}
                    </div>
                    {li < architecture.layers.length - 1 && (
                      <div className="flex justify-center my-2">
                        <span className="text-foreground-3 text-xs">▾</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* // 05 — STATE OF THE ART */}
      <section className="py-16 lg:py-20 grid grid-cols-12 gap-x-6 gap-y-4">
        <SectionLabel
          number="05"
          title="State of the Art"
          subtitle="Technical Highlights"
          reduce={reduce}
        />
        <div className="col-span-12 lg:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8">
            {stateOfTheArt.map((item, i) => (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease }}
                className="border border-[rgba(237,230,211,0.12)] bg-[rgba(255,74,28,0.03)] p-4"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal leading-relaxed mb-2">
                  &#9656; {item.title}
                </div>
                <p className="text-[16.32px] leading-[1.7] text-foreground-2">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* // 06 — MEASURED */}
      <section className="py-16 lg:py-20 grid grid-cols-12 gap-x-6 gap-y-4">
        <SectionLabel
          number="06"
          title="Measured"
          subtitle="Numbers That Matter"
          reduce={reduce}
        />
        <div className="col-span-12 lg:col-span-9">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6">
            {measured.map((m, i) => (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-3 mb-2">
                  {m.label}
                </div>
                <div className="font-serif text-[clamp(1.8rem,3.5vw,2rem)] font-normal tracking-[-0.02em] text-foreground leading-none mb-2">
                  {m.value}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-3 leading-relaxed">
                  {m.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* // 07 — IF I DID IT AGAIN */}
      <section className="py-16 lg:py-20 grid grid-cols-12 gap-x-6 gap-y-4">
        <SectionLabel
          number="07"
          title="If I Did It Again"
          subtitle="Lessons · What I'd Change"
          reduce={reduce}
        />
        <div className="col-span-12 lg:col-span-9">
          <div className="flex flex-col gap-6">
            {ifIDidItAgain.map((lesson, i) => (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="flex gap-3"
              >
                <span className="text-signal shrink-0 mt-0.5">&rarr;</span>
                <p className="text-[16.32px] leading-[1.7] text-foreground-2">
                  {lesson}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* // 08 — STACK */}
      <section className="py-16 lg:py-20 grid grid-cols-12 gap-x-6 gap-y-4">
        <SectionLabel
          number="08"
          title="Stack"
          subtitle="The Tools"
          reduce={reduce}
        />
        <div className="col-span-12 lg:col-span-9">
          <div className="flex flex-col gap-0">
            {stack.map((entry, i) => (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease }}
                className="grid grid-cols-[120px_1fr] lg:grid-cols-[160px_1fr] gap-4 py-3 border-b border-[rgba(237,230,211,0.06)]"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-foreground-3">
                  {entry.key}
                </span>
                <span className="text-[16.32px] text-foreground-2">
                  {entry.value}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* // 09 — RELATED WORK */}
      <section className="py-16 lg:py-20 grid grid-cols-12 gap-x-6 gap-y-4">
        <SectionLabel
          number="09"
          title="Related Work"
          subtitle="Other Case Studies"
          reduce={reduce}
        />
        <div className="col-span-12 lg:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects
              .filter((p) => p.slug !== project.slug)
              .slice(0, 3)
              .map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease }}
                >
                  <Link
                    href={p.detailPage}
                    className="group block border border-[rgba(237,230,211,0.12)] bg-[rgba(0,0,0,0.4)] p-5 transition-all duration-300 hover:border-[rgba(237,230,211,0.25)] hover:bg-[rgba(0,0,0,0.6)]"
                  >
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-foreground-3 mb-2">
                      {p.category}
                    </div>
                    <div className="font-serif text-[1.25rem] font-normal text-foreground-2 mb-2">
                      {p.title}
                    </div>
                    <p className="text-[13px] leading-[1.6] text-foreground-2 mb-3 line-clamp-2">
                      {p.description}
                    </p>
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-signal group-hover:tracking-[0.22em] transition-all duration-300">
                      Read &rarr;
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* Next project */}
      {nextProject && (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="py-12 lg:py-16"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-3 mb-3">
            Next Project
          </p>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group inline-flex items-center gap-3"
          >
            <span className="font-serif text-[clamp(1.8rem,3.5vw,2.5rem)] font-normal tracking-[-0.02em] text-foreground group-hover:text-signal transition-colors duration-300">
              {nextProject.title}
              <span className="text-signal italic">.</span>
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              &rarr;
            </span>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
