"use client";

import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils";
import * as React from "react";

const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerClose = DrawerPrimitive.Close;

const Drawer = ({ shouldScaleBackground = true, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = "Drawer";

const DrawerOverlay = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Overlay>, React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-zinc-950/80", className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Content>, React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-2xl border bg-surface",
        className
      )}
      {...props}
    >
      <div className="mx-auto my-4 h-2 w-[100px] rounded-full bg-zinc-950/10 dark:bg-zinc-50/10" />
      <div className="max-h-[90vh] overflow-y-auto pb-10">
        {children}
      </div>
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
}
