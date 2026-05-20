import "dotenv/config";

import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@webtap.kz";
  const password = process.env.ADMIN_PASSWORD ?? "change-this-password";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: {
      email,
      passwordHash,
      name: "WebTap Admin",
    },
  });

  const settings = await prisma.settings.findFirst();
  if (!settings) {
    await prisma.settings.create({
      data: {
        brandName: "WebTap",
        defaultLaunchPrice: 49990,
        defaultMonthlySupportPrice: 4990,
        defaultYearlySupportPrice: 51990,
        whatsapp: process.env.WHATSAPP_PHONE ?? "77000000000",
        email: email,
        instagram: "https://instagram.com/",
        telegram: "https://t.me/",
      },
    });
  }

  await prisma.lead.create({
    data: {
      name: "Айдана",
      phone: "+7 700 111 22 33",
      businessNiche: "Beauty studio",
      siteType: "сайт для записи/заявок",
      budgetRange: "49 990 - 80 000 ₸",
      comment: "Нужно показать услуги, цены, отзывы и кнопку WhatsApp.",
      status: "new",
    },
  });

  const client = await prisma.client.create({
    data: {
      name: "Мария Иванова",
      businessName: "Mira Beauty",
      contactPerson: "Мария",
      phone: "+7 701 222 33 44",
      whatsapp: "+7 701 222 33 44",
      instagram: "@mira.beauty",
      email: "mira@example.com",
      niche: "Салон красоты",
      city: "Алматы",
      notes: "Демо-клиент для проверки CRM.",
      status: "active",
    },
  });

  const project = await prisma.project.create({
    data: {
      clientId: client.id,
      title: "Сайт для Mira Beauty",
      description: "Страница для услуг салона, записи и доверия.",
      status: "support",
      launchPrice: 69990,
      launchStartedAt: addDays(new Date(), -12),
      launchedAt: addDays(new Date(), -3),
      websiteUrl: "https://example.com",
      domain: "mira-beauty.kz",
      hosting: "Koyeb",
      notes: "Запущен, клиент на обслуживании.",
    },
  });

  const subscription = await prisma.subscription.create({
    data: {
      clientId: client.id,
      projectId: project.id,
      type: "monthly",
      amount: 4990,
      startDate: addDays(new Date(), -3),
      nextPaymentDate: addDays(new Date(), 3),
      status: "active",
      notes: "Месячное обслуживание после запуска.",
    },
  });

  await prisma.payment.createMany({
    data: [
      {
        clientId: client.id,
        projectId: project.id,
        type: "launch_payment",
        amount: 40000,
        currency: "KZT",
        paidAt: addDays(new Date(), -10),
        method: "kaspi",
        comment: "Первый платёж за запуск.",
      },
      {
        clientId: client.id,
        projectId: project.id,
        type: "launch_payment",
        amount: 29990,
        currency: "KZT",
        paidAt: addDays(new Date(), -3),
        method: "kaspi",
        comment: "Остаток за запуск.",
      },
    ],
  });

  await prisma.expense.create({
    data: {
      clientId: client.id,
      projectId: project.id,
      category: "domain",
      amount: 3500,
      currency: "KZT",
      spentAt: addDays(new Date(), -2),
      comment: "Демо-расход на домен.",
    },
  });

  await prisma.recurringExpense.create({
    data: {
      clientId: client.id,
      projectId: project.id,
      category: "hosting",
      amount: 4990,
      currency: "KZT",
      dayOfMonth: 5,
      nextExpenseDate: addDays(new Date(), 5),
      reminderDaysBefore: 3,
      status: "active",
      comment: "Демо: ежемесячный хостинг проекта.",
    },
  });

  await prisma.reminder.create({
    data: {
      clientId: client.id,
      projectId: project.id,
      subscriptionId: subscription.id,
      title: "Написать клиенту Mira Beauty в WhatsApp",
      description:
        "Написать клиенту Мария Иванова в WhatsApp: скоро оплата обслуживания 4 990 ₸. Дата оплаты через 3 дня.",
      remindAt: addDays(new Date(), 3),
      type: "payment_due",
      status: "pending",
      dedupeKey: `${subscription.id}:payment_due:${addDays(new Date(), 3).toISOString().slice(0, 10)}`,
    },
  });

  await prisma.note.create({
    data: {
      clientId: client.id,
      projectId: project.id,
      body: "Проверить актуальность цен через неделю после запуска.",
    },
  });

  console.log(`Seed completed. Admin: ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
