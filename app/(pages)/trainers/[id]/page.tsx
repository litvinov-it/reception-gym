"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/app/components/input/input";
import { Inputs } from "@/app/models/inputsTrainers";
import { IInput } from "@/app/models/input";
import { ITrainer } from "@/app/models/trainer";

interface IProps {
  params: {
    id: string;
  };
}

const Page = ({ params: { id } }: IProps) => {
  const [trainer, setTrainer] = useState<ITrainer | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshTrainer = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:3000/api/trainers/" + id);
    const trainer: ITrainer = await res.json();
    setTrainer(trainer);
    setLoading(false);
  };

  useEffect(() => {
    refreshTrainer();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const getError = (nameInput: keyof Inputs) => errors[nameInput];

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // const finalData: Inputs = {
    //   ...data,
    //   phoneNumber: data.phoneNumber.replace(/\D/g, "").slice(1),
    // };

    fetch("http://localhost:3000/api/trainers/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => window.alert(`Данные обновлены успешно ${res.firstName}`))
      .catch((e) => window.alert("Данные не обновлены: " + e.message));
  };

  const inputsItems: IInput[] = [
    {
      label: "Имя",
      type: "text",
      register: {
        ...register("firstName", {
          required: "Обязательное поле",
          minLength: { value: 3, message: "Минимум 3 символа" },
          maxLength: { value: 15, message: "Максимум 15 символов" },
        }),
      },
      defaultValue: trainer?.firstName,
      errorName: "firstName",
    },
    {
      label: "Фамилия",
      type: "text",
      register: {
        ...register("lastName", {
          required: "Обязательное поле",
          minLength: { value: 3, message: "Минимум 3 символа" },
          maxLength: { value: 15, message: "Максимум 15 символов" },
        }),
      },
      defaultValue: trainer?.lastName,
      errorName: "lastName",
    },
    {
      label: "Отчество",
      type: "text",
      register: {
        ...register("middleName", {
          required: "Обязательное поле",
          minLength: { value: 3, message: "Минимум 3 символа" },
          maxLength: { value: 15, message: "Максимум 15 символов" },
        }),
      },
      defaultValue: trainer?.middleName,
      errorName: "middleName",
    },
    {
      label: "День рождения",
      type: "text",
      register: {
        ...register("dateOfBirth", {
          required: "Обязательное поле",
        }),
      },
      defaultValue: trainer?.dateOfBirth,
      errorName: "dateOfBirth",
    },
    {
      label: "Серия паспорта",
      type: "number",
      register: {
        ...register("passportSeries", {
          required: "Обязательное поле",
          minLength: { value: 4, message: "Минимум 4 символа" },
          maxLength: { value: 4, message: "Максимум 4 символа" },
        }),
      },
      defaultValue: trainer?.passportSeries,
      errorName: "passportSeries",
    },
    {
      label: "Номер паспорта",
      type: "number",
      register: {
        ...register("passportNumber", {
          required: "Обязательное поле",
          minLength: { value: 6, message: "Минимум 6 символа" },
          maxLength: { value: 6, message: "Максимум 6 символа" },
        }),
      },
      defaultValue: trainer?.passportNumber,
      errorName: "passportNumber",
    },
    {
      label: "Номер телефона",
      type: "string",
      register: {
        ...register("phoneNumber", {
          required: "Обязательное поле",
        }),
      },
      // mask: [
      //   "(",
      //   /[1-9]/,
      //   /\d/,
      //   /\d/,
      //   ")",
      //   " ",
      //   /\d/,
      //   /\d/,
      //   /\d/,
      //   "-",
      //   /\d/,
      //   /\d/,
      //   /\d/,
      //   /\d/
      // ],
      // placeholder: "+7 (___) ___-__-__",
      defaultValue: trainer?.phoneNumber,
      errorName: "phoneNumber",
    },
    {
      label: "Фото",
      type: "text",
      register: {
        ...register("photoUrl", { required: "Обязательное поле" }),
      },
      defaultValue: trainer?.photoUrl,
      errorName: "photoUrl",
    },
  ];

  if (loading) return <p className="text-center mt-4">Загрузка...</p>;

  return (
    <div className="w-1/2 mx-auto m-4">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {inputsItems.map((input) => (
          <Input
            // mask={input.mask}
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
