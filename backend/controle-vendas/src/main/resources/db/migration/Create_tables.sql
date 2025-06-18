-- Tabela Produto (PostgreSQL)
CREATE TABLE produto (
    id BIGSERIAL PRIMARY KEY,  -- No PostgreSQL usamos BIGSERIAL para auto-incremento
    nome VARCHAR(100) NOT NULL,
    custo_unitario DECIMAL(10,2) NOT NULL,
    preco_venda DECIMAL(10,2) NOT NULL
);

-- Tabela Venda (PostgreSQL)
CREATE TABLE venda (
    id BIGSERIAL PRIMARY KEY,
    produto_id BIGINT NOT NULL,
    quantidade_vendida INTEGER NOT NULL,
    lucro_unitario DECIMAL(10,2) GENERATED ALWAYS AS (preco_venda - custo_unitario) STORED,
    lucro_total DECIMAL(10,2) GENERATED ALWAYS AS ((preco_venda - custo_unitario) * quantidade_vendida) STORED,
    valor_reinvestir DECIMAL(10,2) NOT NULL,
    lucro_liquido DECIMAL(10,2) GENERATED ALWAYS AS ((preco_venda - custo_unitario) * quantidade_vendida - valor_reinvestir) STORED,
    data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Relacionamento (chave estrangeira)
    CONSTRAINT fk_produto
        FOREIGN KEY (produto_id)
        REFERENCES produto(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);