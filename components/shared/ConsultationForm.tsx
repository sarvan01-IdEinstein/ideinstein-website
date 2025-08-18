'use client'

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FileUpload } from "@/components/ui/file-upload"
import { consultationFormSchema, type ConsultationFormData } from "@/lib/validations/forms"

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00"
]

interface ConsultationFormProps {
  onSubmit: (data: ConsultationFormData) => Promise<void>
  defaultService?: string
}

export function ConsultationForm({ onSubmit, defaultService }: ConsultationFormProps) {
  const form = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      service: defaultService || "",
      files: [],
      date: undefined,
      time: "",
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal flex justify-between items-center text-foreground",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              <span className="text-foreground">{format(field.value, "PPP")}</span>
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white" align="start">
                        <Calendar
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date.getDay() === 0 || date.getDay() === 6
                          }

                          className="!rounded-md !border-0"
                        />
                      </PopoverContent>
                    </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        <span className={cn(!field.value && "text-muted-foreground")}>
                          {field.value || "Pick a time"}
                        </span>
                      </div>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border shadow-lg">
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="files"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Files (Optional)</FormLabel>
              <FormControl>
                <FileUpload
                  onFilesSelected={(files) => field.onChange(files)}
                  maxFiles={3}
                  accept={{
                    'application/pdf': ['.pdf'],
                    'image/*': ['.png', '.jpg', '.jpeg'],
                    'model/stl': ['.stl'],
                    'model/obj': ['.obj'],
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Booking..." : "Book Consultation"}
        </Button>
      </form>
    </Form>
  )
}
