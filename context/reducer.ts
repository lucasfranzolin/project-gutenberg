import type { Action, State } from "./types";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_BOOK_ID":
      return { ...state, bookId: action.payload };
    case "SET_BOOK_TITLE":
      return { ...state, bookTitle: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_ANALYSIS":
      return { ...state, analysis: action.payload };
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.payload };
    case "SET_LOADING_STEP":
      return { ...state, loadingStep: action.payload };
    default:
      return state;
  }
};
