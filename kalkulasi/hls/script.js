document.addEventListener('DOMContentLoaded', function() {
    const usiaAwalSekolahInput = document.getElementById('usiaAwalSekolah');
    const partisipasi1Input = document.getElementById('partisipasi1');
    const partisipasi2Input = document.getElementById('partisipasi2');
    const partisipasi3Input = document.getElementById('partisipasi3');
    const partisipasi4Input = document.getElementById('partisipasi4');
    const angkaKematianAnakInput = document.getElementById('angkaKematianAnak');

    const hitungButton = document.getElementById('hitung');
    const hlsSpan = document.getElementById('hls');
    const errorMessage = document.getElementById('error-message');

    hitungButton.addEventListener('click', function() {
        const usiaAwalSekolah = parseFloat(usiaAwalSekolahInput.value);
        const partisipasi1 = parseFloat(partisipasi1Input.value) / 100; // Ubah ke desimal
        const partisipasi2 = parseFloat(partisipasi2Input.value) / 100;
        const partisipasi3 = parseFloat(partisipasi3Input.value) / 100;
        const partisipasi4 = parseFloat(partisipasi4Input.value) / 100;
        const angkaKematianAnak = parseFloat(angkaKematianAnakInput.value);

        if (isNaN(usiaAwalSekolah) || isNaN(partisipasi1) || isNaN(partisipasi2) || isNaN(partisipasi3) || isNaN(partisipasi4) || isNaN(angkaKematianAnak)) {
            errorMessage.textContent = "Masukkan angka yang valid.";
            hlsSpan.textContent = '0';
            return;
        }

        if (partisipasi1 < 0 || partisipasi1 > 1 || partisipasi2 < 0 || partisipasi2 > 1 || partisipasi3 < 0 || partisipasi3 > 1 || partisipasi4 < 0 || partisipasi4 > 1) {
            errorMessage.textContent = "Persentase partisipasi harus antara 0 dan 100.";
            hlsSpan.textContent = '0';
            return;
        }

        if (angkaKematianAnak < 0) {
            errorMessage.textContent = "Angka kematian tidak boleh negatif.";
            hlsSpan.textContent = '0';
            return;
        }

        errorMessage.textContent = ""; // Bersihkan pesan error

        // Penyederhanaan perhitungan HLS.  Ini BUKAN cara yang akurat untuk menghitung HLS.
        // HLS diestimasi berdasarkan partisipasi sekolah pada berbagai kelompok usia.
        let hls = 0;
        hls += (12 - usiaAwalSekolah + 1) * partisipasi1; // Usia 7-12
        hls += 3 * partisipasi2; // Usia 13-15
        hls += 3 * partisipasi3; // Usia 16-18
        hls += 4 * partisipasi4; // Usia 19-22

        //Pengurangan akibat angka kematian (penyederhanaan besar)
        hls -= (angkaKematianAnak / 100); //Kurangi sedikit karena kematian anak

        hlsSpan.textContent = hls.toFixed(2);
    });
});