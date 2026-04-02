import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";
import Research from "@/pages/Research";
import ForParents from "@/pages/ForParents";
import ForStudents from "@/pages/ForStudents";
import Blog from "@/pages/Blog";
import HowItWorks from "@/pages/HowItWorks";
import Programs from "@/pages/Programs";
import ProgramDetails from "@/pages/ProgramDetails";
import Courses from "@/pages/Courses";
import Resources from "@/pages/Resources";
import About from "@/pages/About";
import Cart from "@/pages/Cart";
import Schools from "@/pages/Schools";
import Tutors from "@/pages/Tutors";
import Contact from "@/pages/Contact";
import Portals from "@/pages/Portals";
import ForSchools from "@/pages/ForSchools";
import ForSchoolsPartnership from "@/pages/ForSchoolsPartnership";
import TeacherTraining from "@/pages/TeacherTraining";
import WhyEduMeUp from "@/pages/WhyEduMeUp";
import EightStepModel from "@/pages/EightStepModel";
import ATPCourses from "@/pages/programs/ATPCourses";
import TutorBooking from "@/pages/programs/TutorBooking";
import Matric from "@/pages/programs/Matric";
import FscIcs from "@/pages/programs/FscIcs";
import Ecat from "@/pages/programs/Ecat";
import BridgeCourses from "@/pages/programs/BridgeCourses";
import EnglishMastery from "@/pages/programs/EnglishMastery";
import PreOLevelVictory from "@/pages/programs/PreOLevelVictory";
import CompleteOLevel from "@/pages/programs/CompleteOLevel";
import ExamPrep from "@/pages/programs/ExamPrep";
import ConceptualWorkbooks from "@/pages/resources/ConceptualWorkbooks";
import TopicalWorkbooks from "@/pages/resources/TopicalWorkbooks";
import ExamPapers from "@/pages/resources/ExamPapers";
import Worksheets from "@/pages/resources/Worksheets";
import AllResources from "@/pages/resources/AllResources";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Cookies from "@/pages/Cookies";
import AIDiagnostic from "@/pages/programs/AIDiagnostic";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import PaymentSuccess from "@/pages/PaymentSuccess";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/research" component={Research} />
      <Route path="/portals" component={Portals} />
      <Route path="/portals/parents" component={ForParents} />
      <Route path="/portals/students" component={ForStudents} />
      <Route path="/portals/teachers" component={Tutors} />
      <Route path="/portals/schools" component={Schools} />
      <Route path="/blog" component={Blog} />
      <Route path="/programs" component={Programs} />
      <Route path="/courses" component={Courses} />
      <Route path="/programs/ai-diagnostic" component={AIDiagnostic} />
      <Route path="/programs/atp-courses" component={ATPCourses} />
      <Route path="/programs/tutor-booking" component={TutorBooking} />
      
      {/* Flagship Cambridge O-Level Programme Routes */}
      <Route path="/programs/bridge-courses" component={BridgeCourses} />
      <Route path="/programs/english-mastery" component={EnglishMastery} />
      <Route path="/programs/pre-o-level-victory" component={PreOLevelVictory} />
      <Route path="/programs/complete-o-level" component={CompleteOLevel} />
      <Route path="/programs/exam-prep" component={ExamPrep} />
      
      {/* Pakistan Board Programmes - Routes must be before dynamic :slug route */}
      <Route path="/programs/matric" component={Matric} />
      <Route path="/programs/fsc-ics" component={FscIcs} />
      <Route path="/programs/ecat" component={Ecat} />
      
      {/* Dynamic route - always at the end */}
      <Route path="/programs/:slug" component={ProgramDetails} />
      <Route path="/courses/:slug" component={ProgramDetails} />
      <Route path="/resources" component={Resources} />
      <Route path="/resources/freebies" component={Resources} />
      <Route path="/resources/all" component={AllResources} />
      <Route path="/resources/workbooks" component={ConceptualWorkbooks} />
      <Route path="/resources/topical-workbooks" component={TopicalWorkbooks} />
      <Route path="/resources/exam-papers" component={ExamPapers} />
      <Route path="/resources/worksheets" component={Worksheets} />
      <Route path="/about" component={About} />
      <Route path="/cart" component={Cart} />
      <Route path="/for-schools" component={ForSchools} />
      <Route path="/for-schools/partnership" component={ForSchoolsPartnership} />
      <Route path="/teacher-training" component={TeacherTraining} />
      <Route path="/why-edumeup" component={WhyEduMeUp} />
      <Route path="/why-edumeup/how-it-works" component={HowItWorks} />
      <Route path="/why-edumeup/8-step-model" component={EightStepModel} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/cookies" component={Cookies} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/dashboard/student" component={Dashboard} />
      <Route path="/dashboard/student/certificates" component={Dashboard} />
      <Route path="/dashboard/parent" component={Dashboard} />
      <Route path="/dashboard/school" component={Dashboard} />
      <Route path="/dashboard/school/analytics" component={Dashboard} />
      <Route path="/dashboard/admin" component={Dashboard} />
      <Route path="/dashboard/admin/analytics" component={Dashboard} />
      <Route path="/dashboard/orders" component={Dashboard} />
      <Route path="/dashboard/profile" component={Dashboard} />
      <Route path="/dashboard/support" component={Dashboard} />
      <Route path="/payment-success" component={PaymentSuccess} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;

