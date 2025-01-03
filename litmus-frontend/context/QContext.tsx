"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// first we define a type QueryContextType
type QueryContextType = {
  query: string;
  setQuery: (query: string) => void; // first time seeing a function defined in type
};

const QueryContext = createContext<QueryContextType>({
  query: "", // empty string at first
  setQuery: () => {}, // default function empty
});

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState("");

  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children} {/* Render the children components inside the provider */}
    </QueryContext.Provider>
  );
};

export const useQuery = () => useContext(QueryContext);
