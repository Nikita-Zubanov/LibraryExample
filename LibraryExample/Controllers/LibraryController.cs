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
    public class LibraryController : ControllerBase
    {
        ILibraryService _service;

        public LibraryController(ILibraryService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<Book> GetBooks()
        {
            //return _service.GetBooks();
            return new List<Book>
            {
                new Book { BookId = 1, Title = "Book 1"},
                new Book { BookId = 2, Title = "Book 2"},
                new Book { BookId = 3, Title = "Book 3"},
            };
        }
    }
}
