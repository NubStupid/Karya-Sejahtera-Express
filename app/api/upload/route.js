import { NextResponse } from 'next/server';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Matikan bodyParser bawaan untuk menangani FormData
  },
};

export async function POST(request) {
  const formidable = (await import('formidable')).default;

  const form = formidable({
    multiples: false,
    uploadDir: path.join(process.cwd(), 'public/uploads'), // Direktori upload
    keepExtensions: true,
  });

  // Konversi ReadableStream (body request) menjadi Buffer agar bisa digunakan Formidable
  const data = await request.arrayBuffer();
  const buffer = Buffer.from(data);

  return new Promise((resolve, reject) => {
    form.parse(buffer, (err, fields, files) => {
      if (err) {
        console.error(err);
        return reject(
          NextResponse.json({ message: 'Error processing file' }, { status: 500 })
        );
      }

      // Path file yang disimpan
      const filePath = `/uploads/${path.basename(files.file.filepath)}`;
      resolve(
        NextResponse.json({ filePath }, { status: 200 })
      );
    });
  });
}
