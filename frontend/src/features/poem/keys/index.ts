export const poemQueryKeys = {
  all: ["poems"] as const,
  random: (count: number) => ["poems", "random", count] as const,
  detail: (title: string) => ["poems", "detail", title] as const,
  byAuthor: (author: string) => ["poems", "by-author", author] as const,
};
