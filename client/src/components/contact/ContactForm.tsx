import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@shared/routes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contactFormSchema = z.object({
  fullName: z.string().min(1, "Full Name is required."),
  email: z
    .string()
    .min(1, "Email Address is required.")
    .email("Please enter a valid email address."),
  phone: z.string().optional(),
  role: z.enum([
    "parent",
    "student",
    "teacher",
    "school_principal",
    "other",
  ]),
  subject: z.enum([
    "general_enquiry",
    "school_partnership",
    "teacher_training_booking",
    "teacher_training_smk_enquiry",
    "technical_support",
    "programme_information",
  ]),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters.")
    .max(2000, "Message is too long."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const roleLabelMap: Record<ContactFormValues["role"], string> = {
  parent: "Parent",
  student: "Student",
  teacher: "Teacher",
  school_principal: "School Principal",
  other: "Other",
};

const subjectLabelMap: Record<ContactFormValues["subject"], string> = {
  general_enquiry: "General Enquiry",
  school_partnership: "School Partnership",
  teacher_training_booking: "Teacher Training Booking",
  teacher_training_smk_enquiry: "Teacher Training / SMK Enquiry",
  technical_support: "Technical Support",
  programme_information: "Programme Information",
};

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      role: "parent",
      subject: "general_enquiry",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(api.inquiries.create.path, {
        method: api.inquiries.create.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "contact",
          name: values.fullName,
          email: values.email,
          phone: values.phone?.trim() || null,
          role: values.role,
          subjectInterest: subjectLabelMap[values.subject],
          message: `[Role: ${roleLabelMap[values.role]}]\n[Subject: ${subjectLabelMap[values.subject]}]\n\n${values.message}`,
          gradeLevel: "",
          learningMode: "",
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.message || "Failed to submit your message.");
      }

      form.reset();
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
      <h3 className="text-2xl font-semibold text-[#1e1b4b]">Send a Message</h3>
      <p className="mt-2 text-sm text-slate-600">
        Messages are handled by our support team and routed to support@edumeup.com.
      </p>

      {isSubmitted && (
        <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          Thank you - we will respond within 24 hours.
        </div>
      )}

      {submitError && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {submitError}
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 space-y-5"
          noValidate
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+92 ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>I am a</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="school_principal">School Principal</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="general_enquiry">General Enquiry</SelectItem>
                      <SelectItem value="school_partnership">School Partnership</SelectItem>
                      <SelectItem value="teacher_training_booking">
                        Teacher Training Booking
                      </SelectItem>
                      <SelectItem value="teacher_training_smk_enquiry">
                        Teacher Training / SMK Enquiry
                      </SelectItem>
                      <SelectItem value="technical_support">Technical Support</SelectItem>
                      <SelectItem value="programme_information">
                        Programme Information
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your message (minimum 20 characters)"
                    className="min-h-[130px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="h-11 w-full bg-[#2366c9] font-semibold text-white hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message ->"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
