"use client";

import { Badge, badgeVariants } from "@/components/ui/badge";
import { useAppCtx } from "@/context";
import { VariantProps } from "class-variance-authority";

export function CharacterList() {
  const [state] = useAppCtx();

  if (!state.analysis) return null;

  // Sort characters by importance
  const sortedCharacters = [...state.analysis.characters].sort(
    (a, b) => b.importance - a.importance
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Characters by Importance</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedCharacters.map((character) => (
          <div
            key={character.id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-semibold">{character.name}</h4>
              <Badge variant={getSentimentVariant(character.sentiment)}>
                {getSentimentLabel(character.sentiment)}
              </Badge>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              Importance: {character.importance.toFixed(1)}
            </p>
            <p className="mt-2 text-sm">{character.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function getSentimentVariant(
  sentiment: number
): VariantProps<typeof badgeVariants>["variant"] {
  if (sentiment < -0.3) return "destructive";
  if (sentiment > 0.3) return "default";
  return "secondary";
}

function getSentimentLabel(sentiment: number): string {
  if (sentiment < -0.6) return "Very Negative";
  if (sentiment < -0.3) return "Negative";
  if (sentiment < 0.3) return "Neutral";
  if (sentiment < 0.6) return "Positive";
  return "Very Positive";
}
