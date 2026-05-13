import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useVerifyPayment } from "@/hooks/use-payments";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

function useSearchParams() {
  return new URLSearchParams(window.location.search);
}

export default function PaymentSuccess() {
  const [, navigate] = useLocation();
  const verifyPayment = useVerifyPayment();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [message, setMessage] = useState("Verifying your payment...");
  const [orderRef, setOrderRef] = useState<string | null>(null);

  useEffect(() => {
    const search = useSearchParams();
    const orderRef = search.get("order_id");
    const tracker = search.get("tracker") || undefined;
    setOrderRef(orderRef);

    if (!orderRef) {
      setStatus("error");
      setMessage("Payment reference missing.");
      return;
    }

    verifyPayment
      .mutateAsync({ orderRef, tracker })
      .then(() => {
        setStatus("success");
        setMessage("Payment verified successfully.");
      })
      .catch((error) => {
        setStatus("error");
        setMessage(error.message || "Payment verification failed.");
      });
  }, []);

  return (
    <Layout>
      <div className="container-custom py-24 text-center max-w-xl">
        <div className="flex justify-center mb-6">
          {status === "verifying" && <Loader2 className="h-16 w-16 text-brand-primary animate-spin" />}
          {status === "success" && <CheckCircle2 className="h-16 w-16 text-emerald-500" />}
          {status === "error" && <XCircle className="h-16 w-16 text-rose-500" />}
        </div>
        <h1 className="text-4xl font-bold text-brand-navy tracking-tight">Payment Status</h1>
        <p className="mt-6 text-lg text-slate-600 leading-relaxed">{message}</p>
        
        {orderRef && (
          <p className="mt-4 text-sm font-mono text-slate-400">Reference: {orderRef}</p>
        )}

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <Button
            className="bg-brand-primary text-white hover:bg-brand-navy px-8 py-6 h-auto text-base font-semibold transition-all shadow-lg shadow-brand-primary/20"
            onClick={() => navigate("/dashboard")}
          >
            Go To Dashboard
          </Button>
          <Button 
            variant="outline" 
            className="px-8 py-6 h-auto text-base font-semibold border-slate-200 hover:bg-slate-50 transition-all"
            onClick={() => navigate("/courses")}
          >
            Browse Courses
          </Button>
        </div>
      </div>
    </Layout>
  );
}

