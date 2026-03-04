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
      <Route path="/programs/:slug" component={ProgramDetails} />
      <Route path="/resources" component={Resources} />
      <Route path="/about" component={About} />
      <Route path="/cart" component={Cart} />
      <Route path="/schools" component={Schools} />
      <Route path="/tutors" component={Tutors} />
      <Route path="/contact" component={Contact} />
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
