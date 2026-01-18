namespace controleGastos.Application.DTOs;

/// <summary>
/// DTO para totais gerais do relatório de categorias
/// </summary>
public class RelatorioGeralCategoriasDTO {
    
    public List<RelatorioCategoriaDTO> Categorias { get; set; } = new();
    public decimal TotalGeralReceitas { get; set; }
    public decimal TotalGeralDespesas { get; set; }
    public decimal SaldoGeralLiquido { get; set; }
}