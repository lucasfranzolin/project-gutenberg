import { z } from "zod";

export const CharacterSchema = z.object({
  id: z
    .string()
    .describe(
      "A unique identifier for the character (short, lowercase, no spaces)"
    ),
  name: z.string().describe("The character's full name"),
  description: z.string().describe("A brief description of the character"),
  importance: z.number().min(1).max(10).describe("Importance score from 1-10"),
  sentiment: z.number().min(-1).max(1).describe("Sentiment score from -1 to 1"),
});

export const InteractionSchema = z.object({
  source: z.string().describe("The ID of the source character"),
  target: z.string().describe("The ID of the target character"),
  strength: z
    .number()
    .min(1)
    .max(10)
    .describe("Strength of relationship from 1-10"),
  sentiment: z
    .number()
    .min(-1)
    .max(1)
    .describe("Sentiment of relationship from -1 to 1"),
});

export const KeyQuoteSchema = z.object({
  text: z.string().describe("The quote text"),
  context: z.string().describe("Brief context about the quote"),
  characters: z
    .array(z.string())
    .describe("Names of characters involved in the quote"),
  sentiment: z.number().min(-1).max(1).describe("Sentiment score from -1 to 1"),
  importance: z.number().min(1).max(10).describe("Importance score from 1-10"),
});

export const BookAnalysisSchema = z.object({
  characters: z
    .array(CharacterSchema)
    .min(1)
    .describe("List of characters in the book"),
  interactions: z
    .array(InteractionSchema)
    .describe("List of character interactions"),
  keyQuotes: z
    .array(KeyQuoteSchema)
    .describe("List of key quotes from the book"),
});
