import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectDetail } from "@/components/ProjectDetail";

export const metadata: Metadata = {
  title: "MOC Chatbot - Thousif Ahamed",
  description:
    "An intelligent enterprise chatbot for the Ministry of Communications, Kuwait.",
};

export default function MOCChatbotPage() {
  const project = projects.find((p) => p.slug === "moc-chatbot")!;
  const nextProject = projects.find((p) => p.slug === "ooredoo-hr-agent")!;

  return (
    <>
      <Header />
      <main className="flex-1">
        <ProjectDetail
          project={project}
          whyIBuiltIt={{
            subtitle: "The Problem",
            paragraphs: [
              "The Ministry of Communications in Kuwait handles thousands of citizen inquiries daily — licensing questions, service complaints, regulatory clarifications, permit status checks. The existing process was entirely human-operated: citizens either called a hotline with 20+ minute wait times or visited a physical office. The information was available in internal documents, but there was no self-service channel that could surface it.",
              "The ministry had tried a basic FAQ bot before. It failed because citizen queries are rarely exact FAQ matches — people ask in dialect Arabic, mix Arabic and English, reference specific regulation numbers they half-remember, and describe problems rather than naming the service they need. A keyword-matching bot returned 'I don't understand' on 60%+ of queries.",
              "The challenge was building a chatbot that could handle the full range of citizen language — formal Arabic, Kuwaiti dialect, English, code-switched queries — while grounding every response in the ministry's actual policies and procedures, not generating plausible-sounding but incorrect answers about government services.",
            ],
          }}
          approach={{
            subtitle: "The Work",
            paragraphs: [
              "Retrieval-augmented generation architecture with the ministry's internal knowledge base as the source of truth. The knowledge base includes service catalogs, regulatory documents, procedural guides, and FAQ collections — all indexed for semantic search. When a citizen asks a question, the system retrieves the most relevant document chunks, then generates a grounded response that cites the source material.",
              "Bilingual pipeline from the ground up. The retrieval layer handles Arabic and English queries natively — no translation step that would lose dialect nuance. The embedding model was selected specifically for Arabic-English cross-lingual performance. The response generator formats answers in whichever language the citizen used, maintaining the same terminology the ministry uses in its official communications.",
              "Routing logic for edge cases: when the chatbot's confidence drops below threshold (ambiguous query, no relevant documents, multi-part requests that span departments), it escalates to a human agent with the conversation context attached. The human agent sees what the chatbot retrieved and why it was uncertain, cutting their resolution time roughly in half compared to starting from scratch.",
            ],
          }}
          decisions={[
            {
              title: "RAG over fine-tuning for government accuracy",
              body: "Government information changes — regulations are updated, new services launch, fees are revised. A fine-tuned model would encode stale information in its weights and confidently return outdated answers about government services. RAG with a maintained knowledge base means the chatbot's answers update the moment the ministry updates the source document. For a government-facing system, a confidently wrong answer about a permit requirement is worse than no answer at all.",
            },
            {
              title: "Arabic-first embedding model, not translate-then-embed",
              body: "The obvious approach was to translate Arabic queries to English, embed them, and search an English index. This destroys dialect nuance and introduces translation errors on domain-specific terms. We selected an embedding model with strong Arabic performance and indexed the source documents in their original language. Cross-lingual retrieval meant a citizen asking in Kuwaiti dialect could match against a document written in Modern Standard Arabic.",
            },
            {
              title: "Confidence-gated escalation instead of always-answer",
              body: "Early testing showed the model could generate plausible answers even when the retrieval returned nothing relevant — a dangerous behavior for a government service. We added a confidence gate: if the retrieval similarity score falls below a calibrated threshold, the chatbot explicitly says it's uncertain and offers to connect the citizen with a human agent. This cost us ~15% of automated resolution rate but eliminated the category of 'confident but wrong' government advice entirely.",
            },
            {
              title: "Conversation context handoff to human agents",
              body: "When the chatbot escalates, the human agent receives the full conversation transcript plus the retrieved documents the chatbot considered. This isn't just a nice-to-have — it cuts the human agent's resolution time by roughly 50% because they don't need to re-ask the citizen's question or search the knowledge base from scratch. The chatbot did the retrieval work; the human adds the judgment.",
            },
          ]}
          architecture={{
            subtitle: "How It Fits Together",
            paragraphs: [
              "Citizen queries enter through the embedded chatbot on moc.gov.kw. The bilingual NLU layer detects language and normalizes dialect variations. Queries hit the semantic search index (Arabic-English cross-lingual embeddings) to retrieve relevant policy document chunks. The LLM generates a grounded response with citations, gated by a confidence threshold. Low-confidence queries escalate to human agents with full context attached.",
            ],
            layers: [
              {
                label: "Input · Citizen Interface",
                items: [
                  { name: "moc.gov.kw Chatbot", detail: "embedded widget · bilingual Arabic/English" },
                ],
              },
              {
                label: "Processing · RAG Pipeline",
                items: [
                  { name: "Bilingual NLU", detail: "language detection · dialect normalization · query parsing" },
                  { name: "Semantic Search Index", detail: "cross-lingual embeddings · Arabic-English · metadata-filtered" },
                  { name: "Confidence Gate", detail: "retrieval similarity threshold · escalation trigger" },
                ],
              },
              {
                label: "Generation · Response",
                items: [
                  { name: "GPT-4o Response Generator", detail: "grounded answers · source citations · ministry terminology" },
                  { name: "Human Escalation", detail: "full context handoff · retrieved docs + transcript" },
                ],
              },
              {
                label: "Data · Knowledge Base",
                items: [
                  { name: "Ministry Documents", detail: "service catalogs · regulatory docs · procedural guides · FAQs" },
                ],
              },
            ],
          }}
          stateOfTheArt={[
            {
              title: "RAG grounded in official ministry knowledge base",
              description: "Every response cites specific policy documents. No hallucinated government advice — the chatbot answers from the ministry's own documentation or explicitly says it's uncertain.",
            },
            {
              title: "Bilingual Arabic-English pipeline (no translation step)",
              description: "Native dialect handling for Kuwaiti Arabic, Modern Standard Arabic, and English. Cross-lingual embeddings match dialect queries against formal policy documents without lossy translation.",
            },
            {
              title: "Confidence-gated escalation with context handoff",
              description: "Low-confidence queries route to human agents with the full conversation transcript and retrieved documents attached. Human resolution time drops ~50% compared to starting from scratch.",
            },
            {
              title: "Live production deployment on moc.gov.kw",
              description: "Serving citizens of Kuwait through the Ministry of Communications website. Handling licensing, regulatory, and service inquiries in production.",
            },
          ]}
          measured={[
            {
              value: "Live",
              label: "Status",
              description: "Production on moc.gov.kw",
            },
            {
              value: "~85%",
              label: "Auto-Resolution",
              description: "Without human escalation",
            },
            {
              value: "50%",
              label: "Agent Time Saved",
              description: "On escalated queries",
            },
            {
              value: "< 4s",
              label: "Response Time",
              description: "Retrieval + generation",
            },
          ]}
          ifIDidItAgain={[
            "I'd build an analytics dashboard for the ministry team from day one. They wanted to know which services citizens ask about most, which queries the chatbot fails on, and how escalation patterns change over time. We added this post-launch, but the data from the first months was less structured than it could have been.",
            "The knowledge base update process was initially manual — someone on the ministry team would notify us when a document changed. I'd build a document change detection pipeline that watches the source repository and triggers re-indexing automatically. Government documents change more often than you'd expect, and stale retrieval results are the most common source of user complaints.",
            "Testing bilingual systems is hard. We tested Arabic and English separately, but the edge cases live in code-switching — a citizen who starts in Arabic, drops an English technical term, then continues in Arabic. I'd build a dedicated test suite for code-switched queries early, using real examples from the ministry's call center logs.",
          ]}
          stack={[
            { key: "LLM", value: "GPT-4o · response generation and grounding" },
            { key: "Retrieval", value: "Semantic search · Arabic-English cross-lingual embeddings" },
            { key: "Knowledge", value: "Ministry documents · service catalogs · regulatory guides" },
            { key: "Backend", value: "Python · FastAPI" },
            { key: "Languages", value: "Arabic (MSA + Kuwaiti dialect) · English" },
            { key: "Deployment", value: "Embedded chatbot on moc.gov.kw" },
          ]}
          nextProject={{ title: nextProject.title, slug: nextProject.slug }}
        />
      </main>
      <Footer />
    </>
  );
}
