document.addEventListener('DOMContentLoaded', function() {
    const dataInput = document.getElementById('data-input');
    const hitungButton = document.getElementById('hitung');
    const ahhSpan = document.getElementById('ahh');
    const errorMessage = document.getElementById('error-message');

    const maxAge = 100; // Usia maksimum yang diasumsikan
    let qxInputs = []; // Array untuk menyimpan input probabilitas kematian

    // Membuat input fields untuk setiap usia (0 hingga maxAge)
    for (let age = 0; age <= maxAge; age++) {
        const inputGroup = document.createElement('div');
        inputGroup.classList.add('input-group');

        const label = document.createElement('label');
        label.textContent = `Probabilitas Kematian (q_${age}) Usia ${age}:`;
        inputGroup.appendChild(label);

        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = 'Misal: 0.01 (1%)';
        input.min = '0';
        input.max = '1';
        input.step = '0.0001'; // Tingkat presisi
        input.id = `qx_${age}`; // ID unik untuk setiap input
        inputGroup.appendChild(input);

        dataInput.appendChild(inputGroup);
        qxInputs.push(input); // Simpan referensi ke input
    }

    hitungButton.addEventListener('click', function() {
        let sumOfSurvivalProbabilities = 0;
        let validData = true;

        // Validasi dan hitung jumlah probabilitas kelangsungan hidup
        for (let age = 0; age <= maxAge; age++) {
            const qx = parseFloat(qxInputs[age].value);

            if (isNaN(qx) || qx < 0 || qx > 1) {
                errorMessage.textContent = "Masukkan probabilitas kematian (q_x) yang valid (antara 0 dan 1).";
                ahhSpan.textContent = '0';
                validData = false;
                break; // Hentikan loop jika ada kesalahan
            }

            sumOfSurvivalProbabilities += (1 - qx); // Probabilitas kelangsungan hidup = 1 - probabilitas kematian
        }

        if (validData) {
            errorMessage.textContent = ""; // Bersihkan pesan error
            const ahh = sumOfSurvivalProbabilities;  //Ini sangat disederhanakan

            ahhSpan.textContent = ahh.toFixed(2);
        }
    });
});