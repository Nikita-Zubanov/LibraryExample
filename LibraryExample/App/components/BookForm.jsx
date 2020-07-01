import React from 'react'

export default class BookForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bookId: null,
            bookTitle: "",
            genreTitle: "",
            authorFirstName: "",
            authorLastName: "",
            allGenres: [],
            allAuthors: []
        };

        this.setStateByBookId(this.props.match.params.id);

        this.onSubmit = this.onSubmit.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onGenreChange = this.onGenreChange.bind(this);
        this.onAuthorFirstNameChange = this.onAuthorFirstNameChange.bind(this);
        this.onAuthorLastNameChange = this.onAuthorLastNameChange.bind(this);
    }

    setStateByBookId(id) {
        if (id != undefined) {
            var xhr = new XMLHttpRequest();
            xhr.open("get", `/api/books/BookById/${id}`, true);
            xhr.onload = function () {
                var data = JSON.parse(xhr.responseText);
                this.setState({
                    bookId: data.bookId,
                    bookTitle: data.title,
                    genreTitle: data.genre.title,
                    authorFirstName: data.author.firstName,
                    authorLastName: data.author.lastName,
                });
            }.bind(this);
            xhr.send();
        }
    }

    loadAllGenres() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "/api/books/AllGenres", true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ allGenres: data });
        }.bind(this);
        xhr.send();
    }
    loadAllAuthors() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "/api/books/AllAuthors", true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ allAuthors: data });
        }.bind(this);
        xhr.send();
    }

    componentDidMount() {
        this.loadAllGenres();
        this.loadAllAuthors();
    }

    onTitleChange(e) {
        this.setState({ bookTitle: e.target.value });
    }
    onGenreChange(e) {
        this.setState({ genreTitle: e.target.value });
    }
    onAuthorFirstNameChange(e) {
        this.setState({ authorFirstName: e.target.value });
    }
    onAuthorLastNameChange(e) {
        this.setState({ authorLastName: e.target.value });
    }

    onAddBook(bookTitle, genreTitle, authorFirstName, authorLastName) {
        const data = new FormData();
        data.append("title", bookTitle);
        data.append("genre.Title", genreTitle);
        data.append("author.FirstName", authorFirstName);
        data.append("author.LastName", authorLastName);

        var xhr = new XMLHttpRequest();
        xhr.open("post", "/api/books/AddBook", true);
        xhr.onload = function (xhr) {
            if (xhr.status !== 200) {
                console.log(xhr.target.responseText);
            }
        }.bind(this);
        xhr.send(data);
    }
    onChangeBook(bookId, bookTitle, genreTitle, authorFirstName, authorLastName) {
        const data = new FormData();
        data.append("bookId", bookId);
        data.append("title", bookTitle);
        data.append("genre.Title", genreTitle);
        data.append("author.FirstName", authorFirstName);
        data.append("author.LastName", authorLastName);

        var xhr = new XMLHttpRequest();
        xhr.open("put", "/api/books/ChangeBook", true);
        xhr.onload = function () {
            if (xhr.status !== 200) {
                console.log(xhr.target.responseText);
            }
        }.bind(this);
        xhr.send(data);
    }

    onSubmit(e) {
        e.preventDefault();

        var bookId = this.state.bookId;
        var bookTitle = this.state.bookTitle;
        var genreTitle = this.state.genreTitle;
        var authorFirstName = this.state.authorFirstName;
        var authorLastName = this.state.authorLastName;

        if (!bookTitle) {
            return;
        }

        if (bookId === null)
            this.onAddBook(bookTitle, genreTitle, authorFirstName, authorLastName);
        else if (bookId !== null)
            this.onChangeBook(bookId, bookTitle, genreTitle, authorFirstName, authorLastName);

        this.setState({ bookId: null, bookTitle: "", genreTitle: "", authorFirstName: "", authorLastName: "" });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <p>
                    <input type="text"
                        placeholder={this.state.bookTitle != "" ? this.state.bookTitle : "Название книги"}
                        value={this.state.bookTitle}
                        onChange={this.onTitleChange} />
                </p>
                <p>
                    <input type="text"
                        placeholder={this.state.genreTitle != "" ? this.state.genreTitle : "Жанр"}
                        value={this.state.genreTitle}
                        onChange={this.onGenreChange}
                        list="genres"/>
                    <datalist id="genres">
                        {
                            this.state.allGenres.map((genre) =>
                                <option key={genre.title} value={genre.title}>{genre.title}</option>)
                        }
                    </datalist>
                </p>
                <p>
                    <input type="text"
                        placeholder={this.state.authorFirstName != "" ? this.state.authorFirstName : "Имя автора"}
                        value={this.state.authorFirstName}
                        onChange={this.onAuthorFirstNameChange}
                        list="authorsFirstNames" />
                    <datalist id="authorsFirstNames">
                        {
                            this.state.allAuthors.map((author) =>
                                <option key={author.firstName} value={author.firstName}>{author.firstName}</option>)
                        }
                    </datalist>
                    <input type="text"
                        placeholder={this.state.authorLastName != "" ? this.state.authorLastName : "Фамилия автора"}
                        value={this.state.authorLastName}
                        onChange={this.onAuthorLastNameChange}
                        list="authorsLastNames" />
                    <datalist id="authorsLastNames">
                        {
                            this.state.allAuthors.map((author) =>
                                <option key={author.lastName} value={author.lastName}>{author.lastName}</option>)
                        }
                    </datalist>
                </p>
                <input type="submit" value="Сохранить" />
            </form>
        );
    }
}