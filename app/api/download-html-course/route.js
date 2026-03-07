import fs from "fs";
import path from "path";

export async function GET() {

  const filePath = path.join(
    process.cwd(),
    "private-course/html-note1.png"
  );

  const fileBuffer = fs.readFileSync(filePath);

  return new Response(fileBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": "attachment; filename=html-note1.png"
    }
  });

}