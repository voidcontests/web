"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";
import * as React from "react";

const labelVariants = cva(
    "flex items-center gap-1 text-foreground text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants> & { required?: boolean; optional?: boolean; }>(
    ({ children, required, optional, className, ...props }, ref) => (
        <label
            ref={ref}
            className={cn(labelVariants(), className)}
            {...props}
        >
            {children}
            {required && <span className="text-scarlet-500">*</span>}
            {optional && <span className="text-tertiary-foreground">(optional)</span>}
        </label>
    )
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
