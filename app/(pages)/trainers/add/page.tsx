"use client";
import React, { useMemo } from "react";
import Input from "@/app/components/input/input";
import { SubmitHandler, useForm as useFormHook } from "react-hook-form";
import { Inputs } from "@/app/models/inputsTrainers";
import { IInput } from "@/app/models/input";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormHook<Inputs>();

  const getError = (nameInput: keyof Inputs) => errors[nameInput];

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch("http://localhost:3000/api/trainers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => window.alert("Тренер добавлен успешно"))
      .catch((e) => window.alert("Тренер не добавлен: " + e.message));
  };

  const inputsItems: IInput[] = useMemo(() => {
    return [
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
        defaultValue: "",
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
        defaultValue: "",
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
        defaultValue: "",
        errorName: "middleName",
      },
      {
        label: "День рождения",
        type: "text",
        register: {
          ...register("dateOfBirth", {
            required: "Обязательное поле",
            pattern: {
              value: /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
              message: "Пожалуйста, введите дату в формате DD.MM.YYYY",
            },
          }),
        },
        defaultValue: "",
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
        defaultValue: "",
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
        defaultValue: "",
        errorName: "passportNumber",
      },
      {
        label: "Номер телефона",
        type: "number",
        register: {
          ...register("phoneNumber", {
            required: "Обязательное поле",
            minLength: { value: 10, message: "Минимум 10 символов" },
            maxLength: { value: 10, message: "Максимум 10 символов" },
          }),
        },
        defaultValue: "",
        errorName: "phoneNumber",
      },
      {
        label: "Фото",
        type: "text",
        register: {
          ...register("photoUrl", { required: "Обязательное поле" }),
        },
        defaultValue: "",
        errorName: "photoUrl",
      },
    ];
  }, [errors, register]);

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
