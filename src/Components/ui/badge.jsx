import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-[var(--badge-cyan-border)] bg-[var(--badge-cyan-bg)] text-[var(--badge-cyan-text)]",
        warm:
          "border-[var(--badge-warm-border)] bg-[var(--badge-warm-bg)] text-[var(--badge-warm-text)]",
        neutral:
          "border-[var(--badge-neutral-border)] bg-[var(--badge-neutral-bg)] text-[var(--badge-neutral-text)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
