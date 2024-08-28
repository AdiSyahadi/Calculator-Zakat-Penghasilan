function formatRupiah(angka) {
    if (isNaN(angka)) return 'Rp 0';
    const format = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    });
    return format.format(angka);
}

function parseRupiah(rupiah) {
    return parseInt(rupiah.replace(/[^0-9]+/g, ""), 10); // Gunakan parseInt untuk menjaga nilai integer
}

function updatePenghasilanBersih() {
    const penghasilan = parseRupiah(document.getElementById('penghasilan').value);
    const kebutuhan = parseRupiah(document.getElementById('kebutuhan').value);
    
    if (!isNaN(penghasilan) && !isNaN(kebutuhan)) {
        const penghasilanBersih = penghasilan - kebutuhan;
        document.getElementById('penghasilan-bersih').value = formatRupiah(penghasilanBersih); // Tampilkan sebagai mata uang
    }
}

function updateNisab() {
    const hargaEmas = parseRupiah(document.getElementById('hargaemas').value);

    if (!isNaN(hargaEmas)) {
        const nisabTahun = hargaEmas * 85;
        const nisabBulan = Math.floor(nisabTahun / 12); // Gunakan Math.floor untuk membulatkan kebawah

        document.getElementById('nisab-tahun').value = formatRupiah(nisabTahun);
        document.getElementById('nisab-bulan').value = formatRupiah(nisabBulan);
    }
}

function hitungZakat() {
    const penghasilanBersih = parseRupiah(document.getElementById('penghasilan-bersih').value);
    const nisabBulan = parseRupiah(document.getElementById('nisab-bulan').value);
    const resultDiv = document.getElementById('result');
    
    // Bersihkan konten sebelumnya
    resultDiv.innerHTML = '';

    if (isNaN(penghasilanBersih) || isNaN(nisabBulan)) {
        resultDiv.innerText = 'Mohon periksa input Anda.';
        return;
    }

    let resultText;

    // Debugging output untuk melihat nilai yang dihasilkan
    console.log("Penghasilan Bersih:", penghasilanBersih);
    console.log("Nisab Bulan:", nisabBulan);

    // Periksa apakah penghasilan bersih memenuhi nisab bulanan
    if (penghasilanBersih < nisabBulan) {
        resultText = 'Penghasilan Anda belum mencapai nisab. Anda tetap bisa menyempurnakan niat baik dengan bersedekah.';

        // Buat tombol Reset
        const resetButton = document.createElement('a');
        resetButton.innerText = 'Reset';
        resetButton.href = '#'; 
        resetButton.className = 'reset-button';
        resetButton.style.marginTop = '10px'; // Ensure space
        resetButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            document.getElementById('zakat-form').reset();
            resultDiv.innerHTML = ''; // Clear result
        });

        // Buat tombol Sedekah
        
        const sedekahButton = document.createElement('a');
        sedekahButton.innerText = 'Sedekah';
        sedekahButton.href = 'https://www.yoursedekahpage.com';
        sedekahButton.className = 'sedekah-button';
        sedekahButton.style.marginTop = '10px'; // Ensure space

        // Tambahkan teks hasil dan tombol ke resultDiv
        resultDiv.innerHTML = resultText;
        resultDiv.appendChild(document.createElement('br')); // Line break
        /* resultDiv.appendChild(resetButton);
        resultDiv.appendChild(sedekahButton); 8*/

    } else {
        const zakat = penghasilanBersih * 0.025; // Zakat 2.5%
        resultText = `Jumlah Zakat yang harus dibayar: ${formatRupiah(zakat)}`;
        resultDiv.innerText = resultText;
    }
}

// Tambahkan event listener untuk memperbarui nisab saat harga emas berubah
document.getElementById('hargaemas').addEventListener('input', updateNisab);

// Tambahkan event listeners untuk memperbarui penghasilan bersih saat input berubah
document.getElementById('penghasilan').addEventListener('input', updatePenghasilanBersih);
document.getElementById('kebutuhan').addEventListener('input', updatePenghasilanBersih);
