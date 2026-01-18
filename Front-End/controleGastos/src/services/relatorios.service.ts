import api from "./api";
import {
    RelatorioGeralCategorias,
    RelatorioGeralPessoas,
} from "../types/types";

/* **** Serviços de Relatório **** */
/* Obtém relatório de totais por pessoa */
export const obterRelatorioPorPessoa = async (): Promise<RelatorioGeralPessoas> => {
    const response = await api.get<RelatorioGeralPessoas>('/relatorio/por-pessoa');
    return response.data;
};

/* Obtém relatório de totais por categoria */
export const obterRelatorioPorCategoria = async (): Promise<RelatorioGeralCategorias> => {
    const response = await api.get<RelatorioGeralCategorias>('/relatorio/por-categoria');
    return response.data;
};

/* Obtém resumo geral do sistema */
export const obterResumo = async (): Promise<any> => {
    const response = await api.get('/relatorio/resumo');
    return response.data;
};