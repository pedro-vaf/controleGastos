using controleGastos.Application.DTOs;
using controleGastos.Domain.Enum;
using controleGastos.Domain.Interfaces;

namespace controleGastos.Application.Services;

/// <summary>
/// Serviço refatorado de Relatório usando Repository Pattern
/// </summary>
public class RelatorioService {
    
    private readonly IPessoaRepository _pessoaRepository;
    private readonly ICategoriaRepository _categoriaRepository;
    
    public RelatorioService(
        IPessoaRepository pessoaRepository,
        ICategoriaRepository categoriaRepository) {
        _pessoaRepository = pessoaRepository;
        _categoriaRepository = categoriaRepository;
    }
    
    public async Task<RelatorioGeralPessoasDTO> ObterRelatorioPorPessoaAsync()
        {
            // Busca todas as pessoas com a suas transações
            var pessoas = await _pessoaRepository.ObterTodasPessoasAsync();
            
            var relatorioPessoas = new List<RelatorioPessoaDTO>();
            decimal totalGeralReceitas = 0;
            decimal totalGeralDespesas = 0;

            foreach (var pessoa in pessoas)
            {
                // Recarrega pessoa com transações
                var pessoaComTransacoes = await _pessoaRepository.ObterPessoaPorIdComTransacoesAsync(pessoa.Id);
                
                if (pessoaComTransacoes == null)
                    continue;

                var totalReceitas = pessoaComTransacoes.Transacaos
                    .Where(t => t.TipoTransacao == TipoTransacao.Receita)
                    .Sum(t => t.Valor);

                var totalDespesas = pessoaComTransacoes.Transacaos
                    .Where(t => t.TipoTransacao == TipoTransacao.Despesa)
                    .Sum(t => t.Valor);

                var saldo = totalReceitas - totalDespesas;

                relatorioPessoas.Add(new RelatorioPessoaDTO
                {
                    PessoaId = pessoa.Id,
                    PessoaNome = pessoa.Nome,
                    TotalReceitas = totalReceitas,
                    TotalDespesas = totalDespesas,
                    Saldo = saldo
                });

                totalGeralReceitas += totalReceitas;
                totalGeralDespesas += totalDespesas;
            }

            return new RelatorioGeralPessoasDTO
            {
                Pessoas = relatorioPessoas,
                TotalGeralReceitas = totalGeralReceitas,
                TotalGeralDespesas = totalGeralDespesas,
                SaldoGeralLiquido = totalGeralReceitas - totalGeralDespesas
            };
        }

        public async Task<RelatorioGeralCategoriasDTO> ObterRelatorioPorCategoriaAsync()
        {
            var categorias = await _categoriaRepository.ObterTodasCategoriasAsync();
            
            var relatorioCategorias = new List<RelatorioCategoriaDTO>();
            decimal totalGeralReceitas = 0;
            decimal totalGeralDespesas = 0;

            foreach (var categoria in categorias)
            {
                var categoriaComTransacoes = await _categoriaRepository.ObterCategoriaPorIdComTransacoesAsync(categoria.Id);
                
                if (categoriaComTransacoes == null)
                    continue;

                var totalReceitas = categoriaComTransacoes.Transacoes
                    .Where(t => t.TipoTransacao == TipoTransacao.Receita)
                    .Sum(t => t.Valor);

                var totalDespesas = categoriaComTransacoes.Transacoes
                    .Where(t => t.TipoTransacao == TipoTransacao.Despesa)
                    .Sum(t => t.Valor);

                var saldo = totalReceitas - totalDespesas;

                relatorioCategorias.Add(new RelatorioCategoriaDTO
                {
                    CategoriaId = categoria.Id,
                    CategoriaNome = categoria.Descricao,
                    TotalReceitas = totalReceitas,
                    TotalDespesas = totalDespesas,
                    Saldo = saldo
                });

                totalGeralReceitas += totalReceitas;
                totalGeralDespesas += totalDespesas;
            }

            return new RelatorioGeralCategoriasDTO
            {
                Categorias = relatorioCategorias,
                TotalGeralReceitas = totalGeralReceitas,
                TotalGeralDespesas = totalGeralDespesas,
                SaldoGeralLiquido = totalGeralReceitas - totalGeralDespesas
            };
        }
}