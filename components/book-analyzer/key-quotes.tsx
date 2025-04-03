"use client";

import { Badge, badgeVariants } from "@/components/ui/badge";
import { useAppCtx } from "@/context";
import { VariantProps } from "class-variance-authority";

export function KeyQuotes() {
  const [state] = useAppCtx();

  if (!state.analysis?.keyQuotes) return null;

  // Sort quotes by importance
  const sortedQuotes = [...state.analysis.keyQuotes].sort(
    (a, b) => b.importance - a.importance
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Key Quotes</h3>
      <div className="space-y-4">
        {sortedQuotes.map((quote, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 bg-white shadow-sm flex flex-col space-y-2"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-2">
                {quote.characters.map((character) => (
                  <Badge key={character} variant="outline">
                    {character}
                  </Badge>
                ))}
              </div>
              <Badge variant={getSentimentVariant(quote.sentiment)}>
                {getSentimentLabel(quote.sentiment)}
              </Badge>
            </div>
            <blockquote className="border-l-4 border-slate-200 pl-4 italic">
              "{quote.text}""
            </blockquote>
            <p className="text-sm text-slate-600">{quote.context}</p>
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
