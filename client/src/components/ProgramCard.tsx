import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, ShoppingCart, BookOpen, Clock, CheckCircle2, Award } from "lucide-react";
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
      title: "Course added to cart",
      description: `${program.title} has been added to your shopping cart.`,
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
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-blue-100 bg-white shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2366c9]/40 hover:shadow-2xl">
      {/* Top Banner Header */}
      <CardHeader className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-[#1e1b4b] to-[#2366c9] p-0 text-white">
        {program.imageUrl ? (
          <img
            src={program.imageUrl}
            alt={program.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
        
        {/* Background Decorative Title */}
        {!program.imageUrl && (
          <div className="pointer-events-none absolute -bottom-4 -left-4 select-none text-6xl font-black uppercase text-white/5 tracking-tighter">
            {program.shortName || categoryLabel}
          </div>
        )}

        {/* Category & Badge */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
          <Badge className="border-none bg-[#2366c9] px-3 py-1 text-[11px] font-black uppercase tracking-widest text-white shadow-sm">
            {categoryLabel}
          </Badge>
          <Badge variant="outline" className="border-white/20 bg-white/10 text-[11px] font-semibold text-white backdrop-blur-sm">
            Cambridge Aligned
          </Badge>
        </div>

        {!program.imageUrl && (
          <div className="relative z-10 text-center px-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-md mx-auto mb-2 shadow-inner">
              <BookOpen className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-200">{program.shortName}</p>
          </div>
        )}
      </CardHeader>
      
      {/* Card Content */}
      <CardContent className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl font-black uppercase leading-snug tracking-tight text-slate-900 group-hover:text-[#2366c9] transition-colors">
            {program.title}
          </h3>
        </div>

        <p className="mb-6 text-xs leading-relaxed text-slate-600 line-clamp-3 font-normal">
          {program.shortDescription || "Interactive Cambridge-aligned course with comprehensive study materials, assessments, and progress tracking."}
        </p>
        
        {/* Course Feature Badges / Details Grid */}
        <div className="mt-auto space-y-2 rounded-2xl bg-slate-50 p-4 border border-slate-100 text-xs">
          <div className="flex items-center justify-between text-slate-700">
            <span className="flex items-center gap-1.5 font-medium text-slate-500">
              <Award className="h-3.5 w-3.5 text-[#2366c9]" /> Category:
            </span>
            <span className="font-bold text-slate-900">{categoryLabel}</span>
          </div>
          <div className="flex items-center justify-between text-slate-700">
            <span className="flex items-center gap-1.5 font-medium text-slate-500">
              <Clock className="h-3.5 w-3.5 text-emerald-600" /> Access:
            </span>
            <span className="font-bold text-emerald-700">Self-Paced / Unlimited</span>
          </div>
          <div className="flex items-center justify-between text-slate-700">
            <span className="flex items-center gap-1.5 font-medium text-slate-500">
              <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" /> Activities:
            </span>
            <span className="font-bold text-indigo-700">H5P Interactive</span>
          </div>
        </div>

        {/* Price Tag */}
        <div className="mt-6 flex items-baseline justify-between border-t border-slate-100 pt-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Course Fee</span>
          <span className={canBuy ? "text-2xl font-black text-[#2366c9]" : "text-sm font-bold text-[#2366c9]"}>
            {canBuy ? formatMoneyFromMinorUnits(program.price!) : "Included in Access"}
          </span>
        </div>
      </CardContent>

      {/* Card Footer Actions */}
      <CardFooter className="flex flex-col gap-2.5 p-6 pt-0">
        <div className="grid grid-cols-2 gap-2 w-full">
          <Link href={`/courses/${program.slug}`} className="w-full">
            <Button
              variant="outline"
              className="w-full h-11 rounded-xl font-bold uppercase text-xs tracking-wider border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all flex items-center justify-center gap-1.5"
            >
              Details
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <Button
            type="button"
            onClick={addCourseToCart}
            variant="outline"
            className="w-full h-11 rounded-xl font-bold uppercase text-xs tracking-wider border-blue-200 text-[#2366c9] hover:bg-blue-50 transition-all flex items-center justify-center gap-1.5"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add Cart
          </Button>
        </div>

        <Button
          type="button"
          onClick={buyNow}
          className="w-full h-12 rounded-xl font-black uppercase text-xs tracking-widest bg-[#2366c9] text-white hover:bg-[#1a4fa0] shadow-md shadow-blue-200 transition-all flex items-center justify-center gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          {canBuy ? "Buy Now" : "Open Course"}
        </Button>

        <a href={program.lmsCourseUrl} target="_blank" rel="noreferrer" className="w-full">
          {/* <Button
            variant="ghost"
            className="w-full h-9 rounded-xl font-semibold text-xs text-slate-500 hover:text-[#2366c9] hover:bg-slate-50 transition-all flex items-center justify-center gap-1"
          >
            Direct LMS Access
            <ExternalLink className="h-3 w-3" />
          </Button> */}
        </a>
      </CardFooter>
    </Card>
  );
}
