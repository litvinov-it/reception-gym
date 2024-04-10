"use client";
import React, { useEffect, useState } from "react";
import InventoryTable from "../../components/tables/inventory-table/inventory-table";
import { IInventory } from "@/app/schemas/inventory/InventoryTypes";
import Link from "next/link";
import { INVENTORY_API } from "@/app/utils/client-api/inventory-api";

const Inventory = () => {
  // инициализация сотсояний
  const [inventoryList, setInventoryList] = useState<IInventory[]>([]);
  const [loading, setLoading] = useState(false);

  // обновление данных
  const refreshInventory = async () => {
    setLoading(true);
    await INVENTORY_API.GET().then((data) => setInventoryList(data as IInventory[]));
    setLoading(false);
  };

  // Удаление инвентаря
  const deleteInventory = async (id: number) => {
    INVENTORY_API.DELETE(id, () => {
      setInventoryList(inventoryList.filter((inventory) => inventory.id !== id));
      window.alert("Клиент успешно удален из базы данных");
    });
  };

  // получение данных
  useEffect(() => {
    refreshInventory();
  }, []);

  // При загрузке страницы 
  if (loading) return <p className="text-center mt-4">Загрузка...</p>;

  // Вывод таблицы
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
