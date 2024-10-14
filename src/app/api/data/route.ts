import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data.json');

// Ensure the data.json file exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([])); // Initialize the file with an empty array
}

// Replace with your desired token
const SECRET_TOKEN = 'Bearer Fox';

// Define the structure of the data you expect
interface DataItem {
  // Define your properties here
  // Example properties:
  id: number;
  name: string;
}

const checkToken = (req: Request) => {
  const token = req.headers.get('Authorization');
  return token === SECRET_TOKEN;
};

export async function POST(req: Request) {
  if (!checkToken(req)) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const newData: DataItem = await req.json(); // Specify the expected type

  return new Promise((resolve) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return resolve(NextResponse.json({ message: 'Error reading data' }, { status: 500 }));
      }

      let currentData: DataItem[] = [];
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

      let jsonData: DataItem[];
      try {
        jsonData = JSON.parse(data || '[]'); // Specify the expected type
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        return resolve(NextResponse.json({ message: 'Error parsing data' }, { status: 500 }));
      }
      
      resolve(NextResponse.json(jsonData));
    });
  });
}
