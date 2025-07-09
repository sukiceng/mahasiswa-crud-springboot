package com.intern.mahasiswa_crud.controller;

import com.intern.mahasiswa_crud.model.Mahasiswa;
import com.intern.mahasiswa_crud.payload.ApiResponse;
import com.intern.mahasiswa_crud.service.MahasiswaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/mahasiswa")
public class MahasiswaController {
    private final MahasiswaService service;

    public MahasiswaController(MahasiswaService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAll() {
        List<Mahasiswa> mahasiswaList = service.getAllMahasiswa();
        return ResponseEntity.ok(new ApiResponse("Daftar mahasiswa berhasil diambil", mahasiswaList));
    }

    // Mengambil data mahasiswa berdasarkan ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable  Integer id) {
        return service.getMahasiswaById(id)
                .map(mahasiswa -> ResponseEntity.ok(new ApiResponse("Mahasiswa ditemukan", mahasiswa)))
                .orElse(ResponseEntity.status(404).body(new ApiResponse("Mahasiswa tidak ditemukan", null)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> create(@RequestBody Mahasiswa mahasiswa) {
        Mahasiswa saved = service.saveMahasiswa(mahasiswa);
        return ResponseEntity.ok(new ApiResponse("Mahasiswa berhasil ditambahkan", saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> update(@PathVariable Integer id, @RequestBody Mahasiswa mahasiswa) {
        return service.getMahasiswaById(id)
                .map(existing -> {
                    mahasiswa.setId(id);
                    Mahasiswa updated = service.saveMahasiswa(mahasiswa);
                    return ResponseEntity.ok(new ApiResponse("Mahasiswa berhasil diperbarui", updated));
                })
                .orElse(ResponseEntity.status(404).body(new ApiResponse("Mahasiswa tidak ditemukan", null)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Integer id) {
        return service.getMahasiswaById(id)
                .map(mahasiswa -> {
                    service.deleteMahasiswa(id);
                    return ResponseEntity.ok(new ApiResponse("Mahasiswa berhasil dihapus", null));
                })
                .orElse(ResponseEntity.status(404).body(new ApiResponse("Mahasiswa tidak ditemukan", null)));
    }
}
