"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/projects";

const ease = [0.16, 1, 0.3, 1] as const;

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: ease as unknown as [number, number, number, number] },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, delay, ease: ease as unknown as [number, number, number, number] },
});

function SectionShell() {
  return (
    <div className="flex items-center gap-4 sm:gap-6 h-10 text-[11px] font-mono uppercase tracking-[0.16em] whitespace-nowrap overflow-hidden px-5 mx-auto max-w-[1480px]">
      <Link
        href="/"
        className="text-foreground hover:text-signal transition-colors"
      >
        Thousif.Ahamed
      </Link>
      <Link
        href="/projects"
        className="hidden sm:inline text-foreground-2 hover:text-signal transition-colors"
      >
        / Projects
      </Link>
      <a
        href="https://www.linkedin.com/in/thousif-ahamed-59263b24b/"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:inline text-foreground-2 hover:text-signal transition-colors"
      >
        / LinkedIn
      </a>
    </div>
  );
}

function SectionHeader({
  number,
  label,
  rightLabel,
}: {
  number: string;
  label: string;
  rightLabel: string;
}) {
  return (
    <motion.div
      {...fadeIn()}
      className="flex items-baseline justify-between gap-4 mb-10"
    >
      <div className="flex items-baseline gap-3">
        <span className="font-serif italic text-[clamp(2rem,5vw,3rem)] tracking-[-0.04em] leading-[0.9] text-[rgba(237,230,211,0.45)]">
          {number}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">
          {label}
        </span>
      </div>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[rgba(237,230,211,0.45)] hidden sm:inline">
        {rightLabel}
      </span>
    </motion.div>
  );
}

function Divider() {
  return (
    <div className="border-t border-[rgba(237,230,211,0.12)] mx-auto max-w-[1480px] px-5" />
  );
}

export function HomePage() {
  const reduce = useReducedMotion();
  const anim = reduce ? {} : {};

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[100svh] flex flex-col justify-end pt-24 pb-16">
        <div className="mx-auto max-w-[1480px] px-5 w-full">
          {/* Metadata row */}
          <motion.div
            {...(reduce ? {} : fade(0))}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16"
          >
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[rgba(237,230,211,0.45)] mb-1">
                // Portfolio — AI Engineer
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">
                FILED 2026.08.10 / BENGALURU, INDIA
              </div>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[rgba(237,230,211,0.45)] mb-1">
                // Subject
              </div>
              <div className="font-mono text-[12px] tracking-normal text-foreground-2">
                T. AHAMED — AI Engineer
              </div>
              <div className="font-mono text-[12px] tracking-normal text-foreground-2">
                Enterprise AI systems · Bengaluru
              </div>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[rgba(237,230,211,0.45)] mb-1">
                // Status
              </div>
              <div className="font-mono text-[12px] tracking-normal text-[#c8ff5e]">
                ● AVAILABLE · BENGALURU, INDIA
              </div>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            {...(reduce ? {} : fade(0.1))}
            className="font-serif text-[clamp(5rem,14vw,128.94px)] font-normal tracking-[-0.04em] leading-[0.86] text-foreground mb-8"
          >
            Thousif
            <br />
            Ahamed<span className="text-signal italic">.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...(reduce ? {} : fade(0.2))}
            className="font-serif italic text-[29.952px] leading-[1.18] tracking-[-0.015em] text-foreground-2 max-w-[520px] mb-12"
          >
            I&rsquo;m an AI engineer. I build the systems behind enterprise
            chatbots, booking agents, and document intelligence &mdash;{" "}
            <span className="text-signal">
              RAG pipelines, VLM systems, agent architectures
            </span>
            , production-grade.
          </motion.p>

          {/* Bottom stats + actions */}
          <motion.div
            {...(reduce ? {} : fade(0.3))}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-[rgba(237,230,211,0.12)] pt-8"
          >
            {/* Left — stats */}
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[rgba(237,230,211,0.45)] mb-3">
                // If you&apos;re counting
              </div>
              <p className="font-serif italic text-[16.8px] leading-[1.55] tracking-[-0.005em] text-foreground-2 max-w-[420px]">
                5 production AI systems shipped across 4 industries &mdash;
                government, telecom, hospitality, healthcare. RAG chatbots,
                booking agents, receipt intelligence. The case studies below have
                the architecture diagrams and the numbers.
              </p>
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[rgba(237,230,211,0.45)] mt-4">
                Scroll for the full report &rarr;
              </div>
            </div>

            {/* Right — actions */}
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[rgba(237,230,211,0.45)] mb-3">
                // Actions
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.16em] border border-signal bg-signal text-black px-[18px] py-[11px] hover:bg-transparent hover:text-signal transition-colors"
                >
                  ▸ Case Studies
                </Link>
                <a
                  href="https://www.linkedin.com/in/thousif-ahamed-59263b24b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.16em] border border-[rgba(237,230,211,0.12)] text-foreground px-[18px] py-[11px] hover:border-signal hover:text-signal transition-colors"
                >
                  Open LinkedIn &rarr;
                </a>
                <a
                  href="mailto:ahamedthousif07@gmail.com"
                  className="inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.16em] border border-[rgba(237,230,211,0.12)] text-foreground px-[18px] py-[11px] hover:border-signal hover:text-signal transition-colors"
                >
                  ✉
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SHELL DIVIDER ─── */}
      <SectionShell />

      {/* ─── §01 — TRANSMISSION ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-[1480px] px-5">
          <SectionHeader
            number="§01"
            label="// transmission"
            rightLabel="FIELD REPORT"
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
            {/* Left — bio */}
            <div>
              <motion.div {...fadeIn(0.05)}>
                <p className="font-serif italic text-[clamp(1.1rem,2.5vw,1.4rem)] leading-[1.18] tracking-[-0.015em] text-foreground-2 mb-6">
                  I&rsquo;m Thousif. I build{" "}
                  <span className="text-signal">
                    production AI systems for enterprises
                  </span>{" "}
                  &mdash; RAG-grounded chatbots, conversational booking agents,
                  on-premise VLM pipelines, and knowledge retrieval
                  architectures. Systems that handle real users, real data, and
                  real constraints.
                </p>
              </motion.div>

              <motion.div {...fadeIn(0.1)}>
                <p className="text-[16.8px] leading-[1.65] tracking-[-0.005em] text-foreground-2 mb-6">
                  The way I work: understand the business constraint first, then
                  build the simplest system that solves it. Every project below
                  started with a specific problem &mdash; a government ministry
                  drowning in citizen queries, a telecom HR team answering the
                  same questions thousands of times, a dental clinic losing
                  revenue to no-shows, a shopping mall hemorrhaging loyalty
                  points to receipt fraud. The architecture follows from the
                  constraint, not the other way around.
                </p>
              </motion.div>

              <motion.div {...fadeIn(0.15)}>
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal mb-3">
                  // The last chapter
                </div>
                <p className="text-[16.8px] leading-[1.65] tracking-[-0.005em] text-foreground-2">
                  Five AI systems shipped across government, telecom,
                  hospitality, and healthcare. Built a bilingual RAG chatbot for
                  the Ministry of Communications Kuwait that handles Arabic
                  dialect queries in production. Designed a metadata-filtered
                  knowledge retrieval system for Ooredoo, one of the largest
                  telecom operators in the Middle East. Deployed an on-premise
                  Qwen 3.5 VL pipeline for receipt fraud detection that
                  processes sensitive financial data without cloud dependency.
                </p>
              </motion.div>
            </div>

            {/* Right — quick take */}
            <motion.div {...fadeIn(0.1)}>
              <div className="border border-[rgba(237,230,211,0.12)] p-5">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal mb-5">
                  // Quick Take
                </div>

                {[
                  { label: "BUILDS", value: "AI Agents · RAG · VLM" },
                  { label: "LOCATION", value: "Bengaluru, India" },
                  { label: "FOCUS", value: "Enterprise AI Systems" },
                  {
                    label: "INDUSTRIES",
                    value: "Gov · Telecom · Health · Hospitality",
                  },
                  { label: "STACK", value: "Python · FastAPI · GPT-4o" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="border-t border-[rgba(237,230,211,0.08)] py-3"
                  >
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[rgba(237,230,211,0.45)] mb-1">
                      {row.label}
                    </div>
                    <div className="text-[13px] text-foreground-2 tracking-[-0.006em]">
                      {row.value}
                    </div>
                  </div>
                ))}

                <div className="border-t border-[rgba(237,230,211,0.08)] pt-3 mt-1">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">
                    // What I think about
                  </div>
                  <p className="text-[13px] leading-[1.6] text-foreground-2 mt-2">
                    RAG retrieval quality, on-premise ML deployment, bilingual
                    NLU, and making LLM systems behave reliably in production
                    &mdash; evals, confidence gating, and graceful fallbacks.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SHELL DIVIDER ─── */}
      <SectionShell />

      {/* ─── §02 — MANIFEST · PROJECTS ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-[1480px] px-5">
          <SectionHeader
            number="§02"
            label="// manifest · builds"
            rightLabel={`${projects.length} SYSTEMS · ${projects.length} CASE STUDIES`}
          />

          <motion.div {...fadeIn(0.05)}>
            <h2 className="font-serif text-[clamp(1.6rem,3.5vw,2.24rem)] font-normal tracking-[-0.025em] leading-[1.04] text-foreground mb-1">
              {projects.length} systems shipped
            </h2>
            <h2 className="font-serif italic text-[clamp(1.6rem,3.5vw,2.24rem)] font-normal tracking-[-0.025em] leading-[1.04] text-signal mb-6">
              across 4 industries.
            </h2>
          </motion.div>

          <motion.p
            {...fadeIn(0.1)}
            className="text-[16.8px] leading-[1.65] tracking-[-0.005em] text-foreground-2 mb-6 max-w-[680px]"
          >
            Enterprise chatbots, booking agents, HR knowledge retrieval, receipt
            intelligence. Each one has a full case study &mdash; problem,
            architecture, decisions, metrics, lessons.
          </motion.p>

          <motion.div {...fadeIn(0.15)} className="mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.16em] border border-signal bg-signal text-black px-[18px] py-[11px] hover:bg-transparent hover:text-signal transition-colors"
            >
              ▸ All Case Studies
            </Link>
          </motion.div>

          {/* Projects table */}
          <motion.div {...fadeIn(0.2)}>
            <div className="border border-[rgba(237,230,211,0.12)]">
              {/* Table header */}
              <div className="hidden sm:grid grid-cols-[40px_1fr_1fr_100px] gap-4 px-5 py-3 border-b border-[rgba(237,230,211,0.12)]">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[rgba(237,230,211,0.45)]">
                  #
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[rgba(237,230,211,0.45)]">
                  Build
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[rgba(237,230,211,0.45)]">
                  Stack · Purpose
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[rgba(237,230,211,0.45)] text-right">
                  Deep Dive
                </span>
              </div>

              {/* Table rows */}
              {projects.map((project, i) => (
                <Link
                  key={project.slug}
                  href={project.detailPage}
                  className="group grid grid-cols-1 sm:grid-cols-[40px_1fr_1fr_100px] gap-2 sm:gap-4 px-5 py-5 border-b border-[rgba(237,230,211,0.08)] last:border-b-0 hover:bg-[rgba(255,74,28,0.03)] transition-colors"
                >
                  <span className="font-mono text-[10.5px] text-[rgba(237,230,211,0.45)] pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="font-serif text-[1.1rem] tracking-[-0.02em] text-foreground leading-[1.3]">
                      {project.title}
                    </div>
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[rgba(237,230,211,0.45)] mt-1">
                      {project.category}
                    </div>
                  </div>
                  <div className="text-[14px] leading-[1.6] text-foreground-2 hidden sm:block">
                    <p className="line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10.5px] text-[rgba(237,230,211,0.45)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal group-hover:tracking-[0.22em] transition-all">
                      ▸ Deep
                      <br />
                      Dive
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SHELL DIVIDER ─── */}
      <SectionShell />

      {/* ─── §03 — CAPABILITY · SKILLS ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-[1480px] px-5">
          <SectionHeader
            number="§03"
            label="// capability · technology"
            rightLabel="CORE STACK"
          />

          <motion.div {...fadeIn(0.05)}>
            <h2 className="font-serif text-[clamp(1.6rem,3.5vw,2.24rem)] font-normal tracking-[-0.025em] leading-[1.04] text-foreground mb-1">
              Surface area &mdash;
            </h2>
            <h2 className="font-serif italic text-[clamp(1.6rem,3.5vw,2.24rem)] font-normal tracking-[-0.025em] leading-[1.04] text-signal mb-6">
              instrumented.
            </h2>
          </motion.div>

          <motion.p
            {...fadeIn(0.1)}
            className="text-[16.8px] leading-[1.65] tracking-[-0.005em] text-foreground-2 mb-10 max-w-[680px]"
          >
            Not a skill cloud. The tools I&rsquo;ve shipped with, grouped by
            what they do. Each one backed by at least one production system in
            the case studies above.
          </motion.p>

          {/* Skills grid */}
          <motion.div {...fadeIn(0.15)}>
            <div className="border border-[rgba(237,230,211,0.12)]">
              {[
                {
                  category: "LANGUAGES",
                  items: [
                    "Python",
                    "TypeScript",
                    "JavaScript",
                    "SQL",
                    "HTML / CSS",
                  ],
                },
                {
                  category: "AI · LLM",
                  items: [
                    "GPT-4o / OpenAI",
                    "Qwen VL (on-premise)",
                    "LangChain",
                    "Semantic Search",
                    "RAG Pipelines",
                    "Prompt Engineering",
                  ],
                },
                {
                  category: "BACKENDS",
                  items: [
                    "FastAPI",
                    "Python asyncio",
                    "REST APIs",
                    "WebSockets",
                  ],
                },
                {
                  category: "DATA · SEARCH",
                  items: [
                    "PostgreSQL",
                    "OpenSearch",
                    "Vector Databases",
                    "Redis",
                  ],
                },
                {
                  category: "INFRA · DEPLOY",
                  items: [
                    "Docker",
                    "NVIDIA GPU (A100)",
                    "On-Premise Deployment",
                    "Cloud Infrastructure",
                  ],
                },
                {
                  category: "PATTERNS",
                  items: [
                    "Confidence Gating",
                    "Human-in-the-Loop",
                    "Metadata-Filtered Retrieval",
                    "Optimistic Locking",
                    "Multi-Layer Validation",
                  ],
                },
              ].map((group) => (
                <div
                  key={group.category}
                  className="border-b border-[rgba(237,230,211,0.08)] last:border-b-0"
                >
                  <div className="px-5 py-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-signal border-b border-[rgba(237,230,211,0.04)]">
                    {group.category}
                  </div>
                  <div className="px-5 py-4 flex flex-wrap gap-x-6 gap-y-3">
                    {group.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-[14px] text-foreground-2"
                      >
                        <span className="inline-flex gap-[3px]">
                          <span className="w-[8px] h-[14px] bg-signal/80 rounded-[1px]" />
                          <span className="w-[8px] h-[14px] bg-signal/80 rounded-[1px]" />
                          <span className="w-[8px] h-[14px] bg-signal/80 rounded-[1px]" />
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SHELL DIVIDER ─── */}
      <SectionShell />

      {/* ─── §04 — CONTACT · OPEN COMMS ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-[1480px] px-5">
          <SectionHeader
            number="§04"
            label="// contact · open comms"
            rightLabel="STDIN OPEN"
          />

          <motion.div {...fadeIn(0.05)}>
            <h2 className="font-serif text-[clamp(1.6rem,3.5vw,2.24rem)] font-normal tracking-[-0.025em] leading-[1.04] text-foreground mb-1">
              Want to build
            </h2>
            <h2 className="font-serif italic text-[clamp(1.6rem,3.5vw,2.24rem)] font-normal tracking-[-0.025em] leading-[1.04] text-signal mb-6">
              something serious?
            </h2>
          </motion.div>

          <motion.p
            {...fadeIn(0.1)}
            className="text-[16.8px] leading-[1.65] tracking-[-0.005em] text-foreground-2 mb-10 max-w-[680px]"
          >
            Enterprise AI systems, RAG pipelines, conversational agents,
            on-premise ML deployment. If you&rsquo;re building something in that
            space, I&rsquo;d like to hear about it. Pick a command:
          </motion.p>

          {/* Terminal */}
          <motion.div
            {...fadeIn(0.15)}
            className="border border-[rgba(237,230,211,0.12)] bg-[rgba(0,0,0,0.4)] max-w-[680px]"
          >
            {/* Terminal header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[rgba(237,230,211,0.08)]">
              <span className="font-mono text-[11px] text-[rgba(237,230,211,0.45)]">
                THOUSIF@FIELD-REPORT ~ %
              </span>
              <span className="font-mono text-[11px] text-[#c8ff5e]">
                ● ONLINE
              </span>
            </div>

            {/* Terminal prompt */}
            <div className="px-5 py-4 border-b border-[rgba(237,230,211,0.08)]">
              <span className="font-mono text-[15px] text-foreground">
                <span className="text-[rgba(237,230,211,0.45)]">$ </span>
                <span className="font-bold">open comms</span>
                <span className="text-signal animate-pulse">▊</span>
              </span>
            </div>

            {/* Terminal commands */}
            <div className="px-5 py-5 space-y-4">
              {[
                {
                  cmd: "open mail",
                  desc: "Open mail client",
                  href: "mailto:ahamedthousif07@gmail.com",
                },
                {
                  cmd: "ssh linkedin",
                  desc: "Connect on LinkedIn",
                  href: "https://www.linkedin.com/in/thousif-ahamed-59263b24b/",
                },
                {
                  cmd: "ls projects",
                  desc: "View case studies",
                  href: "/projects",
                },
              ].map((item) => (
                <div key={item.cmd} className="flex items-baseline gap-6">
                  {item.href.startsWith("/") ? (
                    <Link
                      href={item.href}
                      className="font-mono text-[14px] text-signal hover:underline underline-offset-4 min-w-[160px]"
                    >
                      <span className="text-[rgba(237,230,211,0.45)]">$ </span>
                      {item.cmd}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[14px] text-signal hover:underline underline-offset-4 min-w-[160px]"
                    >
                      <span className="text-[rgba(237,230,211,0.45)]">$ </span>
                      {item.cmd}
                    </a>
                  )}
                  <span className="text-[14px] text-foreground-2">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer note */}
            <div className="px-5 py-3 border-t border-[rgba(237,230,211,0.08)]">
              <span className="text-[13px] text-[rgba(237,230,211,0.45)]">
                # Or just email{" "}
                <a
                  href="mailto:ahamedthousif07@gmail.com"
                  className="text-foreground hover:text-signal transition-colors"
                >
                  ahamedthousif07@gmail.com
                </a>
              </span>
            </div>
          </motion.div>

          {/* EOF */}
          <motion.div
            {...fadeIn(0.2)}
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-[rgba(237,230,211,0.45)] mt-12 text-right"
          >
            EOF · End of Transmission
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-[rgba(237,230,211,0.12)] mt-auto">
        <div className="mx-auto max-w-[1480px] px-5 py-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[rgba(237,230,211,0.45)]">
              &copy; 2026 Thousif Ahamed
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[rgba(237,230,211,0.45)]">
              Field Report v2026.08
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
