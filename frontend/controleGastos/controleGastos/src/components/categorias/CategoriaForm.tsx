/* Formulário para criar categoria */
import React, { useState } from 'react';
import { CriarCategoria, FinalidadeCategoria } from '../../types/types';
import { criarCategoria } from '../../services/categorias.service';
import { extrairMensagemErro } from '../../services/api';

interface Props {
    onCategoriaCriada: () => void;
}

const CategoriaForm: React.FC<Props> = ({ onCategoriaCriada }) => {
    /* Estados para os campos do formulário */
    const [descricao, setDescricao] = useState<string>('');
    const [finalidade, setFinalidade] = useState<FinalidadeCategoria>(FinalidadeCategoria.Ambas);

    /* Estados de controle */
    const [mensagem, setMensagem] = useState<string>('');
    const [erro, setErro] = useState<string>('');
    const [enviando, setEnviando] = useState<boolean>(false);

    /* Limpa o formulário */
    const limparFormulario = () => {
        setDescricao('');
        setFinalidade(FinalidadeCategoria.Ambas);
        setErro('');
        setMensagem('');
    };

    /* Manipula o envio do formulário */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        /* Validação básica */
        if (!descricao.trim()) {
            setErro('Descrição é obrigatória');
            return;
        }

        try {
            setEnviando(true);
            setErro('');
            setMensagem('');

            const novaCategoria: CriarCategoria = {
                descricao: descricao.trim(),
                finalidade: finalidade
            };

            const categoriaCriada = await criarCategoria(novaCategoria);

            setMensagem(`✓ Categoria "${categoriaCriada.descricao}" criada com sucesso!`);
            limparFormulario();
            onCategoriaCriada();

            setTimeout(() => setMensagem(''), 3000);
        } catch (error: any) {
            console.error('Erro ao criar categoria:', error);
            setErro(extrairMensagemErro(error));
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="form-container">
            <h2>➕ Cadastrar Nova Categoria</h2>

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
                    <label htmlFor="descricao">
                        Descrição: <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Ex: Alimentação, Transporte, Salário..."
                        maxLength={200}
                        disabled={enviando}
                        required
                        className="form-input"
                    />
                    <small className="form-hint">
                        Nome da categoria (ex: Alimentação, Salário, Lazer)
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="finalidade">
                        Finalidade: <span className="required">*</span>
                    </label>
                    <select
                        id="finalidade"
                        value={finalidade}
                        onChange={(e) => setFinalidade(Number(e.target.value) as FinalidadeCategoria)}
                        disabled={enviando}
                        required
                        className="form-select"
                    >
                        <option value={FinalidadeCategoria.Despesa}>
                            💸 Despesa (só aceita transações de saída)
                        </option>
                        <option value={FinalidadeCategoria.Receita}>
                            💰 Receita (só aceita transações de entrada)
                        </option>
                        <option value={FinalidadeCategoria.Ambas}>
                            🔄 Ambas (aceita despesas e receitas)
                        </option>
                    </select>
                    <small className="form-hint">
                        <strong>Despesa:</strong> aceita apenas transações de despesa<br/>
                        <strong>Receita:</strong> aceita apenas transações de receita<br/>
                        <strong>Ambas:</strong> aceita qualquer tipo de transação
                    </small>
                </div>

                <div className="form-actions">
                    <button
                        type="submit"
                        disabled={enviando || !descricao.trim()}
                        className="btn-primary"
                    >
                        {enviando ? '⏳ Cadastrando...' : '✓ Cadastrar Categoria'}
                    </button>

                    {!enviando && descricao && (
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

            <div className="info-box" style={{ marginTop: '1.5rem' }}>
                <strong>💡 Dica:</strong> Crie categorias que façam sentido para sua organização financeira.
                Por exemplo: "Alimentação" (Despesa), "Salário" (Receita), "Investimentos" (Ambas).
            </div>
        </div>
    );
};

export default CategoriaForm;