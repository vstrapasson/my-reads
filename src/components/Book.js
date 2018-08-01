import React, { Component } from 'react';

import ShelfSelector from './ShelfSelector';

class Book extends Component {

  render() {
    const { book } = this.props;

    return (
      <li className="book">
        <div className="book-content">
          <img className="book-cover" src={book.imageLinks.smallThumbnail} alt={book.title} />
          <div className="book-info">
            <div className="book-title">{book.title}</div>
            <div className="book-author"></div>
          </div>
          <ShelfSelector book={book} changeShelf={this.props.changeShelf} />
        </div>
      </li>
    );
  }
}

export default Book;
