# 📊 Sistema de Controle de Vendas

Um sistema web moderno e responsivo para controle e análise de vendas, desenvolvido com Next.js 15, TypeScript e Tailwind CSS.

![Sistema de Controle de Vendas](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Funcionalidades

### ✨ Principais Recursos
- **Formulário Intuitivo**: Interface limpa para inserção de dados de vendas
- **Cálculos Automáticos**: Processamento em tempo real de métricas de lucro
- **Design Responsivo**: Adaptação perfeita para desktop e mobile
- **API REST**: Endpoint preparado para integração com banco de dados
- **Validação de Dados**: Validação completa dos campos do formulário

### 📈 Métricas Calculadas
- **Lucro por Unidade**: Diferença entre preço de venda e custo
- **Lucro Total**: Lucro por unidade multiplicado pela quantidade
- **Valor a Reinvestir**: Custo total dos produtos vendidos
- **Lucro Líquido**: Lucro real após descontar o valor de reinvestimento

### 🎨 Design
- **Cores**: Paleta em tons de verde e azul
- **Layout**: Design moderno com gradientes e efeitos visuais
- **Responsividade**: Interface adaptativa para todos os dispositivos
- **UX**: Indicadores visuais dinâmicos baseados nos resultados

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Componentes**: shadcn/ui
- **Ícones**: Lucide React
- **Validação**: Validação nativa do HTML5

## 📋 Pré-requisitos

- Node.js 18+ 
- npm, yarn ou pnpm

## ⚡ Instalação e Execução

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd sistema-controle-vendas
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Execute o projeto
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

### 4. Acesse a aplicação
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
sistema-controle-vendas/
├── app/
│   ├── api/
│   │   └── vendas/
│   │       └── route.ts          # API endpoint para vendas
│   ├── components/
│   │   └── results-display.tsx   # Componente de exibição de resultados
│   ├── globals.css               # Estilos globais
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Página principal
├── components/
│   └── ui/                      # Componentes shadcn/ui
├── lib/
│   └── utils.ts                 # Utilitários
├── tailwind.config.ts           # Configuração do Tailwind
├── next.config.mjs              # Configuração do Next.js
└── package.json
```

## 🔧 Como Usar

### 1. Preenchimento do Formulário
- **Nome do Produto**: Digite o nome do produto vendido
- **Custo por Unidade**: Insira o custo de cada unidade (R\$)
- **Preço de Venda**: Defina o preço de venda por unidade (R\$)
- **Quantidade Vendida**: Informe quantas unidades foram vendidas

### 2. Cálculo dos Resultados
Clique em "Calcular Lucro" para processar os dados e visualizar:
- Lucro por unidade
- Lucro total da venda
- Valor necessário para reinvestir
- Lucro líquido final

### 3. Análise Visual
Os resultados são exibidos com:
- **Cores dinâmicas**: Verde para lucro, vermelho para prejuízo
- **Cards informativos**: Cada métrica em seu próprio card
- **Resumo detalhado**: Análise completa da venda

## 🌐 API Endpoints

### POST /api/vendas
Endpoint para registrar uma nova venda.

**Body:**
```json
{
  "nomeProduto": "string",
  "custoPorUnidade": "number",
  "precoVendaPorUnidade": "number",
  "quantidadeVendida": "number",
  "lucroPorUnidade": "number",
  "lucroTotal": "number",
  "valorReinvestir": "number",
  "lucroLiquido": "number"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Venda registrada com sucesso!",
  "data": { ... }
}
```

## 🎯 Próximas Funcionalidades

- [ ] **Banco de Dados**: Integração com Supabase/PostgreSQL
- [ ] **Autenticação**: Sistema de login e usuários
- [ ] **Histórico**: Lista de vendas anteriores
- [ ] **Relatórios**: Geração de relatórios em PDF
- [ ] **Gráficos**: Visualização de dados com charts
- [ ] **Dashboard**: Painel com métricas consolidadas
- [ ] **Exportação**: Export para Excel/CSV
- [ ] **Filtros**: Busca e filtros por período/produto

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido por Paulo Alves.

---

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões, por favor:
- Abra uma [issue](../../issues)
- Entre em contato através do email: [pauloandre050619@gmail.com]
