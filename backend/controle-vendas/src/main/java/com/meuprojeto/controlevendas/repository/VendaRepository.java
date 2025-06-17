package com.meuprojeto.controlevendas.repository;

import com.meuprojeto.controlevendas.model.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendaRepository extends JpaRepository<Venda, Long> {

}
