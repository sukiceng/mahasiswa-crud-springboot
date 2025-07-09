const API_URL = "http://localhost:8080/api/mahasiswa"; // Panggil API yang dibuat di springboot

// Fungsi untuk load semua data mhs kedalam tabel
async function loadMahasiswa() {
  const response = await fetch(API_URL);
  const result = await response.json();
  const data = result.data;
  const table = document.getElementById("mahasiswaTable");
  table.innerHTML = "";

  data.forEach((mahasiswa) => {
    const usia = hitungUsia(mahasiswa.tanggalLahir);
    const namaLengkap =
      mahasiswa.namaDepan +
      (mahasiswa.namaBelakang ? ` ${mahasiswa.namaBelakang}` : "");
    table.innerHTML += `
            <tr>
                <td>${mahasiswa.nim}</td>
                <td>${namaLengkap}</td>
                <td>${usia}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="showEditModal(${mahasiswa.id}, '${mahasiswa.nim}', '${mahasiswa.namaDepan}', '${mahasiswa.namaBelakang}', '${mahasiswa.tanggalLahir}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="hapusMahasiswa(${mahasiswa.id})">Hapus</button>
                </td>
            </tr>
        `;
  });
}

// Fungsi hitung usia
function hitungUsia(tanggalLahir) {
  const today = new Date();
  const birthDate = new Date(tanggalLahir);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// Tampilkan form untuk tambah data mahasiswa
document
  .getElementById("tambahMahasiswaForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const mahasiswa = {
      nim: document.getElementById("tambahNim").value,
      namaDepan: document.getElementById("tambahNamaDepan").value,
      namaBelakang: document.getElementById("tambahNamaBelakang").value,
      tanggalLahir: document.getElementById("tambahTanggalLahir").value,
    };

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mahasiswa),
    });

    document.getElementById("tambahMahasiswaForm").reset();
    const tambahModal = bootstrap.Modal.getInstance(
      document.getElementById("tambahModal")
    );
    tambahModal.hide();
    loadMahasiswa();
  });

// Tampilkan form edit mhs
function showEditModal(id, nim, namaDepan, namaBelakang, tanggalLahir) {
  document.getElementById("editId").value = id;
  document.getElementById("editNim").value = nim;
  document.getElementById("editNamaDepan").value = namaDepan;
  document.getElementById("editNamaBelakang").value = namaBelakang;
  document.getElementById("editTanggalLahir").value = tanggalLahir;

  const editModal = new bootstrap.Modal(document.getElementById("editModal"));
  editModal.show();
}

// Tampilkan form untuk edit data mahasiswa
document
  .getElementById("editMahasiswaForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const id = document.getElementById("editId").value;
    const mahasiswa = {
      nim: document.getElementById("editNim").value,
      namaDepan: document.getElementById("editNamaDepan").value,
      namaBelakang: document.getElementById("editNamaBelakang").value,
      tanggalLahir: document.getElementById("editTanggalLahir").value,
    };

    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mahasiswa),
    });

    const editModal = bootstrap.Modal.getInstance(
      document.getElementById("editModal")
    );
    editModal.hide();
    loadMahasiswa();
  });

// Fungsi untuk hapus data mahasiswa
async function hapusMahasiswa(id) {
  if (confirm("Yakin ingin menghapus data mahasiswa ini?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadMahasiswa();
  }
}

// load data semua mahasiswa setiap kali membuka web
document.addEventListener("DOMContentLoaded", () => {
  loadMahasiswa();
});
