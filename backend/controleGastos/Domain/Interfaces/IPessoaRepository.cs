using controleGastos.Domain.Entities;

namespace controleGastos.Domain.Interfaces;

/// <summary>
/// Interface que define o contrato para operações com Pessoa no banco de dados
/// Seguindo o Repository Pattern, isso desacopla a lógica de acesso a dados
/// </summary>
public interface IPessoaRepository {
    
    /* Obter todas as pessoas cadastradas */
    Task<IEnumerable<Pessoa>> ObterTodasPessoasAsync();
    
    /* Obtém uma pessoa por ID */
    Task<Pessoa?> ObterPessoaPorIdAsync(Guid id);
    
    /* Obtém uma pessoa por ID incluindo a suas transações */
    Task<Pessoa?> ObterPessoaPorIdComTransacoesAsync(Guid id);
    
    /* Adiciona uma nova pessoa */
    Task AdicionarPessoaAsync(Pessoa pessoa);
    
    /* Remove uma pessoa (e as suas transações em cascade) */
    void Remover(Pessoa pessoa);
    
    /* Salvar as mudanças no banco de dados */
    Task<bool> SalvarAsync();
}