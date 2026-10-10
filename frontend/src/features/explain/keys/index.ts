export const explainQueryKeys = {
  all: ["explanations"] as const,
  whole: (title: string, model: string) =>
    ["explanations", "whole", title, model] as const,
  line: (title: string, lineIndex: number, model: string) =>
    ["explanations", "line", title, lineIndex, model] as const,
};
