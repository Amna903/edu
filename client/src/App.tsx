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
import Resources from "@/pages/Resources";
import About from "@/pages/About";
import Cart from "@/pages/Cart";
import Schools from "@/pages/Schools";
import Tutors from "@/pages/Tutors";
import Contact from "@/pages/Contact";
import ForSchools from "@/pages/ForSchools";
import ForSchoolsPartnership from "@/pages/ForSchoolsPartnership";
import ForParentsMain from "@/pages/ForParentsMain";
import TeacherTraining from "@/pages/TeacherTraining";
import WhyEduMeUp from "@/pages/WhyEduMeUp";
import ATPCourses from "@/pages/programs/ATPCourses";
import TutorBooking from "@/pages/programs/TutorBooking";
import ConceptualWorkbooks from "@/pages/resources/ConceptualWorkbooks";
import TopicalWorkbooks from "@/pages/resources/TopicalWorkbooks";
import ExamPapers from "@/pages/resources/ExamPapers";
import Worksheets from "@/pages/resources/Worksheets";
import AllResources from "@/pages/resources/AllResources";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Cookies from "@/pages/Cookies";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/research" component={Research} />
      <Route path="/parents" component={ForParents} />
      <Route path="/students" component={ForStudents} />
      <Route path="/blog" component={Blog} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/programs" component={Programs} />
      <Route path="/programs/ai-diagnostic" component={Contact} />
      <Route path="/programs/atp-courses" component={ATPCourses} />
      <Route path="/programs/tutor-booking" component={TutorBooking} />
      <Route path="/programs/:slug" component={ProgramDetails} />
      <Route path="/resources" component={Resources} />
      <Route path="/resources/freebies" component={Resources} />
      <Route path="/resources/all" component={AllResources} />
      <Route path="/resources/workbooks" component={ConceptualWorkbooks} />
      <Route path="/resources/topical-workbooks" component={TopicalWorkbooks} />
      <Route path="/resources/exam-papers" component={ExamPapers} />
      <Route path="/resources/worksheets" component={Worksheets} />
      <Route path="/about" component={About} />
      <Route path="/cart" component={Cart} />
      <Route path="/schools" component={Schools} />
      <Route path="/for-schools" component={ForSchools} />
      <Route path="/for-schools/partnership" component={ForSchoolsPartnership} />
      <Route path="/for-schools/consultation" component={ForSchoolsPartnership} />
      <Route path="/for-parents" component={ForParentsMain} />
      <Route path="/teacher-training" component={TeacherTraining} />
      <Route path="/teacher-training/individual" component={TeacherTraining} />
      <Route path="/teacher-training/book" component={TeacherTraining} />
      <Route path="/why-edumeup" component={WhyEduMeUp} />
      <Route path="/why-edumeup/how-it-works" component={HowItWorks} />
      <Route path="/tutors" component={Tutors} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/cookies" component={Cookies} />
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
