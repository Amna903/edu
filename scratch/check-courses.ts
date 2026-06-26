import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function run() {
  console.log("--- DB Course Catalog ---");
  const stored = await prisma.courseCatalog.findMany();
  console.log("Total courses in DB:", stored.length);
  for (const course of stored) {
    console.log(`- DB Course: id=${course.moodleCourseId}, fullname="${course.fullname}", isVisible=${course.isVisible}`);
  }

  console.log("\n--- Testing Moodle API core_course_search_courses with MOODLE_COURSE token ---");
  const token = "e90ee5e0f7a0e3a2fd27eae789bb3208";
  const apiUrl = "https://moodle.edumeup.com/webservice/rest/server.php";
  
  // Test search with empty criteria
  const urlEmpty = `${apiUrl}?wstoken=${token}&wsfunction=core_course_search_courses&moodlewsrestformat=json&criterianame=search&criteriavalue=`;
  try {
    const res = await fetch(urlEmpty);
    const data = await res.json();
    console.log("Empty search result:", JSON.stringify(data).slice(0, 1000));
  } catch (err) {
    console.error("Empty search request error:", err);
  }

  // Test search with wildcard or common search term
  const urlSearch = `${apiUrl}?wstoken=${token}&wsfunction=core_course_search_courses&moodlewsrestformat=json&criterianame=search&criteriavalue=chemistry`;
  try {
    const res = await fetch(urlSearch);
    const data = await res.json();
    console.log("Chemistry search result:", JSON.stringify(data).slice(0, 1000));
  } catch (err) {
    console.error("Chemistry search request error:", err);
  }

  await prisma.$disconnect();
}

run().catch(console.error);
