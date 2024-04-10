"use client";
import React, { useEffect, useState } from "react";
import { IClient } from "@/app/schemas/clients/ClientTypes";
import Link from "next/link";
import { CLIENT_API } from "@/app/utils/client-api/clients-api";
import ClientTable from "@/app/components/tables/client-table/client-table";

const Clients = () => {
  // Инициализация данных
  const [clients, setClients] = useState<IClient[]>([]);
  const [loading, setLoading] = useState(true);

  // Обновление пользователей
  const refreshClients = async () => {
    setLoading(true);
    await CLIENT_API.GET().then((data) => setClients(data as IClient[]));
    setLoading(false);
  };

  // Инициализация при загрузке
  useEffect(() => {
    refreshClients();
  }, []);

  const removeUser = (id: number) => {
    CLIENT_API.DELETE(id, () => {
      setClients(clients.filter((user) => user.id !== id));
      window.alert("Клиент успешно удален из базы данных");
    });
  }

  // При загрузке
  if (loading) return <p className="text-center mt-4">Загрузка...</p>;

  // Вывод таблицы
  return (
    <div className="w-10/12 mx-auto m-4 flex flex-col items-end">
      <Link className="btn btn-secondary w-fit" href="/clients/add">Добавить</Link>
      <ClientTable userType="clients" users={clients} removeUser={removeUser} />
    </div>
  );
};

export default Clients;