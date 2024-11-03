import { dbMajors, dbSchoolYear } from "@/db/drizzle/startup_seed";
import { z } from "zod";

export const SchoolDetailsFormSchema = z.object({
  user_school_year: z.enum(dbSchoolYear),
  user_major: z.enum(dbMajors),
});

export type TSchoolDetailsForm = z.infer<typeof SchoolDetailsFormSchema>;
