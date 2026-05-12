-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('new', 'contacted', 'in_progress', 'won', 'lost');

-- CreateEnum
CREATE TYPE "ClientStatus" AS ENUM ('active', 'paused', 'archived');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('brief', 'design', 'development', 'waiting_payment', 'launched', 'support', 'paused', 'closed');

-- CreateEnum
CREATE TYPE "SubscriptionType" AS ENUM ('monthly', 'yearly', 'none');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('active', 'overdue', 'paused', 'cancelled');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('launch_payment', 'monthly_support', 'yearly_support', 'extra_work', 'other');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('cash', 'kaspi', 'bank_transfer', 'other');

-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM ('domain', 'hosting', 'design_assets', 'advertising', 'subcontractor', 'software', 'other');

-- CreateEnum
CREATE TYPE "ReminderType" AS ENUM ('payment_due', 'payment_overdue', 'contact_client', 'project_task', 'custom');

-- CreateEnum
CREATE TYPE "ReminderStatus" AS ENUM ('pending', 'done', 'cancelled');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'WebTap Admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "businessNiche" TEXT NOT NULL,
    "siteType" TEXT NOT NULL,
    "budgetRange" TEXT NOT NULL,
    "comment" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "businessName" TEXT,
    "contactPerson" TEXT,
    "phone" TEXT NOT NULL,
    "whatsapp" TEXT,
    "instagram" TEXT,
    "email" TEXT,
    "niche" TEXT,
    "city" TEXT,
    "status" "ClientStatus" NOT NULL DEFAULT 'active',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "ProjectStatus" NOT NULL DEFAULT 'brief',
    "launchPrice" INTEGER NOT NULL DEFAULT 49990,
    "launchStartedAt" TIMESTAMP(3),
    "launchedAt" TIMESTAMP(3),
    "websiteUrl" TEXT,
    "domain" TEXT,
    "hosting" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "projectId" TEXT,
    "type" "SubscriptionType" NOT NULL DEFAULT 'monthly',
    "amount" INTEGER NOT NULL DEFAULT 4990,
    "startDate" TIMESTAMP(3) NOT NULL,
    "nextPaymentDate" TIMESTAMP(3),
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'active',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "projectId" TEXT,
    "subscriptionId" TEXT,
    "type" "PaymentType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'KZT',
    "paidAt" TIMESTAMP(3) NOT NULL,
    "method" "PaymentMethod" NOT NULL DEFAULT 'kaspi',
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "clientId" TEXT,
    "projectId" TEXT,
    "category" "ExpenseCategory" NOT NULL DEFAULT 'other',
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'KZT',
    "spentAt" TIMESTAMP(3) NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reminder" (
    "id" TEXT NOT NULL,
    "clientId" TEXT,
    "projectId" TEXT,
    "subscriptionId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "remindAt" TIMESTAMP(3) NOT NULL,
    "type" "ReminderType" NOT NULL DEFAULT 'custom',
    "status" "ReminderStatus" NOT NULL DEFAULT 'pending',
    "dedupeKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Reminder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "leadId" TEXT,
    "clientId" TEXT,
    "projectId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "brandName" TEXT NOT NULL DEFAULT 'WebTap',
    "defaultLaunchPrice" INTEGER NOT NULL DEFAULT 49990,
    "defaultMonthlySupportPrice" INTEGER NOT NULL DEFAULT 4990,
    "defaultYearlySupportPrice" INTEGER NOT NULL DEFAULT 51990,
    "whatsapp" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");
CREATE INDEX "Lead_status_idx" ON "Lead"("status");
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");
CREATE INDEX "Client_status_idx" ON "Client"("status");
CREATE INDEX "Client_createdAt_idx" ON "Client"("createdAt");
CREATE INDEX "Project_clientId_idx" ON "Project"("clientId");
CREATE INDEX "Project_status_idx" ON "Project"("status");
CREATE INDEX "Project_createdAt_idx" ON "Project"("createdAt");
CREATE INDEX "Project_launchedAt_idx" ON "Project"("launchedAt");
CREATE INDEX "Subscription_clientId_idx" ON "Subscription"("clientId");
CREATE INDEX "Subscription_projectId_idx" ON "Subscription"("projectId");
CREATE INDEX "Subscription_type_idx" ON "Subscription"("type");
CREATE INDEX "Subscription_status_idx" ON "Subscription"("status");
CREATE INDEX "Subscription_nextPaymentDate_idx" ON "Subscription"("nextPaymentDate");
CREATE INDEX "Payment_clientId_idx" ON "Payment"("clientId");
CREATE INDEX "Payment_projectId_idx" ON "Payment"("projectId");
CREATE INDEX "Payment_subscriptionId_idx" ON "Payment"("subscriptionId");
CREATE INDEX "Payment_type_idx" ON "Payment"("type");
CREATE INDEX "Payment_paidAt_idx" ON "Payment"("paidAt");
CREATE INDEX "Expense_clientId_idx" ON "Expense"("clientId");
CREATE INDEX "Expense_projectId_idx" ON "Expense"("projectId");
CREATE INDEX "Expense_category_idx" ON "Expense"("category");
CREATE INDEX "Expense_spentAt_idx" ON "Expense"("spentAt");
CREATE UNIQUE INDEX "Reminder_dedupeKey_key" ON "Reminder"("dedupeKey");
CREATE INDEX "Reminder_clientId_idx" ON "Reminder"("clientId");
CREATE INDEX "Reminder_projectId_idx" ON "Reminder"("projectId");
CREATE INDEX "Reminder_subscriptionId_idx" ON "Reminder"("subscriptionId");
CREATE INDEX "Reminder_type_idx" ON "Reminder"("type");
CREATE INDEX "Reminder_status_idx" ON "Reminder"("status");
CREATE INDEX "Reminder_remindAt_idx" ON "Reminder"("remindAt");
CREATE INDEX "Note_leadId_idx" ON "Note"("leadId");
CREATE INDEX "Note_clientId_idx" ON "Note"("clientId");
CREATE INDEX "Note_projectId_idx" ON "Note"("projectId");
CREATE INDEX "Note_createdAt_idx" ON "Note"("createdAt");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Note" ADD CONSTRAINT "Note_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Note" ADD CONSTRAINT "Note_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Note" ADD CONSTRAINT "Note_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
