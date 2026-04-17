import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "wouter";
import type { LmsCourse } from "@shared/schema";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { formatMoneyFromMinorUnits } from "@/lib/currency";

interface ProgramCardProps {
  program: LmsCourse;
}

export function ProgramCard({ program }: ProgramCardProps) {
  const [, navigate] = useLocation();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const categoryLabel = (program.categoryName || program.category).replace(/_/g, " ");
  const canBuy = typeof program.price === "number" && program.price > 0;

  const addCourseToCart = () => {
    if (!canBuy) {
      window.open(program.lmsCourseUrl, "_blank", "noopener,noreferrer");
      return;
    }

    addToCart({
      programId: program.id,
      title: program.title,
      price: program.price || 0,
    });

    toast({
      title: "Course added",
      description: `${program.title} has been added to your cart.`,
    });
  };

  const buyNow = () => {
    if (!canBuy) {
      window.open(program.lmsCourseUrl, "_blank", "noopener,noreferrer");
      return;
    }

    addCourseToCart();
    navigate("/cart");
  };

  return (
    <Card className="border-[#2366c9]  border-2 h-full flex flex-col border-4 border-white shadow-2xl hover:border-[#2366c9] transition-all group rounded-[3rem] bg-white overflow-hidden">
      <CardHeader className="p-0 relative overflow-hidden h-48 bg-blue-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1)_0%,transparent_70%)]"></div>
        <div className="text-4xl font-black text-[#1e1b4b]/10 uppercase tracking-tighter rotate-[-5deg] select-none group-hover:scale-110 transition-transform duration-500">
          {categoryLabel}
        </div>
        <Badge className="absolute top-6 left-6 bg-[#2366c9] text-white border-none px-4 py-1 font-black uppercase text-[14px] tracking-widest">
          {categoryLabel}
        </Badge>
      </CardHeader>
      
      <CardContent className="p-10 flex-1 flex flex-col">
        <h3 className="text-2xl font-black text-[#1e1b4b] mb-4 uppercase leading-none tracking-tight group-hover:text-[#2366c9] transition-colors">
          {program.title}
        </h3>
        <p className="text-[14px] text-[#1e1b4b]/60 font-medium leading-relaxed mb-8 flex-1">
          {program.shortDescription}
        </p>
        
        <div className="space-y-3 mb-8 text-[14px] font-black uppercase tracking-widest text-[#2366c9]">
          <div>{program.shortName}</div>
          {program.format && <div>{program.format}</div>}
          {program.price ? <div>{formatMoneyFromMinorUnits(program.price)}</div> : <div>Open in LMS</div>}
        </div>
      </CardContent>

      <CardFooter className="p-10 pt-0 flex flex-col gap-4">
        <Link href={`/courses/${program.slug}`} className="w-full">
          <Button className="w-full bg-blue-50 hover:bg-[#2366c9] text-[#2366c9] hover:text-white h-16 rounded-2xl font-black uppercase tracking-widest transition-all group/btn flex items-center justify-center gap-2">
            View Details
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
        <Button
          type="button"
          onClick={buyNow}
          className="w-full h-14 rounded-2xl font-black uppercase tracking-widest bg-[#2366c9] text-white hover:bg-blue-700"
        >
          <ShoppingCart className="h-4 w-4" />
          {canBuy ? "Buy Now" : "Open Course"}
        </Button>
        <a href={program.lmsCourseUrl} target="_blank" rel="noreferrer" className="w-full">
          <Button variant="outline" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest border-blue-200 text-[#2366c9]">
            Open LMS
            <ExternalLink className="h-4 w-4" />
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
