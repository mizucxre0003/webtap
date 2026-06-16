import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { publicLeadSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = publicLeadSchema.parse(body);

    const lead = await prisma.lead.create({
      data,
      select: { id: true },
    });

    return NextResponse.json({
      id: lead.id,
      message: "Заявка отправлена. Мы свяжемся с вами и обсудим задачу.",
    });
  } catch (error) {
    console.error("Lead submit error", error);
    return NextResponse.json(
      { message: "Проверьте поля формы и попробуйте ещё раз." },
      { status: 400 },
    );
  }
}
