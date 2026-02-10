"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

interface AsideContextValue {
  content: ReactNode;
  setContent: (content: ReactNode) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function -- default context value placeholder
const noop = () => {};

const AsideContext = createContext<AsideContextValue>({
  content: null,
  setContent: noop,
});

export function AsideProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ReactNode>(null);

  return (
    <AsideContext.Provider value={{ content, setContent }}>
      {children}
    </AsideContext.Provider>
  );
}

export function useAside() {
  return useContext(AsideContext);
}
