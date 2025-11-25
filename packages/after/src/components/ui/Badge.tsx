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
  VariantProps<typeof badgeVariants> & {
    status?: 'published' | 'draft' | 'archived' | 'pending' | 'rejected';
    userRole?: 'admin' | 'moderator' | 'user' | 'guest';
    priority?: 'high' | 'medium' | 'low';
    paymentStatus?: 'paid' | 'pending' | 'failed' | 'refunded';
  }

function Badge({
  className,
  variant,
  size,
  shape,
  status,
  userRole,
  priority,
  paymentStatus,
  children,
  ...props
}: BadgeProps) {
  let actualVariant = variant;
  let actualContent = children;

  // Status mapping
  if (status) {
    switch (status) {
      case 'published':
        actualVariant = 'success';
        actualContent = actualContent || '게시됨';
        break;
      case 'draft':
        actualVariant = 'warning';
        actualContent = actualContent || '임시저장';
        break;
      case 'archived':
        actualVariant = 'secondary';
        actualContent = actualContent || '보관됨';
        break;
      case 'pending':
        actualVariant = 'info';
        actualContent = actualContent || '대기중';
        break;
      case 'rejected':
        actualVariant = 'danger';
        actualContent = actualContent || '거부됨';
        break;
    }
  }

  // User role mapping
  if (userRole) {
    switch (userRole) {
      case 'admin':
        actualVariant = 'danger';
        actualContent = actualContent || '관리자';
        break;
      case 'moderator':
        actualVariant = 'warning';
        actualContent = actualContent || '운영자';
        break;
      case 'user':
        actualVariant = 'primary';
        actualContent = actualContent || '사용자';
        break;
      case 'guest':
        actualVariant = 'secondary';
        actualContent = actualContent || '게스트';
        break;
    }
  }

  // Priority mapping
  if (priority) {
    switch (priority) {
      case 'high':
        actualVariant = 'danger';
        actualContent = actualContent || '높음';
        break;
      case 'medium':
        actualVariant = 'warning';
        actualContent = actualContent || '보통';
        break;
      case 'low':
        actualVariant = 'info';
        actualContent = actualContent || '낮음';
        break;
    }
  }

  // Payment status mapping
  if (paymentStatus) {
    switch (paymentStatus) {
      case 'paid':
        actualVariant = 'success';
        actualContent = actualContent || '결제완료';
        break;
      case 'pending':
        actualVariant = 'warning';
        actualContent = actualContent || '결제대기';
        break;
      case 'failed':
        actualVariant = 'danger';
        actualContent = actualContent || '결제실패';
        break;
      case 'refunded':
        actualVariant = 'secondary';
        actualContent = actualContent || '환불됨';
        break;
    }
  }

  return (
    <div
      className={cn(badgeVariants({ variant: actualVariant, size, shape, className }))}
      {...props}
    >
      {actualContent}
    </div>
  )
}

export { Badge, badgeVariants }
