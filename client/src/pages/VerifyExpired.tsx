import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function VerifyExpired() {
  const [, navigate] = useLocation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-10 font-[Arial]">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-[#1E3A5F]">Verification link expired</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          This verification link has expired. Click below to request a new one.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button className="bg-[#17A589] text-white hover:bg-[#139577]">Resend verification email</Button>
          <Button variant="outline" onClick={() => navigate("/login")}>
            Back to login
          </Button>
        </div>
      </div>
    </div>
  );
}
