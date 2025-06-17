import type { Produto, Venda } from "../types"

const API_BASE_URL = "http://localhost:8080"

export class ApiService {
  private static async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP ${response.status}: ${errorText || "Erro na requisição"}`)
    }

    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      return await response.json()
    }

    return {} as T
  }

  // Produtos
  static async getProdutos(): Promise<Produto[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/produtos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      return await this.handleResponse<Produto[]>(response)
    } catch (error) {
      console.error("Erro ao buscar produtos:", error)
      throw new Error("Falha ao carregar produtos. Verifique se o servidor está rodando.")
    }
  }

  static async createProduto(produto: Omit<Produto, "id">): Promise<Produto> {
    try {
      const response = await fetch(`${API_BASE_URL}/produtos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
      })
      return await this.handleResponse<Produto>(response)
    } catch (error) {
      console.error("Erro ao criar produto:", error)
      throw new Error("Falha ao cadastrar produto. Tente novamente.")
    }
  }

  static async deleteProduto(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/produtos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      await this.handleResponse<void>(response)
    } catch (error) {
      console.error("Erro ao deletar produto:", error)
      throw new Error("Falha ao deletar produto. Tente novamente.")
    }
  }

  // Vendas
  static async createVenda(venda: Venda): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/vendas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(venda),
      })
      return await this.handleResponse<any>(response)
    } catch (error) {
      console.error("Erro ao registrar venda:", error)
      throw new Error("Falha ao registrar venda. Tente novamente.")
    }
  }
}
