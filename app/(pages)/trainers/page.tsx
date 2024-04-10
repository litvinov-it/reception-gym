"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ITrainer } from "@/app/schemas/trainers/TrainerTypes";
import { TrainerTable } from "@/app/components/tables/trainer-table/trainer-table";
import { TRAINERS_API } from "@/app/utils/client-api/trainers-api";

const Trainers = () => {
  // Инициализация данных
  const [trainers, setTrainers] = useState<ITrainer[]>([]);
  const [loading, setLoading] = useState(true);

  // Обновление пользователей
  const refresTrainers = async () => {
    setLoading(true);
    await TRAINERS_API.GET().then((data) => setTrainers(data as ITrainer[]));
    setLoading(false);
  };

  // Удаление пользователя
  const removeUser = async (id: number) => {
    TRAINERS_API.DELETE(id, () => {
      setTrainers(trainers.filter((user) => user.id !== id));
      window.alert("Клиент успешно удален из базы данных");
    });
  };

  // Инициализация данных
  useEffect(() => {
    refresTrainers();
  }, []);

  // При загрузке
  if (loading) return <p className="text-center mt-4">Загрузка...</p>;

  // Вывод таблицы
  return (
    <div className="w-10/12 mx-auto m-4 flex flex-col items-end">
      <Link className="btn btn-secondary w-fit" href="/trainers/add">
        Добавить
      </Link>
      <TrainerTable users={trainers} removeUser={removeUser} />
    </div>
  );
};

export default Trainers;
