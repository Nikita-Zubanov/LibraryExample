import React from 'react'
import { Redirect } from 'react-router-dom'

export default class Book extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            book: this.props.book,
            redirect: false
        };

        this.onRemoveBook = this.onRemoveBook.bind(this);
    }

    onRemoveBook() {
        var bookId = this.state.book.bookId;

        var xhr = new XMLHttpRequest();
        xhr.open("delete", `/api/books/DeleteBook/${bookId}`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status !== 200) {
                console.log(xhr.target.responseText);
            }
        }.bind(this);
        xhr.send();
    }

    setRedirect = () => {
        this.setState({ redirect: true });
    }

    renderRedirect = () => {
        var bookId = this.state.book.bookId;

        if (this.state.redirect) {
            return <Redirect to={`/bookForm/${bookId}`} />;
        }
    }

    render() {
        return <div>
            <p><b>Название:</b> {this.state.book.title}</p>
            <p><b>Жанр:</b> {this.state.book.genre.title}</p>
            <p><b>Автор</b> {this.state.book.author.firstName} {this.state.book.author.lastName}</p>
            <p>
                <button onClick={this.onRemoveBook}>Удалить</button>
                <div>
                    {this.renderRedirect()}
                    <button onClick={this.setRedirect}>Изменить</button>
                </div>
            </p>
        </div>;
    }
}