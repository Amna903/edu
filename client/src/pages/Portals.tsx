import { motion } from "framer-motion";
import { GraduationCap, Users, School, ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";

const portalCards = [
  {
    title: "Student Portal",
    description: "Track mastery progress, assignments, and upcoming practice targets.",
    href: "/dashboard",
    icon: GraduationCap,
  },
  {
    title: "Parent Portal",
    description: "View real-time performance insights and support your child effectively.",
    href: "/dashboard",
    icon: Users,
  },
  {
    title: "Teacher Portal",
    description: "Monitor learners, identify weak topics, and optimize interventions.",
    href: "/dashboard",
    icon: GraduationCap,
  },
  {
    title: "School Portal",
    description: "Get cohort analytics, school-level reporting, and implementation support.",
    href: "/dashboard",
    icon: School,
  },
];

export default function Portals() {
  return (
    <Layout>
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container-custom max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mx-auto max-w-3xl text-center"
          >
           
            <h1 className="text-4xl font-semibold text-slate-900 md:text-6xl">Portals Hub</h1>
            <p className="mt-5 text-base text-slate-700 md:text-lg">
              Choose your dashboard to access learning progress, insights, and support.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {portalCards.map((card) => (
              <a key={card.href} href={card.href}>
                <div className="group rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md">
                  <card.icon className="h-6 w-6 text-[#2366c9]" />
                  <h2 className="mt-3 text-xl font-semibold text-slate-900">{card.title}</h2>
                  <p className="mt-2 text-sm text-slate-700">{card.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#2366c9]">
                    Open Portal
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
