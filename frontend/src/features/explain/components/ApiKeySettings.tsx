import { KeyRound, Trash2 } from "lucide-react";
import { type ReactNode, useState } from "react";
import { ModelPicker } from "@/features/explain/components/ModelPicker";
import { geminiKeySchema } from "@/features/explain/types/index";
import { Button } from "@/features/shared/components/ui/Button";
import { Dialog } from "@/features/shared/components/ui/Dialog";
import { Input } from "@/features/shared/components/ui/Input";
import { env } from "@/features/shared/env/index";

interface ApiKeySettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialModel: string;
  hasKey: boolean;
  onSave: (key: string, model: string) => void;
  onClear: () => void;
}

export const ApiKeySettings = ({
  open,
  onOpenChange,
  initialModel,
  hasKey,
  onSave,
  onClear,
}: ApiKeySettingsProps): ReactNode => {
  const [key, setKey] = useState("");
  const [model, setModel] = useState(initialModel);
  const [problem, setProblem] = useState<string | null>(null);

  const handleSave = (): void => {
    const checked = geminiKeySchema.safeParse(key);
    if (!checked.success) {
      setProblem(checked.error.issues[0]?.message ?? "That key looks wrong.");
      return;
    }
    setProblem(null);
    onSave(
      checked.data,
      model.trim() === "" ? env.VITE_GEMINI_MODEL : model.trim(),
    );
    setKey("");
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Companion key"
      description="Your Google AI key unlocks line-by-line explanations."
    >
      <div className="space-y-4">
        <Input
          label="Google AI API key"
          type="password"
          autoComplete="off"
          placeholder="Paste your key…"
          value={key}
          onChange={(event) => setKey(event.target.value)}
          className="rounded-xl font-mono text-base"
        />
        <Input
          label="Model (optional)"
          type="text"
          autoComplete="off"
          placeholder={env.VITE_GEMINI_MODEL}
          value={model}
          onChange={(event) => setModel(event.target.value)}
          className="rounded-xl font-mono text-base"
        />
        <ModelPicker apiKey={key} model={model} onPick={setModel} />
        {problem !== null ? (
          <p className="text-oxblood-600">{problem}</p>
        ) : null}
        <p className="text-sm text-ink-500">
          Kept only in this tab&rsquo;s session storage — it vanishes when the
          tab closes, and is never logged or shared. Get a key at{" "}
          <a
            href="https://aistudio.google.com/apikey"
            target="_blank"
            rel="noreferrer"
            className="text-oxblood-600 underline"
          >
            Google AI Studio
          </a>
          .
        </p>
        <div className="flex items-center gap-2">
          <Button type="button" onClick={handleSave}>
            <KeyRound size={16} /> Save key
          </Button>
          {hasKey ? (
            <Button type="button" variant="ghost" size="sm" onClick={onClear}>
              <Trash2 size={15} /> Forget
            </Button>
          ) : null}
        </div>
      </div>
    </Dialog>
  );
};
