import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { trainerSchema } from "@/app/schemas/trainers/validation-schemas";

export async function GET(req: NextRequest) {
  const trainer = await prisma.trainer.findMany();
  return NextResponse.json(trainer);
}

export async function POST(req: NextRequest) {
  // Получение тела запроса
  const body = await req.json();

  const data = {
    ...body,
    passportSeries: parseInt(body.passportSeries),
    passportNumber: parseInt(body.passportNumber),
  };

  // Проверка валидации
  const validation = trainerSchema.safeParse(data);
  if (validation.success === false) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );
  }

  // Создание тренера
  const trainer = await prisma.trainer.create({
    data: data,
  });

  // Возврат результата
  return NextResponse.json(trainer);
}
