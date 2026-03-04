import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { InquiryDialog } from "@/components/InquiryDialog";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <Layout>
      <section className="pt-24 pb-32 bg-[#1e1b4b] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.2)_0%,transparent_50%)]"></div>
        <div className="container-custom relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-8 font-display uppercase tracking-tight leading-none text-white"
          >
            CONTACT <span className="text-blue-400">US</span>
          </motion.h1>
          <p className="text-2xl text-blue-100 font-bold mb-10  max-w-2xl mx-auto uppercase tracking-wide">We're here to help you navigate your journey.</p>
        </div>
      </section>

      <div className="container-custom py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24">
            <div className="space-y-12">
              {[
                { icon: Phone, title: "Phone", val: "+92 300 1234567", sub: "Mon-Fri from 9am to 6pm" },
                { icon: Mail, title: "Email", val: "info@edumeup.com", sub: "We reply within 24 hours" },
                { icon: MapPin, title: "Office", val: "123 Education Lane, Block 5, Learning City, Pakistan", sub: "Headquarters" }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-8 group"
                >
                  <div className="bg-blue-100 p-6 rounded-3xl text-[#2366c9] group-hover:bg-[#2366c9] group-hover:text-white transition-all shadow-xl shadow-blue-900/5 group-hover:scale-110">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-black text-2xl mb-2 text-[#1e1b4b] uppercase tracking-tight">{item.title}</h3>
                    <p className="text-xl text-[#1e1b4b] font-black mb-1">{item.val}</p>
                    <p className="text-blue-400 font-black uppercase text-xs tracking-widest">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-blue-50 p-16 rounded-[4rem] border-4 border-blue-100 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2366c9]/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <h2 className="text-4xl font-black mb-8 text-[#1e1b4b] uppercase tracking-tighter leading-none">Send us a <span className="text-[#2366c9]">message</span></h2>
              <p className="mb-12 text-[#1e1b4b]/60 font-bold text-lg leading-relaxed">
                Whether you're a parent, student, or school administrator, fill out our quick form and our academic team will reach out.
              </p>
              <InquiryDialog 
                trigger={
                  <Button className="w-full bg-[#1e1b4b] hover:bg-[#2366c9] text-white font-black h-24 rounded-3xl text-xl uppercase tracking-widest shadow-2xl active:scale-95 transition-all border-b-8 border-blue-800">
                    Open Contact Form 
                  </Button>
                }
              />
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
