import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { sheduleSchema } from "@/app/schemas/shedule/validation-schemas";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  // Ищем расписание в базе данных.
  const shedule = await prisma.shedule.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  // Если расписание не существует, возвращаем ошибку 404.
  if (!shedule) {
    return NextResponse.json({ error: "Shedule not found" }, { status: 404 });
  }

  // Возвращаем расписание
  return NextResponse.json(shedule);
}

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  // Ищем расписание в базе данных.
  const shedule = await prisma.shedule.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  // Если расписание не существует, возвращаем ошибку 404.
  if (!shedule) {
    return NextResponse.json({ error: "Shedule not found" }, { status: 404 });
  }

  // Удаляем расписание из базы данных.
  const deletethedShedule = await prisma.shedule.delete({
    where: {
      id: parseInt(id),
    },
  });

  // Возвращаем расписание
  return NextResponse.json(deletethedShedule);
}

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  // Ищем расписание в базе данных.
  const shedule = await prisma.shedule.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  // Если расписание не существует, возвращаем ошибку 404.
  if (!shedule) {
    return NextResponse.json({ error: "Shedule not found" }, { status: 404 });
  }

  // Получение тела запроса
  const body = await request.json();

  const data = {
    ...body,
    date: new Date(body.date),
  };

  // Обновляем расписание в базе данных.
  const updatedShedule = await prisma.shedule.update({
    where: {
      id: parseInt(id),
    },
    data: data,
  });

  // Возвращаем расписание
  return NextResponse.json(updatedShedule);
}
