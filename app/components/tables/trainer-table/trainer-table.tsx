import React from "react";
import TableRow from "./trainer-row";
import { IClient } from "@/app/schemas/clients/ClientTypes";

interface IProps {
  users: IClient[];
  removeUser: (id: number) => void;
}

export const TrainerTable = ({ users, removeUser }: IProps) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Пользователь</th>
            <th>Номер телефона</th>
            <th>Паспорт</th>
            <th>Дата рождения</th>
            <th>Действия</th>
          </tr>
        </thead>

        {/* body */}
        <tbody>
          {users.map((user, index) => (
            <TableRow
              removeUser={removeUser}
              key={index + user.lastName + user.passportSeries}
              user={user}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
