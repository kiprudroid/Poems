import { BookOpen, CloudOff, Feather } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/features/shared/components/ui/Button";
import { Card } from "@/features/shared/components/ui/Card";
import { Skeleton } from "@/features/shared/components/ui/Skeleton";

interface StateMessageProps {
  title: string;
  description: string;
  onRetry?: () => void;
}

export const LoadingGrid = (): ReactNode => (
  <div
    className="grid gap-5 sm:grid-cols-2"
    role="status"
    aria-label="Loading poems"
  >
    {Array.from({ length: 4 }).map((_, index) => (
      <Card key={index} className="space-y-3 p-6">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-16 w-full" />
      </Card>
    ))}
  </div>
);

export const ErrorState = ({
  title,
  description,
  onRetry,
}: StateMessageProps): ReactNode => (
  <Card className="mx-auto max-w-md space-y-3 p-8 text-center">
    <CloudOff
      size={32}
      className="mx-auto text-oxblood-600"
      strokeWidth={1.5}
    />
    <h2 className="font-display text-3xl font-semibold">{title}</h2>
    <p className="text-ink-500">{description}</p>
    {onRetry ? (
      <Button variant="outline" size="sm" onClick={onRetry} type="button">
        Try again
      </Button>
    ) : null}
  </Card>
);

export const EmptyState = ({
  title,
  description,
}: StateMessageProps): ReactNode => (
  <Card className="mx-auto max-w-md space-y-2 p-8 text-center">
    <BookOpen size={32} className="mx-auto text-gilt-600" strokeWidth={1.5} />
    <h2 className="font-display text-3xl font-semibold">{title}</h2>
    <p className="text-ink-500">{description}</p>
  </Card>
);

export const InitialsMark = ({ name }: { name: string }): ReactNode => {
  const initials = name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("");
  return (
    <span
      aria-hidden="true"
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gilt-600/40 bg-parchment-200 font-display text-lg font-semibold text-oxblood-700"
    >
      {initials || <Feather size={18} />}
    </span>
  );
};
