"use client";
import React, { useMemo } from "react";
import Input from "@/app/components/ui/input/input";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ClientFields,
  IInputClient,
  TClientForm,
} from "@/app/schemas/clients/ClientTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMAGE_API } from "@/app/utils/client-api/image-api";
import { CLIENT_API } from "@/app/utils/client-api/clients-api";
import { clientSchemaCreateForm } from "@/app/schemas/clients/validation-schemas";

const Page = () => {
  // Инициализация формы
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TClientForm>({
    resolver: zodResolver(clientSchemaCreateForm),
  });

  // Получение ошибки
  const getError = (nameInput: ClientFields) => errors[nameInput];

  // Обработчик формы
  const onSubmit: SubmitHandler<TClientForm> = (data) => {
    // Загрузка фото
    IMAGE_API.UPLOAD(data.file).then((fileName) => {
      // Формирование данных
      const finalData = {
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        dateOfBirth: data.dateOfBirth,
        passportSeries: data.passportSeries,
        passportNumber: data.passportNumber,
        phoneNumber: data.phoneNumber,
        photoUrl: fileName,
      };

      // Отправка данных
      CLIENT_API.POST(finalData, () => {
        window.alert("Клиент добавлен успешно");
      });
    });
  };

  // Обработчик инпута файла
  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.size > 1024 * 1024 * 2) {
      return window.alert("Размер файла не должен превышать 2 МБ");
    }
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setValue("file", formData);
  };

  // Список полей
  const inputsItems: IInputClient[] = useMemo(() => {
    return [
      // Имя
      {
        label: "Имя",
        type: "text",
        register: {
          ...register("firstName"),
        },
        defaultValue: "",
        errorName: "firstName",
      },
      // Фамилия
      {
        label: "Фамилия",
        type: "text",
        register: {
          ...register("lastName"),
        },
        defaultValue: "",
        errorName: "lastName",
      },
      // Отчество
      {
        label: "Отчество",
        type: "text",
        register: {
          ...register("middleName"),
        },
        defaultValue: "",
        errorName: "middleName",
      },
      // День рождения
      {
        label: "День рождения",
        type: "text",
        register: {
          ...register("dateOfBirth", {
            pattern: {
              value: /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
              message: "Пожалуйста, введите дату в формате DD.MM.YYYY",
            },
          }),
        },
        defaultValue: "",
        errorName: "dateOfBirth",
      },
      // Паспорт
      {
        label: "Серия паспорта",
        type: "number",
        register: {
          ...register("passportSeries", {
            valueAsNumber: true,
          }),
        },
        defaultValue: "",
        errorName: "passportSeries",
      },
      // Номер паспорта
      {
        label: "Номер паспорта",
        type: "number",
        register: {
          ...register("passportNumber", { valueAsNumber: true }),
        },
        defaultValue: "",
        errorName: "passportNumber",
      },
      // Номер телефона
      {
        label: "Номер телефона",
        type: "string",
        register: {
          ...register("phoneNumber"),
        },
        defaultValue: "",
        errorName: "phoneNumber",
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
        <input
          type="file"
          className="file-input w-full max-w-xs"
          multiple={false}
          accept=".jpg, .jpeg, .png"
          onChange={handleChangeFile}
        />
        <button type="submit" className="btn">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default Page;
