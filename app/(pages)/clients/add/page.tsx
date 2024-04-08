"use client";
import React, { useMemo } from "react";
import Input from "@/app/components/input/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { clientSchema } from "@/app/schemas/clients/validation-schemas";
import {
  ClientFields,
  IInputClient,
  TClientForm,
} from "@/app/schemas/clients/ClientTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TClientForm>({
    resolver: zodResolver(
      clientSchema
        .omit({
          photoUrl: true,
        })
        .extend({
          file: z.instanceof(FormData),
        })
    ),
  });

  const getError = (nameInput: ClientFields) => errors[nameInput];

  const onSubmit: SubmitHandler<TClientForm> = (data) => {

    fetch("/api/upload", {
      method: "POST",
      body: data.file,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error("Ошибка загрузки файла:", error));

    // fetch("http://localhost:3000/api/clients", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.errors) return window.alert("Произошла ошибка при добавлении клиента");
    //     window.alert("Клиент добавлен успешно")
    //   })
  };

  const inputsItems: IInputClient[] = useMemo(() => {
    return [
      {
        label: "Имя",
        type: "text",
        register: {
          ...register("firstName"),
        },
        defaultValue: "",
        errorName: "firstName",
      },
      {
        label: "Фамилия",
        type: "text",
        register: {
          ...register("lastName"),
        },
        defaultValue: "",
        errorName: "lastName",
      },
      {
        label: "Отчество",
        type: "text",
        register: {
          ...register("middleName"),
        },
        defaultValue: "",
        errorName: "middleName",
      },
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
      {
        label: "Номер паспорта",
        type: "number",
        register: {
          ...register("passportNumber", { valueAsNumber: true }),
        },
        defaultValue: "",
        errorName: "passportNumber",
      },
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
        {errors.file && <p className="text-red-500">{errors.file.message}</p>}
        <input
          type="file"
          className="file-input w-full max-w-xs"
          multiple={false}
          accept=".jpg, .jpeg, .png"
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : null;
            if (file) {
              const formData = new FormData();
              formData.append("file", file);
              setValue("file", formData);
            }
          }}
        />
        <button className="btn">Сохранить</button>
      </form>
    </div>
  );
};

export default Page;

{
  /* <input
  type="file"
  onChange={(e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Сохраните путь к файлу в состоянии или отправьте на сервер для сохранения в базе данных
      })
      .catch((error) => console.error("Ошибка загрузки файла:", error));
  }}
/> */
}

// // app/api/upload.ts
