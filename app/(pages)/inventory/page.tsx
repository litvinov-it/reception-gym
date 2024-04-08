"use client";
import React, { useEffect, useState } from "react";
import InventoryTable from "../../components/inventory-table/inventory-table";
import { IInventory } from "@/app/schemas/inventory/InventoryTypes";
import Link from "next/link";

const Inventory = () => {
  const [inventoryList, setInventoryList] = useState<IInventory[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshInventory = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:3000/api/inventory");
    const data = await res.json();
    setInventoryList(data);
    setLoading(false);
  };

  const deleteInventory = async (id: number) => {
    await fetch("http://localhost:3000/api/inventory/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return window.alert("Неизвестная ошибка на сервере");
        setInventoryList(
          inventoryList.filter((inventory: IInventory) => inventory.id !== id)
        );
        window.alert("Инвентарь удален успешно");
      });
  };

  useEffect(() => {
    refreshInventory();
  }, []);

  if (loading) return <p className="text-center mt-4">Загрузка...</p>;

  return (
    <div className="w-10/12 mx-auto m-4 flex flex-col items-end">
      <Link className="btn btn-secondary w-fit" href="/inventory/add">
        Добавить
      </Link>
      <InventoryTable inventoryList={inventoryList} deleteInventory={deleteInventory} />
    </div>
  );
};

export default Inventory;
