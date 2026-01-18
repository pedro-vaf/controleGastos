namespace controleGastos.Domain.Enum;

/// <summary>
/// Define o tipo de transação financeira
/// </summary>
public enum TipoTransacao
{
    /* Transação de saída de dinheiro */
    Despesa = 1,
    /* Transação de entrada de dinheiro */
    Receita = 2
}