"use client";

import { createContext, useContext, useReducer } from "react";

import { reducer } from "./reducer";
import type { Action, State } from "./types";

const StateCtx = createContext<State | null>(null);
const DispatchCtx = createContext<React.Dispatch<Action> | null>(null);

export const useAppCtx = () => {
  const stateCtx = useContext(StateCtx);
  const dispatchCtx = useContext(DispatchCtx);
  if (!stateCtx || !dispatchCtx)
    throw new Error(`'useAppCtx' must be used within 'AppCtxProvider'`);
  return [stateCtx, dispatchCtx] as const;
};

export const DEFAULT_BOOK = {
  id: "1787",
  title: "Hamlet by William Shakespeare",
};

export const AppCtxProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    bookId: DEFAULT_BOOK.id,
    bookTitle: "",
    isLoading: false,
    error: null,
    analysis: null,
    activeTab: "network",
    loadingStep: "",
  });

  return (
    <StateCtx.Provider value={state}>
      <DispatchCtx.Provider value={dispatch}>{children}</DispatchCtx.Provider>
    </StateCtx.Provider>
  );
};
