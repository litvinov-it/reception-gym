"use client";
import React, { useEffect, useState } from "react";
import UserTable from "../../components/user-table/user-table";
import { IClient } from "@/app/schemas/clients/ClientTypes";
import Link from "next/link";

const Clients = () => {
  const [clients, setClients] = useState<IClient[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshClients = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:3000/api/clients");
    const data = await res.json();
    setClients(data);
    setLoading(false);
  };

  const removeUser = async (id: number) => {
    await fetch("http://localhost:3000/api/clients/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return window.alert("Неизвестная ошибка на сервере");
        setClients(clients.filter((user) => user.id !== id));
        window.alert("Клиент удален успешно");
      });
  };

  useEffect(() => {
    refreshClients();
  }, []);

  if (loading) return <p className="text-center mt-4">Загрузка...</p>;

  return (
    <div className="w-10/12 mx-auto m-4 flex flex-col items-end">
      <Link className="btn btn-secondary w-fit" href="/clients/add">
        Добавить
      </Link>
      <UserTable userType="clients" users={clients} removeUser={removeUser} />
    </div>
  );
};

export default Clients;
