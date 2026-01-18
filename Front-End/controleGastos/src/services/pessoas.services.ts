import api from "./api";
import {
    Pessoa,
    CriarPessoa,

} from "../types/types";

/* **** Serviços de Pessoa **** */
/* Lista todas as pessoas */
export const listarPessoas = async (): Promise<Pessoa[]> => {
    const response = await  api.get<Pessoa[]>('/pessoa');
    return response.data;
}

/* Obtém uma pessoa por ID */
export const listarPessoaId = async (id: string): Promise<Pessoa> => {
    const response = await api.get<Pessoa>(`/pessoa/${id}`);
    return response.data;
}

/* Cria uma pessoa */
export const criarPessoa = async (pessoa: CriarPessoa): Promise<Pessoa> => {
    const response = await api.post<Pessoa>('/pessoa', pessoa);
    return response.data;
}

/* Deleta uma pessoa (e todas as suas transações em cascade) */
export const deletarPessoa = async (id: string): Promise<void> => {
    await api.delete(`/pessoa/${id}`);
}