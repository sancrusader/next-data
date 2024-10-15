import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json(); // Ambil data JSON dari request

        // Di sini kamu bisa menambahkan logika untuk menyimpan data ke database
        console.log('Data diterima:', data); // Untuk debugging

        // Kembalikan respons sukses
        return NextResponse.json({ message: 'Data berhasil disimpan.', data });
    } catch (error) {
        // Menggunakan type assertion untuk menganggap error sebagai Error
        console.error('Error:', error);
        return NextResponse.json({ message: 'Gagal menyimpan data.', error: (error as Error).message }, { status: 500 });
    }
}
