document.addEventListener('DOMContentLoaded', function() {

    // Fungsi untuk mendapatkan nilai output dan input antara dari input
    function getSectorValues(sector) {
        const output = parseFloat(document.getElementById(`${sector}Output`).value);
        const inputAntara = parseFloat(document.getElementById(`${sector}InputAntara`).value);
        return { output, inputAntara };
    }

    const hitungButton = document.getElementById('hitung');
    const pdrbSpan = document.getElementById('pdrb');
    const errorMessage = document.getElementById('error-message');

    hitungButton.addEventListener('click', function() {
        const sectors = ['pertanian', 'pertambangan', 'industri', 'konstruksi', 'perdagangan', 'transportasi', 'akomodasi', 'informasi', 'keuangan', 'jasaLain'];
        let totalNTB = 0;
        let validData = true;

        for (const sector of sectors) {
            const { output, inputAntara } = getSectorValues(sector);

            if (isNaN(output) || isNaN(inputAntara)) {
                errorMessage.textContent = "Masukkan angka yang valid untuk semua sektor.";
                pdrbSpan.textContent = '0';
                validData = false;
                break;
            }

            if (output < 0 || inputAntara < 0) {
              errorMessage.textContent = "Nilai output dan input antara tidak boleh negatif.";
              pdrbSpan.textContent = '0';
              validData = false;
              break;
            }

            const ntb = output - inputAntara; // Hitung Nilai Tambah Bruto

            if (ntb < 0) {
              errorMessage.textContent = `Nilai Tambah Bruto untuk sektor ${sector} negatif. Periksa input.`;
              pdrbSpan.textContent = '0';
              validData = false;
              break;
            }

            totalNTB += ntb;
        }

        if (validData) {
            errorMessage.textContent = ""; // Bersihkan pesan error
            pdrbSpan.textContent = totalNTB.toLocaleString(); // Format angka dengan pemisah ribuan
        }
    });
});