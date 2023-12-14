'use client';

import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

type ReactQueryProviderProps = {
    children: ReactNode;
};

const queryClient = new QueryClient();

function ReactQueryProvider({ children }: ReactQueryProviderProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

export default ReactQueryProvider;
