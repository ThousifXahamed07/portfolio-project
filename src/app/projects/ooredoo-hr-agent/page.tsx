import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectDetail } from "@/components/ProjectDetail";

export const metadata: Metadata = {
  title: "Ooredoo HR Agent - Thousif Ahamed",
  description:
    "An HR AI assistant for a large telecom enterprise, retrieving answers from internal HR documentation.",
};

export default function OoredooHRAgentPage() {
  const project = projects.find((p) => p.slug === "ooredoo-hr-agent")!;
  const nextProject = projects.find(
    (p) => p.slug === "asnan-tower-appointments"
  )!;

  return (
    <>
      <Header />
      <main className="flex-1">
        <ProjectDetail
          project={project}
          whyIBuiltIt={{
            subtitle: "The Problem",
            paragraphs: [
              "Ooredoo is one of the largest telecom operators in the Middle East. Their HR department fields thousands of employee questions every month — leave balances, benefits eligibility, onboarding procedures, policy clarifications, travel allowance rules. The same 50 questions account for 80% of the volume, but each one still requires a human HR officer to look up the answer in a policy document, compose a response, and send it back.",
              "The HR team was drowning in repetitive inquiries while strategic work — workforce planning, retention programs, performance frameworks — sat on the backlog. Employees waited 24-48 hours for answers to questions that have definitive, documented answers. The frustration was mutual: HR officers didn't want to be policy lookup machines, and employees didn't want to wait two days to find out if they could carry over unused leave.",
              "The challenge was specific to enterprise HR: the answers must come from Ooredoo's actual policies, not generic HR advice. A policy about sick leave in a Kuwaiti telecom company is different from a policy about sick leave at a US tech company. The agent had to ground every answer in Ooredoo's specific documentation, and it had to know when a question falls outside what the documents cover.",
            ],
          }}
          approach={{
            subtitle: "The Work",
            paragraphs: [
              "Knowledge retrieval architecture built around Ooredoo's internal HR document corpus. The corpus includes employee handbooks, policy manuals, benefits guides, onboarding checklists, and procedure documents — all chunked, embedded, and indexed for semantic search. When an employee asks a question, the agent retrieves the most relevant policy sections and generates an answer grounded in those specific documents.",
              "The retrieval layer was designed for precision over recall. In an HR context, returning a vaguely related policy section is worse than returning nothing — an employee might misinterpret a benefits rule from the wrong department or a policy that was superseded. The search index includes metadata for department scope, policy version, and effective dates, so retrieval results are filtered to the employee's actual context before the LLM sees them.",
              "Self-service flow with a clear escalation path. The agent handles the straightforward policy questions autonomously. For ambiguous situations — 'can I take leave during my probation if I have a family emergency' — it provides the relevant policy text and explicitly recommends the employee consult their HR business partner, with a direct link to schedule time. The agent augments the HR team; it doesn't replace the judgment calls.",
            ],
          }}
          decisions={[
            {
              title: "Document-level metadata filtering before semantic search",
              body: "Ooredoo's HR policies vary by country, department, and employment level. An engineer in Kuwait and a marketing manager in Qatar have different leave entitlements. Running a naive semantic search across the entire corpus would surface relevant-looking but actually inapplicable policies. We added structured metadata to every document chunk — country, department scope, employee level, effective date — and filter before the vector search runs.",
            },
            {
              title: "Citation with policy document reference in every answer",
              body: "Every answer the agent generates includes the specific policy document name, section number, and effective date. This serves two purposes: the employee can verify the answer against the source document if they want to, and the HR team can audit the agent's answers by checking citations. When a policy is updated, the citation trail makes it immediately visible if the agent is still referencing an outdated version.",
            },
            {
              title: "Conservative confidence threshold for autonomous answers",
              body: "We set the confidence threshold high enough that the agent only answers autonomously when it has strong retrieval evidence. On ~20% of queries, the agent returns the relevant policy sections but explicitly says 'I recommend confirming with your HR business partner for your specific situation.' This costs automation rate but builds trust — employees learn that when the agent gives a direct answer, they can rely on it.",
            },
            {
              title: "Version-controlled knowledge base with change tracking",
              body: "HR policies change quarterly — new benefits packages, updated travel allowances, revised leave policies. The knowledge base uses version control so every document chunk carries its effective date and supersession status. When a policy is updated, the old version is marked as superseded (not deleted), and the agent automatically surfaces the current version. A weekly sync job flags stale documents.",
            },
          ]}
          architecture={{
            subtitle: "How It Fits Together",
            paragraphs: [
              "Employee queries enter the agent through the internal enterprise platform. The retrieval layer applies metadata filters (country, department, employee level) before running semantic search against the policy corpus. Retrieved document chunks feed into the LLM for grounded answer generation with citations. A confidence gate routes low-evidence queries to HR business partners with context attached. The knowledge base syncs weekly from the policy repository with version tracking.",
            ],
            layers: [
              {
                label: "Input · Employee Interface",
                items: [
                  { name: "Enterprise Platform", detail: "internal chatbot · authenticated employee sessions" },
                ],
              },
              {
                label: "Processing · Knowledge Retrieval",
                items: [
                  { name: "Metadata Filter", detail: "country · department · employee level · effective date" },
                  { name: "Semantic Search", detail: "vector index · precision-optimized · policy-chunk retrieval" },
                  { name: "Confidence Gate", detail: "high threshold · routes uncertain queries to HR BP" },
                ],
              },
              {
                label: "Output · Response",
                items: [
                  { name: "GPT-4o Generator", detail: "grounded answers · policy citations · document + section + date" },
                  { name: "HR Escalation", detail: "context handoff · relevant policy sections + employee query" },
                ],
              },
              {
                label: "Data · Policy Corpus",
                items: [
                  { name: "Versioned Knowledge Base", detail: "handbooks · policy manuals · benefits guides · onboarding docs" },
                  { name: "Weekly Sync", detail: "change detection · re-indexing · stale document flagging" },
                ],
              },
            ],
          }}
          stateOfTheArt={[
            {
              title: "Metadata-filtered semantic search for policy accuracy",
              description: "Structured filters (country, department, employee level, effective date) applied before vector search. Eliminates 'right topic, wrong policy' errors that naive semantic search produces in a multi-country enterprise.",
            },
            {
              title: "Version-controlled knowledge base with change tracking",
              description: "Every policy document chunk carries its effective date and supersession status. Outdated policies are marked, not deleted — the agent always surfaces the current version while maintaining audit trail.",
            },
            {
              title: "Conservative confidence gating",
              description: "The agent only answers autonomously when retrieval evidence is strong. ~20% of queries get explicit 'check with HR' recommendations instead of guessed answers. Builds trust over time — employees learn to rely on direct answers.",
            },
            {
              title: "Citation-grounded responses",
              description: "Every answer cites the specific policy document name, section number, and effective date. Auditable by HR, verifiable by employees, and immediately visible when a citation points to a superseded policy.",
            },
            {
              title: "Enterprise deployment at a major telecom operator",
              description: "Shipped for Ooredoo, one of the largest telecom enterprises in the Middle East. Serving employees across multiple countries with policy-grounded HR assistance.",
            },
          ]}
          measured={[
            {
              value: "80%",
              label: "Auto-Resolution",
              description: "Without HR involvement",
            },
            {
              value: "24h→<1m",
              label: "Response Time",
              description: "vs. next-business-day",
            },
            {
              value: "100%",
              label: "Citation Rate",
              description: "Every answer cites source",
            },
            {
              value: "Shipped",
              label: "Status",
              description: "Enterprise deployment",
            },
          ]}
          ifIDidItAgain={[
            "I'd build a feedback mechanism where HR officers can flag incorrect or outdated answers directly from the escalation interface. Currently, knowledge base corrections go through a separate update workflow. Closing the loop between 'HR officer notices a wrong answer' and 'knowledge base gets updated' should be a single click, not a separate process.",
            "The onboarding use case turned out to be the highest-value one — new employees have the most questions and the least context for who to ask. I'd prioritize onboarding-specific flows earlier: a guided checklist agent that proactively surfaces information new hires need at each stage, rather than waiting for them to ask.",
            "Multi-language support (Arabic and English) was scoped but not fully implemented in the initial deployment. Ooredoo's workforce is multilingual, and employees would naturally ask in either language. I'd make bilingual support a day-one requirement rather than a phase-two feature.",
          ]}
          stack={[
            { key: "LLM", value: "GPT-4o · answer generation with policy grounding" },
            { key: "Retrieval", value: "Semantic search · metadata-filtered vector index" },
            { key: "Knowledge", value: "HR handbooks · policy manuals · benefits guides" },
            { key: "Backend", value: "Python · FastAPI" },
            { key: "Database", value: "PostgreSQL · document versioning and conversation logs" },
            { key: "Deployment", value: "Internal enterprise platform · Ooredoo" },
          ]}
          nextProject={{ title: nextProject.title, slug: nextProject.slug }}
        />
      </main>
      <Footer />
    </>
  );
}
