﻿using LibraryExample.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryExample.Services
{
    public interface ILibraryService
    {
        void AddBook(Book book);
        void ChangeBook(Book book);
        void DeleteBook(int? id);
        IEnumerable<Book> GetBooks();
        IEnumerable<Genre> GetGenres();
        IEnumerable<Author> GetAuthors();
        Book GetBook(int? id);
        bool HasBookWithId(int? id);
        bool HasBookWithTitle(string title);
    }
}
