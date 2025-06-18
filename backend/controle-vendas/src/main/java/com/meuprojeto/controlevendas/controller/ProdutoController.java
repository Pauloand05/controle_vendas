package com.meuprojeto.controlevendas.controller;

import com.meuprojeto.controlevendas.model.Produto;
import com.meuprojeto.controlevendas.service.ProdutoService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"https://seu-frontend-no-render.onrender.com", "http://localhost:3000"})
@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @PostMapping
    public ResponseEntity<Produto> criarProduto(@RequestBody Produto produto) {
        Produto salvo = produtoService.salvar(produto);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public ResponseEntity<List<Produto>> listarProdutos() {
        return ResponseEntity.ok(produtoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
        return produtoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarProduto(@PathVariable Long id) {
        try {
            produtoService.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (DataIntegrityViolationException e) {
            // Captura primeiro a exceção mais específica
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Não foi possível excluir - há registros vinculados");
        } catch (RuntimeException e) {
            // Depois a mais genérica
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            // Por último qualquer outra exceção
            return ResponseEntity.internalServerError()
                    .body("Erro ao excluir produto");
        }
    }
}
