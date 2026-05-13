import { useEffect, useState } from "react";
import { Link } from "wouter";
import { 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Users, 
  UserCheck,
  Zap, 
  BookOpen, 
  Target, 
  Brain, 
  Clock, 
  Award,
  Search,
  School,
  Layout,
  MessageCircle,
  FileText,
  Cpu,
  GraduationCap,
  MapPin,
  Calendar,
  Rocket,
  LineChart,
  Settings,
  AlertTriangle,
  HelpCircle,
  Handshake,
  Building2,
  Lightbulb,
  BarChart3
} from "lucide-react";
import { motion } from "framer-motion";
import { Layout as MainLayout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { theme, ui } from "@/theme";

const secondaryNavLinks = [
  { label: "Overview", href: "#overview" },
  { label: "School Teachers", href: "#school-teachers" },
  { label: "Independent Teachers", href: "#independent-teachers" },
  { label: "Courses", href: "#courses-strip" },
  { label: "Apply", href: "#cta" },
];

const schoolTeacherCards = [
  {
    title: "Diagnose Your Teaching",
    icon: Search,
    body: "Start with your T1 Teacher Diagnostic — a full subject assessment that reveals exactly where your teaching is strongest and where students are most at risk. Honest, precise, and immediately actionable."
  },
  {
    title: "Earn Your CCTE Certificate",
    icon: Award,
    body: "Complete T2 CTMW Workshop and earn the EduMeUp Certificate of Cambridge Teaching Excellence — a credential you can carry on your CV, LinkedIn profile, and school record. Internationally recognised."
  },
  {
    title: "7 CPD Hours Per Workshop",
    icon: Clock,
    body: "Every T2 workshop delivers 7 formal CPD hours — one of the highest returns per session of any Cambridge teacher training programme available online."
  },
  {
    title: "Become a Mastery-Based Educator",
    icon: Target,
    body: "Train in EduMeUp's 10X Learning Leap Model — the 6-stage mastery cycle (Diagnose → Repair → Master → Verify → Retain → Grow Independent). Apply it immediately in your own classroom."
  },
  {
    title: "Understand How Examiners Think",
    icon: Brain,
    body: "T4 Examiner Intelligence training reveals the exact criteria examiners use to award marks — so you can teach your students to write, structure, and present answers the way Cambridge expects."
  },
  {
    title: "Build Subject Mastery Knowledge",
    icon: BookOpen,
    body: "T3 SMK (Structured Mastery Knowledge) is a self-paced Moodle certification that deepens your subject expertise systematically — with a formal certification at the end."
  }
];

const empoweringTeacherCards = [
  {
    title: "AI Tools for Teaching",
    icon: Cpu,
    body: "T6 AI Tools Subscription gives teachers AI-powered support for lesson planning, student feedback drafting, differentiation suggestions, and assignment marking guidance — saving hours every week."
  },
  {
    title: "Ready-Made Cambridge Resources",
    icon: FileText,
    body: "Access a complete library of past papers, topic workbooks, mind maps, and H5P interactive exercises — all aligned to the latest Cambridge syllabus. Less prep. More teaching."
  },
  {
    title: "See Every Student's Progress",
    icon: LineChart,
    body: "EduMeUp's platform shows you exactly where each student stands — mastery gates, diagnostic scores, and learning gaps. Differentiation becomes data-driven, not guesswork."
  },
  {
    title: "Teach English Through Your Subject",
    icon: Globe,
    body: "The Classroom English Communication course (available in Urdu-speaker and Arabic-speaker versions) helps non-native English teachers deliver lessons confidently in English — building both their fluency and student comprehension."
  },
  {
    title: "Reduce Lesson Prep by 70%",
    icon: Clock,
    body: "Structured curricula, pre-built exercises, and AI-generated content suggestions mean teachers spend far less time preparing and far more time actually teaching and connecting with students."
  },
  {
    title: "Join a Cambridge Teaching Community",
    icon: Users,
    body: "EduMeUp is building a global community of certified Cambridge educators. As a member, you receive early access to new resources, peer support, and professional development updates."
  }
];

const independentTeacherCards = [
  {
    title: "Teach Online — Global Students",
    icon: Globe,
    body: "Once certified, you are matched with EduMeUp-enrolled students worldwide who need personalised online tutoring in Cambridge IGCSE and O-Level subjects. Teach from anywhere. Earn in USD."
  },
  {
    title: "Teach Physically — Major Pakistani Cities",
    icon: MapPin,
    body: "If you are based in Lahore, Karachi, Islamabad, or another major city, EduMeUp connects you with local students who need face-to-face, personalised tutoring sessions — in a structured, professional framework."
  },
  {
    title: "Deliver to Institutes — Online (Global)",
    icon: School,
    body: "Qualified EduMeUp tutors can deliver workshops, CPD sessions, and subject training to partner schools and institutes internationally — all online, all structured, all supported by EduMeUp materials."
  },
  {
    title: "Deliver to Institutes — Physical (Main Cities)",
    icon: Building2,
    body: "Conduct on-site professional development workshops, Cambridge subject training, or exam preparation sessions at schools in your city — with EduMeUp's curriculum and certification supporting every session."
  },
  {
    title: "Curriculum and Resources Provided",
    icon: BookOpen,
    body: "You never need to build your own teaching materials. EduMeUp provides the complete curriculum framework, exercises, past papers, and resources for every subject — so you arrive prepared every time."
  },
  {
    title: "Flexible Hours — You Set Availability",
    icon: Calendar,
    body: "Accept student matches based on your availability. No fixed shifts, no long-term commitments. Teach on your schedule — part-time, full-time, or as a supplement to your existing work."
  }
];

const growProfileCards = [
  {
    title: "Become EduMeUp Certified (T5)",
    icon: Award,
    body: "Complete the T5 Tutor Certification Pathway — a rigorous, structured programme that qualifies you to represent EduMeUp professionally. Certification is your gateway to the full student network."
  },
  {
    title: "First-Mover Advantage",
    icon: Rocket,
    body: "Early certified tutors receive priority placement and first access to incoming student matches. The sooner you certify, the larger your student base. This window will not remain open indefinitely."
  },
  {
    title: "Build a Verified Teaching Profile",
    icon: UserCheck,
    body: "Your EduMeUp tutor profile displays your certifications, subjects, student outcomes, and session history — a living portfolio that grows with every student you teach."
  },
  {
    title: "AI Tools Subscription",
    icon: Cpu,
    body: "T6 AI Tools Subscription provides AI-powered lesson support, content recommendations, and student feedback drafting — reducing your prep time and increasing the quality of every session."
  },
  {
    title: "Student Outcome Data",
    icon: LineChart,
    body: "EduMeUp tracks every student's progress. As their tutor, you see diagnostic scores, mastery completion rates, and improvement over time — giving you measurable proof of your impact."
  },
  {
    title: "Platform Admin — Handled for You",
    icon: Settings,
    body: "Billing, scheduling, session records, and student communications are managed through the EduMeUp platform. You teach. We handle the rest."
  }
];

const aiAdvantageCards = [
  {
    title: "AI Diagnostic Insight",
    icon: Brain,
    description: "Our AI diagnostic engine identifies knowledge gaps before a single lesson is taught — so you go into every session knowing exactly what each student needs."
  },
  {
    title: "Instant Written Feedback",
    icon: MessageCircle,
    description: "Specially trained AI provides immediate feedback on student written responses — saving hours of marking per week while maintaining high feedback quality."
  },
  {
    title: "Smart Content Recommendation",
    icon: Lightbulb,
    description: "The platform recommends the right exercises, resources, and activities for each student's current level — so you never have to manually hunt for differentiated content."
  },
  {
    title: "Lesson Planning Support",
    icon: Calendar,
    description: "T6 AI Tools provide structured lesson planning frameworks, differentiation ideas, and content suggestions aligned to the Cambridge syllabus — reducing prep time by up to 70%."
  },
  {
    title: "Progress Tracking Dashboard",
    icon: BarChart3,
    description: "See every student's mastery progress, diagnostic scores, and time-on-task in one clean dashboard — no spreadsheets, no manual tracking, no guesswork."
  },
  {
    title: "Predictive Risk Alerts",
    icon: AlertTriangle,
    description: "EduMeUp's platform identifies students who are falling behind before it becomes critical — alerting you so you can intervene early and prevent exam failure."
  }
];

const coursePathway = [
  {
    code: "T1",
    name: "Teacher Diagnostic",
    format: "Online — Full subject",
    duration: "Flexible",
    cert: "Diagnostic Report",
    body: "Know exactly where you stand. The T1 diagnostic assesses your full subject knowledge and teaching readiness — the essential first step before any training."
  },
  {
    code: "T2",
    name: "CTMW Workshop",
    format: "Live Online — 1 day",
    duration: "1 day / 7 CPD hrs",
    cert: "CCTE Certificate",
    body: "Cambridge Teaching Mastery Workshop. One intensive day that earns you 7 CPD hours and the EduMeUp Certificate of Cambridge Teaching Excellence (CCTE)."
  },
  {
    code: "T3",
    name: "SMK Certification",
    format: "Moodle self-paced",
    duration: "Self-paced",
    cert: "SMK Certificate",
    body: "Structured Mastery Knowledge. A deep-dive self-paced certification that builds systematic subject expertise — with a formal credential at the end."
  },
  {
    code: "T4",
    name: "Examiner Intelligence",
    format: "Live Online",
    duration: "TBC",
    cert: "Completion Badge",
    body: "Learn how Cambridge examiners think, mark, and award bands. Transform how your students write, structure, and present answers in exams."
  },
  {
    code: "T5",
    name: "Tutor Certification Pathway",
    format: "Blended",
    duration: "Multi-stage",
    cert: "EduMeUp Tutor Cert",
    body: "The full pathway to becoming a certified EduMeUp tutor — qualified to teach enrolled students online globally or in person in major cities."
  },
  {
    code: "T6",
    name: "AI Tools Subscription",
    format: "Platform subscription",
    duration: "Ongoing",
    cert: "N/A",
    body: "AI-powered tools for lesson planning, student feedback, content recommendations, and differentiation support. Available monthly or annually."
  }
];

export default function ForTeachers() {
  const [activeNav, setActiveNav] = useState("overview");

  useEffect(() => {
    document.title = "For Teachers | Train, Certify & Teach with EduMeUp";
    // Meta and OG update
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "EduMeUp offers Cambridge teacher training, CCTE certification, 7 CPD hours, AI teaching tools, and a certified tutor network — for school teachers and independent educators worldwide.");
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", "For Teachers — EduMeUp Cambridge Teaching Platform");
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", "Train. Certify. Teach. EduMeUp gives school and independent teachers a complete professional pathway — from diagnostic to AI-powered Cambridge teaching.");

    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      const sections = secondaryNavLinks.map(link => link.href.substring(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {
          setActiveNav(section);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -60;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <MainLayout>
      {/* S1 — Hero Banner */}
      <section 
        id="overview" 
        className="py-24 px-6 md:px-12 relative overflow-hidden min-h-[320px] md:min-h-[420px] flex items-center"
        style={{ 
          backgroundColor: theme.colors.brand.navy
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-8"
          >
            <div className={ui.pills.brand}>
              The Professional Home for Teachers
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
              Teach Smarter. <br />
              Grow Further. <br />
              <span className={`text-[${theme.colors.brand.primary}]`}>Earn More.</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed font-medium">
              Whether you teach in a school or on your own terms — EduMeUp gives you the training, tools, students, and recognition to reach your full potential as an educator.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <Button 
                onClick={() => scrollTo("courses-strip")}
                className={`w-full sm:w-auto px-8 h-[60px] md:h-[72px] rounded-2xl text-lg font-bold shadow-lg ${ui.buttons.brand}`}
              >
                Explore Training Courses →
              </Button>
              <Button 
                onClick={() => scrollTo("independent-teachers")}
                variant="outline"
                className={`w-full sm:w-auto px-8 h-[60px] md:h-[72px] rounded-2xl text-lg font-bold ${ui.buttons.brandOutline}`}
              >
                Apply to Teach on EduMeUp
              </Button>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button 
                  variant="outline"
                  className={`w-full px-8 h-[60px] md:h-[72px] rounded-2xl text-lg font-bold ${ui.buttons.brandOutline}`}
                >
                  Talk to Us
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-4 md:gap-6 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-blue-200 text-[10px] md:text-sm font-bold uppercase tracking-widest">
                <CheckCircle2 className="w-3 h-3 md:w-4 h-4" /> Capacity Building
              </div>
              <div className="flex items-center gap-2 text-blue-200 text-[10px] md:text-sm font-bold uppercase tracking-widest">
                <CheckCircle2 className="w-3 h-3 md:w-4 h-4" /> Professional Credibility
              </div>
              <div className="flex items-center gap-2 text-blue-200 text-[10px] md:text-sm font-bold uppercase tracking-widest">
                <CheckCircle2 className="w-3 h-3 md:w-4 h-4" /> Global Income Access
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Brand accent line at bottom */}
        <div className={`absolute bottom-0 left-0 w-full h-1.5 bg-[${theme.colors.brand.primary}]`}></div>
      </section>

      {/* Trust Strip Below Hero */}
      <div className={`bg-[${theme.colors.neutral.surfaceAlt}] border-b border-slate-200 h-auto md:h-[60px] flex items-center`}>
        <div className="max-w-7xl mx-auto px-6 py-4 md:py-0 flex flex-wrap justify-center gap-x-8 gap-y-3">
          <div className="flex items-center text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
            <Target className={`w-4 h-4 mr-2 text-[${theme.colors.brand.primary}]`} />
            T1–T6 Training Pathway
          </div>
          <div className="flex items-center text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
            <Award className={`w-4 h-4 mr-2 text-[${theme.colors.brand.primary}]`} />
            CCTE Certificate Issued
          </div>
          <div className="flex items-center text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
            <Clock className={`w-4 h-4 mr-2 text-[${theme.colors.brand.primary}]`} />
            7 CPD Hours per Workshop
          </div>
          <div className="flex items-center text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
            <Globe className={`w-4 h-4 mr-2 text-[${theme.colors.brand.primary}]`} />
            Global Online Tutor Network
          </div>
        </div>
      </div>

      {/* Sticky Secondary Nav */}
      <div 
        className="sticky top-[64px] z-40 border-b border-white/10 shadow-lg"
        style={{ backgroundColor: theme.colors.brand.navy }}
      >
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto scrollbar-hide">
          <div className="flex mx-auto">
            {secondaryNavLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href.substring(1))}
                className={`px-4 md:px-6 py-4 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${
                  activeNav === link.href.substring(1) ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
                {activeNav === link.href.substring(1) && (
                  <motion.div 
                    layoutId="activeNav"
                    className={`absolute bottom-0 left-0 w-full h-1 bg-[${theme.colors.brand.primary}]`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* S2 — Two Pathways Selector */}
        <section className="py-[60px] px-6">
          <div className="grid md:grid-cols-2 gap-0 rounded-[2.5rem] overflow-hidden shadow-2xl">
            {/* School Teachers Card */}
            <div className={`p-10 md:p-12 flex flex-col items-start bg-[${theme.colors.brand.navy}]`}>
              <div className="flex-1 space-y-6 flex flex-col items-start w-full">
                <School className={`w-10 h-10 text-[${theme.colors.brand.primary}]`} />
                <span className={theme.components.label}>SCHOOL & INSTITUTION TEACHERS</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Grow Within Your Role</h2>
                <p className="text-lg text-blue-50 leading-relaxed font-medium">
                  Build your skills, earn your Cambridge Teaching Excellence Certificate, and bring mastery-based learning into your classroom. EduMeUp supports you at every stage — from your first diagnostic to full AI-assisted teaching.
                </p>
              </div>
              <Button 
                onClick={() => scrollTo("school-teachers")}
                className={`mt-8 px-8 h-[64px] rounded-2xl font-bold ${ui.buttons.brand}`}
              >
                Show Me How →
              </Button>
            </div>
            
            {/* Independent Teachers Card */}
            <div className={`p-10 md:p-12 flex flex-col items-start bg-[${theme.colors.brand.primary}]`}>
              <div className="flex-1 space-y-6 flex flex-col items-start w-full">
                <div className="flex gap-3">
                  <Globe className="w-10 h-10 text-white" />
                  <Layout className="w-10 h-10 text-white" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.28em] text-white/80">INDEPENDENT & SELF-EMPLOYED TEACHERS</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Be Your Own Boss — on a Global Platform</h2>
                <p className="text-lg text-white/90 leading-relaxed font-medium">
                  Reach students globally online or in person across major cities. Get certified, get matched with enrolled students, and build a teaching career with flexible hours, structured resources, and a platform that does the admin for you.
                </p>
              </div>
              <Button 
                onClick={() => scrollTo("independent-teachers")}
                className={`mt-8 px-8 h-[64px] rounded-2xl font-bold ${ui.buttons.brandLight}`}
              >
                Show Me Opportunities →
              </Button>
            </div>
          </div>
        </section>

        {/* S3 — For School & Institution Teachers */}
        <section id="school-teachers" className={`py-24 bg-[${theme.colors.neutral.surfaceAlt}] -mx-6 md:-mx-12 lg:-mx-24 px-12 md:px-24 lg:px-48`}>
          <div className="max-w-7xl mx-auto">
            <div className={`border-l-4 border-[${theme.colors.brand.navy}] pl-6 mb-12`}>
              <span className={theme.components.label}>FOR SCHOOL TEACHERS</span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900">Your Path to Professional Excellence</h2>
            </div>

            {/* Sub-Section A — Capacity Building */}
            <div className="mb-20">
              <div className="max-w-3xl mb-12">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Capacity Building</h3>
                <p className={`text-xl font-bold text-[${theme.colors.brand.primary}] mb-4`}>
                  We build the teacher before the teacher builds the student.
                </p>
                <p className="text-lg text-slate-600 font-medium">
                  EduMeUp's structured CPD pathway transforms good teachers into exceptional, Cambridge-aligned educators. Every step is credentialled, every outcome is measurable.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schoolTeacherCards.map((card, idx) => (
                  <Card key={idx} className={`border-t-4 border-t-[${theme.colors.brand.primary}] shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group h-full flex flex-col`}>
                    <CardContent className="p-8 space-y-4 flex-1 flex flex-col">
                      <card.icon className={`w-8 h-8 text-[${theme.colors.brand.primary}]`} />
                      <h4 className={`text-xl font-bold text-slate-900 group-hover:text-[${theme.colors.brand.primary}] transition-colors`}>{card.title}</h4>
                      <p className="text-[14px] text-slate-600 leading-relaxed flex-1">{card.body}</p>
                      <Link href="/teacher-courses" className={`text-sm font-bold text-[${theme.colors.brand.primary}] hover:underline inline-flex items-center gap-1 mt-4`}>
                        View Course <ArrowRight className="w-3 h-3" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sub-Section B — Empowering Teachers */}
            <div className="mb-20">
              <div className="max-w-3xl mb-12">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Empowering Teachers</h3>
                <p className={`text-xl font-bold text-[${theme.colors.brand.primary}] mb-4`}>
                  Save time. Teach better. See results.
                </p>
                <p className="text-lg text-slate-600 font-medium">
                  Beyond training, EduMeUp gives school teachers the tools to make every lesson more effective — without adding hours to their workday.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {empoweringTeacherCards.map((card, idx) => (
                  <Card key={idx} className={`border-t-4 border-t-[${theme.colors.brand.primary}] shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group h-full flex flex-col`}>
                    <CardContent className="p-8 space-y-4 flex-1 flex flex-col">
                      <card.icon className={`w-8 h-8 text-[${theme.colors.brand.primary}]`} />
                      <h4 className={`text-xl font-bold text-slate-900 group-hover:text-[${theme.colors.brand.primary}] transition-colors`}>{card.title}</h4>
                      <p className="text-[14px] text-slate-600 leading-relaxed flex-1">{card.body}</p>
                      <Link href="/teacher-courses" className={`text-sm font-bold text-[${theme.colors.brand.primary}] hover:underline inline-flex items-center gap-1 mt-4`}>
                        View Tool <ArrowRight className="w-3 h-3" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Summary Benefit Table — School Teachers */}
            <div className="mt-16 rounded-[2rem] overflow-hidden border border-slate-200 shadow-lg">
              <Table>
                <TableHeader>
                  <TableRow className={`bg-[${theme.colors.brand.navy}] hover:bg-[${theme.colors.brand.navy}]`}>
                    <TableHead className="text-white font-black uppercase tracking-widest text-[11px] h-14 px-8">You Are Dealing With</TableHead>
                    <TableHead className="text-white font-black uppercase tracking-widest text-[11px] h-14 px-8">EduMeUp Gives You</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    ["No structured CPD pathway", "T1 → T2 → T3 → T4 → T5 → T6 — a complete professional development journey"],
                    ["No formal Cambridge teaching credential", "CCTE — Certificate of Cambridge Teaching Excellence, earned and recognised"],
                    ["Time-consuming lesson preparation", "Ready-made Cambridge-aligned resources, past papers, workbooks, and mind maps"],
                    ["Students who don't retain what they learn", "Mastery-based teaching model with 80% mastery gates and proven retention approach"],
                    ["Limited examiner insight", "T4 Examiner Intelligence — learn exactly how Cambridge marks are awarded"],
                    ["No AI integration in teaching", "T6 AI Tools Subscription — lesson planning, feedback, differentiation — automated"],
                    ["Difficulty teaching in English", "Classroom English Communication course in Urdu-speaker and Arabic-speaker versions"]
                  ].map((row, i) => (
                    <TableRow key={i} className={i % 2 === 0 ? "bg-white" : `bg-[${theme.colors.neutral.surfaceAlt}]`}>
                      <TableCell className="font-bold text-slate-800 px-8 py-4">{row[0]}</TableCell>
                      <TableCell className="text-slate-600 px-8 py-4">{row[1]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-12 flex justify-center">
              <Button 
                onClick={() => scrollTo("courses-strip")}
                className={`px-10 py-6 rounded-2xl text-lg shadow-xl ${ui.buttons.brand}`}
              >
                Explore Teacher Training →
              </Button>
            </div>
          </div>
        </section>

        <section id="independent-teachers" className={`py-24 ${theme.sections.white} -mx-6 md:-mx-12 lg:-mx-24 px-12 md:px-24 lg:px-48`}>
          <div className="max-w-7xl mx-auto">
            <div className={`border-l-4 border-[${theme.colors.brand.primary}] pl-6 mb-12`}>
              <span className={theme.components.label}>FOR INDEPENDENT TEACHERS</span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900">Your Platform. Your Students. Your Income.</h2>
            </div>

            {/* Sub-Section A — Teach & Earn */}
            <div className="mb-20">
              <div className="max-w-3xl mb-12">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Teach & Earn</h3>
                <p className="text-lg text-slate-600 font-medium">
                  Great teachers shouldn't have to hunt for students. We bring the students to you. EduMeUp connects certified teachers with enrolled students — online globally and in person across major cities of Pakistan. You focus on teaching; EduMeUp handles the platform, the matching, and the administration.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {independentTeacherCards.map((card, idx) => (
                  <Card key={idx} className="border-t-4 border-t-[#0b3c5d] shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group">
                    <CardContent className="p-8 space-y-4">
                      <card.icon className={`w-8 h-8 text-[${theme.colors.brand.navy}]`} />
                      <h4 className={`text-xl font-bold text-slate-900 group-hover:text-[${theme.colors.brand.navy}] transition-colors`}>{card.title}</h4>
                      <p className="text-[14px] text-slate-600 leading-relaxed">{card.body}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sub-Section B — Grow & Build Your Professional Profile */}
            <div className="mb-20">
              <div className="max-w-3xl mb-12">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Grow & Build Your Professional Profile</h3>
                <p className="text-lg text-slate-600 font-medium">
                  Teaching on EduMeUp builds more than income. It builds your career. Independent teachers who join EduMeUp do not just teach — they earn credentials, build a visible professional profile, and become part of a global Cambridge teaching network.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {growProfileCards.map((card, idx) => (
                  <Card key={idx} className="border-t-4 border-t-[#0b3c5d] shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group">
                    <CardContent className="p-8 space-y-4">
                      <card.icon className={`w-8 h-8 text-[${theme.colors.brand.navy}]`} />
                      <h4 className={`text-xl font-bold text-slate-900 group-hover:text-[${theme.colors.brand.navy}] transition-colors`}>{card.title}</h4>
                      <p className="text-[14px] text-slate-600 leading-relaxed">{card.body}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Summary Benefit Table — Independent Teachers */}
            <div className="mt-16 rounded-[2rem] overflow-hidden border border-slate-200 shadow-lg">
              <Table>
                <TableHeader>
                  <TableRow className={`bg-[${theme.colors.brand.primary}] hover:bg-[${theme.colors.brand.primaryDark}]`}>
                    <TableHead className="text-white font-black uppercase tracking-widest text-[11px] h-14 px-8">You Are Dealing With</TableHead>
                    <TableHead className="text-white font-black uppercase tracking-widest text-[11px] h-14 px-8">EduMeUp Gives You</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    ["Inconsistent student pipeline", "Matched enrolled students — online globally + physical in major Pakistani cities"],
                    ["No formal teaching credential", "T5 Tutor Certification Pathway + CCTE — internationally recognised credentials"],
                    ["Limited to local geography", "Global online student reach + local physical city-based sessions"],
                    ["Have to build all your own materials", "Full Cambridge-aligned curriculum, exercises, workbooks, and past papers provided"],
                    ["Difficult to market yourself", "EduMeUp profile, verified badges, student outcome data — visible and searchable"],
                    ["Admin takes time away from teaching", "Scheduling, billing, and communications handled by EduMeUp platform"],
                    ["No access to institutional students", "Teach institutes and schools online (global) or physically (main cities) via EduMeUp"]
                  ].map((row, i) => (
                    <TableRow key={i} className={i % 2 === 0 ? "bg-white" : `bg-[${theme.colors.neutral.surfaceAlt}]`}>
                      <TableCell className="font-bold text-slate-800 px-8 py-4">{row[0]}</TableCell>
                      <TableCell className="text-slate-600 px-8 py-4">{row[1]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-12 flex justify-center">
              <Link href="/tutor-application">
                <Button 
                  className={`px-10 py-6 rounded-2xl text-lg shadow-xl ${ui.buttons.brand}`}
                >
                  Apply to Teach on EduMeUp →
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* S5 — Teacher Training Courses Strip (T1–T6) */}
        <section id="courses-strip" className={`py-24 ${theme.sections.navy} -mx-6 md:-mx-12 lg:-mx-24 px-12 md:px-24 lg:px-48`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <span className={theme.components.label.replace(theme.colors.brand.primary, "#60a5fa")}>OUR TRAINING PATHWAY</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">From Diagnostic to AI-Powered Teaching — Six Stages. One Journey.</h2>
              <p className="text-lg text-blue-100 max-w-3xl mx-auto font-medium">
                Every EduMeUp teacher training course is designed to build on the previous one — creating a structured pathway from assessment to mastery to certification.
              </p>
            </div>

            <div className="flex overflow-x-auto pb-12 gap-6 scrollbar-hide snap-x">
              {coursePathway.map((course, idx) => (
                <Card key={idx} className="min-w-[320px] max-w-[320px] snap-center border-t-8 border-t-[#0b3c5d] shadow-2xl rounded-2xl overflow-hidden bg-white flex flex-col group">
                  <CardContent className="p-8 space-y-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className={`bg-[${theme.colors.brand.primary}] text-white font-black px-4 py-1.5 rounded-full text-sm`}>{course.code}</span>
                      <span className="text-[11px] font-bold text-slate-400 uppercase">{course.format}</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className={`text-xl font-bold text-slate-900 group-hover:text-[${theme.colors.brand.primary}] transition-colors`}>{course.name}</h4>
                      <div className="flex flex-col gap-1">
                        <p className={`text-[11px] font-bold text-[${theme.colors.brand.primary}] uppercase tracking-wider`}>{course.duration}</p>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{course.cert}</p>
                      </div>
                    </div>
                    <p className="text-[14px] text-slate-600 leading-relaxed flex-1 italic">
                      "{course.body}"
                    </p>
                    <Link href="/teacher-courses">
                      <Button className={`w-full font-bold py-4 rounded-xl mt-4 ${ui.buttons.brand}`}>
                        View Course →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Link href="/teacher-courses">
                <Button className={`px-10 py-6 rounded-2xl text-lg shadow-xl ${ui.buttons.brandLight}`}>
                  View Full Teacher Training Pathway →
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* S6 — AI & Platform Advantage Strip */}
        <section id="ai-advantage" className={`py-24 ${theme.sections.softBlue} -mx-6 md:-mx-12 lg:-mx-24 px-12 md:px-24 lg:px-48`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <span className={theme.components.label}>THE PLATFORM BEHIND YOUR TEACHING</span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900">Technology That Works For You — Not Against You</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto font-medium">
                EduMeUp's AI and platform tools are designed to reduce your workload, sharpen your teaching, and make every student session more effective.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {aiAdvantageCards.map((card, idx) => (
                <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center space-y-6 group hover:-translate-y-2 border border-slate-100">
                  <div className={`bg-[#eef6ff] p-5 rounded-[2rem] group-hover:bg-[${theme.colors.brand.primary}] group-hover:text-white transition-all duration-300`}>
                    <card.icon className={`w-10 h-10 text-[${theme.colors.brand.primary}] group-hover:text-white`} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">{card.title}</h4>
                  <p className="text-[15px] text-slate-600 leading-relaxed font-medium">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* S7 — Community, Trust & First-Mover Strip */}
        <section id="community" className={`py-24 ${theme.sections.navy} -mx-6 md:-mx-12 lg:-mx-24 px-12 md:px-24 lg:px-48 text-white`}>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            {/* Left Side — Trust & Stats Block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
              {[
                { label: "T1–T6 Complete Pathway", value: "6 Stages", sub: "Six structured stages from diagnostic to AI-powered teaching" },
                { label: "CCTE Certificate Issued", value: "Global", sub: "An internationally recognised Cambridge teaching credential" },
                { label: "7 CPD Hours", value: "7 Hours", sub: "Per CTMW workshop — among the highest CPD returns available" },
                { label: "Global + Local Reach", value: "Unlimited", sub: "Teach students online anywhere — or in person in major cities" }
              ].map((stat, i) => (
                <div key={i} className="space-y-3">
                  <p className={`text-4xl md:text-5xl font-black text-[${theme.colors.brand.primary}]`}>{stat.value}</p>
                  <p className="text-base font-bold text-white tracking-tight">{stat.label}</p>
                  <p className="text-[12px] text-blue-200 leading-tight">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Right Side — Testimonial Placeholder */}
            <div className={`bg-white/5 border-l-4 border-l-[${theme.colors.brand.primary}] p-12 rounded-r-[3rem] space-y-8`}>
              <p className="text-2xl md:text-3xl font-bold italic leading-relaxed text-blue-50">
                "EduMeUp gave me a structured teaching credential, a stream of matched students, and tools that save me hours every week. For the first time, my teaching career has a real direction."
              </p>
              <div>
                <p className="font-black text-xl text-white">EduMeUp Certified Tutor</p>
                <p className={`text-[${theme.colors.brand.primary}] font-bold uppercase tracking-widest text-xs mt-1`}>[Placeholder — replace with verified testimonial]</p>
              </div>
            </div>
          </div>
          
          {/* First-Mover Urgency Banner */}
          <div className={`mt-20 bg-[${theme.colors.brand.primary}] -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-24 py-8 md:py-5 flex flex-col md:flex-row justify-center items-center gap-4 group`}>
            <Rocket className="w-5 h-5 animate-bounce" />
            <p className="text-sm md:text-[15px] font-black uppercase tracking-[0.2em] text-center">
              Early certified tutors receive priority student matching. Certification is open now — spaces are limited in each subject.
            </p>
          </div>
        </section>

        {/* S8 — Call to Action Block */}
        <section id="cta" className={`py-24 ${theme.sections.softBlue} -mx-6 md:-mx-12 lg:-mx-24 px-12 md:px-24 lg:px-48`}>
          <div className="max-w-7xl mx-auto text-center mb-16 space-y-4">
            <h2 className={`text-3xl md:text-5xl font-bold text-[${theme.colors.brand.navy}]`}>Ready to Take the Next Step?</h2>
            <p className="text-xl text-slate-600 font-medium">Choose your path — or talk to us first.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* CTA 1 — Training */}
            <Card className={`rounded-[2.5rem] border border-[${theme.colors.brand.primary}]/20 shadow-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 group`}>
              <CardContent className="p-12 flex flex-col h-full space-y-8 items-center text-center">
                <div className={`bg-[#eef6ff] p-6 rounded-full text-[${theme.colors.brand.primary}]`}>
                  <GraduationCap className="w-12 h-12" />
                </div>
                <div className="space-y-4 flex-1">
                  <h3 className="text-2xl font-bold text-slate-900">Explore Training Courses</h3>
                  <p className="text-[16px] text-slate-600 leading-relaxed font-medium">
                    T1 through T6 — a complete professional pathway. Start with your diagnostic today.
                  </p>
                </div>
                <Link href="/teacher-courses" className="w-full">
                  <Button className={`w-full font-black py-6 rounded-2xl text-lg uppercase tracking-widest shadow-xl ${ui.buttons.brand}`}>
                    Get Certified
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* CTA 2 — Teach */}
            <Card className={`rounded-[2.5rem] border border-[${theme.colors.brand.navy}]/20 shadow-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 group`}>
              <CardContent className="p-12 flex flex-col h-full space-y-8 items-center text-center">
                <div className={`bg-[#eef6ff] p-6 rounded-full text-[${theme.colors.brand.navy}]`}>
                  <Users className="w-12 h-12" />
                </div>
                <div className="space-y-4 flex-1">
                  <h3 className="text-2xl font-bold text-slate-900">Apply to Teach on EduMeUp</h3>
                  <p className="text-[16px] text-slate-600 leading-relaxed font-medium">
                    Join our certified tutor network. Teach online globally or physically in major cities.
                  </p>
                </div>
                <Link href="/tutor-application" className="w-full">
                  <Button className={`w-full font-black py-6 rounded-2xl text-lg uppercase tracking-widest shadow-xl ${ui.buttons.brand}`}>
                    Apply Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* CTA 3 — Talk */}
            <Card className="rounded-[2.5rem] border border-blue-400/20 shadow-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 group">
              <CardContent className="p-12 flex flex-col h-full space-y-8 items-center text-center">
                <div className="bg-[#eef6ff] p-6 rounded-full text-blue-600">
                  <MessageCircle className="w-12 h-12" />
                </div>
                <div className="space-y-4 flex-1">
                  <h3 className="text-2xl font-bold text-slate-900">Talk to Us First</h3>
                  <p className="text-[16px] text-slate-600 leading-relaxed font-medium">
                    Not sure where to start? Our team will help you find the right path for your goals.
                  </p>
                </div>
                <Link href="/contact" className="w-full">
                  <Button className={`w-full font-black py-6 rounded-2xl text-lg uppercase tracking-widest shadow-xl ${ui.buttons.brand}`}>
                    WhatsApp Us
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
