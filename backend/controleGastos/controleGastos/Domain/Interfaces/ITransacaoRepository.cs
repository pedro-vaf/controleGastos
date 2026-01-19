using controleGastos.Domain.Entities;

namespace controleGastos.Domain.Interfaces;

/// <summary>
/// Interface que define o contrato para operações com Transacao no banco de dados
/// </summary>
public interface ITransacaoRepository {
    
    /* Obter todas as transaçoes cadastradas */
    Task<IEnumerable<Transacao>> ObterTodasTransacoesAsync();
    
    /* Obtém todas as transações de uma pessoa específica */
    Task<IEnumerable<Transacao>> ObterTransacaoPorPessoaAsync(Guid pessoaId);
    
    /* Adiciona uma nova transação */
    Task AdicionarTransacaoAsync(Transacao transacao);
    
    /* Salvar s mudanças no banco de dados */
    Task<bool> SalvarAsync();
}