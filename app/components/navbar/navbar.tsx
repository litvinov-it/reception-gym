import React from "react";
import Link from "next/link";

interface IProps {
  pathname: string
}

const navbar = ({pathname}: IProps) => {
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">ADMIN {pathname}</a>
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
