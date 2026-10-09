import { ArrowLeft } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { PoemCard } from "@/features/poem/components/PoemCard";
import { usePoemsByAuthor } from "@/features/poem/services/queries";
import { PageHero } from "@/features/shared/components/PageHero";
import { SEOConfig } from "@/features/shared/components/SEOConfig";
import { SearchField } from "@/features/shared/components/SearchField";
import {
  EmptyState,
  ErrorState,
  LoadingGrid,
} from "@/features/shared/components/StateViews";

export const PoetDetailView = (): ReactNode => {
  const { poetName = "" } = useParams();
  const author = decodeURIComponent(poetName);
  const [query, setQuery] = useQueryState(
    "q",
    parseAsString
      .withDefault("")
      .withOptions({ clearOnDefault: true, throttleMs: 300 }),
  );
  const { poems, isPending, isError, refetch } = usePoemsByAuthor(author);
  const term = query.trim().toLowerCase();
  const visible =
    term.length === 0
      ? poems
      : poems.filter((poem) => poem.title.toLowerCase().includes(term));

  return (
    <>
      <SEOConfig
        title={author}
        description={`Read every poem by ${author} in the library — search their titles and settle in.`}
        path={`/poet/${poetName}`}
      />
      <Link
        to="/poets"
        className="inline-flex items-center gap-1.5 font-display text-lg font-semibold text-ink-600 hover:text-oxblood-700"
      >
        <ArrowLeft size={17} /> All poets
      </Link>
      <div className="pt-4">
        <PageHero
          kicker="Collected works"
          title={author}
          description={
            poems.length > 0
              ? `${poems.length} poem${poems.length === 1 ? "" : "s"} in the collection.`
              : "Opening this poet's book…"
          }
        >
          <SearchField
            label={`Search poems by ${author}`}
            value={query}
            placeholder="Search this poet's titles…"
            onChange={(value) => void setQuery(value)}
          />
        </PageHero>
      </div>
      {isPending ? <LoadingGrid /> : null}
      {isError ? (
        <ErrorState
          title="These pages would not turn"
          description="PoetryDB did not answer. Check your connection and try again."
          onRetry={() => void refetch()}
        />
      ) : null}
      {!isPending && !isError && visible.length === 0 ? (
        <EmptyState
          title="No poems match"
          description={
            poems.length === 0
              ? `The library holds nothing under “${author}”.`
              : `Nothing by ${author} matches “${query}”.`
          }
        />
      ) : null}
      {!isPending && !isError && visible.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2">
          {visible.map((poem) => (
            <PoemCard key={poem.title} poem={poem} />
          ))}
        </div>
      ) : null}
    </>
  );
};
