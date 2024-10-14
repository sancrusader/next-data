import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data.json');

// Pastikan file data.json ada
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([])); // Inisialisasi file dengan array kosong
}

// Token yang telah ditentukan
const SECRET_TOKEN = 'Bearer Fox'; // Ganti dengan token yang Anda inginkan

// Fungsi untuk memeriksa keberadaan token
const checkToken = (req: Request) => {
  const token = req.headers.get('Authorization');
  return token === SECRET_TOKEN;
};

export async function POST(req: Request) {
  if (!checkToken(req)) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

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

      if (!Array.isArray(currentData)) {
        currentData = [];
      }

      currentData.push(newData);

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

export async function GET(req: Request) {
  if (!checkToken(req)) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

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
