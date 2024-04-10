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
      {/* id */}
      <th>{item.id}</th>
      {/* name */}
      <td>{item.name}</td>
      {/* description */}
      <td className="max-w-[400px]">{item.description}</td>
      {/* count */}
      <td>{item.count}</td>
      {/* actions */}
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
