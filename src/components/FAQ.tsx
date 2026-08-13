"use client";

import { Plus } from "@untitledui/icons";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion-1";
import { blueprintBorderB } from "@/lib/blueprint-grid";
import { ScrollReveal } from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

const FAQ_SECTION_LABEL =
  "text-[13px] font-semibold uppercase tracking-wide text-[#888888]";

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

function FaqSectionIntro() {
  return (
    <ScrollReveal
      variant="fadeIn"
      className={cn(
        blueprintBorderB,
        "px-4 py-5 sm:px-8 sm:py-6 lg:px-10",
      )}
    >
      <p className={cn("m-0", FAQ_SECTION_LABEL)}>Frequently asked questions</p>
    </ScrollReveal>
  );
}

export default function FAQ() {
  return (
    <div className="flex flex-col">
      <FaqSectionIntro />
      <ScrollReveal className="px-4 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="mx-auto w-full max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger icon={Plus}>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollReveal>
    </div>
  );
}
