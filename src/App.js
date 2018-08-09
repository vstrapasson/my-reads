import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import Home from './components/Home';
import Search from './components/Search';

import * as API from './utils/BooksAPI';

import keyBy from 'lodash/fp/keyBy';

class App extends Component {

  state = {
    books: [],
    searchBooks: []
  }

  async componentDidMount() {
    const books = keyBy('id')( await API.getAll() );
    this.setState({ books });
  }

  updateShelf(book, shelf) {
    API.update(book, shelf);

    book.shelf = shelf;

    this.setState(prevState => {
        let books = Object.values(prevState.books);
        books = books.filter(b => b.id !== book.id).concat(book);
        books = keyBy('id')(books);

        prevState.searchBooks[book.id] = books[book.id];

        return {books, searchBooks: prevState.searchBooks};
    });
  }

  searchBooks(query) {
    if (!query) {
      this.setState({searchBooks: []});
      return;
    }

    const { books } = this.state;

    API.search(query).then(searchBooks => {
      if (!searchBooks) {
        searchBooks = [];
      }

      if (searchBooks.error && searchBooks.error === "empty query") {
        searchBooks = [];
      }

      searchBooks = searchBooks.map(book => {
          if (books[book.id]) {
            return books[book.id];
          }
          return book;
      });

      searchBooks = keyBy('id')(searchBooks);

      this.setState({searchBooks});
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={ _ => <Home books={this.state.books} updateShelf={(book, shelf) => this.updateShelf(book, shelf)} />} />
            <Route path="/search" render={ ({history, location}) => <Search location={location} history={history} books={this.state.searchBooks} searchBooks={query => this.searchBooks(query)} updateShelf={(book, shelf) => this.updateShelf(book, shelf)} />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
