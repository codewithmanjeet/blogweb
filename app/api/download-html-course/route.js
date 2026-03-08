import fs from "fs";
import path from "path";
import archiver from "archiver";

export async function GET(req) {

  const { searchParams } = new URL(req.url);

  const key = searchParams.get("key");

  if (key !== "huntingcoder123") {
    return new Response("Access Denied", { status: 403 });
  }

  const folderPath = path.join(process.cwd(), "private-course");

  const archive = archiver("zip");

  const stream = new ReadableStream({
    start(controller) {

      const passThrough = new (require("stream").PassThrough)();

      passThrough.on("data", chunk => controller.enqueue(chunk));
      passThrough.on("end", () => controller.close());

      archive.pipe(passThrough);

      archive.directory(folderPath, false);

      archive.finalize();
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": "attachment; filename=html-notes.zip"
    }
  });
}