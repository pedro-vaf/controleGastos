/* Define todas as interfaces TypeScript que correspondem aos DTOs do backend */

/* Enum para Tipo de Transação */
export enum TipoTransacao {
    Despesa = 1,
    Receita = 2
}

/* Enum para Finalidade da Categoria */
export enum FinalidadeCategoria {
    Despesa = 1,
    Receita = 2,
    Ambas = 3
}

/* **** Interfaces de pessoas **** */
/* Dados retornados pela API */
export interface Pessoa {
    id: string;
    nome: string;
    idade: number;
    menorDeIdade: boolean;
}

/* Interface para criar uma Pessoa
    Usado no formulário de cadastro */
export interface CriarPessoa {
    nome: string;
    idade: number;
}

/* **** Interfaces de categoria **** */
/* Dados retornados pela API */
export interface Categoria {
    id: string;
    descricao: string;
    finalidade: FinalidadeCategoria;
    finalidadeTexto: string;
}

/* Interface para criar uma Categoria
    Usado no formulário de cadastro */
export interface CriarCategoria {
    descricao: string;
    finalidade: FinalidadeCategoria;
}

/* **** Interface de Transação **** */
/* Dados retornados pela API */
export interface Transacao {
    id: string;
    descricao: string;
    valor: number;
    tipoTransacao: TipoTransacao;
    tipoTexto: string;
    categoriaId: string;
    categoriaNome: string;
    pessoaId: string;
    pessoaNome: string;
}

/* Interface para criar uma Transação
    Usado no formulário de cadastro */
export interface CriarTransacao {
    descricao: string;
    valor: number;
    tipoTransacao: TipoTransacao;
    categoriaId: string;
    pessoaId: string;
}

/* **** Interfaces de relatórios **** */
/* Interface para dados de uma pessoa no relatório */
export interface RelatorioPessoa {
    pessoaId: string;
    pessoaNome: string;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}

/* Interface para o relatório completo por pessoa */
export interface RelatorioGeralPessoas {
    pessoas: RelatorioPessoa[];
    totalGeralReceitas: number;
    totalGeralDespesas: number;
    saldoGeralLiquido: number;
}

/* Interface para dados de uma categoria no relatório */
export interface RelatorioCategoria {
    categoriaId: string;
    categoriaNome: string;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}

/* Interface para o relatório completo por pessoa */
export interface RelatorioGeralCategorias {
    categorias: RelatorioCategoria[];
    totalGeralReceitas: number;
    totalGeralDespesas: number;
    saldoGeralLiquido: number;
}

/* **** Interfaces de resposta de erro **** */
export interface ApiError {
    mensagem: string;
    errors? : { [key: string]: string[] };
}

/* **** Interface para respostas genéricas de sucesso **** */
export interface ApiResponse<T> {
    data: T;
    mensagem?: string;
}

/* **** Converte o enum TipoTransacao para texto **** */
export const getTipoTransacaoTexto = (tipo: TipoTransacao): string => {
    return tipo === TipoTransacao.Despesa ? 'Despesa' : 'Receita';
}

/* **** Converte o enum FinalidadeCategoria para texto **** */
export const getFinalidadeCategoriaTexto = (finalidade: FinalidadeCategoria): string => {
    switch (finalidade){
        case FinalidadeCategoria.Despesa:
            return 'Despesas';
        case FinalidadeCategoria.Receita:
            return 'Receita';
        case FinalidadeCategoria.Ambas:
            return 'Ambas';
        default:
            return 'Desconhecido';
    }
}

/* **** Formata um valor numérico como moeda brasileira **** */
export const formatarMoeda = (valor: number): string => {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
}