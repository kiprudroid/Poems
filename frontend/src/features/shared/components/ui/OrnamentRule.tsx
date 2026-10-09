import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/features/shared/lib/cn";

export const OrnamentRule = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center gap-3", className)} aria-hidden="true">
    <SeparatorPrimitive.Root
      className="h-px flex-1 bg-parchment-300"
      decorative
    />
    <span className="font-display text-lg text-gilt-600">❦</span>
    <SeparatorPrimitive.Root
      className="h-px flex-1 bg-parchment-300"
      decorative
    />
  </div>
);
