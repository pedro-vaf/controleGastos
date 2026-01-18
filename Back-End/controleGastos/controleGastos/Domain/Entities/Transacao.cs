using controleGastos.Domain.Enum;

namespace controleGastos.Domain.Entities;

/// <summary>
/// Entidade que representa uma transação financeira (despesa ou receita)
/// </summary>
public class Transacao
{
    /* Identidicador único para transação gerado automaticamente */
    public Guid Id { get; set; }
    /* Descrição da transação */
    public String Descricao { get; set; }
    /* Valor da transação */
    public decimal Valor { get; set; }
    /* Tipo da transação */
    public TipoTransacao TipoTransacao { get; set; }
    
    
    /* Associação com a Categoria */
    public Categoria Categoria { get; set; } = null!;
    public Guid CategoriaId { get; set; }
    
    /* Associação com a Pessoa */
    public Pessoa Pessoa { get; set; } = null!;
    public Guid PessoaId { get; set; }
}