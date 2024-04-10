import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

// Определяем схему для валидации
const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(5),
});

export async function POST(request: NextRequest) {
  // Получаем данные из запроса
  const body = await request.json();

  // Валидируем данные
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  // Проверяем, существует ли уже пользователь с переданным email
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user)
    return NextResponse.json(
      { error: "User or email already exists" },
      { status: 400 }
    );

  // Если пользователя не существует, значит, мы можем его создать.
  // Но перед созданием необходимо захешировать пароль.
  // Для этого воспользуемся bcrypt.
  // Первый аргумент - то, что нужно захешировать.
  // Второй - число циклов. Чем выше число - тем медленнее процесс зашифровки,
  // но больше безопасность.
  const hashedPassword = await bcrypt.hash(body.password, 10);

  // Создаем пользователя в БД
  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      hashedPassword,
    },
  });

  // Возвращаем ответ клиенту
  return NextResponse.json(
    {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
    { status: 201 }
  );
}
