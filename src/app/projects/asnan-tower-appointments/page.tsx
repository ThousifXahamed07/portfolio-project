import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectDetail } from "@/components/ProjectDetail";

export const metadata: Metadata = {
  title: "Asnan Tower Appointments Agent - Thousif Ahamed",
  description:
    "An AI booking assistant that automates appointment scheduling for a dental clinic.",
};

export default function AsnanTowerPage() {
  const project = projects.find(
    (p) => p.slug === "asnan-tower-appointments"
  )!;
  const nextProject = projects.find(
    (p) => p.slug === "alhamra-receipt-ocr"
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
              "Asnan Tower is a dental clinic that handles 50-80 appointment requests per day across multiple practitioners. The entire booking process ran through a front desk receptionist — phone calls, WhatsApp messages, walk-in requests. The receptionist was the bottleneck: checking doctor schedules, cross-referencing available slots, handling reschedules, sending reminders manually. During peak hours, calls went unanswered. After hours, messages piled up until the next morning.",
              "The no-show rate was the expensive part. Without automated reminders, roughly 25% of appointments were no-shows. Each no-show is a wasted 30-60 minute slot that could have been filled if the cancellation had come earlier. The receptionist didn't have time to call every patient the day before — they were too busy handling incoming booking requests.",
              "The clinic needed an agent that could handle the full appointment lifecycle conversationally — booking, rescheduling, cancellation, reminders — while understanding the constraints that make dental scheduling specific: procedure types have different durations, some procedures require specific equipment or practitioners, and follow-up appointments need to be scheduled relative to the initial visit.",
            ],
          }}
          approach={{
            subtitle: "The Work",
            paragraphs: [
              "Conversational booking agent connected to the clinic's scheduling system. Patients interact through natural language — 'I need a cleaning next week, preferably morning' — and the agent checks real-time availability across all practitioners, presents options, and confirms the booking. The agent handles the full lifecycle: initial booking, rescheduling, cancellation, and automated reminders.",
              "The scheduling logic is more complex than it appears. A 'cleaning' is 30 minutes. A 'root canal' is 90 minutes and requires a specific practitioner. A 'consultation' is 15 minutes but might need to be followed by a longer procedure on the same day. The agent maps natural-language procedure descriptions to the clinic's internal procedure catalog, applies the correct duration and resource requirements, and only offers slots that actually work for the requested procedure.",
              "Automated reminder pipeline runs at 24-hour and 2-hour marks before each appointment. If the patient responds to cancel, the agent immediately opens the slot and offers it to patients on the waitlist for that practitioner. This closed-loop approach turns cancellations from pure loss into rebooking opportunities.",
            ],
          }}
          decisions={[
            {
              title: "Natural language to structured procedure mapping",
              body: "Patients don't say 'I need procedure code D1110.' They say 'I need a cleaning' or 'my tooth hurts.' The agent maps these natural-language descriptions to the clinic's internal procedure catalog using a lightweight classification step. This mapping determines the appointment duration, required practitioner specialty, and equipment needs — all of which constrain which slots the agent can offer.",
            },
            {
              title: "Real-time availability with optimistic locking",
              body: "Two patients asking for the same slot at the same time is a real scenario at a busy clinic. The agent uses optimistic locking on the scheduling system — when it presents a slot to a patient, it holds a soft reservation for 5 minutes. If the patient confirms, the reservation converts to a booking. If they don't respond, the slot releases back to the pool.",
            },
            {
              title: "Proactive reminders with cancellation-to-waitlist pipeline",
              body: "Reminders aren't just a notification — they're an opportunity to recover revenue. When a patient responds to a reminder with a cancellation, the agent immediately identifies patients on the waitlist for that practitioner and time window, and offers the newly opened slot. The clinic recovers slots that would otherwise go empty.",
            },
            {
              title: "Graceful fallback for complex scheduling scenarios",
              body: "Some scheduling requests are genuinely complex: 'I need three appointments for my family, all on the same day, with the same dentist if possible.' The agent handles the common cases autonomously but flags multi-appointment, multi-patient requests for human review when the constraint satisfaction becomes non-trivial. The front desk gets the request pre-parsed with suggested slot combinations.",
            },
          ]}
          architecture={{
            subtitle: "How It Fits Together",
            paragraphs: [
              "Patient messages enter the conversational agent, which runs an NLU layer to extract procedure intent and scheduling preferences. The procedure classifier maps natural language to the clinic's catalog (with durations and resource requirements). The availability engine queries the scheduling system with optimistic locking, presents slot options, and confirms bookings. A separate reminder pipeline monitors upcoming appointments and handles the cancellation-to-waitlist flow.",
            ],
            layers: [
              {
                label: "Input · Patient Interface",
                items: [
                  { name: "Conversational Agent", detail: "natural-language booking · reschedule · cancel" },
                ],
              },
              {
                label: "Processing · Scheduling Engine",
                items: [
                  { name: "Procedure Classifier", detail: "NL → procedure catalog · duration · practitioner requirements" },
                  { name: "Availability Engine", detail: "real-time slot check · optimistic locking · 5-min hold" },
                  { name: "Conflict Resolver", detail: "multi-appointment handling · complex requests → human review" },
                ],
              },
              {
                label: "Automation · Reminders",
                items: [
                  { name: "Reminder Pipeline", detail: "24h + 2h automated reminders · cancellation handling" },
                  { name: "Waitlist Manager", detail: "cancelled slot → waitlist notification · rebooking" },
                ],
              },
              {
                label: "Data · Scheduling System",
                items: [
                  { name: "Clinic Calendar", detail: "practitioner schedules · procedure catalog · patient records" },
                  { name: "PostgreSQL", detail: "appointments · waitlist · patient context · booking history" },
                ],
              },
            ],
          }}
          stateOfTheArt={[
            {
              title: "Conversational appointment lifecycle management",
              description: "Full booking lifecycle — scheduling, rescheduling, cancellation, and reminders — handled through natural-language conversation. No phone menus or form filling.",
            },
            {
              title: "Natural-language procedure classification",
              description: "Maps patient descriptions ('my tooth hurts', 'I need a cleaning') to the clinic's internal procedure catalog with correct durations and resource requirements. Constrains slot offers to what actually works for the procedure.",
            },
            {
              title: "Optimistic locking for concurrent booking",
              description: "Prevents double-booking when multiple patients request the same slot. Soft reservations hold slots for 5 minutes during conversation; unreserved slots release back to the pool automatically.",
            },
            {
              title: "Closed-loop cancellation-to-waitlist pipeline",
              description: "Cancellations from reminders immediately trigger waitlist notifications for that practitioner and time window. Turns no-shows from pure loss into rebooking opportunities within minutes.",
            },
          ]}
          measured={[
            {
              value: "~70%",
              label: "Automated Bookings",
              description: "Without receptionist",
            },
            {
              value: "25→~10%",
              label: "No-Show Rate",
              description: "Via automated reminders",
            },
            {
              value: "< 30s",
              label: "Booking Time",
              description: "Request to confirmation",
            },
            {
              value: "24/7",
              label: "Availability",
              description: "After-hours booking",
            },
          ]}
          ifIDidItAgain={[
            "I'd integrate with the clinic's patient management system for richer context. Right now the agent treats every interaction as a standalone booking request. If it knew the patient's history — last visit date, pending treatments, recall schedule — it could proactively suggest appointments instead of waiting for inbound requests.",
            "The procedure mapping step is currently a classification model. For a dental clinic with ~30 procedure types, this works. But the edge cases live in symptom-based requests ('my tooth hurts when I drink cold water') where the patient doesn't know what procedure they need. I'd add a symptom triage step that asks 2-3 clarifying questions and maps to the most likely procedure type.",
            "Multi-channel support was requested but not implemented in the prototype. Patients currently interact through one channel. I'd build a channel-agnostic conversation layer so the same agent handles WhatsApp, phone (via voice-to-text), and web chat — with conversation state shared across channels.",
          ]}
          stack={[
            { key: "LLM", value: "GPT-4o · conversation and procedure classification" },
            { key: "Scheduling", value: "Custom availability engine · optimistic locking" },
            { key: "Backend", value: "Python · FastAPI" },
            { key: "Messaging", value: "Automated reminders · cancellation handling" },
            { key: "Database", value: "PostgreSQL · appointments, waitlist, patient context" },
            { key: "Deployment", value: "Conversational agent · Asnan Tower dental clinic" },
          ]}
          nextProject={{ title: nextProject.title, slug: nextProject.slug }}
        />
      </main>
      <Footer />
    </>
  );
}
