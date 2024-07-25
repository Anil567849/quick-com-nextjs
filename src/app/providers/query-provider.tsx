// We are making this file becuase - our children maybe server side - so we need to make sure our wrapper is client.
// All component reader once in server and then if client component then it will be rendered in client after that.

'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

let browserQueryClient: QueryClient | undefined = undefined;

function makeQueryClient() {
    return new QueryClient();
}

function getQueryClient() {
    // we are on server
    if (typeof window === 'undefined') { // there is not window on server side
        return makeQueryClient();
    } else {
        // on client
        if (!browserQueryClient) {
            browserQueryClient = makeQueryClient();
        }

        return browserQueryClient;
    }
}
const queryClient = getQueryClient();

export function QueryProvider({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}