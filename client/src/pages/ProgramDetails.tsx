import { Layout } from "@/components/Layout";
import { useProgram } from "@/hooks/use-programs";
import { useRoute, Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, ChevronLeft, Calendar, Clock, Award, ShieldCheck, Zap, BookOpen, ShoppingCart } from "lucide-react";
import { InquiryDialog } from "@/components/InquiryDialog";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { formatMoneyFromMinorUnits } from "@/lib/currency";

function formatCourseDate(value: string | null, fallback: string) {
  if (!value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function ProgramDetails() {
  const [matchesPrograms, programParams] = useRoute("/programs/:slug");
  const [, courseParams] = useRoute("/courses/:slug");
  const [, navigate] = useLocation();
  const slug = (matchesPrograms ? programParams?.slug : courseParams?.slug) || "";
  const { data: program, isLoading, error } = useProgram(slug);
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (isLoading) {
    return (
      <Layout>
        <div className="container-custom py-16 md:py-32">
          <Skeleton className="h-12 w-1/3 mb-12 rounded-full bg-slate-50" />
          <Skeleton className="h-[600px] w-full rounded-[4rem] bg-slate-50" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container-custom py-20 md:py-40 text-center">
          <h1 className="text-5xl font-bold text-brand-navy mb-6 uppercase tracking-tighter leading-none">Could Not Load Course</h1>
          <p className="mb-8 text-brand-primary font-medium uppercase tracking-widest">
            We could not load the live Moodle course data right now.
          </p>
          <p className="mb-10 text-slate-600">{error instanceof Error ? error.message : "Please try again in a moment."}</p>
          <Link href="/courses">
            <Button className="bg-brand-primary hover:bg-brand-navy h-20 px-16 rounded-3xl text-xl font-bold uppercase tracking-widest">Back to Courses</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  if (!program) {
    return (
      <Layout>
        <div className="container-custom py-20 md:py-40 text-center">
          <h1 className="text-5xl font-bold text-brand-navy mb-12 uppercase tracking-tighter leading-none">Program Not Found</h1>
          <p className="mb-8 text-brand-primary font-medium uppercase tracking-widest">The requested program "{slug}" could not be located.</p>
          <Link href="/programs">
            <Button className="bg-brand-primary hover:bg-brand-navy h-20 px-16 rounded-3xl text-xl font-bold uppercase tracking-widest">Back to Programs</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const canBuy = typeof program.price === "number" && program.price > 0;

  const handleAddToCart = () => {
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

  const handleBuyNow = () => {
    if (!canBuy) {
      window.open(program.lmsCourseUrl, "_blank", "noopener,noreferrer");
      return;
    }

    handleAddToCart();
    navigate("/cart");
  };

  return (
    <Layout>
      {/* Header */}
      <div className="bg-brand-primary text-white py-16 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
        <div className="container-custom relative z-10">
          <Link href="/courses" className="inline-flex items-center text-white/70 hover:text-white mb-8 md:mb-12 transition-all font-bold uppercase tracking-widest text-xs group">
            <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-2 transition-transform" /> Back to Courses
          </Link>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-between items-start lg:items-end">
            <div className="flex-1">
              <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-[10px] font-bold tracking-[0.3em] uppercase mb-6 md:mb-10 border border-white/20">
                {(program.categoryName || program.category).replace(/_/g, " ")}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-white font-bold mb-6 md:mb-8 uppercase leading-[0.9] tracking-tighter">{program.title}</h1>
              <p className="text-lg sm:text-xl md:text-2xl text-blue-50 font-medium max-w-3xl leading-relaxed">{program.shortDescription}</p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 sm:p-10 md:p-12 rounded-[2rem] sm:rounded-[4rem] border-[10px] border-brand-navy/10 w-full lg:min-w-[380px] lg:w-auto shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 bg-brand-primary text-white font-bold text-base px-8 py-3 rounded-bl-3xl uppercase tracking-widest">Pricing</div>
              <div className="text-4xl sm:text-5xl font-bold mb-2 text-brand-navy tracking-tighter leading-none flex flex-wrap items-center gap-3">
                {program.price ? formatMoneyFromMinorUnits(program.price) : "Enquire"}
                {canBuy && (
                  <Badge className="bg-[#eaf2ff] text-brand-primary border-none text-[10px] uppercase px-3 py-1 font-bold">Scholarship available</Badge>
                )}
              </div>
              <div className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-6 md:mb-10">per academic term</div>
              <div className="space-y-3">
                <Button
                  size="lg"
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full bg-brand-primary hover:bg-brand-navy text-white font-bold h-16 md:h-24 rounded-3xl text-lg md:text-xl uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                >
                  {canBuy ? "Buy & Checkout" : "Open Course"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddToCart}
                  className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest border-slate-200 text-brand-navy hover:bg-slate-50 transition-colors"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {canBuy ? "Add To Cart" : "Open In LMS"}
                </Button>
                <InquiryDialog 
                  defaultType="enrollment"
                  title={`Enroll in ${program.title}`}
                  trigger={
                    <Button size="lg" variant="ghost" className="w-full text-slate-500 hover:text-brand-primary hover:bg-[#f8fbff] font-bold h-14 rounded-2xl uppercase tracking-widest">
                      Ask About This Course
                    </Button>
                  }
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12 md:py-32">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-24">
          <div className="lg:col-span-2 space-y-12 lg:space-y-24">
            
            {/* Description */}
            <section>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-10 text-brand-navy uppercase tracking-tighter leading-none">Program <span className="text-brand-primary">Overview</span></h2>
              <p className="text-lg sm:text-xl md:text-2xl text-slate-600 font-medium leading-relaxed border-l-4 sm:border-l-8 border-[#eaf2ff] pl-6 sm:pl-10">
                {program.fullDescription}
              </p>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-brand-navy uppercase tracking-tighter leading-none">What You'll <span className="text-brand-primary">Master</span></h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  program.shortName,
                  program.categoryName || program.category,
                  program.format || "online course",
                  program.visible ? "live in connected LMS" : "hidden course",
                ].map((feature, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-6 bg-[#f8fbff] p-8 rounded-[2.5rem] border border-slate-100 group hover:border-brand-primary transition-all shadow-sm"
                  >
                    <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <ShieldCheck className="h-6 w-6 text-brand-primary" />
                    </div>
                    <span className="text-brand-navy font-bold uppercase text-sm tracking-widest leading-tight">{feature.replace(/_/g, " ")}</span>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            <div className="bg-brand-navy p-6 sm:p-10 md:p-12 rounded-[2rem] sm:rounded-[4rem] border-[10px] border-white/5 shadow-2xl text-white relative overflow-hidden group">
              <div className="absolute inset-0 bg-brand-primary/5 pointer-events-none"></div>
              <h3 className="font-bold text-2xl mb-6 md:mb-10 uppercase tracking-widest text-brand-primary">Vital Stats</h3>
              <ul className="space-y-6 md:space-y-10">
                <li className="flex items-center gap-6 group/item">
                  <div className="h-14 w-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-xl group-hover/item:scale-110 transition-transform">
                    <Calendar className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-white/40 font-bold uppercase text-[10px] tracking-widest">Next Intake</p>
                    <p className="font-bold text-lg uppercase tracking-tight">{formatCourseDate(program.startDate, "Self-paced")}</p>
                  </div>
                </li>
                <li className="flex items-center gap-6 group/item">
                  <div className="h-14 w-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-xl group-hover/item:scale-110 transition-transform">
                    <Clock className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-white/40 font-bold uppercase text-[10px] tracking-widest">Duration</p>
                    <p className="font-bold text-lg uppercase tracking-tight">{program.endDate ? `Until ${formatCourseDate(program.endDate, "Ongoing")}` : "Ongoing access"}</p>
                  </div>
                </li>
                <li className="flex items-center gap-6 group/item">
                  <div className="h-14 w-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-xl group-hover/item:scale-110 transition-transform">
                    <Award className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-white/40 font-bold uppercase text-[10px] tracking-widest">Delivery</p>
                    <p className="font-bold text-lg uppercase tracking-tight">Connected Moodle LMS</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-brand-primary p-6 sm:p-10 md:p-12 rounded-[2rem] sm:rounded-[4rem] border-4 border-white/10 shadow-2xl text-white relative overflow-hidden group">
              <Zap className="absolute -top-10 -right-10 h-40 w-40 text-white opacity-10 group-hover:scale-125 transition-transform duration-1000" />
              <h3 className="font-bold text-2xl mb-4 uppercase tracking-tighter">Need Help?</h3>
              <p className="text-blue-50 mb-10 font-medium leading-relaxed">Talk to our lead academic counselors about mapping your personalized success route.</p>
              <a href={program.lmsCourseUrl} target="_blank" rel="noreferrer" className="block mb-4">
                <Button className="w-full bg-white text-brand-primary hover:bg-slate-50 font-bold h-16 rounded-2xl text-base uppercase tracking-widest shadow-xl">
                  Open Course In LMS
                </Button>
              </a>
              <Button
                type="button"
                onClick={handleBuyNow}
                className="mb-4 w-full bg-emerald-500 text-white hover:bg-emerald-600 font-bold h-16 rounded-2xl text-base uppercase tracking-widest shadow-xl"
              >
                Proceed To Payment
              </Button>
              <InquiryDialog 
                defaultType="contact"
                title="Academic Consultation"
                trigger={
                  <Button className="w-full bg-brand-navy hover:bg-black font-bold h-20 rounded-2xl text-base uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                    TALK TO EXPERT 
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
