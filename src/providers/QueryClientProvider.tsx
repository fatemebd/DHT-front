
import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";

interface QueryClientProps {
  children: ReactNode;
}

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Number.POSITIVE_INFINITY,
      staleTime: Number.POSITIVE_INFINITY,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 2,
      retryDelay: 1000,
    },
  },
});

const QueryClientProvider = ({ children }: QueryClientProps) => (
  <TanstackQueryClientProvider client={client}>
    {children}
    <ReactQueryDevtools initialIsOpen={true} />
  </TanstackQueryClientProvider>
);

export default QueryClientProvider;
