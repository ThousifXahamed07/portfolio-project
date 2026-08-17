import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono, Onest } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thousif Ahamed - AI Engineer",
  description: "AI Agents, RAG Systems & Enterprise AI Applications",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${jetbrainsMono.variable} ${onest.variable} antialiased`}
    >
      <body className="min-h-[100dvh] flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
