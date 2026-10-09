import { BookOpen, Dices, Library } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { PoemCard } from "@/features/poem/components/PoemCard";
import { useRandomPoems } from "@/features/poem/services/queries";
import { PageHero } from "@/features/shared/components/PageHero";
import { SEOConfig } from "@/features/shared/components/SEOConfig";
import { SearchField } from "@/features/shared/components/SearchField";
import {
  EmptyState,
  ErrorState,
  LoadingGrid,
} from "@/features/shared/components/StateViews";
import { Button } from "@/features/shared/components/ui/Button";

export const HomeView = (): ReactNode => {
  const [query, setQuery] = useQueryState(
    "q",
    parseAsString
      .withDefault("")
      .withOptions({ clearOnDefault: true, throttleMs: 300 }),
  );
  const { poems, isPending, isError, refetch, isFetching } = useRandomPoems(6);
  const term = query.trim().toLowerCase();
  const visible =
    term.length === 0
      ? poems
      : poems.filter(
          (poem) =>
            poem.title.toLowerCase().includes(term) ||
            poem.author.toLowerCase().includes(term),
        );

  return (
    <>
      <SEOConfig path="/" />
      <PageHero
        kicker="The Reading Room"
        title="Verses for quiet hours"
        description="A small, hand-kept library of classical poetry — open the book anywhere."
      >
        <SearchField
          label="Search these poems"
          value={query}
          placeholder="Search by title or poet…"
          onChange={(value) => void setQuery(value)}
        />
      </PageHero>
      <section aria-label="Featured poems">
        <div className="flex items-center justify-between pb-5">
          <h2 className="font-display text-3xl font-semibold">
            Today&rsquo;s selection
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => void refetch()}
            type="button"
          >
            <Dices size={16} /> {isFetching ? "Turning pages…" : "Draw anew"}
          </Button>
        </div>
        {isPending ? <LoadingGrid /> : null}
        {isError ? (
          <ErrorState
            title="The library is unreachable"
            description="PoetryDB did not answer. Check your connection and try again."
            onRetry={() => void refetch()}
          />
        ) : null}
        {!isPending && !isError && visible.length === 0 ? (
          <EmptyState
            title="No verses match"
            description="Try another title or poet — or draw a fresh selection."
          />
        ) : null}
        {!isPending && !isError && visible.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {visible.map((poem) => (
              <PoemCard key={`${poem.author}-${poem.title}`} poem={poem} />
            ))}
          </div>
        ) : null}
      </section>
      <section
        aria-label="Browse"
        className="flex flex-wrap justify-center gap-3 pt-10"
      >
        <Link to="/poets">
          <Button variant="primary" size="lg" type="button">
            <Library size={18} /> Browse all poets
          </Button>
        </Link>
        <Link to="/poets?q=emily">
          <Button variant="ghost" size="lg" type="button">
            <BookOpen size={18} /> Start with Emily…
          </Button>
        </Link>
      </section>
    </>
  );
};
