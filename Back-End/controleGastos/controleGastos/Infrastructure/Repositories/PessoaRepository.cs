using controleGastos.Domain.Entities;
using controleGastos.Domain.Interfaces;
using controleGastos.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace controleGastos.Infrastructure.Repositories;

/// <summary>
/// Implementação do repositório de Pessoa
/// Encapsula toda lógica de acesso a dados relacionada a Pessoa
/// Segue o padrão Repository para desacoplar o domínio da infraestrutura
/// </summary>
public class PessoaRepository : IPessoaRepository {
    private readonly AppDbContext _context;
    
    /* Construtor com injenção de dependência do DbContext */
    public PessoaRepository(AppDbContext context) {
        _context = context;
    }
    
    /* Obtém todas as pessoas cadastradas ordenadas por nome */
    public async Task<IEnumerable<Pessoa>> ObterTodasPessoasAsync() {
        return await _context.Pessoas
            .AsNoTracking()
            .OrderBy(p => p.Nome)
            .ToListAsync();
    }
    
    /*  Obtém uma pessoa por ID */
    public async Task<Pessoa?> ObterPessoaPorIdAsync(Guid id) {
        return await _context.Pessoas
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == id);
    }
    
    /* Obtém uma pessoa por ID incluindo a suas transações */
    public async Task<Pessoa?> ObterPessoaPorIdComTransacoesAsync(Guid id) {
        return await _context.Pessoas
            .Include(p => p.Transacaos) /* Carrega as transações junto */
                .ThenInclude(t => t.Categoria) /* Carrega também a categoria de cada transação */
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    /* Adiciona uma nova pessoa ao contexto - Não salva no banco ainda, precisa chamar SalvarAsync() */
    public async Task AdicionarPessoaAsync(Pessoa pessoa) {
        await _context.Pessoas.AddAsync(pessoa);
    }
    
    /* Remove uma pessoa do contexto - As transações serão deletadas automaticamente (Cascade configurado no DbContext)
        Não remove do banco ainda, precisa chamar SalvarAsync() */
    public void Remover(Pessoa pessoa) {
        _context.Pessoas.Remove(pessoa);
    }
    
    /* Persiste todas as mudanças pendentes no banco de dados - True se salvou pelo menos 1 registro, False caso contrário */
    public async Task<bool> SalvarAsync() {
        return await _context.SaveChangesAsync() > 0;
    }
}