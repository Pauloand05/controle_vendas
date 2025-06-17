"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ApiService } from "../services/api"
import type { Produto } from "../types"

interface ProdutoListProps {
  refreshTrigger?: number
}

export const ProdutoList: React.FC<ProdutoListProps> = ({ refreshTrigger }) => {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const fetchProdutos = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await ApiService.getProdutos()
      setProdutos(data)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao carregar produtos"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number, nome: string) => {
    if (window.confirm(`Tem certeza que deseja deletar o produto "${nome}"?`)) {
      try {
        await ApiService.deleteProduto(id)
        await fetchProdutos()
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro ao deletar produto"
        alert(`❌ ${errorMessage}`)
      }
    }
  }

  useEffect(() => {
    fetchProdutos()
  }, [refreshTrigger])

  if (loading) {
    return (
      <div className="card animate-fade-in">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div className="spinner" style={{ width: "32px", height: "32px", color: "#0284c7" }}></div>
            <span style={{ color: "#6b7280", fontWeight: "500" }}>Carregando produtos...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card animate-fade-in">
        <div style={{ textAlign: "center", padding: "48px 0" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              background: "#fee2e2",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              fontSize: "24px",
            }}
          >
            ⚠️
          </div>
          <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#1f2937", marginBottom: "8px" }}>
            Erro ao carregar
          </h3>
          <p style={{ color: "#dc2626", marginBottom: "16px" }}>{error}</p>
          <button onClick={fetchProdutos} className="btn-primary">
            🔄 Tentar Novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card animate-fade-in">
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <div className="icon-container icon-primary" style={{ width: "40px", height: "40px", fontSize: "18px" }}>
          📦
        </div>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#1f2937", margin: 0 }}>Produtos Cadastrados</h2>
          <p style={{ color: "#6b7280", fontSize: "14px", margin: 0 }}>{produtos.length} produto(s) encontrado(s)</p>
        </div>
      </div>

      {produtos.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 0" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              background: "#f3f4f6",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              fontSize: "24px",
            }}
          >
            📦
          </div>
          <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#6b7280", marginBottom: "8px" }}>
            Nenhum produto cadastrado
          </h3>
          <p style={{ color: "#9ca3af" }}>Cadastre seu primeiro produto para começar!</p>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr className="table-header">
                <th
                  style={{
                    padding: "16px 24px",
                    textAlign: "left",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  Produto
                </th>
                <th
                  style={{
                    padding: "16px 24px",
                    textAlign: "left",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  Custo Unit.
                </th>
                <th
                  style={{
                    padding: "16px 24px",
                    textAlign: "left",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  Preço Venda
                </th>
                <th
                  style={{
                    padding: "16px 24px",
                    textAlign: "left",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  Lucro Unit.
                </th>
                <th
                  style={{
                    padding: "16px 24px",
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => {
                const lucroUnitario = produto.precoVenda - produto.custoUnitario
                return (
                  <tr key={produto.id} className="table-row" style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "16px 24px" }}>
                      <div style={{ fontWeight: "500", color: "#1f2937" }}>{produto.nome}</div>
                    </td>
                    <td style={{ padding: "16px 24px", color: "#374151" }}>{formatCurrency(produto.custoUnitario)}</td>
                    <td style={{ padding: "16px 24px" }}>
                      <span style={{ fontWeight: "600", color: "#15803d" }}>{formatCurrency(produto.precoVenda)}</span>
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <span style={{ fontWeight: "600", color: "#0284c7" }}>{formatCurrency(lucroUnitario)}</span>
                    </td>
                    <td style={{ padding: "16px 24px", textAlign: "center" }}>
                      <button onClick={() => handleDelete(produto.id!, produto.nome)} className="btn-danger">
                        🗑️ Deletar
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
