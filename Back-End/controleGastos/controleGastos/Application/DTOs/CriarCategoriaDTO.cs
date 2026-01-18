using System.ComponentModel.DataAnnotations;
using controleGastos.Domain.Enum;

namespace controleGastos.Application.DTOs;

/// <summary>
/// DTO para criação de uma nova categoria
/// </summary>
public class CriarCategoriaDTO {
  
  [Required (ErrorMessage = "A descrição é obrigatória")]  
  [StringLength(200, ErrorMessage = "A descrição deve ter no máximo 200 caracteres")]
  public string Descricao { get; set; }
  
  [Required(ErrorMessage = "A Finalidade é obrigatória")]
  public FinalidadeCategoria Finalidade { get; set; }
}