"use client";
import Input from "@/app/components/ui/input/input";
import { IClient } from "@/app/schemas/clients/ClientTypes";
import {
  IInputShedule,
  IShedule,
  SheduleFields,
  TSheduleForm,
} from "@/app/schemas/shedule/InventoryTypes";
import { sheduleSchema } from "@/app/schemas/shedule/validation-schemas";
import { ITrainer } from "@/app/schemas/trainers/TrainerTypes";
import { CLIENT_API } from "@/app/utils/client-api/clients-api";
import { SHEDULE_API } from "@/app/utils/client-api/shedule-api";
import { TRAINERS_API } from "@/app/utils/client-api/trainers-api";
import { generateValueInputDate } from "@/app/utils/date/generateValueInputDate";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IProps {
  params: {
    id: string;
  };
}

const Page = ({ params: { id } }: IProps) => {
  // инициализация состояний
  const [shedule, setShedule] = useState<IShedule | null>(null);
  const [client, setClient] = useState<IClient | null>(null);
  const [trainer, setTrainer] = useState<ITrainer | null>(null);
  const [loading, setLoading] = useState(true);

  // функция обновления данных
  const refreshShedule = async () => {
    setLoading(true);
    const data = await SHEDULE_API.GET(id).then((data) => data as IShedule)
    const client = await CLIENT_API.GET(String(data.clientId)).then((data) => data as IClient)
    const trainer = await TRAINERS_API.GET(String(data.trainerId)).then((data) => data as ITrainer)
    setShedule(data);
    setClient(client);
    setTrainer(trainer);
    setLoading(false);

    // костыльная инициализация данных
    setValue("clientId", data.clientId)
    setValue("trainerId", data.trainerId) 
  };

  // при загрузке
  useEffect(() => {
    refreshShedule();
  }, []);

  // данные формы
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<TSheduleForm>({
    resolver: zodResolver(sheduleSchema),
  });

  // получение ошибок
  const getError = (nameInput: SheduleFields) => errors[nameInput];

  // отправка формы
  const onSubmit: SubmitHandler<TSheduleForm> = (data) => {
    SHEDULE_API.UPDATE(data, id, () => {
      setShedule(data as IShedule);
      window.alert("Расписание успешно обновлено");
    });
  };

  const inputsItems: IInputShedule[] = [
    {
      type: "datetime-local",
      label: "Дата",
      errorName: "date",
      register: register("date", { valueAsDate: true, required: true }),
      defaultValue: generateValueInputDate(shedule?.date),
    },
  ];

  if (loading) return <p className="text-center mt-4">Загрузка...</p>;

  return (
    <div className="w-1/2 mx-auto m-4">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {inputsItems.map((input) => (
          <Input
            type={input.type}
            key={input.label}
            label={input.label}
            register={input.register}
            defaultValue={input.defaultValue}
            error={getError(input.errorName)}
          />
        ))}
        
        {/* client */}
        <span className="label-text">{"Клиент: "}</span>
        <input type="text" className="input input-bordered w-full" value={client?.firstName + " " + client?.lastName} disabled />

        {/* trainer */}
        <span className="label-text">{"Тренер: "}</span>
        <input type="text" className="input input-bordered w-full" value={trainer?.firstName + " " + trainer?.lastName} disabled />

        {/* save */}
        <button type="submit" className="btn">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default Page;
