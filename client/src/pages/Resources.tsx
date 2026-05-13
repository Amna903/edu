import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  BookOpenCheck,
  Bot,
  ClipboardCheck,
  Download,
  FileCheck2,
  FileText,
  GraduationCap,
  Library,
  ListChecks,
  MonitorPlay,
  PenLine,
  Search,
  ShieldCheck,
  Sparkles,
  TableProperties,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";

type ResourceType =
  | "Interactive H5P Module Sample"
  | "Bridge Course Sample Module"
  | "Magic Sheet"
  | "Sample Workbook"
  | "Diagnostic Test Sample"
  | "Past Paper Sample Solution"
  | "Essay Rubric & Sample Answer"
  | "ATP Practical Guide Sample"
  | "Study Planning Template"
  | "Parent Guide"
  | "Expert Roadmap"
  | "Lesson Plan Template"
  | "Teacher Resource Guide"
  | "O-Level Survival Kit"
  | "AI Chatbot Demo";

type FreeResource = {
  type: ResourceType;
  subject: string;
  title: string;
  fileType: string;
  fileLink?: string;
  icon: LucideIcon;
};

const resourceTypes: ResourceType[] = [
  "Interactive H5P Module Sample",
  "Bridge Course Sample Module",
  "Magic Sheet",
  "Sample Workbook",
  "Diagnostic Test Sample",
  "Past Paper Sample Solution",
  "Essay Rubric & Sample Answer",
  "ATP Practical Guide Sample",
  "Study Planning Template",
  "Parent Guide",
  "Expert Roadmap",
  "Lesson Plan Template",
  "Teacher Resource Guide",
  "O-Level Survival Kit",
  "AI Chatbot Demo",
];

const registryResources: FreeResource[] = [
  {
    type: "Interactive H5P Module Sample",
    subject: "Physics - Electromagnetic Waves",
    title: "Physics Topic: Electromagnetic Waves - Complete Interactive Module",
    fileType: "H5P / Link",
    icon: MonitorPlay,
  },
  {
    type: "Interactive H5P Module Sample",
    subject: "Chemistry - Atomic Structure",
    title: "Chemistry Topic: Atomic Structure and Chemical Bonding - Interactive Module",
    fileType: "H5P / Link",
    icon: MonitorPlay,
  },
  {
    type: "Interactive H5P Module Sample",
    subject: "Biology - Photosynthesis",
    title: "Biology Topic: Plant Nutrition (Photosynthesis) - Interactive Module",
    fileType: "H5P / Link",
    icon: MonitorPlay,
  },
  {
    type: "Bridge Course Sample Module",
    subject: "Bridge Chemistry - Module 1",
    title: "Bridge Chemistry Module 1: Matter and Separation - Sample Module",
    fileType: "H5P / Link",
    icon: GraduationCap,
  },
  {
    type: "Bridge Course Sample Module",
    subject: "Bridge Mathematics - Module 1",
    title: "Bridge Mathematics Module 1: Number and Everyday Mathematics - Sample Module",
    fileType: "H5P / Link",
    icon: GraduationCap,
  },
  {
    type: "Magic Sheet",
    subject: "Physics - O-Level",
    title: "Physics O-Level Magic Sheet: Electromagnetic Waves and Spectrum",
    fileType: "PDF",
    icon: Sparkles,
  },
  {
    type: "Magic Sheet",
    subject: "Chemistry - O-Level",
    title: "Chemistry O-Level Magic Sheet: Organic Chemistry Summary",
    fileType: "PDF",
    icon: Sparkles,
  },
  {
    type: "Magic Sheet",
    subject: "English Language - O-Level",
    title: "English Language O-Level Magic Sheet: Directed Writing Formats",
    fileType: "PDF",
    icon: Sparkles,
  },
  {
    type: "Sample Workbook",
    subject: "Mathematics - Statistics",
    title: "O-Level Mathematics Workbook Sample: Statistics - Cumulative Frequency and Histograms",
    fileType: "PDF",
    icon: BookOpenCheck,
  },
  {
    type: "Sample Workbook",
    subject: "Physics - Kinematics",
    title: "O-Level Physics Workbook Sample: Kinematics - Equations of Motion",
    fileType: "PDF",
    icon: BookOpenCheck,
  },
  {
    type: "Diagnostic Test Sample",
    subject: "Mathematics - Full Syllabus",
    title: "O-Level Mathematics Diagnostic Sample: 10 Questions - Algebra to Statistics",
    fileType: "Online / PDF",
    icon: ClipboardCheck,
  },
  {
    type: "Diagnostic Test Sample",
    subject: "English Language - CEFR",
    title: "English Language Level Assessment Sample: CEFR A2 to B1 Sample Questions",
    fileType: "Online / PDF",
    icon: ClipboardCheck,
  },
  {
    type: "Past Paper Sample Solution",
    subject: "Physics - June 2024",
    title: "O-Level Physics June 2024: Selected Structured Question Model Answers",
    fileType: "PDF",
    icon: FileCheck2,
  },
  {
    type: "Past Paper Sample Solution",
    subject: "Economics - June 2024",
    title: "O-Level Economics June 2024: Data Response Section - Model Answers",
    fileType: "PDF",
    icon: FileCheck2,
  },
  {
    type: "Essay Rubric & Sample Answer",
    subject: "English - Argumentative",
    title: "O-Level English: Argumentative Essay - Band 1 Rubric and Model Answer",
    fileType: "PDF",
    icon: PenLine,
  },
  {
    type: "Essay Rubric & Sample Answer",
    subject: "Economics - 12-mark Essay",
    title: "O-Level Economics: Evaluate Essay - Marking Criteria and Model Answer",
    fileType: "PDF",
    icon: PenLine,
  },
  {
    type: "ATP Practical Guide Sample",
    subject: "Physics ATP - Q1 Design",
    title: "Physics ATP: Q-Type 1 - Experimental Design Guide with Worked Example",
    fileType: "PDF",
    icon: ListChecks,
  },
  {
    type: "ATP Practical Guide Sample",
    subject: "Chemistry ATP - Q5 Conclusions",
    title: "Chemistry ATP: Q-Type 5 - Drawing Conclusions Guide with Worked Example",
    fileType: "PDF",
    icon: ListChecks,
  },
  {
    type: "Study Planning Template",
    subject: "O-Level - Weekly",
    title: "Weekly Study Planner with Spaced Retrieval Slots - Fillable PDF",
    fileType: "PDF",
    icon: TableProperties,
  },
  {
    type: "Parent Guide",
    subject: "O-Level System",
    title: "Parent Guide 1: Cambridge O-Level Explained - Grades, Papers, Timeline",
    fileType: "PDF",
    icon: Users,
  },
  {
    type: "Expert Roadmap",
    subject: "Subject Selection",
    title: "Expert Roadmap: O-Level Subject Selection Decision Guide",
    fileType: "PDF",
    icon: ShieldCheck,
  },
  {
    type: "Lesson Plan Template",
    subject: "Diagnostic-to-Instruction",
    title: "Diagnostic-to-Instruction Bridge Lesson Plan Template",
    fileType: "PDF / Word",
    icon: FileText,
  },
  {
    type: "Teacher Resource Guide",
    subject: "Platform Integration",
    title: "Using EduMeUp in Your Classroom - Flipped and Blended Learning Guide",
    fileType: "PDF",
    icon: Library,
  },
  {
    type: "O-Level Survival Kit",
    subject: "All Subjects - Cross-cutting",
    title: "Cambridge O-Level Complete Preparation Guide - Survival Kit PDF",
    fileType: "PDF",
    icon: ShieldCheck,
  },
  {
    type: "AI Chatbot Demo",
    subject: "Physics / Chemistry / Maths / English",
    title: "EduMeUp AI Tutor Live Demo - 5 free questions, no login required",
    fileType: "Live Link",
    icon: Bot,
  },
];

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function Resources() {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState<ResourceType | "all">("all");

  const publishedResources = registryResources.filter((resource) => Boolean(resource.fileLink));
  const pendingCount = registryResources.length - publishedResources.length;

  const visibleResources = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return publishedResources.filter((resource) => {
      const matchesType = activeType === "all" || resource.type === activeType;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [resource.title, resource.subject, resource.type, resource.fileType]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesType && matchesSearch;
    });
  }, [activeType, search]);

  const categoryStats = resourceTypes.map((type) => ({
    type,
    total: registryResources.filter((resource) => resource.type === type).length,
    published: publishedResources.filter((resource) => resource.type === type).length,
  }));

  return (
    <Layout>
      <section className="bg-brand-primary text-white">
        <div className="container-custom py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Badge className="mb-5 rounded-full bg-white/15 px-4 py-1 text-white hover:bg-white/15">
                Free Resource Zone
              </Badge>
              <h1 className="max-w-4xl font-display text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
                Sample lessons, guides, planners, and exam tools from the EduMeUp registry.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-blue-50 md:text-lg">
                Browse free resources by type, subject, and file format. Only resources with approved file paths or live links are shown here.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-white/15 bg-white/10 p-5 shadow-xl backdrop-blur">
                <div className="mb-5 flex items-center justify-between">
                  <div className="text-sm font-semibold text-white">Resource preview</div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-brand-primary">
                    <Library className="h-5 w-5" />
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: MonitorPlay, label: "Interactive H5P Modules", meta: "Lessons" },
                    { icon: Sparkles, label: "Magic Sheets", meta: "PDF" },
                    { icon: ClipboardCheck, label: "Diagnostic Samples", meta: "Online" },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.label} className="flex items-center gap-3 rounded-md bg-white/10 p-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/15 text-white">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-semibold text-white">{item.label}</div>
                          <div className="text-xs text-blue-50">{item.meta}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="rounded-md bg-white/10 p-4">
                  <div className="text-3xl font-semibold">{resourceTypes.length}</div>
                  <div className="mt-1 text-xs font-medium uppercase text-blue-50">Types</div>
                </div>
                <div className="rounded-md bg-white/10 p-4">
                  <div className="text-3xl font-semibold">{publishedResources.length}</div>
                  <div className="mt-1 text-xs font-medium uppercase text-blue-50">Live</div>
                </div>
                <div className="rounded-md bg-white/10 p-4">
                  <div className="text-3xl font-semibold">{pendingCount}</div>
                  <div className="mt-1 text-xs font-medium uppercase text-blue-50">Pending</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="container-custom py-8">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by subject, title, file type, or resource category"
                className="h-12 rounded-md border-slate-200 pl-12 text-[15px]"
              />
            </div>
            <Button
              variant="outline"
              className="h-12 justify-center rounded-md border-slate-300 px-5"
              onClick={() => {
                setActiveType("all");
                setSearch("");
              }}
            >
              Clear filters
            </Button>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={activeType === "all" ? "default" : "outline"}
              className="h-10 shrink-0 rounded-full px-4"
              onClick={() => setActiveType("all")}
            >
              All types
            </Button>
            {categoryStats.map((category) => (
              <Button
                key={category.type}
                variant={activeType === category.type ? "default" : "outline"}
                className="h-10 shrink-0 rounded-full px-4"
                onClick={() => setActiveType(category.type)}
              >
                {category.type}
                <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                  {category.published}/{category.total}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="container-custom">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-3xl font-semibold text-slate-950">Published resources</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                New downloads and live demos appear here as soon as their files are ready.
              </p>
            </div>
            <Badge variant="outline" className="w-fit rounded-full border-amber-300 bg-amber-50 px-4 py-1 text-amber-800">
              Hidden until file/link is ready
            </Badge>
          </div>

          {visibleResources.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibleResources.map((resource) => {
                const Icon = resource.icon;

                return (
                  <Card key={`${resource.type}-${resource.title}`} className="rounded-lg border-slate-200 shadow-sm">
                    <CardContent className="flex h-full flex-col p-6">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-blue-50 text-brand-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <Badge variant="outline" className="rounded-full border-emerald-200 bg-emerald-50 text-emerald-700">
                          Ready
                        </Badge>
                      </div>
                      <div className="mb-3 text-xs font-semibold uppercase text-brand-primary">{resource.type}</div>
                      <h3 className="text-lg font-semibold leading-snug text-slate-950">{resource.title}</h3>
                      <p className="mt-3 text-sm text-slate-600">{resource.subject}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        <Badge variant="secondary" className="rounded-md bg-slate-100 text-slate-700">
                          {resource.fileType}
                        </Badge>
                        <Badge variant="secondary" className="rounded-md bg-slate-100 text-slate-700">
                          {slugify(resource.type)}
                        </Badge>
                      </div>
                      <Button className="mt-6 h-11 rounded-md bg-brand-primary hover:bg-blue-700" asChild>
                        <a href={resource.fileLink} target="_blank" rel="noreferrer">
                          <Download className="mr-2 h-4 w-4" />
                          Open resource
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-amber-50 text-amber-700">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-950">No approved files are linked yet</h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                The resource categories are ready, but the downloadable PDFs, H5P modules, Moodle links, and live demos still need final links before they can be opened.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container-custom">
          <div className="mb-8">
            <h2 className="font-display text-3xl font-semibold text-slate-950">Resource registry structure</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              These are the categories from the April 2026 Free Resource Zone registry. Counts show how many example rows are already mapped in the page data.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {categoryStats.map((category) => (
              <button
                key={category.type}
                type="button"
                onClick={() => setActiveType(category.type)}
                className="rounded-lg border border-slate-200 bg-white p-5 text-left transition hover:border-brand-primary hover:shadow-sm"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-semibold text-slate-950">{category.type}</h3>
                  <Badge variant="secondary" className="shrink-0 rounded-full bg-slate-100 text-slate-700">
                    {category.total}
                  </Badge>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  {category.published} live, {category.total - category.published} waiting for final file or link.
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

