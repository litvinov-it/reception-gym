"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/app/components/ui/input/input";
import {
  ClientFields,
  IClient,
  IInputClient,
  TClientForm,
} from "@/app/schemas/clients/ClientTypes";
import { clientSchema } from "@/app/schemas/clients/validation-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import InputRange from "@/app/components/ui/input-range/input-range";
import { CLIENT_API } from "@/app/utils/client-api/clients-api";

interface IProps {
  params: {
    id: string;
  };
}

const Page = ({ params: { id } }: IProps) => {
  // Инициализация переменных
  const [client, setClient] = useState<IClient | null>(null);
  const [loading, setLoading] = useState(true);

  // Обновление данных
  const refreshClient = async () => {
    // Получение данных
    setLoading(true);
    const client = await CLIENT_API.GET(id).then((data) => data as IClient);
    setClient(client);
    setLoading(false);

    // Костыльная нициализация некоторых данных для формы
    setValue("dateAbonement", new Date(client?.dateAbonement || Date.now()));
    setValue("photoUrl", client!.photoUrl);
  };

  // Инициализация данных
  useEffect(() => {
    refreshClient();
  }, []);

  // Переменные формы
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TClientForm>({
    resolver: zodResolver(clientSchema),
  });

  // Получение ошибок
  const getError = (nameInput: ClientFields) => errors[nameInput];

  // Отправка данных
  const onSubmit: SubmitHandler<TClientForm> = (data) => {
    CLIENT_API.UPDATE(data, client!.id, () => {
      window.alert("Клиент успешно обновлен");
    })
  };

  const rangeValues = [0, 1, 3, 6, 12];
  const handleChangeRange = (value: number) => {
    // value 0 = ничего не меняем
    // value 25 = увеличиваем на 1 месяц
    // value 50 = увеличиваем на 3 месяца
    // value 75 = увеличиваем на 6 месяцев
    // value 100 = увеличиваем на 12 месяцев

    // Инициализация даты
    let date = new Date(client!.dateAbonement || Date.now());

    // Если значение 0, то ничего не делаем
    if (value === 0) return;

    // Если значение 25, то увеличиваем дату на 1 месяц
    if (value === 25) {
      let oneMonthLater = new Date(date);
      oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
      date = oneMonthLater;
    }

    // Если значение 50, то увеличиваем дату на 3 месяца
    if (value === 50) {
      let threeMonthsLater = new Date(date);
      threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
      date = threeMonthsLater;
    }

    // Если значение 75, то увеличиваем дату на 6 месяцев
    if (value === 75) {
      let sixMonthsLater = new Date(date);
      sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
      date = sixMonthsLater;
    }

    // Если значение 100, то увеличиваем дату на 12 месяцев
    if (value === 100) {
      let twelveMonthsLater = new Date(date);
      twelveMonthsLater.setMonth(twelveMonthsLater.getMonth() + 12);
      date = twelveMonthsLater;
    }

    // Изменение даты абонемента
    setValue("dateAbonement", new Date(date));
  };

  // Инициализация инпутов
  const inputsItems: IInputClient[] = [
    // Имя
    {
      label: "Имя",
      type: "text",
      register: {
        ...register("firstName"),
      },
      defaultValue: client?.firstName,
      errorName: "firstName",
    },
    // Фамилия
    {
      label: "Фамилия",
      type: "text",
      register: {
        ...register("lastName"),
      },
      defaultValue: client?.lastName,
      errorName: "lastName",
    },
    // Отчество
    {
      label: "Отчество",
      type: "text",
      register: {
        ...register("middleName"),
      },
      defaultValue: client?.middleName,
      errorName: "middleName",
    },
    // Дата рождения
    {
      label: "День рождения",
      type: "text",
      register: {
        ...register("dateOfBirth"),
      },
      defaultValue: client?.dateOfBirth,
      errorName: "dateOfBirth",
    },
    // Серия паспорта
    {
      label: "Серия паспорта",
      type: "number",
      register: {
        ...register("passportSeries", { valueAsNumber: true }),
      },
      defaultValue: client?.passportSeries,
      errorName: "passportSeries",
    },
    // Номер паспорта
    {
      label: "Номер паспорта",
      type: "number",
      register: {
        ...register("passportNumber", { valueAsNumber: true }),
      },
      defaultValue: client?.passportNumber,
      errorName: "passportNumber",
    },
    // Номер телефона
    {
      label: "Номер телефона",
      type: "string",
      register: {
        ...register("phoneNumber"),
      },
      defaultValue: client?.phoneNumber,
      errorName: "phoneNumber",
    },
  ];

  // При загрузке
  if (loading) return <p className="text-center mt-4">Загрузка...</p>;

  // Форма
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
        <InputRange
          label="Продление абонемента на:"
          defaultValue={0}
          values={rangeValues}
          onChange={handleChangeRange}
        />
        <button className="btn">Сохранить</button>
      </form>
    </div>
  );
};

export default Page;
