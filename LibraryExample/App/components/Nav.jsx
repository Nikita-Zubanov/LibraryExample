import React from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component {
    render() {
        return <div>
            <Link to="/">Главная </Link>
            <Link to="/booksList">Книги </Link>
            <Link to="/bookForm">Добавить книгу </Link>
        </div>;
    }
}