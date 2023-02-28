### Tugas Oprec WebDev RISTEK
## Panduan Instalasi
1. Install node.js dan npm (package manager javascript) terlebih dahulu di mesin lokal
2. Pastikan sudah menginstall MySQL (lebih baik menggunakan dari XAMPP)
3. Jalankan MySQL dan buat db baru dengan nama webdev-mediasosial
4. Pull repository ini ke mesin lokal.
5. Buka folder root repository di mesin lokal ke terminal.
6. Jalankan "cd client"
7. Jalankan "npm install" (menginstall semua dependency yang dibutuhkan proyek ini)
8. Jalankan "npm start" (React akan berjalan di port 3000)
9. Jalankan "cd .." (kembali ke root direktori)
10. Jalankan "cd server" 
11. Jalankan "npm install" (menginstall semua dependency yang dibutuhkan proyek ini)
12. Jalankan "npx sequelize db:migrate" (Membentuk tabel-tabel di db webdev-mediasosial)
13. Jalankan "npm start" (Express akan berjalan di port 5000)
14. Akses aplikasi web melalui React (http://localhost:3000)