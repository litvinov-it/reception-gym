"use client";
import SheduleTable from "@/app/components/shedule-table/shedule-table";
import { IShedule } from "@/app/schemas/shedule/InventoryTypes";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Shedule = () => {
  const [shedule, setShedule] = useState<IShedule[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshShedule = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:3000/api/shedule");
    const data = await res.json();
    setShedule(data);
    setLoading(false);
  };

  const removeShedule = async (id: number) => {
    await fetch("http://localhost:3000/api/shedule/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return window.alert("Неизвестная ошибка на сервере");
        refreshShedule();
        window.alert("Клиент удален успешно");
      });
  };

  useEffect(() => {
    refreshShedule();
  }, []);

  if (loading) return <p className="text-center mt-4">Загрузка...</p>;

  return (
    <div className="w-10/12 mx-auto m-4 flex flex-col items-end">
      <Link className="btn btn-secondary w-fit" href="/shedule/add">
        Добавить
      </Link>
      <SheduleTable sheduleList={shedule} removeShedule={removeShedule} />
    </div>
  );
};

export default Shedule;
