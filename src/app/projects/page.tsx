import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { HeroSection } from "./HeroSection";

export const metadata: Metadata = {
  title: "Projects - Thousif Ahamed",
  description:
    "AI Agents, RAG Systems & Enterprise AI Applications by Thousif Ahamed",
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-10">
        <HeroSection />
        <section className="mx-auto max-w-[1480px] px-5 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i}
                total={projects.length}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
