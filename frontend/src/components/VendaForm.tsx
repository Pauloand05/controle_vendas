"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ApiService } from "../services/api"
import type { Produto, Venda } from "../types"

export const VendaForm: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [formData, setFormData] = useState({
    produtoId: "",
    quantidadeVendida: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const fetchProdutos = async () => {
    try {
      const data = await ApiService.getProdutos()
      setProdutos(data)
    } catch (error) {
      console.error("Erro ao buscar produtos:", error)
    }
  }

  useEffect(() => {
    fetchProdutos()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const venda: Venda = {
        produtoId: Number.parseInt(formData.produtoId),
        quantidadeVendida: Number.parseInt(formData.quantidadeVendida),
      }

      if (!venda.produtoId) {
        throw new Error("Selecione um produto")
      }
      if (venda.quantidadeVendida <= 0) {
        throw new Error("Quantidade deve ser maior que zero")
      }

      await ApiService.createVenda(venda)

      setFormData({ produtoId: "", quantidadeVendida: "" })
      setMessage({ type: "success", text: "✅ Venda registrada com sucesso!" })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
      setMessage({ type: "error", text: `❌ ${errorMessage}` })
    } finally {
      setLoading(false)
    }
  }

  const selectedProduto = produtos.find((p) => p.id === Number.parseInt(formData.produtoId))
  const quantidade = Number.parseInt(formData.quantidadeVendida) || 0

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <div className="card animate-fade-in" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <div className="icon-container icon-success" style={{ width: "40px", height: "40px", fontSize: "18px" }}>
          💰
        </div>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#1f2937", margin: 0 }}>Registrar Venda</h2>
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
            Nenhum produto disponível
          </h3>
          <p style={{ color: "#9ca3af" }}>Cadastre produtos antes de registrar vendas!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <label
              htmlFor="produtoId"
              style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}
            >
              Produto *
            </label>
            <select
              id="produtoId"
              name="produtoId"
              value={formData.produtoId}
              onChange={handleChange}
              required
              className="select-field"
            >
              <option value="">Selecione um produto</option>
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.nome} - {formatCurrency(produto.precoVenda)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="quantidadeVendida"
              style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}
            >
              Quantidade Vendida *
            </label>
            <input
              type="number"
              id="quantidadeVendida"
              name="quantidadeVendida"
              value={formData.quantidadeVendida}
              onChange={handleChange}
              min="1"
              required
              className="input-field"
              placeholder="Digite a quantidade"
            />
          </div>

          {selectedProduto && quantidade > 0 && (
            <div className="summary-box">
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>📊</span> Resumo da Venda
              </h3>
              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Produto:</span>
                    <span style={{ fontWeight: "500", color: "#1f2937" }}>{selectedProduto.nome}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Quantidade:</span>
                    <span style={{ fontWeight: "500", color: "#1f2937" }}>{quantidade} unidades</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Valor unitário:</span>
                    <span style={{ fontWeight: "500", color: "#1f2937" }}>
                      {formatCurrency(selectedProduto.precoVenda)}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Custo total:</span>
                    <span style={{ fontWeight: "500", color: "#1f2937" }}>
                      {formatCurrency(selectedProduto.custoUnitario * quantidade)}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Lucro unitário:</span>
                    <span style={{ fontWeight: "500", color: "#15803d" }}>
                      {formatCurrency(selectedProduto.precoVenda - selectedProduto.custoUnitario)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderTop: "1px solid #e5e7eb",
                      paddingTop: "8px",
                    }}
                  >
                    <span style={{ fontWeight: "600", color: "#1f2937" }}>Total da venda:</span>
                    <span style={{ fontWeight: "bold", fontSize: "20px", color: "#15803d" }}>
                      {formatCurrency(selectedProduto.precoVenda * quantidade)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="profit-highlight" style={{ marginTop: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: "600", color: "#15803d" }}>💰 Lucro total:</span>
                  <span style={{ fontWeight: "bold", fontSize: "20px", color: "#15803d" }}>
                    {formatCurrency((selectedProduto.precoVenda - selectedProduto.custoUnitario) * quantidade)}
                  </span>
                </div>
              </div>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-success" style={{ width: "100%" }}>
            {loading ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <div className="spinner"></div>
                Registrando...
              </div>
            ) : (
              "💾 Registrar Venda"
            )}
          </button>
        </form>
      )}

      {message && <div className={message.type === "success" ? "alert-success" : "alert-error"}>{message.text}</div>}
    </div>
  )
}
