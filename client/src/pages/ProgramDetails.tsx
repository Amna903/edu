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
import { useAuthUser } from "@/hooks/use-auth";

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
  const { data: user } = useAuthUser();

  if (isLoading) {
    return (
      <Layout>
        <div className="container-custom py-24 md:py-36 flex flex-col items-center justify-center min-h-[50vh]">
          <div className="app-loader-mark mb-4">E</div>
          <p className="font-bold text-sm text-slate-800 tracking-tight animate-pulse">Loading Course Details…</p>
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
  const isSchoolUser = user?.role === "school";

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
      description: isSchoolUser
        ? `${program.title} has been added to your license cart.`
        : `${program.title} has been added to your cart.`,
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
      {/* Hero Banner Header */}
      <div className="relative overflow-hidden bg-slate-900 text-white py-16 md:py-24">
        {program.imageUrl ? (
          <div className="absolute inset-0">
            <img
              src={program.imageUrl}
              alt={program.title}
              className="h-full w-full object-cover opacity-45 transition-opacity"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/30" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(35,102,201,0.35)_0%,transparent_60%)] bg-gradient-to-br from-slate-950 via-[#1e1b4b] to-[#2366c9]" />
        )}

        <div className="container-custom relative z-10">
          <Link href="/courses" className="inline-flex items-center text-blue-200 hover:text-white mb-6 md:mb-8 transition-all font-bold uppercase tracking-widest text-xs group">
            <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Courses Catalog
          </Link>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-[#2366c9] text-white border-none text-xs font-black uppercase tracking-widest px-3.5 py-1">
                {(program.categoryName || program.category).replace(/_/g, " ")}
              </Badge>
              <Badge variant="outline" className="border-white/20 bg-white/10 text-white text-xs font-semibold backdrop-blur-md px-3 py-1">
                Code: {program.shortName}
              </Badge>
              <Badge variant="outline" className="border-emerald-400/40 bg-emerald-500/20 text-emerald-300 text-xs font-bold backdrop-blur-md px-3 py-1">
                Cambridge Aligned
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-black uppercase leading-tight tracking-tight">
              {program.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="container-custom py-12 md:py-20">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
          <div className="lg:col-span-2 space-y-12">
            
            {/* Description */}
            <section className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2366c9]">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
                  Course <span className="text-[#2366c9]">Overview</span>
                </h2>
              </div>
              
              <p className="text-base md:text-lg text-slate-600 font-normal leading-relaxed border-l-4 border-[#2366c9] pl-6 py-1">
                {program.fullDescription || "This interactive course provides full syllabus coverage, past paper practice, and step-by-step topic drills inside the connected EduMeUp Moodle LMS."}
              </p>
            </section>

            {/* What You'll Master */}
            <section className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
                What You'll <span className="text-[#2366c9]">Master</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: `Subject: ${program.shortName}`, desc: "Cambridge-aligned curriculum" },
                  { label: `Category: ${(program.categoryName || program.category).replace(/_/g, " ")}`, desc: "Focused learning track" },
                  { label: `Format: ${program.format || "Self-paced online"}`, desc: "Flexible 24/7 student portal access" },
                  { label: program.visible ? "Status: Active Moodle Course" : "Status: Upcoming Release", desc: "Interactive H5P activities included" },
                ].map((feature, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 group transition-all"
                  >
                    <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                      <ShieldCheck className="h-5 w-5 text-[#2366c9]" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-sm">{feature.label}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Section */}
          <div className="space-y-8">
            {/* Enrollment & Pricing Card (Moved to Bottom Sidebar) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-blue-100 w-full shadow-xl relative overflow-hidden group text-slate-900"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Enrollment Fee</span>
                {canBuy && (
                  <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] uppercase px-2.5 py-0.5 font-bold">
                    Scholarship Available
                  </Badge>
                )}
              </div>

              <div className="text-3xl sm:text-4xl font-black mb-1 text-[#2366c9] tracking-tight leading-none">
                {program.price ? formatMoneyFromMinorUnits(program.price) : "Free Access"}
              </div>
              <p className="text-slate-400 font-semibold text-xs mb-6">Full Lifetime Course Access</p>

              <div className="space-y-3">
                <Button
                  size="lg"
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full bg-[#2366c9] hover:bg-[#1a4fa0] text-white font-black h-14 rounded-2xl text-sm uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {canBuy ? (isSchoolUser ? "Purchase Licenses" : "Buy Now & Checkout") : "Open Course"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddToCart}
                  className="w-full h-12 rounded-2xl font-bold uppercase tracking-wider border-blue-200 text-[#2366c9] hover:bg-blue-50 transition-colors text-xs"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {canBuy ? (isSchoolUser ? "Add to License Cart" : "Add To Cart") : "Open In LMS"}
                </Button>

                <InquiryDialog 
                  defaultType="enrollment"
                  title={`Enroll in ${program.title}`}
                  trigger={
                    <Button size="lg" variant="ghost" className="w-full text-slate-500 hover:text-[#2366c9] hover:bg-blue-50/60 font-semibold h-11 rounded-2xl text-xs uppercase tracking-wider">
                      Ask About This Course
                    </Button>
                  }
                />
              </div>
            </motion.div>
            <div className="bg-gradient-to-br from-slate-900 via-[#1e1b4b] to-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-xl text-white space-y-6">
              <h3 className="font-black text-xl uppercase tracking-wider text-white">Vital Course Details</h3>
              <ul className="space-y-6">
                <li className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/80 font-bold uppercase text-[10px] tracking-wider">Start Date</p>
                    <p className="font-bold text-sm uppercase text-white">{formatCourseDate(program.startDate, "Immediate Access")}</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/80 font-bold uppercase text-[10px] tracking-wider">Access Period</p>
                    <p className="font-bold text-sm uppercase text-white">{program.endDate ? `Until ${formatCourseDate(program.endDate, "Ongoing")}` : "Unlimited / Self-Paced"}</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/80 font-bold uppercase text-[10px] tracking-wider">Platform</p>
                    <p className="font-bold text-sm uppercase text-white">Connected Moodle LMS</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#2366c9] to-blue-700 p-8 rounded-[2.5rem] shadow-xl text-white space-y-4 relative overflow-hidden">
              <Zap className="absolute -top-8 -right-8 h-36 w-36 text-white opacity-10" />
              <h3 className="font-black text-xl uppercase tracking-tight text-white">Need Assistance?</h3>
              <p className="text-white font-medium text-xs leading-relaxed">
                Connect with our academic team to discuss syllabus mapping or bulk school licenses.
              </p>
              <div className="space-y-2.5 pt-2">
                <a href={program.lmsCourseUrl} target="_blank" rel="noreferrer" className="block">
                  <Button className="w-full bg-white text-[#2366c9] hover:bg-slate-50 font-bold h-12 rounded-xl text-xs uppercase tracking-wider shadow-md">
                    Open Course In LMS
                  </Button>
                </a>
                <InquiryDialog 
                  defaultType="contact"
                  title="Academic Consultation"
                  trigger={
                    <Button className="w-full bg-slate-950 hover:bg-black text-white font-bold h-12 rounded-xl text-xs uppercase tracking-wider shadow-md">
                      Talk to Counselor
                    </Button>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
