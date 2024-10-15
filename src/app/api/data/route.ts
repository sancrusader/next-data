import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        // Ambil data dari request
        const data = req.body;

        // Path untuk menyimpan file JSON
        const filePath = path.join(process.cwd(), 'data.json');

        // Simpan data ke file JSON (Jika diperlukan)
        fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Gagal menyimpan data.', error: err.message });
            }

            return res.status(200).json({ message: 'Data berhasil disimpan.', data });
        });
    } else {
        // Menangani method selain POST
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
