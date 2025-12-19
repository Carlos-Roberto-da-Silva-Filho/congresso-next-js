import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Definindo o local: public/images/palestrantes/
    const uploadDir = path.join(process.cwd(), "public/images/palestrantes");
    
    // Garante que a pasta existe
    await mkdir(uploadDir, { recursive: true });

    // Nome único para evitar sobrescrever
    const fileName = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);
    
    // Retorna o caminho que será salvo no banco
    return NextResponse.json({ url: `/images/palestrantes/${fileName}` });
  } catch (error) {
    return NextResponse.json({ error: "Erro no upload" }, { status: 500 });
  }
}
