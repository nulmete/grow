import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
