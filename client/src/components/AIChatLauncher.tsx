import { useState } from "react";
import { MessageCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthUser } from "@/hooks/use-auth";

const CHATBOT_WEBHOOK_URL =
  "https://n8n.edumeup.com/webhook/f0a0ac6f-f667-404a-9b13-74d11dd68632";

function buildChatbotUrl(studentId?: number | null) {
  const url = new URL(CHATBOT_WEBHOOK_URL);
  url.searchParams.set("student_id", studentId ? String(studentId) : "");
  return url.toString();
}

type AIChatLauncherProps = {
  className?: string;
};

export function AIChatLauncher({ className }: AIChatLauncherProps) {
  const [open, setOpen] = useState(false);
  const { data: user } = useAuthUser();

  if (!user || user.role !== "student") {
    return null;
  }

  const chatbotUrl = buildChatbotUrl(user?.id);

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
            <DialogDescription className="pr-10 text-sm leading-6 text-slate-600">
              {`Connected with student ID ${user.id} for personalised help.`}
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-6 py-3">
            <p className="text-xs font-medium text-slate-500">
              If the embedded view does not load, open the chatbot in a new tab.
            </p>
            <Button asChild className="bg-[#2366c9] text-white hover:bg-[#1c56aa]">
              <a href={chatbotUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="h-4 w-4" />
                Open in new tab
              </a>
            </Button>
          </div>

          <iframe
            title="EduMeUp AI Support"
            src={chatbotUrl}
            className="min-h-0 flex-1 bg-white"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
