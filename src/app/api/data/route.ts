import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function OPTIONS() {
    const response = NextResponse.json({ message: 'CORS preflight request successful' });
    response.headers.append('Access-Control-Allow-Origin', 'http://192.168.1.15:8000'); // Ganti ini dengan origin yang diizinkan
    response.headers.append('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.headers.append('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With'); // Tambahkan X-Requested-With
    return response;
}

export async function POST(request: Request) {
    try {
        const data = await request.json(); // Ambil data JSON dari request

        console.log('Data diterima:', data); // Debugging

        // Tentukan path untuk menyimpan file
        const filePath = path.join(process.cwd(), 'data.json'); 

        let existingData = []; // Array untuk menyimpan data yang ada

        // Cek apakah file sudah ada
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8'); // Baca isi file
            existingData = JSON.parse(fileContent); // Parse isi file menjadi array
        }

        // Tambahkan data baru ke existingData
        existingData.push(data);

        // Simpan kembali data ke file
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2)); // Simpan data ke file JSON

        const response = NextResponse.json({ message: 'Data berhasil disimpan.', data });

        // Tambahkan header CORS
        response.headers.append('Access-Control-Allow-Origin', 'http://192.168.1.15:8000'); 
        response.headers.append('Access-Control-Allow-Methods', 'POST, OPTIONS');
        response.headers.append('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With'); 

        return response;
    } catch (error) {
        console.error('Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'; // Ambil pesan error
        const response = NextResponse.json({ message: 'Gagal menyimpan data.', error: errorMessage }, { status: 500 });

        // Tambahkan header CORS pada respons error juga
        response.headers.append('Access-Control-Allow-Origin', 'http://192.168.1.15:8000'); 
        response.headers.append('Access-Control-Allow-Methods', 'POST, OPTIONS');
        response.headers.append('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With'); 

        return response;
    }
}
