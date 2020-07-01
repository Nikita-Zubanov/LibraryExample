using LibraryExample.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryExample.Services
{
    public class LibraryService : ILibraryService
    {
        private readonly AppDbContext _context;

        public LibraryService(AppDbContext context)
        {
            _context = context;
        }

        public void AddBook(Book book)
        {
            Author author = AddAndGetAuthor(book.Author);
            Genre genre = AddAndGetGenre(book.Genre);
            Book findedBook = _context.Books
                .Where(bk => bk.Title==book.Title)
                .FirstOrDefault();

            if (findedBook == null)
            {
                book.Author = author;
                book.Genre = genre;

                _context.Books.Add(book);
                _context.SaveChanges();
            }
        }
        public void ChangeBook(Book book)
        {
            Author author = AddAndGetAuthor(book.Author);
            Genre genre = AddAndGetGenre(book.Genre);
            Book changedBook = _context.Books
                .Where(bk => bk.BookId == book.BookId)
                .FirstOrDefault();

            if (changedBook != null)
            {
                changedBook.Title = book.Title;
                changedBook.Genre = genre;
                changedBook.Author = author;

                _context.SaveChanges();
            }
        }
        public void DeleteBook(int? id)
        {
            Book deletedBook = _context.Books
                   .Where(bk => bk.BookId == id)
                   .FirstOrDefault();

            if (deletedBook != null)
            {
                _context.Books.Remove(deletedBook);
                _context.SaveChanges();
            }
        }

        public IEnumerable<Book> GetBooks()
        {
            return _context.Books
                .Include(bk => bk.Author)
                .Include(bk => bk.Genre)
                .Select(bk => new Book
                {
                    BookId = bk.BookId,
                    Title = bk.Title,
                    Author = new Author { AuthorId = bk.AuthorId, FirstName = bk.Author.FirstName, LastName = bk.Author.LastName },
                    Genre = new Genre { GenreId = bk.GenreId, Title = bk.Genre.Title }
                });
        }
        public IEnumerable<Genre> GetGenres()
        {
            return _context.Genres;
        }
        public IEnumerable<Author> GetAuthors()
        {
            return _context.Authors;
        }

        public Book GetBook(int? id)
        {
            return _context.Books
                   .Where(bk => bk.BookId == id)
                   .Include(bk => bk.Author)
                   .Include(bk => bk.Genre)
                   .Select(bk => new Book
                   {
                       BookId = bk.BookId,
                       Title = bk.Title,
                       Author = new Author { AuthorId = bk.AuthorId, FirstName = bk.Author.FirstName, LastName = bk.Author.LastName },
                       Genre = new Genre { GenreId = bk.GenreId, Title = bk.Genre.Title }
                   })
                   .FirstOrDefault();
        }

        public bool HasBookWithId(int? id)
        {
            Book findedBook = _context.Books
                .Where(bk => bk.BookId == id)
                .FirstOrDefault();
            
            if (findedBook != null)
                return true;

            return false;
        }
        public bool HasBookWithTitle(string title)
        {
            Book findedBook = _context.Books
                .Where(bk => bk.Title == title)
                .FirstOrDefault();

            if (findedBook != null)
                return true;

            return false;
        }

        private Author AddAndGetAuthor(Author author)
        {
            Author findedAuthor = _context.Authors
                .Where(athr => athr.FirstName == author.FirstName && athr.LastName == author.LastName)
                .FirstOrDefault();

            if (findedAuthor == null)
            {
                _context.Authors.Add(author);
                _context.SaveChanges();

                return author;
            }

            return findedAuthor;
        }
        private Genre AddAndGetGenre(Genre genre)
        {
            Genre findedGenre = _context.Genres
                .Where(gnr => gnr.Title == genre.Title)
                .FirstOrDefault();

            if (findedGenre == null)
            {
                _context.Genres.Add(genre);
                _context.SaveChanges();

                return genre;
            }

            return findedGenre;
        }
    }
}
