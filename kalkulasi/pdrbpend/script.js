document.addEventListener('DOMContentLoaded', function() {
    const kompensasiInput = document.getElementById('kompensasi');
    const surplusUsahaInput = document.getElementById('surplusUsaha');
    const pajakProduksiInput = document.getElementById('pajakProduksi');
    const subsidiInput = document.getElementById('subsidi');

    const hitungButton = document.getElementById('hitung');
    const pdrbSpan = document.getElementById('pdrb');
    const errorMessage = document.getElementById('error-message');

    hitungButton.addEventListener('click', function() {
        const kompensasi = parseFloat(kompensasiInput.value);
        const surplusUsaha = parseFloat(surplusUsahaInput.value);
        const pajakProduksi = parseFloat(pajakProduksiInput.value);
        const subsidi = parseFloat(subsidiInput.value);

        if (isNaN(kompensasi) || isNaN(surplusUsaha) || isNaN(pajakProduksi) || isNaN(subsidi)) {
            errorMessage.textContent = "Masukkan angka yang valid untuk semua input.";
            pdrbSpan.textContent = '0';
            return;
        }

        errorMessage.textContent = ""; // Bersihkan pesan error

        // Perhitungan PDRB (Pendekatan Pendapatan)
        // PDRB = Kompensasi Pekerja + Surplus Usaha Bruto + Pajak Produksi dan Impor - Subsidi
        const pdrb = kompensasi + surplusUsaha + pajakProduksi - subsidi;

        pdrbSpan.textContent = pdrb.toLocaleString(); // Format angka dengan pemisah ribuan
    });
});