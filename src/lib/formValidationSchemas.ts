import z from "zod";

// SUBJECT SCHEMA
export const subjectSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, {
    message: "Subject name is required.",
  }),
  teachers: z
    .array(z.string().min(1, { message: "Invalid teacher." }))
    .min(1, { message: "You must select at least one teacher." }),
});
export type SubjectPropType = z.infer<typeof subjectSchema>;

// CLASS SCHEMA
export const classSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
  capacity: z.number().min(1, { message: "Capacity is required!" }),
  gradeId: z.number().min(1, { message: "Grade name is required!" }),
  supervisorId: z.string().optional(),
});
export type ClassPropType = z.infer<typeof classSchema>;

//  TEACHER SHCEMA
export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(20, {
      message: "Username must be at most 20 characters.",
    }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .optional()
    .or(z.literal("")),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .optional(),
  name: z.string().min(2, {
    message: "First name is required and must be atleast 2 characters.",
  }),
  surname: z.string().min(2, {
    message: "Last name is required and must be atleast 2 characters.",
  }),
  phone: z.string().optional(),
  address: z.string(),
  bloodType: z.string().min(1, {
    message: "Blood is required and must be atleast 1 character.",
  }),
  birthday: z.date({
    message: "Birthday is required.",
  }),
  img: z.string().optional(),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required" }),
  subjects: z.array(z.string()).optional(),
});
export type TeacherPropType = z.infer<typeof teacherSchema>;
