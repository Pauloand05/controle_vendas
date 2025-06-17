"use client"

import type React from "react"
import { useState } from "react"
import { ApiService } from "../services/api"
import type { Produto } from "../types"

interface ProdutoFormProps {
  onProdutoCreated?: () => void
}

export const ProdutoForm: React.FC<ProdutoFormProps> = ({ onProdutoCreated }) => {
  const [formData, setFormData] = useState({
    nome: "",
    custoUnitario: "",
    precoVenda: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const produto: Omit<Produto, "id"> = {
        nome: formData.nome.trim(),
        custoUnitario: Number.parseFloat(formData.custoUnitario),
        precoVenda: Number.parseFloat(formData.precoVenda),
      }

      if (!produto.nome) {
        throw new Error("Nome do produto é obrigatório")
      }
      if (produto.custoUnitario <= 0) {
        throw new Error("Custo unitário deve ser maior que zero")
      }
      if (produto.precoVenda <= 0) {
        throw new Error("Preço de venda deve ser maior que zero")
      }
      if (produto.precoVenda <= produto.custoUnitario) {
        throw new Error("Preço de venda deve ser maior que o custo unitário")
      }

      await ApiService.createProduto(produto)

      setFormData({ nome: "", custoUnitario: "", precoVenda: "" })
      setMessage({ type: "success", text: "✅ Produto cadastrado com sucesso!" })

      if (onProdutoCreated) {
        onProdutoCreated()
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
      setMessage({ type: "error", text: `❌ ${errorMessage}` })
    } finally {
      setLoading(false)
    }
  }

  const lucroUnitario =
    formData.custoUnitario && formData.precoVenda
      ? Number.parseFloat(formData.precoVenda) - Number.parseFloat(formData.custoUnitario)
      : 0

  const margemLucro =
    formData.custoUnitario && formData.precoVenda
      ? ((Number.parseFloat(formData.precoVenda) - Number.parseFloat(formData.custoUnitario)) /
          Number.parseFloat(formData.custoUnitario)) *
        100
      : 0

  return (
    <div className="card animate-fade-in">
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <div className="icon-container icon-success" style={{ width: "40px", height: "40px", fontSize: "18px" }}>
          +
        </div>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#1f2937", margin: 0 }}>Cadastrar Produto</h2>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <label
            htmlFor="nome"
            style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}
          >
            Nome do Produto *
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="Ex: Notebook Dell Inspiron"
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          <div>
            <label
              htmlFor="custoUnitario"
              style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}
            >
              Custo Unitário (R$) *
            </label>
            <input
              type="number"
              id="custoUnitario"
              name="custoUnitario"
              value={formData.custoUnitario}
              onChange={handleChange}
              step="0.01"
              min="0.01"
              required
              className="input-field"
              placeholder="0,00"
            />
          </div>

          <div>
            <label
              htmlFor="precoVenda"
              style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}
            >
              Preço de Venda (R$) *
            </label>
            <input
              type="number"
              id="precoVenda"
              name="precoVenda"
              value={formData.precoVenda}
              onChange={handleChange}
              step="0.01"
              min="0.01"
              required
              className="input-field"
              placeholder="0,00"
            />
          </div>
        </div>

        {formData.custoUnitario && formData.precoVenda && lucroUnitario > 0 && (
          <div className="summary-box">
            <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#1f2937", marginBottom: "12px" }}>
              📊 Análise de Lucro:
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
                fontSize: "14px",
              }}
            >
              <div>
                <span style={{ color: "#6b7280" }}>Lucro por unidade:</span>
                <span style={{ marginLeft: "8px", fontWeight: "bold", color: "#15803d" }}>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(lucroUnitario)}
                </span>
              </div>
              <div>
                <span style={{ color: "#6b7280" }}>Margem de lucro:</span>
                <span style={{ marginLeft: "8px", fontWeight: "bold", color: "#15803d" }}>
                  {margemLucro.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-success" style={{ width: "100%" }}>
          {loading ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <div className="spinner"></div>
              Cadastrando...
            </div>
          ) : (
            "💾 Cadastrar Produto"
          )}
        </button>
      </form>

      {message && <div className={message.type === "success" ? "alert-success" : "alert-error"}>{message.text}</div>}
    </div>
  )
}
