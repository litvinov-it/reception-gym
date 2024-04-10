"use client";
import Input from "@/app/components/ui/input/input";
import { IClient } from "@/app/schemas/clients/ClientTypes";
import {
  IInputShedule,
  SheduleFields,
  TSheduleForm,
} from "@/app/schemas/shedule/InventoryTypes";
import { sheduleSchema } from "@/app/schemas/shedule/validation-schemas";
import { ITrainer } from "@/app/schemas/trainers/TrainerTypes";
import { CLIENT_API } from "@/app/utils/client-api/clients-api";
import { SHEDULE_API } from "@/app/utils/client-api/shedule-api";
import { TRAINERS_API } from "@/app/utils/client-api/trainers-api";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Page = () => {
  // стейты
  const [clients, setClients] = useState<IClient[]>([]);
  const [trainers, setTrainers] = useState<ITrainer[]>([]);

  useEffect(() => {
    CLIENT_API.GET().then((data) => setClients(data as IClient[]));
    TRAINERS_API.GET().then((data) => setTrainers(data as ITrainer[]));
  }, []);

  // инициализация формы
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

  // добавление расписания
  const onSubmit: SubmitHandler<TSheduleForm> = (data) => {
    SHEDULE_API.POST(data, () => {
      window.alert("Расписание успешно добавлено в базу данных");
    });
  };

  // изменение клиента
  const handleOnChangeClient = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (!id) return;
    setValue("clientId", Number(id));
  }

  // изменение тренера
  const handleOnChangeTrainer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (!id) return;
    setValue("trainerId", Number(id));
  }

  // поля формы
  const inputsItems: IInputShedule[] = [
    {
      label: "Дата",
      type: "datetime-local",
      register: {
        ...register("date", { valueAsDate: true }),
      },
      defaultValue: "",
      errorName: "date",
    },
  ];

  return (
    <div className="w-1/2 mx-auto m-4">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {inputsItems.map((input: IInputShedule) => (
          <Input
            type={input.type}
            key={input.label}
            label={input.label}
            register={input.register}
            defaultValue={input.defaultValue}
            error={getError(input.errorName)}
          />
        ))}
        <select
          defaultValue={""}
          className="select select-bordered w-full"
          onChange={handleOnChangeClient}
        >
          <option disabled value={""}>
            Выберите клиента
          </option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.lastName} {client.firstName} {client.middleName}
            </option>
          ))}
        </select>
        <select
          defaultValue={""}
          className="select select-bordered w-full"
          onChange={handleOnChangeTrainer}
        >
          <option disabled value={""}>
            Выберите тренера
          </option>
          {trainers.map((trainer) => (
            <option key={trainer.id} value={trainer.id}>
              {trainer.lastName} {trainer.firstName} {trainer.middleName}
            </option>
          ))}
        </select> 
        <button className="btn">Сохранить</button>
      </form>
    </div>
  );
};

export default Page;
