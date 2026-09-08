"use client";

import { Plus } from "@untitledui/icons";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion-1";
import { ScrollReveal } from "@/lib/scroll-motion";
import { PAGE_GRID_ALIGNED_FRAME } from "@/lib/section-styles";
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

const FAQ_ITEM_CLASS = "faq-accordion-cell relative";

/** Equal inset below the section seam and above the accordion on mobile/tablet. */
const FAQ_MOBILE_HEADING_PAD = "pt-10 pb-10 sm:pt-12 sm:pb-12";

function FaqHeading({ className }: { className?: string }) {
  return (
    <div className={cn("faq-heading-glow relative w-fit max-w-full", className)}>
      <div
        className="faq-heading-dots dot-grid-texture dot-grid-texture--spotlight"
        aria-hidden
      />
      <h2
        id="faq-heading"
        className={cn(
          "relative z-[2] m-0 font-display tracking-tight text-white",
          "text-center text-3xl leading-[1.08] sm:text-4xl max-lg:whitespace-nowrap",
          "lg:flex lg:flex-col lg:text-left lg:text-[2.75rem] lg:leading-[1.15]",
        )}
      >
        <span className="lg:hidden">Frequently asked questions</span>
        <span className="hidden lg:block">Frequently</span>
        <span className="hidden lg:block">asked</span>
        <span className="hidden lg:block">questions</span>
      </h2>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className={cn(PAGE_GRID_ALIGNED_FRAME, "overflow-visible")}>
      <div
        className={cn(
          "relative grid w-full min-w-0 grid-cols-1",
          "lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:items-stretch",
        )}
      >
        <ScrollReveal
          variant="fadeIn"
          className={cn(
            "flex w-full justify-center",
            FAQ_MOBILE_HEADING_PAD,
            "max-lg:overflow-hidden",
            "lg:col-start-1 lg:row-start-1 lg:flex lg:min-h-0 lg:items-center lg:justify-start lg:self-stretch lg:overflow-hidden lg:py-0 lg:pr-12 xl:pr-16",
          )}
        >
          <FaqHeading className="mx-auto lg:mx-0 lg:translate-x-10 xl:translate-x-12" />
        </ScrollReveal>

        <div
          aria-hidden
          className="hidden w-px shrink-0 self-stretch bg-[rgba(255,255,255,0.08)] lg:col-start-2 lg:row-start-1 lg:block lg:justify-self-center"
        />

        <ScrollReveal className="min-w-0 w-full lg:col-start-3 lg:row-start-1 lg:self-stretch">
          <Accordion
            type="single"
            collapsible
            defaultValue="faq-0"
            className="w-full max-lg:border-t max-lg:border-white/10"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className={FAQ_ITEM_CLASS}
              >
                <AccordionTrigger
                  icon={Plus}
                  className="relative z-[1] px-6 py-5 text-base sm:px-8 sm:py-6 sm:text-lg lg:px-10 xl:px-12"
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent
                  outerClassName="faq-accordion-glow contained-accent-glow relative overflow-hidden"
                  className="faq-accordion-content-surface relative z-[1] px-6 sm:px-8 lg:px-10 xl:px-12"
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </div>
  );
}
