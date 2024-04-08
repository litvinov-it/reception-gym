"use client";
import Input from "@/app/components/input/input";
import {
  IInputInventory,
  IInventory,
  InventoryFields,
  InventoryTypes,
  TInventoryForm,
} from "@/app/schemas/inventory/InventoryTypes";
import { inventorySchema } from "@/app/schemas/inventory/validation-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IProps {
  params: {
    id: string;
  };
}

const Page = ({ params: { id } }: IProps) => {
  const [inventory, setInventory] = useState<IInventory | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshInventory = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:3000/api/inventory/" + id);
    const inventory: IInventory = await res.json();
    setInventory(inventory);
    setLoading(false);
  };

  useEffect(() => {
    refreshInventory();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInventoryForm>({
    resolver: zodResolver(inventorySchema),
  });

  const getError = (nameInput: InventoryFields) => errors[nameInput];

  const onSubmit: SubmitHandler<TInventoryForm> = (data) => {
    fetch("http://localhost:3000/api/inventory/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors)
          return window.alert("Произошла ошибка при изменении инвентаря");
        window.alert("Данные обновлены успешно");
      });
  };

  const inputsItems: IInputInventory[] = [
    {
      type: "text",
      label: "Название",
      defaultValue: inventory?.name,
      errorName: "name",
      register: {
        ...register("name"),
      },
    },
    {
      type: "text",
      label: "Описание",
      defaultValue: inventory?.description,
      errorName: "description",
      register: {
        ...register("description"),
      },
    },
    {
      type: "number",
      label: "Количество",
      defaultValue: inventory?.count,
      errorName: "count",
      register: {
        ...register("count", { valueAsNumber: true }),
      },
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
