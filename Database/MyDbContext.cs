using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using weight_tracker.Types;

namespace weight_tracker.Database
{
    public class MyDbContext : DbContext
    {
        public MyDbContext()
        {
        }

        public DbSet<Weight> Weights { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Load enviornment variables.
            Env.Load();

            // Configure database.
            optionsBuilder.UseSqlite(Environment.GetEnvironmentVariable("ConnectionString"));
        }
    }
}