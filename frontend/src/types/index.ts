export interface Produto {
  id?: number
  nome: string
  custoUnitario: number
  precoVenda: number
}

export interface Venda {
  produtoId: number
  quantidadeVendida: number
}

export interface ApiResponse<T> {
  data?: T
  message?: string
  success: boolean
}
