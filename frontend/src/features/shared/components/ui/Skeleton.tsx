import type { HTMLAttributes } from "react";
import { cn } from "@/features/shared/lib/cn";

export const Skeleton = ({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    aria-hidden="true"
    className={cn("animate-pulse rounded-md bg-parchment-200", className)}
    {...rest}
  />
);
