import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  BookOpen,
  GraduationCap,
  School,
  Users,
  FileText,
  Settings,
  ShoppingCart,
  Beaker,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import logoImage from "@/assets/WhatsApp_Image_2026-02-22_at_20.36.37_1771782478374.jpeg";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { items } = useCart();

  const links = [
    { href: "/", label: "Home", icon: null },
    {
      href: "/programs",
      label: "Exam Path",
      icon: BookOpen,
      fullLabel: "Exam Mastery Path",
    },
    {
      href: "/pricing",
      label: "Pricing",
      icon: ShoppingCart,
    },
    {
      href: "/research",
      label: "Research",
      icon: Beaker,
    },
    {
      label: "Portals",
      icon: Users,
      children: [
        { href: "/parents", label: "Parents", icon: Users },
        { href: "/students", label: "Students", icon: GraduationCap },
        { href: "/tutors", label: "Tutors", icon: GraduationCap },
        { href: "/schools", label: "Schools", icon: School },
      ]
    },
    {
      href: "/blog",
      label: "Blog",
      icon: FileText,
    },
    {
      href: "/how-it-works",
      label: "Process",
      icon: Settings,
      fullLabel: "How It Works",
    },
    {
      href: "/resources",
      label: "Library",
      icon: FileText,
      fullLabel: "Free Resource",
    },
    { href: "/about", label: "About", icon: Users },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/80">
      <div className="container-custom flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src={logoImage}
            alt="Edumeup Logo"
            className="h-8 sm:h-9 w-auto flex-shrink-0 mix-blend-multiply"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center justify-end flex-1 px-6 lg:px-8">
          <div className="flex items-center space-x-1">
            {links.map((link) => (
              link.children ? (
                <DropdownMenu key={link.label}>
                  <DropdownMenuTrigger asChild>
                    <div
                      className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors rounded-lg whitespace-nowrap text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      {link.icon && <link.icon className="h-4 w-4 shrink-0" />}
                      <span>{link.label}</span>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {link.children.map((child) => (
                      <DropdownMenuItem key={child.href} asChild>
                        <Link href={child.href} className="flex items-center gap-2 w-full cursor-pointer">
                          {child.icon && <child.icon className="h-4 w-4" />}
                          <span>{child.label}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link key={link.href} href={link.href!}>
                  <div
                    className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors rounded-lg whitespace-nowrap ${
                      isActive(link.href!)
                        ? "bg-blue-50 text-[#2366c9]"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {link.icon && <link.icon className="h-4 w-4 shrink-0" />}
                    <span className="hidden xl:inline">
                      {link.fullLabel || link.label}
                    </span>
                    <span className="xl:hidden">{link.label}</span>
                  </div>
                </Link>
              )
            ))}
          </div>
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-2">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="sm"
              className="hidden sm:flex font-semibold shadow-sm bg-[#2366c9] text-white hover:bg-blue-700"
            >
              Get Started
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b bg-background md:hidden overflow-hidden"
          >
            <div className="space-y-1 p-4">
              {links.map((link) => (
                link.children ? (
                  <div key={link.label} className="space-y-1">
                    <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {link.label}
                    </div>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsOpen(false)}
                      >
                        <div
                          className={`flex items-center gap-2 rounded-lg px-8 py-3 text-sm font-medium transition-colors hover:bg-muted ${
                            isActive(child.href) ? "bg-primary/10 text-primary" : ""
                          }`}
                        >
                          {child.icon && <child.icon className="h-4 w-4" />}
                          {child.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href!}
                    onClick={() => setIsOpen(false)}
                  >
                    <div
                      className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted ${
                        isActive(link.href!) ? "bg-primary/10 text-primary" : ""
                      }`}
                    >
                      {link.icon && <link.icon className="h-4 w-4" />}
                      {link.label}
                    </div>
                  </Link>
                )
              ))}
              <Link href="/cart" onClick={() => setIsOpen(false)}>
                <div className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted">
                  <ShoppingCart className="h-4 w-4" />
                  Cart ({items.length})
                </div>
              </Link>
              <div className="pt-4 mt-4 border-t">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <Button className="w-full font-semibold">Get Started</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
