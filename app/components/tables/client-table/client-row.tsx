import { IClient } from "@/app/schemas/clients/ClientTypes";
import formatPhoneNumber from "@/app/utils/formatPhoneNumber";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IProps {
  user: IClient;
  userType: string;
  removeUser: (id: number) => void;
}

const TableRow = ({ user, userType, removeUser }: IProps) => {
  const abonementActive = user.dateAbonement && new Date() < new Date(user.dateAbonement);

  //
  const abonementIsActive = () => {
    if (!user.dateAbonement) return false;
    return new Date() < new Date(user.dateAbonement);
  };

  return (
    <tr>
      {/* аватар, ФИО */}
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <Image
                src={`/images/${user.photoUrl}`}
                alt="Avatar"
                width={120}
                height={120}
                priority={true}
              />
            </div>
          </div>
          <div>
            <div className="font-bold">
              {user.lastName} {user.firstName}
              {abonementActive && (
                <span className="badge badge-success ml-4">Активен</span>
              )}
            </div>
            <div className="text-sm opacity-50">{user.middleName}</div>
          </div>
        </div>
      </td>

      {/* телефон */}
      <td>{formatPhoneNumber(user.phoneNumber)}</td>

      {/* паспорт */}
      <td>
        {user.passportSeries} {user.passportNumber}
      </td>

      {/* дата рождения */}
      <td>{user.dateOfBirth}</td>

      {/* Действия */}
      <th>
        <Link
          href={`/clients/${user.id}`}
          className="btn btn-ghost btn-xs mr-2"
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
