"use server";

import { generateObject } from "ai";
import { model, TOKEN_LIMIT } from "./ai";
import { BookAnalysisSchema } from "./schemas";

export async function fetchBookContent(
  bookId: string
): Promise<{ content: string; title: string }> {
  const possibleContentUrls = [
    `https://www.gutenberg.org/files/${bookId}/${bookId}-0.txt`,
    `https://www.gutenberg.org/files/${bookId}/${bookId}.txt`,
    `https://www.gutenberg.org/cache/epub/${bookId}/pg${bookId}.txt`,
  ];

  let title = `Book #${bookId}`;
  let lastError: Error | null = null;

  try {
    const metadataResponse = await fetch(
      `https://www.gutenberg.org/ebooks/${bookId}`
    );
    if (metadataResponse.ok) {
      const html = await metadataResponse.text();

      // Look for <meta name="title" content="...">
      const metaTitleMatch = html.match(
        /<meta\s+name="title"\s+content="([^"]+)"\s*\/?>/i
      );

      if (metaTitleMatch && metaTitleMatch[1]) {
        title = metaTitleMatch[1];
      }
    }
  } catch (error) {
    console.warn(
      "Failed to fetch metadata, falling back to content extraction:",
      error
    );
  }

  // Try each possible URL until one works
  for (const url of possibleContentUrls) {
    try {
      const response = await fetch(url);
      if (!response.ok) continue;

      let content = await response.text();

      const donationText = "We need your donations.";
      const donationIndex = content.indexOf(donationText);
      if (donationIndex !== -1) {
        // Only keep content after the donation message
        content = content.slice(donationIndex + donationText.length).trim();
      }

      return { content, title };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      continue;
    }
  }

  throw new Error(
    `Failed to fetch book ${bookId}: ${
      lastError ? lastError.message : "All URL patterns failed"
    }`
  );
}

export async function analyzeBook(content: string) {
  try {
    const cleanedContent = content.replace(/\s+/g, " ").trim();

    // Truncate if exceeding token limit
    const truncatedContent =
      cleanedContent.length > TOKEN_LIMIT
        ? cleanedContent.substring(0, TOKEN_LIMIT)
        : cleanedContent;

    const result = await generateObject({
      model,
      system: `
      You are analyzing a book's content.
        - Analyze at least 5 but no more than 15 characters.
        - For interactions, identify relationships between characters.
        - Get at least 5 key quotes.
      `,
      schemaName: "BookAnalysis",
      schema: BookAnalysisSchema,
      prompt: truncatedContent,
    });

    return result.object;
  } catch (error) {
    console.error("Error analyzing book:", error);
    throw new Error(
      `Failed to analyze book: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
