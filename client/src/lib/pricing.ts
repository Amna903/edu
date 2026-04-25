/**
 * PRICING SOURCE OF TRUTH
 * Update this file to change prices across the entire application.
 */

export const PRICING = {
  CURRENCY: "USD",
  
  // 1. CHAPTER COURSES
  CHAPTER_COURSES: {
    TIERS: [
      { range: "1-4", pricePerChapter: 6.00 },
      { range: "5-8", pricePerChapter: 5.00 },
      { range: "9-12", pricePerChapter: 4.00 },
      { range: "13-16", pricePerChapter: 3.00 },
      { range: "17+", pricePerChapter: 2.50 },
    ],
    DISCOUNTS: {
      TWO_YEARS: 0.25, // 25%
      THREE_YEARS: 0.40, // 40%
    }
  },

  // 2. SUBJECT COURSES (ONE-TIME PAYMENT)
  SUBJECT_COURSES: {
    SINGLE_SUBJECT: {
      ONE_YEAR: 120,
      TWO_YEARS: 180, // $90/yr
      THREE_YEARS: 216, // $72/yr
    },
    TWO_SUBJECTS: {
      ONE_YEAR: 170, // $85/yr/sub
      TWO_YEARS: 255, // $63.75/yr/sub
      THREE_YEARS: 306, // $51/yr/sub
    }
  },

  // 3. SUBSCRIPTION PLANS
  SUBSCRIPTIONS: {
    FOUR_SUBJECTS: {
      MONTHLY: 25,
      ONE_YEAR: 255,   // $21.25/mo
      TWO_YEARS: 420,  // $17.50/mo
      THREE_YEARS: 450, // $12.50/mo
    },
    ALL_SUBJECTS: {
      MONTHLY: 40,
      ONE_YEAR: 408,   // $34/mo
      TWO_YEARS: 672,  // $28/mo
      THREE_YEARS: 720, // $20/mo
    }
  },

  // 4. MUST-HAVE & ENGLISH PATHWAY
  ENGLISH_PATHWAY: {
    LEARN_HOW_TO_LEARN: 20,
    VOCAB_MASTERY: 25,
    READING_COMPREHENSION: 30,
    ESL1: 30,
    ESL2: 30,
    BRIDGE_COURSE: 45,
    FOUNDATION_BUNDLE: 130, // Save $50
  },

  // 5. O-LEVEL ENGLISH BUNDLES
  ENGLISH_BUNDLES: {
    COMPREHENSION: 110,
    ESSAY_COMPOSITION: 145,
    DIRECTED_WRITING_1: 65,
    DIRECTED_WRITING_2: 70,
    FULL_PROGRAMME: 270, // Save $120
  },

  // 6. CAMBRIDGE 360 HUB
  HUB_PLANS: {
    ESSENTIALS: { MONTHLY: 15, YEARLY: 130 },
    NAVIGATOR: { MONTHLY: 39, YEARLY: 340 },
    ACCELERATOR: { MONTHLY: 69, YEARLY: 590 },
    EXCELLENCE: { MONTHLY: 99, YEARLY: 850 },
  },

  // 7. SCHOLARSHIP
  SCHOLARSHIP: {
    MIN_DISCOUNT: 0.20,
    MAX_DISCOUNT: 0.40,
    QUALIFYING_COUNTRIES: ['Pakistan', 'Bangladesh', 'Nigeria', 'Egypt', 'Sri Lanka', 'Vietnam', 'Kenya']
  }
};
