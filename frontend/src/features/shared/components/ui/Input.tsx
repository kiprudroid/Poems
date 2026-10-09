import type { InputHTMLAttributes } from "react";
import { cn } from "@/features/shared/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({ label, className, ...rest }: InputProps) => (
  <label className="block">
    <span className="sr-only">{label}</span>
    <input
      className={cn(
        "h-12 w-full rounded-full border border-parchment-300 bg-parchment-50 px-5 font-body text-lg text-ink-900 placeholder:text-ink-500/70 focus:border-gilt-600 focus:outline-none",
        className,
      )}
      {...rest}
    />
  </label>
);
