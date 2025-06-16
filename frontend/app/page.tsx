"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator, DollarSign } from "lucide-react"
import ResultsDisplay from "./components/results-display"

interface FormData {
  nomeProduto: string
  custoPorUnidade: number
  precoVendaPorUnidade: number
  quantidadeVendida: number
}

interface CalculatedResults {
  lucroPorUnidade: number
  lucroTotal: number
  valorReinvestir: number
  lucroLiquido: number
}

export default function SalesControlPage() {
  const [formData, setFormData] = useState<FormData>({
    nomeProduto: "",
    custoPorUnidade: 0,
    precoVendaPorUnidade: 0,
    quantidadeVendida: 0,
  })

  const [results, setResults] = useState<CalculatedResults | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const calculateResults = (data: FormData): CalculatedResults => {
    const lucroPorUnidade = data.precoVendaPorUnidade - data.custoPorUnidade
    const lucroTotal = lucroPorUnidade * data.quantidadeVendida
    const valorReinvestir = data.custoPorUnidade * data.quantidadeVendida
    const lucroLiquido = lucroTotal - valorReinvestir

    return {
      lucroPorUnidade,
      lucroTotal,
      valorReinvestir,
      lucroLiquido,
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Calcular resultados
      const calculatedResults = calculateResults(formData)

      // Enviar para API
      const response = await fetch("/api/vendas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          ...calculatedResults,
        }),
      })

      if (response.ok) {
        setResults(calculatedResults)
      } else {
        console.error("Erro ao enviar dados")
      }
    } catch (error) {
      console.error("Erro:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      nomeProduto: "",
      custoPorUnidade: 0,
      precoVendaPorUnidade: 0,
      quantidadeVendida: 0,
    })
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <Calculator className="text-blue-600" />
            Sistema de Controle de Vendas
          </h1>
          <p className="text-gray-600 text-lg">Calcule seus lucros e gerencie suas vendas de forma inteligente</p>
        </div>

        <div className={`grid ${results ? "lg:grid-cols-2" : ""} gap-8`}>
          <div className={`${!results ? "mx-auto w-full max-w-4xl" : ""}`}>
            {/* Formulário */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
                <CardTitle className="text-xl flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Dados da Venda
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <Label htmlFor="nomeProduto" className="text-sm font-medium text-gray-700">
                      Nome do Produto
                    </Label>
                    <Input
                      id="nomeProduto"
                      type="text"
                      value={formData.nomeProduto}
                      onChange={(e) => handleInputChange("nomeProduto", e.target.value)}
                      placeholder="Digite o nome do produto"
                      required
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="custoPorUnidade" className="text-sm font-medium text-gray-700">
                        Custo por Unidade (R$)
                      </Label>
                      <Input
                        id="custoPorUnidade"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.custoPorUnidade || ""}
                        onChange={(e) => handleInputChange("custoPorUnidade", Number.parseFloat(e.target.value) || 0)}
                        placeholder="0,00"
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="precoVendaPorUnidade" className="text-sm font-medium text-gray-700">
                        Preço de Venda por Unidade (R$)
                      </Label>
                      <Input
                        id="precoVendaPorUnidade"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.precoVendaPorUnidade || ""}
                        onChange={(e) =>
                          handleInputChange("precoVendaPorUnidade", Number.parseFloat(e.target.value) || 0)
                        }
                        placeholder="0,00"
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantidadeVendida" className="text-sm font-medium text-gray-700">
                      Quantidade Vendida
                    </Label>
                    <Input
                      id="quantidadeVendida"
                      type="number"
                      min="1"
                      value={formData.quantidadeVendida || ""}
                      onChange={(e) => handleInputChange("quantidadeVendida", Number.parseInt(e.target.value) || 0)}
                      placeholder="0"
                      required
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Calculando...
                        </>
                      ) : (
                        <>
                          <Calculator className="w-4 h-4 mr-2" />
                          Calcular Lucro
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      onClick={resetForm}
                      variant="outline"
                      className="px-6 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Limpar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Resultados */}
          {results && (
            <ResultsDisplay
              results={results}
              productName={formData.nomeProduto}
              quantity={formData.quantidadeVendida}
            />
          )}
        </div>
      </div>
    </div>
  )
}
