import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 eyebrow", className)}>
      <span aria-hidden="true" className="h-px w-7 bg-current opacity-50" />
      {children}
    </p>
  );
}
