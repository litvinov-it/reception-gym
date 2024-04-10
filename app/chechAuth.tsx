"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const CheckAuth = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();
  const pathname = (router as any).pathname;

  if (status === "unauthenticated" && pathname !== "/api/auth/signin") {
    console.log("redirect");
    router.push("/api/auth/signin");
  }

  return <div>{children}</div>;
};

export default CheckAuth;
