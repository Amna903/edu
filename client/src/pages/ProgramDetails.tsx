import { Layout } from "@/components/Layout";
import { useProgram } from "@/hooks/use-programs";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, ChevronLeft, Calendar, Clock, Award, ShieldCheck, Zap, BookOpen } from "lucide-react";
import { InquiryDialog } from "@/components/InquiryDialog";
import { motion } from "framer-motion";

export default function ProgramDetails() {
  const [, params] = useRoute("/programs/:slug");
  const slug = params?.slug || "";
  const { data: program, isLoading } = useProgram(slug);

  if (isLoading) {
    return (
      <Layout>
        <div className="container-custom py-32">
          <Skeleton className="h-12 w-1/3 mb-12 rounded-full bg-blue-50" />
          <Skeleton className="h-[600px] w-full rounded-[4rem] bg-blue-50" />
        </div>
      </Layout>
    );
  }

  if (!program) {
    return (
      <Layout>
        <div className="container-custom py-40 text-center">
          <h1 className="text-5xl font-semibold text-[#1e1b4b] mb-12 uppercase tracking-tighter leading-none">Program Not Found</h1>
          <p className="mb-8 text-blue-600 font-medium uppercase tracking-widest">The requested program "{slug}" could not be located.</p>
          <Link href="/programs">
            <Button className="bg-[#2366c9] hover:bg-blue-700 h-20 px-16 rounded-3xl text-xl font-semibold uppercase tracking-widest">Back to Programs</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <div className="bg-[#1e1b4b] text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.2)_0%,transparent_50%)]"></div>
        <div className="container-custom relative z-10">
          <Link href="/programs" className="inline-flex items-center text-blue-400 hover:text-white mb-12 transition-all font-semibold uppercase tracking-widest text-xs group">
            <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-2 transition-transform" /> Back to Programs
          </Link>
          <div className="flex flex-col lg:flex-row gap-16 justify-between items-end">
            <div className="flex-1">
              <span className="inline-block px-6 py-2 bg-[#2366c9] text-white rounded-full text-xs font-semibold tracking-[0.3em] uppercase mb-10 shadow-xl shadow-[#2366c9]/20">
                {program.category.replace(/_/g, " ")}
              </span>
              <h1 className="text-[67px] text-white md:text-8xl font-semibold font-display mb-8 uppercase leading-[0.85] tracking-tighter">{program.title}</h1>
              <p className="text-2xl text-blue-100 font-medium max-w-3xl leading-relaxed">{program.shortDescription}</p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-12 rounded-[4rem] border-[10px] border-blue-900/50 min-w-[380px] shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 bg-[#2366c9] text-white font-semibold text-[14px] px-8 py-3 rounded-bl-3xl uppercase tracking-widest">Pricing</div>
              <div className="text-5xl font-medium mb-2 text-[#1e1b4b] tracking-tighter leading-none">
                {program.price ? `$${(program.price / 100).toFixed(2)}` : "Enquire"}
              </div>
              <div className="text-blue-400 font-semibold uppercase text-xs tracking-widest mb-10">per academic term</div>
              <InquiryDialog 
                defaultType="enrollment"
                title={`Enroll in ${program.title}`}
                trigger={
                  <Button size="lg" className="w-full bg-[#2366c9] hover:bg-blue-700 text-white font-semibold h-24 rounded-3xl text-xl uppercase tracking-widest shadow-2xl active:scale-95 transition-all border-b-8 border-blue-800">
                    ENROLL NOW 
                  </Button>
                }
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-32">
        <div className="grid lg:grid-cols-3 gap-24">
          <div className="lg:col-span-2 space-y-24">
            
            {/* Description */}
            <section>
              <h2 className="text-5xl font-semibold mb-10 text-[#1e1b4b] uppercase tracking-tighter leading-none">Program <span className="text-[#2366c9]">Overview</span></h2>
              <p className="text-2xl text-[#1e1b4b]/70 font-medium leading-relaxed border-l-8 border-blue-100 pl-10">
                {program.fullDescription}
              </p>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-5xl font-semibold mb-12 text-[#1e1b4b] uppercase tracking-tighter leading-none">What You'll <span className="text-[#2366c9]">Master</span></h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {program.features?.map((feature, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-6 bg-blue-50/50 p-8 rounded-[2.5rem] border-4 border-blue-50 group hover:border-[#2366c9] transition-all shadow-sm"
                  >
                    <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <ShieldCheck className="h-6 w-6 text-[#2366c9]" />
                    </div>
                    <span className="text-[#1e1b4b] font-semibold uppercase text-[14px] tracking-widest leading-tight">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            <div className="bg-[#1e1b4b] p-12 rounded-[4rem] border-[10px] border-blue-900 shadow-2xl text-white relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#2366c9]/5 pointer-events-none"></div>
              <h3 className="font-semibold text-2xl mb-10 uppercase tracking-widest text-blue-400">Vital Stats</h3>
              <ul className="space-y-10">
                <li className="flex items-center gap-6 group/item">
                  <div className="h-14 w-14 bg-[#1e1b4b] rounded-2xl flex items-center justify-center border-2 border-blue-800 shadow-xl group-hover/item:scale-110 transition-transform">
                    <Calendar className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-blue-400 font-semibold uppercase text-[14px] tracking-widest">Next Intake</p>
                    <p className="font-semibold text-lg uppercase tracking-tight">September 2024</p>
                  </div>
                </li>
                <li className="flex items-center gap-6 group/item">
                  <div className="h-14 w-14 bg-[#1e1b4b] rounded-2xl flex items-center justify-center border-2 border-blue-800 shadow-xl group-hover/item:scale-110 transition-transform">
                    <Clock className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-blue-400 font-semibold uppercase text-[14px] tracking-widest">Duration</p>
                    <p className="font-semibold text-lg uppercase tracking-tight">6-Month Intensive</p>
                  </div>
                </li>
                <li className="flex items-center gap-6 group/item">
                  <div className="h-14 w-14 bg-[#1e1b4b] rounded-2xl flex items-center justify-center border-2 border-blue-800 shadow-xl group-hover/item:scale-110 transition-transform">
                    <Award className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-blue-400 font-semibold uppercase text-[14px] tracking-widest">Certification</p>
                    <p className="font-semibold text-lg uppercase tracking-tight">Mastery Document</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-[#2366c9] p-12 rounded-[4rem] border-4 border-blue-500 shadow-2xl text-white relative overflow-hidden group">
              <Zap className="absolute -top-10 -right-10 h-40 w-40 text-white opacity-10 group-hover:scale-125 transition-transform duration-1000" />
              <h3 className="font-semibold text-2xl mb-4 uppercase tracking-tighter">Need Help?</h3>
              <p className="text-blue-100 mb-10 font-medium leading-relaxed">Talk to our lead academic counselors about mapping your personalized success route.</p>
              <InquiryDialog 
                defaultType="contact"
                title="Academic Consultation"
                trigger={
                  <Button className="w-full bg-[#1e1b4b] hover:bg-black font-semibold h-20 rounded-2xl text-[14px] uppercase tracking-widest shadow-2xl active:scale-95 transition-all border-b-4 border-blue-900">
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
