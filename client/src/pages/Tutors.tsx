import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, UserCheck, ShieldCheck, Trophy, Target, CheckCircle2, Zap, ArrowRight, MousePointer2, Users, Cpu, Microscope } from "lucide-react";
import { InquiryDialog } from "@/components/InquiryDialog";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { useState } from "react";
import { Disclosure } from "@headlessui/react";

export function StudentApplicationForm() {
  const [formData, setFormData] = useState({
    studentName: "",
    dateOfBirth: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    emergencyContact: "",
    school: "",
    currentGrade: "",
    country: "",
    timezone: "",
    curriculum: "",
    primarySubject: "",
    subjects: [] as string[],
    mode: "",
    sessionDuration: "",
    budgetRange: "",
    average: "",
    struggle: "",
    previousTutorExp: "",
    learningNeeds: "",
    availability: "",
    timeSlot: "",
    sessionsPerWeek: "",
    learningGoals: "",
    tutorPreference: "",
    heardFrom: "",
    tutorRequest: "",
    parentConsent: false,
  });

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.subjects.length === 0) {
      alert("Please select at least one subject.");
      return;
    }
    console.log("Student Application:", formData);
    alert("Application submitted! Diagnostic link will be sent within 24 hrs.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-h-[80vh] overflow-y-auto pr-4 custom-scrollbar">
      {/* PART 1 — STUDENT INFORMATION */}
      <section className="border border-neutral-border rounded-2xl p-8 space-y-6 bg-neutral-surface">
        <h3 className="font-bold text-xl text-neutral-text border-b border-neutral-border pb-4">Part 1 — Student Information</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-neutral-muted uppercase tracking-wider">Student Full Name</label>
            <input type="text" className="w-full border border-neutral-border rounded-xl p-3 focus:ring-2 focus:ring-brand-primary outline-none bg-white transition-all" placeholder="Enter student's full name" value={formData.studentName} onChange={(e) => handleChange("studentName", e.target.value)} required />
          </div>

          <div className="space-y-2">
            <label htmlFor="student-dob" className="block text-sm font-bold text-neutral-muted uppercase tracking-wider">Date of Birth</label>
            <input id="student-dob" type="date" className="w-full border border-neutral-border rounded-xl p-3 focus:ring-2 focus:ring-brand-primary outline-none bg-white transition-all" value={formData.dateOfBirth} onChange={(e) => handleChange("dateOfBirth", e.target.value)} required />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-neutral-muted uppercase tracking-wider">Parent/Guardian Name</label>
            <input type="text" className="w-full border border-neutral-border rounded-xl p-3 focus:ring-2 focus:ring-brand-primary outline-none bg-white transition-all" placeholder="Enter parent or guardian's name" value={formData.parentName} onChange={(e) => handleChange("parentName", e.target.value)} required />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-neutral-muted uppercase tracking-wider">Parent Email</label>
            <input type="email" className="w-full border border-neutral-border rounded-xl p-3 focus:ring-2 focus:ring-brand-primary outline-none bg-white transition-all" placeholder="Enter parent's email" value={formData.parentEmail} onChange={(e) => handleChange("parentEmail", e.target.value)} required />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-neutral-muted uppercase tracking-wider">Parent Phone</label>
            <input type="tel" className="w-full border border-neutral-border rounded-xl p-3 focus:ring-2 focus:ring-brand-primary outline-none bg-white transition-all" placeholder="Enter phone number" value={formData.parentPhone} onChange={(e) => handleChange("parentPhone", e.target.value)} required />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-neutral-muted uppercase tracking-wider">Emergency Contact</label>
            <input type="tel" className="w-full border border-neutral-border rounded-xl p-3 focus:ring-2 focus:ring-brand-primary outline-none bg-white transition-all" placeholder="Emergency phone" value={formData.emergencyContact} onChange={(e) => handleChange("emergencyContact", e.target.value)} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="currentGrade" className="block text-sm font-bold text-neutral-muted uppercase tracking-wider">Student Class / Grade</label>
            <select id="currentGrade" className="w-full border border-neutral-border rounded-xl p-3 focus:ring-2 focus:ring-brand-primary outline-none bg-white transition-all" value={formData.currentGrade} onChange={(e) => handleChange("currentGrade", e.target.value)} required>
              <option value="">Select grade</option>
              <option>Grade 4</option>
              <option>Grade 5</option>
              <option>Grade 6</option>
              <option>Grade 7</option>
              <option>Grade 8</option>
              <option>Pre-O-Level</option>
              <option>O1</option>
              <option>O2</option>
              <option>A-Level</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-neutral-muted uppercase tracking-wider">School Name</label>
            <input type="text" className="w-full border border-neutral-border rounded-xl p-3 focus:ring-2 focus:ring-brand-primary outline-none bg-white transition-all" placeholder="Enter school name" value={formData.school} onChange={(e) => handleChange("school", e.target.value)} />
          </div>
        </div>
      </section>

      {/* PART 2 — SUBJECTS */}
      <section className="border border-neutral-border rounded-2xl p-8 space-y-6 bg-white shadow-sm">
        <h3 className="font-bold text-xl text-neutral-text border-b border-neutral-border pb-4">Part 2 — Subjects Needed</h3>
        <div className="space-y-4">
          <label htmlFor="primarySubject" className="block text-sm font-bold text-neutral-muted uppercase tracking-wider">Primary Subject</label>
          <select id="primarySubject" className="w-full border border-neutral-border rounded-xl p-3 focus:ring-2 focus:ring-brand-primary outline-none bg-white transition-all" value={formData.primarySubject} onChange={(e) => handleChange("primarySubject", e.target.value)} required>
            <option value="">Select primary subject</option>
            {["Mathematics", "Physics", "Chemistry", "Biology", "English Language", "Economics", "Business Studies", "Pakistan Studies", "Computer Science"].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-neutral-surface rounded-xl border border-neutral-border">
          {["Mathematics", "Physics", "Chemistry", "Biology", "English Language", "Economics", "Business Studies", "Pakistan Studies", "Computer Science"].map((subject) => (
            <label key={subject} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-5 h-5 rounded border-neutral-border text-brand-primary focus:ring-brand-primary transition-all" onChange={(e) => {
                if (e.target.checked) setFormData({ ...formData, subjects: [...formData.subjects, subject] });
                else setFormData({ ...formData, subjects: formData.subjects.filter(s => s !== subject) });
              }} />
              <span className="text-sm font-bold text-neutral-muted group-hover:text-brand-primary transition-colors">{subject}</span>
            </label>
          ))}
        </div>
      </section>

      {/* BUTTON */}
      <div className="flex justify-center pt-8">
        <Button type="submit" className="h-16 px-12 rounded-[1.5rem] bg-brand-primary text-white font-bold text-xl hover:bg-brand-primary-dark shadow-2xl transition-all transform hover:scale-105 w-full">
          Submit Student Application
        </Button>
      </div>
    </form>
  );
}

export function TutorApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    educationQualification: "",
    degree: "",
    degreeField: "",
    certifications: "",
    yearsExperience: "",
    hourlyRate: "",
    subjects: [] as string[],
    grades: [] as string[],
    teachingLevel: "",
    teachingMode: "",
    languages: [] as string[],
    availability: "",
    timezone: "",
    referenceName: "",
    referenceEmail: "",
    referencePhone: "",
    digitalSkills: {
      zoom: 1,
      googleMeet: 1,
      googleClassroom: 1,
      whiteboard: 1,
      moodle: 1,
      screenRecording: 1,
    },
    uploads: {
      cv: null as File | null,
      degreeCertificate: null as File | null,
      demoLesson: null as File | null,
    },
    agreements: {
      smkTest: false,
      digitalQuiz: false,
      orientation: false,
      independence: false,
      codeOfConduct: false,
    },
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (category: 'digitalSkills' | 'uploads' | 'agreements', field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting tutor application", formData);
    alert("Application submitted! We will review it in 48 hrs.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-h-[80vh] overflow-y-auto px-2 custom-scrollbar">
      {/* PERSONAL INFO */}
      <section className="p-8 border border-neutral-border rounded-[2rem] bg-white shadow-sm space-y-6">
        <h3 className="font-bold text-xl text-brand-primary border-b border-neutral-border pb-4 uppercase tracking-widest">Part 1 — Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-muted uppercase tracking-wider">Full Name</label>
            <input type="text" className="w-full border border-neutral-border rounded-xl p-3 focus:ring-2 focus:ring-brand-primary outline-none" value={formData.fullName} onChange={e => handleChange("fullName", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-muted uppercase tracking-wider">Email</label>
            <input type="email" className="w-full border border-neutral-border rounded-xl p-3 focus:ring-2 focus:ring-brand-primary outline-none" value={formData.email} onChange={e => handleChange("email", e.target.value)} required />
          </div>
        </div>
      </section>

      <button type="submit" className="w-full bg-brand-primary text-white font-bold px-10 py-5 rounded-[1.5rem] shadow-xl hover:bg-brand-primary-dark transition-all transform hover:scale-[1.02] active:scale-95 text-xl">
        Submit Tutor Application
      </button>
    </form>
  );
}

export default function Tutors() {
  const faqs = [
    { q: "Can I use platform without tutor?", a: "Yes. If your foundation is strong and you are self-motivated, platform-only learning is fully effective." },
    { q: "How long is tutoring needed?", a: "Most students need 3–6 months. Tutors are phased out once independence develops." },
    { q: "Any hidden costs?", a: "No. Pricing is transparent. Platform access is included free with tutoring." },
    { q: "Can I switch tutors?", a: "Yes. Free tutor replacement is available anytime if needed." },
    { q: "Is platform included free?", a: "Yes. Platform worth $360–$720/year is included with tutoring." },
    { q: "Do tutors follow school syllabus?", a: "Yes. Tutors align with school syllabus while strengthening foundational gaps." },
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <Layout>
      {/* HERO */}
      <section className="bg-brand-primary py-24 md:py-40 text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.4)_0%,transparent_60%)]"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-sky opacity-10 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-sky mb-8 border border-white/20">
              Transformative Academic Support
            </span>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-[0.95] tracking-tighter">
              SCAFFOLDING <br/><span className="text-brand-sky">FOR INDEPENDENCE</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-12 font-medium leading-relaxed">
              SMK-Aligned Tutors + Research-Backed Platform. <br/>
              The goal isn't more tutoring—it's gaining the power to learn without it.
            </p>
            
            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto bg-white/5 p-12 md:p-20 rounded-[4rem] border-4 border-white/10 backdrop-blur-md text-left items-center shadow-3xl">
              <div>
                <h3 className="text-3xl font-bold mb-8 text-brand-sky tracking-tight">The EduMeUp Difference</h3>
                <div className="space-y-5">
                  {[
                    "Strategic Scaffolding toward Independence",
                    "Platform-First Integration",
                    "SMK-Certified Subject Experts",
                    "Transparent Mastery Dashboards",
                    "Structured Phase-Out Strategy"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-5 text-lg font-bold text-white/90 border-b border-white/5 pb-3">
                       <CheckCircle2 className="h-6 w-6 text-brand-sky flex-shrink-0" />
                       <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-10">
                <div className="bg-brand-primary-dark/40 p-8 rounded-3xl border-2 border-brand-sky/20">
                  <p className="text-brand-sky font-bold text-xs mb-4 uppercase tracking-[0.2em]">Strategic Scenarios:</p>
                  <ul className="space-y-3">
                    <li className="text-white font-bold text-lg flex items-center gap-2"><Target className="h-4 w-4 text-brand-sky"/> Late Starters</li>
                    <li className="text-white font-bold text-lg flex items-center gap-2"><Target className="h-4 w-4 text-brand-sky"/> Advanced Learners</li>
                    <li className="text-white font-bold text-lg flex items-center gap-2"><Target className="h-4 w-4 text-brand-sky"/> Slow Learners</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-5">
                  <InquiryDialog 
                    defaultType="form"
                    title="Student Tutoring Application"
                    description={<StudentApplicationForm />}
                    trigger={
                      <Button size="lg" className="w-full bg-white text-brand-primary hover:bg-brand-sky hover:text-brand-navy h-16 rounded-2xl font-bold text-lg shadow-2xl transition-all transform hover:scale-105">
                        Apply as Student
                      </Button>
                    }
                  />
                  <InquiryDialog 
                    defaultType="form"
                    title="Tutor Application"
                    description={<TutorApplicationForm />}
                    trigger={
                      <Button size="lg" variant="outline" className="w-full border-2 border-white/30 text-white hover:bg-white/10 h-16 rounded-2xl font-bold text-lg transition-all">
                        Become a Certified Tutor
                      </Button>
                    }
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-neutral-surface border-y border-neutral-border">
        <div className="container-custom max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-2">
              <h4 className="text-5xl font-bold text-brand-primary">91%</h4>
              <p className="text-sm font-bold text-neutral-muted uppercase tracking-widest">Cambridge Pass Rate</p>
              <p className="text-xs font-bold text-status-success uppercase mt-1">+160% over national avg</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-5xl font-bold text-brand-primary">47%</h4>
              <p className="text-sm font-bold text-neutral-muted uppercase tracking-widest">A/A* Achievement</p>
              <p className="text-xs font-bold text-status-success uppercase mt-1">+161% over traditional</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-5xl font-bold text-brand-primary">75%+</h4>
              <p className="text-sm font-bold text-neutral-muted uppercase tracking-widest">Knowledge Retention</p>
              <p className="text-xs font-bold text-status-success uppercase mt-1">Spaced retrieval power</p>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-24 md:py-40 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center max-w-4xl mx-auto mb-32">
             <span className="inline-flex items-center rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-primary mb-4">
                Our Model
             </span>
             <h2 className="text-5xl md:text-7xl font-bold mb-8 text-neutral-text leading-[0.9] tracking-tighter">
                SCAFFOLDING, <br/><span className="text-brand-primary">NOT CRUTCHES</span>
             </h2>
             <p className="text-xl text-neutral-muted font-medium italic">Building independent learners, not dependent clients.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 mb-40">
             <Card className="bg-status-danger-soft/10 p-12 md:p-20 rounded-[4rem] border-4 border-status-danger/5 shadow-xl group">
                <CardContent className="p-0">
                  <h3 className="text-3xl font-bold mb-10 text-status-danger tracking-tight">The Traditional Trap</h3>
                  <div className="flex items-center justify-between gap-4 mb-12">
                     <div className="flex-1 bg-white p-5 rounded-2xl shadow-sm text-center font-bold text-xs uppercase text-neutral-muted">Student</div>
                     <ArrowRight className="text-status-danger animate-pulse" />
                     <div className="flex-1 bg-white p-5 rounded-2xl shadow-sm text-center font-bold text-xs uppercase text-neutral-muted">Tutor</div>
                     <ArrowRight className="text-status-danger animate-pulse" />
                     <div className="flex-1 bg-status-danger p-5 rounded-2xl shadow-lg text-center font-bold text-xs uppercase text-white">Dependency</div>
                  </div>
                  <p className="text-lg text-neutral-text font-medium leading-relaxed">
                    Traditional tutoring creates a crutch. Students become helpless without constant guidance. You pay forever. We call this the "Business of Dependency."
                  </p>
                </CardContent>
             </Card>
             <Card className="bg-status-success-soft/10 p-12 md:p-20 rounded-[4rem] border-4 border-status-success/5 shadow-xl group">
                <CardContent className="p-0">
                  <h3 className="text-3xl font-bold mb-10 text-status-success tracking-tight">The Independence Model</h3>
                  <div className="flex items-center justify-between gap-4 mb-12">
                     <div className="flex-1 bg-white p-5 rounded-2xl shadow-sm text-center font-bold text-xs uppercase text-neutral-muted">Platform</div>
                     <ArrowRight className="text-status-success" />
                     <div className="flex-1 bg-white p-5 rounded-2xl shadow-sm text-center font-bold text-xs uppercase text-neutral-muted">Tutor</div>
                     <ArrowRight className="text-status-success" />
                     <div className="flex-1 bg-status-success p-5 rounded-2xl shadow-lg text-center font-bold text-xs uppercase text-white">Mastery</div>
                  </div>
                  <p className="text-lg text-neutral-text font-medium leading-relaxed">
                    Tutoring is TEMPORARY. Our mission is to build self-learning capability and phase out the tutor entirely. Success is when you don't need us anymore.
                  </p>
                </CardContent>
             </Card>
          </div>

          <div className="bg-brand-primary p-16 md:p-32 rounded-[5rem] text-white shadow-3xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
             <div className="grid lg:grid-cols-3 gap-20 relative z-10">
                {[
                  { t: "Platform is PRIMARY", d: "Our 10X Learning Leap Model™ teaches students HOW to master content." },
                  { t: "Tutors are SUPPLEMENTAL", d: "Targeted support for specific gaps, differentiated needs, or accelerated growth." },
                  { t: "Independence is FINAL", d: "A structured phase-out ensures students own their academic destiny." }
                ].map((item, i) => (
                  <div key={i} className="space-y-8">
                    <div className="h-20 w-20 bg-white/10 text-brand-sky rounded-3xl flex items-center justify-center font-bold text-3xl shadow-xl border border-white/10">{i+1}</div>
                    <h4 className="text-3xl font-bold tracking-tight">{item.t}</h4>
                    <p className="text-lg text-blue-100/70 font-medium leading-relaxed">{item.d}</p>
                  </div>
                ))}
             </div>
             <div className="mt-20 pt-10 border-t border-white/10">
               <p className="text-xl font-bold text-brand-sky uppercase tracking-widest mb-10">The 3-Stage Scaffolding Process:</p>
               <div className="grid md:grid-cols-3 gap-10">
                 {[
                   { s: "Intensive", t: "Months 1–3", h: "8–12 hrs/month", r: "Heavy Scaffolding" },
                   { s: "Gradual", t: "Months 4–6", h: "4–6 hrs/month", r: "Student-Led" },
                   { s: "Mastery", t: "Month 7+", h: "0–2 hrs/month", r: "Full Independence" }
                 ].map((item, i) => (
                   <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
                     <h4 className="font-bold text-2xl mb-2">{item.s}</h4>
                     <p className="text-blue-200 font-bold text-sm mb-4">{item.t}</p>
                     <div className="space-y-1 text-sm font-medium text-white/60">
                       <p>Hours: {item.h}</p>
                       <p>Role: {item.r}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 md:py-40 bg-brand-navy text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1)_0%,transparent_70%)]"></div>
        <div className="container-custom relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-bold mb-12 leading-[0.9] tracking-tighter"
          >
            READY FOR <br/><span className="text-brand-primary">INDEPENDENCE?</span>
          </motion.h2>
          <p className="text-xl md:text-2xl text-blue-100/60 mb-20 max-w-3xl mx-auto font-medium">
            Stop the dependency cycle. Apply today for strategic scaffolding that builds real self-learning capabilities.
          </p>
          <div className="flex flex-wrap justify-center gap-10">
            <InquiryDialog 
              defaultType="form"
              title="Student Tutoring Application"
              description={<StudentApplicationForm />}
              trigger={
                <Button size="lg" className="bg-brand-primary hover:bg-brand-primary-dark text-white font-bold h-24 px-16 rounded-[2rem] text-2xl shadow-3xl transform transition-all hover:scale-105 active:scale-95 border-b-[8px] border-brand-primary-dark">
                  Apply as Student
                </Button> 
              }
            />
            <InquiryDialog 
              defaultType="form"
              title="Tutor Application"
              description={<TutorApplicationForm />}
              trigger={
                <Button size="lg" className="bg-white text-brand-navy hover:bg-blue-50 font-bold h-24 px-16 rounded-[2rem] text-2xl shadow-3xl transform transition-all hover:scale-105 active:scale-95 border-b-[8px] border-neutral-border">
                  Apply as Tutor
                </Button> 
              }
            />
          </div>
          <p className="mt-16 text-neutral-muted font-bold text-xs uppercase tracking-[0.5em]">SMK-Certified Network • Powered by AI</p>
        </div>
      </section>
    </Layout>
  );
}
