/* Formulário para listar e gerenciar categoria */
// @ts-ignore
import React, { useState, useEffect } from 'react';
import { Categoria, FinalidadeCategoria } from '../../types/types';
import { listarCategorias } from '../../services/categorias.service';
import { extrairMensagemErro } from "../../services/api";

interface Props {
    onCategoriaCriada?: number;
}

const CategoriaList: React.FC<Props> = ({ onCategoriaCriada }) => {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [erro, setErro] = useState<string>('');

    /* Carrega a lista de categorias da API */
    const carregarCategorias = async () => {
        try {
            setLoading(true);
            setErro('');
            const data = await listarCategorias();
            setCategorias(data);
        } catch (error) {
            console.error('Erro ao carregar categorias:', error);
            setErro(extrairMensagemErro(error));
        } finally {
            setLoading(false);
        }
    };

    /* Retorna badge colorido baseado na finalidade */
    const getBadgeFinalidade = (finalidade: FinalidadeCategoria, texto: string) => {
        const estilos = {
            [FinalidadeCategoria.Despesa]: { bg: '#fee2e2', color: '#991b1b', icon: '💸' },
            [FinalidadeCategoria.Receita]: { bg: '#d1fae5', color: '#065f46', icon: '💰' },
            [FinalidadeCategoria.Ambas]: { bg: '#dbeafe', color: '#1e40af', icon: '🔄' }
        };

        const estilo = estilos[finalidade];

        return (
            <span style={{
                backgroundColor: estilo.bg,
                color: estilo.color,
                padding: '0.4rem 0.8rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem'
            }}>
        <span>{estilo.icon}</span>
        <span>{texto}</span>
      </span>
        );
    };

    useEffect(() => {
        carregarCategorias();
    }, [onCategoriaCriada]);

    if (loading) {
        return (
            <div className="loading">
                <p>⏳ Carregando categorias...</p>
            </div>
        );
    }

    if (erro) {
        return (
            <div className="error-container">
                <h2>❌ Erro ao Carregar Categorias</h2>
                <p className="error-message">{erro}</p>
                <button onClick={carregarCategorias} className="btn-retry">
                    🔄 Tentar Novamente
                </button>
            </div>
        );
    }

    /* Agrupa categorias por finalidade para estatísticas */
    const estatisticas = {
        despesa: categorias.filter(c => c.finalidade === FinalidadeCategoria.Despesa).length,
        receita: categorias.filter(c => c.finalidade === FinalidadeCategoria.Receita).length,
        ambas: categorias.filter(c => c.finalidade === FinalidadeCategoria.Ambas).length
    };

    return (
        <div className="categoria-list">
            <div className="list-header">
                <h2>📦 Lista de Categorias</h2>
                <button onClick={carregarCategorias} className="btn-refresh" title="Atualizar lista">
                    🔄 Atualizar
                </button>
            </div>

            {categorias.length === 0 ? (
                <div className="empty-state">
                    <p>📝 Nenhuma categoria cadastrada.</p>
                    <p className="hint">Cadastre a primeira categoria usando o formulário acima!</p>
                </div>
            ) : (
                <>
                    <div className="table-info" style={{
                        display: 'flex',
                        gap: '1.5rem',
                        flexWrap: 'wrap',
                        marginBottom: '1rem'
                    }}>
                        <span>Total: <strong>{categorias.length}</strong> categoria(s)</span>
                        <span>💸 Despesas: <strong>{estatisticas.despesa}</strong></span>
                        <span>💰 Receitas: <strong>{estatisticas.receita}</strong></span>
                        <span>🔄 Ambas: <strong>{estatisticas.ambas}</strong></span>
                    </div>

                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                            <tr>
                                <th style={{ width: '80px' }}>ID</th>
                                <th>Descrição</th>
                                <th style={{ width: '200px', textAlign: 'center' }}>Finalidade</th>
                            </tr>
                            </thead>
                            <tbody>
                            {categorias.map((categoria) => (
                                <tr key={categoria.id}>
                                    <td className="text-center">
                                        <strong>#{categoria.id}</strong>
                                    </td>
                                    <td>
                                        <strong style={{ fontSize: '1.05rem' }}>{categoria.descricao}</strong>
                                    </td>
                                    <td className="text-center">
                                        {getBadgeFinalidade(categoria.finalidade, categoria.finalidadeTexto)}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="info-box" style={{ marginTop: '1.5rem' }}>
                        <strong>ℹ️ Informação:</strong> Categorias não podem ser deletadas se houver
                        transações associadas a elas. A finalidade da categoria determina quais tipos
                        de transações podem ser criadas com ela.
                    </div>
                </>
            )}
        </div>
    );
};

export default CategoriaList;