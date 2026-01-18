import api from "./api";
import {
    Transacao,
    CriarTransacao,
} from "../types/types";

/* **** Serviços de Transação **** */
/* Lista todas as pessoas */
export const listarTransacoes = async (): Promise<Transacao> => {
    const response = await api.get<Transacao>("/transacao");
    return response.data;
}

/* Lista transações de uma pessoa específica */
export const listarTransacoesPorPessoa = async (pessoaId: string ): Promise<Transacao[]> => {
    const response = await api.get<Transacao[]>(`/transacao/pessoa/${pessoaId}`);
    return response.data;
}

/* Cria uma transação */
export const criarTransacao = async (transacao: CriarTransacao): Promise<Transacao> => {
    const response = await api.post<Transacao>('/transacao', transacao);
    return response.data;
}