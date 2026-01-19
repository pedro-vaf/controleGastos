namespace controleGastos.Domain.Enum;

/// <summary>
/// Define a finalidade de uma categoria
/// </summary>
public enum FinalidadeCategoria
{
    /* Categoria exclusiva para Transação de saída de dinheiro */
    Despesa = 1,
    /* Categoria exclusiva para Transação de entrada de dinheiro */
    Receita = 2,
    /* Categoria sem exclusividade */
    Ambas = 3
}