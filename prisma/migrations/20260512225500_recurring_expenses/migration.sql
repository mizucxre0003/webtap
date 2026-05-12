-- CreateEnum
CREATE TYPE "RecurringExpenseStatus" AS ENUM ('active', 'paused', 'cancelled');

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN "recurringExpenseId" TEXT;

-- AlterTable
ALTER TABLE "Reminder" ADD COLUMN "recurringExpenseId" TEXT;

-- CreateTable
CREATE TABLE "RecurringExpense" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "category" "ExpenseCategory" NOT NULL DEFAULT 'other',
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'KZT',
    "dayOfMonth" INTEGER NOT NULL DEFAULT 1,
    "nextExpenseDate" TIMESTAMP(3) NOT NULL,
    "reminderDaysBefore" INTEGER NOT NULL DEFAULT 3,
    "status" "RecurringExpenseStatus" NOT NULL DEFAULT 'active',
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "RecurringExpense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Expense_recurringExpenseId_idx" ON "Expense"("recurringExpenseId");
CREATE INDEX "Reminder_recurringExpenseId_idx" ON "Reminder"("recurringExpenseId");
CREATE INDEX "RecurringExpense_clientId_idx" ON "RecurringExpense"("clientId");
CREATE INDEX "RecurringExpense_projectId_idx" ON "RecurringExpense"("projectId");
CREATE INDEX "RecurringExpense_category_idx" ON "RecurringExpense"("category");
CREATE INDEX "RecurringExpense_status_idx" ON "RecurringExpense"("status");
CREATE INDEX "RecurringExpense_nextExpenseDate_idx" ON "RecurringExpense"("nextExpenseDate");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_recurringExpenseId_fkey" FOREIGN KEY ("recurringExpenseId") REFERENCES "RecurringExpense"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_recurringExpenseId_fkey" FOREIGN KEY ("recurringExpenseId") REFERENCES "RecurringExpense"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "RecurringExpense" ADD CONSTRAINT "RecurringExpense_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "RecurringExpense" ADD CONSTRAINT "RecurringExpense_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
