import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // Название, которое будет отображаться в форме входа в систему.
      name: "Credentials",
      // Тут перечисляются поля, которые мы хотим, чтобы были отправлены
      // пользователем при аутентификации. Эти учетные данные используются
      // для создания соответствующей формы на странице входа в систему.
      // Мы можем указать любые поля, которые ожидаем получить.
      // Через объект мы можем передать любые HTML-атрибуты тега <input>.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" }
      },
      // Здесь мы описываем логику, которая принимает учетные данные пользователя
      // и возвращает либо объект, представляющий пользователя, либо
      // значение, которое является false/null, если учетные данные недействительны.
      // Например, return {id: 1, name: "Andrey", email: "andrey@mail.ru"}
      // Мы также можем использовать объект "req" для получения дополнительных
      // параметров (например, IP-адрес запроса).
      async authorize(credentials): Promise<any> {
        // Проверяем, если в credentials нет поля email или password - 
        // возвращаем null.
        // credentials?.email - знак вопроса - костыль для TypeScript, 
        // т.к. credentials может быть undefined. Поставив знак вопроса, 
        // мы делаем эту переменную необязательной.
        // Другой способ - поставить после credentials восклицательный знак -
        // credentials!.email. Так мы говорим TypeScript, что уверены,
        // что credentials не будет undefined (заставляем TS игнорировать
        // предупреждение). Но тогда ! придется ставить
        // при каждом использовании credentials.
        if (!credentials?.email || !credentials.password) return null;
        // Теперь ищем пользователя с переданным email.
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        // Если такого пользователя нет - возвращаем null.
        if (!user) return null;
        // Проверяем переданный пользователем пароль и хешированный вариант из БД.
        const passwordsMatch = await bcrypt.compare(credentials.password, user.hashedPassword!);
        // Если пароли совпадают - возвращаем user. Иначе - null.
        return passwordsMatch ? user : null;
      } 
    })
  ]
});


export { handler as GET, handler as POST };