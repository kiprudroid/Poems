import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/features/shared/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-3 py-1 font-display text-sm font-semibold tracking-widest uppercase",
  {
    variants: {
      tone: {
        gilt: "border-gilt-600/40 bg-parchment-200 text-gilt-600",
        oxblood: "border-oxblood-600/30 bg-oxblood-600/10 text-oxblood-700",
        ink: "border-parchment-300 bg-parchment-100 text-ink-600",
      },
    },
    defaultVariants: { tone: "ink" },
  },
);

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: ReactNode;
}

export const Badge = ({ children, tone, className, ...rest }: BadgeProps) => (
  <span className={cn(badgeVariants({ tone }), className)} {...rest}>
    {children}
  </span>
);
