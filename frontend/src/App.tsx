"use client"

import { useState } from "react"
import { ProdutoForm } from "./components/ProdutoForm"
import { ProdutoList } from "./components/ProdutoList"
import { VendaForm } from "./components/VendaForm"
import { VendaList } from "./components/VendaList" // <-- importar VendaList

function App() {
  const [activeTab, setActiveTab] = useState<"produtos" | "vendas">("produtos")
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleProdutoCreated = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  const handleVendaCreated = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="container" style={{ paddingTop: "32px", paddingBottom: "32px" }}>
        {/* Header */}
        <header className="animate-fade-in" style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div className="icon-container icon-gradient" style={{ width: "48px", height: "48px", fontSize: "20px" }}>
              📊
            </div>
            <h1 className="gradient-text" style={{ fontSize: "48px", fontWeight: "bold", margin: 0 }}>
              Sistema de Controle de Vendas
            </h1>
          </div>
          <p style={{ color: "#6b7280", fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}>
            Gerencie seus produtos e registre suas vendas com facilidade e precisão
          </p>
        </header>

        {/* Navigation Tabs */}
        <div className="animate-slide-up" style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
          <div className="card" style={{ padding: "8px", display: "flex", gap: "4px" }}>
            <button
              onClick={() => setActiveTab("produtos")}
              className={activeTab === "produtos" ? "tab-active" : "tab-inactive"}
              style={{
                padding: "12px 32px",
                borderRadius: "12px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>📦</span>
              Produtos
            </button>
            <button
              onClick={() => setActiveTab("vendas")}
              className={activeTab === "vendas" ? "tab-active" : "tab-inactive"}
              style={{
                padding: "12px 32px",
                borderRadius: "12px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>💰</span>
              Vendas
            </button>
          </div>
        </div>

        {/* Content */}
        <main className="animate-fade-in">
          {activeTab === "produtos" ? (
            <div className="grid-responsive">
              <div>
                <ProdutoForm onProdutoCreated={handleProdutoCreated} />
              </div>
              <div>
                <ProdutoList refreshTrigger={refreshTrigger} />
              </div>
            </div>
          ) : (
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
              <VendaForm onVendaCreated={handleVendaCreated} />
              <VendaList refreshTrigger={refreshTrigger} />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer
          className="animate-fade-in"
          style={{ textAlign: "center", marginTop: "64px", paddingTop: "32px", borderTop: "1px solid #e5e7eb" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              color: "#9ca3af",
              marginBottom: "8px",
            }}
          >
            <span>⚡</span>
            <span style={{ fontWeight: "500" }}>Sistema de Controle de Vendas</span>
          </div>
          <p style={{ fontSize: "14px", color: "#d1d5db" }}>Desenvolvido com React, TypeScript e Tailwind CSS</p>
        </footer>
      </div>
    </div>
  )
}

export default App