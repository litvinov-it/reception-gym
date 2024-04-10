"use client";
import React, { useMemo } from "react";
import Input from "@/app/components/ui/input/input";
import { SubmitHandler, useForm as useFormHook } from "react-hook-form";
import {
  IInputTrainer,
  TrainerFields,
  TTrainerForm,
} from "@/app/schemas/trainers/TrainerTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { trainerSchemaCreateForm } from "@/app/schemas/trainers/validation-schemas";
import { IMAGE_API } from "@/app/utils/client-api/image-api";
import { TRAINERS_API } from "@/app/utils/client-api/trainers-api";

const Page = () => {
  // Инициализация формы
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useFormHook<TTrainerForm>({
    resolver: zodResolver(trainerSchemaCreateForm),
  });

  const getError = (nameInput: TrainerFields) => errors[nameInput];

  const onSubmit: SubmitHandler<TTrainerForm> = (data) => {

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
      TRAINERS_API.POST(finalData, () => {
        window.alert("Клиент добавлен успешно");
      });
    });

    // fetch("/api/image/upload", {
    //   method: "POST",
    //   body: data.file,
    // })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     const finalData = {
    //       firstName: data.firstName,
    //       lastName: data.lastName,
    //       middleName: data.middleName,
    //       dateOfBirth: data.dateOfBirth,
    //       passportSeries: data.passportSeries,
    //       passportNumber: data.passportNumber,
    //       phoneNumber: data.phoneNumber,
    //       photoUrl: response,
    //     };

    //     fetch("http://localhost:3000/api/trainers", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(finalData),
    //     })
    //       .then((res) => res.json())
    //       .then((data) => {
    //         if (data.errors)
    //           return window.alert("Произошла ошибка при добавлении тренера");
    //         window.alert("Тренер добавлен успешно");
    //       });
    //   })
    //   .catch((error) => console.error("Ошибка загрузки файла:", error));

  };

  const inputsItems: IInputTrainer[] = useMemo(() => {
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
          ...register("dateOfBirth"),
        },
        defaultValue: "",
        errorName: "dateOfBirth",
      },
      {
        label: "Серия паспорта",
        type: "number",
        register: {
          ...register("passportSeries", { valueAsNumber: true }),
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
        type: "number",
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
