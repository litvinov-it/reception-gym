import { IClient } from "@/app/schemas/clients/ClientTypes";
import { IShedule } from "@/app/schemas/shedule/InventoryTypes";
import { ITrainer } from "@/app/schemas/trainers/TrainerTypes";
import { CLIENT_API } from "@/app/utils/client-api/clients-api";
import { TRAINERS_API } from "@/app/utils/client-api/trainers-api";
import { formatDate } from "@/app/utils/date/formatDate";
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
    CLIENT_API.GET(String(item.clientId)).then((data) => {
      setClient(data as IClient);
    })
    TRAINERS_API.GET(String(item.trainerId)).then((data) => {
      setTrainer(data as ITrainer);
    })
  }, []);

  return (
    <tr>
      {/* клиент */}
      <th>{client?.firstName + " " + client?.lastName}</th>
      {/* тренер */}
      <th>{trainer?.firstName + " " + trainer?.lastName}</th>
      {/* дата */}
      <th>{formatDate(item.date)}</th>
      {/* Действия */}
      <td className="flex gap-2">
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
