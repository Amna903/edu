import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 font-[Arial]">
      <Card className="w-full max-w-md mx-auto text-center shadow-sm border-slate-200">
        <CardContent className="pt-12 pb-12">
          <div className="mb-6 flex justify-center">
            <AlertCircle className="h-16 w-16 text-brand-primary opacity-80" />
          </div>
          
          <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">404</h1>
          <h2 className="text-2xl font-semibold text-brand-navy mb-2">Page Not Found</h2>
          <p className="text-slate-500 mb-8 max-w-xs mx-auto leading-relaxed">
            The page you are looking for doesn't exist or has been moved.
          </p>

          <Link href="/">
            <Button className="w-full sm:w-auto bg-brand-primary hover:bg-brand-navy text-white transition-colors">
              Return Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

