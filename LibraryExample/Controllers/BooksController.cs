using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibraryExample.Models;
using LibraryExample.Services;
using Microsoft.AspNetCore.Mvc;

namespace LibraryExample.Controllers
{
    [Route("api/[controller]")]
    public class BooksController : Controller
    {
        ILibraryService _service;

        public BooksController(ILibraryService service)
        {
            _service = service;
        }

        [Route("AllBooks")]
        [HttpGet]
        public IEnumerable<Book> GetBooks()
        {
            return _service.GetBooks();
        }

        [Route("BookById/{id}")]
        [HttpGet]
        public Book GetBook(int? id)
        {
            return _service.GetBook(id);
        }

        [Route("AllGenres")]
        [HttpGet]
        public IEnumerable<Genre> GetGenres()
        {
            return _service.GetGenres();
        }

        [Route("AllAuthors")]
        [HttpGet]
        public IEnumerable<Author> GetAuthors()
        {
            return _service.GetAuthors();
        }

        [Route("AddBook")]
        [HttpPost]
        public IActionResult AddBook(Book book)
        {
            bool hasBook = _service.HasBookWithTitle(book.Title);
            if (!hasBook)
            {
                _service.AddBook(book);
                return Ok(book);
            }
            else
                return NotFound("Книга с таким названием уже существует.");
        }

        [Route("ChangeBook")]
        [HttpPut]
        public IActionResult ChangeBook(Book book)
        {
            bool hasBook = _service.HasBookWithId(book.BookId);
            if (hasBook)
            {
                _service.ChangeBook(book);
                return Ok(book);
            }
            else
                return NotFound("Выбранной книги не существует.");
        }

        [Route("DeleteBook/{id}")]
        [HttpDelete]
        public IActionResult DeleteBook(int? id)
        {
            bool hasBook = _service.HasBookWithId(id);
            if (hasBook)
            {
                _service.DeleteBook(id);
                return Ok();
            }
            else
                return NotFound("Выбранной книги не существует.");
        }
    }
}
