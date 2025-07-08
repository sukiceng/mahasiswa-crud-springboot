const apiUrl = "http://localhost:8080/api/mahasiswa";

document.addEventListener("DOMContentLoaded", () => {
  loadMahasiswa();

  document.getElementById("mahasiswaForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const mahasiswa = {
      nim: document.getElementById("nim").value,
      namaDepan: document.getElementById("namaDepan").value,
      namaBelakang: document.getElementById("namaBelakang").value,
      tanggalLahir: document.getElementById("tanggalLahir").value
    };

    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mahasiswa)
    });

    this.reset();
    loadMahasiswa();
  });
});

async function loadMahasiswa() {
  const response = await fetch(apiUrl);
  const result = await response.json();
  const table = document.getElementById("mahasiswaTable");
  table.innerHTML = "";

  result.data.forEach(m => {
    const namaLengkap = `${m.namaDepan}${m.namaBelakang ? ' ' + m.namaBelakang : ''}`;
    const usia = hitungUsia(m.tanggalLahir);

    table.innerHTML += `
      <tr>
        <td>${m.nim}</td>
        <td>${namaLengkap}</td>
        <td>${usia} tahun</td>
        <td>
            <button class="btn btn-sm btn-warning me-1" onclick="bukaModalEdit(${m.id}, '${m.nim}', '${m.namaDepan}', '${m.namaBelakang}', '${m.tanggalLahir}')">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="hapusMahasiswa(${m.id})">Hapus</button>
        </td>
      </tr>
    `;
  });
}

function hitungUsia(tanggal) {
  const birth = new Date(tanggal);
  const today = new Date();
  let usia = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    usia--;
  }
  return usia;
}

async function hapusMahasiswa(id) {
  if (confirm("Yakin ingin menghapus data ini?")) {
    await fetch(`${apiUrl}/${id}`, {
      method: "DELETE"
    });
    loadMahasiswa();
  }
}

function bukaModalEdit(id, nim, namaDepan, namaBelakang, tanggalLahir) {
  document.getElementById("editId").value = id;
  document.getElementById("editNim").value = nim;
  document.getElementById("editNamaDepan").value = namaDepan;
  document.getElementById("editNamaBelakang").value = namaBelakang;
  document.getElementById("editTanggalLahir").value = tanggalLahir;

  const modal = new bootstrap.Modal(document.getElementById("editModal"));
  modal.show();
}

document.getElementById("editMahasiswaForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const id = document.getElementById("editId").value;
  const updatedMahasiswa = {
    nim: document.getElementById("editNim").value,
    namaDepan: document.getElementById("editNamaDepan").value,
    namaBelakang: document.getElementById("editNamaBelakang").value,
    tanggalLahir: document.getElementById("editTanggalLahir").value
  };

  await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedMahasiswa)
  });

  const modal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
  modal.hide();
  loadMahasiswa();
});
