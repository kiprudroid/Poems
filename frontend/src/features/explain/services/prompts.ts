import type { Poem } from "@/features/poem/types/index";

const numbered = (poem: Poem): string =>
  poem.lines.map((line, index) => `${index + 1}. ${line}`).join("\n");

const groundRules =
  "Ground every claim in the text. Quote briefly. Never invent biographical facts. " +
  "Return ONLY valid JSON matching the requested shape.";

export const buildWholePoemPrompt = (poem: Poem): string =>
  `You are the Poet's Companion, a warm scholar of classical poetry explaining to a curious general reader.\n${groundRules}\nShape: {"summary": "2-3 sentences on what the poem says", "themes": ["3-5 short themes"], "form": "1-2 sentences on form, meter, or rhyme", "devices": [{"name": "device name", "quote": "brief quoted evidence", "effect": "what it does"}], "closing": "one sentence takeaway"}\n"${poem.title}" by ${poem.author}:\n${numbered(poem)}`;

export const buildLinePrompt = (poem: Poem, lineIndex: number): string => {
  const target = poem.lines[lineIndex] ?? "";
  return (
    `You are the Poet's Companion, a warm scholar of classical poetry explaining to a curious general reader.\n${groundRules}\n` +
    `Shape: {"paraphrase": "plain-language restatement of the line", "meaning": "2-3 sentences on what the line contributes", "devices": [{"name": "device name", "effect": "what it does"}]}\n` +
    `Line ${lineIndex + 1} ("${target}") from "${poem.title}" by ${poem.author}. Full poem for context:\n${numbered(poem)}`
  );
};
