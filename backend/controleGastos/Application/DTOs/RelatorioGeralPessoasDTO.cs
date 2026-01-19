namespace controleGastos.Application.DTOs;

public class RelatorioGeralPessoasDTO {
    
    public List<RelatorioPessoaDTO> Pessoas { get; set; } = new();
    public decimal TotalGeralReceitas { get; set; }
    public decimal TotalGeralDespesas { get; set; }
    public decimal SaldoGeralLiquido { get; set; }
}