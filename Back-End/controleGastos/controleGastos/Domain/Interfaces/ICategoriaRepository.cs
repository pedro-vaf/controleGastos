using controleGastos.Domain.Entities;

namespace controleGastos.Domain.Interfaces;

/// <summary>
/// Interface que define o contrato para operações com Categoria no banco de dados
/// </summary>
public interface ICategoriaRepository {
    
    /* Obter todas as categorias cadastradas */
    Task<IEnumerable<Categoria>> ObterTodasCategoriasAsync();
    
    /* Obtém uma categoria por ID */
    Task<Categoria?> ObterCategoriaPorIdAsync(Guid id);
    
    /* Obtém uma categoria por ID incluindo suas transações */
    Task<Categoria?> ObterCategoriaPorIdComTransacoesAsync(Guid id);
    
    /* Adiciona uma nova categoria */
    Task AdicionarCategoriaAsync(Categoria categoria);
    
    /* Salvar as mudanças no banco de dados */
    Task<bool> SalvarAsync();
}