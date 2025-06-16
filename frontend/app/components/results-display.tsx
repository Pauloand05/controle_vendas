import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, PiggyBank, Target } from "lucide-react"

interface ResultsDisplayProps {
  results: {
    lucroPorUnidade: number
    lucroTotal: number
    valorReinvestir: number
    lucroLiquido: number
  }
  productName: string
  quantity: number
}

export default function ResultsDisplay({ results, productName, quantity }: ResultsDisplayProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const getColorClass = (value: number) => {
    if (value > 0) return "text-green-600"
    if (value < 0) return "text-red-600"
    return "text-gray-600"
  }

  const getBgColorClass = (value: number) => {
    if (value > 0) return "from-green-500 to-green-600"
    if (value < 0) return "from-red-500 to-red-600"
    return "from-gray-500 to-gray-600"
  }

  return (
    <div className="space-y-6">
      {/* Resumo do Produto */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
        <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-xl flex items-center gap-2">
            <Target className="w-5 h-5" />
            Resumo da Análise
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{productName}</h3>
            <p className="text-gray-600">
              Análise para {quantity} {quantity === 1 ? "unidade" : "unidades"} vendida{quantity === 1 ? "" : "s"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Cards de Resultados */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Lucro por Unidade */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur overflow-hidden">
          <div className={`h-2 bg-gradient-to-r ${getBgColorClass(results.lucroPorUnidade)}`}></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Lucro por Unidade</p>
                <p className={`text-2xl font-bold ${getColorClass(results.lucroPorUnidade)}`}>
                  {formatCurrency(results.lucroPorUnidade)}
                </p>
              </div>
              <div
                className={`p-3 rounded-full bg-gradient-to-r ${getBgColorClass(results.lucroPorUnidade)} bg-opacity-10`}
              >
                <DollarSign className={`w-6 h-6 ${getColorClass(results.lucroPorUnidade)}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lucro Total */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur overflow-hidden">
          <div className={`h-2 bg-gradient-to-r ${getBgColorClass(results.lucroTotal)}`}></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Lucro Total</p>
                <p className={`text-2xl font-bold ${getColorClass(results.lucroTotal)}`}>
                  {formatCurrency(results.lucroTotal)}
                </p>
              </div>
              <div className={`p-3 rounded-full bg-gradient-to-r ${getBgColorClass(results.lucroTotal)} bg-opacity-10`}>
                <TrendingUp className={`w-6 h-6 ${getColorClass(results.lucroTotal)}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Valor a Reinvestir */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Valor a Reinvestir</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(results.valorReinvestir)}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <PiggyBank className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lucro Líquido */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur overflow-hidden">
          <div className={`h-2 bg-gradient-to-r ${getBgColorClass(results.lucroLiquido)}`}></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Lucro Líquido</p>
                <p className={`text-2xl font-bold ${getColorClass(results.lucroLiquido)}`}>
                  {formatCurrency(results.lucroLiquido)}
                </p>
              </div>
              <div
                className={`p-3 rounded-full bg-gradient-to-r ${getBgColorClass(results.lucroLiquido)} bg-opacity-10`}
              >
                <Target className={`w-6 h-6 ${getColorClass(results.lucroLiquido)}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Análise Resumida */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Análise Resumida</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Margem de Lucro por Unidade:</span>
              <span className={`font-semibold ${getColorClass(results.lucroPorUnidade)}`}>
                {results.lucroPorUnidade > 0
                  ? `+${formatCurrency(results.lucroPorUnidade)}`
                  : formatCurrency(results.lucroPorUnidade)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Total Investido:</span>
              <span className="font-semibold text-blue-600">{formatCurrency(results.valorReinvestir)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Retorno Final:</span>
              <span className={`font-semibold ${getColorClass(results.lucroLiquido)}`}>
                {results.lucroLiquido > 0
                  ? `+${formatCurrency(results.lucroLiquido)}`
                  : formatCurrency(results.lucroLiquido)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
