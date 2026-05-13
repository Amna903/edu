import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft, RefreshCw, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

function getEmail() {
  const params = new URLSearchParams(window.location.search);
  return params.get("email") || "your email address";
}

export default function VerifyPending() {
  const [, navigate] = useLocation();
  const email = getEmail();

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-surface px-6 py-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl rounded-[2.5rem] border border-neutral-border bg-white p-12 shadow-2xl text-center"
      >
        <div className="mx-auto w-20 h-20 bg-brand-primary/10 rounded-3xl flex items-center justify-center mb-8 relative">
          <Mail className="h-10 w-10 text-brand-primary" />
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-2 -right-2 bg-status-success rounded-full p-1 border-4 border-white"
          >
            <CheckCircle2 className="h-4 w-4 text-white" />
          </motion.div>
        </div>
        
        <h1 className="text-4xl font-bold text-neutral-text tracking-tight mb-4">Check Your Email</h1>
        <p className="text-lg text-neutral-muted leading-relaxed mb-8">
          We have sent a verification link to <br/>
          <span className="font-bold text-neutral-text text-xl">{email}</span>.
        </p>
        
        <div className="bg-neutral-surface rounded-2xl p-6 mb-10 text-sm font-medium text-neutral-muted border border-neutral-border">
          Click the link in the email to activate your account. <br/>
          <span className="text-status-warning font-bold">Note: The link expires in 24 hours.</span>
        </div>
        
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
          Didn't receive the email? Check your <span className="font-bold">Spam</span> folder.
        </p>
      </motion.div>
    </div>
  );
}
