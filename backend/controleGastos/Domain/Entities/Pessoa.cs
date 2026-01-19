using controleGastos.Application.DTOs;

namespace controleGastos.Domain.Entities;

/// <summary>
/// Entidade que representa uma pessoa no controle de gasto
/// </summary>
public class Pessoa
{
    /* Identificador único para pessoa gerado automaticamente */
    public Guid Id { get; set; }
    /* Nome completo da pessoa */
    public String Nome { get; set; } = String.Empty;
    /* idade da pessoa (deve ser positivo) */ 
    public int Idade { get; set; } 
    
    /* Lista de transações acossiada a esta pessoa */
    public ICollection<Transacao> Transacaos { get; set; } = new List<Transacao>();
    
    /* Metódo para verificar a lógica da idade (se é positivo) */
    public bool PessoaMenorDeIdade() { return Idade < 18; }
}