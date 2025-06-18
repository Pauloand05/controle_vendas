package com.meuprojeto.controlevendas.controller;

import com.meuprojeto.controlevendas.dto.VendaRequestDto;
import com.meuprojeto.controlevendas.model.Venda;
import com.meuprojeto.controlevendas.service.VendaService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"https://seu-frontend-no-render.onrender.com", "http://localhost:3000"})
@RestController
@RequestMapping("/vendas")
public class VendaController {

    private final VendaService vendaService;

    public VendaController(VendaService vendaService) {
        this.vendaService = vendaService;
    }

    @PostMapping
    public ResponseEntity<Venda> criarVenda(@Valid @RequestBody VendaRequestDto vendaRequest) {
        Venda vendaSalva = vendaService.salvarVenda(vendaRequest.getProdutoId(), vendaRequest.getQuantidadeVendida());
        return ResponseEntity.ok(vendaSalva);
    }

    @GetMapping
    public ResponseEntity<List<Venda>> listarVendas() {
        return ResponseEntity.ok(vendaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venda> buscarPorId(@PathVariable Long id) {
        return vendaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarVenda(@PathVariable Long id) {
        vendaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
