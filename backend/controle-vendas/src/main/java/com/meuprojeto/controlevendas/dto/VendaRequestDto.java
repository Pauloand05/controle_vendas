package com.meuprojeto.controlevendas.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VendaRequestDto {
    @NotNull(message = "O ID do produto é obrigatório")
    private Long produtoId;

    @NotNull(message = "A quantidade vendida é obrigatória")
    private Integer quantidadeVendida;
}
