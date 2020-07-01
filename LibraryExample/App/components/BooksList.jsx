import React from 'react';
import Book from './Book.jsx';

export default class BooksList extends React.Component {
    constructor(props) {
        super(props);

        this.state = { books: [] };
    }

    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "api/books/AllBooks", true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ books: data });
        }.bind(this);
        xhr.send();
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        return <div>
            <h2>Список книг</h2>
            <div>
                {
                    this.state.books.map(function (book) {
                        return <Book key={book.bookId} book={book} />
                    })
                }
            </div>
        </div>;
    }
}