"use client";
import Input from "@/app/components/input/input";
import {
  IInputShedule,
  SheduleFields,
  TSheduleForm,
} from "@/app/schemas/shedule/InventoryTypes";
import { sheduleSchema } from "@/app/schemas/shedule/validation-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSheduleForm>({
    resolver: zodResolver(sheduleSchema),
  });

  const getError = (nameInput: SheduleFields) => errors[nameInput];

  const onSubmit: SubmitHandler<TSheduleForm> = (data) => {
    fetch("http://localhost:3000/api/shedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors)
          return window.alert("Произошла ошибка при добавлении расписания");
        window.alert("Расписание добавлено успешно");
      });
  };

  const inputsItems: IInputShedule[] = [
    {
      label: "Дата",
      type: "date",
      register: {
        ...register("date", { valueAsDate: true }),
      },
      defaultValue: "",
      errorName: "date",
    },
    {
      label: "Айди клиента",
      type: "number",
      register: {
        ...register("clientId", { valueAsNumber: true }),
      },
      defaultValue: "",
      errorName: "clientId",
    },
    {
      label: "Айди тренера",
      type: "number",
      register: {
        ...register("trainerId", { valueAsNumber: true }),
      },
      defaultValue: "",
      errorName: "trainerId",
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
        <button className="btn">Сохранить</button>
      </form>
    </div>
  );
};

export default Page;
