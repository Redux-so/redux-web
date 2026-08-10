"use client";

import { Plus } from "@untitledui/icons";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion-1";
import SectionLabel from "@/src/components/SectionLabel";
import { blueprintBorderB } from "@/lib/blueprint-grid";
import { ScrollReveal } from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is Redux?",
    answer:
      "Redux is an AI-powered photo editing platform that runs entirely in your browser. It gives you professional-grade tools combined with intelligent automation to organize, edit, and deliver stunning photos faster than ever.",
  },
  {
    question: "Who is Redux for?",
    answer:
      "Redux is for anyone who works with photos, from hobbyists and content creators to professional photographers. Our conversational AI makes advanced editing accessible to beginners, while pros get the speed and power they need.",
  },
  {
    question: "Do I need photo editing experience to use Redux?",
    answer:
      "Not at all. Redux's AI assistant lets you edit by describing what you want in plain language. Just tell Redux your vision, and it applies professional edits in real-time. Experienced editors can also access our full suite of manual controls.",
  },
  {
    question: "How much does Redux cost?",
    answer:
      "Redux includes free core editing tools and limited AI features. Advanced AI tools can be unlocked as needed, with no subscription and pay-as-you-go access.",
  },
  {
    question: "What file formats does Redux support?",
    answer:
      "Redux supports JPEG, PNG, and TIFF files for editing. Free tier users can upload and export JPEG and PNG files, while paid features unlock higher resolution exports and additional format options.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Your photos are private and protected with industry-standard encryption. We never use your images to train AI or share them with third parties. You maintain full ownership and can delete your files anytime.",
  },
] as const;

export default function FAQ() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <ScrollReveal
        className={cn(
          blueprintBorderB,
          "flex flex-col gap-3 px-6 py-10 sm:px-8 sm:py-12 lg:border-b-0 lg:border-r lg:border-[#2e2e2e] lg:px-10",
        )}
      >
        <SectionLabel>FAQ</SectionLabel>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Questions? We&apos;ve got{" "}
          <span className="text-brand-link">answers</span>
        </h2>
      </ScrollReveal>

      <ScrollReveal className="px-6 py-6 sm:px-8 lg:px-10 lg:py-10">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger icon={Plus}>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollReveal>
    </div>
  );
}
