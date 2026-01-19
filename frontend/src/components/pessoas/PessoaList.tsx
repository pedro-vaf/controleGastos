/* Componente para listar e gerenciar pessoas */
// @ts-ignore
import React, {useEffect, useState} from 'react';
import { Pessoa } from '../../types/types';
import { listarPessoas, deletarPessoa } from "../../services/pessoas.services";
import { extrairMensagemErro } from "../../services/api";

interface Props {
    onPessoaCriada?: number; /* Contador para forçar atualização quando pessoa for criada */
}

const PessoaList: React.FC<Props> = ({ onPessoaCriada }) => {
    /* Estados do componente */
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [erro, setErro] = useState<string>('');

    /* Carrega a lista de pessoas da API */
    const carregarPessoas = async () => {
        try {
            setLoading(true);
            setErro('');
            const data= await listarPessoas();
            setPessoas(data);
        } catch (error) {
            console.error('Error ao carregar pessoas:', error);
        } finally {
            setLoading(false);
        }
    }

    /* Deleta uma pessoa após confirmação do usuário */
    const handleDeletar = async (id: string, nome: string) => {
        /* Confirmação antes de deletar */
        const confirmacao = window.confirm(
            `Tem certeza que deseja deletar ${nome}? \n\n`
            + 'Atenção: todas as transações desta pessoa também serão apagadas!'
        );

        if (!confirmacao){ return; }

        try {
            await deletarPessoa(id);
            /* Atualiza a lista removendo a pessoa deletada */
            setPessoas(pessoas.filter(p => p.id !== id));
            alert(`${nome} foi deletado com sucesso!`);
        } catch (error) {
            console.error('Erro ao deletar pessoa:', error);
            alert(`Erro ao deletar pessoa: ${extrairMensagemErro(error)}`);
        }
    }

    /* useEffect para carregar pessoas quando o componente montar
        ou quando onPessoaCriada mudar */
    useEffect(() => {
        carregarPessoas();
    }, [onPessoaCriada]);

    if (loading) {
        return (
            <div className="loading">
                <p>⏳ Carregando pessoas...</p>
            </div>
        );
    }

    if (erro) {
        return (
            <div className="error-container">
                <h2>❌ Erro ao Carregar Pessoas</h2>
                <p className="error-message">{erro}</p>
                <button onClick={carregarPessoas} className="btn-retry">
                    🔄 Tentar Novamente
                </button>
            </div>
        );
    }

    return (
        <div className="pessoa-list">
            <div className="list-header">
                <h2>👥 Lista de Pessoas</h2>
                <button onClick={carregarPessoas} className="btn-refresh" title="Atualizar lista">
                    🔄 Atualizar
                </button>
            </div>

            {pessoas.length === 0 ? (
                <div className="empty-state">
                    <p>📝 Nenhuma pessoa cadastrada.</p>
                    <p className="hint">Cadastre a primeira pessoa usando o formulário acima!</p>
                </div>
            ) : (
                <>
                    <div className="table-info">
                        <span>Total de pessoas: <strong>{pessoas.length}</strong></span>
                    </div>

                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Idade</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                            {pessoas.map((pessoa) => (
                                <tr key={pessoa.id}>
                                    <td className="text-center">{pessoa.id}</td>
                                    <td>
                                        <strong>{pessoa.nome}</strong>
                                    </td>
                                    <td className="text-center">{pessoa.idade} anos</td>
                                    <td className="text-center">
                                        {pessoa.menorDeIdade ? (
                                            <span className="badge badge-warning">
                          ⚠️ Menor de Idade
                        </span>
                                        ) : (
                                            <span className="badge badge-success">
                          ✓ Maior de Idade
                        </span>
                                        )}
                                    </td>
                                    <td className="text-center">
                                        <button
                                            onClick={() => handleDeletar(pessoa.id, pessoa.nome)}
                                            className="btn-delete"
                                            title={`Deletar ${pessoa.nome}`}
                                        >
                                            🗑️ Deletar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {pessoas.some(p => p.menorDeIdade) && (
                        <div className="info-box">
                            <strong>ℹ️ Informação:</strong> Menores de idade (menos de 18 anos)
                            só podem ter transações de despesa.
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default PessoaList;