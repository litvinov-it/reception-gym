import { IInventory } from "@/app/schemas/inventory/InventoryTypes";
import React from "react";
import TableRow from "./table-row";

interface IProps {
  inventoryList: IInventory[];
  deleteInventory: (id: number) => void;
}

const InvetoryTable = ({ inventoryList, deleteInventory }: IProps) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Описание</th>
            <th>Количество</th>
            <th>Действия</th>
          </tr>
        </thead>

        {/* body */}
        <tbody>
          {inventoryList.map((item: IInventory) => (
            <TableRow key={item.id} item={item} deleteInventory={deleteInventory} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvetoryTable;
