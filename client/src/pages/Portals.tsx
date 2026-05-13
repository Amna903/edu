import { motion } from "framer-motion";
import { GraduationCap, Users, School, ArrowRight, Briefcase } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Link } from "wouter";

const portalCards = [
  {
    title: "Student Portal",
    description: "Track mastery progress, assignments, and upcoming practice targets.",
    href: "/for-students",
    icon: GraduationCap,
  },
  {
    title: "Parent Portal",
    description: "View real-time performance insights and support your child effectively.",
    href: "/for-parents",
    icon: Users,
  },
  {
    title: "Teacher Portal",
    description: "Monitor learners, identify weak topics, and optimize interventions.",
    href: "/for-teachers",
    icon: Briefcase,
  },
  {
    title: "School Portal",
    description: "Get cohort analytics, school-level reporting, and implementation support.",
    href: "/for-schools",
    icon: School,
  },
];

export default function Portals() {
  return (
    <Layout>
      <section className="bg-white py-16 md:py-28 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#f8fbff] to-transparent"></div>
        <div className="absolute top-20 right-[10%] w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl"></div>
        
        <div className="container-custom max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary mb-4">Unified Ecosystem</p>
            <h1 className="text-4xl font-bold text-brand-navy md:text-6xl tracking-tight">Portals Hub</h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Choose your dashboard to access learning progress, insights, and specialized support tailored for your role.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {portalCards.map((card, index) => (
              <Link key={card.href} href={card.href}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative cursor-pointer overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/5"
                >
                  <div className="flex items-start justify-between">
                    <div className="rounded-2xl bg-[#f8fbff] p-4 transition-colors group-hover:bg-brand-primary group-hover:text-white">
                      <card.icon className="h-7 w-7 text-brand-primary group-hover:text-white" />
                    </div>
                    <div className="p-2 opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                      <ArrowRight className="h-6 w-6 text-brand-primary" />
                    </div>
                  </div>
                  
                  <h2 className="mt-8 text-2xl font-bold text-brand-navy">{card.title}</h2>
                  <p className="mt-3 text-slate-600 leading-relaxed">{card.description}</p>
                  
                  <div className="mt-8 flex items-center gap-2 text-sm font-bold text-brand-primary group-hover:gap-3 transition-all">
                    <span>Open Portal</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  
                  {/* Decorative Gradient Bar */}
                  <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-brand-primary transition-all duration-500 group-hover:w-full"></div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

