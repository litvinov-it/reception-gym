"use client";
import SheduleTable from "@/app/components/tables/shedule-table/shedule-table";
import { IShedule } from "@/app/schemas/shedule/InventoryTypes";
import { SHEDULE_API } from "@/app/utils/client-api/shedule-api";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Shedule = () => {
  // инициализация состояний
  const [shedule, setShedule] = useState<IShedule[]>([]);
  const [loading, setLoading] = useState(true);

  // функция обновления данных
  const refreshShedule = async () => {
    setLoading(true);
    const data = await SHEDULE_API.GET().then((data) => data as IShedule[]);
    setShedule(data);
    setLoading(false);
  };

  // функция удаления
  const removeShedule = async (id: number) => {
    SHEDULE_API.DELETE(id, () => {
      setShedule(shedule.filter((shedule) => shedule.id !== id));
      window.alert("Расписание успешно удалено из базы данных");
    });
  };

  // первичная инициализация данных
  useEffect(() => {
    refreshShedule();
  }, []);

  // при загрузке
  if (loading) return <p className="text-center mt-4">Загрузка...</p>;

  // форма
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
