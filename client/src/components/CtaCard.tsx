import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface CtaCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  meta: string;
  buttonText: string;
  buttonHref?: string;
  onClick?: (e: any) => void;
  actionWrapper?: (button: ReactNode) => ReactNode;
}

export function CtaCard({ 
  icon, 
  title, 
  subtitle, 
  meta, 
  buttonText, 
  buttonHref, 
  onClick, 
  actionWrapper 
}: CtaCardProps) {
  
  const renderButton = () => (
    <Button 
      onClick={onClick}
      className="w-full bg-white hover:bg-slate-50 text-[#2366c9] h-14 text-[14px] font-bold tracking-wide uppercase rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-0.5"
    >
      {buttonText}
    </Button>
  );

  const buttonContent = actionWrapper ? actionWrapper(renderButton()) : (
    buttonHref ? (
      buttonHref.startsWith('#') ? (
        <a href={buttonHref} onClick={onClick as any} className="w-full block">
          {renderButton()}
        </a>
      ) : (
        <Link href={buttonHref} className="w-full block">
          {renderButton()}
        </Link>
      )
    ) : (
      renderButton()
    )
  );

  return (
    <div className="bg-[#2366c9] rounded-[2rem] p-8 md:p-10 flex flex-col items-center text-center shadow-xl border border-blue-500/30 flex-1 max-w-[500px] w-full mx-auto">
      <div className="w-16 h-16 rounded-[1.25rem] bg-[#3b7add] flex items-center justify-center text-white mb-6 shadow-sm">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-[15px] text-blue-100 font-medium mb-6 leading-relaxed">
        {subtitle}
      </p>
      <p className="text-[11px] text-blue-200 font-black tracking-widest uppercase mb-8">
        {meta}
      </p>
      <div className="mt-auto w-full">
        {buttonContent}
      </div>
    </div>
  );
}
