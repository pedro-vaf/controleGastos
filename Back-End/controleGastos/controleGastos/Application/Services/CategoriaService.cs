using controleGastos.Application.DTOs;
using controleGastos.Domain.Entities;
using controleGastos.Domain.Interfaces;

namespace controleGastos.Application.Services;

/// <summary>
/// Serviço de Categoria usando Repository Pattern
/// </summary>
public class CategoriaService {

    private readonly ICategoriaRepository _categoriaRepository;

    /* Atribui os métodos da interface ICategoriaRepository para a variável _CategoriaRepository */
    public CategoriaService(ICategoriaRepository categoriaRepository) {
        _categoriaRepository = categoriaRepository;
    }
    
    public async Task<CategoriaDTO> CriarCategoriaAsync(CriarCategoriaDTO dto) {
        var categoria = new Categoria {
            Descricao = dto.Descricao,
            Finalidade = dto.Finalidade
        };

        await _categoriaRepository.AdicionarCategoriaAsync(categoria);
        await _categoriaRepository.SalvarAsync();

        return new CategoriaDTO {
            Id = categoria.Id,
            Descricao = categoria.Descricao,
            Finalidade = categoria.Finalidade,
            FinalidadeTexto = categoria.Finalidade.ToString()
        };
    }

    public async Task<List<CategoriaDTO>> ListarCategoriaAsync() {
        var categorias = await _categoriaRepository.ObterTodasCategoriasAsync();

        return categorias.Select(c => new CategoriaDTO {
            Id = c.Id,
            Descricao = c.Descricao,
            Finalidade = c.Finalidade,
            FinalidadeTexto = c.Finalidade.ToString()
        }).ToList();
    }

    public async Task<CategoriaDTO?> ObterCategoriaPorIdAsync(Guid id) {
        var categoria = await _categoriaRepository.ObterCategoriaPorIdAsync(id);

        if (categoria == null)
            return null;

        return new CategoriaDTO {
            Id = categoria.Id,
            Descricao = categoria.Descricao,
            Finalidade = categoria.Finalidade,
            FinalidadeTexto = categoria.Finalidade.ToString()
        };
    }
}