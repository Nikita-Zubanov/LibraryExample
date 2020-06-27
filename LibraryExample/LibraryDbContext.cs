using LibraryExample.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryExample
{
    public class LibraryDbContext : DbContext
    {
        public LibraryDbContext(DbContextOptions<LibraryDbContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            base.OnConfiguring(builder);
        }

        public DbSet<Author> Authors { get; private set; }
        public DbSet<Book> Books { get; private set; }
        public DbSet<Genre> Genres { get; private set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Author>()
                .HasMany(ath => ath.Books)
                .WithOne(bk => bk.Author)
                .HasForeignKey(bk => bk.AuthorId);

            modelBuilder.Entity<Genre>()
                .HasMany(gnr => gnr.Books)
                .WithOne(bk => bk.Genre)
                .HasForeignKey(bk => bk.GenreId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
