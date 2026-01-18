using System.ComponentModel.DataAnnotations;
using controleGastos.Domain.Enum;

namespace controleGastos.Application.DTOs;

/// <summary>
/// DTO para criação de uma nova transação
/// </summary>
public class CriarTransacaoDTO {
    
    [Required(ErrorMessage = "A descrição é obrigatória")]
    [StringLength(500, ErrorMessage = "A descrição deve ter no máximo 500 caracteres")]
    public string Descricao { get; set; }
    
    [Required(ErrorMessage = "O valor é obrigatóeio")]
    [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser positivo")]
    public decimal Valor { get; set; }
    
    [Required(ErrorMessage = "O tipo é obrigatório")]
    public TipoTransacao TipoTransacao { get; set; }
    
    [Required(ErrorMessage = "A categoria é obrigatória")]
    public Guid CategoriaId { get; set; }
    
    [Required(ErrorMessage = "A pessoa é obrigatória")]
    public Guid PessoaId { get; set; }
}