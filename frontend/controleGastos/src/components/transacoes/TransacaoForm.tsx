/* Formulário para criar transação */
// @ts-ignore
import React, {useEffect, useState} from "react";
import { Categoria, CriarTransacao, Pessoa, TipoTransacao } from "../../types/types";
import { criarTransacao } from "../../services/transacoes.service";
import { extrairMensagemErro } from "../../services/api";
import {listarPessoas} from "../../services/pessoas.services";
import {listarCategorias} from "../../services/categorias.service";

interface Props {
    onTransacaoCriada: () => void;
}

const TransacaoForm: React.FC<Props> = ({ onTransacaoCriada }) => {
    // Estados do formulário
    const [descricao, setDescricao] = useState<string>('');
    const [valor, setValor] = useState<string>('');
    const [tipo, setTipo] = useState<TipoTransacao>(TipoTransacao.Despesa);
    const [pessoaId, setPessoaId] = useState<string>('');
    const [categoriaId, setCategoriaId] = useState<string>('');

    // Dados para os selects
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    // Estados de controle
    const [mensagem, setMensagem] = useState<string>('');
    const [erro, setErro] = useState<string>('');
    const [enviando, setEnviando] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    /**
     * Carrega pessoas e categorias ao montar o componente
     */
    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            setLoading(true);
            const [pessoasData, categoriasData] = await Promise.all([
                listarPessoas(),
                listarCategorias()
            ]);
            setPessoas(pessoasData);
            setCategorias(categoriasData);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            setErro('Erro ao carregar pessoas e categorias. ' + extrairMensagemErro(error));
        } finally {
            setLoading(false);
        }
    };

    /**
     * Limpa o formulário
     */
    const limparFormulario = () => {
        setDescricao('');
        setValor('');
        setTipo(TipoTransacao.Despesa);
        setPessoaId('');
        setCategoriaId('');
        setErro('');
        setMensagem('');
    };

    /**
     * Manipula o envio do formulário
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validações
        if (!descricao.trim()) {
            setErro('Descrição é obrigatória');
            return;
        }

        const valorNum = parseFloat(valor);
        if (isNaN(valorNum) || valorNum <= 0) {
            setErro('Valor deve ser um número positivo');
            return;
        }

        if (!pessoaId) {
            setErro('Selecione uma pessoa');
            return;
        }

        if (!categoriaId) {
            setErro('Selecione uma categoria');
            return;
        }

        try {
            setEnviando(true);
            setErro('');
            setMensagem('');

            const novaTransacao: CriarTransacao = {
                descricao: descricao.trim(),
                valor: valorNum,
                tipoTransacao: tipo,
                categoriaId: categoriaId,
                pessoaId: pessoaId
            };

            const transacaoCriada = await criarTransacao(novaTransacao);

            const tipoTexto = tipo === TipoTransacao.Despesa ? 'Despesa' : 'Receita';
            setMensagem(`✓ ${tipoTexto} de R$ ${valorNum.toFixed(2)} cadastrada com sucesso!`);
            limparFormulario();
            onTransacaoCriada();

            setTimeout(() => setMensagem(''), 3000);
        } catch (error: any) {
            console.error('Erro ao criar transação:', error);
            setErro(extrairMensagemErro(error));
        } finally {
            setEnviando(false);
        }
    };

    // Filtra categorias compatíveis com o tipo selecionado
    const categoriasCompativeis = categorias.filter(cat => {
        if (tipo === TipoTransacao.Despesa) {
            return cat.finalidade === 1 || cat.finalidade === 3; // Despesa ou Ambas
        } else {
            return cat.finalidade === 2 || cat.finalidade === 3; // Receita ou Ambas
        }
    });

    if (loading) {
        return (
            <div className="form-container">
                <p>⏳ Carregando dados...</p>
            </div>
        );
    }

    return (
        <div className="form-container">
            <h2>➕ Cadastrar Nova Transação</h2>

            {mensagem && (
                <div className="alert alert-success">
                    {mensagem}
                </div>
            )}

            {erro && (
                <div className="alert alert-error">
                    {erro}
                </div>
            )}

            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="tipo">
                        Tipo de Transação: <span className="required">*</span>
                    </label>
                    <select
                        id="tipo"
                        value={tipo}
                        onChange={(e) => {
                            setTipo(Number(e.target.value) as TipoTransacao);
                            setCategoriaId(''); // Reseta categoria ao mudar tipo
                        }}
                        disabled={enviando}
                        required
                        className="form-select"
                    >
                        <option value={TipoTransacao.Despesa}>💸 Despesa (saída de dinheiro)</option>
                        <option value={TipoTransacao.Receita}>💰 Receita (entrada de dinheiro)</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="pessoa">
                        Pessoa: <span className="required">*</span>
                    </label>
                    <select
                        id="pessoa"
                        value={pessoaId}
                        onChange={(e) => setPessoaId(e.target.value)}
                        disabled={enviando || pessoas.length === 0}
                        required
                        className="form-select"
                    >
                        <option value="">Selecione uma pessoa</option>
                        {pessoas.map(p => (
                            <option key={p.id} value={p.id}>
                                {p.nome} - {p.idade} anos {p.menorDeIdade ? '⚠️ (Menor)' : ''}
                            </option>
                        ))}
                    </select>
                    {pessoas.length === 0 && (
                        <small className="form-hint" style={{ color: '#ef4444' }}>
                            ⚠️ Nenhuma pessoa cadastrada. Cadastre uma pessoa primeiro!
                        </small>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="categoria">
                        Categoria: <span className="required">*</span>
                    </label>
                    <select
                        id="categoria"
                        value={categoriaId}
                        onChange={(e) => setCategoriaId(e.target.value)}
                        disabled={enviando || categoriasCompativeis.length === 0}
                        required
                        className="form-select"
                    >
                        <option value="">Selecione uma categoria</option>
                        {categoriasCompativeis.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.descricao} ({c.finalidadeTexto})
                            </option>
                        ))}
                    </select>
                    {categoriasCompativeis.length === 0 && (
                        <small className="form-hint" style={{ color: '#ef4444' }}>
                            ⚠️ Nenhuma categoria compatível com {tipo === TipoTransacao.Despesa ? 'despesas' : 'receitas'}.
                            Cadastre uma categoria primeiro!
                        </small>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="descricao">
                        Descrição: <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Ex: Compra no supermercado, Pagamento de salário..."
                        maxLength={500}
                        disabled={enviando}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="valor">
                        Valor (R$): <span className="required">*</span>
                    </label>
                    <input
                        type="number"
                        id="valor"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                        min="0.01"
                        disabled={enviando}
                        required
                        className="form-input"
                    />
                    <small className="form-hint">
                        Valor em Reais (use ponto para decimais: 150.50)
                    </small>
                </div>

                <div className="form-actions">
                    <button
                        type="submit"
                        disabled={enviando || !descricao.trim() || !valor || !pessoaId || !categoriaId}
                        className="btn-primary"
                    >
                        {enviando ? '⏳ Cadastrando...' : '✓ Cadastrar Transação'}
                    </button>

                    {!enviando && (descricao || valor || pessoaId || categoriaId) && (
                        <button
                            type="button"
                            onClick={limparFormulario}
                            className="btn-secondary"
                        >
                            🗑️ Limpar
                        </button>
                    )}
                </div>
            </form>

            {pessoaId && pessoas.find(p => p.id === pessoaId)?.menorDeIdade &&
                tipo === TipoTransacao.Receita && (
                    <div className="alert alert-error" style={{ marginTop: '1rem' }}>
                        ⚠️ <strong>Atenção:</strong> A pessoa selecionada é menor de idade e não pode ter receitas!
                    </div>
                )}
        </div>
    );
};

export default TransacaoForm;