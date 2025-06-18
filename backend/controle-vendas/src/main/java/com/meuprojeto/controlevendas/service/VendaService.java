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

    public Venda salvarVenda(Long produtoId, Integer quantidadeVendida) {
        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        BigDecimal precoVenda = produto.getPrecoVenda();
        BigDecimal custoUnitario = produto.getCustoUnitario();

        BigDecimal lucroUnitario = precoVenda.subtract(custoUnitario);

        // Novo cálculo do lucro total = preço de venda * quantidade vendida
        BigDecimal lucroTotal = precoVenda.multiply(BigDecimal.valueOf(quantidadeVendida));

        // Valor a reinvestir = custo unitário * quantidade vendida
        BigDecimal valorReinvestir = custoUnitario.multiply(BigDecimal.valueOf(quantidadeVendida));

        // Lucro líquido = lucro total - valor a reinvestir
        BigDecimal lucroLiquido = lucroTotal.subtract(valorReinvestir);

        Venda venda = new Venda();
        venda.setProduto(produto);
        venda.setQuantidadeVendida(quantidadeVendida);
        venda.setLucroUnitario(lucroUnitario);
        venda.setLucroTotal(lucroTotal);
        venda.setValorReinvestir(valorReinvestir);
        venda.setLucroLiquido(lucroLiquido);
        venda.setDataVenda(LocalDateTime.now());

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
