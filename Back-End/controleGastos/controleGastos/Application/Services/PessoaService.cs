using controleGastos.Application.DTOs;
using controleGastos.Domain.Entities;
using controleGastos.Domain.Interfaces;

namespace controleGastos.Application.Services;

/// <summary>
/// Serviço de Pessoa usando Repository Pattern
/// </summary>
public class PessoaService {

    private readonly IPessoaRepository _pessoaRepository;

    /* Atribui os métodos da interface IPessoaRepository para a variável _pessoaRepository */
    public PessoaService(IPessoaRepository pessoaRepository) {
        _pessoaRepository = pessoaRepository;
    }

    public async Task<PessoaDTO> CriarAsync(CriarPessoaDTO dto) {
        var pessoa = new Pessoa {
            Nome = dto.Nome,
            Idade = dto.Idade
        };

        await _pessoaRepository.AdicionarPessoaAsync(pessoa);
        await _pessoaRepository.SalvarAsync();

        return new PessoaDTO {
            Id = pessoa.Id,
            Nome = pessoa.Nome,
            Idade = pessoa.Idade,
            MenorDeIdade = pessoa.PessoaMenorDeIdade()
        };
    }

    public async Task<List<PessoaDTO>> ListarAsync() {
        var pessoas = await _pessoaRepository.ObterTodasPessoasAsync();

        return pessoas.Select(p => new PessoaDTO {
            Id = p.Id,
            Nome = p.Nome,
            Idade = p.Idade,
            MenorDeIdade = p.PessoaMenorDeIdade()
        }).ToList();
    }

    public async Task<PessoaDTO?> ObterPorIdAsync(Guid id) {
        var pessoa = await _pessoaRepository.ObterPessoaPorIdAsync(id);

        if (pessoa == null)
            return null;

        return new PessoaDTO {
            Id = pessoa.Id,
            Nome = pessoa.Nome,
            Idade = pessoa.Idade,
            MenorDeIdade = pessoa.PessoaMenorDeIdade()
        };
    }

    public async Task<bool> DeletarPessoaAsync(Guid id) {
        var pessoa = await _pessoaRepository.ObterPessoaPorIdAsync(id);

        if (pessoa == null)
            return false;
        
        _pessoaRepository.Remover(pessoa);
        await _pessoaRepository.SalvarAsync();
        
        return true;
    }
}