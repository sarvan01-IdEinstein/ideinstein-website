import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-md",
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow-sm hover:shadow-md",
        outline: "border border-primary bg-transparent text-primary hover:bg-primary hover:text-white shadow-sm hover:shadow-md",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-sm hover:shadow-md",
        ghost: "text-primary hover:bg-primary/10 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
        // Brand-specific variants
        "primary-gold": "bg-yellow-500 text-white hover:bg-yellow-600 shadow-sm hover:shadow-md",
        "primary-inverse": "bg-white text-primary border border-primary/20 hover:bg-primary/5 focus:bg-white focus:text-primary focus:ring-white/50 active:bg-white active:text-primary shadow-sm hover:shadow-md",
        "blue-contrast": "bg-white text-primary border-2 border-white hover:bg-yellow-500 hover:text-white hover:border-yellow-500 focus:bg-yellow-500 focus:text-white focus:border-yellow-500 focus:ring-yellow-500/50 active:bg-yellow-600 active:text-white shadow-sm hover:shadow-md",
        "header-cta": "bg-white text-yellow-600 border-2 border-white hover:bg-yellow-500 hover:text-white hover:border-yellow-500 focus:bg-yellow-500 focus:text-white focus:border-yellow-500 focus:ring-yellow-500/50 active:bg-yellow-600 active:text-white shadow-sm hover:shadow-md font-medium",
        cta: "bg-gradient-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transform hover:scale-105",
        success: "bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow-md",
        warning: "bg-orange-500 text-white hover:bg-orange-600 shadow-sm hover:shadow-md",
        floating: "bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl rounded-full",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        default: "h-10 px-4 py-2",
        lg: "h-11 px-8 text-base",
        xl: "h-12 px-10 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
