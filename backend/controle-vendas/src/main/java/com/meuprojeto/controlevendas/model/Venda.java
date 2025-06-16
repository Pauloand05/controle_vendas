package com.meuprojeto.controlevendas.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "venda")
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER) // busca rápida para usar dados do produto na venda
    @JoinColumn(name = "produto_id", nullable = false)
    @JsonIgnoreProperties("venda")
    private Produto produto;

    @Column(name = "quantidade_vendida", nullable = false)
    private Integer quantidadeVendida;

    @Column(name = "lucro_unitario", nullable = false, precision = 10, scale = 2)
    private BigDecimal lucroUnitario;

    @Column(name = "lucro_total", nullable = false, precision = 10, scale = 2)
    private BigDecimal lucroTotal;

    @Column(name = "valor_reinvestir", nullable = false, precision = 10, scale = 2)
    private BigDecimal valorReinvestir;

    @Column(name = "lucro_liquido", nullable = false, precision = 10, scale = 2)
    private BigDecimal lucroLiquido;

    @Column(name = "data_venda", nullable = false)
    private LocalDateTime dataVenda;
}
