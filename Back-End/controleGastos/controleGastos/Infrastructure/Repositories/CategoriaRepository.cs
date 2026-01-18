using controleGastos.Domain.Entities;
using controleGastos.Domain.Interfaces;
using controleGastos.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace controleGastos.Infrastructure.Repositories;

/// <summary>
/// Implementação do repositório de Categoria
/// Encapsula toda lógica de acesso a dados relacionada a Categoria
/// </summary>
public class CategoriaRepository : ICategoriaRepository {
    private readonly AppDbContext _context;
    
    /* Construtor com injenção de dependência do DbContext */
    public CategoriaRepository(AppDbContext context) {
        _context = context;
    }
    
    /* Obtém todas as categorias cadastradas ordenadas por descrição */
    public async Task<IEnumerable<Categoria>> ObterTodasCategoriasAsync() {
        return await _context.Categorias
            .AsNoTracking()
            .OrderBy(c => c.Descricao)
            .ToListAsync();
    }
    
    /* Obtém uma categoria por ID */
    public async Task<Categoria?> ObterCategoriaPorIdAsync(Guid id) {
        return await _context.Categorias
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id);
    }
    
    /* Obtém uma categoria por ID incluindo suas transações (eager loading) */
    public async Task<Categoria?> ObterCategoriaPorIdComTransacoesAsync(Guid id) {
        return await _context.Categorias
            .Include(c => c.Transacoes)
                .ThenInclude(t => t.Pessoa) /* Carrega também a pessoa de cada transação */
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id);
    }
    
    /* Adiciona uma nova categoria ao contexto - Não salva no banco ainda, precisa chamar SalvarAsync() */
    public async Task AdicionarCategoriaAsync(Categoria categoria) {
        await _context.Categorias.AddAsync(categoria);
    }
    
    /* Persiste todas as mudanças pendentes no banco de dados */
    public async Task<bool> SalvarAsync() {
       return await _context.SaveChangesAsync() > 0;
    }
}