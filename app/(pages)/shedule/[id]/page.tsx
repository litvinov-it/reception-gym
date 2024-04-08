"use client";
import Input from "@/app/components/input/input";
import {
  IInputShedule,
  IShedule,
  SheduleFields,
  TSheduleForm,
} from "@/app/schemas/shedule/InventoryTypes";
import { formatDate } from "@/app/utils/formatDate";
import { generateValueInputDate } from "@/app/utils/generateValueInputDate";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IProps {
  params: {
    id: string;
  };
}

const Page = ({ params: { id } }: IProps) => {
  const [shedule, setShedule] = useState<IShedule | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshShedule = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:3000/api/shedule/" + id);
    const shedule: IShedule = await res.json();
    setShedule(shedule);
    setLoading(false);
  };

  useEffect(() => {
    refreshShedule();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSheduleForm>();

  const getError = (nameInput: SheduleFields) => errors[nameInput];

  const onSubmit: SubmitHandler<TSheduleForm> = (data) => {
    console.log(data.date);
    fetch("http://localhost:3000/api/shedule/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          return window.alert("Произошла ошибка при изменении расписания");
        }

        window.alert("Данные обновлены успешно");
      });
  };

  const inputsItems: IInputShedule[] = [
    {
      type: "date",
      label: "Дата",
      errorName: "date",
      register: register("date", { valueAsDate: true, required: true }),
      defaultValue: generateValueInputDate(shedule?.date),
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
        <button type="submit" className="btn">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default Page;
