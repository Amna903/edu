import { useEffect, useState } from "react";
import { ShieldCheck, KeyRound, UserCheck, BookOpen, Clock, RefreshCw, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ActivityItem {
  id: string;
  type: "security" | "learning" | "account";
  title: string;
  details?: string | null;
  timestamp: string;
}

export function UserAccountActivityPanel() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/profile/activity");
      if (!res.ok) {
        throw new Error("Failed to load activity logs");
      }
      const data = await res.json();
      setActivities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const getIcon = (type: string, title: string) => {
    if (title.includes("Login")) {
      return <ShieldCheck className="h-4 w-4 text-emerald-600" />;
    }
    if (title.includes("Password")) {
      return <KeyRound className="h-4 w-4 text-amber-600" />;
    }
    if (title.includes("Profile")) {
      return <UserCheck className="h-4 w-4 text-blue-600" />;
    }
    return <BookOpen className="h-4 w-4 text-indigo-600" />;
  };

  const getBadgeStyle = (type: string, title: string) => {
    if (title.includes("Failed")) return "bg-red-50 text-red-700 border-red-200";
    if (type === "security") return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (type === "account") return "bg-blue-50 text-blue-700 border-blue-200";
    return "bg-indigo-50 text-indigo-700 border-indigo-200";
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(d);
    } catch {
      return isoString;
    }
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-slate-900">Recent Account Activity</CardTitle>
            <p className="text-xs text-slate-500">Security events, profile updates, and system activity logs</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchActivities}
          disabled={loading}
          className="gap-2 text-xs text-slate-600 border-slate-200"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="pt-6">
        {loading ? (
          <div className="flex items-center justify-center py-8 text-slate-400 text-sm gap-2">
            <RefreshCw className="h-4 w-4 animate-spin text-brand-primary" />
            Loading account activity logs...
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 text-red-600 py-4 text-sm">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        ) : activities.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-sm">
            No recent account activity recorded yet.
          </div>
        ) : (
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {activities.map((item) => (
              <div key={item.id} className="relative flex items-start gap-4 group">
                <div className="absolute -left-6 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white ring-4 ring-white shadow-sm border border-slate-200">
                  {getIcon(item.type, item.title)}
                </div>
                <div className="flex-1 rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-sm transition-all hover:bg-slate-50 hover:border-slate-200">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-semibold text-slate-900">{item.title}</span>
                    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${getBadgeStyle(item.type, item.title)}`}>
                      {item.type}
                    </span>
                  </div>
                  {item.details && (
                    <p className="mt-1 text-xs text-slate-600 font-mono">{item.details}</p>
                  )}
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="h-3 w-3" />
                    <span>{formatDate(item.timestamp)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
