"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/app/components/input/input";
import {
  ClientFields,
  IClient,
  IInputClient,
  TClientForm,
} from "@/app/schemas/clients/ClientTypes";
import { clientSchema } from "@/app/schemas/clients/validation-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateValueInputDate } from "@/app/utils/generateValueInputDate";

interface IProps {
  params: {
    id: string;
  };
}

const Page = ({ params: { id } }: IProps) => {
  const [client, setClient] = useState<IClient | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshClient = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:3000/api/clients/" + id);
    const client: IClient = await res.json();
    setClient(client);
    setLoading(false);
  };

  useEffect(() => {
    refreshClient();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TClientForm>({
    resolver: zodResolver(clientSchema),
  });

  const getError = (nameInput: ClientFields) => errors[nameInput];

  const onSubmit: SubmitHandler<TClientForm> = (data) => {
    fetch("http://localhost:3000/api/clients/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error)
          return window.alert("Произошла ошибка при изменении клиента");
        window.alert("Данные обновлены успешно");
      });
  };

  const inputsItems: IInputClient[] = [
    {
      label: "Имя",
      type: "text",
      register: {
        ...register("firstName"),
      },
      defaultValue: client?.firstName,
      errorName: "firstName",
    },
    {
      label: "Фамилия",
      type: "text",
      register: {
        ...register("lastName"),
      },
      defaultValue: client?.lastName,
      errorName: "lastName",
    },
    {
      label: "Отчество",
      type: "text",
      register: {
        ...register("middleName"),
      },
      defaultValue: client?.middleName,
      errorName: "middleName",
    },
    {
      label: "День рождения",
      type: "text",
      register: {
        ...register("dateOfBirth"),
      },
      defaultValue: client?.dateOfBirth,
      errorName: "dateOfBirth",
    },
    {
      label: "Серия паспорта",
      type: "number",
      register: {
        ...register("passportSeries", { valueAsNumber: true }),
      },
      defaultValue: client?.passportSeries,
      errorName: "passportSeries",
    },
    {
      label: "Номер паспорта",
      type: "number",
      register: {
        ...register("passportNumber", { valueAsNumber: true }),
      },
      defaultValue: client?.passportNumber,
      errorName: "passportNumber",
    },
    {
      label: "Номер телефона",
      type: "string",
      register: {
        ...register("phoneNumber"),
      },
      defaultValue: client?.phoneNumber,
      errorName: "phoneNumber",
    },
    {
      label: "Фото",
      type: "text",
      register: {
        ...register("photoUrl"),
      },
      defaultValue: client?.photoUrl,
      errorName: "photoUrl",
    },
    {
      label: "Абонемент до",
      type: "date",
      register: {
        ...register("dateAbonement", { valueAsDate: true }),
      },
      defaultValue: generateValueInputDate(client?.dateAbonement),
      errorName: "dateAbonement",
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
        <button className="btn">Сохранить</button>
      </form>
    </div>
  );
};

export default Page;
