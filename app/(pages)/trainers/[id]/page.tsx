"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/app/components/ui/input/input";
import {
  IInputTrainer,
  ITrainer,
  TrainerFields,
  TrainerTypes,
  TTrainerForm,
} from "@/app/schemas/trainers/TrainerTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { trainerSchema } from "@/app/schemas/trainers/validation-schemas";
import { TRAINERS_API } from "@/app/utils/client-api/trainers-api";

interface IProps {
  params: {
    id: string;
  };
}

const Page = ({ params: { id } }: IProps) => {
  // Инициализация состояния
  const [trainer, setTrainer] = useState<ITrainer | null>(null);
  const [loading, setLoading] = useState(true);

  // Обновление тренера
  const refreshTrainer = async () => {
    // Получение данных
    setLoading(true);
    const trainer = await TRAINERS_API.GET(id).then((data) => data as ITrainer);
    setTrainer(trainer);
    setLoading(false);

    // Костыльная нициализация некоторых данных для формы
    setValue("photoUrl", trainer!.photoUrl);
  };

  // Инициализация тренера
  useEffect(() => {
    refreshTrainer();
  }, []);

  // Инициализация формы
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TTrainerForm>({
    resolver: zodResolver(trainerSchema), 
  });

  // Получение ошибки
  const getError = (nameInput: TrainerFields) => errors[nameInput];

  // Обработчик формы
  const onSubmit: SubmitHandler<TTrainerForm> = (data) => {
    TRAINERS_API.UPDATE(data, trainer!.id, () => {
      window.alert("Клиент успешно обновлен");
    })
  };

  // Список полей
  const inputsItems: IInputTrainer[] = [
    {
      label: "Имя",
      type: "text",
      register: {
        ...register("firstName"),
      },
      defaultValue: trainer?.firstName,
      errorName: "firstName",
    },
    {
      label: "Фамилия",
      type: "text",
      register: {
        ...register("lastName"),
      },
      defaultValue: trainer?.lastName,
      errorName: "lastName",
    },
    {
      label: "Отчество",
      type: "text",
      register: {
        ...register("middleName"),
      },
      defaultValue: trainer?.middleName,
      errorName: "middleName",
    },
    {
      label: "День рождения",
      type: "text",
      register: {
        ...register("dateOfBirth"),
      },
      defaultValue: trainer?.dateOfBirth,
      errorName: "dateOfBirth",
    },
    {
      label: "Серия паспорта",
      type: "number",
      register: {
        ...register("passportSeries", { valueAsNumber: true }),
      },
      defaultValue: trainer?.passportSeries,
      errorName: "passportSeries",
    },
    {
      label: "Номер паспорта",
      type: "number",
      register: {
        ...register("passportNumber", { valueAsNumber: true }),
      },
      defaultValue: trainer?.passportNumber,
      errorName: "passportNumber",
    },
    {
      label: "Номер телефона",
      type: "string",
      register: {
        ...register("phoneNumber"),
      },
      defaultValue: trainer?.phoneNumber,
      errorName: "phoneNumber",
    },
  ];

  // При загрузке страницы
  if (loading) return <p className="text-center mt-4">Загрузка...</p>;

  // Возврат формы
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
