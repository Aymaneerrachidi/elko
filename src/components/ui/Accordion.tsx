"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Accordion({ items }: { items: { title: string; content: React.ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-t border-b border-line">
      {items.map((item, i) => (
        <div key={item.title}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="cursor-pointer w-full flex items-center justify-between py-4 text-left"
          >
            <span className="font-medium text-sm">{item.title}</span>
            <ChevronDown size={16} className={cn("transition-transform", open === i && "rotate-180")} />
          </button>
          <div
            className={cn(
              "grid transition-all duration-300 ease-in-out",
              open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <div className="pb-5 text-sm text-charcoal/70 leading-relaxed">{item.content}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
