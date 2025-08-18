"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CalendarProps {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
  className?: string
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

function Calendar({ selected, onSelect, disabled, className }: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  
  // Get first day of the month and how many days in the month
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay() // 0 = Sunday
  const daysInMonth = lastDayOfMonth.getDate()
  
  // Get previous month's last days to fill the grid
  const prevMonth = new Date(year, month - 1, 0)
  const daysInPrevMonth = prevMonth.getDate()
  
  // Create calendar grid
  const calendarDays: (Date | null)[] = []
  
  // Add previous month's trailing days
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    calendarDays.push(new Date(year, month - 1, daysInPrevMonth - i))
  }
  
  // Add current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(new Date(year, month, day))
  }
  
  // Add next month's leading days to complete the grid
  const remainingCells = 42 - calendarDays.length // 6 rows × 7 days
  for (let day = 1; day <= remainingCells; day++) {
    calendarDays.push(new Date(year, month + 1, day))
  }
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }
  
  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }
  
  const isSelected = (date: Date) => {
    return selected && date.toDateString() === selected.toDateString()
  }
  
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === month
  }
  
  const isDisabled = (date: Date) => {
    return disabled ? disabled(date) : false
  }
  
  const handleDateClick = (date: Date) => {
    if (isDisabled(date)) return
    onSelect?.(date)
  }
  
  return (
    <div className={cn("p-3 bg-white border rounded-md shadow-md w-[300px]", className)}>
      {/* Header */}
      <div className="flex justify-center items-center relative mb-4">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-0"
          onClick={() => navigateMonth('prev')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="text-sm font-medium">
          {MONTHS[month]} {year}
        </div>
        
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-0"
          onClick={() => navigateMonth('next')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-0 mb-2">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="h-9 w-9 flex items-center justify-center text-xs font-medium text-slate-500 uppercase"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0">
        {calendarDays.slice(0, 42).map((date, index) => {
          if (!date) return <div key={index} className="h-9 w-9" />
          
          const isCurrentMonthDay = isCurrentMonth(date)
          const isTodayDate = isToday(date)
          const isSelectedDate = isSelected(date)
          const isDisabledDate = isDisabled(date)
          
          return (
            <Button
              key={index}
              variant="ghost"
              className={cn(
                "h-9 w-9 p-0 font-normal text-sm text-black",
                !isCurrentMonthDay && "text-slate-400 opacity-50",
                isTodayDate && !isSelectedDate && "font-semibold underline",
                isSelectedDate && "bg-primary text-white hover:bg-primary hover:text-white",
                isDisabledDate && "text-slate-300 cursor-not-allowed opacity-50",
                !isDisabledDate && !isSelectedDate && "hover:bg-slate-100"
              )}
              onClick={() => handleDateClick(date)}
              disabled={isDisabledDate}
            >
              {date.getDate()}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
export type { CalendarProps }
