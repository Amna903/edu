import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { motion } from "framer-motion";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white selection:bg-[#2366c9] selection:text-white">
      <Navbar />
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
