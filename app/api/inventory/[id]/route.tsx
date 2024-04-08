import { inventorySchema } from "@/app/schemas/inventory/validation-schemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  // Запрашиваем из БД инвентарь с нужным id
  const inventory = await prisma.inventory.findUnique({
    where: { id: parseInt(id) },
  });

  // Если инвентаря не существует, возвращаем ошибку 404.
  if (!inventory) {
    return NextResponse.json({ error: "Inventory not found" }, { status: 404 });
  }

  // Возвращаем инвентарь
  return NextResponse.json(inventory);
}

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  // Запрашиваем из БД инвентарь с нужным id
  const inventory = await prisma.inventory.findUnique({
    where: { id: parseInt(id) },
  });

  // Если инвентаря не существует, возвращаем ошибку 404.
  if (!inventory) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // удаляем инвентарь
  const deletedInvetory = await prisma.inventory.delete({
    where: { id: inventory.id },
  });

  // Возвращаем инвентарь
  return NextResponse.json(deletedInvetory);
}

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  // Получаем данные из тела запроса
  const body = await request.json();

  const data = {
    ...body,
    count: parseInt(body.count),
  };

  // Проверяем данные на валидность
  const validation = inventorySchema.safeParse(data);
  if (validation.success === false) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );
  }

  // Обновляем инвентарь
  const updatedInventory = await prisma.inventory.update({
    where: {
      id: Number(id),
    },
    data: data,
  });

  // Возвращаем инвентарь
  return NextResponse.json(updatedInventory);
}
