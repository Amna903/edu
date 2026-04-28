import { FormEvent, useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthUser } from "@/hooks/use-auth";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

function extractReply(payload: unknown): string {
  if (!payload) return "";
  if (typeof payload === "string") return payload;
  if (Array.isArray(payload)) {
    for (const item of payload) {
      const nested = extractReply(item);
      if (nested) return nested;
    }
    return "";
  }
  if (typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    const keys = ["reply", "message", "response", "output", "text", "answer"];
    for (const key of keys) {
      const value = record[key];
      if (typeof value === "string" && value.trim()) return value;
      const nested = extractReply(value);
      if (nested) return nested;
    }
  }
  return "";
}

type AIChatLauncherProps = {
  className?: string;
};

export function AIChatLauncher({ className }: AIChatLauncherProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "assistant-welcome", role: "assistant", text: "Ask me anything. I am your AI support assistant." },
  ]);
  const { data: user } = useAuthUser();

  if (!user || user.role !== "student") {
    return null;
  }

  const canSend = useMemo(() => input.trim().length > 0 && !isSending, [input, isSending]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const msg = input.trim();
    if (!msg || isSending) return;

    setMessages((prev) => [...prev, { id: `user-${Date.now()}`, role: "user", text: msg }]);
    setInput("");
    setError(null);
    setIsSending(true);

    try {
      const response = await fetch("/api/support/ai", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
        },
        body: JSON.stringify({ msg }),
      });

      const rawText = await response.text();
      let payload: unknown = rawText;
      if (rawText.trim()) {
        try {
          payload = JSON.parse(rawText);
        } catch {
          payload = rawText;
        }
      }

      const replyText = extractReply(payload) || (typeof payload === "string" ? payload : "");

      if (!response.ok) {
        const message =
          typeof payload === "object" && payload !== null && "error" in (payload as Record<string, unknown>)
            ? String((payload as Record<string, unknown>).error)
            : typeof payload === "string"
              ? payload
              : "AI service error";
        const details =
          typeof payload === "object" && payload !== null && "details" in (payload as Record<string, unknown>)
            ? String((payload as Record<string, unknown>).details ?? "")
            : "";
        throw new Error(details ? `${message}: ${details}` : message);
      }

      if (!replyText) {
        throw new Error("AI service returned no reply text");
      }

      setMessages((prev) => [...prev, { id: `assistant-${Date.now()}`, role: "assistant", text: replyText }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get AI response");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        className={className ?? "bg-[#2366c9] text-white hover:bg-[#1c56aa]"}
      >
        <MessageCircle className="h-4 w-4" />
        AI Support
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex h-[85vh] max-w-5xl flex-col gap-0 overflow-hidden border-0 p-0 sm:rounded-[28px]">
          <DialogHeader className="border-b border-slate-200 bg-white px-6 py-5">
            <DialogTitle className="text-xl font-bold text-slate-900">EduMeUp AI Support</DialogTitle>
            <DialogDescription className="text-sm text-slate-600">
              Chat with AI support for instant help on studies and platform questions.
            </DialogDescription>
          </DialogHeader>

          <div className="flex min-h-0 flex-1 flex-col bg-slate-50">
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                    message.role === "user"
                      ? "ml-auto bg-[#2366c9] text-white rounded-br-md"
                      : "mr-auto border border-slate-200 bg-white text-slate-800 rounded-bl-md"
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

            <form onSubmit={onSubmit} className="border-t border-slate-200 bg-white p-4">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  disabled={isSending}
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#2366c9] focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="submit"
                  disabled={!canSend}
                  className="rounded-xl bg-[#2366c9] px-5 py-3 text-sm font-bold text-white hover:bg-[#1c56aa] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Send
                </button>
              </div>
              {error && <p className="mt-2 text-xs font-medium text-red-600">{error}</p>}
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
