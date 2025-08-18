import * as z from "zod"

const baseSchema = {
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  service: z.string().min(1, "Please select a service"),
  files: z.array(z.instanceof(File)).optional(),
}

export const consultationFormSchema = z.object({
  ...baseSchema,
  date: z.date({
    required_error: "Please select a date",
    invalid_type_error: "That's not a valid date",
  }),
  time: z.string().min(1, "Please select a time"),
})

export const quotationFormSchema = z.object({
  ...baseSchema,
  description: z.string().min(10, "Please provide a detailed project description (minimum 10 characters)"),
  scope: z.string().min(1, "Please select project scope"),
  budget: z.number({
    required_error: "Please select a budget range",
    invalid_type_error: "Please select a valid budget range",
  }),
  timeline: z.string().min(1, "Please select a timeline"),
})

export const unifiedFormSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("consultation"),
    ...consultationFormSchema.shape,
  }),
  z.object({
    type: z.literal("quotation"),
    ...quotationFormSchema.shape,
  }),
])

export type ConsultationFormData = z.infer<typeof consultationFormSchema>
export type QuotationFormData = z.infer<typeof quotationFormSchema>
export type UnifiedFormData = z.infer<typeof unifiedFormSchema>
