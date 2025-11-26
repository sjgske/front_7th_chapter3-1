import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center font-bold whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        primary: "bg-blue-600 text-white",
        secondary: "bg-gray-500 text-white",
        success: "bg-green-600 text-white",
        danger: "bg-red-600 text-white",
        warning: "bg-orange-500 text-white",
        info: "bg-blue-500 text-white",
        outline: "border border-input bg-background text-foreground",
      },
      size: {
        small: "px-1 text-[0.625rem] h-4",
        medium: "px-2 text-xs h-5",
        large: "px-2.5 text-[0.8125rem] h-6",
      },
      shape: {
        default: "rounded-sm",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "medium",
      shape: "default",
    },
  }
)

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>

function Badge({
  className,
  variant,
  size,
  shape,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size, shape, className }))}
      {...props}
    >
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
