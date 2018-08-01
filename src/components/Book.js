import React, { Component } from 'react';

import CategorySelector from './CategorySelector';

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
          <CategorySelector />
        </div>
      </li>
    );
  }
}

export default Book;
