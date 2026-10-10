import type { ReactNode } from "react";
import type { LineExplanation } from "@/features/explain/types/index";

interface LineExplanationProps {
  lineNumber: number;
  lineText: string;
  reading: LineExplanation;
}

export const LineExplanationView = ({
  lineNumber,
  lineText,
  reading,
}: LineExplanationProps): ReactNode => (
  <div className="space-y-4">
    <blockquote className="border-l-2 border-oxblood-600 pl-3 font-display text-xl italic">
      “{lineText}”
      <span className="block text-sm text-ink-500 not-italic">
        Line {lineNumber}
      </span>
    </blockquote>
    <div>
      <h3 className="font-display text-sm font-semibold tracking-[0.2em] text-gilt-600 uppercase">
        In plain words
      </h3>
      <p className="pt-1 text-lg">{reading.paraphrase}</p>
    </div>
    <div>
      <h3 className="font-display text-sm font-semibold tracking-[0.2em] text-gilt-600 uppercase">
        Why it matters
      </h3>
      <p className="pt-1">{reading.meaning}</p>
    </div>
    {reading.devices.length > 0 ? (
      <ul className="space-y-2">
        {reading.devices.map((device) => (
          <li key={device.name} className="border-l-2 border-gilt-600/50 pl-3">
            <span className="font-display text-lg font-semibold">
              {device.name}.{" "}
            </span>
            {device.effect}
          </li>
        ))}
      </ul>
    ) : null}
  </div>
);
