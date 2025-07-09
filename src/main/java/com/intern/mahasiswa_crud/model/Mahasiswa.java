package com.intern.mahasiswa_crud.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Mahasiswa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String nim;

    // Kolom data mahasiswa
    @Column(nullable = false)
    private String namaDepan;
    private String namaBelakang;

    // Kolom usia mahasiswa
    @Column(nullable = false)
    private LocalDate tanggalLahir;
}
