import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { promisify } from "util";
const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

export async function POST(request: NextRequest) {
  // Получаем данные из формы
  const formData = await request.formData();
  const file = formData.get("file") as Blob;

  // Если нет файла, возвращаем ошибку
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Получаем данные файла
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Генерируем имя
  const fileName = `${Date.now()}.png`;

  // Сохраняем
  const filePath = path.join(process.cwd(), "public", "images", fileName);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, buffer);

  // Возвращаем имя
  return NextResponse.json(fileName);
}


