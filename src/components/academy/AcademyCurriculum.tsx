"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { academyModules } from "@/lib/academy";

export function AcademyCurriculum() {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <div className="space-y-3">
      {academyModules.map((module) => {
        const isOpen = open === module.number;

        return (
          <div
            key={module.number}
            className="overflow-hidden rounded-xl border border-navy/10 bg-white"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : module.number)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-cream/50"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-academy-blue/10 text-sm font-bold text-academy-blue">
                  {module.number}
                </span>
                <span className="font-medium text-navy">{module.title}</span>
              </div>
              <ChevronDown
                size={20}
                className={`shrink-0 text-navy/40 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen && (
              <div className="border-t border-navy/10 px-5 py-4">
                <ul className="space-y-2">
                  {module.lessons.map((lesson) => (
                    <li
                      key={lesson}
                      className="flex items-start gap-2 text-sm text-navy/70"
                    >
                      <span className="mt-1 text-academy-green">•</span>
                      {lesson}
                    </li>
                  ))}
                </ul>
                {module.downloads && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {module.downloads.map((dl) => (
                      <span
                        key={dl}
                        className="rounded-full bg-academy-green/10 px-3 py-1 text-xs font-medium text-academy-green-dark"
                      >
                        ✔ {dl}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
