import { trainerSchema } from "@/app/schemas/trainers/validation-schemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  // Запрашиваем из БД пользователя с нужным id
  const trainer = await prisma.trainer.findUnique({
    where: { id: parseInt(id) },
  });

  // Если пользователя не существует, возвращаем ошибку 404.
  if (!trainer) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Возвращаем пользователя
  return NextResponse.json(trainer);
}

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  // Запрашиваем из БД пользователя с нужным id
  const trainer = await prisma.trainer.findUnique({
    where: { id: parseInt(id) },
  });

  // Если пользователя не существует, возвращаем ошибку 404.
  if (!trainer) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // удаляем зависимости (в нашем случае это расписание клиента)
  const shedules = await prisma.shedule.deleteMany({
    where: { trainerId: parseInt(id) },
  });

  // удаляем пользователя
  const deletedUser = await prisma.trainer.delete({
    where: { id: trainer.id },
  });

  // возвращаем удаленного пользователя и количество удаленных зависимостей
  return NextResponse.json({
    deletedUser: deletedUser,
    removeDependencies: shedules.count,
  });
}

export async function PUT(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  // Запрашиваем из БД пользователя с нужным id
  const trainer = await prisma.trainer.findUnique({
    where: { id: parseInt(id) },
  });

  // Если пользователя не существует, возвращаем ошибку 404.
  if (!trainer) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Парсим тело запроса
  const body = await req.json();

  const data = {
    ...body,
    passportSeries: parseInt(body.passportSeries),
    passportNumber: parseInt(body.passportNumber),
  };

  // Проверяем валидность тела запроса
  const validation = trainerSchema.safeParse(data);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );
  }

  // Проверяем уникальность номера телефона
  const checkUniquePhone = await prisma.trainer.findUnique({
    where: { phoneNumber: data.phoneNumber },
  });

  // Если пользователь с таким номером телефона уже существует - ошибка
  if (checkUniquePhone && checkUniquePhone.id !== trainer.id) {
    return NextResponse.json({ error: "Phone exist" }, { status: 400 });
  }

  const updatedTrainer = await prisma.trainer.update({
    where: { id: trainer.id },
    data: data,
  });

  return NextResponse.json(updatedTrainer);
}
