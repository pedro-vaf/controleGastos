namespace controleGastos.Application.DTOs;

/// <summary>
/// DTO para relatório de totais por categoria 
/// </summary>
public class RelatorioCategoriaDTO {
    
    public Guid CategoriaId { get; set; }
    public string CategoriaNome { get; set; } = string.Empty;
    public decimal TotalReceitas { get; set; }
    public decimal TotalDespesas { get; set; }
    public decimal Saldo { get; set; }
}