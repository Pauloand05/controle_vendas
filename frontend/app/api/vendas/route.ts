import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Aqui você pode adicionar validações e salvar no banco de dados futuramente
    console.log("Dados recebidos:", data)

    // Por enquanto, apenas retornamos os dados recebidos
    return NextResponse.json({
      success: true,
      message: "Venda registrada com sucesso!",
      data,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Erro ao processar dados" }, { status: 500 })
  }
}
