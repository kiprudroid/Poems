import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Poem } from "@/features/poem/types/index";
import { Card } from "@/features/shared/components/ui/Card";

interface PoemCardProps {
  poem: Poem;
}

export const PoemCard = ({ poem }: PoemCardProps): ReactNode => {
  const preview = poem.lines.slice(0, 4).join("\n");
  return (
    <Card className="flex flex-col p-6 transition-transform hover:-translate-y-0.5">
      <p className="font-display text-xs font-semibold tracking-[0.2em] text-gilt-600 uppercase">
        {poem.author}
      </p>
      <h2 className="pt-1 font-display text-3xl leading-snug font-semibold">
        <Link
          to={`/poem/${encodeURIComponent(poem.title)}`}
          className="transition-colors hover:text-oxblood-700"
        >
          {poem.title}
        </Link>
      </h2>
      <p className="line-clamp-4 pt-3 whitespace-pre-line text-ink-600 italic">
        {preview}
      </p>
      <span className="pt-4 text-sm text-ink-500">
        {poem.lines.length} lines
      </span>
      <Link
        to={`/poem/${encodeURIComponent(poem.title)}`}
        aria-label={`Read ${poem.title} by ${poem.author}`}
        className="inline-flex items-center gap-1.5 pt-2 font-display text-lg font-semibold text-oxblood-600 hover:text-oxblood-700"
      >
        Read poem <ArrowRight size={16} />
      </Link>
    </Card>
  );
};
