import React, { Component } from 'react';

import ShelfSelector from './ShelfSelector';

class Book extends Component {

  render() {
    const { book } = this.props;

    const thumbnail = (book.imageLinks && book.imageLinks.smallThumbnail)
    ? book.imageLinks.smallThumbnail
    : 'http://i.imgur.com/sJ3CT4V.gif'

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <img className="book-cover" src={thumbnail} alt={book.title} />
            <ShelfSelector book={book} onChangeShelf={this.props.onChangeShelf} />
          </div>
          <div className="book-info">
            <div className="book-title">{book.title}</div>
            <div className="book-author">{book.authors && book.authors.map(author => (<p key={author}>{author}</p>))}</div>
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
