import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useVerifyPayment } from "@/hooks/use-payments";

function useSearchParams() {
  return new URLSearchParams(window.location.search);
}

export default function PaymentSuccess() {
  const [, navigate] = useLocation();
  const verifyPayment = useVerifyPayment();
  const [message, setMessage] = useState("Verifying your payment...");
  const [orderRef, setOrderRef] = useState<string | null>(null);

  useEffect(() => {
    const search = useSearchParams();
    const orderRef = search.get("order_id");
    const tracker = search.get("tracker") || undefined;
    setOrderRef(orderRef);

    if (!orderRef) {
      setMessage("Payment reference missing.");
      return;
    }

    verifyPayment
      .mutateAsync({ orderRef, tracker })
      .then(() => {
        setMessage("Payment verified successfully.");
      })
      .catch((error) => {
        setMessage(error.message || "Payment verification failed.");
      });
  }, []);

  return (
    <Layout>
      <div className="container-custom py-20 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">Payment Status</h1>
        <p className="mt-4 text-slate-600">{message}</p>
        <div className="mt-8 flex justify-center gap-4">
          <Button
            className="bg-[#2366c9] text-white hover:bg-blue-700"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Go To Dashboard
          </Button>
          <Button variant="outline" onClick={() => navigate("/courses")}>
            Browse Courses
          </Button>
        </div>
      </div>
    </Layout>
  );
}
