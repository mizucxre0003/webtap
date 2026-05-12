import { NextResponse } from "next/server";
import { generateAutomationReminders } from "@/lib/reminders";

export async function GET(request: Request) {
  const secret = process.env.AUTH_SECRET;
  const url = new URL(request.url);
  const provided = request.headers.get("x-cron-secret") ?? url.searchParams.get("secret");

  if (secret && provided !== secret) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const result = await generateAutomationReminders();
  return NextResponse.json(result);
}
