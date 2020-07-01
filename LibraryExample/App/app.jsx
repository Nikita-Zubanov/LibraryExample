import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BooksList from './components/BooksList.jsx';
import Nav from './components/nav.jsx';
import Home from './components/home.jsx';
import NotFound from './components/notfound.jsx';
import BookForm from './components/BookForm.jsx';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Nav />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/booksList" component={BooksList} />
                        <Route path="/bookForm/:id?" component={BookForm} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
};