/* Formulário para listar e gerenciar categoria */
// @ts-ignore
import React, { useState, useEffect } from 'react';
import {Transacao, TipoTransacao, formatarMoeda} from '../../types/types';
import { listarTransacoesPorPessoa, listarTransacoes } from '../../services/transacoes.service';
import { extrairMensagemErro } from "../../services/api";

interface Props {
    onTransacaoCriada?: number;
}

const TransacaoList: React.FC<Props> = ({ onTransacaoCriada }) => {
    /* Estados do componente */
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [erro, setErro] = useState<string>('');

    /* Carrega a lista de transações da API */
    const carregarTransacoes = async () => {
        try {
            setLoading(true);
            setErro('');
            const data = await listarTransacoes();
            // @ts-ignore
            setTransacoes(data);
        } catch (error) {
            console.error('Erro ao carregar transações:', error);
            setErro(extrairMensagemErro(error));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarTransacoes();
    }, [onTransacaoCriada]);

    if (loading) {
        return (
            <div className="loading">
                <p>⏳ Carregando transações...</p>
            </div>
        );
    }

    if (erro) {
        return (
            <div className="error-container">
                <h2>❌ Erro ao Carregar Transações</h2>
                <p className="error-message">{erro}</p>
                <button onClick={carregarTransacoes} className="btn-retry">
                    🔄 Tentar Novamente
                </button>
            </div>
        );
    }

    // Calcula estatísticas
    const totalReceitas = transacoes
        .filter(t => t.tipoTransacao === TipoTransacao.Receita)
        .reduce((sum, t) => sum + t.valor, 0);

    const totalDespesas = transacoes
        .filter(t => t.tipoTransacao === TipoTransacao.Despesa)
        .reduce((sum, t) => sum + t.valor, 0);

    const saldo = totalReceitas - totalDespesas;

    return (
        <div className="transacao-list">
            <div className="list-header">
                <h2>💸 Lista de Transações</h2>
                <button onClick={carregarTransacoes} className="btn-refresh" title="Atualizar lista">
                    🔄 Atualizar
                </button>
            </div>

            {transacoes.length === 0 ? (
                <div className="empty-state">
                    <p>📝 Nenhuma transação cadastrada.</p>
                    <p className="hint">Cadastre a primeira transação usando o formulário acima!</p>
                </div>
            ) : (
                <>
                    {/* Card de Resumo */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem',
                        marginBottom: '1.5rem'
                    }}>
                        <div style={{
                            backgroundColor: '#d1fae5',
                            padding: '1rem',
                            borderRadius: '8px',
                            borderLeft: '4px solid #10b981'
                        }}>
                            <div style={{ fontSize: '0.85rem', color: '#065f46', marginBottom: '0.25rem' }}>
                                💰 Total Receitas
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#065f46' }}>
                                {formatarMoeda(totalReceitas)}
                            </div>
                        </div>

                        <div style={{
                            backgroundColor: '#fee2e2',
                            padding: '1rem',
                            borderRadius: '8px',
                            borderLeft: '4px solid #ef4444'
                        }}>
                            <div style={{ fontSize: '0.85rem', color: '#991b1b', marginBottom: '0.25rem' }}>
                                💸 Total Despesas
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#991b1b' }}>
                                {formatarMoeda(totalDespesas)}
                            </div>
                        </div>

                        <div style={{
                            backgroundColor: saldo >= 0 ? '#dbeafe' : '#fee2e2',
                            padding: '1rem',
                            borderRadius: '8px',
                            borderLeft: `4px solid ${saldo >= 0 ? '#3b82f6' : '#ef4444'}`
                        }}>
                            <div style={{
                                fontSize: '0.85rem',
                                color: saldo >= 0 ? '#1e40af' : '#991b1b',
                                marginBottom: '0.25rem'
                            }}>
                                📊 Saldo
                            </div>
                            <div style={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: saldo >= 0 ? '#1e40af' : '#991b1b'
                            }}>
                                {formatarMoeda(saldo)}
                            </div>
                        </div>
                    </div>

                    <div className="table-info">
                        <span>Total de transações: <strong>{transacoes.length}</strong></span>
                        <span style={{ marginLeft: '1.5rem' }}>
              💰 Receitas: <strong>{transacoes.filter(t => t.tipoTransacao === TipoTransacao.Receita).length}</strong>
            </span>
                        <span style={{ marginLeft: '1.5rem' }}>
              💸 Despesas: <strong>{transacoes.filter(t => t.tipoTransacao === TipoTransacao.Despesa).length}</strong>
            </span>
                    </div>

                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                            <tr>
                                <th style={{ width: '60px' }}>ID</th>
                                <th>Descrição</th>
                                <th style={{ width: '100px' }}>Tipo</th>
                                <th style={{ width: '130px', textAlign: 'right' }}>Valor</th>
                                <th style={{ width: '150px' }}>Pessoa</th>
                                <th style={{ width: '150px' }}>Categoria</th>
                            </tr>
                            </thead>
                            <tbody>
                            {transacoes.map((transacao) => (
                                <tr key={transacao.id}>
                                    <td className="text-center">
                                        <strong>#{transacao.id}</strong>
                                    </td>
                                    <td>
                                        <strong>{transacao.descricao}</strong>
                                    </td>
                                    <td className="text-center">
                      <span style={{
                          backgroundColor: transacao.tipoTransacao === TipoTransacao.Despesa ? '#fee2e2' : '#d1fae5',
                          color: transacao.tipoTransacao === TipoTransacao.Despesa ? '#991b1b' : '#065f46',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: 'bold',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                      }}>
                        <span>{transacao.tipoTransacao === TipoTransacao.Despesa ? '💸' : '💰'}</span>
                        <span>{transacao.tipoTexto}</span>
                      </span>
                                    </td>
                                    <td style={{
                                        textAlign: 'right',
                                        color: transacao.tipoTransacao === TipoTransacao.Despesa ? '#dc2626' : '#16a34a',
                                        fontWeight: 'bold',
                                        fontSize: '1.05rem'
                                    }}>
                                        {formatarMoeda(transacao.valor)}
                                    </td>
                                    <td>
                                        <span style={{ color: '#64748b' }}>{transacao.pessoaNome}</span>
                                    </td>
                                    <td>
                      <span style={{
                          backgroundColor: '#f1f5f9',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '4px',
                          fontSize: '0.9rem'
                      }}>
                        {transacao.categoriaNome}
                      </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{
                        marginTop: '1.5rem',
                        padding: '1rem',
                        backgroundColor: saldo >= 0 ? '#d1fae5' : '#fee2e2',
                        borderRadius: '8px',
                        borderLeft: `4px solid ${saldo >= 0 ? '#10b981' : '#ef4444'}`
                    }}>
                        <strong>
                            {saldo >= 0 ? '✅' : '⚠️'}
                            {saldo >= 0
                                ? ' Situação positiva! Suas receitas superam suas despesas.'
                                : ' Atenção! Suas despesas superam suas receitas.'}
                        </strong>
                    </div>
                </>
            )}
        </div>
    );
};

export default TransacaoList;