using controleGastos.Domain.Entities;
using controleGastos.Domain.Interfaces;
using controleGastos.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace controleGastos.Infrastructure.Repositories;

/// <summary>
/// Implementação do repositório de Transação
/// Encapsula toda lógica de acesso a dados relacionada a Transação
/// </summary>
public class TransacaoRepository : ITransacaoRepository {
    private readonly AppDbContext _context;

    /* Construtor com injenção de dependência do DbContext */
    public TransacaoRepository(AppDbContext context) {
        _context = context;
    }
    
    /* Obtém todas as transações com dados de Pessoa e Categoria carregados (eager loading)
     Ordenadas da mais recente para a mais antiga */
    public async Task<IEnumerable<Transacao>> ObterTodasTransacoesAsync() {
        return await _context.Transacoes
            .Include(t => t.Pessoa) /* Carrega dados da pessoa */
            .Include(t => t.Categoria) /* Carrega dados da categoria */
            .AsNoTracking()
            .OrderByDescending(t => t.Id) /* Mais recentes primeiro */
            .ToListAsync();
    }

    /* Obtém todas as transações de uma pessoa específica - Útil para exibir histórico de transações por pessoa */
    public async Task<IEnumerable<Transacao>> ObterTransacaoPorPessoaAsync(Guid pessoaId) {
        return await _context.Transacoes
            .Include(t => t.Pessoa) /* Carrega dados da pessoa */
            .Include(t => t.Categoria) /* Carrega dados da categoria */
            .AsNoTracking()
            .Where(t => t.Id == pessoaId)
            .OrderByDescending(t => t.Id)
            .ToListAsync();
    }
    
    /* Obtém uma transação por ID */
    public async Task AdicionarTransacaoAsync(Transacao transacao) {
        await _context.AddAsync(transacao);
    }
    
    /* Persiste todas as mudanças pendentes no banco de dados */
    public async Task<bool> SalvarAsync() {
        return await _context.SaveChangesAsync() > 0;
    }
}