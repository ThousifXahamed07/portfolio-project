import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectDetail } from "@/components/ProjectDetail";

export const metadata: Metadata = {
  title: "Alhamra Tower Receipt OCR - Thousif Ahamed",
  description:
    "A receipt intelligence system powered by an on-premise vision-language model for fraud detection and loyalty points.",
};

export default function AlhamraReceiptOCRPage() {
  const project = projects.find((p) => p.slug === "alhamra-receipt-ocr")!;
  const nextProject = projects.find((p) => p.slug === "tripdeal-ai")!;

  return (
    <>
      <Header />
      <main className="flex-1">
        <ProjectDetail
          project={project}
          whyIBuiltIt={{
            subtitle: "The Problem",
            paragraphs: [
              "Alhamra Tower runs a loyalty program where shoppers earn points based on their purchase amounts at tenant stores. The verification process was entirely manual: a customer brings their receipt to the loyalty desk, an employee reads the receipt, manually enters the amount into the loyalty system, and awards points. This process was slow (3-5 minutes per receipt), error-prone (manual entry mistakes on ~8% of transactions), and couldn't scale during peak shopping hours.",
              "The fraud problem was the expensive one. Customers were submitting duplicate receipts, receipts from other malls, digitally altered receipts with inflated amounts, and even receipts from online purchases. The manual verification staff couldn't reliably detect all these fraud vectors — they were checking for obvious fakes but missing the sophisticated ones. The loyalty program was hemorrhaging points to fraudulent submissions.",
              "The constraint that made this interesting: the solution had to run entirely on-premise. Receipt images contain purchase details, store information, and transaction amounts — data the building management considered sensitive enough to prohibit cloud processing. Any OCR or AI system had to run within the building's own infrastructure, with no data leaving the premises.",
            ],
          }}
          approach={{
            subtitle: "The Work",
            paragraphs: [
              "On-premise vision-language model pipeline built around Qwen 3.5 VL. The system takes a photo of a receipt (captured via a tablet at the loyalty desk or uploaded through a mobile app), runs it through the VLM for structured data extraction, validates the extracted data against fraud detection rules, and awards loyalty points proportional to the verified purchase amount. The entire pipeline runs on local GPU infrastructure inside the building.",
              "The VLM does more than OCR. Traditional OCR extracts text; the vision-language model understands receipt structure. It identifies the store name, individual line items, subtotals, tax amounts, total amount, transaction date, and receipt number — even on receipts with non-standard layouts, Arabic text, faded thermal print, or partial damage.",
              "Multi-layer fraud detection pipeline runs after extraction. Layer 1: duplicate detection using receipt number and store+date+amount fingerprinting. Layer 2: consistency validation — does the total match the line items? Is the tax calculation correct? Is the store name a known tenant? Layer 3: anomaly detection — is this receipt amount unusual for this store? Each layer produces a confidence score; receipts that fail any layer are flagged for manual review rather than automatically rejected.",
            ],
          }}
          decisions={[
            {
              title: "On-premise Qwen 3.5 VL over cloud vision APIs",
              body: "Cloud vision APIs (Google Vision, AWS Textract) would have been easier to integrate and arguably more accurate on English receipts. But the on-premise constraint was non-negotiable — receipt data stays in the building. Qwen 3.5 VL runs well on a single A100 GPU, handles Arabic text natively, and gives us full control over the model's behavior. The accuracy gap vs. cloud APIs is <3% on our receipt corpus.",
            },
            {
              title: "Vision-language model over traditional OCR + parsing",
              body: "Traditional OCR pipelines (Tesseract → text → regex parsing) are fragile. Receipt layouts vary by store, thermal print quality degrades, and Arabic receipts mix RTL and LTR text. A VLM understands the visual structure of a receipt — it can identify the total amount even when the layout is unfamiliar or the text is partially faded. The VLM approach reduced extraction errors from ~12% to ~3% on our test corpus across 30+ tenant stores.",
            },
            {
              title: "Multi-layer fraud detection with human-in-the-loop",
              body: "The temptation was to auto-reject any receipt that fails fraud checks. But false positives are expensive in a loyalty program — rejecting a legitimate receipt damages the customer relationship. Instead, we flag suspicious receipts for human review. The fraud detection layers provide the reviewer with specific reasons for the flag, so the review takes 30 seconds instead of 3 minutes.",
            },
            {
              title: "Receipt fingerprinting for duplicate detection",
              body: "The simplest fraud vector is submitting the same receipt twice. But receipt images are never identical — different angles, lighting, crops. We fingerprint receipts using extracted structured data (store + date + time + total + receipt number) rather than image similarity. This catches duplicates regardless of how the photo was taken, and it's computationally cheap enough to run against the entire receipt history in <100ms.",
            },
          ]}
          architecture={{
            subtitle: "How It Fits Together",
            paragraphs: [
              "Receipt images enter the pipeline from the loyalty desk tablet or mobile app. The on-premise Qwen 3.5 VL extracts structured data (store, items, total, date, receipt number) into JSON. The fraud detection pipeline runs three sequential layers — duplicate fingerprinting, consistency validation, anomaly detection — each producing a confidence score. Clean receipts flow through to automatic points award; flagged receipts route to human review with specific fraud indicators attached.",
            ],
            layers: [
              {
                label: "Input · Receipt Capture",
                items: [
                  { name: "Loyalty Desk Tablet", detail: "camera capture · staff-assisted submission" },
                  { name: "Mobile App", detail: "customer self-service · photo upload" },
                ],
              },
              {
                label: "Extraction · Vision-Language Model",
                items: [
                  { name: "Qwen 3.5 VL (On-Premise)", detail: "structured extraction · store, items, total, date, receipt #" },
                  { name: "NVIDIA A100 GPU", detail: "local inference · no cloud dependency · <5s processing" },
                ],
              },
              {
                label: "Validation · Fraud Detection Pipeline",
                items: [
                  { name: "Duplicate Fingerprinting", detail: "store+date+total+receipt# hash · <100ms against full history" },
                  { name: "Consistency Validation", detail: "line items vs. total · tax calculation · known tenant check" },
                  { name: "Anomaly Detection", detail: "unusual amounts per store · submission rate per customer" },
                ],
              },
              {
                label: "Output · Points & Review",
                items: [
                  { name: "Auto Points Award", detail: "clean receipts → loyalty points proportional to verified spend" },
                  { name: "Human Review Queue", detail: "flagged receipts with specific fraud indicators · 30s review" },
                ],
              },
            ],
          }}
          stateOfTheArt={[
            {
              title: "On-premise Qwen 3.5 VL for privacy-preserving receipt intelligence",
              description: "Runs entirely within building infrastructure on a single A100 GPU. Zero cloud dependency for sensitive financial data. Handles Arabic text, faded thermal print, and non-standard receipt layouts natively.",
            },
            {
              title: "VLM structural understanding vs. traditional OCR",
              description: "The vision-language model understands receipt structure, not just text. Identifies totals, line items, and store names even on unfamiliar layouts. Reduced extraction errors from ~12% (OCR + regex) to ~3% across 30+ tenant stores.",
            },
            {
              title: "Multi-layer fraud detection with fingerprinting",
              description: "Three sequential validation layers — duplicate detection via structural fingerprinting, line-item consistency checks, and per-store anomaly detection. Each layer produces a confidence score for transparent human review.",
            },
            {
              title: "Human-in-the-loop fraud review",
              description: "Flagged receipts route to human reviewers with specific fraud indicators attached. Review takes 30 seconds vs. 3 minutes without AI pre-screening. No legitimate receipts auto-rejected — false positive cost is too high in a loyalty program.",
            },
          ]}
          measured={[
            {
              value: "~97%",
              label: "Extraction Accuracy",
              description: "Structured data from images",
            },
            {
              value: "< 5s",
              label: "Processing Time",
              description: "Photo to verified points",
            },
            {
              value: "100%",
              label: "On-Premise",
              description: "Zero cloud dependency",
            },
            {
              value: "~92%",
              label: "Fraud Detection",
              description: "Known vector catch rate",
            },
          ]}
          ifIDidItAgain={[
            "I'd build a receipt format registry from day one. Every tenant store's POS system produces a slightly different receipt layout. The VLM handles variation well, but extraction accuracy improves 2-3% when you fine-tune on store-specific examples. A registry that maps each tenant to their receipt format, with 10-20 annotated examples per store, would have accelerated the accuracy improvements we spent weeks iterating on post-launch.",
            "The fraud detection rules were initially hard-coded thresholds ('flag if amount > 500 KWD'). These needed constant tuning as shopping patterns changed. I'd implement an adaptive anomaly detection layer that learns normal transaction patterns per store and per customer, rather than static thresholds.",
            "The on-premise deployment constraint meant we couldn't do A/B testing or gradual rollouts. Every model update was a full deployment swap. I'd build a shadow-mode pipeline where the new model processes receipts alongside the production model, and the results are compared automatically. Deploying with confidence in an on-premise environment requires this kind of parallel validation.",
          ]}
          stack={[
            { key: "VLM", value: "Qwen 3.5 VL · on-premise receipt extraction" },
            { key: "Hardware", value: "NVIDIA A100 GPU · local inference" },
            { key: "Fraud", value: "Multi-layer pipeline · fingerprinting, validation, anomaly" },
            { key: "Backend", value: "Python · FastAPI" },
            { key: "Database", value: "PostgreSQL · receipt records, fraud flags, loyalty ledger" },
            { key: "Deployment", value: "On-premise · Alhamra Tower infrastructure" },
          ]}
          nextProject={{ title: nextProject.title, slug: nextProject.slug }}
        />
      </main>
      <Footer />
    </>
  );
}
