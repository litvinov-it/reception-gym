import React from "react";
import TableRow from "./client-row";
import { IClient } from "@/app/schemas/clients/ClientTypes";

interface IProps {
  users: IClient[];
  userType: string;
  removeUser: (id: number) => void;
}

const ClientTable = ({ users, userType, removeUser }: IProps) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Пользователь</th>
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
              userType={userType}
              user={user}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
