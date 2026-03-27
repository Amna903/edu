import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type CTAButton = {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "outline";
  trigger?: React.ReactNode;
};

type CTACard = {
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref?: string;
  buttonVariant?: "primary" | "outline";
  buttonTrigger?: React.ReactNode;
};

type PageCTAProps = {
  heading: string;
  description?: string;
  subtitle?: string;
  buttons?: CTAButton[];
  cards?: CTACard[];
  footer?: string;
};

export function PageCTA({ heading, description, subtitle, buttons = [], cards = [], footer }: PageCTAProps) {
  return (
    <section className="py-20 md:py-32 bg-[#2366c9] text-white relative overflow-hidden">
      <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />

      <div className="container-custom text-center relative z-10">
        <div className="flex justify-center w-full mb-6">
          <h2 className="text-4xl md:text-6xl text-white font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4">
            {heading}
          </h2>
        </div>

        {description && (
          <p className="text-base text-blue-200 mb-4 max-w-3xl mx-auto">{description}</p>
        )}

        {subtitle && (
          <p className="text-[14px] font-semibold text-blue-300 mb-12 uppercase tracking-wider">{subtitle}</p>
        )}

        {buttons.length > 0 && (
          <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-6 max-w-5xl mx-auto mb-16">
            {buttons.map((btn, i) =>
              btn.trigger ? (
                <span key={i}>{btn.trigger}</span>
              ) : btn.href ? (
                <a key={i} href={btn.href} className="w-full md:w-auto">
                  <Button
                    size="lg"
                    className={
                      btn.variant === "outline"
                        ? "w-full md:w-auto min-w-[260px] border border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2"
                        : "w-full md:w-auto min-w-[260px] bg-white text-[#2366c9] hover:bg-blue-50 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2"
                    }
                  >
                    {btn.label} <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              ) : (
                <Button
                  key={i}
                  size="lg"
                  onClick={btn.onClick}
                  className={
                    btn.variant === "outline"
                      ? "w-full md:w-auto min-w-[260px] border border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2"
                      : "w-full md:w-auto min-w-[260px] bg-white text-[#2366c9] hover:bg-blue-50 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2"
                  }
                >
                  {btn.label} <ArrowRight className="h-4 w-4" />
                </Button>
              )
            )}
          </div>
        )}

        {cards.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {cards.map((card, i) => (
              <Card key={i} className="border-2 bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-white mb-4 leading-tight">{card.title}</h3>
                  <p className="text-[14px] text-blue-100 mb-6 leading-relaxed">{card.description}</p>
                  {card.buttonTrigger ? (
                    card.buttonTrigger
                  ) : (
                    <a href={card.buttonHref} className="w-full block">
                      <Button
                        size="lg"
                        className={
                          card.buttonVariant === "outline"
                            ? "w-full bg-white text-slate-900 hover:bg-blue-50 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2"
                            : "w-full bg-[#2366c9] hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2"
                        }
                      >
                        {card.buttonLabel} <ArrowRight className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {footer && (
          <p className="mt-12 text-xs text-blue-200 text-center">{footer}</p>
        )}
      </div>
    </section>
  );
}
