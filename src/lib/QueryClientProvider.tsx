"use client";

import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/components/Navbar/Header";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import { store } from "./store/store";
const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 24 * 60 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 3,
      retryDelay: 5000,
      gcTime: 7 * 24 * 60 * 60 * 1000,
    },
  },
});

const Footer = dynamic(() => import("../components/Footer/Footer"));
export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <div className="flex flex-col min-h-screen ">
          <Header />
          <div className="contain my-6">
            {children || (
              <div className="flex items-center justify-center h-full"></div>
            )}
          </div>
          <Footer />
        </div>
      </QueryClientProvider>
    </Provider>
  );
}
