"use client";

import { Suspense } from "react";
import { AuthSkeleton } from "@/components/auth-skeleton";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<AuthSkeleton />}>
      {children}
    </Suspense>
  );
}