import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import _ from 'lodash';

import ListBooks from './ListBooks';
import Header from './Header';

import * as API from '../utils/BooksAPI';

class Home extends Component {

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

  render() {
    let { books } = this.state;

    books = _.groupBy(books, 'shelf');

    return (
      <div>
        <Header />
        <ListBooks shelfName="Currently Reading" books={books.currentlyReading} onChangeShelf={this.onChangeShelf.bind(this)}/>
        <ListBooks shelfName="Read" books={books.read} onChangeShelf={this.onChangeShelf.bind(this)} />
        <ListBooks shelfName="Want to Read" books={books.wantToRead} onChangeShelf={this.onChangeShelf.bind(this)} />
        <div className="open-search">
          <Link to="/search" ></Link>
        </div>
      </div>
    );
  }

}

export default Home;
