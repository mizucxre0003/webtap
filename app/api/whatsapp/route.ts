import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { defaultOwnerWhatsappText, whatsappUrl } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

async function getOwnerPhone() {
  if (process.env.WHATSAPP_PHONE) {
    return process.env.WHATSAPP_PHONE;
  }

  try {
    const settings = await prisma.settings.findFirst({
      orderBy: { createdAt: "asc" },
      select: { whatsapp: true },
    });
    return settings?.whatsapp ?? "";
  } catch {
    return "";
  }
}

export async function GET(request: NextRequest) {
  const text = request.nextUrl.searchParams.get("text") ?? defaultOwnerWhatsappText;
  const href = whatsappUrl(await getOwnerPhone(), text);

  if (href === "#") {
    return NextResponse.redirect(new URL("/#lead-form", request.url));
  }

  return NextResponse.redirect(href);
}
