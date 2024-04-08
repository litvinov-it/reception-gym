import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { inventorySchema } from "@/app/schemas/inventory/validation-schemas";

export async function GET(request: NextRequest) {
  const inventory = await prisma.inventory.findMany();
  return NextResponse.json(inventory);
}

export async function POST(request: NextRequest) {
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

  // Создаем инвентарь
  const inventory = await prisma.inventory.create({
    data: data,
  });

  // Возвращаем инвентарь
  return NextResponse.json(inventory);
}