package com.meuprojeto.controlevendas.model;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false)
    private Produto produto;

    @Column(nullable = false)
    private Integer quantidadeVendida;

    @Column(name = "lucro_unitario", nullable = false)
    private BigDecimal lucroUnitario;

    @Column(name = "lucro_total", nullable = false)
    private BigDecimal lucroTotal;

    @Column(name = "valor_reinvestir", nullable = false)
    private BigDecimal valorReinvestir;

    @Column(name = "lucro_liquido", nullable = false)
    private BigDecimal lucroLiquido;

    @Column(name = "data_venda", nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dataVenda;
}