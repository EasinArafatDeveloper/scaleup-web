"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/** Numbered hairline accordion — same look as the homepage FAQ. */
export function Accordion({
  items,
  defaultOpen = 0
}: {
  items: { question: string; answer: string }[];
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = React.useState<number | null>(defaultOpen);

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question} className="border-b border-line">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-start gap-6 py-6 text-left"
            >
              <span className="pt-1.5 font-mono text-xs text-muted-2">{String(i + 1).padStart(2, "0")}</span>
              <span
                className={cn(
                  "font-display flex-1 text-xl font-semibold transition-colors sm:text-2xl",
                  isOpen ? "text-fg" : "text-muted group-hover:text-fg"
                )}
              >
                {item.question}
              </span>
              <Plus
                className={cn(
                  "mt-1.5 h-5 w-5 shrink-0 transition-transform duration-500 ease-out-expo",
                  isOpen ? "rotate-45 text-accent" : "text-muted"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 pl-[2.6rem] text-[15px] leading-relaxed text-muted">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
