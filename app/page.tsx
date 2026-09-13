"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    if (!message.trim() || loading) return;

    const text = message.trim();

    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
    ]);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "Sorry, I couldn't answer that.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't connect to the AI.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <main className="flex min-h-screen bg-[#212121] text-white">

      <aside className="hidden w-64 flex-col border-r border-gray-700 bg-[#171717] p-3 md:flex">
        <button
          onClick={() => setMessages([])}
          className="mb-6 rounded-lg border border-gray-600 px-4 py-3 text-left hover:bg-gray-800"
        >
          ＋ New chat
        </button>

        <p className="px-3 text-xs text-gray-500">CHAT HISTORY</p>

        <div className="mt-3 rounded-lg px-3 py-3 text-sm hover:bg-gray-800">
          Current conversation
        </div>

        <div className="mt-auto">
          <button className="w-full rounded-lg px-3 py-3 text-left hover:bg-gray-800">
            ⚙ Settings
          </button>
        </div>
      </aside>

      <section className="flex flex-1 flex-col">

        <header className="flex items-center justify-between border-b border-gray-700 px-5 py-4">
          <h1 className="text-xl font-semibold">Chatty Bot</h1>

          <button className="rounded-lg px-3 py-2 hover:bg-gray-800">
            Pro 🚀
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-8">
          <div className="mx-auto w-full max-w-3xl">

            {messages.length === 0 ? (
              <div className="flex min-h-[55vh] items-center justify-center text-center">
                <div>
                  <div className="mb-6 text-5xl">🤖</div>

                  <h2 className="text-4xl font-bold">
                    How can I help you?
                  </h2>

                  <p className="mt-3 text-gray-400">
                    Welcome to Chatty Bot.
                  </p>

                  <div className="mt-10 grid gap-3 sm:grid-cols-2">
                    <button
                      onClick={() => setMessage("Solve a math problem")}
                      className="rounded-xl border border-gray-700 p-4 text-left hover:bg-gray-800"
                    >
                      🧮 Solve a problem
                    </button>

                    <button
                      onClick={() => setMessage("Help me write code")}
                      className="rounded-xl border border-gray-700 p-4 text-left hover:bg-gray-800"
                    >
                      💻 Help me code
                    </button>

                    <button
                      onClick={() => setMessage("Analyze an image")}
                      className="rounded-xl border border-gray-700 p-4 text-left hover:bg-gray-800"
                    >
                      🖼️ Analyze an image
                    </button>

                    <button
                      onClick={() => setMessage("Search the web")}
                      className="rounded-xl border border-gray-700 p-4 text-left hover:bg-gray-800"
                    >
                      🌐 Search the web
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={
                      msg.role === "user"
                        ? "flex justify-end"
                        : "flex justify-start"
                    }
                  >
                    <div
                      className={
                        msg.role === "user"
                          ? "max-w-[80%] rounded-2xl bg-white px-4 py-3 text-black"
                          : "max-w-[80%] rounded-2xl bg-[#2f2f2f] px-4 py-3 text-white"
                      }
                    >
                      <ReactMarkdown
  components={{
    h1: ({ children }) => (
      <h1 className="mb-3 text-2xl font-bold">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-2 mt-4 text-xl font-bold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-2 mt-3 text-lg font-semibold">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mb-3 last:mb-0">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mb-3 list-disc space-y-1 pl-6">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-3 list-decimal space-y-1 pl-6">{children}</ol>
    ),
    code: ({ children }) => (
      <code className="rounded bg-black/30 px-1.5 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mb-3 overflow-x-auto rounded-xl bg-black/40 p-4">
        {children}
      </pre>
    ),
    strong: ({ children }) => (
      <strong className="font-bold">{children}</strong>
    ),
  }}
>
  {msg.content}
</ReactMarkdown>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl bg-[#2f2f2f] px-4 py-3 text-gray-400">
                      Chatty Bot is thinking...
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}

          </div>
        </div>

        <div className="w-full px-4 pb-6">
          <div className="mx-auto flex max-w-3xl items-center rounded-2xl border border-gray-600 bg-[#2f2f2f] px-3 py-2 shadow-lg">

            <button className="rounded-lg p-3 text-xl hover:bg-gray-700">
              📎
            </button>

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Chatty Bot..."
              disabled={loading}
              className="flex-1 bg-transparent px-3 py-3 text-white outline-none placeholder:text-gray-500"
            />

            <button
              onClick={sendMessage}
              disabled={loading || !message.trim()}
              className="rounded-xl bg-white px-4 py-3 font-bold text-black hover:bg-gray-200 disabled:opacity-40"
            >
              ↑
            </button>

          </div>

          <p className="mt-2 text-center text-xs text-gray-500">
            Chatty Bot can make mistakes. Check important information.
          </p>
        </div>

      </section>
    </main>
  );
}
