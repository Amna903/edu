import { Navigation, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InquiryDialog } from "@/components/InquiryDialog";

export interface SidebarLink {
  label: string;
  href: string;
}

interface PageSidebarProps {
  title: string;
  quote: string;
  links: SidebarLink[];
}

export function PageSidebar({ title, quote, links }: PageSidebarProps) {
  return (
    <aside className="hidden xl:flex flex-col w-[320px] h-[calc(100vh-64px)] sticky top-[64px] bg-white border-r border-blue-50 z-40 shrink-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="p-8 flex flex-col h-full">
        <div className="mb-10">
          <div className="w-full rounded-2xl bg-[#1e3a5f] p-5 text-center shadow-md">
            <p className="text-white text-[15px] font-bold mb-4 tracking-wide">Start here - it is free</p>
            <InquiryDialog 
              defaultType="diagnostic" 
              title="Free Diagnostic" 
              trigger={
                <button className="w-full bg-white hover:bg-slate-50 text-[#1e3a5f] font-semibold py-3 px-4 rounded-xl transition-all text-[14px]">
                  Take Free Diagnostic -{">"}
                </button>
              }
            />
          </div>
        </div>

        <nav className="space-y-2">
          {links.map((link, i) => (
            <a 
              key={i} 
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(link.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-blue-50 text-slate-600 hover:text-blue-600"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#2366c9] group-hover:scale-150 transition-all"></div>
              <span className="text-[14px] font-bold leading-tight">{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-blue-50 pb-8">
          <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
            <p className="text-slate-600 text-[13px] font-medium leading-relaxed italic">
              "{quote}"
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
