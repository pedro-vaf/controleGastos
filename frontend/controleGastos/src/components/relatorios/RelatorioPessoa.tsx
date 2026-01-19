/* Relatório de totais por pessoa */
import React, { useState, useEffect } from 'react';
import { RelatorioGeralPessoas, formatarMoeda } from '../../types/types';
import { obterRelatorioPorPessoa } from "../../services/relatorios.service";
import { extrairMensagemErro } from '../../services/api';

const RelatorioPessoas: React.FC = () => {
    const [relatorio, setRelatorio] = useState<RelatorioGeralPessoas | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [erro, setErro] = useState<string>('');

    /* Carrega o relatório da API */
    const carregarRelatorio = async () => {
        try {
            setLoading(true);
            setErro('');
            const data = await obterRelatorioPorPessoa();
            setRelatorio(data);
        } catch (error) {
            console.error('Erro ao carregar relatório:', error);
            setErro(extrairMensagemErro(error));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarRelatorio();
    }, []);

    if (loading) {
        return (
            <div className="loading">
                <p>⏳ Gerando relatório...</p>
            </div>
        );
    }

    if (erro) {
        return (
            <div className="error-container">
                <h2>❌ Erro ao Gerar Relatório</h2>
                <p className="error-message">{erro}</p>
                <button onClick={carregarRelatorio} className="btn-retry">
                    🔄 Tentar Novamente
                </button>
            </div>
        );
    }

    if (!relatorio) {
        return <div>Nenhum dado disponível</div>;
    }

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <h2 style={{ color: '#1e293b', fontSize: '1.75rem', margin: 0 }}>
                    📊 Relatório de Totais por Pessoa
                </h2>
                <button
                    onClick={carregarRelatorio}
                    style={{
                        backgroundColor: '#667eea',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.25rem',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '0.95rem'
                    }}
                >
                    🔄 Atualizar Relatório
                </button>
            </div>

            {relatorio.pessoas.length === 0 ? (
                <div className="empty-state">
                    <p>📝 Nenhuma pessoa com transações encontrada.</p>
                    <p className="hint">Cadastre pessoas e transações para gerar relatórios!</p>
                </div>
            ) : (
                <>
                    {/* Tabela de pessoas */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        marginBottom: '2rem'
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                            <tr style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white'
                            }}>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>
                                    👤 Pessoa
                                </th>
                                <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                                    💰 Total Receitas
                                </th>
                                <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                                    💸 Total Despesas
                                </th>
                                <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                                    📊 Saldo
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {relatorio.pessoas.map((pessoa, index) => (
                                <tr key={pessoa.pessoaId} style={{
                                    borderBottom: index < relatorio.pessoas.length - 1 ? '1px solid #e2e8f0' : 'none'
                                }}>
                                    <td style={{ padding: '1rem' }}>
                                        <strong style={{ fontSize: '1.05rem', color: '#1e293b' }}>
                                            {pessoa.pessoaNome}
                                        </strong>
                                    </td>
                                    <td style={{
                                        padding: '1rem',
                                        textAlign: 'right',
                                        color: '#16a34a',
                                        fontWeight: '600',
                                        fontSize: '1.05rem'
                                    }}>
                                        {formatarMoeda(pessoa.totalReceitas)}
                                    </td>
                                    <td style={{
                                        padding: '1rem',
                                        textAlign: 'right',
                                        color: '#dc2626',
                                        fontWeight: '600',
                                        fontSize: '1.05rem'
                                    }}>
                                        {formatarMoeda(pessoa.totalDespesas)}
                                    </td>
                                    <td style={{
                                        padding: '1rem',
                                        textAlign: 'right',
                                        color: pessoa.saldo >= 0 ? '#16a34a' : '#dc2626',
                                        fontWeight: 'bold',
                                        fontSize: '1.1rem'
                                    }}>
                                        {formatarMoeda(pessoa.saldo)}
                                        {pessoa.saldo >= 0 ? ' ✅' : ' ⚠️'}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Card de totais gerais */}
                    <div style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        padding: '2rem',
                        borderRadius: '12px',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                    }}>
                        <h3 style={{
                            marginTop: 0,
                            marginBottom: '1.5rem',
                            fontSize: '1.5rem',
                            fontWeight: '600'
                        }}>
                            📈 Totais Gerais do Sistema
                        </h3>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1.25rem'
                        }}>
                            <div style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                padding: '1.25rem',
                                borderRadius: '8px',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <div style={{
                                    fontSize: '0.9rem',
                                    marginBottom: '0.5rem',
                                    opacity: 0.9
                                }}>
                                    💰 Total de Receitas
                                </div>
                                <div style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                                    {formatarMoeda(relatorio.totalGeralReceitas)}
                                </div>
                            </div>

                            <div style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                padding: '1.25rem',
                                borderRadius: '8px',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <div style={{
                                    fontSize: '0.9rem',
                                    marginBottom: '0.5rem',
                                    opacity: 0.9
                                }}>
                                    💸 Total de Despesas
                                </div>
                                <div style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                                    {formatarMoeda(relatorio.totalGeralDespesas)}
                                </div>
                            </div>

                            <div style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                padding: '1.25rem',
                                borderRadius: '8px',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <div style={{
                                    fontSize: '0.9rem',
                                    marginBottom: '0.5rem',
                                    opacity: 0.9
                                }}>
                                    📊 Saldo Líquido Geral
                                </div>
                                <div style={{
                                    fontSize: '1.75rem',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    {formatarMoeda(relatorio.saldoGeralLiquido)}
                                    <span style={{ fontSize: '1.5rem' }}>
                    {relatorio.saldoGeralLiquido >= 0 ? '✅' : '⚠️'}
                  </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Resumo textual */}
                    <div style={{
                        marginTop: '2rem',
                        padding: '1.5rem',
                        backgroundColor: relatorio.saldoGeralLiquido >= 0 ? '#d1fae5' : '#fee2e2',
                        borderRadius: '8px',
                        borderLeft: `4px solid ${relatorio.saldoGeralLiquido >= 0 ? '#10b981' : '#ef4444'}`
                    }}>
                        <p style={{
                            margin: 0,
                            color: relatorio.saldoGeralLiquido >= 0 ? '#065f46' : '#991b1b',
                            fontSize: '1.05rem',
                            lineHeight: '1.6'
                        }}>
                            <strong>📋 Resumo:</strong> O sistema possui <strong>{relatorio.pessoas.length}</strong> pessoa(s)
                            com transações registradas.{' '}
                            {relatorio.saldoGeralLiquido >= 0
                                ? 'O saldo geral é positivo! Suas receitas superam suas despesas. Continue assim! 💰🎉'
                                : 'Atenção: o saldo geral está negativo. Suas despesas superam suas receitas. Revise seus gastos! ⚠️💡'}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default RelatorioPessoas;