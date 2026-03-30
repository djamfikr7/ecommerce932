"use client";

import { AuthProvider } from "@/store/auth-context";
import { Toaster } from "react-hot-toast";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#1b1b1b",
            color: "#fff",
          },
        }}
      />
    </AuthProvider>
  );
}
