import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
const headerTitleVariants = cva("font-bold tracking-tight", {
  variants: {
    size: {
      default: "text-3xl md:text-4xl",
      sm: "text-2xl md:text-3xl",
      lg: "text-4xl md:text-5xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
})


interface PageHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof headerTitleVariants>,
  VariantProps<typeof headerDescriptionVariants> {
  title: string
  description?: string | null
  descriptionAs?: React.ElementType
  balancedTitle?: boolean
  balacedDescription?: boolean
}
const headerDescriptionVariants = cva("text-muted-foreground", {
  variants: {
    size: {
      default: "text-lg",
      sm: "text-base",
      lg: "text-xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
})
export default function PageHeader({
  title,
  description,
  descriptionAs = "h2",
  className,
  size,
  ...props
}: PageHeaderProps) {
  return (
    <div className={cn("grid gap-1", className)} {...props}>
      <h1 className={cn(headerTitleVariants({ size }))}>
        {title}
      </h1>
      {description && (
        <h2
          className={cn(headerDescriptionVariants({ size }))}
        >
          {description}
        </h2>
      )}

    </div>
  )
}
