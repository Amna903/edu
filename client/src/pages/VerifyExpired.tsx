import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function VerifyExpired() {
  const [, navigate] = useLocation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-surface px-6 py-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl rounded-[2.5rem] border border-neutral-border bg-white p-12 shadow-2xl text-center"
      >
        <div className="mx-auto w-20 h-20 bg-status-danger-soft/10 rounded-3xl flex items-center justify-center mb-8">
          <AlertTriangle className="h-10 w-10 text-status-danger" />
        </div>
        
        <h1 className="text-4xl font-bold text-neutral-text tracking-tight mb-4">Verification Link Expired</h1>
        <p className="text-lg text-neutral-muted leading-relaxed mb-10">
          This verification link has expired for security reasons. Click below to request a new one and continue your journey.
        </p>
        
        <div className="flex flex-col gap-4">
          <Button className="h-14 rounded-2xl bg-brand-primary text-white font-bold text-lg hover:bg-brand-primary-dark shadow-xl transition-all hover:scale-105 active:scale-95">
            <RefreshCw className="mr-2 h-5 w-5" />
            Resend Verification Email
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/login")}
            className="h-14 rounded-2xl text-neutral-muted font-bold text-lg hover:bg-neutral-surface transition-all"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Login
          </Button>
        </div>
        
        <p className="mt-12 text-sm text-neutral-muted font-medium border-t border-neutral-border pt-8">
          Need help? Contact <span className="text-brand-primary font-bold">support@edumeup.com</span>
        </p>
      </motion.div>
    </div>
  );
}
