import { IClient } from "@/app/schemas/clients/ClientTypes";
import { IShedule } from "@/app/schemas/shedule/InventoryTypes";
import { ITrainer } from "@/app/schemas/trainers/TrainerTypes";
import { formatDate } from "@/app/utils/formatDate";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface IProps {
  item: IShedule;
  removeShedule: (id: number) => void;
}

const SheduleRow = ({ item, removeShedule }: IProps) => {
  const [client, setClient] = useState<IClient>();
  const [trainer, setTrainer] = useState<ITrainer>();

  useEffect(() => {
    fetch(`http://localhost:3000/api/clients/${item.clientId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return window.alert("Неизвестная ошибка на сервере");
        setClient(data);
      });

    fetch(`http://localhost:3000/api/trainers/${item.trainerId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return window.alert("Неизвестная ошибка на сервере");
        setTrainer(data);
      });
  }, []);

  return (
    <tr>
      <th>{client?.firstName + " " + client?.lastName}</th>
      <th>{trainer?.firstName + " " + trainer?.lastName}</th>
      <th>{formatDate(item.date)}</th>
      <td>
        <Link className="btn btn-ghost btn-xs" href={`/shedule/${item.id}`}>
          редактировать
        </Link>
        <button
          className="btn btn-error btn-xs"
          onClick={() => removeShedule(item.id)}
        >
          удалить
        </button>
      </td>
    </tr>
  );
};

export default SheduleRow;
