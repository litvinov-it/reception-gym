import { IClient } from "@/app/schemas/clients/ClientTypes";
import Link from "next/link";
import React from "react";

interface IProps {
  user: IClient;
  removeUser: (id: number) => void;
  userType: string;
}

const TableRow = ({ user, removeUser, userType }: IProps) => {
  const abonementIsActive = () => {
    if (!user.dateAbonement) return false;
    return new Date() < new Date(user.dateAbonement);
  };
  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={user.photoUrl} alt="Avatar" />
            </div>
          </div>
          <div>
            <div className="font-bold">
              {user.lastName} {user.firstName}
              {abonementIsActive() && (
                <span className="badge badge-success ml-4">Активен</span>
              )}
            </div>
            <div className="text-sm opacity-50">{user.middleName}</div>
          </div>
        </div>
      </td>
      <td>
        {user.passportSeries} {user.passportNumber}
      </td>
      <td>{user.dateOfBirth}</td>
      <th>
        <Link
          className="btn btn-ghost btn-xs mr-2"
          href={`/${userType}/${user.id}`}
        >
          редактировать
        </Link>
        <button
          onClick={() => removeUser(user.id)}
          className="btn btn-error btn-xs"
        >
          удалить
        </button>
      </th>
    </tr>
  );
};

export default TableRow;
