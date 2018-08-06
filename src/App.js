import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import Home from './components/Home';
import Search from './components/Search';

import * as API from './utils/BooksAPI';

import _ from 'lodash';

class App extends Component {

  state = {
    books: [],
    searchBooks: []
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks() {
     API.getAll()
      .then(books => {
        books = _.keyBy(books, 'id');
        this.setState({ books });
      });
  }

  updateShelf(book, shelf) {
    const { books } = this.state;

    books[book.id]  = {
      ...book,
      shelf
    };
    this.setState(prevState => {
      prevState.searchBooks[book.id] = books[book.id];
      return {books, searchBooks: prevState.searchBooks};
    });

    API.update(book, shelf).then(res => console.log(res))
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

      searchBooks = _.keyBy(searchBooks, 'id');

      this.setState({searchBooks});
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={ _ => <Home books={this.state.books} updateShelf={this.updateShelf.bind(this)} />} />
            <Route path="/search" render={ ({history, location}) => <Search location={location} history={history} books={this.state.searchBooks} searchBooks={this.searchBooks.bind(this)} updateShelf={this.updateShelf.bind(this)} />} />
          </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
