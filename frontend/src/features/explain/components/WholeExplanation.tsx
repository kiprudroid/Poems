import type { ReactNode } from "react";
import type { WholePoemExplanation } from "@/features/explain/types/index";
import { Badge } from "@/features/shared/components/ui/Badge";

export const WholeExplanation = ({
  reading,
}: {
  reading: WholePoemExplanation;
}): ReactNode => (
  <div className="space-y-5">
    <p className="text-lg leading-relaxed">{reading.summary}</p>
    <div>
      <h3 className="font-display text-sm font-semibold tracking-[0.2em] text-gilt-600 uppercase">
        Themes
      </h3>
      <div className="flex flex-wrap gap-2 pt-2">
        {reading.themes.map((theme) => (
          <Badge key={theme} tone="oxblood">
            {theme}
          </Badge>
        ))}
      </div>
    </div>
    <div>
      <h3 className="font-display text-sm font-semibold tracking-[0.2em] text-gilt-600 uppercase">
        Form
      </h3>
      <p className="pt-1">{reading.form}</p>
    </div>
    <div>
      <h3 className="font-display text-sm font-semibold tracking-[0.2em] text-gilt-600 uppercase">
        Craft
      </h3>
      <ul className="space-y-3 pt-2">
        {reading.devices.map((device) => (
          <li key={device.name} className="border-l-2 border-gilt-600/50 pl-3">
            <p className="font-display text-lg font-semibold">{device.name}</p>
            {device.quote !== undefined ? (
              <p className="text-ink-500 italic">“{device.quote}”</p>
            ) : null}
            <p>{device.effect}</p>
          </li>
        ))}
      </ul>
    </div>
    <p className="border-t border-parchment-300 pt-4 font-display text-xl text-ink-600 italic">
      {reading.closing}
    </p>
  </div>
);
