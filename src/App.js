import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';

import ListBooks from './components/ListBooks';
import Header from './components/Header';

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

    console.log(this.state);

    book.shelf = shelf;
    this.setState((state) => {
        state.books[book.id] = book;
        return state;
    });

    API.update(book, shelf).then(res => console.log(res));
  }

  render() {

    if (this.state.loading) {
        return <p>Loading...</p>
    }

    let { books } = this.state;

    books = _.groupBy(books, 'shelf');

    return (
      <div className="App">
        <Header />
        <ListBooks shelfName="Currently Reading" books={books.currentlyReading} onChangeShelf={this.onChangeShelf.bind(this)}/>
        <ListBooks shelfName="Read" books={books.read} onChangeShelf={this.onChangeShelf.bind(this)} />
        <ListBooks shelfName="Want to Read" books={books.wantToRead} onChangeShelf={this.onChangeShelf.bind(this)} />
      </div>
    );
  }
}

export default App;
