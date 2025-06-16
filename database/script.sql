-- Tabela Produto
CREATE TABLE produto (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    custo_unitario DECIMAL(10,2) NOT NULL,
    preco_venda DECIMAL(10,2) NOT NULL
);

-- Tabela Venda
CREATE TABLE venda (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    produto_id BIGINT NOT NULL,
    quantidade_vendida INT NOT NULL,
    lucro_unitario DECIMAL(10,2) NOT NULL,
    lucro_total DECIMAL(10,2) NOT NULL,
    valor_reinvestir DECIMAL(10,2) NOT NULL,
    lucro_liquido DECIMAL(10,2) NOT NULL,
    data_venda DATETIME DEFAULT CURRENT_TIMESTAMP,

    -- Relacionamento (chave estrangeira)
    CONSTRAINT fk_produto
        FOREIGN KEY (produto_id)
        REFERENCES produto(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);
