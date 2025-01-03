import * as React from "react"

import { cn } from "@/lib/utils"

const Widget = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-[15px] border bg-background text-text text-base",
      "flex flex-col justify-between p-[20px]",
      className
    )}
    {...props}
  />
))
Widget.displayName = "Widget"

const WidgetContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-[10px]", className)} {...props} />
))
WidgetContent.displayName = "WidgetContent"

const WidgetTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-medium text-text-muted leading-none", className)}
    {...props}
  />
))
WidgetTitle.displayName = "WidgetTitle"

const WidgetFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center", className)}
    {...props}
  />
))
WidgetFooter.displayName = "WidgetFooter"

export { Widget, WidgetFooter, WidgetTitle, WidgetContent }
