💰 Sistema de Controle de Gastos Residenciais
<div align="center">
<img width="1920" height="1080" alt="Captura de tela 2026-01-18 145755" src="https://github.com/user-attachments/assets/aab64b03-37c4-4929-bb35-b8afde440dab" />
<img width="1920" height="1080" alt="Captura de tela 2026-01-18 145826" src="https://github.com/user-attachments/assets/ded03ead-5ea5-4b10-a5cc-f5526809c3d0" />
<img width="1920" height="1080" alt="Captura de tela 2026-01-18 145859" src="https://github.com/user-attachments/assets/53083ce8-2779-42d6-804f-4626a9b46c89" />
<img width="1920" height="1080" alt="Captura de tela 2026-01-18 145907" src="https://github.com/user-attachments/assets/8759dea7-a3c3-4ff4-b3d5-b412952a2550" />
Sistema Full Stack para gerenciamento de gastos pessoais com relatórios financeiros completos
Demo • Documentação • Instalação
</div>

📋 Sobre o Projeto
Sistema web desenvolvido para controle de gastos residenciais, permitindo o gerenciamento completo de receitas e despesas com categorização, controle por pessoa e geração de relatórios financeiros detalhados.
🎯 Objetivo
Desenvolver uma aplicação Full Stack seguindo boas práticas de desenvolvimento, Clean Architecture e padrões de mercado, demonstrando domínio tanto em backend (.NET) quanto frontend (React).

✨ Funcionalidades
Obrigatórias ✅

Cadastro de Pessoas

✅ Criação com nome e idade
✅ Listagem de todas as pessoas
✅ Deleção com cascade (remove transações)
✅ Identificação automática de maior/menor de idade


Cadastro de Categorias

✅ Criação com descrição e finalidade
✅ Listagem de categorias
✅ Finalidades: Despesa, Receita ou Ambas


Cadastro de Transações

✅ Criação com validações de negócio
✅ Listagem com dados completos
✅ Validação: menor de idade só tem despesas
✅ Validação: categoria compatível com tipo


Relatório por Pessoa

✅ Totais de receitas e despesas
✅ Saldo individual (receitas - despesas)
✅ Totais gerais consolidados



Opcionais ⭐

Relatório por Categoria

⭐ Totais por categoria
⭐ Análise de distribuição financeira




🛠️ Tecnologias
Backend

.NET 9.0 - Framework principal
ASP.NET Core Web API - API RESTful
Entity Framework Core - ORM
SQLite - Banco de dados
Swagger - Documentação da API

Frontend

React 18 - Biblioteca JavaScript
TypeScript - Superset tipado
Axios - Cliente HTTP
CSS3 - Estilização

Padrões e Práticas

Clean Architecture (4 camadas)
Repository Pattern
Dependency Injection
DTOs (Data Transfer Objects)
SOLID Principles


🏗️ Arquitetura
Backend (Clean Architecture)
ControleGastos/
├── ControleGastos.Domain/        # Entidades e regras de negócio
├── ControleGastos.Infrastructure/ # Acesso a dados (EF Core)
├── ControleGastos.Application/    # Lógica de aplicação (Services)
└── ControleGastos.API/           # Controllers e endpoints
Frontend (Component-Based)
src/
├── components/    # Componentes React
├── services/      # Comunicação com API
├── types/         # Interfaces TypeScript
└── App.tsx        # Componente principal

# API disponível em: http://localhost:5058
# Swagger UI: http://localhost:5058/swagger

# Frontend disponível em: http://localhost:5173

📡 API Endpoints
Pessoas
GET    /api/pessoas           # Lista todas as pessoas
GET    /api/pessoas/{id}      # Obtém pessoa por ID
POST   /api/pessoas           # Cria nova pessoa
DELETE /api/pessoas/{id}      # Deleta pessoa
Categorias
GET    /api/categorias        # Lista todas as categorias
GET    /api/categorias/{id}   # Obtém categoria por ID
POST   /api/categorias        # Cria nova categoria
Transações
GET    /api/transacoes                # Lista todas as transações
GET    /api/transacoes/pessoa/{id}   # Lista por pessoa
POST   /api/transacoes                # Cria nova transação
Relatórios
GET    /api/relatorios/por-pessoa     # Relatório por pessoa
GET    /api/relatorios/por-categoria  # Relatório por categoria
GET    /api/relatorios/resumo         # Resumo geral

💡 Regras de Negócio
Validações Implementadas

Menor de Idade

Pessoas com menos de 18 anos só podem ter despesas
Tentativa de criar receita para menor retorna erro 400


Compatibilidade de Categoria

Categoria "Despesa" → aceita apenas despesas
Categoria "Receita" → aceita apenas receitas
Categoria "Ambas" → aceita qualquer tipo


Integridade Referencial

Deletar pessoa → deleta todas suas transações (Cascade)
Não pode deletar categoria com transações (Restrict)




🎨 Interface
Telas Principais

Pessoas: Cadastro e listagem com indicador de idade
Categorias: Gestão com badges coloridos por finalidade
Transações: Formulário inteligente com filtros dinâmicos
Relatórios: Visualização consolidada com totais

Recursos de UX

✅ Loading states em todas operações
✅ Mensagens de sucesso/erro
✅ Confirmações antes de deletar
✅ Validações em tempo real
✅ Design responsivo (mobile-first)
✅ Formatação automática de moeda


📊 Exemplos de Uso
Criar Pessoa
jsonPOST /api/pessoas
{
  "nome": "João Silva",
  "idade": 25
}
Criar Categoria
jsonPOST /api/categorias
{
  "descricao": "Alimentação",
  "finalidade": 3  // 1=Despesa, 2=Receita, 3=Ambas
}
Criar Transação
jsonPOST /api/transacoes
{
  "descricao": "Compra supermercado",
  "valor": 150.50,
  "tipo": 1,  // 1=Despesa, 2=Receita
  "categoriaId": 1,
  "pessoaId": 1
}

🧪 Testes
Cenários de Teste

Validação de Menor de Idade

Criar pessoa < 18 anos
Tentar criar receita → deve falhar
Criar despesa → deve funcionar


Validação de Categoria

Categoria "Salário" (Receita)
Tentar criar despesa → deve falhar


Deleção em Cascade

Criar pessoa com transações
Deletar pessoa
Verificar que transações foram deletadas




📚 Documentação Adicional

Swagger UI - Documentação interativa da API
Postman Collection - Coleção de requisições de exemplo


📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

👨‍💻 Autor
Pedro Vitor Aquino Ferreira

LinkedIn: Pedro Aquino
GitHub: @pedro-vaf
Email: pedro.aquino.ct@gmail.com

<div align="center">
⭐ Se este projeto te ajudou, considere dar uma estrela!
</div>
