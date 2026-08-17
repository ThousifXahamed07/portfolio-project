import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectDetail } from "@/components/ProjectDetail";

export const metadata: Metadata = {
  title: "Tripdeal AI - Thousif Ahamed",
  description:
    "An AI-powered travel assistant backed by OpenSearch retrieval and intelligent room-mapping.",
};

export default function TripdealAIPage() {
  const project = projects.find((p) => p.slug === "tripdeal-ai")!;
  const nextProject = projects.find((p) => p.slug === "moc-chatbot")!;

  return (
    <>
      <Header />
      <main className="flex-1">
        <ProjectDetail
          project={project}
          whyIBuiltIt={{
            subtitle: "The Problem",
            paragraphs: [
              "Travel planning is broken at the discovery layer. OTAs dump thousands of results and expect the user to filter. The traveler knows what they want — 'a quiet beach resort near Muscat with good snorkeling and a kids club' — but the search box only understands dates, destinations, and star ratings. The gap between intent and inventory is where bookings die.",
              "Tripdeal had the inventory — hotel contracts, room blocks, negotiated rates — but no way to let users search it conversationally. The internal team was manually matching traveler requests to hotel inventory over WhatsApp. Every query took 15-30 minutes of human lookup time. The conversion window is short; by the time the agent replies, the traveler has already checked Booking.com.",
              "The core question was whether a retrieval-augmented AI agent could close that gap — understand natural-language travel intent, search structured inventory via OpenSearch, and return grounded recommendations fast enough to keep the traveler in the conversation.",
            ],
          }}
          approach={{
            subtitle: "The Work",
            paragraphs: [
              "Two deployment surfaces, one retrieval backbone. The AI agent lives both as an embedded widget on the Tripdeal website and as a standalone ChatGPT app — same knowledge base, different interaction patterns. The website agent handles quick, intent-dense queries ('show me 4-star hotels in Salalah under 80 KWD'). The ChatGPT app handles longer, exploratory conversations where travelers are still deciding where to go.",
              "The retrieval layer uses OpenSearch with a custom index schema designed around how travelers actually describe hotels — not just star ratings and amenities, but proximity to landmarks, vibe descriptors, and seasonal availability. The room-mapping engine sits between the retrieval layer and the response: it takes the candidate hotels, checks real-time room availability against the user's dates and party size, and filters out anything that can't actually be booked. No hallucinated recommendations.",
              "Multi-turn conversation state tracks the traveler's evolving preferences across the session. If they start with 'beach resort' and then mention 'my kids are 4 and 7', the agent narrows without re-asking. The context window carries forward intent signals so the retrieval query sharpens with every exchange.",
            ],
          }}
          decisions={[
            {
              title: "OpenSearch over vector-only retrieval",
              body: "Hotel search is fundamentally structured — price ranges, star ratings, dates, location coordinates. A pure vector search would retrieve semantically similar hotels but miss hard constraints like 'under 80 KWD' or 'available Dec 15-22'. OpenSearch gave us hybrid search: BM25 for structured filters combined with vector similarity for the fuzzy, vibes-based parts of the query. The precision on price and date constraints went from ~60% with vector-only to 95%+ with hybrid.",
            },
            {
              title: "Room-mapping as a post-retrieval filter, not a pre-filter",
              body: "The temptation was to check room availability before returning any results. But availability APIs are slow (200-400ms per hotel) and rate-limited. Checking 50 candidate hotels serially would blow the latency budget. Instead, the agent retrieves the top candidates on relevance, presents them with a 'checking availability' signal, and runs the room-mapping check in parallel. The UX feels instant; the availability confirmation follows within seconds.",
            },
            {
              title: "Dual deployment: website widget + ChatGPT app",
              body: "Different travelers have different discovery patterns. Some land on the Tripdeal website and want a quick answer — the embedded widget serves them with minimal friction. Others are already inside ChatGPT exploring travel ideas — the GPT app meets them where they are with the same retrieval backend. Sharing the retrieval layer means zero duplication of the knowledge base; the only difference is the system prompt and response formatting.",
            },
            {
              title: "Intent extraction before retrieval, not after",
              body: "Early versions passed the raw user message to OpenSearch. This worked for explicit queries but failed on implicit ones ('somewhere warm for a honeymoon in January'). Adding an intent extraction step — a lightweight LLM call that parses the message into structured fields (destination_type, budget_range, travel_dates, party_composition, vibe) — before hitting the search index improved retrieval relevance by roughly 40%.",
            },
          ]}
          architecture={{
            subtitle: "How It Fits Together",
            paragraphs: [
              "The user's natural-language query enters an intent extraction layer that parses it into structured search fields. These fields drive a hybrid OpenSearch query — BM25 for hard constraints, vector similarity for soft preferences. The top-N candidates pass through the room-mapping engine for real-time availability validation, then into the response generator which formats grounded recommendations with booking links. Conversation state persists across turns so the retrieval query sharpens without re-asking.",
            ],
            layers: [
              {
                label: "Input · User Query",
                items: [
                  { name: "Website Widget", detail: "embedded chat · quick intent-dense queries" },
                  { name: "ChatGPT App", detail: "standalone GPT · exploratory conversations" },
                ],
              },
              {
                label: "Processing · Retrieval Pipeline",
                items: [
                  { name: "Intent Extraction (GPT-4o)", detail: "parses NL → structured fields · destination, budget, dates, vibe" },
                  { name: "OpenSearch Hybrid", detail: "BM25 structured filters + vector similarity · custom hotel index" },
                  { name: "Room-Mapping Engine", detail: "real-time availability check · parallel per-hotel API calls" },
                ],
              },
              {
                label: "Output · Response",
                items: [
                  { name: "Response Generator", detail: "grounded recommendations · booking links · no hallucinated hotels" },
                  { name: "Conversation State", detail: "PostgreSQL · multi-turn intent tracking · preference carry-forward" },
                ],
              },
            ],
          }}
          stateOfTheArt={[
            {
              title: "OpenSearch hybrid retrieval (BM25 + vector)",
              description: "Combines structured filters for hard constraints (price, dates, star rating) with vector similarity for soft preferences (vibe, proximity). 95%+ precision on constraint-based queries vs. ~60% with vector-only.",
            },
            {
              title: "Real-time room-mapping engine",
              description: "Post-retrieval availability validation that checks live inventory against user dates and party size. Runs in parallel across candidates to stay within the latency budget.",
            },
            {
              title: "Multi-turn intent tracking",
              description: "Conversation state carries forward traveler preference signals across exchanges. The retrieval query sharpens with each turn without re-asking questions the traveler already answered.",
            },
            {
              title: "Dual-surface deployment (website + ChatGPT)",
              description: "Same retrieval backbone, two interaction surfaces. The website widget handles quick queries; the ChatGPT app handles exploratory conversations. Zero knowledge base duplication.",
            },
            {
              title: "Intent extraction before retrieval",
              description: "Lightweight LLM call parses natural-language queries into structured search fields before hitting the index. Improved retrieval relevance by ~40% on implicit queries.",
            },
          ]}
          measured={[
            {
              value: "< 3s",
              label: "Response Latency",
              description: "Intent + retrieval + generation",
            },
            {
              value: "95%",
              label: "Constraint Accuracy",
              description: "Price, date, location filters",
            },
            {
              value: "~85%",
              label: "Query Resolution",
              description: "Without human handoff",
            },
            {
              value: "15→2 min",
              label: "Response Time",
              description: "vs. manual WhatsApp lookup",
            },
          ]}
          ifIDidItAgain={[
            "I'd invest earlier in a feedback loop from booking conversions back to retrieval ranking. Right now the agent optimizes for relevance, but relevance and bookability aren't the same thing — a perfectly relevant hotel with a 2% conversion rate should rank lower than a slightly less relevant one with 15%. The data exists in the booking system; piping it back into the ranking layer would close the loop.",
            "The room-mapping API integration was the most fragile part of the system. Hotel availability APIs have inconsistent schemas, unpredictable latency, and aggressive rate limits. I'd build a caching layer with a 15-minute TTL for availability snapshots rather than hitting the API on every query — most availability doesn't change minute-to-minute, and the latency improvement would be significant.",
            "The ChatGPT app deployment taught me that system prompt engineering for a third-party platform is its own discipline. The same retrieval results need very different formatting — ChatGPT users expect markdown tables and structured comparisons; website widget users expect conversational prose with embedded booking links. I'd separate the response formatter earlier in the architecture.",
          ]}
          stack={[
            { key: "LLM", value: "GPT-4o · intent extraction and response generation" },
            { key: "Search", value: "OpenSearch · hybrid BM25 + vector retrieval" },
            { key: "Backend", value: "Python · FastAPI" },
            { key: "Deployment", value: "Embedded website widget · ChatGPT custom GPT" },
            { key: "Database", value: "PostgreSQL · conversation state and booking data" },
            { key: "Infra", value: "AWS · EC2, OpenSearch Service" },
          ]}
          nextProject={{ title: nextProject.title, slug: nextProject.slug }}
        />
      </main>
      <Footer />
    </>
  );
}
