import { clientSchema } from "@/app/schemas/clients/validation-schemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  // Запрашиваем из БД пользователя с нужным id
  const client = await prisma.client.findUnique({
    where: { id: parseInt(id) },
  });

  // Если пользователя не существует, возвращаем ошибку 404.
  if (!client) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Возвращаем пользователя
  return NextResponse.json(client);
}

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  // Запрашиваем из БД пользователя с нужным id
  const client = await prisma.client.findUnique({
    where: { id: parseInt(id) },
  });

  // Если пользователя не существует, возвращаем ошибку 404.
  if (!client) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // удаляем зависимости (в нашем случае это расписание клиента)
  const shedules = await prisma.shedule.deleteMany({
    where: { clientId: parseInt(id) },
  });

  // удаляем пользователя
  const deletedUser = await prisma.client.delete({ where: { id: client.id } });

  return NextResponse.json({
    deletedUser: deletedUser,
    removeDependencies: shedules.count,
  });
}

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  // Запрашиваем из БД пользователя с нужным id
  const client = await prisma.client.findUnique({
    where: { id: parseInt(id) },
  });
  if (!client)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Парсим новые данные из тела запроса
  const body = await request.json();
  const data = {
    ...body,
    passportNumber: parseInt(body.passportNumber),
    passportSeries: parseInt(body.passportSeries),
    dateAbonement: new Date(body.dateAbonement),
  };

  const validation = clientSchema.safeParse(data);
  if (validation.success === false) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );
  }

  // Проверка не существует ли пользователя с таким же номером телефона
  const checkUniquePhone = await prisma.client.findUnique({
    where: { phoneNumber: data.phoneNumber },
  });
  if (checkUniquePhone && checkUniquePhone.id !== client.id)
    NextResponse.json({ error: "Phone exist" }, { status: 400 });

  const updatedClient = await prisma.client.update({
    where: { id: client.id },
    data: data,
  });

  console.log(updatedClient)

  return NextResponse.json(updatedClient);
}
