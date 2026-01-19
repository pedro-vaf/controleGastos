using controleGastos.Application.DTOs;
using controleGastos.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace controleGastos.API.Controllers;

/// <summary>
/// Controller responsável pela geração de relatórios financeiros
/// Fornece visão consolidada de receitas, despesas e saldos
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class RelatorioController : ControllerBase{
    private readonly RelatorioService _relatorioService;
    private readonly ILogger<RelatorioController> _logger;
    
    /* Construtor com injeção de dependências */
    public RelatorioController(RelatorioService relatorioService, ILogger<RelatorioController> logger) {
        _relatorioService = relatorioService;
        _logger = logger;
    }
    
    /* Obtém relatório de totais por pessoa */
    [HttpGet("por-pessoa")]
    [ProducesResponseType(typeof(RelatorioGeralPessoasDTO), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<RelatorioGeralPessoasDTO>> ObterRelatorioPorPessoa() {
        try {
            _logger.LogInformation("Gerando relatório por pessoa");
            var relatorio = await _relatorioService.ObterRelatorioPorPessoaAsync();
                
            _logger.LogInformation(
                "Relatório gerado: {QtdPessoas} pessoas, Saldo Geral: {SaldoGeral:C}", 
                relatorio.Pessoas.Count, 
                relatorio.SaldoGeralLiquido);
                
            return Ok(relatorio);
        }
        catch (Exception ex) {
            _logger.LogError(ex, "Erro ao gerar relatório por pessoa");
            return StatusCode(500, new { mensagem = "Erro interno ao gerar relatório" });
        }
    }
    
    /* Obtém relatório de totais por categoria */
    [HttpGet("por-categoria")]
    [ProducesResponseType(typeof(RelatorioGeralCategoriasDTO), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<RelatorioGeralCategoriasDTO>> ObterRelatorioPorCategoria() {
        try {
            _logger.LogInformation("Gerando relatório por categoria");
            var relatorio = await _relatorioService.ObterRelatorioPorCategoriaAsync();
                
            _logger.LogInformation(
                "Relatório gerado: {QtdCategorias} categorias, Saldo Geral: {SaldoGeral:C}", 
                relatorio.Categorias.Count, 
                relatorio.SaldoGeralLiquido);
                
            return Ok(relatorio);
        }
        catch (Exception ex) {
            _logger.LogError(ex, "Erro ao gerar relatório por categoria");
            return StatusCode(500, new { mensagem = "Erro interno ao gerar relatório" });
        }
    }
    
    /* Obtém resumo geral */
    [HttpGet("resumo")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> ObterResumo() {
        try {
            _logger.LogInformation("Gerando resumo do sistema");
                
            var relatorioPessoas = await _relatorioService.ObterRelatorioPorPessoaAsync();
            var relatorioCategorias = await _relatorioService.ObterRelatorioPorCategoriaAsync();
                
            var resumo = new {
                TotalPessoas = relatorioPessoas.Pessoas.Count,
                TotalCategorias = relatorioCategorias.Categorias.Count,
                TotalTransacoes = relatorioPessoas.Pessoas.Sum(p => 
                    p.TotalReceitas > 0 || p.TotalDespesas > 0 ? 1 : 0),
                TotalReceitas = relatorioPessoas.TotalGeralReceitas,
                TotalDespesas = relatorioPessoas.TotalGeralDespesas,
                SaldoGeral = relatorioPessoas.SaldoGeralLiquido,
                SituacaoFinanceira = relatorioPessoas.SaldoGeralLiquido >= 0 ? "Positiva" : "Negativa"
            };
                
            _logger.LogInformation("Resumo gerado: {TotalPessoas} pessoas, {TotalCategorias} categorias", 
                resumo.TotalPessoas, resumo.TotalCategorias);
                
            return Ok(resumo);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao gerar resumo");
            return StatusCode(500, new { mensagem = "Erro interno ao gerar resumo" });
        }
    }
}