using System.ComponentModel.DataAnnotations;

namespace controleGastos.Application.DTOs;

/// <summary>
/// DTO para criação de uma nova pessoa
/// </summary>
public class CriarPessoaDTO {

    [Required(ErrorMessage = "O nome é obrigatório")]
    [StringLength(200, ErrorMessage = "O nome deve ter no máximo 200 caracteres")]
    public string Nome { get; set; } = string.Empty;
    
    [Required(ErrorMessage = "A idade é obrigatória")]
    [Range(1, 120, ErrorMessage = "A idade deve ser entre 1 e 120")]
    public int Idade { get; set; }
}