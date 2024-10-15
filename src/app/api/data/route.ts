import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json(); // Ambil data JSON dari request

        // Simpan data ke file JSON (opsional)
        // Jika ingin menyimpan, kamu perlu menggunakan fs dari Node.js, tapi ingat bahwa Vercel tidak mendukung penyimpanan di disk
        // Simpan ke database atau tempat penyimpanan lain jika perlu

        console.log('Data diterima:', data); // Untuk debugging

        // Kembalikan respons
        return NextResponse.json({ message: 'Data berhasil disimpan.', data });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Gagal menyimpan data.', error: error.message }, { status: 500 });
    }
}
