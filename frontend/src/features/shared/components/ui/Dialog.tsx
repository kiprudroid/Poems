import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/features/shared/lib/cn";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: ReactNode;
}

export const Dialog = ({
  open,
  onOpenChange,
  title,
  description,
  children,
}: DialogProps) => (
  <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-20 bg-ink-900/50" />
      <DialogPrimitive.Content
        aria-describedby={undefined}
        className={cn(
          "fixed top-1/2 left-1/2 z-20 w-[calc(100%-2.5rem)] max-w-md -translate-x-1/2 -translate-y-1/2",
          "rounded-2xl border border-parchment-300 bg-parchment-50 p-6 shadow-xl",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <DialogPrimitive.Title className="font-display text-3xl font-semibold">
              {title}
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="pt-1 text-ink-500">
              {description}
            </DialogPrimitive.Description>
          </div>
          <DialogPrimitive.Close
            aria-label="Close dialog"
            className="rounded-full p-1.5 text-ink-500 hover:bg-parchment-200 hover:text-ink-900"
          >
            <X size={18} />
          </DialogPrimitive.Close>
        </div>
        <div className="pt-4">{children}</div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
);
