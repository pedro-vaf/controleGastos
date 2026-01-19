/* Formulário para criar pessoa */
import React, { useState } from "react";
import { CriarPessoa } from "../../types/types";
import { criarPessoa } from "../../services/pessoas.services";
import { extrairMensagemErro } from "../../services/api";

interface Props {
    onPessoaCriada: () => void; /* Callback para notificar que pessoa foi criada */
}

const PessoaForm: React.FC<Props> = ({ onPessoaCriada }) => {
    /* Estados para os campos do formulário */
    const [nome, setNome] = useState<string>('');
    const [idade, setIdade] = useState<string>('');

    /* Estados de controle */
    const [mensagem, setMensagem] = useState<string>('');
    const [erro, setErro] = useState<string>('');
    const [enviando, setEnviando] = useState<boolean>(false);

    /* Limpar o formulário */
    const limparFormulario = () => {
        setNome('');
        setIdade('');
        setErro('');
        setMensagem('');
    };

    /* Manipula o envio do formulário */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); /* Previne o reload da página */

        /* Validações básicas */
        if (!nome.trim()){
            setErro('Nome é obrigatório');
            return;
        }

        const idadeNumero = parseInt(idade);
        if (isNaN(idadeNumero) || idadeNumero < 1 || idadeNumero > 120) {
            return;
        }

        try {
            setEnviando(true);
            setErro('');
            setMensagem('');

            const novaPessoa: CriarPessoa = {
                nome: nome.trim(),
                idade: idadeNumero
            };

            const pessoaCriada = await criarPessoa(novaPessoa);

            /* Sucesso */
            setMensagem(`✓ ${pessoaCriada.nome} foi cadastrada com sucesso!`);
            limparFormulario();

            /* atualizar lista */
            onPessoaCriada();

            /* Remove a mensagem de sucesso após 5 segundos */
            setTimeout(() => setMensagem(''), 5000);
        } catch (error: any) {
            console.error('Erro ao criar pessoa:', error);
            setErro(extrairMensagemErro(error));
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="form-container">
            <h2>➕ Cadastrar Nova Pessoa</h2>

            {/* Mensagem de sucesso */}
            {mensagem && (
                <div className="alert alert-success">
                    {mensagem}
                </div>
            )}

            {/* Mensagem de erro */}
            {erro && (
                <div className="alert alert-error">
                    {erro}
                </div>
            )}

            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="nome">
                        Nome: <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Digite o nome completo"
                        maxLength={200}
                        disabled={enviando}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="idade">
                        Idade: <span className="required">*</span>
                    </label>
                    <input
                        type="number"
                        id="idade"
                        value={idade}
                        onChange={(e) => setIdade(e.target.value)}
                        placeholder="Digite a idade"
                        min="1"
                        max="150"
                        disabled={enviando}
                        required
                        className="form-input"
                    />
                    <small className="form-hint">
                        ⚠️ Menores de 18 anos só podem ter transações de despesa
                    </small>
                </div>

                <div className="form-actions">
                    <button
                        type="submit"
                        disabled={enviando || !nome.trim() || !idade}
                        className="btn-primary"
                    >
                        {enviando ? '⏳ Cadastrando...' : '✓ Cadastrar Pessoa'}
                    </button>

                    {!enviando && (nome || idade) && (
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
        </div>
    );
};

export default PessoaForm;