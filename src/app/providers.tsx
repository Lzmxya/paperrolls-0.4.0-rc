"use client";

// next-themes
import { ThemeProvider } from "next-themes";

// react-redux
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/libs/redux";

// use-query-params
import { QueryParamProvider } from "use-query-params";
import NextAdapterApp from "next-query-params/app";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <QueryParamProvider adapter={NextAdapterApp}>
        <ThemeProvider attribute="class" storageKey="theme">
          {children}
        </ThemeProvider>
      </QueryParamProvider>
    </ReduxProvider>
  );
}
