# WebTap

Production-ready веб-сервис для WebTap: публичный сайт для заявок и закрытая мини-CRM для клиентов, проектов, оплат, расходов, обслуживания и напоминаний.

Стек: Next.js App Router, TypeScript, Tailwind CSS, Prisma ORM, PostgreSQL, NeonSQL / Neon PostgreSQL, Koyeb, Docker.

## Переменные окружения

Скопируйте `.env.example` в `.env` для локального запуска:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/DBNAME?sslmode=require"
AUTH_SECRET="replace-with-a-long-random-secret"
APP_URL="http://localhost:3000"
ADMIN_EMAIL="admin@webtap.kz"
ADMIN_PASSWORD="change-this-password"
WHATSAPP_PHONE="77000000000"
```

`AUTH_SECRET` должен быть длинной случайной строкой от 24 символов.

## NeonSQL / Neon PostgreSQL

1. Создать проект PostgreSQL в Neon.
2. Создать базу, например `webtap`.
3. Скопировать `DATABASE_URL` в формате `postgresql://...neon.tech/...?...sslmode=require`.
4. Добавить `DATABASE_URL` локально в `.env` и в Koyeb environment variables.

## Локальный запуск

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run admin:bootstrap
npm run dev
```

Админка: `http://localhost:3000/admin`.

Если таблица `AdminUser` пустая, первый успешный вход с `ADMIN_EMAIL` и `ADMIN_PASSWORD` создаст администратора автоматически. Пароль хранится только в виде hash.

## Prisma

Для разработки:

```bash
npm run prisma:migrate
```

Для production на Koyeb:

```bash
npm run prisma:deploy
```

Создать или обновить только администратора из env:

```bash
npm run admin:bootstrap
```

Seed с demo-данными:

```bash
npm run prisma:seed
```

## Деплой на Koyeb

1. Создать базу данных в NeonSQL / Neon PostgreSQL.
2. Скопировать `DATABASE_URL`.
3. Создать проект на Koyeb.
4. Подключить GitHub репозиторий.
5. Выбрать деплой через Dockerfile.
6. Добавить environment variables:
   - `DATABASE_URL`
   - `AUTH_SECRET`
   - `APP_URL`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `WHATSAPP_PHONE`
7. Выполнить Prisma migrations. В Dockerfile уже есть `npx prisma migrate deploy` перед стартом приложения.
8. Создать администратора через Koyeb console/job: `npm run admin:bootstrap`.
9. Открыть `/admin` и войти.

## Автоматизации CRM

- Dashboard и страница напоминаний запускают генерацию напоминаний автоматически.
- Endpoint для внешнего cron: `GET /api/cron/payment-reminders?secret=AUTH_SECRET`.
- Обслуживание клиента создаёт напоминания за 3 дня, в день оплаты и при просрочке.
- В проекте можно настроить ежемесячный расход: хостинг, домен, софт, подрядчика.
- По ежемесячным расходам CRM создаёт напоминания и даёт кнопку `Оплачено`.
- Кнопка `Оплачено` сама создаёт расход за текущий месяц и переносит следующую дату.
- WhatsApp-сообщения автоматически не отправляются, CRM только создаёт задачу и кнопку WhatsApp.

## Что реализовано

- публичный сайт WebTap с оффером “Запуск сайта от 49 990 ₸”;
- форма заявки с сохранением в NeonSQL / Neon PostgreSQL через Prisma;
- защищённая админка `/admin`;
- один администратор с hash-паролем;
- заявки, клиенты, проекты, оплаты, расходы, обслуживание, напоминания, настройки;
- удаление заявок, клиентов, проектов, оплат, расходов, обслуживаний и напоминаний;
- расчёт остатка оплаты запуска;
- расчёт дохода, расходов и прибыли;
- перенос `nextPaymentDate` после оплаты обслуживания;
- автоматические напоминания по обслуживанию и ежемесячным проектным расходам;
- favicon из `Images/favicon.png`;
- Dockerfile для Koyeb.
