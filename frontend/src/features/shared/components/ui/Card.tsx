import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/features/shared/lib/cn";

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export const Card = ({ children, className, ...rest }: CardProps) => (
  <article
    className={cn(
      "rounded-xl border border-parchment-300 bg-parchment-50 shadow-[0_1px_0_rgba(26,21,18,0.04),0_12px_32px_-16px_rgba(26,21,18,0.25)]",
      className,
    )}
    {...rest}
  >
    {children}
  </article>
);
