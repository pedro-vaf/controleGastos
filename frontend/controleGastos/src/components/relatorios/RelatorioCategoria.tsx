/* Relatório de totais por categoria */
import React, { useState, useEffect } from 'react';
import { formatarMoeda, RelatorioGeralCategorias} from '../../types/types';
import { obterRelatorioPorCategoria } from "../../services/relatorios.service";
import { extrairMensagemErro } from '../../services/api';

const RelatorioCategorias: React.FC = () => {
    const [relatorio, setRelatorio] = useState<RelatorioGeralCategorias | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [erro, setErro] = useState<string>('');

    const carregarRelatorio = async () => {
        try {
            setLoading(true);
            setErro('');
            const data = await obterRelatorioPorCategoria();
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
                <p>⏳ Gerando relatório por categoria...</p>
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

    /* Ordena categorias por maior volume (receitas + despesas) */
    const categoriasOrdenadas = [...relatorio.categorias].sort((a, b) => {
        const totalA = Math.abs(a.totalReceitas) + Math.abs(a.totalDespesas);
        const totalB = Math.abs(b.totalReceitas) + Math.abs(b.totalDespesas);
        return totalB - totalA;
    });

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <div>
                    <h2 style={{ color: '#1e293b', fontSize: '1.75rem', margin: 0 }}>
                        📦 Relatório de Totais por Categoria
                    </h2>
                    <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
                        Funcionalidade opcional - Análise de gastos por categoria
                    </p>
                </div>
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
                    🔄 Atualizar
                </button>
            </div>

            {relatorio.categorias.length === 0 ? (
                <div className="empty-state">
                    <p>📝 Nenhuma categoria com transações encontrada.</p>
                </div>
            ) : (
                <>
                    {/* Tabela de categorias */}
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
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                color: 'white'
                            }}>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>
                                    📦 Categoria
                                </th>
                                <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                                    💰 Receitas
                                </th>
                                <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                                    💸 Despesas
                                </th>
                                <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                                    📊 Saldo
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {categoriasOrdenadas.map((categoria, index) => {
                                const temMovimentacao = categoria.totalReceitas > 0 || categoria.totalDespesas > 0;

                                return (
                                    <tr
                                        key={categoria.categoriaId}
                                        style={{
                                            borderBottom: index < categoriasOrdenadas.length - 1 ? '1px solid #e2e8f0' : 'none',
                                            opacity: temMovimentacao ? 1 : 0.5
                                        }}
                                    >
                                        <td style={{ padding: '1rem' }}>
                                            <strong style={{ fontSize: '1.05rem', color: '#1e293b' }}>
                                                {categoria.categoriaNome}
                                            </strong>
                                            {!temMovimentacao && (
                                                <span style={{
                                                    marginLeft: '0.5rem',
                                                    fontSize: '0.85rem',
                                                    color: '#94a3b8'
                                                }}>
                            (sem transações)
                          </span>
                                            )}
                                        </td>
                                        <td style={{
                                            padding: '1rem',
                                            textAlign: 'right',
                                            color: categoria.totalReceitas > 0 ? '#16a34a' : '#94a3b8',
                                            fontWeight: '600',
                                            fontSize: '1.05rem'
                                        }}>
                                            {formatarMoeda(categoria.totalReceitas)}
                                        </td>
                                        <td style={{
                                            padding: '1rem',
                                            textAlign: 'right',
                                            color: categoria.totalDespesas > 0 ? '#dc2626' : '#94a3b8',
                                            fontWeight: '600',
                                            fontSize: '1.05rem'
                                        }}>
                                            {formatarMoeda(categoria.totalDespesas)}
                                        </td>
                                        <td style={{
                                            padding: '1rem',
                                            textAlign: 'right',
                                            color: categoria.saldo >= 0 ? '#16a34a' : '#dc2626',
                                            fontWeight: 'bold',
                                            fontSize: '1.1rem'
                                        }}>
                                            {formatarMoeda(categoria.saldo)}
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>

                    {/* Card de totais gerais */}
                    <div style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        padding: '2rem',
                        borderRadius: '12px',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                    }}>
                        <h3 style={{
                            marginTop: 0,
                            marginBottom: '1.5rem',
                            fontSize: '1.5rem',
                            fontWeight: '600'
                        }}>
                            📈 Totais Gerais por Categoria
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
                                <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', opacity: 0.9 }}>
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
                                <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', opacity: 0.9 }}>
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
                                <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', opacity: 0.9 }}>
                                    📊 Saldo Líquido
                                </div>
                                <div style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                                    {formatarMoeda(relatorio.saldoGeralLiquido)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dica */}
                    <div style={{
                        marginTop: '2rem',
                        padding: '1.5rem',
                        backgroundColor: '#dbeafe',
                        borderRadius: '8px',
                        borderLeft: '4px solid #3b82f6'
                    }}>
                        <p style={{ margin: 0, color: '#1e40af', fontSize: '1.05rem', lineHeight: '1.6' }}>
                            <strong>💡 Análise:</strong> Este relatório mostra como seu dinheiro está distribuído
                            entre as diferentes categorias. Categorias com saldo negativo indicam onde você está
                            gastando mais do que recebendo. Use essas informações para planejar melhor seu orçamento!
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default RelatorioCategorias;