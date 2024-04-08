import React from "react";
import TableRow from "./table-row";
import { IClient } from "@/app/schemas/clients/ClientTypes";

interface IProps {
  users: IClient[];
  removeUser: (id: number) => void;
  userType: string;
}

const UserTable = ({ users, removeUser, userType }: IProps) => {
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
            userType={userType}
              key={index + user.lastName + user.passportSeries}
              user={user}
              removeUser={removeUser}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
