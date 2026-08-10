"use client";

import * as React from "react";
import { Minus, Plus } from "@untitledui/icons";
import { Accordion as AccordionPrimitive } from "radix-ui";

import { blueprintBorderB } from "@/lib/blueprint-grid";
import { cn } from "@/lib/utils";

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(blueprintBorderB, "last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  icon: Icon = Plus,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex flex-1 items-center justify-between gap-4 py-4 text-left text-sm font-medium text-white transition-all outline-none hover:text-white/90 focus-visible:text-white disabled:pointer-events-none disabled:opacity-50 sm:py-5 sm:text-base",
          className,
        )}
        {...props}
      >
        {children}
        <Icon
          aria-hidden
          className="size-5 shrink-0 text-white/70 group-data-[state=open]/accordion-trigger:hidden"
        />
        <Minus
          aria-hidden
          className="hidden size-5 shrink-0 text-white/70 group-data-[state=open]/accordion-trigger:block"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "pb-4 text-sm leading-relaxed text-white/70 sm:pb-5",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
