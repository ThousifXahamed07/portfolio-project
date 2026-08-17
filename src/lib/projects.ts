export interface ExternalLink {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  detailPage: string;
  thumbnail: string;
  externalLinks?: ExternalLink[];
  context?: string;
  technicalNote?: string;
}

export const projects: Project[] = [
  {
    slug: "tripdeal-ai",
    title: "Tripdeal AI",
    category: "AI Travel Agent Platform",
    description:
      "An AI-powered travel assistant that helps users discover destinations, answer travel questions, and receive personalized recommendations - backed by OpenSearch retrieval and intelligent room-mapping.",
    tags: ["AI Website Agent", "ChatGPT App", "OpenSearch", "Room Mapping"],
    detailPage: "/projects/tripdeal-ai",
    thumbnail: "/projects/tripdeal-ai/thumbnail.svg",
    externalLinks: [
      { label: "Try AI Agent", url: "https://ai-agent.tripdeal.co/chat" },
      {
        label: "Open GPT App",
        url: "https://chatgpt.com/apps/tripdeal/asdk_app_69a9760e77e88191b1fb86183f095859",
      },
    ],
  },
  {
    slug: "moc-chatbot",
    title: "MOC Chatbot",
    category: "Enterprise Chatbot",
    description:
      "An intelligent enterprise chatbot that automates customer interactions and improves response efficiency with retrieval-augmented answers grounded in an internal knowledge base.",
    tags: ["Conversational AI", "Knowledge Base", "Enterprise Automation"],
    detailPage: "/projects/moc-chatbot",
    thumbnail: "/projects/moc-chatbot/thumbnail.svg",
    externalLinks: [
      {
        label: "Open MOC Chatbot",
        url: "https://chatbot.moc.gov.kw/MOC/en/chatbot",
      },
    ],
    context: "Live chatbot for the Ministry of Communications, Kuwait",
  },
  {
    slug: "ooredoo-hr-agent",
    title: "Ooredoo HR Agent",
    category: "Enterprise HR AI Agent",
    description:
      "An HR assistant that answers employee questions and automates HR workflows, retrieving grounded answers from internal HR documentation for a large telecom enterprise.",
    tags: ["Employee Support", "Knowledge Retrieval", "AI Agent"],
    detailPage: "/projects/ooredoo-hr-agent",
    thumbnail: "/projects/ooredoo-hr-agent/thumbnail.svg",
    externalLinks: [
      {
        label: "Screen Recording",
        url: "https://drive.google.com/file/d/1HZcxcJYGAy-R_Ib2-Hb6_gJ4xTT9Jqcx/preview",
      },
    ],
  },
  {
    slug: "asnan-tower-appointments",
    title: "Asnan Tower Appointments Agent",
    category: "Appointment Scheduling AI Agent",
    description:
      "An AI booking assistant that automates appointment scheduling and customer conversations for a dental clinic, handling availability, reminders, and natural-language requests.",
    tags: ["Appointment Booking", "AI Conversations", "Customer Support"],
    detailPage: "/projects/asnan-tower-appointments",
    thumbnail: "/projects/asnan-tower-appointments/logo.svg",
    externalLinks: [
      {
        label: "Screen Recording",
        url: "https://drive.google.com/file/d/192LMMQ5HxgNJ9QcYrnfbsLKbs6o5xwaL/preview",
      },
    ],
  },
  {
    slug: "alhamra-receipt-ocr",
    title: "Alhamra Tower Receipt OCR",
    category: "Receipt Validation & Loyalty System",
    description:
      "A receipt intelligence system that reads purchase receipts, verifies authenticity to prevent fraud, and awards loyalty points proportional to the verified spend - powered by an on-premise vision-language model.",
    tags: ["Receipt OCR", "Fraud Detection", "Loyalty Points", "On-Premise VLM"],
    detailPage: "/projects/alhamra-receipt-ocr",
    thumbnail: "/projects/alhamra-receipt-ocr/logo.svg",
    technicalNote:
      "Built on an on-premise Qwen 3.5 VL pipeline for privacy-preserving receipt reading",
  },
];
