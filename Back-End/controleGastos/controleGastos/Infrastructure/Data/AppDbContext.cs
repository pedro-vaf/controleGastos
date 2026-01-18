using controleGastos.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace controleGastos.Infrastructure.Data;

public class AppDbContext : DbContext {
    
    /* Carrega as configurações do banco que será usado */
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    
    /* Tabela de Pessoas */
    public DbSet<Pessoa> Pessoas { get; set; }
    /* Tabela de Categorias */
    public DbSet<Categoria> Categorias { get; set; }
    /* Tabela de Transação */
    public DbSet<Transacao> Transacoes { get; set; }
    
    /* Configura as entidades e seus relacionamentos */
    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        base.OnModelCreating(modelBuilder);
        
        /*
        HasKey -> Chave primária
        IsRequired -> Campo obrigatório
        HasMaxLength -> Tamanho máximo para a ‘string’
        HasIndex -> Criação de índice para busca 
        HasConversion<int> -> Salva o Enum como int no banco
        HasPrecision -> Precisão para valores monetários
        HasForeignKey -> Chave estrangeira
        */
        
        /* Configuração da entidade Pessoa */
        modelBuilder.Entity<Pessoa>(entity => {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.Nome)
                .IsRequired()
                .HasMaxLength(200);
            entity.Property(p => p.Idade)
                .IsRequired();
            entity.HasIndex(p => p.Nome);
        });
        
        /* Configuração da entidade Categoria */
        modelBuilder.Entity<Categoria>(entity => {
            entity.HasKey(c => c.Id);
            entity.Property(c => c.Descricao)
                .IsRequired()
                .HasMaxLength(200);
            entity.Property(c => c.Finalidade)
                .IsRequired()
                .HasConversion<int>(); 
            entity.HasIndex(c => c.Descricao);
        });
        
        /* Configuração da entidade Transação */
        modelBuilder.Entity<Transacao>(entity => {
            entity.HasKey(t => t.Id);
            entity.Property(t => t.Descricao)
                .IsRequired()
                .HasMaxLength(500);
            entity.Property(t => t.Valor)
                .IsRequired()
                .HasPrecision(18, 2); 
            entity.Property(t => t.TipoTransacao)
                .IsRequired()
                .HasConversion<int>();

            /* Relacionamento com Pessoa (1:N)
                Uma pessoa pode ter várias transações
                Quando deletar uma pessoa, todas as suas transações devem ser deletadas (Cascade) */
            entity.HasOne(t => t.Pessoa)
                .WithMany(p => p.Transacaos)
                .HasForeignKey(t => t.PessoaId)
                .OnDelete(DeleteBehavior.Cascade);

            /* Relacionamento com Categoria (1:N)
                Uma categoria pode estar em várias transações
                Não permite deletar categoria que tenha transações associadas (Restrict) */
            entity.HasOne(t => t.Categoria)
                .WithMany(c => c.Transacoes)
                .HasForeignKey(t => t.CategoriaId)
                .OnDelete(DeleteBehavior.Restrict);
            
            entity.HasIndex(t => t.PessoaId);
            entity.HasIndex(t => t.CategoriaId);
            entity.HasIndex(t => t.TipoTransacao);
        });
    }
}