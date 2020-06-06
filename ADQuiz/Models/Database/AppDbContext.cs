using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ADQuiz
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions options)
        : base(options)
        {
        
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Question>()
                        .HasMany(a => a.Answers)
                        .WithOne(q => q.Question)
                        .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.ApplyConfiguration(new RoleConfiguration());
        }

        public DbSet<Question> Questions {get; set;}
        public DbSet<Answer> Answers { get; set; }

    }
}
