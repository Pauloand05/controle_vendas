# 🛒 Sistema de Controle de Vendas - Frontend

Um sistema frontend moderno desenvolvido em React com TypeScript para gerenciamento de produtos e controle de vendas.

![React](https://img.shields.io/badge/React-18.x-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.x-black.svg)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🎯 Sobre o Projeto

O Sistema de Controle de Vendas é uma aplicação web que permite gerenciar produtos e registrar vendas de forma simples e intuitiva. O sistema oferece uma interface moderna e responsiva para cadastro de produtos, visualização de inventário e registro de vendas.

### Principais Características:
- ✅ Interface moderna e responsiva
- ✅ Gerenciamento completo de produtos
- ✅ Registro de vendas com cálculos automáticos
- ✅ Formatação de moeda brasileira (R$)
- ✅ Tratamento de erros robusto
- ✅ Feedback visual para todas as ações

## 🚀 Funcionalidades

### 📦 Gerenciamento de Produtos
- **Cadastro de Produtos**: Formulário para adicionar novos produtos com nome, custo unitário e preço de venda
- **Listagem de Produtos**: Visualização de todos os produtos cadastrados em formato de tabela
- **Exclusão de Produtos**: Remoção de produtos com confirmação
- **Formatação de Preços**: Exibição de valores em formato de moeda brasileira

### 💰 Controle de Vendas
- **Registro de Vendas**: Formulário para registrar vendas selecionando produto e quantidade
- **Cálculo Automático**: Preview do valor total da venda em tempo real
- **Validação de Dados**: Verificação de campos obrigatórios e valores válidos

### 🎨 Interface do Usuário
- **Design Responsivo**: Adaptação automática para desktop e mobile
- **Navegação por Abas**: Interface organizada com abas para produtos e vendas
- **Feedback Visual**: Mensagens de sucesso, erro e estados de carregamento
- **Tema Moderno**: Design limpo com cores em tons de verde e azul

## 🛠 Tecnologias Utilizadas

- **[React 18](https://reactjs.org/)** - Biblioteca JavaScript para construção de interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Superset do JavaScript com tipagem estática
- **[Next.js 14](https://nextjs.org/)** - Framework React para produção
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário
- **[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)** - Para comunicação com a API REST

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18.x ou superior)
- **npm** ou **yarn**
- **Backend da API** rodando em `http://localhost:8080`

## 🔧 Instalação

1. **Clone o repositório**
   \`\`\`bash
   git clone https://github.com/seu-usuario/sales-control-frontend.git
   cd sales-control-frontend
   \`\`\`

2. **Instale as dependências**
   \`\`\`bash
   npm install
   # ou
   yarn install
   \`\`\`

3. **Configure as variáveis de ambiente** (opcional)
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Edite o arquivo `.env.local` se necessário:
   \`\`\`env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   \`\`\`

4. **Execute o projeto**
   \`\`\`bash
   npm run dev
   # ou
   yarn dev
   \`\`\`

5. **Acesse a aplicação**
   
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📖 Como Usar

### 1. Cadastrando Produtos

1. Acesse a aba **"Produtos"**
2. Preencha o formulário com:
   - Nome do produto
   - Custo unitário (em reais)
   - Preço de venda (em reais)
3. Clique em **"Cadastrar Produto"**
4. O produto aparecerá automaticamente na lista

### 2. Registrando Vendas

1. Acesse a aba **"Vendas"**
2. Selecione um produto no dropdown
3. Informe a quantidade vendida
4. Visualize o resumo da venda
5. Clique em **"Registrar Venda"**

### 3. Gerenciando Produtos

- **Visualizar**: Todos os produtos aparecem na tabela da aba "Produtos"
- **Deletar**: Clique em "Deletar" na linha do produto desejado

## 📁 Estrutura do Projeto

\`\`\`
src/
├── components/           # Componentes React
│   ├── ProdutoForm.tsx  # Formulário de cadastro de produtos
│   ├── ProdutoList.tsx  # Lista de produtos
│   └── VendaForm.tsx    # Formulário de registro de vendas
├── services/            # Serviços de API
│   └── api.ts          # Funções para comunicação com backend
├── types/              # Definições de tipos TypeScript
│   └── index.ts        # Interfaces Produto e Venda
└── App.tsx             # Componente principal da aplicação
\`\`\`

## 🔌 API Endpoints

O frontend consome os seguintes endpoints do backend:

### Produtos
- `GET /produtos` - Lista todos os produtos
- `POST /produtos` - Cria um novo produto
- `GET /produtos/{id}` - Busca produto por ID
- `DELETE /produtos/{id}` - Deleta um produto

### Vendas
- `POST /vendas` - Registra uma nova venda

### Exemplo de Payload

**Criar Produto:**
\`\`\`json
{
  "nome": "Produto Exemplo",
  "custoUnitario": 10.50,
  "precoVenda": 15.00
}
\`\`\`

**Registrar Venda:**
\`\`\`json
{
  "produtoId": 1,
  "quantidadeVendida": 5
}
\`\`\`

## 📱 Screenshots

### Desktop
- Interface principal com navegação por abas
- Formulários responsivos e intuitivos
- Tabelas organizadas com formatação de moeda

### Mobile
- Layout adaptado para dispositivos móveis
- Formulários otimizados para toque
- Navegação simplificada

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Para contribuir:

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

### Padrões de Código

- Use **TypeScript** para type safety
- Siga as convenções do **ESLint** e **Prettier**
- Escreva **testes** para novas funcionalidades
- Documente **mudanças significativas**

## 🐛 Reportando Bugs

Encontrou um bug? Abra uma [issue](https://github.com/seu-usuario/sales-control-frontend/issues) com:

- Descrição detalhada do problema
- Passos para reproduzir
- Screenshots (se aplicável)
- Informações do ambiente (OS, browser, etc.)

## 📝 Roadmap

- [ ] Implementar autenticação de usuários
- [ ] Adicionar relatórios de vendas
- [ ] Implementar paginação na listagem
- [ ] Adicionar filtros e busca
- [ ] Criar dashboard com gráficos
- [ ] Implementar modo escuro
- [ ] Adicionar exportação de dados
- [ ] Implementar notificações push

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Desenvolvedor

Desenvolvido com ❤️ por [Seu Nome](https://github.com/seu-usuario)

### 📞 Contato

- **Email**: seu.email@exemplo.com
- **LinkedIn**: [Seu LinkedIn](https://linkedin.com/in/seu-perfil)
- **GitHub**: [Seu GitHub](https://github.com/seu-usuario)

---

⭐ **Se este projeto te ajudou, considere dar uma estrela!** ⭐
