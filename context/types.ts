import { BookAnalysis } from "@/lib/types";

export type State = {
  bookId: string;
  bookTitle: string;
  isLoading: boolean;
  error: string | null;
  analysis: BookAnalysis | null;
  activeTab: string;
  loadingStep: string;
};

export type Action =
  | { type: "SET_BOOK_ID"; payload: string }
  | { type: "SET_BOOK_TITLE"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_ANALYSIS"; payload: BookAnalysis | null }
  | { type: "SET_ACTIVE_TAB"; payload: string }
  | { type: "SET_LOADING_STEP"; payload: string };
