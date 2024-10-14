import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data.json');

// Pastikan file data.json ada
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([])); // Inisialisasi file dengan array kosong
}

export async function POST(req: Request) {
  const newData = await req.json();

  return new Promise((resolve) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return resolve(NextResponse.json({ message: 'Error reading data' }, { status: 500 }));
      }

      let currentData: any[] = [];
      try {
        currentData = JSON.parse(data);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        return resolve(NextResponse.json({ message: 'Error parsing data' }, { status: 500 }));
      }

      // Jika currentData bukan array, inisialisasi menjadi array kosong
      if (!Array.isArray(currentData)) {
        currentData = [];
      }

      currentData.push(newData); // Tambahkan data baru

      fs.writeFile(filePath, JSON.stringify(currentData, null, 2), (writeErr) => {
        if (writeErr) {
          console.error('Error writing file:', writeErr);
          return resolve(NextResponse.json({ message: 'Error saving data' }, { status: 500 }));
        }
        resolve(NextResponse.json({ message: 'Data saved successfully', data: newData }));
      });
    });
  });
}

export async function GET() {
  return new Promise((resolve) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return resolve(NextResponse.json({ message: 'Error reading data' }, { status: 500 }));
      }
      const jsonData = JSON.parse(data || '[]');
      resolve(NextResponse.json(jsonData));
    });
  });
}
