using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryExample.Models
{
    public class Book
    {
        public int? BookId { get; set; }
        public string Title { get; set; }

        public int? GenreId { get; set; }
        public Genre Genre { get; set; }

        public int? AuthorId { get; set; }
        public Author Author { get; set; }
    }
}
