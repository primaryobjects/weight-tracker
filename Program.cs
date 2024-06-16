using DotNetEnv;
using weight_tracker.Managers.Interface;
using weight_tracker.Managers;
using weight_tracker.Managers.Concrete;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddSingleton<LLM, CohereManager>()
    .AddSingleton<WeightAnalysis>();

var app = builder.Build();

Env.Load();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllers();
app.MapFallbackToFile("index.html");;

app.Run();
