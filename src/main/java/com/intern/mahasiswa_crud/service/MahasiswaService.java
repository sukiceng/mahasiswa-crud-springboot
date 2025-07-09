package com.intern.mahasiswa_crud.service;

import com.intern.mahasiswa_crud.model.Mahasiswa;
import com.intern.mahasiswa_crud.repository.MahasiswaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MahasiswaService {
private final MahasiswaRepository mahasiswaRepository;

    public MahasiswaService(MahasiswaRepository mahasiswaRepository) {
        this.mahasiswaRepository = mahasiswaRepository;
    }

    public List<Mahasiswa> getAllMahasiswa() {
        return mahasiswaRepository.findAll();
    }

    public Optional<Mahasiswa> getMahasiswaById(Integer id) {
        return mahasiswaRepository.findById(id);
    }

    public Mahasiswa saveMahasiswa(Mahasiswa mahasiswa) {
        return mahasiswaRepository.save(mahasiswa);
    }

    public void deleteMahasiswa(Integer id) {
        mahasiswaRepository.deleteById(id);
    }
}
