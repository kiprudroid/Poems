import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/features/shared/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-display text-base font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-oxblood-600 text-parchment-50 hover:bg-oxblood-700",
        outline:
          "border border-parchment-300 bg-parchment-50 text-ink-800 hover:border-gilt-600 hover:text-oxblood-700",
        ghost: "text-ink-600 hover:bg-parchment-200 hover:text-ink-900",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6",
        lg: "h-12 px-8 text-lg",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export const Button = ({
  children,
  variant,
  size,
  className,
  ...rest
}: ButtonProps) => (
  <button
    className={cn(buttonVariants({ variant, size }), className)}
    {...rest}
  >
    {children}
  </button>
);
