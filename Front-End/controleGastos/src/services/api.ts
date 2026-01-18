/* Serviço centralizado para comunicação com a API backend */
import axios, { AxiosError } from 'axios';
import {
    ApiError
} from "../types/types.js";

/* URL base da API */
const ApiBaseUrl = 'http://localhost:5058/api';

/* Cria uma instância do axios com configuração padrão */
const api = axios.create({
    baseURL: ApiBaseUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 60000
})

/* Extrai mensagem de erro amigável de uma exceção da API */
export const extrairMensagemErro = (error: any): string => {
    if (axios.isAxiosError(error)) {
        const apiError = error.response?.data as ApiError;

        /* Se tem mensagem de erro específica da API */
        if (apiError?.mensagem) {
            return apiError.mensagem;
        }

        /* Se tem erros de validação */
        if (apiError?.errors) {
            const primeiroErro = Object.values(apiError.errors)[0];
            return Array.isArray(primeiroErro) ? primeiroErro[0] : String(primeiroErro);
        }

        /* Erros HTTP genéricos */
        if (error.response?.status === 404) {
            return 'Recurso não encontrado';
        }
        if (error.response?.status === 500) {
            return 'Erro interno do servidor';
        }
        if (error.code === 'ERR_NETWORK') {
            return 'Não foi possível conectar ao servidor. Verifique se a API está rodando.';
        }
    }
    return 'Erro desconhecido ao processar requisição';
};

export default api;