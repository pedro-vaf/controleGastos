<div align="center">
<img width="1920" height="1080" alt="Captura de tela 2026-01-18 145755" src="https://github.com/user-attachments/assets/aab64b03-37c4-4929-bb35-b8afde440dab" />
<img width="1920" height="1080" alt="Captura de tela 2026-01-18 145826" src="https://github.com/user-attachments/assets/ded03ead-5ea5-4b10-a5cc-f5526809c3d0" />
<img width="1920" height="1080" alt="Captura de tela 2026-01-18 145859" src="https://github.com/user-attachments/assets/53083ce8-2779-42d6-804f-4626a9b46c89" />
<img width="1920" height="1080" alt="Captura de tela 2026-01-18 145907" src="https://github.com/user-attachments/assets/8759dea7-a3c3-4ff4-b3d5-b412952a2550" />
Sistema Full Stack para gerenciamento de gastos pessoais com relatórios financeiros completos
Demo • Documentação • Instalação
</div>

## 💰 Controle de Gastos Residenciais (Full Stack)

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
│   ├── Entities/
│   ├── Enums/
│   └── Interfaces/
│
├── ControleGastos.Application/     # Casos de uso e serviços
│   ├── DTOs/
│   ├── Services/
│
├── ControleGastos.Infrastructure/  # Persistência e repositórios
│   ├── Data/
│       ├── AppDbContext.cs
│       └── Repositories/
│
└── ControleGastos.API/             # Camada de apresentação
│   ├── Controllers/
│   ├── Program.cs
│   └── appsettings.json
└── ControleGastos.Migrations/
│
│
└── ControleGastos.Data/
    └── controleGastos.db
```

### Frontend 
```text
src/
├── components/     # Componentes reutilizáveis
├── services/       # Comunicação com a API (Axios)
├── types/          # Tipagens TypeScript
└── App.tsx
```

### Como Executar o Projeto (Concurrently)
- Clone o repositório:
```text
git clone https://github.com/pedro-vaf/controleGastos.git
```
- Acesse a pasta do projeto:
```text
cd controleGastos
```
- Rode na raiz:
```text
npm run dev
```
✅ Pronto: o backend e o frontend iniciam em conjunto.

👨‍💻 Autor
Pedro Vitor Aquino Ferreira

GitHub: @pedro-vaf

Email: pedro.aquino.ct@gmail.com

LinkedIn: Pedro Aquino
