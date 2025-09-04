document.addEventListener('DOMContentLoaded', function() {
    const sdInput = document.getElementById('sd');
    const smpInput = document.getElementById('smp');
    const smaInput = document.getElementById('sma');
    const ptInput = document.getElementById('pt');
    const hitungButton = document.getElementById('hitung');
    const rlsSpan = document.getElementById('rls');
    const errorMessage = document.getElementById('error-message');

    hitungButton.addEventListener('click', function() {
        const sd = parseFloat(sdInput.value);
        const smp = parseFloat(smpInput.value);
        const sma = parseFloat(smaInput.value);
        const pt = parseFloat(ptInput.value);

        if (isNaN(sd) || isNaN(smp) || isNaN(sma) || isNaN(pt)) {
            errorMessage.textContent = "Masukkan angka yang valid.";
            rlsSpan.textContent = '0';
            return;
        }

        if (sd < 0 || sd > 100 || smp < 0 || smp > 100 || sma < 0 || sma > 100 || pt < 0 || pt > 100) {
             errorMessage.textContent = "Persentase harus antara 0 dan 100.";
             rlsSpan.textContent = '0';
             return;
        }

        const totalPersentase = sd + smp + sma + pt;
        if (totalPersentase > 100) {
            errorMessage.textContent = "Total persentase melebihi 100%.";
            rlsSpan.textContent = '0';
            return;
        }


        errorMessage.textContent = ""; // Bersihkan pesan error

        const rls = (sd/100 * 6) + (smp/100 * 3) + (sma/100 * 3) + (pt/100 * 4);  //SD: 6, SMP:3, SMA:3, PT: 4
        rlsSpan.textContent = rls.toFixed(2); // Tampilkan 2 angka desimal
    });
});