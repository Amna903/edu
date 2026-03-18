import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { Program } from "@shared/schema";

interface ProgramCardProps {
  program: Program;
}

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Card className="border-[#2366c9]  border-2 h-full flex flex-col border-4 border-white shadow-2xl hover:border-[#2366c9] transition-all group rounded-[3rem] bg-white overflow-hidden">
      <CardHeader className="p-0 relative overflow-hidden h-48 bg-blue-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1)_0%,transparent_70%)]"></div>
        <div className="text-4xl font-black text-[#1e1b4b]/10 uppercase tracking-tighter rotate-[-5deg] select-none group-hover:scale-110 transition-transform duration-500">
          {program.category.replace(/_/g, " ")}
        </div>
        <Badge className="absolute top-6 left-6 bg-[#2366c9] text-white border-none px-4 py-1 font-black uppercase text-[14px] tracking-widest">
          {program.category.replace(/_/g, " ")}
        </Badge>
      </CardHeader>
      
      <CardContent className="p-10 flex-1 flex flex-col">
        <h3 className="text-2xl font-black text-[#1e1b4b] mb-4 uppercase leading-none tracking-tight group-hover:text-[#2366c9] transition-colors">
          {program.title}
        </h3>
        <p className="text-[14px] text-[#1e1b4b]/60 font-medium leading-relaxed mb-8 flex-1">
          {program.shortDescription}
        </p>
        
        <div className="space-y-3 mb-8">
          {program.features?.slice(0, 3).map((feature, i) => (
            <div key={i} className="flex items-center gap-3 text-[14px] font-black uppercase tracking-widest text-[#2366c9]">
              <CheckCircle2 className="h-3 w-3" />
              {feature}
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-10 pt-0">
        <Link href={`/programs/${program.slug}`} className="w-full">
          <Button className="w-full bg-blue-50 hover:bg-[#2366c9] text-[#2366c9] hover:text-white h-16 rounded-2xl font-black uppercase tracking-widest transition-all group/btn flex items-center justify-center gap-2">
            View Details
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
