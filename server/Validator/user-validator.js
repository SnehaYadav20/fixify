const { z } = require("zod");

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const registerSchema = z.object({
  name: z.string().trim().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }),
  phone: z.string().trim().min(10).max(13),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  role: z.enum(["customer", "provider"]).default("customer"),
  aadhar: z.string().trim().optional(),
  jobType: z.string().trim().optional(),
}).superRefine((data, ctx) => {
  if (data.role === "provider") {
    if (!data.aadhar || data.aadhar.replace(/\D/g, "").length !== 12) {
      ctx.addIssue({ code: "custom", path: ["aadhar"], message: "Aadhar must be 12 digits" });
    }
    if (!data.jobType) {
      ctx.addIssue({ code: "custom", path: ["jobType"], message: "Job type is required for providers" });
    }
  }
});

const bookingSchema = z.object({
  service: z.string().min(1, { message: "Service id is required" }),
  scheduledAt: z.string().min(1, { message: "Schedule date is required" }),
  address: z.string().trim().min(5, { message: "Address must be at least 5 characters" }),
  note: z.string().max(1000).optional(),
});

const reviewSchema = z.object({
  booking: z.string().min(1),
  rating: z.number().min(1).max(5),
  comment: z.string().max(1000).optional(),
});

module.exports = { loginSchema, registerSchema, bookingSchema, reviewSchema };
