using controleGastos.Domain.Enum;

namespace controleGastos.Application.DTOs;

/// <summary>
/// DTO para retornar dados de uma transação
/// </summary>
public class TransacaoDTO {
    
    public Guid Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public TipoTransacao TipoTransacao { get; set; }
    public string TipoTexto { get; set; } = string.Empty; /* Despesa ou Receita */
    public Guid CategoriaId { get; set; }
    public string CategoriaNome { get; set; } = string.Empty;
    public Guid PessoaId { get; set; }
    public string PessoaNome { get; set; } = string.Empty;
}