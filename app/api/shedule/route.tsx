import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { sheduleSchema } from "@/app/schemas/shedule/validation-schemas";

export async function GET(request: NextRequest) {
  const shedule = await prisma.shedule.findMany();
  return NextResponse.json(shedule);
}

export async function POST(req: NextRequest) {
  // Получение тела запроса
  const body = await req.json();

  const data = {
    ...body,
    date: new Date(body.date),
  };

  // Валидация тела запроса
  const validation = sheduleSchema.safeParse(data);
  if (validation.success === false) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );
  }

  // Проверка существования клиента
  const client = await prisma.client.findUnique({
    where: {
      id: data.clientId,
    },
  });
  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  // Проверка существования тренера
  const trainer = await prisma.trainer.findUnique({
    where: {
      id: data.trainerId,
    },
  });
  if (!trainer) {
    return NextResponse.json({ error: "Trainer not found" }, { status: 404 });
  }

  // Запись в БД
  const shedule = await prisma.shedule.create({
    data: data,
  });

  // Отправка ответа
  return NextResponse.json(shedule);
}
