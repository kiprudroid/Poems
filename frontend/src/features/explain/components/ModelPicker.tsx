import { RefreshCw } from "lucide-react";
import type { ReactNode } from "react";
import { useAvailableModels } from "@/features/explain/services/queries";
import { Button } from "@/features/shared/components/ui/Button";
import { cn } from "@/features/shared/lib/cn";

interface ModelPickerProps {
  apiKey: string;
  model: string;
  onPick: (model: string) => void;
}

export const ModelPicker = ({
  apiKey,
  model,
  onPick,
}: ModelPickerProps): ReactNode => {
  const { models, isFetching, isError, refetch } = useAvailableModels(apiKey);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="font-display text-sm font-semibold tracking-[0.2em] text-gilt-600 uppercase">
          Models on this key
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={apiKey.trim() === "" || isFetching}
          onClick={() => void refetch()}
        >
          <RefreshCw size={15} className={cn(isFetching && "animate-spin")} />{" "}
          {isFetching ? "Loading…" : "Refresh list"}
        </Button>
      </div>
      {isError ? (
        <p className="text-oxblood-600">
          Could not list models — the key may be wrong.
        </p>
      ) : null}
      {models.length > 0 ? (
        <label className="block">
          <span className="sr-only">Choose a model</span>
          <select
            value={models.includes(model) ? model : ""}
            onChange={(event) => onPick(event.target.value)}
            className="h-11 w-full rounded-xl border border-parchment-300 bg-parchment-50 px-3 font-mono text-sm text-ink-900 focus:border-gilt-600 focus:outline-none"
          >
            <option value="">Pick a model…</option>
            {models.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      ) : null}
    </div>
  );
};
