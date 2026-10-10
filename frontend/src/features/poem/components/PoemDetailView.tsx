import { ArrowLeft } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ExplainPanel } from "@/features/explain/components/ExplainPanel";
import { useGeminiSettings } from "@/features/explain/services/queries";
import { PoemReader } from "@/features/poem/components/PoemReader";
import { usePoemByTitle } from "@/features/poem/services/queries";
import { SEOConfig } from "@/features/shared/components/SEOConfig";
import {
  EmptyState,
  ErrorState,
} from "@/features/shared/components/StateViews";
import { Card } from "@/features/shared/components/ui/Card";
import { Skeleton } from "@/features/shared/components/ui/Skeleton";

export const PoemDetailView = (): ReactNode => {
  const { title = "" } = useParams();
  const decoded = decodeURIComponent(title);
  const { poem, isPending, isError, refetch } = usePoemByTitle(decoded);
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const settings = useGeminiSettings();

  return (
    <>
      <SEOConfig
        title={decoded}
        description={
          poem
            ? `“${poem.title}” by ${poem.author} — read the full poem.`
            : "Read the full poem."
        }
        path={`/poem/${title}`}
      />
      <nav aria-label="Breadcrumb" className="pb-6">
        <Link
          to={poem ? `/poet/${encodeURIComponent(poem.author)}` : "/"}
          className="inline-flex items-center gap-1.5 font-display text-lg font-semibold text-ink-600 hover:text-oxblood-700"
        >
          <ArrowLeft size={17} />{" "}
          {poem ? `More by ${poem.author}` : "Reading room"}
        </Link>
      </nav>
      {isPending ? (
        <Card
          className="mx-auto max-w-2xl space-y-4 p-8"
          aria-label="Loading poem"
        >
          <Skeleton className="mx-auto h-9 w-2/3" />
          <Skeleton className="mx-auto h-5 w-1/3" />
          <Skeleton className="h-64 w-full" />
        </Card>
      ) : null}
      {isError ? (
        <ErrorState
          title="This page would not turn"
          description="PoetryDB did not answer. Check your connection and try again."
          onRetry={() => void refetch()}
        />
      ) : null}
      {!isPending && !isError && poem === null ? (
        <EmptyState
          title="Poem not found"
          description="The library holds nothing under that title."
        />
      ) : null}
      {!isPending && !isError && poem !== null ? (
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <PoemReader
            poem={poem}
            selectedLine={selectedLine}
            onSelectLine={setSelectedLine}
          />
          <ExplainPanel
            poem={poem}
            selectedLine={selectedLine}
            onSelectLine={setSelectedLine}
            settings={settings}
          />
        </div>
      ) : null}
    </>
  );
};
