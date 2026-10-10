import {
  ChevronLeft,
  ChevronRight,
  KeyRound,
  Settings2,
  Sparkles,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import { ApiKeySettings } from "@/features/explain/components/ApiKeySettings";
import { LineExplanationView } from "@/features/explain/components/LineExplanation";
import { WholeExplanation } from "@/features/explain/components/WholeExplanation";
import {
  type useGeminiSettings,
  useLineExplanation,
  useWholePoemExplanation,
} from "@/features/explain/services/queries";
import type { Poem } from "@/features/poem/types/index";
import { Button } from "@/features/shared/components/ui/Button";
import { Card } from "@/features/shared/components/ui/Card";
import { Skeleton } from "@/features/shared/components/ui/Skeleton";
import { cn } from "@/features/shared/lib/cn";

type Settings = ReturnType<typeof useGeminiSettings>;
type Scope = "whole" | "line";

interface ExplainPanelProps {
  poem: Poem;
  selectedLine: number | null;
  onSelectLine: (index: number | null) => void;
  settings: Settings;
}

const errorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : "Something went wrong. Try again.";

export const ExplainPanel = ({
  poem,
  selectedLine,
  onSelectLine,
  settings,
}: ExplainPanelProps): ReactNode => {
  const [scope, setScope] = useState<Scope>("whole");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const whole = useWholePoemExplanation(poem, settings);
  const line = useLineExplanation(poem, selectedLine, settings);
  const lineText =
    selectedLine === null ? "" : (poem.lines[selectedLine] ?? "");

  return (
    <aside aria-label="Poem companion">
      <Card className="space-y-5 p-6 lg:sticky lg:top-24">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold">
            <Sparkles size={20} className="text-gilt-600" /> Companion
          </h2>
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            aria-label="Companion settings"
            className="rounded-full p-2 text-ink-500 hover:bg-parchment-200 hover:text-ink-900"
          >
            <Settings2 size={18} />
          </button>
        </div>

        {!settings.hasKey ? (
          <div className="space-y-3 rounded-xl bg-parchment-200/60 p-4 text-center">
            <KeyRound size={22} className="mx-auto text-gilt-600" />
            <p>Add your Google AI key to unlock explanations of this poem.</p>
            <Button
              type="button"
              size="sm"
              onClick={() => setSettingsOpen(true)}
            >
              Add key
            </Button>
          </div>
        ) : (
          <>
            <div
              role="tablist"
              aria-label="Explanation scope"
              className="grid grid-cols-2 gap-1 rounded-full bg-parchment-200/70 p-1"
            >
              {(["whole", "line"] as const).map((value) => (
                <button
                  key={value}
                  role="tab"
                  aria-selected={scope === value}
                  type="button"
                  onClick={() => setScope(value)}
                  className={cn(
                    "rounded-full px-3 py-1.5 font-display text-base font-semibold",
                    scope === value
                      ? "bg-ink-900 text-parchment-100"
                      : "text-ink-600",
                  )}
                >
                  {value === "whole" ? "Whole poem" : "One line"}
                </button>
              ))}
            </div>

            {scope === "whole" ? (
              <div className="space-y-4">
                {whole.explanation === null && !whole.isFetching ? (
                  <Button type="button" onClick={() => void whole.refetch()}>
                    Explain this poem
                  </Button>
                ) : null}
                {whole.isFetching ? (
                  <div
                    className="space-y-2"
                    role="status"
                    aria-label="Explaining poem"
                  >
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                ) : null}
                {whole.explanation !== null ? (
                  <WholeExplanation reading={whole.explanation} />
                ) : null}
                {whole.isError ? (
                  <div className="space-y-2">
                    <p className="text-oxblood-600">
                      {errorMessage(whole.error)}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => void whole.refetch()}
                    >
                      Retry
                    </Button>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="space-y-4">
                {selectedLine === null ? (
                  <p className="text-ink-500 italic">
                    Click any line of the poem to inspect it.
                  </p>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        disabled={selectedLine === 0}
                        onClick={() => onSelectLine(selectedLine - 1)}
                        aria-label="Previous line"
                        className="rounded-full p-2 text-ink-600 hover:bg-parchment-200 disabled:opacity-40"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <span className="font-display font-semibold">
                        Line {selectedLine + 1}
                      </span>
                      <button
                        type="button"
                        disabled={selectedLine >= poem.lines.length - 1}
                        onClick={() => onSelectLine(selectedLine + 1)}
                        aria-label="Next line"
                        className="rounded-full p-2 text-ink-600 hover:bg-parchment-200 disabled:opacity-40"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                    {line.explanation === null && !line.isFetching ? (
                      <Button type="button" onClick={() => void line.refetch()}>
                        Explain this line
                      </Button>
                    ) : null}
                    {line.isFetching ? (
                      <div
                        className="space-y-2"
                        role="status"
                        aria-label="Explaining line"
                      >
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-16 w-full" />
                      </div>
                    ) : null}
                    {line.explanation !== null ? (
                      <LineExplanationView
                        lineNumber={selectedLine + 1}
                        lineText={lineText}
                        reading={line.explanation}
                      />
                    ) : null}
                    {line.isError ? (
                      <div className="space-y-2">
                        <p className="text-oxblood-600">
                          {errorMessage(line.error)}
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => void line.refetch()}
                        >
                          Retry
                        </Button>
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            )}
            <p className="text-xs text-ink-500">
              Answered by {settings.model} using your key. Verse text is sent to
              Google with each request.
            </p>
          </>
        )}
      </Card>
      <ApiKeySettings
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        initialModel={settings.model}
        hasKey={settings.hasKey}
        onSave={settings.saveSettings}
        onClear={settings.clearSettings}
      />
    </aside>
  );
};
