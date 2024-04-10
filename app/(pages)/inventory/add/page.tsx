"use client"
import Input from "@/app/components/ui/input/input";
import { IInputInventory, InventoryFields, TInventoryForm } from "@/app/schemas/inventory/InventoryTypes";
import { inventorySchema } from "@/app/schemas/inventory/validation-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInventoryForm>({
    resolver: zodResolver(inventorySchema),
  });

  const getError = (nameInput: InventoryFields) => errors[nameInput];

  const inputsItems: IInputInventory[] = [
    {
      type: "text",
      label: "Название",
      defaultValue: "",
      errorName: "name",
      register: {
        ...register("name"),
      },
    },
    {
      type: "text",
      label: "Описание",
      defaultValue: "",
      errorName: "description",
      register: {
        ...register("description"),
      },
    },
    {
      type: "number",
      label: "Количество",
      defaultValue: 0,
      errorName: "count",
      register: {
        ...register("count", { valueAsNumber: true }),
      },
    },
  ];

  const onSubmit: SubmitHandler<TInventoryForm> = (data) => {
    fetch("http://localhost:3000/api/inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) return window.alert("Произошла ошибка при добавлении инвентаря");
        window.alert("Инвентарь добавлен успешно")
      })
  };

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
