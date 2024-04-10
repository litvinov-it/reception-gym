import { NextRequest, NextResponse } from "next/server";
import { clientSchema } from "@/app/schemas/clients/validation-schemas";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {
  const clients = await prisma.client.findMany();
  return NextResponse.json(clients);
}

export async function POST(req: NextRequest) {
  // Получаем данные из запроса
  const body = await req.json();

  const data = {
    ...body,
    passportNumber: parseInt(body.passportNumber),
    passportSeries: parseInt(body.passportSeries),
  };

  // Проверяем данные на валидность
  const validation = clientSchema.safeParse(data);
  if (validation.success === false) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );
  }

  // Сохраняем данные в базе данных
  const client = await prisma.client.create({
    data: data,
  });

  // Возвращаем клиента
  return NextResponse.json(client);
}
