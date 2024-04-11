"use client"
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface IProps {
  pathname: string;
}

const navbar = ({ pathname }: IProps) => {
  // получение сессии
  const { status, data: session } = useSession();

  // Отображение навигационной панели
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <a className="text-xl">ADMIN {pathname}</a>
        {status === "loading" && <div>Loading...</div>}
        {status === "authenticated" && (
          <div className="flex gap-2">
            <p className="text-xl self-center">{session.user!.name}</p>
            <Link className="btn btn-ghost" href="api/auth/signout">выйти</Link>
          </div>
        )}
        {status === "unauthenticated" && (
          <Link href="api/auth/signin">Login</Link>
        )}
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/shedule">Расписание</Link>
          </li>
          <li>
            <details>
              <summary>База данных</summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li>
                  <Link href="/trainers">Тренеры</Link>
                </li>
                <li>
                  <Link href="/clients">Клиенты</Link>
                </li>
                <li>
                  <Link href="/inventory">Инвентарь</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default navbar;
