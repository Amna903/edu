import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { GraduationCap, BookOpen, UserCheck, ShieldCheck, Trophy, Target, CheckCircle2, Zap, ArrowRight, MousePointer2, Users, Cpu } from "lucide-react";
import { InquiryDialog } from "@/components/InquiryDialog";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Microscope } from "lucide-react";
import { useState } from "react";
import {  AnimatePresence } from "framer-motion";
import { Disclosure } from "@headlessui/react";
 
'use client';
 

export function StudentApplicationForm() {
  const [formData, setFormData] = useState({
    studentName: "",
    dateOfBirth: "", // âœ… MISSING
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    emergencyContact: "", // âœ… MISSING
    school: "",
    currentGrade: "", // âœ… MISSING
    country: "",
    timezone: "",
    curriculum: "", // âœ… MISSING
    primarySubject: "",
    subjects: [] as string[],
    mode: "", // âœ… MISSING (online/physical)
    sessionDuration: "", // âœ… MISSING (30/45/60 min)
    budgetRange: "", // âœ… MISSING
    average: "",
    struggle: "",
    previousTutorExp: "", // âœ… MISSING
    learningNeeds: "",
    availability: "", // âœ… MISSING (weekday/weekend)
    timeSlot: "", // âœ… MISSING (morning/afternoon/evening)
    sessionsPerWeek: "", // âœ… MISSING
    learningGoals: "", // âœ… MISSING (3-month goals)
    tutorPreference: "", // âœ… MISSING (patient/strict/friendly)
    heardFrom: "",
    tutorRequest: "",
    parentConsent: false, // âœ… MISSING
  });

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.subjects.length === 0) {
      alert("Please select at least one subject.");
      return;
    }
    console.log("Student Application:", formData);
    alert("Application submitted! Diagnostic link will be sent within 24 hrs.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-h-[80vh] overflow-y-auto pr-2">
      {/* PART 1 — STUDENT INFORMATION */}
      <section className="border rounded-2xl p-6 space-y-4">
        <h3 className="font-semibold text-lg">Part 1 — Student Information</h3>

        <div>
          <label className="block font-medium">Student Full Name</label>
          <input type="text" className="w-full border rounded-lg p-2" placeholder="Enter student's full name" value={formData.studentName} onChange={(e) => handleChange("studentName", e.target.value)} required />
        </div>

     <div>
  {/* The htmlFor must match the input's id exactly */}
  <label htmlFor="student-dob" className="block font-medium">
    Date of Birth
  </label>
  <input 
    id="student-dob"
    type="date" 
    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" 
    value={formData.dateOfBirth} 
    onChange={(e) => handleChange("dateOfBirth", e.target.value)} 
    required 
  />
</div>

        <div>
          <label className="block font-medium">Parent/Guardian Name</label>
          <input type="text" className="w-full border rounded-lg p-2" placeholder="Enter parent or guardian's name" value={formData.parentName} onChange={(e) => handleChange("parentName", e.target.value)} required />
        </div>

        <div>
          <label className="block font-medium">Parent Email</label>
          <input type="email" className="w-full border rounded-lg p-2" placeholder="Enter parent's email address" value={formData.parentEmail} onChange={(e) => handleChange("parentEmail", e.target.value)} required />
        </div>

        <div>
          <label className="block font-medium">Parent Phone</label>
          <input type="tel" className="w-full border rounded-lg p-2" placeholder="Enter parent's phone number" value={formData.parentPhone} onChange={(e) => handleChange("parentPhone", e.target.value)} required />
        </div>

        <div>
          <label className="block font-medium">Emergency Contact Number</label>
          <input type="tel" className="w-full border rounded-lg p-2" placeholder="Emergency contact phone" value={formData.emergencyContact} onChange={(e) => handleChange("emergencyContact", e.target.value)} />
        </div>

        <div>
        <label htmlFor="currentGrade" className="block font-medium">
      Student Class / Grade
</label>
<select
  id="currentGrade"
  className="w-full border rounded-lg p-2"
  value={formData.currentGrade}
  onChange={(e) => handleChange("currentGrade", e.target.value)}
  required
>
            <option value="">Select grade</option>
            <option>Grade 4</option>
            <option>Grade 5</option>
            <option>Grade 6</option>
            <option>Grade 7</option>
            <option>Grade 8</option>
            <option>Pre-O-Level</option>
            <option>O1</option>
            <option>O2</option>
            <option>A-Level</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">School Name</label>
          <input type="text" className="w-full border rounded-lg p-2" placeholder="Enter school name (optional)" value={formData.school} onChange={(e) => handleChange("school", e.target.value)} />
        </div>

       <div>
  <label
    htmlFor="curriculum"
    className="block font-medium"
  >
    Curriculum
  </label>

  <select
    id="curriculum"
    className="w-full border rounded-lg p-2"
    value={formData.curriculum}
    onChange={(e) => handleChange("curriculum", e.target.value)}
    required
  >
    <option value="">Select curriculum</option>
    <option value="Cambridge">Cambridge</option>
    <option value="Local Board">Local Board</option>
    <option value="IB">IB</option>
    <option value="Other">Other</option>
  </select>
</div>

        <div>
          <label className="block font-medium">Country</label>
          <input type="text" className="w-full border rounded-lg p-2" placeholder="Enter country" value={formData.country} onChange={(e) => handleChange("country", e.target.value)} required />
        </div>

        <div>
          <label className="block font-medium">Time Zone</label>
          <input type="text" className="w-full border rounded-lg p-2" placeholder="e.g., UTC+5 (Pakistan)" value={formData.timezone} onChange={(e) => handleChange("timezone", e.target.value)} required />
        </div>
      </section>

      {/* PART 2 — SUBJECTS NEEDED */}
      <section className="border rounded-2xl p-6 space-y-4">
        <h3 className="font-semibold text-lg">Part 2 — Subjects Needed</h3>
        <div>
          <label htmlFor="primarySubject" className="block font-medium">Subject</label>
          <select
            id="primarySubject"
            className="w-full border rounded-lg p-2"
            value={formData.primarySubject}
            onChange={(e) => handleChange("primarySubject", e.target.value)}
            required
          >
            <option value="">Select primary subject</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="English Language">English Language</option>
            <option value="Economics">Economics</option>
            <option value="Business Studies">Business Studies</option>
            <option value="Pakistan Studies">Pakistan Studies</option>
            <option value="Computer Science">Computer Science</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {["Mathematics", "Physics", "Chemistry", "Biology", "English Language", "Economics", "Business Studies", "Pakistan Studies", "Computer Science"].map((subject) => (
            <label key={subject} className="flex items-center gap-2">
              <input type="checkbox" onChange={(e) => {
                if (e.target.checked) setFormData({ ...formData, subjects: [...formData.subjects, subject] });
                else setFormData({ ...formData, subjects: formData.subjects.filter(s => s !== subject) });
              }} />
              {subject}
            </label>
          ))}
        </div>
      </section>

      {/* PART 3 — TUTORING PREFERENCE */}
      <section className="border rounded-2xl p-6 space-y-4">
        <h3 className="font-semibold text-lg">Part 3 — Tutoring Preference</h3>

        <div className="space-y-2">
          <label className="block font-medium">Learning Mode</label>
          <label className="flex gap-2">
            <input type="radio" name="mode" value="Online" checked={formData.mode === "Online"} onChange={(e) => handleChange("mode", e.target.value)} required />
            Online (Global)
          </label>
          <label className="flex gap-2">
            <input type="radio" name="mode" value="Physical" checked={formData.mode === "Physical"} onChange={(e) => handleChange("mode", e.target.value)} required />
            Physical (Pakistan only)
          </label>
        </div>

      <div>
  <label
    htmlFor="sessionDuration"
    className="block font-medium"
  >
    Session Duration (minutes)
  </label>

  <select
    id="sessionDuration"
    className="w-full border rounded-lg p-2"
    value={formData.sessionDuration}
    onChange={(e) => handleChange("sessionDuration", e.target.value)}
    required
  >
    <option value="">Select duration</option>
    <option value="30">30</option>
    <option value="45">45</option>
    <option value="60">60</option>
  </select>
</div>
        <div>
          <label className="block font-medium">Budget/Expected Fee Range</label>
          <input type="text" className="w-full border rounded-lg p-2" placeholder="e.g., $10-15/hour" value={formData.budgetRange} onChange={(e) => handleChange("budgetRange", e.target.value)} />
        </div>
      </section>

      {/* PART 4 — LEARNING SCENARIO */}
      <section className="border rounded-2xl p-6 space-y-4">
        <h3 className="font-semibold text-lg">Part 4 — Learning Scenario</h3>
        <div className="space-y-2">
          {["Late Starter", "Advanced Learner", "Slow Learner", "Not Sure"].map((type) => (
            <label key={type} className="flex gap-2">
              <input type="radio" name="scenario" value={type} onChange={(e) => handleChange("learningNeeds", e.target.value)} />
              {type}
            </label>
          ))}
        </div>
      </section>

      {/* PART 5 — CURRENT PERFORMANCE */}
      <section className="border rounded-2xl p-6 space-y-4">
        <h3 className="font-semibold text-lg">Part 5 — Current Performance</h3>

        <div>
          <label className="block font-medium">Current Average % or Grade</label>
          <input type="text" className="w-full border rounded-lg p-2" placeholder="e.g., 75% or A-" value={formData.average} onChange={(e) => handleChange("average", e.target.value)} required />
        </div>

        <div>
          <label className="block font-medium">Biggest Academic Struggle</label>
          <textarea className="w-full border rounded-lg p-2" placeholder="Describe your biggest academic struggle" value={formData.struggle} onChange={(e) => handleChange("struggle", e.target.value)} required />
        </div>

        <div>
          <label className="block font-medium">Previous Tutor Experience</label>
          <label className="flex gap-2">
            <input type="radio" name="prevExp" value="yes" onChange={(e) => handleChange("previousTutorExp", e.target.value)} />
            Yes
          </label>
          <label className="flex gap-2">
            <input type="radio" name="prevExp" value="no" onChange={(e) => handleChange("previousTutorExp", e.target.value)} />
            No
          </label>
        </div>
      </section>

      {/* PART 6 — SCHEDULE PREFERENCES */}
      <section className="border rounded-2xl p-6 space-y-4">
        <h3 className="font-semibold text-lg">Part 6 — Schedule Preferences</h3>

        <div>
          <label className="block font-medium">Availability</label>
          <label className="flex gap-2">
            <input type="checkbox" onChange={(e) => e.target.checked && handleChange("availability", "Weekdays")} />
            Weekdays
          </label>
          <label className="flex gap-2">
            <input type="checkbox" onChange={(e) => e.target.checked && handleChange("availability", "Weekends")} />
            Weekends
          </label>
        </div>

       <div>
  <label htmlFor="timeSlot" className="block font-medium">
    Preferred Time
  </label>
  <select
    id="timeSlot"
    className="w-full border rounded-lg p-2"
    value={formData.timeSlot}
    onChange={(e) => handleChange("timeSlot", e.target.value)}
  >
    <option value="">Select time</option>
    <option value="Morning (8AMâ€“12PM)">Morning (8AMâ€“12PM)</option>
    <option value="Afternoon (12â€“4PM)">Afternoon (12â€“4PM)</option>
    <option value="Evening (4â€“9PM)">Evening (4â€“9PM)</option>
  </select>
</div>

<div>
  <label htmlFor="sessionsPerWeek" className="block font-medium">
    Sessions Per Week
  </label>
  <select
    id="sessionsPerWeek"
    className="w-full border rounded-lg p-2"
    value={formData.sessionsPerWeek}
    onChange={(e) => handleChange("sessionsPerWeek", e.target.value)}
    required
  >
    <option value="">Select frequency</option>
    <option value="1x">1x</option>
    <option value="2x">2x</option>
    <option value="3x">3x</option>
    <option value="Flexible">Flexible</option>
  </select>
</div>

{/* PART 7 */}

<div>
  <label htmlFor="learningGoals" className="block font-medium">
    3-Month Learning Goals
  </label>
  <textarea
    id="learningGoals"
    className="w-full border rounded-lg p-2"
    placeholder="What do you want to achieve in 3 months?"
    value={formData.learningGoals}
    onChange={(e) => handleChange("learningGoals", e.target.value)}
  />
</div>

<div>
  <label htmlFor="tutorPreference" className="block font-medium">
    Preferred Tutor Style
  </label>
  <select
    id="tutorPreference"
    className="w-full border rounded-lg p-2"
    value={formData.tutorPreference}
    onChange={(e) => handleChange("tutorPreference", e.target.value)}
  >
    <option value="">Select preference</option>
    <option value="Patient & Encouraging">Patient & Encouraging</option>
    <option value="Strict & Disciplined">Strict & Disciplined</option>
    <option value="Friendly & Casual">Friendly & Casual</option>
    <option value="No preference">No preference</option>
  </select>
</div>

        <div>
          <label className="block font-medium">How did you hear about EduMeUp?</label>
          <input type="text" className="w-full border rounded-lg p-2" placeholder="Social media, friend, search, etc." value={formData.heardFrom} onChange={(e) => handleChange("heardFrom", e.target.value)} />
        </div>

        <div>
          <label className="block font-medium">Any specific tutor requests?</label>
          <textarea className="w-full border rounded-lg p-2" placeholder="Any preferences or requirements" value={formData.tutorRequest} onChange={(e) => handleChange("tutorRequest", e.target.value)} />
        </div>
      </section>

      {/* PART 8 — CONSENT */}
      <section className="border rounded-2xl p-6 space-y-4">
        <h3 className="font-semibold text-lg">Part 8 — Parent Consent</h3>
        <label className="flex gap-2">
          <input type="checkbox" checked={formData.parentConsent} onChange={(e) => handleChange("parentConsent", e.target.checked)} required />
          I authorize this application and agree to EduMeUp's terms
        </label>
      </section>

      <div className="flex justify-center pt-4">
        <button type="submit" className="bg-[#2366c9] hover:bg-blue-500 text-white font-semibold px-10 py-3 rounded-2xl shadow-lg transition">
          Submit Student Application
        </button>
      </div>
    </form>
  );
}
export function TutorApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    educationQualification: "",
    degree: "",
    degreeField: "",
    certifications: "",
    yearsExperience: "",
    hourlyRate: "",
    subjects: [] as string[],
    grades: [] as string[],
    teachingLevel: "",
    teachingMode: "",
    languages: [] as string[],
    availability: "",
    timezone: "",
    referenceName: "",
    referenceEmail: "",
    referencePhone: "",
    digitalSkills: {
      zoom: 1,
      googleMeet: 1,
      googleClassroom: 1,
      whiteboard: 1,
      moodle: 1,
      screenRecording: 1,
    },
    uploads: {
      cv: null as File | null,
      degreeCertificate: null as File | null,
      demoLesson: null as File | null,
    },
    agreements: {
      smkTest: false,
      digitalQuiz: false,
      orientation: false,
      independence: false,
      codeOfConduct: false,
    },
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (category: 'digitalSkills' | 'uploads' | 'agreements', field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.educationQualification.trim()) {
      alert("Please enter your Education / Qualification.");
      return;
    }

    if (formData.subjects.length === 0) {
      alert("Please select at least one subject you can teach.");
      return;
    }

    if (!formData.teachingLevel) {
      alert("Please select a Teaching Level (O-Level or IGCSE).");
      return;
    }

    if (!formData.teachingMode) {
      alert("Please select a Teaching Mode (Online or Physical).");
      return;
    }

    console.log("Submitting tutor application", formData);
    alert("Application submitted! We will review it in 48 hrs.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto px-2 text-left">
      
      {/* Part 1 — Personal Information */}
      <section className="p-5 border rounded-2xl bg-white shadow-sm space-y-4">
        <h3 className="font-semibold text-lg text-blue-900 border-b pb-2">Part 1 — Personal Information</h3>
        
        <div className="grid gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="text-[14px] font-semibold text-gray-700">Full Name</label>
            <input 
              id="fullName" 
              type="text" 
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.fullName} 
              onChange={e => handleChange("fullName", e.target.value)} 
              required 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="dateOfBirth" className="text-[14px] font-semibold text-gray-700">Date of Birth</label>
            <input 
              id="dateOfBirth" 
              type="date" 
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.dateOfBirth} 
              onChange={e => handleChange("dateOfBirth", e.target.value)} 
              required 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-[14px] font-semibold text-gray-700">Email Address</label>
            <input 
              id="email" 
              type="email" 
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.email} 
              onChange={e => handleChange("email", e.target.value)} 
              required 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-[14px] font-semibold text-gray-700">Phone Number</label>
            <input 
              id="phone" 
              type="tel" 
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.phone} 
              onChange={e => handleChange("phone", e.target.value)} 
              required 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="country" className="text-[14px] font-semibold text-gray-700">Country</label>
            <input 
              id="country" 
              type="text" 
              placeholder="e.g., Pakistan, USA, UK"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.country} 
              onChange={e => handleChange("country", e.target.value)} 
              required 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="city" className="text-[14px] font-semibold text-gray-700">City</label>
            <input 
              id="city" 
              type="text" 
              placeholder="e.g., Lahore, Karachi, Islamabad"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.city} 
              onChange={e => handleChange("city", e.target.value)} 
              required 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="timezone" className="text-[14px] font-semibold text-gray-700">Time Zone</label>
            <input 
              id="timezone" 
              type="text" 
              placeholder="e.g., UTC+5 (Pakistan)"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.timezone} 
              onChange={e => handleChange("timezone", e.target.value)} 
              required 
            />
          </div>
        </div>
      </section>

      {/* Part 2 — Qualifications */}
      <section className="p-5 border rounded-2xl bg-white shadow-sm space-y-4">
        <h3 className="font-semibold text-lg text-blue-900 border-b pb-2">Part 2 — Qualifications & Experience</h3>

        <div className="grid gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="educationQualification" className="text-[14px] font-semibold text-gray-700">Education / Qualification</label>
            <input
              id="educationQualification"
              type="text"
              placeholder="e.g., B.Ed, M.Sc Mathematics"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.educationQualification}
              onChange={e => handleChange("educationQualification", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="degree" className="text-[14px] font-semibold text-gray-700">Bachelor's Degree</label>
            <input 
              id="degree" 
              type="text" 
              placeholder="e.g., B.Sc Physics"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.degree} 
              onChange={e => handleChange("degree", e.target.value)} 
              required 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="degreeField" className="text-[14px] font-semibold text-gray-700">Subject of Expertise</label>
            <input 
              id="degreeField" 
              type="text" 
              placeholder="e.g., Physics, Mathematics, Chemistry"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.degreeField} 
              onChange={e => handleChange("degreeField", e.target.value)} 
              required 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="yearsExp" className="text-[14px] font-semibold text-gray-700">Years Cambridge/O-Level Experience</label>
            <input 
              id="yearsExp" 
              type="number" 
              min="0"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.yearsExperience} 
              onChange={e => handleChange("yearsExperience", e.target.value)} 
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="certifications" className="text-[14px] font-semibold text-gray-700">Additional Certifications</label>
            <input 
              id="certifications" 
              type="text" 
              placeholder="e.g., TEFL, TOEFL, etc. (optional)"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.certifications} 
              onChange={e => handleChange("certifications", e.target.value)} 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="hourlyRate" className="text-[14px] font-semibold text-gray-700">Desired Hourly Rate (USD)</label>
            <input 
              id="hourlyRate" 
              type="text" 
              placeholder="e.g., 15, 20, 25"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.hourlyRate} 
              onChange={e => handleChange("hourlyRate", e.target.value)} 
              required
            />
          </div>
        </div>
      </section>

      {/* Part 3 — Teaching Subjects & Grades */}
      <section className="p-5 border rounded-2xl bg-white shadow-sm space-y-4">
        <h3 className="font-semibold text-lg text-blue-900 border-b pb-2">Part 3 — Subjects & Grade Levels</h3>

        <div>
          <label className="text-[14px] font-semibold text-gray-700 mb-2 block">Subject(s) They Can Teach</label>
          <div className="grid grid-cols-2 gap-2">
            {["Mathematics", "Physics", "Chemistry", "Biology", "English Language", "Economics", "Business Studies", "Computer Science"].map((subject) => (
              <label key={subject} className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={formData.subjects.includes(subject)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({ ...formData, subjects: [...formData.subjects, subject] });
                    } else {
                      setFormData({ ...formData, subjects: formData.subjects.filter(s => s !== subject) });
                    }
                  }}
                />
                {subject}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[14px] font-semibold text-gray-700 mb-2 block">Grade Levels You Teach</label>
          <div className="grid grid-cols-2 gap-2">
            {["Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Pre-O-Level", "O-Level", "A-Level"].map((grade) => (
              <label key={grade} className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={formData.grades.includes(grade)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({ ...formData, grades: [...formData.grades, grade] });
                    } else {
                      setFormData({ ...formData, grades: formData.grades.filter(g => g !== grade) });
                    }
                  }}
                />
                {grade}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[14px] font-semibold text-gray-700 mb-2 block">Teaching Level</label>
          <div className="space-y-2">
            {["O-Level", "IGCSE"].map((level) => (
              <label key={level} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="teachingLevel"
                  value={level}
                  checked={formData.teachingLevel === level}
                  onChange={(e) => handleChange("teachingLevel", e.target.value)}
                  required
                />
                {level}
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* Part 4 — Teaching Mode & Languages */}
      <section className="p-5 border rounded-2xl bg-white shadow-sm space-y-4">
        <h3 className="font-semibold text-lg text-blue-900 border-b pb-2">Part 4 — Teaching Mode & Languages</h3>

        <div>
          <label className="text-[14px] font-semibold text-gray-700 mb-2 block">Teaching Mode</label>
          <div className="space-y-2">
            {["Online", "Physical"].map((mode) => (
              <label key={mode} className="flex items-center gap-2">
                <input 
                  type="radio"
                  name="teachingMode"
                  value={mode}
                  checked={formData.teachingMode === mode}
                  onChange={(e) => handleChange("teachingMode", e.target.value)}
                  required
                />
                {mode}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[14px] font-semibold text-gray-700 mb-2 block">Languages You Speak</label>
          <div className="grid grid-cols-2 gap-2">
            {["English", "Urdu", "Arabic", "French", "Spanish", "Mandarin"].map((lang) => (
              <label key={lang} className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={formData.languages.includes(lang)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({ ...formData, languages: [...formData.languages, lang] });
                    } else {
                      setFormData({ ...formData, languages: formData.languages.filter(l => l !== lang) });
                    }
                  }}
                />
                {lang}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="availability" className="text-[14px] font-semibold text-gray-700">Availability</label>
          <select 
            id="availability"
            className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            value={formData.availability} 
            onChange={e => handleChange("availability", e.target.value)} 
            required
          >
            <option value="">Select availability</option>
            <option>Weekdays only</option>
            <option>Weekends only</option>
            <option>Both weekdays and weekends</option>
          </select>
        </div>
      </section>

      {/* Part 5 — Digital Skills */}
      <section className="p-5 border rounded-2xl bg-white shadow-sm">
        <h3 className="font-semibold text-lg text-blue-900 border-b pb-2 mb-4">Part 5 — Digital Skills (Rate 1-5)</h3>
        {Object.keys(formData.digitalSkills).map(skill => (
          <div key={skill} className="flex items-center justify-between mb-3">
            <label htmlFor={`skill-${skill}`} className="text-[14px] font-medium capitalize">
              {skill.replace(/([A-Z])/g, " $1")}
            </label>
            <input 
              id={`skill-${skill}`}
              type="number" 
              min={1} 
              max={5} 
              className="w-16 p-1 border rounded text-center" 
              value={(formData.digitalSkills as any)[skill]} 
              onChange={e => handleNestedChange("digitalSkills", skill, Number(e.target.value))} 
            />
          </div>
        ))}
      </section>

      {/* Part 6 — Professional References */}
      <section className="p-5 border rounded-2xl bg-white shadow-sm space-y-4">
        <h3 className="font-semibold text-lg text-blue-900 border-b pb-2">Part 6 — Professional Reference</h3>
        
        <div className="grid gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="refName" className="text-[14px] font-semibold text-gray-700">Reference Name</label>
            <input 
              id="refName" 
              type="text" 
              placeholder="Name of teacher/principal/supervisor"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.referenceName} 
              onChange={e => handleChange("referenceName", e.target.value)} 
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="refEmail" className="text-[14px] font-semibold text-gray-700">Reference Email</label>
            <input 
              id="refEmail" 
              type="email" 
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.referenceEmail} 
              onChange={e => handleChange("referenceEmail", e.target.value)} 
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="refPhone" className="text-[14px] font-semibold text-gray-700">Reference Phone</label>
            <input 
              id="refPhone" 
              type="tel" 
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.referencePhone} 
              onChange={e => handleChange("referencePhone", e.target.value)} 
              required
            />
          </div>
        </div>
      </section>

      {/* Part 7 — File Uploads */}
      <section className="p-5 border rounded-2xl bg-white shadow-sm space-y-4">
        <h3 className="font-semibold text-lg text-blue-900 border-b pb-2">Part 7 — Uploads</h3>
        
        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor="cv-upload" className="block text-[14px] font-semibold mb-1">CV / Resume (PDF)</label>
            <input 
              id="cv-upload" 
              type="file" 
              accept=".pdf,.doc,.docx"
              title="Select your CV file"
              className="text-[14px] w-full"
              onChange={e => handleNestedChange("uploads", "cv", e.target.files?.[0])} 
              required
            />
          </div>

          <div>
            <label htmlFor="degree-upload" className="block text-[14px] font-semibold mb-1">Degree Certificate (PDF/Image)</label>
            <input 
              id="degree-upload" 
              type="file" 
              accept=".pdf,.jpg,.jpeg,.png"
              title="Select your degree certificate"
              className="text-[14px] w-full"
              onChange={e => handleNestedChange("uploads", "degreeCertificate", e.target.files?.[0])} 
              required
            />
          </div>

          <div>
            <label htmlFor="demo-upload" className="block text-[14px] font-semibold mb-1">Demo Lesson Video (5-10 min)</label>
            <input 
              id="demo-upload" 
              type="file" 
              accept="video/*"
              title="Select your demo lesson video"
              className="text-[14px] w-full"
              onChange={e => handleNestedChange("uploads", "demoLesson", e.target.files?.[0])} 
              required
            />
          </div>
        </div>
      </section>

      {/* Part 8 — Agreements */}
      <section className="p-5 border rounded-2xl bg-white shadow-sm space-y-4">
        <h3 className="font-semibold text-lg text-blue-900 border-b pb-2">Part 8 — Agreements & Certifications</h3>
        
        <label className="flex items-start gap-2">
          <input 
            type="checkbox" 
            checked={formData.agreements.smkTest}
            onChange={e => handleNestedChange("agreements", "smkTest", e.target.checked)}
            className="mt-1"
            required
          />
          <span className="text-[14px] text-gray-700">I agree to take the SMK Mastery Test (30 min, 85% minimum passing)</span>
        </label>

        <label className="flex items-start gap-2">
          <input 
            type="checkbox" 
            checked={formData.agreements.digitalQuiz}
            onChange={e => handleNestedChange("agreements", "digitalQuiz", e.target.checked)}
            className="mt-1"
            required
          />
          <span className="text-[14px] text-gray-700">I agree to complete the Digital Skills Quiz & demonstrate online teaching competency</span>
        </label>

        <label className="flex items-start gap-2">
          <input 
            type="checkbox" 
            checked={formData.agreements.orientation}
            onChange={e => handleNestedChange("agreements", "orientation", e.target.checked)}
            className="mt-1"
            required
          />
          <span className="text-[14px] text-gray-700">I commit to completing the SMK Framework Orientation training</span>
        </label>

        <label className="flex items-start gap-2">
          <input 
            type="checkbox" 
            checked={formData.agreements.independence}
            onChange={e => handleNestedChange("agreements", "independence", e.target.checked)}
            className="mt-1"
            required
          />
          <span className="text-[14px] text-gray-700">I understand and accept the independence-building model (tutoring phase-out strategy)</span>
        </label>

        <label className="flex items-start gap-2">
          <input 
            type="checkbox" 
            checked={formData.agreements.codeOfConduct}
            onChange={e => handleNestedChange("agreements", "codeOfConduct", e.target.checked)}
            className="mt-1"
            required
          />
          <span className="text-[14px] text-gray-700">I agree to EduMeUp's Code of Conduct & professionalism standards</span>
        </label>
      </section>

      <button type="submit" className="w-full bg-[#2366c9] text-white font-semibold px-6 py-4 rounded-xl shadow-lg hover:bg-blue-600 transition-colors active:scale-95">
        Submit Tutor Application
      </button>
    </form>
  );
}

export default function Tutors() {
  const faqs = [
    {
      q: "Can I use platform without tutor?",
      a: "Yes. If your foundation is strong and you are self-motivated, platform-only learning is fully effective."
    },
    {
      q: "How long is tutoring needed?",
      a: "Most students need 3â€“6 months. Tutors are phased out once independence develops."
    },
    {
      q: "Any hidden costs?",
      a: "No. Pricing is transparent. Platform access is included free with tutoring."
    },
    {
      q: "Can I switch tutors?",
      a: "Yes. Free tutor replacement is available anytime if needed."
    },
    {
      q: "Is platform included free?",
      a: "Yes. Platform worth $360â€“$720/year is included with tutoring."
    },
    {
      q: "Do tutors follow school syllabus?",
      a: "Yes. Tutors align with school syllabus while strengthening foundational gaps."
    },
    {
      q: "How is progress tracked?",
      a: "Parents and tutors get dashboard analytics, session feedback, and progress reports."
    },
    {
      q: "What if student becomes independent early?",
      a: "Great — tutoring hours reduce and student transitions to platform-only learning."
    },
    {
      q: "Are sessions recorded?",
      a: "Yes. Sessions are recorded for quality monitoring and review."
    },
    {
      q: "Do you offer refunds?",
      a: "Yes. First-month refund available within 4 sessions if unsatisfied."
    },
    {
      q: "Can siblings share plan?",
      a: "No. Each student receives individualized dashboard, analytics, and learning path."
    },
    {
      q: "Is diagnostic mandatory?",
      a: "Yes. Diagnostic ensures correct tutor matching and learning strategy."
    }
  ];      const [open, setOpen] = useState<number | null>(null);
  return (
    <Layout>
      {/* SECTION 1: HERO */}
      <section className="bg-[#2366c9] py-16 md:py-32 text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.2)_0%,transparent_50%)]"></div>
        <div className="container-custom relative z-10 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-7xl text-white font-semibold font-display mb-6 leading-tight">
              NOT TRADITIONAL <br/><span className="text-blue-400">Tutoring</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto mb-4 font-semibold">
              Strategic Scaffolding Toward Independent Learning
            </p>
            <p className="text-[14px] text-blue-200 max-w-4xl mx-auto mb-8">
              SMK-Aligned Tutors + Research-Backed Platform + Proven Independence Model<br/>
              Powered by: MoodleÂ 4.5.1â€¯LMS Â· H5P Interactive Activities Â· AI Chatbot Â· Multilingual Support
            </p>
            <p className="text-[14px] text-blue-200 font-semibold mb-12">LAUNCHING MARCHâ€¯2026 — Early applications open</p>

            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto bg-white/5 p-16 rounded-[3rem] border-4 border-white/10 backdrop-blur-sm text-left items-center">
              <div>
                <h3 className="text-3xl font-semibold mb-6 text-blue-400">The EduMeUp difference</h3>
                <div className="space-y-4">
                  {[
                    "Builds toward independence",
                    "Platform-first + tutor support",
                    "SMK-aligned teaching",
                    "3 specific learning scenarios",
                    "Transparent dashboards",
                    "Phase out tutor support"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-[14px] font-semibold text-white/80 border-b border-white/5 pb-2">
                       <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0" />
                       <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <div className="bg-blue-600/20 p-8 rounded-3xl border-2 border-blue-500/30">
                  <p className="text-blue-400 font-semibold text-xs mb-4">For specific learning needs:</p>
                  <ul className="space-y-3">
                    <li className="text-white font-semibold text-[14px]"> Late Starters</li>
                    <li className="text-white font-semibold text-[14px]"> Advanced Learners</li>
                    <li className="text-white font-semibold text-[14px]"> Slow Learners</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-4">
                  <InquiryDialog 
                    defaultType="tutor_application"
                    title="Student Tutoring Application"
                    trigger={
                      <Button size="lg" className="w-full bg-white text-slate-900 hover:bg-blue-50 h-10 rounded-lg font-semibold shadow-md">Apply as student</Button>
                    }
                  />
                  <InquiryDialog 
                    defaultType="tutor_application"
                    title="Tutor Application"
                    trigger={
                      <Button size="lg" className="w-full bg-white text-slate-900 hover:bg-blue-50 h-10 rounded-lg font-semibold shadow-md">Become an SMK Certified (Subject Master Knowledge Certified) tutor</Button>
                    }
                  />
                  <Link href="/programs">
                    <Button size="lg" variant="ghost" className="w-full text-blue-400 hover:text-white font-semibold">Explore platform first</Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="py-16 bg-blue-50">
        <div className="container-custom max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h4 className="text-3xl font-semibold text-blue-400 mb-2">91%</h4>
              <p className="text-xs font-semibold text-slate-900">Pass rate</p>
              <p className="text-[14px] text-slate-900/40 mt-2">vs 35% National</p>
            </div>
            <div>
              <h4 className="text-3xl font-semibold text-blue-400 mb-2">47%</h4>
              <p className="text-xs font-semibold text-slate-900">A/A* grades</p>
              <p className="text-[14px] text-slate-900/40 mt-2">vs 18% Traditional</p>
            </div>
            <div>
              <h4 className="text-3xl font-semibold text-blue-400 mb-2">75%+</h4>
              <p className="text-xs font-semibold text-slate-900">Retention</p>
              <p className="text-[14px] text-slate-900/40 mt-2">vs 5-10% Traditional</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PHILOSOPHY */}
      <section className="py-20 md:py-40 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center max-w-4xl mx-auto mb-32">
             <h2 className="text-5xl md:text-6xl font-display font-semibold mb-8 text-slate-900 leading-tight">Why scaffolding, <span className="text-[#2366c9]">not crutches</span></h2>
             <p className="text-xl text-slate-900/40 font-semibold">Building independence, fast</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-24 items-start mb-40">
             <Card className="border-[#2366c9]  border-2 bg-red-50 p-16 rounded-[3rem] border-4 border-red-100 shadow-xl hover:shadow-2xl transition-all">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-semibold mb-10 text-red-600">Traditional tutoring trap</h3>
                  <div className="flex items-center justify-between text-center gap-4">
                     <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm font-semibold text-xs">Student</div>
                     <ArrowRight className="text-red-400" />
                     <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm font-semibold text-xs">Tutor</div>
                     <ArrowRight className="text-red-400" />
                     <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm font-semibold text-xs text-red-600">Dependency</div>
                  </div>
                  <p className="mt-12 text-red-900/60 font-semibold leading-relaxed">Students become helpless without tutor guidance. You pay forever. We call this the business of dependency.</p>
                </CardContent>
             </Card>
             <Card className="border-[#2366c9]  border-2 bg-green-50 p-16 rounded-[3rem] border-4 border-green-100 shadow-xl hover:shadow-2xl transition-all">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-semibold mb-10 text-green-600">EduMeUp independence model</h3>
                  <div className="flex items-center justify-between text-center gap-4">
                     <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm font-semibold text-xs">Platform</div>
                     <ArrowRight className="text-green-400" />
                     <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm font-semibold text-xs">Tutor</div>
                     <ArrowRight className="text-green-400" />
                     <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm font-semibold text-xs text-green-600">Independence</div>
                  </div>
                  <p className="mt-12 text-green-900/60 font-semibold leading-relaxed">Tutoring is TEMPORARY. Our goal is to gain self-learning capabilities and phase the tutor out entirely.</p>
                </CardContent>
             </Card>
          </div>

          <div className="bg-[#2366c9] p-20 rounded-[5rem] text-white shadow-3xl relative overflow-hidden">
             <div className="grid lg:grid-cols-3 gap-16 relative z-10">
                {[
                  { t: "Platform is PRIMARY", d: "Our 10X Learning Leap Modelâ„¢ teaches students HOW to learn." },
                  { t: "Tutors are SUPPLEMENTAL", d: "For specific needs only (catch-up, advanced, differentiated)." },
                  { t: "Independence is GOAL", d: "Students transition to self-directed platform learning fast." }
                ].map((item, i) => (
                  <div key={i} className="space-y-6">
                    <div className="h-16 w-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-semibold text-2xl shadow-xl">{i+1}</div>
                    <h4 className="text-2xl font-semibold text-blue-400">{item.t}</h4>
                    <p className="text-blue-100/60 font-medium leading-relaxed">{item.d}</p>
                  </div>
                ))}
             </div>
             <p className="mt-8 text-white/90 font-semibold">
               Every session integrates Moodle 4.5.1, H5P interactive activities, and our AI chatbot — so learning never stops between sessions.
             </p>
             <p className="mt-6 font-semibold text-blue-200">
               THE 3â€‘STAGE SCAFFOLDING PROCESS:
             </p>
             <div className="mt-4 grid md:grid-cols-3 gap-6 text-white">
               {[
                 { stage: "StageÂ 1: Intensive", timeline: "MonthsÂ 1â€“3", hours: "8â€“12â€¯hrs/month", role: "Guided usage" },
                 { stage: "StageÂ 2: Gradual Independence", timeline: "MonthsÂ 4â€“6", hours: "4â€“6â€¯hrs/month", role: "Student-led" },
                 { stage: "StageÂ 3: Platform-Only", timeline: "MonthÂ 7+", hours: "0â€“2â€¯hrs/month", role: "Full independence" }
               ].map((item,i)=>(
                 <div key={i} className="bg-white/20 p-6 rounded-2xl">
                   <h4 className="font-semibold mb-2 text-lg text-white">{item.stage}</h4>
                   <p className="text-[14px] text-white"><span className="font-semibold">Timeline:</span> {item.timeline}</p>
                   <p className="text-[14px] text-white"><span className="font-semibold">Tutor hours:</span> {item.hours}</p>
                   <p className="text-[14px] text-white"><span className="font-semibold">Platform role:</span> {item.role}</p>
                 </div>
               ))}
             </div>
             <p className="mt-6 font-semibold text-blue-200">
               SMK Framework: Subject Matter Knowledge Â· Metacognitive Skills Â· Platform Integration Â· Independence Building
             </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHO NEEDS TUTORS */}
      <section className="py-20 md:py-40 bg-blue-50">
        <div className="container-custom max-w-6xl">
          <div className="text-center max-w-4xl mx-auto mb-32">
             <h2 className="text-4xl md:text-5xl font-display font-semibold mb-8 text-slate-900 leading-tight">Who needs <span className="text-[#2366c9]">scaffolding?</span></h2>
             <p className="text-lg text-slate-900/40 font-semibold">3 specific strategic scenarios</p>
          </div>

         
            <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                id: "A",
                title: "LATE STARTERS",
                sub: "Catch-Up Support",
                for: "Missed Foundational O-Level Bridge Courses / weak O-Level foundation",
                role: "Intensive remedial instruction targeting exact foundational gaps.",
                goal: "Platform independence in 3â€“6 months."
              },
              {
                id: "B",
                title: "ADVANCED LEARNERS",
                sub: "Beyond-Routine Excellence",
                for: "Scoring 75â€“85%, targeting A* (90%+) with depth beyond syllabus.",
                role: "Advanced problem sets and exam strategy coaching.",
                goal: "6â€“12 months strategic support with occasional checkâ€‘ins."
              },
              {
                id: "C",
                title: "SLOW LEARNERS",
                sub: "Differentiated Support",
                for: "Below 50%, needs slower pace and human patience.",
                role: "Break concepts into smaller steps and build confidence with small wins.",
                goal: "6â€“12 months to reach gradeâ€‘level competency via platform guidance."
              }
            ].map((scen, i) => (
              <Card key={i} className="rounded-[3rem] border-4 border-white shadow-2xl hover:border-[#2366c9] transition-all group bg-white flex flex-col h-full overflow-hidden">
                 <CardContent className="p-16 flex-1 flex flex-col">
                    <div className="h-20 w-20 bg-[#2366c9] text-blue-400 rounded-3xl flex items-center justify-center mb-10 font-semibold text-4xl shadow-xl group-hover:bg-[#2366c9] group-hover:text-white transition-all">{scen.id}</div>
                    <h3 className="text-2xl font-semibold mb-2 text-slate-900">{scen.title}</h3>
                    <p className="text-blue-600 font-semibold text-[14px] mb-10">{scen.sub}</p>
                    <div className="space-y-8 flex-1">
                       <div>
                          <p className="text-[14px] font-semibold text-slate-900/40 mb-2">Ideal for</p>
                          <p className="text-[14px] font-semibold text-slate-900">{scen.for}</p>
                       </div>
                       <div>
                          <p className="text-[14px] font-semibold text-slate-900/40 mb-2">Tutor's role</p>
                          <p className="text-[14px] font-semibold text-slate-900">{scen.role}</p>
                       </div>
                       <div className="pt-8 border-t border-blue-50">
                          <p className="text-green-600 font-semibold text-xs mb-2">Outcome goal</p>
                          <p className="text-[14px] font-semibold text-slate-900">{scen.goal}</p>
                       </div>
                    </div>
                 </CardContent>
              </Card>
            ))}
            </div>
          

          <div className="mt-32 p-16 bg-red-50 rounded-[3rem] border-4 border-red-100 text-center max-w-4xl mx-auto">
             <h3 className="text-2xl font-semibold text-red-600 mb-4">Who doesn't need tutors?</h3>
             <p className="text-slate-900 font-semibold">Students scoring 50%+, with a solid foundation and completed diagnostics/Foundational O-Level Bridge Courses - platform alone is sufficient. Save money, build independence immediately.</p>
          </div>
        </div>
      </section>
      {/* SECTION 4: PROCESS */}
      <section className="py-20 md:py-40 bg-white">
        <div className="container-custom max-w-6xl">
           <div className="text-center max-w-4xl mx-auto mb-32">
             <h2 className="text-4xl md:text-5xl font-display font-semibold mb-8 text-slate-900 leading-tight">Your scaffolding <span className="text-[#2366c9]">journey</span></h2>
             <p className="text-lg text-slate-900/40 font-semibold">From application to independence</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
             {[
               { t: "Day 0â€“2", d: "Free diagnostic test (30â€“40â€¯min) + 20â€‘min consultation call — decide platform-only or tutoring scenario.", icon: Microscope },
               { t: "Day 3â€“5", d: "Tutor matched Â· platform account created free Â· parent dashboard activated Â· first session plan set.", icon: UserCheck },
               { t: "Months 1â€“3", d: "8â€“12â€¯hrs/month | Tutor assigns H5P activities on Moodle | Weekly progress reports.", icon: Zap },
               { t: "Months 4â€“6", d: "4â€“6â€¯hrs/month | Teaching shifts to coaching | Student becomes primary learner.", icon: Target },
               { t: "Month 7+", d: "0â€“2â€¯hrs/month | Student fully independent on platform — SUCCESS.", icon: CheckCircle2 }
             ].map((step, i) => (
               <div key={i} className="text-center space-y-8 group">
                  <div className="mx-auto h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center text-[#2366c9] group-hover:bg-[#2366c9] group-hover:text-white transition-all shadow-xl">
                     <step.icon className="h-10 w-10" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900">{step.t}</h4>
                  <p className="text-[14px] text-slate-900/60 font-medium">{step.d}</p>
               </div>
             ))}
          </div>

        </div>
      </section>
      {/* SECTION 5: WHAT'S INCLUDED */}
      <section className="py-20 md:py-40 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center max-w-4xl mx-auto mb-32">
            <h2 className="text-4xl md:text-5xl font-display font-semibold mb-8 text-slate-900 leading-tight">What's <span className="text-[#2366c9]">included</span></h2>
          </div>
        
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  title: "SMKâ€‘Aligned Tutors",
                  desc: "SMKâ€‘trained + platformâ€‘integrated + independenceâ€‘focused + scenarioâ€‘specific + digitally verified.",
                  color: "bg-red-50",
                  border: "border-red-100",
                },
                {
                  title: "Platform Access FREE",
                  desc: "Diagnostic tests â€¢ study materials â€¢ AI chatbot (24/7) â€¢ translator â€¢ audio features â€¢ Moodle analytics â€¢ spaced repetition ($360â€‘720 value).",
                  color: "bg-blue-50",
                  border: "border-blue-100",
                },
                {
                  title: "Transparent Monitoring",
                  desc: "Parent dashboard (session tracking, weekly reports, independence stage) + Tutor dashboard (Moodleâ€‘integrated, H5P assignment, student analytics).",
                  color: "bg-green-50",
                  border: "border-green-100",
                }
              ].map((item,i)=>(
                <div key={i} className={`${item.color} p-16 rounded-[3rem] border-4 ${item.border} shadow-xl`}> 
                  <h3 className="text-2xl font-semibold mb-4 text-slate-900">{item.title}</h3>
                  <p className="text-slate-900/80 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
     
      </section>

     {/* SECTION 6: TUTOR CERTIFICATION & DIGITAL VERIFICATION â­ [NEW] */}
 
<section className="py-16 md:py-32 bg-gradient-to-b from-white to-blue-50">
  <div className="container-custom max-w-5xl mx-auto text-center">
    <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6 text-slate-900">
      Tutor <span className="text-[#2366c9]">Certification & Digital Verification </span>
    </h2>
    <p className="text-lg md:text-xl mb-16 text-slate-900/80">
      Only <span className="font-semibold text-[#2366c9]">15â€“20%</span> of applicants become certified. Here’s how we ensure quality:
    </p>

    {/* Accordion Timeline */}
    <div className="space-y-6 text-left">
      {[
        {
          step: 1,
          title: "Credentials Screening",
          icon: <UserCheck className="h-6 w-6 text-white" />,
          description: "Bachelor’s degree in subject + 3 years Cambridge/O-Level experience + professional references + background check.",
        },
        {
          step: 2,
          title: "SMK Mastery Test",
          icon: <BookOpen className="h-6 w-6 text-white" />,
          description: (
            <ul className="space-y-1">
              {[
                "30â€‘minute proctored exam on Moodle Safe Exam Browser",
                "Locked full-screen; no tab switching",
                "No copy/paste; no other browser/app access",
                "Randomized question bank mapped to Cambridge syllabus",
                "Minimum passing score: 85%",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-[#2366c9] rounded-full mt-1"></span>
                  <span className="text-[14px] text-slate-900/80">{item}</span>
                </li>
              ))}
            </ul>
          ),
        },
        {
          step: 3,
          title: "Digital Competency Check",
          icon: <Zap className="h-6 w-6 text-white" />,
          description: (
            <>
              <p className="font-semibold mb-2">Step A — Online Tools Quiz (15 min)</p>
              <ul className="flex flex-wrap gap-4 mb-2">
                {["Zoom/Google Meet", "Google Classroom", "Digital Whiteboard", "Moodle LMS", "H5P Assignment"].map((item, i) => (
                  <li key={i} className="bg-blue-50 text-[#2366c9] px-3 py-1 rounded-full text-[14px] font-medium">{item}</li>
                ))}
              </ul>
              <p className="font-semibold mb-1">Step B — Live 10â€‘Minute Call</p>
              <p className="text-[14px] text-slate-900/80">Tutor demonstrates screen sharing, whiteboard explanation, Moodle navigation, and assigning an H5P activity.</p>
            </>
          ),
        },
        {
          step: 4,
          title: "SMK Framework Orientation",
          icon: <GraduationCap className="h-6 w-6 text-white" />,
          description: "10X Learning Leap Modelâ„¢ Â· Scaffolding principles Â· Metacognitive coaching Â· Platform integration Â· Progress monitoring.",
        },
      ].map((layer) => (
        <Disclosure key={layer.step} as="div" className="border-l-4 border-blue-200 pl-12 relative">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex items-center justify-between w-full py-4 text-left">
                <div className="flex items-center gap-4">
                  <div className={`flex items-center justify-center h-10 w-10 rounded-full bg-[#2366c9] text-white font-semibold text-lg`}>
                    {layer.step}
                  </div>
                  <h4 className="text-xl md:text-2xl font-semibold text-slate-900">{layer.title}</h4>
                </div>
                <span className="text-[#2366c9] font-semibold">{open ? "-" : "+"}</span>
              </Disclosure.Button>
              <Disclosure.Panel className="pl-14 pb-6">
                {layer.description}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>

    <p className="mt-8 mb-12 text-slate-900/80">
      Tutors are continuously monitored via recorded sessions, student feedback, and performance dashboards. Parents receive a satisfaction guarantee with tutor replacement if needed.
    </p>

    {/* Comparison Table */}
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-blue-100 text-slate-900">
            <th className="py-3 px-6">Feature</th>
            <th className="py-3 px-6">Marketplace Tutors</th>
            <th className="py-3 px-6">EduMeUp Certified Network</th>
          </tr>
        </thead>
        <tbody className="text-slate-900/90">
          {[
            ["Applicant % Certified", "âœ—", " 15â€“20%"],
            ["SMK Mastery Exam", "âœ—", " 30â€‘min test"],
            ["Digital Skills Quiz + Demo", "âœ—", " Yes"],
            ["SMK Framework Teaching", "âœ—", " Yes"],
            ["Phase-Out Independence Strategy", "âœ—", " Yes"],
            ["Platform Integration (Moodle/H5P/AI)", "âœ—", " Full integration"],
            ["Parent Dashboard Visibility", "âœ—", " Full dashboard"],
          ].map(([feature, market, edu], i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-blue-50"}>
              <td className="py-3 px-6 font-medium">{feature}</td>
              <td className="py-3 px-6">{market}</td>
              <td className="py-3 px-6">{edu}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</section>
{/* SECTION 7: JOIN AS AN SMK CERTIFIED TUTOR */}
<section className="py-16 md:py-32 bg-blue-50">
  <div className="container-custom max-w-6xl mx-auto text-center">
    {/* Heading */}
    <h2 className="text-4xl md:text-5xl font-display font-semibold text-slate-900 mb-4">
      Join as an <span className="text-[#2366c9]">SMK Certified (Subject Master Knowledge Certified) Tutor</span>
    </h2>
    <p className="text-lg md:text-xl text-slate-900/70 mb-12">
      Empower students worldwide while growing your career with EduMeUp.
    </p>

    {/* Benefits Cards */}
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-12">
      {[
        { icon: <UserCheck className="h-12 w-12 text-white" />, title: "Higher Earnings", desc: "Competitive pay rates for SMK certified tutors." },
        { icon: <Users className="h-12 w-12 text-white" />, title: "Ready-Matched Students", desc: "Students matched to your skills instantly." },
        { icon: <BookOpen className="h-12 w-12 text-white" />, title: "Monthly PD", desc: "Professional development to enhance your teaching." },
        { icon: <Cpu className="h-12 w-12 text-white" />, title: "Full Platform Tools", desc: "All-in-one platform: Moodle, H5P & AI for smooth teaching." },
      ].map((card, i) => (
        <div key={i} className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center hover:shadow-3xl hover:scale-105 transition-transform duration-300">
          <div className="bg-[#2366c9] p-5 rounded-full mb-4 flex items-center justify-center">
            {card.icon}
          </div>
          <h4 className="font-semibold text-lg mb-2 text-slate-900">{card.title}</h4>
          <p className="text-[14px] text-slate-900/80">{card.desc}</p>
        </div>
      ))}
    </div>

    {/* Call-to-Action */}
    <div className="max-w-3xl mx-auto">
      <p className="text-slate-900/80 mb-4">
        <strong>Who we’re looking for:</strong> Bachelor’s in relevant subject Â· 3+ years Cambridge experience Â· strong digital skills Â· commitment to independenceâ€‘building Â· available online (global) or physical (Lahore, Karachi, Islamabad/Rawalpindi, Faisalabad, or your city).
      </p>
      <p className="font-semibold text-[#2366c9] text-xl mb-2">Ready to apply?</p>
      <p className="text-slate-900/70 mb-6 text-[14px]">
        Pro tip: Uploading a 5â€“10 min demo lesson increases your chances of getting matched faster.
      </p>
    <div className="flex justify-center">
<InquiryDialog
  title="Tutor Application"
  trigger={
    <Button
      size="lg"
      className="bg-[#2366c9] hover:bg-blue-500 active:scale-95 text-white font-semibold h-14 px-12 rounded-3xl shadow-lg transition-transform duration-200"
      aria-label="Apply to become an SMK Certified (Subject Master Knowledge Certified) tutor at EduMeUp"
    >
      Apply as tutor
    </Button>
  }
  defaultType="form" // make sure this is the type for custom forms
  description={<TutorApplicationForm />} // pass your form here
/>
</div>
     </div>
  </div>
</section>
     
{/* SECTION 8: APPLY AS STUDENT */}
<section className="relative py-16 md:py-32 bg-[#f8fafc] overflow-hidden">

  {/* Subtle background glow */}
  <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#2366c9]/10 rounded-full blur-3xl" />
  <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl" />

  <div className="relative container-custom max-w-5xl mx-auto">

    <div className="bg-white rounded-[40px] shadow-[0_30px_80px_rgba(35,102,201,0.15)] p-16 md:p-20 text-center">

      <h2 className="text-4xl md:text-5xl font-display font-semibold text-slate-900 leading-tight mb-6">
        Start Your <span className="text-[#2366c9]">Learning Journey</span>
      </h2>

      <p className="text-lg md:text-xl text-slate-900/70 max-w-2xl mx-auto mb-12">
        Personalized tutor matching. Diagnostic assessment. 
        First session within 5â€“7 days.
      </p>

      <InquiryDialog
        title="Student Application"
        defaultType="form"
        description={<StudentApplicationForm />}
        trigger={
          <Button
            size="lg"
            className="bg-[#2366c9] hover:bg-blue-600 text-white font-semibold h-14 px-16 rounded-2xl shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-300"
          >
            Apply as Student
          </Button>
        }
      />

      <p className="mt-6 text-[14px] text-slate-900/50">
        Takes less than 3 minutes to apply.
      </p>

    </div>
  </div>
</section>
<section className="py-16 md:py-32 bg-[#f8fafc]">
  <div className="max-w-6xl mx-auto px-6">

    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-semibold text-slate-900">
        Tuition Plans
      </h2>
      <p className="mt-4 text-gray-500 text-lg">
        Transparent pricing. Structured progress. Measurable results.
      </p>
    </div>

    <div className="grid lg:grid-cols-3 gap-8">

      {[
        {
          title: "Standard",
          price: "$12",
          desc: "1â€“2 sessions weekly. Best for steady improvement.",
          inc: ["Platform access", "Monthly progress report", "Flexible scheduling"],
          highlight: false
        },
        {
          title: "Intensive",
          price: "$18",
          desc: "3â€“4 sessions weekly. Designed for accelerated growth.",
          inc: ["Priority tutor access", "Strategy coaching", "Parent dashboard"],
          highlight: true
        },
        {
          title: "Physical",
          price: "$28",
          desc: "In-person tutoring in selected cities.",
          inc: ["Printed materials", "Face-to-face coaching", "Hybrid access"],
          highlight: false
        }
      ].map((plan, i) => (
        <div
          key={i}
          className={`rounded-2xl p-10 border transition-all duration-300
          ${plan.highlight
              ? "bg-white border-[#2366c9] shadow-xl"
              : "bg-white border-gray-200 shadow-md"
            }`}
        >
          {plan.highlight && (
            <div className="mb-4 text-[14px] font-semibold text-[#2366c9]">
              Most Chosen
            </div>
          )}

          <h3 className="text-2xl font-semibold text-slate-900 mb-2">
            {plan.title}
          </h3>

          <div className="mb-6">
            <span className="text-4xl font-medium text-slate-900">
              {plan.price}
            </span>
            <span className="text-gray-400 text-[14px]"> / hour</span>
          </div>

          <p className="text-gray-500 mb-8">
            {plan.desc}
          </p>

          <ul className="space-y-3 text-[14px] text-gray-700">
            {plan.inc.map((item, ii) => (
              <li key={ii}>â€¢ {item}</li>
            ))}
          </ul>

          <button
            className={`mt-10 w-full py-3 rounded-xl font-semibold transition
            ${plan.highlight
                ? "bg-[#2366c9] text-white hover:bg-blue-600"
                : "bg-gray-100 text-slate-900 hover:bg-gray-200"
              }`}
          >
            Apply Now
          </button>
        </div>
      ))}

    </div>

    <p className="mt-16 text-center text-[14px] text-gray-500">
      Platform value ($360â€“$720/year) included with all active tutoring plans.
    </p>

  </div>
</section>

<section className="py-16 md:py-32 bg-white">
  <div className="max-w-6xl mx-auto px-6">

    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-semibold text-slate-900">
        Student Outcomes
      </h2>
      <p className="mt-4 text-gray-500">
        Real improvement. Structured support. Long-term growth.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-12">

      {[
        { name: "Ahmed", tag: "Late Starter", res: "35% â†’ 82%", duration: "7 months", cost: "$840" },
        { name: "Sara", tag: "Advanced Learner", res: "82% â†’ 94% (A*)", duration: "8 months", cost: "$720" },
        { name: "Usman", tag: "Slow Learner", res: "40% â†’ 71% (B)", duration: "12 months", cost: "$1,020" }
      ].map((c, i) => (
        <div key={i} className="p-8 border border-gray-200 rounded-2xl">

          <div className="mb-6">
            <h4 className="text-xl font-semibold text-slate-900">
              {c.name}
            </h4>
            <p className="text-[14px] text-gray-400">{c.tag}</p>
          </div>

          <div className="mb-6">
            <p className="text-2xl font-semibold text-[#2366c9]">
              {c.res}
            </p>
          </div>

          <div className="text-[14px] text-gray-500">
            <p>Duration: {c.duration}</p>
            <p>Total Investment: {c.cost}</p>
          </div>

        </div>
      ))}

    </div>

  </div>
</section>

      <section className="py-20 md:py-40 bg-blue-50">
        <div className="container-custom max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-semibold mb-20 text-center text-slate-900">
            Frequently Asked Questions
          </h2>
    
          <div className="space-y-6">
            {faqs.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-[3rem] border-4 border-blue-50 shadow transition-all overflow-hidden"
              >
                {/* QUESTION */}
                <div
                  onClick={() => setOpen(open === i ? null : i)}
                  className="p-8 font-semibold cursor-pointer flex justify-between items-center hover:border-[#2366c9]"
                >
                  <span>{item.q}</span>
                  <span className="text-2xl">{open === i ? "âˆ’" : "+"}</span>
                </div>

                {/* ANSWER */}
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-8 overflow-hidden"
                    >
                      <div className="pb-8 text-[14px] text-slate-900/70 font-semibold leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* SECTION 12: GET STARTED */}
  <section className="py-16 md:py-32 bg-[#f8fafc]">
  <div className="max-w-6xl mx-auto px-6">

    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-semibold text-slate-900">
        Choose Your Path
      </h2>
      <p className="mt-4 text-gray-500 text-lg">
        Structured support. Honest guidance. No pressure.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">

      {/* Path 1 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900 mb-3">
          Path 1 — Platform First
        </h3>
        <p className="text-gray-500 mb-6">
          Free diagnostic â†’ Start independently â†’ Add tutor if needed
        </p>
        <Link
          href="/programs"
          className="inline-block bg-[#2366c9] text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition"
        >
          Explore Platform
        </Link>
      </div>

      {/* Path 2 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900 mb-3">
          Path 2 — Diagnostic + Consultation
        </h3>
        <p className="text-gray-500 mb-6">
          Free test + 20-minute honest recommendation.
        </p>
        <Link
          href="/programs/ai-diagnostic"
          className="inline-block bg-[#2366c9] text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition"
        >
          Start Free Diagnostic
        </Link>
      </div>

      {/* Path 3 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900 mb-3">
          Path 3 — Apply as Student
        </h3>
        <p className="text-gray-500 mb-6">
          If your scenario fits structured tutoring support.
        </p>
        <Link
          href="/for-teachers"
          className="inline-block bg-gray-100 text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          Apply as Student
        </Link>
      </div>

      {/* Path 4 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900 mb-3">
          Path 4 — Become an SMK Certified (Subject Master Knowledge Certified) Tutor
        </h3>
        <p className="text-gray-500 mb-6">
          For qualified educators ready to join EduMeUp.
        </p>
        <Link
          href="/for-teachers"
          className="inline-block bg-gray-100 text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          Apply as Tutor
        </Link>
      </div>

    </div>

    {/* Launch Offer */}
    <div className="mt-20 text-center border-t pt-12">
      <p className="text-[14px] font-semibold text-[#2366c9]">
        March 2026 Launch Offer
      </p>
      <p className="text-[14px] text-gray-500 mt-2">
        Priority matching Â· Launch pricing locked 12 months Â· Free 30-min founder consultation Â· Limited spots
      </p>
      <p className="mt-4 text-[14px] text-gray-400">
        Contact: tutoring@edumeup.com
      </p>
    </div>

    <p className="mt-16 text-center italic text-gray-400">
      "Scaffolding, not crutches. Independence, not dependency."
    </p>

  </div>
</section>
      {/* FINAL CTA */}
        <section className="py-16 md:py-32 bg-[#2366c9] text-white text-center relative overflow-hidden">
       
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.2)_0%,transparent_70%)]"></div>
        <div className="container-custom relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-8 md:mb-12 leading-[0.9] text-white"
          >
            Ready for <span className="text-blue-400">independence?</span>
          </motion.h2>
          <p className="text-2xl text-blue-100/80 mb-20 max-w-3xl mx-auto font-medium ">
            Stop the dependency cycle. Apply today for strategic scaffolding that builds real self-learning capabilities.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <InquiryDialog 
              defaultType="tutor_application"
              title="Student Tutoring Application"
              trigger={
                <Button size="lg" className="bg-[#2366c9] hover:bg-blue-500 text-white font-semibold h-28 px-20 rounded-3xl text-2xl shadow-2xl active:scale-95 transition-all border-b-[10px] border-blue-800">
                  Apply as student
                </Button> 
              }
            />
            <InquiryDialog 
              defaultType="tutor_application"
              title="Tutor Application"
              trigger={
                <Button size="lg" className="bg-white text-slate-900 hover:bg-blue-50 font-semibold h-28 px-20 rounded-3xl text-2xl shadow-2xl active:scale-95 transition-all border-b-[10px] border-blue-800">
                  Apply as tutor
                </Button> 
              }
            />
          </div>
          <p className="mt-12 text-[#2366c9] font-semibold text-xs">SMK-certified tutors â€¢ research-backed platform</p>
        </div>
      </section>
    </Layout>
  );
}

