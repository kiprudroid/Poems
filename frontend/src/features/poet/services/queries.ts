import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { poetQueryKeys } from "@/features/poet/keys/index";
import { authorListSchema } from "@/features/poet/types/index";
import { fetchPoetry } from "@/features/shared/lib/poetry-client";

export const usePoets = (search: string) => {
  const query = useQuery({
    queryKey: poetQueryKeys.list,
    queryFn: async () => {
      const parsed = authorListSchema.parse(await fetchPoetry("/author"));
      return [...parsed.authors].sort((a, b) => a.localeCompare(b));
    },
    staleTime: 1000 * 60 * 60,
  });
  const poets = useMemo(() => {
    const all = query.data ?? [];
    const term = search.trim().toLowerCase();
    if (term.length === 0) return all;
    return all.filter((name) => name.toLowerCase().includes(term));
  }, [query.data, search]);
  return { ...query, poets, total: query.data?.length ?? 0 };
};
