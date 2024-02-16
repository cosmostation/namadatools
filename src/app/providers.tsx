"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <CssVarsProvider disableTransitionOnChange defaultMode="dark">
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        {props.children}
      </QueryClientProvider>
    </CssVarsProvider>
  );
}
