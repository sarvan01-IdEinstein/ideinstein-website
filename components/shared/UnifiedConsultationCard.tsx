'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { ConsultationForm } from "./ConsultationForm"
import { QuotationForm } from "./QuotationForm"
import { DialogTitle } from "@/components/ui/dialog"
import type { ConsultationFormData, QuotationFormData } from "@/lib/validations/forms"

interface UnifiedConsultationCardProps {
  onSubmit: (data: ConsultationFormData | QuotationFormData) => Promise<void>
  className?: string
  defaultService?: string
  type?: 'consultation' | 'quotation'
}

export function UnifiedConsultationCard({
  onSubmit,
  className,
  defaultService,
  type = 'consultation'
}: UnifiedConsultationCardProps) {
  const isQuotation = type === 'quotation'

  return (
    <div className={cn("p-6", className)}>
      <DialogTitle className="text-2xl font-bold text-primary mb-2">
        {isQuotation ? 'Get a Quotation' : 'Book a Free Consultation'}
      </DialogTitle>
      <p className="text-text/80 mb-6">
        {isQuotation
          ? 'Request a detailed quotation for your project needs'
          : 'Schedule a consultation with our experts to discuss your project requirements'}
      </p>

      {isQuotation ? (
        <QuotationForm
          onSubmit={(data) => onSubmit(data)}
          defaultService={defaultService}
        />
      ) : (
        <ConsultationForm
          onSubmit={(data) => onSubmit(data)}
          defaultService={defaultService}
        />
      )}
    </div>
  )
}
