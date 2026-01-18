/* Componente principal da aplicação */
import React, { useState } from 'react';
import './App.css';

/* Importar componentes - Pessoas */
import PessoaForm from './components/pessoas/PessoaForm';
import PessoaList from './components/pessoas/PessoaList';

/* Importar componentes - Categorias */
import CategoriaForm from './components/categorias/CategoriaForm';
import CategoriaList from './components/categorias/CategoriaList';

/* Importar componentes - Transações */
import TransacaoForm from './components/transacoes/TransacaoForm';
import TransacaoList from './components/transacoes/TransacaoList';

/* Importar componentes - Relatórios */
import RelatorioPessoas from './components/relatorios/RelatorioPessoa';
import RelatorioCategorias from './components/relatorios/RelatorioCategoria';

/* Componente principal que gerencia as diferentes telas/abas da aplicação */
const App: React.FC = () => {
    /* Estado para controlar qual aba está ativa */
    const [abaAtiva, setAbaAtiva] = useState<string>('pessoas');

    /* Estado para forçar atualização de listas  */
    const [atualizacaoPessoas, setAtualizacaoPessoas] = useState<number>(0);
    const [atualizacaoCategorias, setAtualizacaoCategorias] = useState<number>(0);
    const [atualizacaoTransacoes, setAtualizacaoTransacoes] = useState<number>(0);

    /* Callbacks para atualizar listas quando houver mudanças */
    const handlePessoaCriada = () => setAtualizacaoPessoas(prev => prev + 1);
    const handleCategoriaCriada = () => setAtualizacaoCategorias(prev => prev + 1);
    const handleTransacaoCriada = () => {
        setAtualizacaoTransacoes(prev => prev + 1);
        /* Também atualiza pessoas, pois o relatório pode ter mudado */
        setAtualizacaoPessoas(prev => prev + 1);
    };

    /* Renderiza o conteúdo da aba ativa */
    const renderizarConteudo = () => {
        switch (abaAtiva) {
            case 'pessoas':
                return (
                    <div className="tab-content">
                        <PessoaForm onPessoaCriada={handlePessoaCriada} />
                        <div className="divider"></div>
                        <PessoaList onPessoaCriada={atualizacaoPessoas} />
                    </div>
                );

            case 'categorias':
                return (
                    <div className="tab-content">
                        <CategoriaForm onCategoriaCriada={handleCategoriaCriada} />
                        <div className="divider"></div>
                        <CategoriaList onCategoriaCriada={atualizacaoCategorias} />
                    </div>
                );

            case 'transacoes':
                return (
                    <div className="tab-content">
                        <TransacaoForm onTransacaoCriada={handleTransacaoCriada} />
                        <div className="divider"></div>
                        <TransacaoList onTransacaoCriada={atualizacaoTransacoes} />
                    </div>
                );

            case 'relatorios':
                return (
                    <div className="tab-content">
                        <RelatorioPessoas />
                        <div className="divider"></div>
                        <div style={{ marginTop: '2rem' }}>
                            <h3 style={{ color: '#64748b', marginBottom: '1rem' }}>
                                📦 Relatório por Categoria (Opcional)
                            </h3>
                            <RelatorioCategorias />
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="tab-content">
                        <p>Selecione uma aba no menu acima</p>
                    </div>
                );
        }
    };

    return (
        <div className="App">
            {/* Header */}
            <header className="app-header">
                <div className="header-content">
                    <h1>💰 Sistema de Controle de Gastos Residenciais</h1>
                    <p className="subtitle">Gerencie suas finanças de forma simples e eficiente</p>
                </div>
            </header>

            {/* Menu de navegação por abas */}
            <nav className="tabs-navigation">
                <button
                    className={`tab-button ${abaAtiva === 'pessoas' ? 'active' : ''}`}
                    onClick={() => setAbaAtiva('pessoas')}
                >
                    <span className="tab-icon">👥</span>
                    <span className="tab-label">Pessoas</span>
                </button>

                <button
                    className={`tab-button ${abaAtiva === 'categorias' ? 'active' : ''}`}
                    onClick={() => setAbaAtiva('categorias')}
                >
                    <span className="tab-icon">📦</span>
                    <span className="tab-label">Categorias</span>
                </button>

                <button
                    className={`tab-button ${abaAtiva === 'transacoes' ? 'active' : ''}`}
                    onClick={() => setAbaAtiva('transacoes')}
                >
                    <span className="tab-icon">💸</span>
                    <span className="tab-label">Transações</span>
                </button>

                <button
                    className={`tab-button ${abaAtiva === 'relatorios' ? 'active' : ''}`}
                    onClick={() => setAbaAtiva('relatorios')}
                >
                    <span className="tab-icon">📊</span>
                    <span className="tab-label">Relatórios</span>
                </button>
            </nav>

            {/* Conteúdo da aba selecionada */}
            <main className="main-content">
                <div className="container">
                    {renderizarConteudo()}
                </div>
            </main>

            {/* Footer */}
            <footer className="app-footer">
                <p>
                    Desenvolvido por Pedro Aquino para Teste Técnico - Full Stack Developer
                    <span className="separator">•</span>
                    React + TypeScript + .NET 9
                </p>
            </footer>
        </div>
    );
};

export default App;