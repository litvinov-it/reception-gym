## reaception-gym

Пет проект для опыта работы с новым стеком NextJS

## Задача

Реализовать админ панель для спорт зала с сущностями:

- клиент
- тренер
- расписание
- инвентарь (для инветаризации)

## 🛠 Стек

- NextJS (react + nodeJS)
- typescript
- prisma
- zod
- tailwind
- daisyui
- react-hook-form
- bcrypt

# Запуск

Создание env файла в корне проекта

```env
# Postgres для создания БД
POSTGRES_DB=НАЗВАНИЕ_БАЗЫ_ДАННЫХ
POSTGRES_USER=ИМЯ_ЮЗЕРА
POSTGRES_PASSWORD=ПАРОЛЬ
POSTGRES_HOST=localhost # по умолчанию
POSTGRES_PORT=5432 # по умолчанию

# PGAdmin для управления БД
PGADMIN_DEFAULT_EMAIL=ПОЧТА_ПОЛЬЗОВАТЕЛЯ@mail.ru
PGADMIN_DEFAULT_PASSWORD=ПАРОЛЬ
PGADMIN_LISTEN_PORT=5050 # по умолчанию

# Prisma для миграций
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}?schema=public" # по умолчанию

# NextAuth авторизации
NEXTAUTH_URL="http://localhost:3000" # по умолчанию
NEXTAUTH_SECRET=ksljjkFkdqnguckskjcitlB # желательно заменить на похожую строку
```

### Backend

Запускаем контейнеры (необходим docker compose)

```bash
docker compose up
```

Делаем миграцию (инициализация сущностей БД)

```bash
npx prisma migrate dev
```

Теперь бэк готов к работе

### Frontend

Инициализация бибилиотек

```bash
npm i
```

Запуск проекта

```bash
npm run dev
```

Теперь все работает.
Можно переходить по http://localhost:3000

# Регистрация

Сделана только через api так как в админ панели не стоит делать регистрацию. Можно добавить пользователя через postman:

```json
{
  "name": "danil",
  "password": "12345",
  "email": "danil@gmail.com"
}
```
Путь запроса: http://localhost:3000/api/register

# Схема БД
В папке public/БД.drawio файл в котором накидал схему для БД (в процессе разработки она видоизменилась)

# Postman
