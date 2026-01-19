using controleGastos.Application.DTOs;
using controleGastos.Domain.Entities;
using controleGastos.Domain.Enum;
using controleGastos.Domain.Interfaces;

namespace controleGastos.Application.Services;

/// <summary>
/// Serviço de Transação usando Repository Pattern
/// </summary>
public class TransacaoService {

    private readonly IPessoaRepository _pessoaRepository;
    private readonly ICategoriaRepository _categoriaRepository;
    private readonly ITransacaoRepository _transacaoRepository;

    public TransacaoService(IPessoaRepository pessoaRepository,
        ICategoriaRepository categoriaRepository,
        ITransacaoRepository transacaoRepository) {
        _pessoaRepository = pessoaRepository;
        _categoriaRepository = categoriaRepository;
        _transacaoRepository = transacaoRepository;
    }

    public async Task<TransacaoDTO> CriarTransacaoAsync(CriarTransacaoDTO dto) {
        /* Verificar se a pessoa existe */
        var pessoa = await _pessoaRepository.ObterPessoaPorIdAsync(dto.PessoaId);
        if(pessoa == null)
            throw new ArgumentException($"Pessoa com ID {dto.PessoaId} não encontrada");
        
        /* Verificar se a categoria existe */
        var categoria = await _categoriaRepository.ObterCategoriaPorIdAsync(dto.CategoriaId);
        if(categoria == null)
            throw new ArgumentException($"Categoria com ID {dto.CategoriaId} não encontrada");
        
        /* Menor de idade só pode ter despesas */
        if (pessoa.PessoaMenorDeIdade() && categoria.Finalidade != FinalidadeCategoria.Despesa)
            throw new ArgumentException("Menores de idade (menos de 18 anos) só podem ter despesas");
        
        /* Categoria aceita o tipo de transação */
        if (!categoria.AceitaTipoTranscao(dto.TipoTransacao)) {
            var tipoTexto = dto.TipoTransacao.ToString() == nameof(TipoTransacao.Despesa) ? "despesa" : "receita";
            throw new ArgumentException(
                $"A categoria '{categoria.Descricao}' não aceita transações do tipo {tipoTexto}");
        }
        
        /* Se passou todas as validações, cria a transação */
        var transacao = new Transacao {
            Descricao = dto.Descricao,
            Valor = dto.Valor,
            TipoTransacao = dto.TipoTransacao,
            CategoriaId = dto.CategoriaId,
            PessoaId = dto.PessoaId
        };

        await _transacaoRepository.AdicionarTransacaoAsync(transacao);
        await _transacaoRepository.SalvarAsync();

        return new TransacaoDTO {
            Id = transacao.Id,
            Descricao = transacao.Descricao,
            Valor = transacao.Valor,
            TipoTransacao = transacao.TipoTransacao,
            TipoTexto = transacao.TipoTransacao.ToString(),
            CategoriaId = categoria.Id,
            CategoriaNome = categoria.Descricao,
            PessoaId = pessoa.Id,
            PessoaNome = pessoa.Nome
        };
    }
    
    public async Task<List<TransacaoDTO>> ListarTransacaoAsync() {
        var transacoes = await _transacaoRepository.ObterTodasTransacoesAsync();

        return transacoes.Select(t => new TransacaoDTO
        {
            Id = t.Id,
            Descricao = t.Descricao,
            Valor = t.Valor,
            TipoTransacao = t.TipoTransacao,
            TipoTexto = t.TipoTransacao.ToString(),
            CategoriaId = t.CategoriaId,
            CategoriaNome = t.Categoria.Descricao,
            PessoaId = t.PessoaId,
            PessoaNome = t.Pessoa.Nome
        }).ToList();
    }
    
    public async Task<List<TransacaoDTO>> ListarTransacaoPorPessoaAsync(Guid pessoaId) {
        var transacoes = await _transacaoRepository.ObterTransacaoPorPessoaAsync(pessoaId);

        return transacoes.Select(t => new TransacaoDTO
        {
            Id = t.Id,
            Descricao = t.Descricao,
            Valor = t.Valor,
            TipoTransacao = t.TipoTransacao,
            TipoTexto = t.TipoTransacao.ToString(),
            CategoriaId = t.CategoriaId,
            CategoriaNome = t.Categoria.Descricao,
            PessoaId = t.PessoaId,
            PessoaNome = t.Pessoa.Nome
        }).ToList();
    }
    
}