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
    <aside
      className="hidden xl:flex flex-col w-[230px] flex-shrink-0 sticky top-[64px] h-[calc(100vh-64px)] bg-white z-40 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] border-r border-slate-200 p-5 px-3.5"
    >
      <div className="flex flex-col h-full">
        <div className="mb-10">
          <div className="w-full rounded-2xl bg-brand-primary p-3 text-center shadow-md">
            <p className="text-white text-[13px] font-bold mb-2 tracking-wide">Start here - it is free</p>
            <InquiryDialog
              defaultType="diagnostic"
              title="Free Diagnostic"
              trigger={
                <button className="w-full bg-white hover:bg-slate-50 text-brand-navy font-semibold py-2 px-3 rounded-md transition-all text-[12px]">
                  Take Free Diagnostic -{">"}
                </button>
              }
            />
          </div>
        </div>
        <div className="pb-2">
              <nav className="space-y-2">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(link.href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-blue-50 text-slate-600 hover:text-brand-primary"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary group-hover:scale-150 transition-all" />
              <span className="text-[14px] font-bold leading-tight">{link.label}</span>
            </a>
          ))}
        </nav>
        </div>
              
      </div>
    </aside>
  );
}
