import api from "./api";
import {
    Categoria,
    CriarCategoria,

} from "../types/types";

/* **** Serviços de Categoria **** */
/* Lista todas as categorias */
export const listarCategorias = async (): Promise<Categoria[]> => {
    const response = await api.get<Categoria[]>('/categoria');
    return response.data;
}

/* Obtém uma categoria por ID */
export const obterCategoriaId = async (id: string): Promise<Categoria> => {
    const response = await api.get<Categoria>(`/categoria/${id}`);
    return response.data;
}

/* Cria uma categoria */
export const criarCategoria = async (categoria: CriarCategoria): Promise<Categoria> => {
    const response = await api.post<Categoria>('/categoria', categoria);
    return response.data;
}