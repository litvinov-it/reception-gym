"use client";
import React, { useEffect, useRef, useState } from "react";
import UserTable from "../../components/user-table/user-table";
import Link from "next/link";
import { ITrainer } from "@/app/schemas/trainers/TrainerTypes";

const Trainers = () => {
  const [trainers, setTrainers] = useState<ITrainer[]>([]);
  const [loading, setLoading] = useState(true);

  const refresTrainers = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:3000/api/trainers");
    const data = await res.json();
    setTrainers(data);
    setLoading(false);
  };

  const removeUser = async (id: number) => {
    await fetch("/api/trainers/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return window.alert("Что то пошло не так");
        setTrainers(trainers.filter((user) => user.id !== id));
        window.alert("Тренер удален успешно");
      });
  };

  useEffect(() => {
    refresTrainers();
  }, []);

  if (loading) return <p className="text-center mt-4">Загрузка...</p>;

  return (
    <div className="w-10/12 mx-auto m-4 flex flex-col items-end">
      <Link className="btn btn-secondary w-fit" href="/trainers/add">
        Добавить
      </Link>
      <UserTable userType="trainers" users={trainers} removeUser={removeUser} />
    </div>
  );
};

export default Trainers;
