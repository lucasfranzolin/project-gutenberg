"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DEFAULT_BOOK, useAppCtx } from "@/context";
import { analyzeBook, fetchBookContent } from "@/lib/actions";
import { CharacterList } from "./character-list";
import { CharacterNetwork } from "./character-network";
import { ErrorState } from "./error-state";
import { KeyQuotes } from "./key-quotes";
import { LoadingState } from "./loading-state";

export function BookAnalyzer() {
  const [state, dispatch] = useAppCtx();

  const handleAnalyze = async () => {
    if (!state.bookId.trim()) {
      dispatch({ type: "SET_ERROR", payload: "Please enter a valid book ID" });
      return;
    }

    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });
    dispatch({ type: "SET_LOADING_STEP", payload: "Fetching book content..." });

    try {
      // Step 1: Fetch book content
      const { content, title } = await fetchBookContent(state.bookId);
      dispatch({ type: "SET_BOOK_TITLE", payload: title });

      // Step 2: Analyze the book content
      dispatch({
        type: "SET_LOADING_STEP",
        payload: "Analyzing characters and relationships...",
      });
      const bookAnalysis = await analyzeBook(content);

      // Check if we have meaningful analysis
      if (
        bookAnalysis.characters.length <= 1 &&
        bookAnalysis.interactions.length === 0
      ) {
        dispatch({
          type: "SET_ERROR",
          payload:
            "The analysis did not produce meaningful results. This could be due to the book format or length. Try a different book ID.",
        });
      }

      dispatch({ type: "SET_ANALYSIS", payload: bookAnalysis });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload:
          err instanceof Error
            ? err.message
            : "An error occurred while analyzing the book",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
      dispatch({ type: "SET_LOADING_STEP", payload: "" });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="flex-1">
              <label
                htmlFor="bookId"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Book ID
              </label>
              <Input
                id="bookId"
                value={state.bookId}
                onChange={(e) =>
                  dispatch({ type: "SET_BOOK_ID", payload: e.target.value })
                }
                placeholder="Enter Project Gutenberg book ID"
                className="w-full"
              />
              <p className="text-xs text-slate-500 mt-1">
                Example: {DEFAULT_BOOK.id} for {`"${DEFAULT_BOOK.title}"`}
              </p>
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleAnalyze}
                disabled={state.isLoading}
                className="w-full md:w-auto"
              >
                {state.isLoading ? "Analyzing..." : "Analyze Book"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ErrorState />

      <LoadingState />

      {state.analysis && !state.isLoading && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Analysis of {`"${state.bookTitle}"`}
          </h2>

          <Tabs
            value={state.activeTab}
            onValueChange={(value) =>
              dispatch({ type: "SET_ACTIVE_TAB", payload: value })
            }
          >
            <TabsList className="flex mb-6">
              <TabsTrigger className="flex-1" value="network">
                Character Network
              </TabsTrigger>
              <TabsTrigger className="flex-1" value="characters">
                Character List
              </TabsTrigger>
              <TabsTrigger className="flex-1" value="quotes">
                Key Quotes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="network" className="mt-0">
              <Card>
                <CardContent className="pt-6">
                  <CharacterNetwork />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="characters" className="mt-0">
              <Card>
                <CardContent className="pt-6">
                  <CharacterList />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quotes" className="mt-0">
              <Card>
                <CardContent className="pt-6">
                  <KeyQuotes />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
