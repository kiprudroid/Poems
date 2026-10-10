import { Share2 } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Poem } from "@/features/poem/types/index";
import { Badge } from "@/features/shared/components/ui/Badge";
import { Button } from "@/features/shared/components/ui/Button";
import { Card } from "@/features/shared/components/ui/Card";
import { OrnamentRule } from "@/features/shared/components/ui/OrnamentRule";
import { cn } from "@/features/shared/lib/cn";

interface PoemReaderProps {
  poem: Poem;
  selectedLine?: number | null;
  onSelectLine?: (index: number) => void;
}

export const PoemReader = ({
  poem,
  selectedLine,
  onSelectLine,
}: PoemReaderProps): ReactNode => {
  const interactive = onSelectLine !== undefined;
  const handleShare = () => {
    void navigator.share?.({
      title: poem.title,
      text: `“${poem.title}” by ${poem.author}`,
      url: window.location.href,
    });
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: poem.title,
    author: { "@type": "Person", name: poem.author },
  };
  return (
    <article itemScope itemType="https://schema.org/CreativeWork">
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <header className="mx-auto max-w-2xl text-center">
        <Badge tone="gilt">From the collection</Badge>
        <h1
          itemProp="name"
          className="pt-4 font-display text-5xl leading-tight font-semibold"
        >
          {poem.title}
        </h1>
        <p className="pt-2 font-display text-2xl text-ink-500 italic">
          by{" "}
          <Link
            to={`/poet/${encodeURIComponent(poem.author)}`}
            className="text-oxblood-600 hover:text-oxblood-700"
          >
            <span itemProp="author">{poem.author}</span>
          </Link>
        </p>
        <OrnamentRule className="mx-auto max-w-xs pt-6" />
      </header>
      <Card className="mx-auto mt-8 max-w-2xl px-6 py-10 sm:px-12">
        {interactive ? (
          <p className="pb-4 text-center text-sm tracking-wide text-ink-500 uppercase">
            Click a line to inspect it with the Companion
          </p>
        ) : null}
        <div className="verse-body space-y-2">
          {poem.lines.map((line, index) =>
            interactive ? (
              <button
                key={`${index}-${line.slice(0, 12)}`}
                type="button"
                onClick={() => onSelectLine(index)}
                aria-pressed={selectedLine === index}
                aria-label={`Inspect line ${index + 1}`}
                className={cn(
                  "block w-full rounded-md px-2 text-left transition-colors hover:bg-parchment-200/70",
                  selectedLine === index &&
                    "bg-parchment-200 shadow-[inset_3px_0_0_var(--color-gilt-600)]",
                  index === 0 && selectedLine !== index && "drop-cap",
                )}
              >
                {line.length === 0 ? " " : line}
              </button>
            ) : (
              <p
                key={`${index}-${line.slice(0, 12)}`}
                className={index === 0 ? "drop-cap" : undefined}
              >
                {line.length === 0 ? " " : line}
              </p>
            ),
          )}
        </div>
        <OrnamentRule className="pt-8" />
        <div className="flex items-center justify-between pt-6">
          <span className="text-sm tracking-wide text-ink-500 uppercase">
            {poem.lines.length} lines · Public domain
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            type="button"
          >
            <Share2 size={15} /> Share
          </Button>
        </div>
      </Card>
    </article>
  );
};
