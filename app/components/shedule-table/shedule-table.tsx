import { IShedule } from "@/app/schemas/shedule/InventoryTypes";
import React from "react";
import SheduleRow from "./shedule-row";

interface IProps {
  sheduleList: IShedule[];
  removeShedule: (id: number) => void;
}

const SheduleTable = ({ sheduleList, removeShedule }: IProps) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>Клиент</th>
            <th>Тренер</th>
            <th>Дата</th>
          </tr>
        </thead>

        {/* body */}
        <tbody>
          {sheduleList.map((item: IShedule) => (
            <SheduleRow
              key={item.id + String(item.date)}
              item={item}
              removeShedule={removeShedule}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SheduleTable;
