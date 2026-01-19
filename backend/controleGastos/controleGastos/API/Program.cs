using controleGastos.Application.Services;
using controleGastos.Domain.Interfaces;
using controleGastos.Infrastructure.Data;
using controleGastos.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

/* Permite que o Front-End faça requisições HTTP para o Back-End */
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

/* Configurações de Logging */
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();


/* Caminho raiz do projeto */
var projectRoot = Directory.GetCurrentDirectory();

/* Pasta para o banco */
var dataPath = Path.Combine(projectRoot, "Data");

/* Garante que a pasta existe */
Directory.CreateDirectory(dataPath);

/* Caminho final do banco */
var dbPath = Path.Combine(dataPath, "controleGastos.db");

/* Configuração do banco de dados
    -> Configura o DbContext com SQLite */
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite($"Data Source={dbPath}")
);

/* Configuração do Repository Pattern
    -> Registra as interfaces e a suas implementações no container de DI
    -> O padrão Scoped cria uma instância por requisições HTTP */
builder.Services.AddScoped<IPessoaRepository, PessoaRepository>();
builder.Services.AddScoped<ICategoriaRepository, CategoriaRepository>();
builder.Services.AddScoped<ITransacaoRepository, TransacaoRepository>();

/* Configuração dos services */
builder.Services.AddScoped<PessoaService>();
builder.Services.AddScoped<CategoriaService>();
builder.Services.AddScoped<TransacaoService>();
builder.Services.AddScoped<RelatorioService>();

/* Configuração do Swagger (Documentação API) */
builder.Services.AddEndpointsApiExplorer();

/* Configurações dos Controllers */
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

/* Build da aplicação */
var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("DevCors");
}

/* Mapeia os controllers (endpoints da API) */
app.MapControllers();

/* Inicia a aplicação */
app.Run();
