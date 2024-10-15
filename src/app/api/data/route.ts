import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json(); // Ambil data JSON dari request

        console.log('Data diterima:', data); // Debugging

        // Kembalikan respons dengan header CORS
        const response = NextResponse.json({ message: 'Data berhasil disimpan.', data });

        // Tambahkan header CORS
        response.headers.append('Access-Control-Allow-Origin', '*'); // Gantilah '*' dengan origin spesifik jika perlu
        response.headers.append('Access-Control-Allow-Methods', 'POST, OPTIONS');
        response.headers.append('Access-Control-Allow-Headers', 'Content-Type');

        return response;
    } catch (error) {
        console.error('Error:', error);
        const response = NextResponse.json({ message: 'Gagal menyimpan data.', error: (error as Error).message }, { status: 500 });
        
        // Tambahkan header CORS pada respons error juga
        response.headers.append('Access-Control-Allow-Origin', '*'); // Gantilah '*' dengan origin spesifik jika perlu
        response.headers.append('Access-Control-Allow-Methods', 'POST, OPTIONS');
        response.headers.append('Access-Control-Allow-Headers', 'Content-Type');

        return response;
    }
}
