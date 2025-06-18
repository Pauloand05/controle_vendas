'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

interface Venda {
  id: number
  produto: {
    nome: string
  }
  quantidadeVendida: number
  lucroUnitario: number
  lucroTotal: number   // valor total ganho (preço * qtd)
  valorReinvestir: number  // custo total
  lucroLiquido: number  // lucro total - valorReinvestir
  dataVenda: string // formato ISO
}

type Props = {
  refreshTrigger: number
}

export function VendaList({ refreshTrigger }: Props) {
  const [vendas, setVendas] = useState<Venda[]>([])

  useEffect(() => {
    axios.get('https://controle-vendas-1.onrender.com/vendas')
      .then(response => setVendas(response.data))
      .catch(error => console.error('Erro ao buscar vendas:', error))
  }, [refreshTrigger])

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📊 Lista de Vendas</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">#</th>
              <th className="border px-2 py-1">Produto</th>
              <th className="border px-2 py-1">Quantidade</th>
              <th className="border px-2 py-1">Lucro Unit. (R$)</th>
              <th className="border px-2 py-1">Valor Total Ganho (R$)</th>
              <th className="border px-2 py-1">Valor a Reinvestir (R$)</th>
              <th className="border px-2 py-1">Lucro Líquido (R$)</th>
              <th className="border px-2 py-1">Data</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda) => (
              <tr key={venda.id} className="text-center hover:bg-gray-50">
                <td className="border px-2 py-1">{venda.id}</td>
                <td className="border px-2 py-1">{venda.produto?.nome || '---'}</td>
                <td className="border px-2 py-1">{venda.quantidadeVendida}</td>
                <td className="border px-2 py-1">{venda.lucroUnitario.toFixed(2)}</td>
                <td className="border px-2 py-1">{venda.lucroTotal.toFixed(2)}</td>
                <td className="border px-2 py-1">{venda.valorReinvestir.toFixed(2)}</td>
                <td className="border px-2 py-1">{venda.lucroLiquido.toFixed(2)}</td>
                <td className="border px-2 py-1">
                  {new Date(venda.dataVenda).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </td>
              </tr>
            ))}
            {vendas.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  Nenhuma venda registrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}