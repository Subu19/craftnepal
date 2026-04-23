import {
  QueryClient,
} from '@tanstack/react-query';
import type { QueryClientConfig } from '@tanstack/react-query';

const queryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
    mutations: {
      retry: 1,
    },
  },
};

export const queryClient = new QueryClient(queryConfig);
