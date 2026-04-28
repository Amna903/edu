'use client';

import { FormEvent, useMemo, useState } from 'react';

type ChatRole = 'user' | 'assistant';

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  createdAt: number;
};

function buildId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function StudentAiSupportChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: buildId('assistant'),
      role: 'assistant',
      text: 'Assalam o Alaikum! I am your AI support assistant. Ask me anything about your studies, courses, or platform issues.',
      createdAt: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !isSending, [input, isSending]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || isSending) return;

    const userMessage: ChatMessage = {
      id: buildId('user'),
      role: 'user',
      text,
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setError(null);
    setIsSending(true);

    try {
      const response = await fetch('/api/support/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ msg: text }),
      });

      const rawText = await response.text();
      let data: { reply?: string; error?: string } = {};
      if (rawText.trim()) {
        try {
          data = JSON.parse(rawText) as { reply?: string; error?: string };
        } catch {
          data = {};
        }
      }

      if (!response.ok) {
        throw new Error(data?.error || rawText || 'Failed to send message');
      }

      const reply: ChatMessage = {
        id: buildId('assistant'),
        role: 'assistant',
        text: data?.reply || rawText || 'I received your message. Please continue.',
        createdAt: Date.now(),
      };

      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to contact AI support');
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">AI Support Chat</h1>
        <p className="mt-2 text-sm font-medium text-slate-500">
          Instant chatbot support for learning questions and platform help.
        </p>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 h-[60vh] min-h-[420px] flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                  message.role === 'user'
                    ? 'ml-auto bg-indigo-600 text-white rounded-br-md'
                    : 'mr-auto bg-white border border-slate-200 text-slate-800 rounded-bl-md'
                }`}
              >
                {message.text}
              </div>
            ))}

            {isSending && (
              <div className="mr-auto max-w-[85%] rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
                Typing...
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-slate-200 bg-white p-3 sm:p-4">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                placeholder="Type your question..."
                disabled={isSending}
              />
              <button
                type="submit"
                disabled={!canSend}
                className="rounded-xl bg-indigo-600 text-white px-5 py-3 text-sm font-bold hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send
              </button>
            </div>
            {error && <p className="mt-2 text-xs font-medium text-red-600">{error}</p>}
          </form>
        </div>
      </section>
    </div>
  );
}
