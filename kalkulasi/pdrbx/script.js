document.addEventListener('DOMContentLoaded', function() {
    const konsumsiRumahTanggaInput = document.getElementById('konsumsiRumahTangga');
    const konsumsiPemerintahInput = document.getElementById('konsumsiPemerintah');
    const investasiInput = document.getElementById('investasi');
    const perubahanInventoriInput = document.getElementById('perubahanInventori');
    const eksporInput = document.getElementById('ekspor');
    const imporInput = document.getElementById('impor');

    const hitungButton = document.getElementById('hitung');
    const pdrbSpan = document.getElementById('pdrb');
    const errorMessage = document.getElementById('error-message');

    hitungButton.addEventListener('click', function() {
        const konsumsiRumahTangga = parseFloat(konsumsiRumahTanggaInput.value);
        const konsumsiPemerintah = parseFloat(konsumsiPemerintahInput.value);
        const investasi = parseFloat(investasiInput.value);
        const perubahanInventori = parseFloat(perubahanInventoriInput.value);
        const ekspor = parseFloat(eksporInput.value);
        const impor = parseFloat(imporInput.value);

        if (isNaN(konsumsiRumahTangga) || isNaN(konsumsiPemerintah) || isNaN(investasi) || isNaN(perubahanInventori) || isNaN(ekspor) || isNaN(impor)) {
            errorMessage.textContent = "Masukkan angka yang valid untuk semua input.";
            pdrbSpan.textContent = '0';
            return;
        }

        errorMessage.textContent = ""; // Bersihkan pesan error

        // Perhitungan PDRB Desa/Kelurahan (Pendekatan Pengeluaran)
        // PDRB = Konsumsi Rumah Tangga + Konsumsi Pemerintah + Investasi + Perubahan Inventori + Ekspor - Impor
        const pdrb = konsumsiRumahTangga + konsumsiPemerintah + investasi + perubahanInventori + ekspor - impor;

        pdrbSpan.textContent = pdrb.toLocaleString(); // Format angka dengan pemisah ribuan
    });
});