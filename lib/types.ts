import { z } from "zod";
import {
  BookAnalysisSchema,
  CharacterSchema,
  InteractionSchema,
  KeyQuoteSchema,
} from "./schemas";

export type Character = z.infer<typeof CharacterSchema>;
export type Interaction = z.infer<typeof InteractionSchema>;
export type KeyQuote = z.infer<typeof KeyQuoteSchema>;
export type BookAnalysis = z.infer<typeof BookAnalysisSchema>;
