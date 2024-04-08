import { IInventory } from "@/app/schemas/inventory/InventoryTypes";
import Link from "next/link";
import React from "react";

interface IProps {
  item: IInventory;
  deleteInventory: (id: number) => void;
}

const TableRow = ({ item, deleteInventory }: IProps) => {
  return (
    <tr>
      <th>{item.id}</th>
      <td>{item.name}</td>
      <td className="max-w-[400px]">{item.description}</td>
      <td>{item.count}</td>
      <td>
        <Link className="btn btn-ghost btn-xs" href={`/inventory/${item.id}`}>редактировать</Link>
        <button
          className="btn btn-error btn-xs"
          onClick={() => deleteInventory(item.id)}
        >
          удалить
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
