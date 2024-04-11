"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: ReactNode
}

// Компонент провайдера авторизации чтобы следить за регистрацией
const AuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};

export default AuthProvider;