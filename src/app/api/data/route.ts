import { NextResponse } from 'next/server';

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

        const response = NextResponse.json({ message: 'Data berhasil disimpan.', data });

        // Tambahkan header CORS
        response.headers.append('Access-Control-Allow-Origin', 'http://192.168.1.15:8000'); // Ganti ini dengan origin yang diizinkan
        response.headers.append('Access-Control-Allow-Methods', 'POST, OPTIONS');
        response.headers.append('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With'); // Tambahkan X-Requested-With

        return response;
    } catch (error) {
        console.error('Error:', error);
        const response = NextResponse.json({ message: 'Gagal menyimpan data.', error: (error as Error).message }, { status: 500 });
        
        // Tambahkan header CORS pada respons error juga
        response.headers.append('Access-Control-Allow-Origin', 'http://192.168.1.15:8000'); // Ganti ini dengan origin yang diizinkan
        response.headers.append('Access-Control-Allow-Methods', 'POST, OPTIONS');
        response.headers.append('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With'); // Tambahkan X-Requested-With pada respons error

        return response;
    }
}
