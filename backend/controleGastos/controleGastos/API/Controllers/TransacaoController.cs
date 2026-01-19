using controleGastos.Application.DTOs;
using controleGastos.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace controleGastos.API.Controllers;

/// <summary>
/// Controller responsável pelos endpoints de gerenciamento de Transações
/// Implementa validações de regras de negócio complexas
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class TransacaoController : ControllerBase {
    private readonly TransacaoService _transacaoService;
    private readonly ILogger<TransacaoController> _logger;
    
    /* Construtor com injeção de dependências */
    public TransacaoController(TransacaoService transacaoService, ILogger<TransacaoController> logger) {
        _transacaoService = transacaoService;
        _logger = logger;
    }
    
    /* Lista todas as transações cadastradas */
    [HttpGet]
    [ProducesResponseType(typeof(List<TransacaoDTO>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<List<TransacaoDTO>>> Listar() {
        try {
            _logger.LogInformation("Listando todas as transações");
            var transacoes = await _transacaoService.ListarTransacaoAsync();
                
            _logger.LogInformation("Retornadas {Count} transações", transacoes.Count);
            return Ok(transacoes);
        }
        catch (Exception ex) {
            _logger.LogError(ex, "Erro ao listar transações");
            return StatusCode(500, new { mensagem = "Erro interno ao listar transações" });
        }
    }
    
    /* Lista transações de uma pessoa específica */
    [HttpGet("pessoa/{pessoaId}")]
    [ProducesResponseType(typeof(List<TransacaoDTO>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<List<TransacaoDTO>>> ListarPorPessoa(Guid pessoaId) {
        try {
            _logger.LogInformation("Listando transações da pessoa {PessoaId}", pessoaId);
            var transacoes = await _transacaoService.ListarTransacaoPorPessoaAsync(pessoaId);
                
            _logger.LogInformation("Retornadas {Count} transações da pessoa {PessoaId}", 
                transacoes.Count, pessoaId);
            return Ok(transacoes);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao listar transações da pessoa {PessoaId}", pessoaId);
            return StatusCode(500, new { mensagem = "Erro interno ao listar transações" });
        }
    }
    
    /* Cria uma transação com validações de regras de negócio */
    [HttpPost]
    [ProducesResponseType(typeof(TransacaoDTO), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<TransacaoDTO>> Criar([FromBody] CriarTransacaoDTO dto)
    {
        try {
            /* Valida as DataAnnotations do DTO */
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Tentativa de criar transação com dados inválidos");
                return BadRequest(ModelState);
            }

            _logger.LogInformation(
                "Criando nova transação: Pessoa {PessoaId}, Categoria {CategoriaId}, Tipo {Tipo}, Valor {Valor}", 
                dto.PessoaId, dto.CategoriaId, dto.TipoTransacao, dto.Valor);

            /* O Service contém todas as validações de negócio
                Se alguma validação falhar, lançará ArgumentException */
            var transacao = await _transacaoService.CriarTransacaoAsync(dto);
                
            _logger.LogInformation("Transação criada com ID {Id}", transacao.Id);
                
            return CreatedAtAction(
                nameof(Listar), 
                new { id = transacao.Id }, 
                transacao
            );
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Violação de regra de negócio ao criar transação");
            return BadRequest(new { mensagem = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao criar transação");
            return StatusCode(500, new { mensagem = "Erro interno ao criar transação" });
        }
    }
}