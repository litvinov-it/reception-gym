import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { trainerSchema } from "@/app/schemas/trainers/validation-schemas";

export async function GET(req: NextRequest) {
  const trainer = await prisma.trainer.findMany();
  return NextResponse.json(trainer);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const data = {
    ...body,
    passportSeries: parseInt(body.passportSeries),
    passportNumber: parseInt(body.passportNumber),
  };

  const validation = trainerSchema.safeParse(data);
  if (validation.success === false) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );
  }

  const trainer = await prisma.trainer.create({
    data: data,
  });

  return NextResponse.json(trainer);
}
