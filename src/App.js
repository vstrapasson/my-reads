import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import _ from 'lodash';

import './App.css';


import Home from './components/Home';
import Search from './components/Search';

import * as API from './utils/BooksAPI';

class App extends Component {

  state = {
    books: [],
    loading: true
  }

  componentDidMount() {
      API.getAll().then(books => {
          books = _.keyBy(books, 'id');
          this.setState({books, loading: false});
      });
  }

  onChangeShelf(book, shelf) {
    book.shelf = shelf;
    this.setState((state) => {
        state.books[book.id] = book;
        return state;
    });

    API.update(book, shelf).then(res => console.log(res));
  }

  searchForBooks(query) {
    API.search(query).then(books => {
        books = _.keyBy(books, 'id');
        this.setState({books, loading: false});
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={() => (
                <Home books={this.state.books} onChangeShelf={this.onChangeShelf.bind(this)} />
              )} />
            <Route path="/search" component={() => (
                <Search searchForBooks={this.searchForBooks.bind(this)} />
              )} />
          </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
