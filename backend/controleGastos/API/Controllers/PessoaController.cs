using controleGastos.Application.DTOs;
using controleGastos.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace controleGastos.API.Controllers;

/// <summary>
/// Controller responsável pelos endpoints de gerenciamento de Pessoas
/// Expõe operações CRUD (Create, Read, Delete) para entidade Pessoa
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class PessoaController : ControllerBase {
    private readonly PessoaService _pessoaService;
    private readonly ILogger<PessoaController> _logger;
        
    /* Construtor com injeção de dependências */
    public PessoaController(PessoaService pessoaService, ILogger<PessoaController> logger) {
        _pessoaService = pessoaService;
        _logger = logger;
    }
    
    /* Lista todas as pessoas cadastradas */
    [HttpGet]
    [ProducesResponseType(typeof(List<PessoaDTO>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<List<PessoaDTO>>> ListarPessoas() {
        try {
            _logger.LogInformation("Listando todas as pessoas");
            var pessoas = await _pessoaService.ListarAsync();

            _logger.LogInformation("Retornadas {Count} pessoas", pessoas.Count);
            return Ok(pessoas);
        }
        catch (Exception ex) {
            _logger.LogError(ex, "Error ao listar pessoas");
            return StatusCode(500, new { mensagem = "Erro interno ao listar pessoas"});
        }
    }
    
    /* Obtém uma pessoa específica por ID */
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(PessoaDTO), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<PessoaDTO>> ObterPessoaPorId(Guid id) {
        try {
            _logger.LogInformation("Buscando pessoa com ID {Id}", id);
            var pessoa = await _pessoaService.ObterPorIdAsync(id);

            if (pessoa == null) {
                _logger.LogWarning("Pessoa com ID {Id} não encontrada", id);
                return NotFound(new { mensagem = $"Pessoa com ID {id} não encontrada" });
            }
            
            _logger.LogInformation("Pessoa {Nome} encontrada", pessoa.Nome);
            return Ok(pessoa);
        }
        catch (Exception ex) {
            _logger.LogError(ex, "Erro ao buscar pessoa com ID {Id}", id);
            return StatusCode(500, new { mensagem = "Erro interno ao buscar pessoa" });
        }
    }
    
    /* Criar uma pessoa */
    [HttpPost]
    [ProducesResponseType(typeof(PessoaDTO), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<PessoaDTO>> Criar([FromBody] CriarPessoaDTO dto) {
        try {
            /* O ModelState já valida as DataAnnotations do DTO */
            if (!ModelState.IsValid) {
                _logger.LogWarning("Tentativa de criar pessoa com dados inválidos");
                return BadRequest(ModelState);
            }

            _logger.LogInformation("Criando nova pessoa: {Nome}, {Idade} anos", dto.Nome, dto.Idade);
            var pessoa = await _pessoaService.CriarAsync(dto);
                
            _logger.LogInformation("Pessoa criada com ID {Id}", pessoa.Id);
                
            /* Retorna 201 Created com a URL do recurso criado no header Location */
            return CreatedAtAction(
                nameof(ObterPessoaPorId), 
                new { id = pessoa.Id }, 
                pessoa
            );
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao criar pessoa");
            return StatusCode(500, new { mensagem = "Erro interno ao criar pessoa" });
        }
    }
    
    /* Deleta uma pessoa e todas as suas transações (cascade) */
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Deletar(Guid id) {
        try {
            _logger.LogInformation("Tentando deletar pessoa com ID {Id}", id);
            var deletado = await _pessoaService.DeletarPessoaAsync(id);
                
            if (!deletado)
            {
                _logger.LogWarning("Pessoa com ID {Id} não encontrada para deleção", id);
                return NotFound(new { mensagem = $"Pessoa com ID {id} não encontrada" });
            }

            _logger.LogInformation("Pessoa com ID {Id} deletada com sucesso (incluindo suas transações)", id);
                
            /* Retorna 204 No Content (sucesso sem corpo de resposta) */
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao deletar pessoa com ID {Id}", id);
            return StatusCode(500, new { mensagem = "Erro interno ao deletar pessoa" });
        }
    }
}