import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chatty Bot - Your AI Assistant",
  description:
    "Chatty Bot is a fast and friendly AI assistant for answering questions, explaining ideas, and helping with everyday tasks.",
  keywords: [
    "Chatty Bot",
    "AI assistant",
    "AI chatbot",
    "chatbot",
    "artificial intelligence",
    "AI helper",
  ],
  authors: [{ name: "Aaditya Chaudhari" }],
  creator: "Aaditya Chaudhari",
  applicationName: "Chatty Bot",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Chatty Bot - Your AI Assistant",
    description:
      "Chatty Bot is a fast and friendly AI assistant for answering questions and helping with everyday tasks.",
    type: "website",
    siteName: "Chatty Bot",
  },
  twitter: {
    card: "summary",
    title: "Chatty Bot - Your AI Assistant",
    description:
      "Chat with Chatty Bot, your friendly AI assistant.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
