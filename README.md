💰 Sistema de Controle de Gastos Residenciais
<div align="center">
<img width="1920" height="1080" alt="Captura de tela 2026-01-18 145755" src="https://github.com/user-attachments/assets/aab64b03-37c4-4929-bb35-b8afde440dab" />
<img width="1920" height="1080" alt="Captura de tela 2026-01-18 145826" src="https://github.com/user-attachments/assets/ded03ead-5ea5-4b10-a5cc-f5526809c3d0" />
<img width="1920" height="1080" alt="Captura de tela 2026-01-18 145859" src="https://github.com/user-attachments/assets/53083ce8-2779-42d6-804f-4626a9b46c89" />
<img width="1920" height="1080" alt="Captura de tela 2026-01-18 145907" src="https://github.com/user-attachments/assets/8759dea7-a3c3-4ff4-b3d5-b412952a2550" />
Sistema Full Stack para gerenciamento de gastos pessoais com relatórios financeiros completos
Demo • Documentação • Instalação
</div>
# 💰 Controle de Gastos Residenciais (Full Stack)

Sistema web para **controle de gastos residenciais**, permitindo o gerenciamento completo de **receitas e despesas**, com **categorização**, **controle por pessoa** e **relatórios financeiros detalhados**.

---

## 🎯 Objetivo

Desenvolver uma aplicação **Full Stack** seguindo **boas práticas**, **Clean Architecture** e padrões de mercado, demonstrando domínio em:

- **Backend:** .NET / ASP.NET Core Web API  
- **Frontend:** React + TypeScript  

---

## ✨ Funcionalidades

### ✅ Obrigatórias

#### 👤 Cadastro de Pessoas
- Criação com nome e idade  
- Listagem de todas as pessoas  
- Deleção com **cascade** (remove transações associadas)  
- Identificação automática de **maior/menor de idade**  

#### 🏷️ Cadastro de Categorias
- Criação com descrição e finalidade  
- Listagem de categorias  
- Finalidades disponíveis:
  - Despesa  
  - Receita  
  - Ambas  

#### 💳 Cadastro de Transações
- Criação com validações de negócio  
- Listagem com dados completos  
- Menor de idade só pode ter **despesas**  
- Categoria deve ser compatível com o tipo da transação  

#### 📈 Relatório por Pessoa
- Totais de receitas e despesas  
- Saldo individual (**receitas − despesas**)  
- Totais gerais consolidados  

---

### ⭐ Opcionais

#### 📊 Relatório por Categoria
- Totais por categoria  
- Análise de distribuição financeira  

---

## 🛠️ Tecnologias

### Backend
- .NET 9.0  
- ASP.NET Core Web API  
- Entity Framework Core  
- SQLite  
- Swagger  

### Frontend
- React 18  
- TypeScript  
- Axios  
- CSS3  

### Padrões e Boas Práticas
- Clean Architecture (4 camadas)  
- Repository Pattern  
- Dependency Injection  
- DTOs  
- SOLID  

---

## 🏗️ Arquitetura

### Backend (Clean Architecture)
```text
ControleGastos/
├── ControleGastos.Domain/          # Entidades e regras de negócio
├── ControleGastos.Infrastructure/ # Acesso a dados (EF Core)
├── ControleGastos.Application/    # Lógica de aplicação (Services)
└── ControleGastos.API/            # Controllers e endpoints
Frontend (Component-Based)
text
Copiar código
src/
├── components/   # Componentes React
├── services/     # Comunicação com API
├── types/        # Interfaces TypeScript
└── App.tsx       # Componente principal
▶️ Como Executar o Projeto
Este projeto utiliza Concurrently, permitindo executar backend e frontend juntos com um único comando.

Pré-requisitos
Node.js

.NET SDK 9.0

Passos
Clone o repositório:

bash
Copiar código
git clone https://github.com/pedro-vaf/controleGastos.git
Acesse a pasta do projeto:

bash
Copiar código
cd controleGastos
Execute o projeto na raiz:

bash
Copiar código
npm run dev
✅ O backend e o frontend serão iniciados automaticamente.

🌐 Acessos
API: http://localhost:5058

Swagger UI: http://localhost:5058/swagger

Frontend: http://localhost:5173

📡 Endpoints da API
Pessoas
GET /api/pessoas — Lista todas as pessoas

GET /api/pessoas/{id} — Obtém pessoa por ID

POST /api/pessoas — Cria nova pessoa

DELETE /api/pessoas/{id} — Deleta pessoa

Categorias
GET /api/categorias — Lista todas as categorias

GET /api/categorias/{id} — Obtém categoria por ID

POST /api/categorias — Cria nova categoria

Transações
GET /api/transacoes — Lista todas as transações

GET /api/transacoes/pessoa/{id} — Lista transações por pessoa

POST /api/transacoes — Cria nova transação

Relatórios
GET /api/relatorios/por-pessoa — Relatório por pessoa

GET /api/relatorios/por-categoria — Relatório por categoria

GET /api/relatorios/resumo — Resumo geral

💡 Regras de Negócio
👶 Menor de Idade
Pessoas com menos de 18 anos só podem ter despesas

Tentativa de criar receita retorna erro 400

✅ Compatibilidade de Categoria
Categoria Despesa → aceita apenas despesas

Categoria Receita → aceita apenas receitas

Categoria Ambas → aceita qualquer tipo

🔗 Integridade Referencial
Deletar pessoa remove todas as suas transações (Cascade)

Categoria com transações não pode ser removida (Restrict)

🎨 Interface
Telas Principais
Pessoas: cadastro e listagem com indicador de idade

Categorias: gestão com badges por finalidade

Transações: formulário inteligente com filtros dinâmicos

Relatórios: visualização consolidada com totais

UX
Loading states

Mensagens de sucesso e erro

Confirmações antes de deletar

Validações em tempo real

Design responsivo (mobile-first)

Formatação automática de moeda

📊 Exemplos de Uso
Criar Pessoa
json
Copiar código
POST /api/pessoas
{
  "nome": "João Silva",
  "idade": 25
}
Criar Categoria
json
Copiar código
POST /api/categorias
{
  "descricao": "Alimentação",
  "finalidade": 3
}
Finalidade: 1 = Despesa, 2 = Receita, 3 = Ambas

Criar Transação
json
Copiar código
POST /api/transacoes
{
  "descricao": "Compra supermercado",
  "valor": 150.50,
  "tipo": 1,
  "categoriaId": 1,
  "pessoaId": 1
}
Tipo: 1 = Despesa, 2 = Receita

🧪 Testes
Menor de idade tentando criar receita → falha

Categoria de receita tentando despesa → falha

Deletar pessoa remove transações automaticamente

📝 Licença
Este projeto está sob a licença MIT. Consulte o arquivo LICENSE.

👨‍💻 Autor
Pedro Vitor Aquino Ferreira

GitHub: @pedro-vaf

Email: pedro.aquino.ct@gmail.com

LinkedIn: Pedro Aquino

<div align="center">
⭐ Se este projeto te ajudou, considere dar uma estrela!

</div> ```
