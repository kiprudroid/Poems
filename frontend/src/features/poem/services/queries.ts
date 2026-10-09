import { useQuery } from "@tanstack/react-query";
import { poemQueryKeys } from "@/features/poem/keys/index";
import { type Poem, poemListSchema } from "@/features/poem/types/index";
import { fetchPoetry, toSlug } from "@/features/shared/lib/poetry-client";

const parsePoems = (unknownData: unknown): Poem[] =>
  poemListSchema.parse(unknownData);

export const useRandomPoems = (count: number) => {
  const query = useQuery({
    queryKey: poemQueryKeys.random(count),
    queryFn: async () => parsePoems(await fetchPoetry(`/random/${count}`)),
    staleTime: 1000 * 60 * 10,
  });
  const poems = query.data ?? [];
  return { ...query, poems };
};

export const usePoemByTitle = (title: string) => {
  const query = useQuery({
    queryKey: poemQueryKeys.detail(title),
    queryFn: async () => {
      const poems = parsePoems(await fetchPoetry(`/title/${toSlug(title)}`));
      return poems[0] ?? null;
    },
    enabled: title.length > 0,
    staleTime: 1000 * 60 * 30,
  });
  return { ...query, poem: query.data ?? null };
};

export const usePoemsByAuthor = (author: string) => {
  const query = useQuery({
    queryKey: poemQueryKeys.byAuthor(author),
    queryFn: async () =>
      parsePoems(await fetchPoetry(`/author/${toSlug(author)}`)),
    enabled: author.length > 0,
    staleTime: 1000 * 60 * 10,
  });
  const poems = query.data ?? [];
  return { ...query, poems };
};
