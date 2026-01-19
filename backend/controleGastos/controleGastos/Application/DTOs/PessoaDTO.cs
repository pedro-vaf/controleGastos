namespace controleGastos.Application.DTOs;

/// <summary>
/// DTO para retornar dados de uma pessoa
/// </summary>
public class PessoaDTO {
    
    public Guid Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public int Idade { get; set; }
    public bool MenorDeIdade { get; set; }
}