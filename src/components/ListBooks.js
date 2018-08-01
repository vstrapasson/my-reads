import React, { Component } from 'react';

import Book from './Book';
import * as API from '../utils/BooksAPI';

class ListBooks extends Component {

  state = {
    books: [],
    loading: true
  }

  componentDidMount() {
    API.getAll().then(books => {
      this.setState({books, loading: false});
    });
  }

  render() {
    if (this.state.loading) {
      return (<h1>Loading...</h1>)
    }

    return (
      <ul className="book-list">
        {this.state.books.map(book => {
          return <Book key={book.title} book={book} />
        })}
      </ul>
    );
  }
}

export default ListBooks;
