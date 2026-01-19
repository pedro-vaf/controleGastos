using controleGastos.Domain.Enum;

namespace controleGastos.Domain.Entities;

/// <summary>
/// Entidade que representa uma categoria de transação
/// </summary>
public class Categoria
{
    /* Identidicador único para gategoria gerado automaticamente */
    public Guid Id { get; set; }
    /* Descrição do gasto para a categoria */
    public String Descricao { get; set; }
    /* Define se a categoria é para Despesa, Receita ou Ambas */
    public FinalidadeCategoria Finalidade { get; set; }
    
    /* Lista de transações acossiada a esta pessoa */
    public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
    
    /* Verifica se a categoria pode ser usada para o tipo de transação informado */
    public bool AceitaTipoTranscao(TipoTransacao tipoTransacao){

        if (Finalidade == FinalidadeCategoria.Ambas)
            return true;
                
        return (Finalidade == FinalidadeCategoria.Despesa && tipoTransacao == TipoTransacao.Despesa)
               || (Finalidade == FinalidadeCategoria.Receita && tipoTransacao == TipoTransacao.Receita);
    }
}