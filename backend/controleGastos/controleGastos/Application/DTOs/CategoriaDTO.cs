using controleGastos.Domain.Enum;

namespace controleGastos.Application.DTOs;

/// <summary>
/// DTO para retornar dados de uma categoria
/// </summary>
public class CategoriaDTO {
    
    public Guid Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public FinalidadeCategoria Finalidade { get; set; }
    public string FinalidadeTexto { get; set; } = string.Empty; /* Despesa, Receita, Ambas */
}