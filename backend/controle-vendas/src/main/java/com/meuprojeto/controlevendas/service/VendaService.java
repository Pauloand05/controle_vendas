package com.meuprojeto.controlevendas.service;

import com.meuprojeto.controlevendas.model.Produto;
import com.meuprojeto.controlevendas.model.Venda;
import com.meuprojeto.controlevendas.repository.ProdutoRepository;
import com.meuprojeto.controlevendas.repository.VendaRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class VendaService {


    private final VendaRepository vendaRepository;
    private final ProdutoRepository produtoRepository;

    public VendaService(VendaRepository vendaRepository, ProdutoRepository produtoRepository) {
        this.vendaRepository = vendaRepository;
        this.produtoRepository = produtoRepository;
    }

    public Venda salvarVenda(Venda venda) {
        // Busca o produto completo do banco de dados
        Produto produto = produtoRepository.findById(venda.getProduto().getId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado com ID: " + venda.getProduto().getId()));

        // Garante que a venda terá o produto completo
        venda.setProduto(produto);

        // Cálculos automáticos
        BigDecimal lucroUnitario = produto.getPrecoVenda().subtract(produto.getCustoUnitario());
        BigDecimal lucroTotal = lucroUnitario.multiply(BigDecimal.valueOf(venda.getQuantidadeVendida()));
        BigDecimal percentualReinvestir = new BigDecimal("0.30");
        BigDecimal valorReinvestir = lucroTotal.multiply(percentualReinvestir);
        BigDecimal lucroLiquido = lucroTotal.subtract(valorReinvestir);

        venda.setLucroUnitario(lucroUnitario);
        venda.setLucroTotal(lucroTotal);
        venda.setValorReinvestir(valorReinvestir);
        venda.setLucroLiquido(lucroLiquido);

        if (venda.getDataVenda() == null) {
            venda.setDataVenda(LocalDateTime.now());
        }

        return vendaRepository.save(venda);
    }

    public List<Venda> listarTodas() {
        return vendaRepository.findAll();
    }

    public Optional<Venda> buscarPorId(Long id) {
        return vendaRepository.findById(id);
    }

    public void deletar(Long id) {
        vendaRepository.deleteById(id);
    }
}
