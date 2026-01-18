using controleGastos.Application.DTOs;
using controleGastos.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace controleGastos.API.Controllers;

/// <summary>
/// Controller responsável pelos endpoints de gerenciamento de Categorias
/// Expõe operações de criação e listagem de categorias
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class CategoriaController : ControllerBase {
    private readonly CategoriaService _categoriaService;
    private readonly ILogger<CategoriaController> _logger;
    
    /* Construtor com injeção de dependências */
    public CategoriaController(CategoriaService categoriaService, ILogger<CategoriaController> logger) {
        _categoriaService = categoriaService;
        _logger = logger;
    }
    
    /* Lista todas as categorias cadastradas */
    [HttpGet]
    [ProducesResponseType(typeof(List<CategoriaDTO>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<List<CategoriaDTO>>> ListarCategorias() {
        try {
            _logger.LogInformation("Listando todas as categorias");
            var categorias = await _categoriaService.ListarCategoriaAsync();
                
            _logger.LogInformation("Retornadas {Count} categorias", categorias.Count);
            return Ok(categorias);
        }
        catch (Exception ex) {
            _logger.LogError(ex, "Erro ao listar categorias");
            return StatusCode(500, new { mensagem = "Erro interno ao listar categorias" });
        }
    }
    
    /* Obtém uma categoria específica por ID */
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(CategoriaDTO), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<CategoriaDTO>> ObterPorId(Guid id) {
        try {
            _logger.LogInformation("Buscando categoria com ID {Id}", id);
            var categoria = await _categoriaService.ObterCategoriaPorIdAsync(id);
                
            if (categoria == null) {
                _logger.LogWarning("Categoria com ID {Id} não encontrada", id);
                return NotFound(new { mensagem = $"Categoria com ID {id} não encontrada" });
            }

            _logger.LogInformation("Categoria {Descricao} encontrada", categoria.Descricao);
            return Ok(categoria);
        }
        catch (Exception ex) {
            _logger.LogError(ex, "Erro ao buscar categoria com ID {Id}", id);
            return StatusCode(500, new { mensagem = "Erro interno ao buscar categoria" });
        }
    }
    
    /* Cria uma categoria */
    [HttpPost]
    [ProducesResponseType(typeof(CategoriaDTO), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<CategoriaDTO>> Criar([FromBody] CriarCategoriaDTO dto) {
        try {
            /* Valida as DataAnnotations do DTO */
            if (!ModelState.IsValid) {
                _logger.LogWarning("Tentativa de criar categoria com dados inválidos");
                return BadRequest(ModelState);
            }

            _logger.LogInformation("Criando nova categoria: {Descricao}, Finalidade: {Finalidade}", 
                dto.Descricao, dto.Finalidade);
                
            var categoria = await _categoriaService.CriarCategoriaAsync(dto);
                
            _logger.LogInformation("Categoria criada com ID {Id}", categoria.Id);
                
            /* Retorna 201 Created com a URL do recurso criado */
            return CreatedAtAction(
                nameof(ObterPorId), 
                new { id = categoria.Id }, 
                categoria
            );
        }
        catch (Exception ex) {
            _logger.LogError(ex, "Erro ao criar categoria");
            return StatusCode(500, new { mensagem = "Erro interno ao criar categoria" });
        }
    }
}