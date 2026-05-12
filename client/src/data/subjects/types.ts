export type SubjectTopic = {
  number: number;
  name: string;
  available: boolean;
};

export type SubjectFaq = {
  question: string;
  answer: string;
};

export type SubjectRelatedCourse = {
  name: string;
  url: string;
};

export type SubjectSeo = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  keywords: string;
  canonicalUrl: string;
};

export type SubjectData = {
  slug: string;
  subjectName: string;
  subjectCode: string;
  heroHeadline: string;
  heroSubHeadline: string;
  heroCopy: string;
  topicsTotal: number;
  topicsAvailable: number;
  topics: SubjectTopic[];
  keyFeatures: string[];
  examBoard: string;
  syllabusYear: string;
  priceFrom: string;
  pricingNote: string;
  diagnosticLink: string;
  enrollUrl: string;
  relatedCourses: SubjectRelatedCourse[];
  seo: SubjectSeo;
  faq: SubjectFaq[];
};