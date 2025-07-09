package com.intern.mahasiswa_crud.repository;

import com.intern.mahasiswa_crud.model.Mahasiswa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MahasiswaRepository extends JpaRepository<Mahasiswa, Integer> {

    List<Mahasiswa> id(Integer id);
}
