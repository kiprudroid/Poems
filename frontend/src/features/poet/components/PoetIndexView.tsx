import { parseAsString, useQueryState } from "nuqs";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { usePoets } from "@/features/poet/services/queries";
import { PageHero } from "@/features/shared/components/PageHero";
import { SEOConfig } from "@/features/shared/components/SEOConfig";
import { SearchField } from "@/features/shared/components/SearchField";
import {
  EmptyState,
  ErrorState,
  InitialsMark,
} from "@/features/shared/components/StateViews";
import { Card } from "@/features/shared/components/ui/Card";
import { Skeleton } from "@/features/shared/components/ui/Skeleton";

export const PoetIndexView = (): ReactNode => {
  const [query, setQuery] = useQueryState(
    "q",
    parseAsString
      .withDefault("")
      .withOptions({ clearOnDefault: true, throttleMs: 300 }),
  );
  const { poets, total, isPending, isError, refetch } = usePoets(query);

  return (
    <>
      <SEOConfig
        title="All Poets"
        description="Browse every poet in the library — search by name and open their collected poems."
        path="/poets"
      />
      <PageHero
        kicker="Dramatis Personae"
        title="All poets"
        description={
          total > 0
            ? `${total} voices, from the well-loved to the half-forgotten.`
            : "Gathering the poets…"
        }
      >
        <SearchField
          label="Search poets"
          value={query}
          placeholder="Search poets by name…"
          onChange={(value) => void setQuery(value)}
        />
      </PageHero>
      {isPending ? (
        <div
          className="grid gap-3 sm:grid-cols-2"
          role="status"
          aria-label="Loading poets"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : null}
      {isError ? (
        <ErrorState
          title="The library is unreachable"
          description="PoetryDB did not answer. Check your connection and try again."
          onRetry={() => void refetch()}
        />
      ) : null}
      {!isPending && !isError && poets.length === 0 ? (
        <EmptyState
          title="No poets found"
          description={`Nothing matches “${query}”. Try another name.`}
        />
      ) : null}
      {!isPending && !isError && poets.length > 0 ? (
        <>
          <p className="pb-4 text-center text-ink-500" role="status">
            Showing {poets.length} of {total} poets
          </p>
          <ul className="grid gap-3 sm:grid-cols-2" aria-label="Poets">
            {poets.map((name) => (
              <li key={name}>
                <Link
                  to={`/poet/${encodeURIComponent(name)}`}
                  aria-label={`Poems by ${name}`}
                  className="block rounded-xl transition-transform hover:-translate-y-0.5"
                >
                  <Card className="flex items-center gap-4 p-4">
                    <InitialsMark name={name} />
                    <span className="font-display text-2xl font-semibold">
                      {name}
                    </span>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </>
  );
};
