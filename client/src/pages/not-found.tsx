import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <Card className="border-[#2366c9]  border-2 w-full max-w-md mx-auto text-center shadow-lg border-0">
        <CardContent className="pt-12 pb-12">
          <div className="mb-6 flex justify-center">
            <AlertCircle className="h-16 w-16 text-[#2366c9] opacity-80" />
          </div>
          
          <h1 className="text-5xl font-semibold text-gray-900 mb-4 font-display">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
          <p className="text-gray-500 mb-8 max-w-xs mx-auto">
            The page you are looking for doesn't exist or has been moved.
          </p>

          <Link href="/">
            <Button className="w-full sm:w-auto bg-[#2366c9] hover:bg-blue-700 text-white">
              Return Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
