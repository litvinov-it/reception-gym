"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

// Компонент проверки авторизации
const CheckAuth = ({ children }: { children: React.ReactNode }) => {
  // получение статуса авторизации
  const { status } = useSession();

  // маршрутер
  const router = useRouter();
  // получение пути
  const pathname = (router as any).pathname;

  // проверка статуса авторизации, пути. И редирект
  if (status === "unauthenticated" && pathname !== "/api/auth/signin") {
    router.push("/api/auth/signin");
  }

  // Если авторизирован выводить страницы
  return <div>{children}</div>;
};

export default CheckAuth;
