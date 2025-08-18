'use client'

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FileText } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FileUpload } from "@/components/ui/file-upload"
import { quotationFormSchema, type QuotationFormData } from "@/lib/validations/forms"

const projectScopes = [
  { value: "prototype", label: "Prototype Development" },
  { value: "small", label: "Small Project (1-2 months)" },
  { value: "medium", label: "Medium Project (3-6 months)" },
  { value: "large", label: "Large Project (6+ months)" },
  { value: "ongoing", label: "Ongoing Collaboration" }
]

const budgetRanges = [
  { min: 1000, max: 5000, label: "€1,000 - €5,000" },
  { min: 5000, max: 10000, label: "€5,000 - €10,000" },
  { min: 10000, max: 25000, label: "€10,000 - €25,000" },
  { min: 25000, max: 50000, label: "€25,000 - €50,000" },
  { min: 50000, max: 100000, label: "€50,000+" }
]

interface QuotationFormProps {
  onSubmit: (data: QuotationFormData) => Promise<void>
  defaultService?: string
}

export function QuotationForm({ onSubmit, defaultService }: QuotationFormProps) {
  const form = useForm<QuotationFormData>({
    resolver: zodResolver(quotationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      service: defaultService || "",
      description: "",
      files: [],
      scope: "",
      budget: undefined,
      timeline: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white border shadow-lg">
                  {/* Engineering & Design */}
                  <SelectItem value="research-development">Research & Development</SelectItem>
                  <SelectItem value="cad-modeling">CAD Modeling</SelectItem>
                  <SelectItem value="machine-design">Machine Design</SelectItem>
                  <SelectItem value="biw-design">BIW Design</SelectItem>
                  
                  {/* Analysis & Simulation */}
                  <SelectItem value="finite-element-cfd">FEA & CFD Analysis</SelectItem>
                  <SelectItem value="gdt-tolerance">GD&T and Tolerance Analysis</SelectItem>
                  
                  {/* Manufacturing Solutions */}
                  <SelectItem value="3d-printing">3D Printing Services</SelectItem>
                  <SelectItem value="supplier-sourcing">Supplier Sourcing</SelectItem>
                  
                  {/* Documentation & Visualization */}
                  <SelectItem value="technical-documentation">Technical Documentation</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Please describe your project requirements, goals, and any specific details..."
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="scope"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Scope</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project scope" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white border shadow-lg">
                  {projectScopes.map((scope) => (
                    <SelectItem key={scope.value} value={scope.value}>
                      {scope.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Range</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white border shadow-lg">
                  {budgetRanges.map((range) => (
                    <SelectItem key={range.min} value={range.min.toString()}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timeline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Timeline</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white border shadow-lg">
                  <SelectItem value="urgent">Urgent (less than 1 week)</SelectItem>
                  <SelectItem value="short">Short Term (1-2 weeks)</SelectItem>
                  <SelectItem value="medium">Medium Term (2-4 weeks)</SelectItem>
                  <SelectItem value="long">Long Term (1+ months)</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="files"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Files (Optional)</FormLabel>
              <FormControl>
                <FileUpload
                  onFilesSelected={(files) => field.onChange(files)}
                  maxFiles={5}
                  accept={{
                    'application/pdf': ['.pdf'],
                    'image/*': ['.png', '.jpg', '.jpeg'],
                    'model/stl': ['.stl'],
                    'model/obj': ['.obj'],
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="default"
          size="lg"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Requesting..." : "Request Quotation"}
        </Button>
      </form>
    </Form>
  )
}
