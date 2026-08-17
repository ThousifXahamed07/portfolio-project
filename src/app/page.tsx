import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { HomePage } from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Thousif Ahamed — AI Engineer · Enterprise AI Systems",
  description:
    "AI Engineer building enterprise chatbots, booking agents, RAG pipelines, and document intelligence systems.",
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HomePage />
      </main>
    </>
  );
}
